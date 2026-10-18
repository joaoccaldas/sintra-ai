import fixture from "../data/powerBiVariance.fixture.json";

export type VarianceRow = (typeof fixture.rows)[number];
export type VarianceScope = typeof fixture.scope;
export const VARIANCE_FIXTURE = fixture;
export const VARIANCE_RESOURCE = "/api/workflows/power-bi-variance.json";

/** Revenue-only public reference. The existing HoldingCo engine owns PVM. */
export function calculateVariance(rows: VarianceRow[], scope: VarianceScope) {
  const selected = rows.filter(row => row.entity === scope.entity && row.fiscalPeriod === scope.fiscalPeriod && row.currency === scope.currency);
  if (!selected.length) throw new Error("No rows for the requested scope");
  const products = new Map<string, Map<string, VarianceRow>>();
  for (const row of selected) {
    if (!["Budget", "Actual"].includes(row.scenario)) throw new Error("Unknown scenario");
    if (![row.quantity, row.unitPriceCents, row.amountCents].every(value => Number.isSafeInteger(value) && value >= 0)) throw new Error("Expected nonnegative integer units and cents");
    if (row.quantity * row.unitPriceCents !== row.amountCents) throw new Error("Quantity times unit price does not match amount");
    const scenarios = products.get(row.product) ?? new Map<string, VarianceRow>();
    if (scenarios.has(row.scenario)) throw new Error("Duplicate row at the declared grain");
    scenarios.set(row.scenario, row);
    products.set(row.product, scenarios);
  }
  const details = [...products].map(([product, scenarios]) => {
    if (!scenarios.has("Actual") || !scenarios.has("Budget")) throw new Error("Missing scenario: absent data is not zero");
    const actualCents = scenarios.get("Actual")!.amountCents;
    const budgetCents = scenarios.get("Budget")!.amountCents;
    return { product, actualCents, budgetCents, varianceCents: actualCents - budgetCents, variancePct: budgetCents === 0 ? null : (actualCents - budgetCents) / Math.abs(budgetCents) };
  }).sort((a, b) => a.product.localeCompare(b.product));
  const actualCents = details.reduce((sum, row) => sum + row.actualCents, 0);
  const budgetCents = details.reduce((sum, row) => sum + row.budgetCents, 0);
  if (![actualCents, budgetCents].every(Number.isSafeInteger)) throw new Error("Unsafe total");
  const varianceCents = actualCents - budgetCents;
  return { scope, selectedRowCount: selected.length, excludedRowCount: rows.length - selected.length, details, actualCents, budgetCents, varianceCents, variancePct: budgetCents === 0 ? null : varianceCents / Math.abs(budgetCents), reconciliationCents: varianceCents - details.reduce((sum, row) => sum + row.varianceCents, 0) };
}

// Query-scoped measures: run in DAX Query View or through ExecuteQuery after
// importing the CSV as FinanceVariance. Nothing changes a tenant model.
export const VARIANCE_DAX = `DEFINE
  MEASURE FinanceVariance[Demo Actual] = CALCULATE(SUM(FinanceVariance[amountCents]), FinanceVariance[scenario] = "Actual") / 100
  MEASURE FinanceVariance[Demo Budget] = CALCULATE(SUM(FinanceVariance[amountCents]), FinanceVariance[scenario] = "Budget") / 100
  MEASURE FinanceVariance[Demo Variance] = [Demo Actual] - [Demo Budget]
  MEASURE FinanceVariance[Demo Variance Pct] = DIVIDE([Demo Variance], ABS([Demo Budget]))
EVALUATE
  SUMMARIZECOLUMNS(
    ROLLUPADDISSUBTOTAL(FinanceVariance[product], "IsTotal"),
    TREATAS({"Demo Europe"}, FinanceVariance[entity]),
    TREATAS({"2026-09"}, FinanceVariance[fiscalPeriod]),
    TREATAS({"EUR"}, FinanceVariance[currency]),
    "Actual", [Demo Actual], "Budget", [Demo Budget],
    "Variance", [Demo Variance], "VariancePct", [Demo Variance Pct]
  )
ORDER BY [IsTotal], FinanceVariance[product]
`;

export function varianceCsv() {
  const columns = fixture.grain.concat(["quantity", "unitPriceCents", "amountCents"]) as (keyof VarianceRow)[];
  const quote = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  return [columns.join(","), ...fixture.rows.map(row => columns.map(key => quote(row[key])).join(","))].join("\n") + "\n";
}

export const VARIANCE_IMPORT = `let
  Source = Csv.Document(Web.Contents("https://joaoccaldas.github.io/sintra-ai/api/workflows/power-bi-variance.csv"), [Delimiter=",", Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Headers = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Typed = Table.TransformColumnTypes(Headers, {{"entity", type text}, {"fiscalPeriod", type text}, {"currency", type text}, {"product", type text}, {"scenario", type text}, {"quantity", Int64.Type}, {"unitPriceCents", Int64.Type}, {"amountCents", Int64.Type}})
in
  Typed
`;

const reference = calculateVariance(fixture.rows, fixture.scope);
const amount = (cents: number) => `EUR ${(Math.abs(cents) / 100).toLocaleString("en-IE")}`;
const signedAmount = (cents: number) => `${cents < 0 ? "−" : "+"}${amount(cents)}`;
const driver = (product: string) => reference.details.find(row => row.product === product)!.varianceCents;
export const VARIANCE_COMMENTARY = [
  { claim: `Revenue is ${amount(reference.varianceCents)} ${reference.varianceCents < 0 ? "below" : "above"} the ${amount(reference.budgetCents)} budget (${reference.variancePct === null ? "percentage undefined" : `${(reference.variancePct * 100).toFixed(2)}%`}).`, rows: ["Total"], status: "calculated" },
  { claim: `Plus contributes ${signedAmount(driver("Plus"))} and Services ${signedAmount(driver("Services"))}; Core contributes ${signedAmount(driver("Core"))}.`, rows: ["Plus", "Services", "Core"], status: "calculated" },
  { claim: "New offer has a zero budget and zero actual. Its percentage variance is undefined, not 0%.", rows: ["New offer"], status: "calculated" },
  { claim: "The arithmetic bridge is not evidence of why demand or pricing changed. Ask the commercial owner before assigning a cause.", rows: [], status: "limitation" },
];
