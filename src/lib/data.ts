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
}

const DOMAIN_MAP: Record<string, Exclude<Category, "all">> = {
  "Business Intelligence":   "operations",
  "Personal Productivity":   "operations",
  "Design & Creative":       "design",
  "Software Development":    "engineering",
  "Research & Analysis":     "research",
  "Communication & Writing": "marketing",
};

export const USE_CASES: UseCase[] = (rawData as any[]).map((item, idx) => ({
  id: idx + 1,
  title: item.title,
  desc: item.best_for || item.outcome || "",
  category: DOMAIN_MAP[item.domain] ?? "operations",
  difficulty: (item.skill_level as string).toLowerCase() as UseCase["difficulty"],
  tags: (item.tags as string[]).slice(0, 4),
  prompt: item.prompt,
  source: item.source,
  outcome: item.outcome || "",
  inputs: item.inputs || [],
  tools: item.tools || [],
  est_time: item.est_time || "",
  output_kind: (item.output_kind as OutputKind) || "analysis",
  sample_output: item.sample_output || "",
}));

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
