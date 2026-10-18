# LAB-FPNA-01: public variance example

Implemented 2026-10-18 in the existing `power-bi-variance-review` brief. This
extends one of the eight knowledge records; it adds no duplicate prompt-library
entry. The original 256 prompts and historical content are preserved.

## Reuse and authority

- HoldingCo's `finance/pvm_engine.py` remains the PVM implementation. Sintra's
  read-only bridge imports that file and the Finance AI Lab experiment contract
  from the existing checkout. It does not copy the private engine, open a DB,
  import the company kernel, call a model, or register a competing experiment.
- HoldingCo's existing catalog already names `LAB-FPNA-01`. The result reuses
  that identity and the existing `ExperimentResultSummary` format. This is a
  local dry run, not a claim of registration in the company control plane.
- `src/data/powerBiVariance.fixture.json` is the canonical **public synthetic**
  input. CSV, HTML, JSON and expected outputs derive from this fixture.
- `src/data/holdingCoVariance.receipt.json` is an immutable run projection with
  dataset hash, source file hashes, source revision, run ID and scoped checks.
  A revision does not substitute for file hashes when a source working tree is
  dirty. No private source code or runtime state is exported.
- `src/lib/varianceWorkflow.ts` performs integer-cent actual/budget aggregation;
  it does not implement another PVM engine. Authored commentary describes those
  figures and makes no causal or LLM-quality claim.

## Reproduce locally

With access to the existing HoldingCo checkout, run from Sintra:

```sh
python3 scripts/validate-holdingco-variance.py --holdingco-root /path/to/HoldingCo
npm run check
```

The bridge executes the existing PVM function and creates a receipt using the
existing lab contract. Only the public fixture and a small allowlisted result
are published. No changes to HoldingCo are needed. Do not run its seeded
Sintra ingester or simulated skill executor as evidence of this calculation.

Anyone can rerun the public reference with `npm ci && npm run check`; the
private HoldingCo checkout is not a CI/runtime dependency. A changed fixture
fails publication until its hash matches a new local HoldingCo run. Tests also
compare independent gold totals, product drivers, PVM reconciliation and result
classification. A stored local cross-check is not an independent rerun of the
private engine in CI.

## Reproduce in Power BI

1. Fetch `/api/workflows/power-bi-variance.csv`. In a new Power BI Desktop file,
   import as `FinanceVariance`, with text identifiers and whole-number units
   and cents. An equivalent Power Query import is provided as `.pq`.
2. Paste the `.dax` download into DAX Query View. DEFINE measures are temporary
   query definitions, so no persisted model measure is created or overwritten.
3. Compare the four products and the `IsTotal=true` row with the JSON result.
   Budget is EUR 21,000, actual EUR 19,650, variance −EUR 1,350 / −6.428571%.
   New offer has explicit zero rows; percentage is BLANK. Missing rows are not
   zero. Two out-of-scope rows must be excluded.
4. For an actual tenant, connect Fabric IQ through delegated Entra OAuth and
   inspect `tools/list`, report metadata, schema, values, identity and refresh
   dates. Reuse approved measures and adapt the demo to the real model. Record
   the query, filters, result, report total and residual before claiming a pass.

This last stage has **not** been executed: no authenticated Power BI connection
was available in this task. DAX and Power Query are supplied examples reviewed
against Microsoft documentation, not runtime-tested Power BI code. RLS/OLS,
refresh and report reconciliation remain untested.

## News, automation and LLM retrieval

The dated Sintra Lab news entry points to the existing knowledge ID. It is a
publication about this example, not a newly dated Microsoft product release.
The JSON Feed includes a `workflowResource` link and precise verification scope.
The knowledge export, agent manifest, `/agents/` and `llms.txt` expose the same
resource. There is no second content database or new MCP service.

An LLM can fetch `/api/index.json`, then the variance brief's `resourceUrl` and
`workflowResource`, using ordinary web retrieval or an existing MCP fetch tool.
The workflow response contains input rows, totals, DAX, import instructions,
source IDs, evidence and limits. It must retain the synthetic classification and
the distinction between checked sources, calculated values and untested tenant
execution. Live Power BI data still comes from Microsoft's authenticated MCP.

The existing daily 06:00 UTC deployment and source pushes run `npm run check`:
feed collection → news/knowledge/export generation → data/content/freshness
checks → tests → typecheck → build → internal-link validation → Pages publish.
This reruns the public calculation and blocks stale fixture receipts. It does
not call HoldingCo, a tenant or an LLM. New headlines do not automatically
become approved claims or tested workflows. Source review and assumption changes
still require editorial work; a build timestamp never renews a source check.

## Validation record

- Local HoldingCo bridge: four checks passed against the existing engine.
- Sintra: 42 tests passed, including invalid/duplicate/missing finance inputs,
  entity/period/currency isolation, zero denominator, independent controls,
  evidence hashes, CSV parity and news → brief → evidence retrieval.
- Full release and browser/live receipts are recorded with the deployment
  report. Source review is dated separately from build time.
- Remaining: authenticated Power BI execution, DAX/Power Query runtime checks,
  tenant governance, LLM narrative evaluation and real business outcomes.
