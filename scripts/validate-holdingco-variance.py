"""Read-only local bridge. Imports existing HoldingCo code; publishes synthetic results only.

Run explicitly with --holdingco-root. Never opens a database, calls a model,
registers an experiment, or imports the company kernel/package initializer.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import time
import uuid


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--holdingco-root", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    source_root = args.holdingco_root.resolve()
    engine_path = "src/caldas_os/finance/pvm_engine.py"
    manifest_path = "src/caldas_os/research/experiments/manifest.py"
    contract_path = "src/caldas_os/research/experiments/base.py"
    engine = load("sintra_holdingco_pvm", source_root / engine_path)
    load("caldas_os.research.experiments.manifest", source_root / manifest_path)
    lab = load("sintra_finance_ai_lab_contract", source_root / contract_path)
    fixture_bytes = (root / "src/data/powerBiVariance.fixture.json").read_bytes()
    fixture = json.loads(fixture_bytes)
    rows = [row for row in fixture["rows"] if all(row[key] == value for key, value in fixture["scope"].items())]
    snapshots = lambda scenario: [engine.SKUSnapshot(row["product"], row["product"], row["quantity"], row["unitPriceCents"] / 100) for row in rows if row["scenario"] == scenario]
    started = time.perf_counter()
    result = engine.calculate_pvm_decomposition(snapshots("Budget"), snapshots("Actual"))
    elapsed_ms = (time.perf_counter() - started) * 1000
    expected = fixture["controls"]
    checks = {
        "actual_matches_control": round(result.current_revenue * 100) == expected["actualCents"],
        "budget_matches_control": round(result.prior_revenue * 100) == expected["budgetCents"],
        "variance_matches_control": round(result.total_variance * 100) == expected["varianceCents"],
        "pvm_reconciles": result.reconciliation_passed and result.reconciliation_delta < 0.01,
    }
    if not all(checks.values()):
        raise ValueError(f"HoldingCo cross-check failed: {checks}")
    summary = lab.ExperimentResultSummary(
        experiment_id=fixture["id"], version=fixture["version"],
        hypothesis="The public synthetic revenue variance reconciles to the existing HoldingCo PVM engine.",
        status=lab.ExperimentStatus.DRY_RUN_COMPLETE.value,
        experiment_stage="DRY_RUN", result_origin=lab.ResultOrigin.DERIVED.value,
        empirical_status="SYNTHETIC_CALCULATION_ONLY",
        reproducibility_status=lab.ReproducibilityStatus.VERIFIED_LOCAL.value,
        passed=True, decision_recommendation="Publish the synthetic example; tenant execution remains untested.",
        derived_results={"checks": checks, "pvm": result.to_dict()},
        limitations=["No Power BI tenant, DAX runtime, MCP handshake, RLS or refresh was exercised.", "No LLM was called; commentary is an authored explanation of calculated values.", "PVM allocation follows HoldingCo's weighted-average convention; it does not prove economic causality.", "The private HoldingCo implementation is referenced by hash, not copied into Sintra."],
        dataset_id=fixture["id"], source_refs=[engine_path, contract_path],
        run_id=f"sintra_{uuid.uuid4().hex}", latency_ms=round(elapsed_ms, 3),
        manifest={"model": "none", "provider": "none", "network_access": "NONE", "database_access": "NONE", "dataset_classification": fixture["classification"]},
    ).to_dict()
    receipt = {
        "schemaVersion": "1.0", "knowledgeId": "power-bi-variance-review",
        "datasetSha256": hashlib.sha256(fixture_bytes).hexdigest(),
        "source": {"project": "HoldingCo / Finance AI Lab", "revision": subprocess.check_output(["git", "-C", str(source_root), "rev-parse", "HEAD"], text=True).strip(), "workingTreeFilesClean": subprocess.run(["git", "-C", str(source_root), "diff", "--quiet", "HEAD", "--", engine_path, contract_path, manifest_path]).returncode == 0, "files": {path: hashlib.sha256((source_root / path).read_bytes()).hexdigest() for path in [engine_path, contract_path, manifest_path]}},
        "labResult": summary,
    }
    destination = root / "src/data/holdingCoVariance.receipt.json"
    destination.write_text(json.dumps(receipt, indent=2) + "\n")
    print(f"PASS: {len(checks)} HoldingCo checks; synthetic receipt written to {destination.name}")


if __name__ == "__main__":
    main()
