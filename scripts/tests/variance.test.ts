import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { calculateVariance, VARIANCE_FIXTURE as fixture, varianceCsv } from "../../src/lib/varianceWorkflow";
import { buildVarianceExport } from "../../src/lib/varianceExport";
import { buildKnowledgeExport } from "../../src/lib/knowledgeExport";
import { AI_NEWS } from "../../src/lib/newsDataCombined";
import receipt from "../../src/data/holdingCoVariance.receipt.json";

test("variance reconciles independent totals and drivers, using the requested scope", () => {
  const result = calculateVariance(fixture.rows, fixture.scope);
  assert.equal(result.budgetCents, 2100000);
  assert.equal(result.actualCents, 1965000);
  assert.equal(result.varianceCents, -135000);
  assert.equal(result.variancePct, -1350 / 21000);
  assert.equal(result.selectedRowCount, 8);
  assert.equal(result.excludedRowCount, 2);
  assert.equal(result.reconciliationCents, 0);
  assert.deepEqual(result.details.map(row => [row.product, row.varianceCents]), [["Core", 155000], ["New offer", 0], ["Plus", -240000], ["Services", -50000]]);
  assert.equal(result.details.find(row => row.product === "New offer")!.variancePct, null);
  const zeroRows = fixture.rows.filter(row => row.product === "New offer");
  assert.equal(calculateVariance(zeroRows, fixture.scope).variancePct, null);
});

test("missing, duplicated or malformed finance rows fail instead of producing a plausible total", () => {
  assert.throws(() => calculateVariance([...fixture.rows, fixture.rows[0]], fixture.scope), /Duplicate/);
  assert.throws(() => calculateVariance(fixture.rows.slice(1), fixture.scope), /Missing scenario/);
  assert.throws(() => calculateVariance(fixture.rows, { ...fixture.scope, currency: "GBP" }), /No rows/);
  for (const patch of [{ amountCents: 3 }, { quantity: -1 }, { quantity: 0.5 }, { amountCents: NaN }, { unitPriceCents: Number.MAX_SAFE_INTEGER + 1 }, { scenario: "Forecast" }]) {
    assert.throws(() => calculateVariance([{ ...fixture.rows[0], ...patch }, ...fixture.rows.slice(1)], fixture.scope));
  }
});

test("HoldingCo receipt pins the real fixture and reconciles its PVM components", () => {
  const bytes = readFileSync(new URL("../../src/data/powerBiVariance.fixture.json", import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), receipt.datasetSha256);
  const lab = receipt.labResult;
  assert.equal(lab.experiment_id, "LAB-FPNA-01");
  assert.equal(lab.status, "DRY_RUN_COMPLETE");
  assert.equal(lab.result_origin, "DERIVED");
  assert.equal(lab.empirical_status, "SYNTHETIC_CALCULATION_ONLY");
  assert.ok(lab.passed && Object.values(lab.derived_results.checks).every(Boolean));
  const pvm = lab.derived_results.pvm;
  assert.equal(pvm.current_revenue, 19650);
  assert.equal(pvm.prior_revenue, 21000);
  assert.equal(pvm.total_variance, -1350);
  assert.ok(Math.abs(pvm.price_variance + pvm.volume_variance + pvm.mix_variance - pvm.total_variance) <= 0.01);
  assert.ok(pvm.reconciliation_passed);
  assert.equal(lab.manifest.database_access, "NONE");
  assert.equal(lab.manifest.model, "none");
  assert.match(receipt.source.revision, /^[a-f0-9]{40}$/);
  for (const hash of Object.values(receipt.source.files)) assert.match(hash, /^[a-f0-9]{64}$/);
});

test("news, knowledge and LLM resources resolve one tested example with honest execution boundaries", () => {
  const site = "https://example.test/sintra-ai";
  const exported = buildVarianceExport(site);
  const brief = buildKnowledgeExport(site, "2026-10-18T00:00:00Z").data.find(item => item.id === exported.knowledgeId)!;
  assert.equal(brief.workflowResource, exported.resourceUrl);
  assert.equal(brief.executionStatus, "synthetic-calculation-tested");
  assert.ok(exported.sourceIds.every(id => brief.sources.some(source => source.id === id)));
  assert.equal(exported.powerBi.executionStatus, "not-run-in-power-bi");
  assert.equal(exported.powerBi.expectedTotal.Variance, -1350);
  assert.ok(exported.validation.untested.some(item => item.includes("DAX")));
  assert.equal(AI_NEWS.filter(item => item.id === "lab-fpna-01-variance").length, 1);
  const news = AI_NEWS.find(item => item.id === "lab-fpna-01-variance")!;
  assert.equal(news.knowledgeId, brief.id);
  assert.equal(news.origin, "lab-tested");
  assert.equal(news.checkedAt, undefined);
  const csv = varianceCsv();
  assert.equal(csv.trim().split("\n").length, fixture.rows.length + 1);
  assert.equal(csv.split("\n")[0], "entity,fiscalPeriod,currency,product,scenario,quantity,unitPriceCents,amountCents");
  // Verify the distribution package reproduces the exact canonical rows.
  csv.trim().split("\n").slice(1).forEach((line, index) => {
    assert.deepEqual(line.match(/"(?:[^"]|"")*"/g)!.map(value => value.slice(1, -1).replace(/""/g, '"')), Object.values(fixture.rows[index]).map(String));
  });
});
