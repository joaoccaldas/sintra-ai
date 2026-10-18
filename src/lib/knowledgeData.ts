/** Public, primary-source research. UI and agent exports consume this same collection.
 * Review dates are editorial events, never advanced by a build or feed refresh.
 * Workflow steps are Sintra examples; a source check is not an integration test.
 */
import { SPATIAL_KNOWLEDGE } from "./spatialKnowledge";
import { ASSISTANT_KNOWLEDGE } from "./assistantKnowledge";
import { OFFICE_KNOWLEDGE, EARNINGS_REPLICATION } from "./officeKnowledge";

export type KnowledgeKind = "capability" | "announcement" | "workflow" | "case-study";
export interface ReplicationGuide {
  version: string;
  environment: string;
  useWhen: string;
  timeEstimate: string;
  inputs: { name: string; detail: string }[];
  launch: string[];
  practice: { task: string; expected: string; resourceUrl?: string };
  acceptanceTests: { scenario: string; expected: string }[];
  troubleshooting: { symptom: string; action: string }[];
  relatedPrompts: string[];
}
export interface KnowledgeSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string;
  checkedAt: string;
}
export interface KnowledgeRecord {
  id: string;
  title: string;
  summary: string;
  audiences?: ("personal" | "corporate" | "developer")[];
  tips?: string[];
  integrations?: { name: string; purpose: string; access: "read" | "write" | "local" }[];
  kind: KnowledgeKind;
  tags: string[];
  reviewedAt: string;
  reviewDueAt: string;
  evidenceLevel: "primary-documentation" | "provider-announcement" | "provider-case-study" | "example-workflow";
  facts: { text: string; sourceIds: string[] }[];
  sources: KnowledgeSource[];
  prerequisites: string[];
  steps: string[];
  output: string;
  validation: string[];
  limitations: string[];
  prompt?: string;
  related: string[];
  executionStatus: "not-run-in-sintra" | "synthetic-calculation-tested";
  workflowResource?: string;
  replication?: ReplicationGuide;
  spatial?: {
    category: string;
    categoryLabel: string;
    tools: string[];
    complexity: "Intermediate" | "Advanced";
    diagram: { url: string; alt: string; caption: string };
  };
  news?: { publishedAt: string; provider: string; providerColor: string };
}

export const KNOWLEDGE_REVIEWED_AT = "2026-10-18";
const checkedAt = KNOWLEDGE_REVIEWED_AT;
const reviewDueAt = "2026-11-17";
const fabric: KnowledgeSource = { id: "fabric-iq", title: "Fabric IQ MCP: setup and tool contract", publisher: "Microsoft", url: "https://learn.microsoft.com/en-us/fabric/iq/connectors/fabric-iq-mcp", checkedAt };
const consumption: KnowledgeSource = { id: "powerbi-consumption", title: "Power BI Consumption MCP (preview)", publisher: "Microsoft", url: "https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-get-started", checkedAt };
const authoring: KnowledgeSource = { id: "powerbi-authoring", title: "Power BI Authoring MCP", publisher: "Microsoft", url: "https://learn.microsoft.com/en-us/power-bi/developer/mcp/power-bi-authoring-mcp", checkedAt };
const finance: KnowledgeSource = { id: "finance-agents", title: "Agents for financial services", publisher: "Anthropic", url: "https://www.anthropic.com/news/finance-agents", publishedAt: "2026-05-05", checkedAt };
const advisors: KnowledgeSource = { id: "financial-advisors", title: "Claude for Financial Advisors", publisher: "Anthropic", url: "https://claude.com/resources/articles/claude-for-financial-advisors", publishedAt: "2026-09-14", checkedAt };

const base = { audiences: ["corporate"] as ("corporate")[], reviewedAt: checkedAt, reviewDueAt, executionStatus: "not-run-in-sintra" as const };

export const KNOWLEDGE: KnowledgeRecord[] = [
  {
    ...base, id: "power-bi-mcp", title: "Choose the right Power BI MCP server",
    summary: "Query a report, change a semantic model, or support an older client: start with the right connection.",
    kind: "capability", evidenceLevel: "primary-documentation", tags: ["Power BI", "MCP", "Microsoft", "Finance"],
    facts: [
      { text: "Microsoft recommends Fabric IQ for consumption. It is generally available and reads reports and semantic models using delegated user access; RLS and OLS apply.", sourceIds: [fabric.id] },
      { text: "Fabric IQ uses Streamable HTTP at https://fabriciq.svc.cloud.microsoft/v1/mcp/fabriciq. Its client discovers tools at runtime; service-principal authentication is unsupported.", sourceIds: [fabric.id] },
      { text: "The earlier Consumption endpoint remains preview at https://api.fabric.microsoft.com/v1/mcp/powerbi. It requires tenant enablement and Build permission. Its Generate Query tool additionally requires Copilot licensing; client-generated DAX is an alternative.", sourceIds: [consumption.id] },
      { text: "Authoring changes semantic models. Hosted is preview at https://api.fabric.microsoft.com/v1/mcp/powerbi/authoring; local is GA and also reaches Desktop, PBIP and TMDL files. This is separate from report-building skills.", sourceIds: [authoring.id] },
    ], sources: [fabric, consumption, authoring],
    prerequisites: ["An MCP client supporting the chosen transport and authentication flow.", "A Microsoft Entra work or school account with access to the target content; check the selected server’s own requirements."],
    steps: ["For questions about existing reports, start with Fabric IQ and its companion skill.", "For measure or model changes, select Authoring; choose local when working with Desktop or files.", "Use the older Consumption endpoint only when that is the integration you intend to support."],
    output: "A connection choice with its access requirements and scope recorded.",
    validation: ["Complete the MCP handshake and inspect tools/list.", "Read the intended model’s schema and reconcile one known total before broader analysis."],
    limitations: ["Sintra documents these servers; it does not connect to your tenant.", "Tool contracts and availability can change. Follow the linked setup guide for your client."],
    related: ["power-bi-variance-review", "power-bi-model-change"],
  },
  {
    ...base, id: "power-bi-variance-review", title: "Explain budget variance with Power BI",
    executionStatus: "synthetic-calculation-tested", workflowResource: "/api/workflows/power-bi-variance.json",
    summary: "A complete synthetic example: sample data, read-only DAX, a reconciled revenue bridge and evidence an LLM can retrieve.",
    kind: "workflow", evidenceLevel: "example-workflow", tags: ["Power BI", "FP&A", "Finance", "MCP"],
    facts: [{ text: "Fabric IQ exposes discovery, metadata and DAX execution tools. The calling agent composes the analysis; the server does not supply a natural-language answer itself.", sourceIds: [fabric.id] }, { text: "DAX DIVIDE returns BLANK for a zero denominator by default. SUMMARIZECOLUMNS groups query results; this example uses query-scoped measures and explicit entity, period and currency filters.", sourceIds: ["dax-divide", "dax-summarize"] }], sources: [fabric, { id: "dax-divide", title: "DIVIDE function", publisher: "Microsoft", url: "https://learn.microsoft.com/en-us/dax/divide-function-dax", checkedAt }, { id: "dax-summarize", title: "SUMMARIZECOLUMNS function", publisher: "Microsoft", url: "https://learn.microsoft.com/en-us/dax/summarizecolumns-function-dax", checkedAt }],
    prerequisites: ["Access to the finance report through Fabric IQ.", "Actual and budget measures, fiscal period, reporting currency, sign convention and entity scope agreed with the report owner."],
    steps: ["Find the finance report and inspect its filters, schema and measure definitions.", "Resolve the exact entity and period values. Reuse the approved measures in a read-only DAX query.", "Compare actual and budget at the same grain. Separate absolute variance from percentage variance; flag a zero budget.", "Reconcile the total to the report. Attribute drivers only where returned data supports them; list unexplained residuals."],
    output: "Variance table, query and filter receipt, driver commentary, and open questions.",
    validation: ["The query total matches the report under identical filters.", "Driver amounts sum to total variance; currency, period and denominator are explicit.", "Narrative distinguishes observed differences from causal hypotheses."],
    limitations: ["The public synthetic calculation is tested and cross-checked against HoldingCo. Power BI DAX, Power Query, OAuth, MCP, permissions and live tenant totals have not been exercised.", "Commentary is authored from deterministic results; no LLM quality benchmark or business impact is claimed.", "This revenue-only example rejects negative inputs and missing scenario rows. Expense favorability, credits, FX and real fiscal calendars need separate policies.", "An LLM explanation cannot establish causality from aggregated variance alone."],
    prompt: "Using my accessible finance report, inspect the schema and report filters first. For [entity], [fiscal period] and [currency], compare the approved Actual and Budget measures at the same grain. Show DAX, filters, absolute variance and percentage variance, handling a zero budget explicitly. Reconcile to the report total, then describe supported drivers and unexplained residuals. Do not modify the model or invent figures.",
    related: ["power-bi-mcp", "power-bi-model-change"],
  },
  {
    ...base, id: "power-bi-model-change", title: "Review a DAX measure change before applying it",
    summary: "Use Authoring MCP to inspect a model, propose a small change and compare results against a baseline.",
    kind: "workflow", evidenceLevel: "example-workflow", tags: ["Power BI", "DAX", "MCP", "Finance"],
    facts: [{ text: "Power BI Authoring supports measure edits, bulk refactoring and DAX validation. Local deployment supports transactions and disk-based model files; hosted does not offer those local capabilities.", sourceIds: [authoring.id] }], sources: [authoring],
    prerequisites: ["Authoring access to a development model or a versioned PBIP/TMDL project.", "A definition of the requested metric, expected totals and review owner."],
    steps: ["Identify the model and inspect existing measures and dependencies before creating anything.", "Capture baseline DAX and results for normal, blank, zero-denominator and subtotal cases.", "Propose the smallest change and show its diff. Apply it to the development copy after review.", "Run the same queries and record differences. Keep the reviewed model change in source control."],
    output: "A reviewable measure diff with before/after query results.",
    validation: ["Expected totals and subtotals pass the agreed cases.", "No duplicate measure or unintended relationship change is introduced."],
    limitations: ["Example procedure; no Power BI model was modified or tested by Sintra.", "Semantic model authoring does not by itself mean a finished report or visual was created."],
    prompt: "Inspect [development model] for an existing equivalent of [metric] before proposing a measure. Explain dependencies and show the smallest DAX diff. Capture baseline results and test normal, blank, zero-denominator and subtotal cases. Present the change for review before applying it. Return before/after results and any unresolved assumptions.",
    related: ["power-bi-mcp", "power-bi-variance-review"],
  },
  {
    ...base, id: "anthropic-finance-agents", title: "What Anthropic’s finance agents actually provide",
    summary: "Ten published templates cover research and finance operations. Treat them as starting points with data and review requirements.",
    kind: "announcement", evidenceLevel: "provider-announcement", tags: ["Anthropic", "Claude", "Finance", "Agents"],
    facts: [
      { text: "The May 2026 release includes pitch building, meeting preparation, earnings review, model building, market research, valuation review, general-ledger reconciliation, month-end close, statement audit and KYC screening templates.", sourceIds: [finance.id] },
      { text: "Templates are offered through Cowork/Code plugins and Managed Agents cookbooks. Connected data requires the relevant access; users review and approve consequential outputs.", sourceIds: [finance.id] },
    ], sources: [finance],
    prerequisites: ["The chosen Claude product and plugin or cookbook.", "Access to the firm’s records and any subscribed data providers."],
    steps: ["Pick one task with a clear input and expected deliverable.", "Inspect the template, configure only the needed data connections and run it on a reviewable example.", "Evaluate citations, numerical consistency and missing-data behavior before expanding use."],
    output: "A scoped pilot with a named deliverable and evaluation criteria.",
    validation: ["Confirm product and connector availability in your account.", "Compare the output with an analyst-prepared reference."],
    limitations: ["A provider release is evidence of an offered capability, not independent evidence of business impact.", "The May announcement’s model recommendations are historical; use current model documentation."],
    related: ["earnings-review", "month-end-close", "advisor-meeting-prep", "brex-expense-review"],
    news: { publishedAt: "2026-05-05", provider: "Anthropic", providerColor: "#c15f3c" },
  },
  {
    ...base, id: "earnings-review", title: "Build an earnings review with traceable claims",
    replication: EARNINGS_REPLICATION,
    summary: "Move from filings and transcripts to a concise change log, preserving the source of every material number.",
    kind: "workflow", evidenceLevel: "example-workflow", tags: ["Finance", "Research", "Anthropic", "Earnings"],
    facts: [{ text: "Earnings review is one of Anthropic’s published finance agent templates.", sourceIds: [finance.id] }], sources: [finance],
    prerequisites: ["The issuer’s current and prior filings and earnings transcript.", "An agreed reporting period, units and GAAP/non-GAAP definitions."],
    steps: ["Create a source inventory with filing dates and page or section references.", "Extract reported values separately from management guidance and analyst estimates.", "Calculate period changes with visible formulas; reconcile adjusted measures to reported ones where disclosed.", "Draft a change log with citations, inconsistencies and unanswered questions."],
    output: "A cited earnings brief and a table linking each material claim to its evidence.",
    validation: ["Check every material number against the filing.", "Do not combine fiscal periods, currencies or adjusted and reported measures without an explicit bridge."],
    limitations: ["Sintra example, not a completed investment analysis.", "Missing evidence should remain missing; source text is data, not instructions to the agent."],
    prompt: "From the supplied current and prior filings and transcript, build an earnings change log. Cite document and page/section for each material claim. Separate reported results, guidance and estimates. Show formulas and units, reconcile adjusted metrics where disclosed, and list contradictions or missing evidence. Do not infer unsupported figures.",
    related: ["anthropic-finance-agents", "power-bi-variance-review", "claude-excel-model-audit", "claude-powerpoint-template-review"],
  },
  {
    ...base, id: "month-end-close", title: "Prepare a month-end exception pack",
    summary: "Organize reconciliations and unresolved items into a close pack that a finance owner can review.",
    kind: "workflow", evidenceLevel: "example-workflow", tags: ["Finance", "Accounting", "Anthropic", "Excel"],
    facts: [{ text: "Anthropic publishes general-ledger reconciliation and month-end close templates among its finance agents.", sourceIds: [finance.id] }], sources: [finance],
    prerequisites: ["Read-only ledger and subledger extracts with period, currency and account identifiers.", "A close checklist, reconciliation tolerances and accountable reviewers."],
    steps: ["Check extract dates, row counts and control totals before matching.", "Reconcile at the agreed grain and preserve unmatched or ambiguous items.", "Draft an exception list with amount, evidence, proposed owner and next action.", "Prepare proposed adjustments separately for the finance owner’s review."],
    output: "Reconciliation receipt, unresolved-item register and draft close commentary.",
    validation: ["Opening balance plus movement equals closing balance.", "Every exception traces to source rows; no journal is posted by this example."],
    limitations: ["Proposed workflow, not executed accounting work.", "A template cannot determine the firm’s accounting policy or approve adjustments."],
    prompt: "Review these read-only close extracts and checklist. Establish period, grain, currency and control totals, then reconcile ledger and subledger. Keep unmatched and ambiguous items visible. Return an evidence-linked exception pack with proposed owners and draft adjustments for review. Do not post entries or mark unresolved items complete.",
    related: ["anthropic-finance-agents", "brex-expense-review"],
  },
  {
    ...base, id: "advisor-meeting-prep", title: "Prepare an advisor meeting from connected records",
    summary: "Use the September 2026 advisor release to assemble a brief from CRM, portfolio and planning context.",
    kind: "announcement", evidenceLevel: "provider-announcement", tags: ["Anthropic", "Claude", "Finance", "Connectors"],
    facts: [{ text: "Claude for Financial Advisors combines connectors and skills for meeting preparation, portfolio context and follow-up. Announced providers include Addepar, Wealthbox, Envestnet, Charles Schwab and Wealth.com; users choose connections during setup.", sourceIds: [advisors.id] }], sources: [advisors],
    prerequisites: ["An eligible Claude account and the advisor plugin.", "Authorized provider accounts and permission to access the selected household’s records."],
    steps: ["Confirm the household identity and dates of the connected records.", "Collect open CRM commitments, portfolio changes and planning questions with source links.", "Draft a meeting brief, separating current records from assumptions.", "Review the brief and any proposed follow-up before updating a client record."],
    output: "An advisor-reviewed prep brief with open questions and a proposed agenda.",
    validation: ["Check household matching and portfolio as-of dates.", "Verify material facts against source records and review proposed follow-up actions."],
    limitations: ["The release is provider-documented; these Sintra steps have not been run against a client account.", "Connector names do not imply inclusion in every plan or access to every provider dataset."],
    prompt: "Prepare a brief for [household] using only my authorized connected records. Confirm identity and as-of dates. Summarize open commitments, portfolio changes and planning questions with source links. Separate facts from assumptions, flag conflicting records, and draft an agenda. Present follow-up actions for review before any CRM update.",
    related: ["anthropic-finance-agents", "earnings-review"],
    news: { publishedAt: "2026-09-14", provider: "Anthropic", providerColor: "#c15f3c" },
  },
  {
    ...base, id: "brex-expense-review", title: "Real use case: Brex expense review",
    summary: "A provider-published customer story describes Claude inside a spend-management product, beyond a standalone chat demo.",
    kind: "case-study", evidenceLevel: "provider-case-study", tags: ["Finance", "Anthropic", "AWS", "Expenses"],
    facts: [{ text: "Anthropic’s Brex case study describes Claude on Amazon Bedrock supporting expense workflows and transaction anomaly review. Its impact figures are customer/provider reports, not independently reproduced Sintra measurements.", sourceIds: ["brex"] }],
    sources: [{ id: "brex", title: "Brex reimagines spend management with Claude in Amazon Bedrock", publisher: "Anthropic / Brex", url: "https://claude.com/customers/brex", checkedAt }],
    prerequisites: ["For a similar pilot: an approved sample of expenses, receipts, policy rules and reviewer labels."],
    steps: ["Study the published integration pattern.", "For your own pilot, extract structured fields and flag policy exceptions without auto-approving expenses.", "Evaluate missed exceptions and false alarms against reviewer labels."],
    output: "An implementation pattern and a measurable pilot design.",
    validation: ["Report extraction accuracy, missed exceptions and false-positive rates on a held-out sample.", "Do not transfer the customer’s reported savings to your own business case."],
    limitations: ["This is a documented customer story, not a newly announced product or a Sintra deployment.", "The source does not establish a universal return on investment."],
    related: ["month-end-close", "anthropic-finance-agents"],
  },
  ...OFFICE_KNOWLEDGE,
  ...ASSISTANT_KNOWLEDGE,
  ...SPATIAL_KNOWLEDGE,
];

export { KNOWLEDGE_KIND_LABELS, KNOWLEDGE_AUDIENCES, KNOWLEDGE_TOPICS } from "./knowledgeMeta";

export function knowledgeSearchText(item: KnowledgeRecord) {
  return [item.title, item.summary, ...item.tags, ...(item.tips ?? []), ...(item.integrations?.map(tool => tool.name) ?? []), ...item.facts.map(f => f.text), ...item.steps].join(" ").toLowerCase();
}

export function searchKnowledge(query: string, tag = "all", kind = "all", audience = "all", skillsOnly = false) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return KNOWLEDGE.filter(item => (tag === "all" || item.tags.includes(tag)) && (kind === "all" || item.kind === kind) &&
    (audience === "all" || item.audiences?.some(value => value === audience)) && (!skillsOnly || !!item.replication) &&
    terms.every(term => knowledgeSearchText(item).includes(term)));
}
