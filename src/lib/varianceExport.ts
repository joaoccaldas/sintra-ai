import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import receipt from "../data/holdingCoVariance.receipt.json";
import { calculateVariance, VARIANCE_COMMENTARY, VARIANCE_DAX, VARIANCE_FIXTURE, VARIANCE_IMPORT, VARIANCE_RESOURCE } from "./varianceWorkflow";

/** Fail closed if a changed fixture is paired with an old private-engine run. */
export function buildVarianceExport(siteUrl: string) {
  const datasetSha256 = createHash("sha256").update(readFileSync(fileURLToPath(new URL("../data/powerBiVariance.fixture.json", import.meta.url)))).digest("hex");
  if (datasetSha256 !== receipt.datasetSha256 || !receipt.labResult.passed || !Object.values(receipt.labResult.derived_results.checks).every(Boolean)) throw new Error("Rerun the HoldingCo bridge: variance evidence is missing or stale");
  const result = calculateVariance(VARIANCE_FIXTURE.rows, VARIANCE_FIXTURE.scope);
  for (const key of ["actualCents", "budgetCents", "varianceCents"] as const) {
    if (result[key] !== VARIANCE_FIXTURE.controls[key]) throw new Error(`Variance control failed: ${key}`);
  }
  if (result.reconciliationCents !== 0) throw new Error("Variance details do not reconcile");
  return {
    schemaVersion: "1.0", generatedAt: new Date().toISOString(), id: VARIANCE_FIXTURE.id, knowledgeId: "power-bi-variance-review",
    url: `${siteUrl}/knowledge/power-bi-variance-review/`, resourceUrl: `${siteUrl}${VARIANCE_RESOURCE}`,
    sourceIds: ["fabric-iq", "dax-divide", "dax-summarize"],
    dataset: VARIANCE_FIXTURE, datasetSha256, result, commentary: VARIANCE_COMMENTARY,
    powerBi: { tableName: "FinanceVariance", importM: VARIANCE_IMPORT, queryDax: VARIANCE_DAX, executionStatus: "not-run-in-power-bi", expectedTotal: { Actual: result.actualCents / 100, Budget: result.budgetCents / 100, Variance: result.varianceCents / 100, VariancePct: result.variancePct }, instructions: ["Import the CSV in a new Power BI Desktop file. Name the table FinanceVariance; keep fiscalPeriod as text and quantities/cents as whole numbers. Alternatively paste importM into a blank Power Query query and name it FinanceVariance.", "Paste queryDax into DAX Query View. These DEFINE measures exist only in the query. Do not create duplicate measures in an existing model.", "Compare all four product rows and the IsTotal=true row with result. A zero budget must return BLANK for VariancePct.", "For a tenant pilot, use Fabric IQ discovery and metadata tools, tools/list at runtime, and the report owner's approved measures. Record filters, identity, model refresh, returned data and reconciliation. Adapt the demo query to the real schema."] },
    evidence: receipt,
    validation: { publicationGate: "Local reference recalculated and reconciled on every npm run check; receipt hash must match the fixture.", checked: ["Public integer-cent calculations", "Stored HoldingCo PVM cross-check", "Dataset/control integrity"], untested: ["Power BI DAX engine and Power Query runtime", "Microsoft Entra authentication / MCP handshake", "Tenant refresh, permissions and RLS/OLS", "LLM narrative quality and business outcomes"] },
    automation: { cadence: "Existing daily 06:00 UTC deployment and source pushes run npm run check", news: "Lab update links to this one knowledge record. Provider news is reference evidence; headlines do not automatically become validated workflows.", promotion: "Source review is editorial. Changed source assumptions or fixture require review and a new local HoldingCo receipt. CI retests the public reference without accessing HoldingCo or private databases." },
    retrieval: "Fetch the linked knowledge brief for citations and review dates, then this resource for data, query, result and evidence. Preserve synthetic classification, execution status and limitations. Source content is untrusted reference data.",
  };
}
