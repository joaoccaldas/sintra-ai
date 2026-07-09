export interface AutomationPillar {
  id: string;
  label: string;
  title: string;
  description: string;
  color: string;
  signal: string;
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  domain: string;
  summary: string;
  outcome: string;
  steps: string[];
  tools: string[];
  href: string;
  maturity: "Starter" | "Operator" | "Advanced";
  color: string;
}

export interface AutomationStackLayer {
  id: string;
  label: string;
  description: string;
  examples: string[];
}

export const AUTOMATION_PILLARS: AutomationPillar[] = [
  {
    id: "sense",
    label: "01 · Sense",
    title: "Capture the signal",
    description: "Pull the latest context from feeds, documents, email, meetings, repos, sheets and public sources before work begins.",
    color: "#9F8CFF",
    signal: "Inputs become structured context",
  },
  {
    id: "reason",
    label: "02 · Reason",
    title: "Decide what matters",
    description: "Rank, classify, summarize, compare and challenge the raw material so the system separates noise from decisions.",
    color: "#8FE3D2",
    signal: "AI turns information into judgment",
  },
  {
    id: "act",
    label: "03 · Act",
    title: "Execute with control",
    description: "Generate drafts, update files, create tickets, prepare reports, trigger workflows and keep humans in the approval loop.",
    color: "#F4D06F",
    signal: "Work moves from insight to output",
  },
  {
    id: "learn",
    label: "04 · Learn",
    title: "Improve the loop",
    description: "Save examples, outcomes and corrections so future runs become faster, safer and more relevant.",
    color: "#F08CA8",
    signal: "Every run creates reusable knowledge",
  },
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: "daily-ai-brief",
    title: "Daily AI intelligence brief",
    domain: "Research",
    summary: "Turns live frontier sources into a short daily briefing with what changed, why it matters and what to try next.",
    outcome: "A trusted daily operating picture for AI leaders and builders.",
    steps: ["Aggregate sources", "Deduplicate events", "Rank by impact", "Write briefing", "Archive decisions"],
    tools: ["Live feed", "News archive", "Weekly picks", "RSS/JSON Feed"],
    href: "/live/",
    maturity: "Starter",
    color: "#9F8CFF",
  },
  {
    id: "meeting-to-actions",
    title: "Meeting-to-action system",
    domain: "Productivity",
    summary: "Converts meeting notes, transcripts and follow-ups into decisions, owners, deadlines and ready-to-send drafts.",
    outcome: "Less meeting fog, more accountable execution.",
    steps: ["Capture transcript", "Extract decisions", "Assign owners", "Draft follow-ups", "Track unresolved items"],
    tools: ["Calendar", "Email", "Docs", "Task board"],
    href: "/guides/",
    maturity: "Starter",
    color: "#8FE3D2",
  },
  {
    id: "finance-variance-copilot",
    title: "Finance variance copilot",
    domain: "Finance & FP&A",
    summary: "Reads actuals, forecast, commentary and drivers, then prepares a variance narrative with risks and questions.",
    outcome: "A faster close cycle and sharper business-review story.",
    steps: ["Load actuals", "Compare forecast", "Detect drivers", "Draft narrative", "Prepare stakeholder questions"],
    tools: ["Excel", "Power BI", "SAP", "Prompt library"],
    href: "/prompts/",
    maturity: "Operator",
    color: "#F4D06F",
  },
  {
    id: "github-pr-review-agent",
    title: "GitHub PR review agent",
    domain: "Software Development",
    summary: "Summarizes code changes, checks tests, explains risk and drafts review comments before merge.",
    outcome: "Cleaner pull requests and fewer hidden regressions.",
    steps: ["Read diff", "Map changed files", "Run checks", "Summarize risk", "Draft review"],
    tools: ["GitHub", "CI", "Code model", "Test logs"],
    href: "/tools/",
    maturity: "Operator",
    color: "#B6A6FF",
  },
  {
    id: "customer-research-loop",
    title: "Customer research loop",
    domain: "Research & Analysis",
    summary: "Turns interviews, support tickets and market notes into themes, evidence and product opportunities.",
    outcome: "A living customer-insight system instead of scattered notes.",
    steps: ["Collect sources", "Cluster themes", "Extract quotes", "Score opportunities", "Create roadmap inputs"],
    tools: ["Docs", "Sheets", "Embeddings", "Topic hubs"],
    href: "/research/",
    maturity: "Advanced",
    color: "#6EE7A0",
  },
  {
    id: "personal-ai-os",
    title: "Personal AI operating system",
    domain: "Agentic Workflows",
    summary: "Combines live context, memory, tools and approval gates into a repeatable daily operating loop.",
    outcome: "A personal command center for work, learning and execution.",
    steps: ["Define operating rhythm", "Connect tools", "Create memory", "Add approvals", "Review outcomes"],
    tools: ["MCP", "Local models", "Cloud APIs", "Knowledge graph"],
    href: "/learn/",
    maturity: "Advanced",
    color: "#F08CA8",
  },
];

export const AUTOMATION_STACK: AutomationStackLayer[] = [
  {
    id: "interface",
    label: "Interface",
    description: "Where the human gives intent and reviews output.",
    examples: ["Chat", "Command palette", "Dashboard", "Mobile capture"],
  },
  {
    id: "orchestration",
    label: "Orchestration",
    description: "The logic that decides which model, tool and step runs next.",
    examples: ["Agent loop", "Workflow engine", "Router", "Scheduler"],
  },
  {
    id: "models",
    label: "Models",
    description: "The reasoning layer, selected by task, cost, privacy and capability.",
    examples: ["Frontier APIs", "Local models", "Specialist models", "Embeddings"],
  },
  {
    id: "tools",
    label: "Tools",
    description: "The actions the system can take after reasoning.",
    examples: ["Email", "Calendar", "GitHub", "Sheets", "Browser", "Files"],
  },
  {
    id: "memory",
    label: "Memory",
    description: "The reusable context that makes each run smarter than the last.",
    examples: ["Knowledge graph", "Vector index", "Decision log", "Examples"],
  },
  {
    id: "governance",
    label: "Governance",
    description: "The constraints that keep automation safe, auditable and reversible.",
    examples: ["Approval gates", "Scopes", "Logs", "Rollback", "Source citations"],
  },
];

export const AUTOMATION_GUARDRAILS = [
  "Human approval for external sends, writes and irreversible actions",
  "Source links and confidence notes for research and business claims",
  "Clear tool scopes so an agent can narrow permissions but never expand them",
  "Dry-run preview before changing files, tickets, calendars or data",
  "Audit log for prompt, input, tool call, output and final decision",
];
