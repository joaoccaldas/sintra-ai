import rawData from "@/data/useCases.json";

export type Category =
  | "all"
  | "marketing"
  | "engineering"
  | "operations"
  | "research"
  | "design"
  | "leadership";

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

const LLM_MAP: Record<string, Record<string, { model: string; reason: string }>> = {
  marketing: {
    beginner:     { model: "Claude Haiku 3.5",  reason: "Fast, fluent copy generation for everyday tasks" },
    intermediate: { model: "Claude 3.5 Sonnet", reason: "Superior tone control and long-form writing quality" },
    advanced:     { model: "Claude 3.5 Sonnet", reason: "Best-in-class writing with deep contextual nuance" },
    expert:       { model: "Claude Opus 4",     reason: "Campaign-level strategic thinking plus brilliant prose" },
  },
  engineering: {
    beginner:     { model: "Claude Haiku 3.5",  reason: "Quick snippets and boilerplate at low cost" },
    intermediate: { model: "Claude 3.5 Sonnet", reason: "#1 on SWE-bench; precise multi-file reasoning" },
    advanced:     { model: "Claude 3.5 Sonnet", reason: "Leads coding benchmarks for complex refactors" },
    expert:       { model: "Claude Opus 4",     reason: "Deepest architectural reasoning for system design" },
  },
  operations: {
    beginner:     { model: "GPT-4o",            reason: "Strong structured data and spreadsheet reasoning" },
    intermediate: { model: "GPT-4o",            reason: "Excellent tabular logic and process structuring" },
    advanced:     { model: "Claude 3.5 Sonnet", reason: "Long context for multi-document process analysis" },
    expert:       { model: "Claude Opus 4",     reason: "Complex cross-functional planning and trade-offs" },
  },
  research: {
    beginner:     { model: "Perplexity",        reason: "Real-time web synthesis for quick research tasks" },
    intermediate: { model: "Claude 3.5 Sonnet", reason: "200k context; excels at multi-source synthesis" },
    advanced:     { model: "Claude 3.5 Sonnet", reason: "Deep literature synthesis with citation precision" },
    expert:       { model: "Claude Opus 4",     reason: "Most rigorous reasoning for complex research" },
  },
  design: {
    beginner:     { model: "GPT-4o",            reason: "Multimodal; quick visual feedback and critique" },
    intermediate: { model: "GPT-4o",            reason: "Best visual reasoning for design review and specs" },
    advanced:     { model: "Claude 3.5 Sonnet", reason: "Precise token and spec language for design systems" },
    expert:       { model: "Claude Opus 4",     reason: "Deep brand strategy and design system architecture" },
  },
  leadership: {
    beginner:     { model: "Claude 3.5 Sonnet", reason: "Clear, polished executive communication" },
    intermediate: { model: "Claude 3.5 Sonnet", reason: "Persuasive memos and nuanced stakeholder framing" },
    advanced:     { model: "Claude Opus 4",     reason: "Nuanced judgment for organizational decisions" },
    expert:       { model: "Claude Opus 4",     reason: "Strategic depth for C-suite communications" },
  },
};

const DOMAIN_MAP: Record<string, Exclude<Category, "all">> = {
  "Business Intelligence":   "operations",
  "Personal Productivity":   "operations",
  "Design & Creative":       "design",
  "Software Development":    "engineering",
  "Research & Analysis":     "research",
  "Communication & Writing": "marketing",
};

export const USE_CASES: UseCase[] = (rawData as any[]).map((item, idx) => {
  const cat   = DOMAIN_MAP[item.domain] ?? "operations";
  const skill = (item.skill_level as string).toLowerCase();
  const llmRec = LLM_MAP[cat]?.[skill] ?? { model: "Claude 3.5 Sonnet", reason: "Best overall balance of capability and speed" };
  return {
    id: idx + 1,
    title: item.title,
    desc: item.best_for || item.outcome || "",
    category: cat,
    difficulty: skill as UseCase["difficulty"],
    tags: (item.tags as string[]).slice(0, 4),
    prompt: item.prompt,
    source: item.source,
    outcome: item.outcome || "",
    inputs: item.inputs || [],
    tools: item.tools || [],
    est_time: item.est_time || "",
    output_kind: (item.output_kind as OutputKind) || "analysis",
    sample_output: item.sample_output || "",
    best_llm:   item.best_llm   ?? llmRec.model,
    llm_reason: item.llm_reason ?? llmRec.reason,
  };
});

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all",         label: "All" },
  { id: "marketing",   label: "Marketing" },
  { id: "engineering", label: "Engineering" },
  { id: "operations",  label: "Operations" },
  { id: "research",    label: "Research" },
  { id: "design",      label: "Design" },
  { id: "leadership",  label: "Leadership" },
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
  { id: "marketing",   label: "Marketing",   essence: "Voice, copy, outreach, growth experiments." },
  { id: "engineering", label: "Engineering", essence: "Code review, migration, debugging at scale." },
  { id: "operations",  label: "Operations",  essence: "Meetings, planning, finance, the unglamorous middle." },
  { id: "research",    label: "Research",    essence: "Triangulating papers, synthesising interviews." },
  { id: "design",      label: "Design",      essence: "Critique, tokens, empty states, audits." },
  { id: "leadership",  label: "Leadership",  essence: "Memos, steelmans, hiring loops, updates." },
] as const;

export const DISC_COUNTS: Record<string, number> = Object.fromEntries(
  DISCIPLINES.map(d => [
    d.id,
    USE_CASES.filter(u => u.category === d.id).length,
  ])
);

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
