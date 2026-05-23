import rawData from "@/data/useCases.json";

export type Category =
  | "all"
  | "quick-wins"
  | "productivity"
  | "writing"
  | "research"
  | "finance"
  | "data-analytics"
  | "coding"
  | "creative-ai"
  | "game-advanced";

export type Difficulty =
  | "all"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export type OutputKind =
  | "analysis"
  | "code"
  | "visual"
  | "spec"
  | "templates"
  | "table"
  | "deck"
  | "plan";

export interface PromptInput {
  label: string;
}

export interface UseCase {
  id: number;
  title: string;
  desc: string;
  category: Exclude<Category, "all">;
  difficulty: Exclude<Difficulty, "all">;
  tags: string[];
  prompt: string;
  source?: string;
  dateAdded: string; // ISO "YYYY-MM-DD"

  // Enriched fields
  outcome: string;
  inputs: PromptInput[];
  tools: string[];
  est_time: string;
  output_kind: OutputKind;
  sample_output: string;
  best_llm: string;
  llm_reason: string;
}

// Verified 2026-05 — model quality shifts quarterly; treat recommendations as starting points
const LLM_MAP: Record<string, Record<string, { model: string; reason: string }>> = {
  "quick-wins": {
    beginner:     { model: "Claude Haiku 4.5",  reason: "Instant responses for simple, high-frequency tasks" },
    intermediate: { model: "Claude Haiku 4.5",  reason: "Fast and cost-effective for everyday productivity" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "More nuance for complex quick-win workflows" },
    expert:       { model: "Claude Sonnet 4.6", reason: "Full context handling for multi-step daily tasks" },
  },
  "productivity": {
    beginner:     { model: "Claude Haiku 4.5",  reason: "Snappy responses for note-taking and scheduling" },
    intermediate: { model: "Claude Sonnet 4.6", reason: "Balances speed with structured planning output" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Long context for complex workflow automation" },
    expert:       { model: "Claude Opus 4.7",   reason: "Deep reasoning for intricate operational systems" },
  },
  "writing": {
    beginner:     { model: "Claude Haiku 4.5",  reason: "Fast, fluent copy generation for everyday tasks" },
    intermediate: { model: "Claude Sonnet 4.6", reason: "Superior tone control and long-form writing quality" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Best-in-class writing with deep contextual nuance" },
    expert:       { model: "Claude Opus 4.7",   reason: "Campaign-level strategic thinking plus brilliant prose" },
  },
  "research": {
    beginner:     { model: "Perplexity",        reason: "Real-time web synthesis for quick research questions" },
    intermediate: { model: "Claude Sonnet 4.6", reason: "200k context; excels at multi-source synthesis" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Deep literature synthesis with citation precision" },
    expert:       { model: "Claude Opus 4.7",   reason: "Most rigorous reasoning for complex research" },
  },
  "finance": {
    beginner:     { model: "GPT-5.5 Instant",           reason: "Strong at spreadsheets and structured financial data" },
    intermediate: { model: "GPT-5.5 Instant",           reason: "Excellent tabular logic and financial model structuring" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Long context for multi-document FP&A analysis" },
    expert:       { model: "Claude Opus 4.7",   reason: "Complex cross-functional modeling and strategic trade-offs" },
  },
  "data-analytics": {
    beginner:     { model: "GPT-5.5 Instant",           reason: "Strong data reasoning and chart interpretation" },
    intermediate: { model: "Claude Sonnet 4.6", reason: "Handles complex queries across large datasets" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Deep BI workflow design and data pipeline reasoning" },
    expert:       { model: "Claude Opus 4.7",   reason: "Autonomous analytics reasoning for enterprise-scale systems" },
  },
  "coding": {
    beginner:     { model: "Claude Haiku 4.5",  reason: "Quick snippets and boilerplate at low latency" },
    intermediate: { model: "Claude Sonnet 4.6", reason: "Top SWE-bench score; precise multi-file reasoning" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Leads coding benchmarks for complex refactors" },
    expert:       { model: "Claude Opus 4.7",   reason: "Deepest architectural reasoning for system design" },
  },
  "creative-ai": {
    beginner:     { model: "GPT-5.5 Instant",           reason: "Multimodal; understands and generates visual briefs" },
    intermediate: { model: "GPT-5.5 Instant",           reason: "Best visual reasoning for creative direction" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Detailed prompt engineering for generative models" },
    expert:       { model: "Claude Opus 4.7",   reason: "Deep aesthetic reasoning and brand-level thinking" },
  },
  "game-advanced": {
    beginner:     { model: "Claude Sonnet 4.6", reason: "Clear game design explanations and basic scripts" },
    intermediate: { model: "Claude Sonnet 4.6", reason: "Game logic, dialogue systems, and level design" },
    advanced:     { model: "Claude Sonnet 4.6", reason: "Complex game mechanics and AI agent workflows" },
    expert:       { model: "Claude Opus 4.7",   reason: "Deep systems design for advanced game architecture" },
  },
};

const DOMAIN_MAP: Record<string, Exclude<Category, "all">> = {
  "Quick Wins":              "quick-wins",
  "Personal Productivity":   "productivity",
  "Communication & Writing": "writing",
  "Research & Analysis":     "research",
  "Finance & FP&A":          "finance",
  "Data & Analytics":        "data-analytics",
  "Software Development":    "coding",
  "Creative AI":             "creative-ai",
  "Design & Creative":       "creative-ai",
  "Game Development":        "game-advanced",
};

export const USE_CASES: UseCase[] = (rawData as any[])
  .map((item, idx) => {
    const cat   = DOMAIN_MAP[item.domain] ?? "productivity";
    const skill = (item.skill_level as string).toLowerCase();
    const llmRec = LLM_MAP[cat]?.[skill] ?? { model: "Claude Sonnet 4.5", reason: "Best overall balance of capability and speed" };
    return {
      id: idx + 1,
      title: item.title,
      desc: item.best_for || item.outcome || "",
      category: cat,
      difficulty: skill as UseCase["difficulty"],
      tags: (item.tags as string[]).slice(0, 4),
      prompt: item.prompt,
      source: item.source,
      dateAdded: item.dateAdded ?? "2025-01-01",
      outcome: item.outcome || "",
      inputs: item.inputs || [],
      tools: item.tools || [],
      est_time: item.est_time || "",
      output_kind: (item.output_kind as OutputKind) || "analysis",
      sample_output: item.sample_output || "",
      best_llm:   item.best_llm   ?? llmRec.model,
      llm_reason: item.llm_reason ?? llmRec.reason,
    };
  })
  .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all",            label: "All" },
  { id: "quick-wins",     label: "Quick Wins" },
  { id: "productivity",   label: "Productivity" },
  { id: "writing",        label: "Writing & Copy" },
  { id: "research",       label: "Research" },
  { id: "finance",        label: "Finance & FP&A" },
  { id: "data-analytics", label: "Data & Analytics" },
  { id: "coding",         label: "Code & Automation" },
  { id: "creative-ai",    label: "Creative & Design" },
  { id: "game-advanced",  label: "Game & Advanced" },
];

export const DIFFICULTIES: { id: Difficulty; label: string; color: string }[] = [
  { id: "all",          label: "All",          color: "" },
  { id: "beginner",     label: "Beginner",     color: "#F26D6D" },
  { id: "intermediate", label: "Intermediate", color: "#F2C46D" },
  { id: "advanced",     label: "Advanced",     color: "#8FE3D2" },
  { id: "expert",       label: "Expert",       color: "#9F8CFF" },
];

export const DIFF_COLOR: Record<string, string> = {
  beginner: "#F26D6D",
  intermediate: "#F2C46D",
  advanced: "#8FE3D2",
  expert: "#9F8CFF",
};

export const DISCIPLINES = [
  { id: "quick-wins",     label: "Quick Wins",        essence: "5-min wins anyone can use today." },
  { id: "productivity",   label: "Productivity",       essence: "Scheduling, notes, planning, automation." },
  { id: "writing",        label: "Writing & Copy",     essence: "Long-form, email, social, brand voice." },
  { id: "research",       label: "Research",           essence: "Deep dives, synthesis, competitive intel." },
  { id: "finance",        label: "Finance & FP&A",     essence: "Forecasting, modeling, variance, board decks." },
  { id: "data-analytics", label: "Data & Analytics",   essence: "BI dashboards, data pipelines, insight automation." },
  { id: "coding",         label: "Code & Automation",  essence: "Apps, APIs, scripts, architecture." },
  { id: "creative-ai",    label: "Creative & Design",  essence: "Image gen, UI/UX, visual direction, branding." },
  { id: "game-advanced",  label: "Game & Advanced",    essence: "Game dev, 3D, agents, LLM pipelines." },
];

export const DISC_COUNTS: Record<string, number> = Object.fromEntries(
  DISCIPLINES.map(d => [
    d.id,
    USE_CASES.filter(u => u.category === d.id).length,
  ])
);

/** Single source of truth for all use-case search — used by global search and panel search. */
export function matchesUseCase(item: UseCase, query: string): boolean {
  const q = query.toLowerCase();
  return [
    item.title,
    item.desc,
    item.outcome,
    item.prompt,
    item.source ?? "",
    item.best_llm,
    item.llm_reason,
    ...item.tools,
    ...item.tags,
    ...item.inputs.map(i => i.label),
  ].some(v => v.toLowerCase().includes(q));
}

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
