// Lightweight constants, types, and helpers shared across the app that do
// NOT depend on the 8600+ line src/data/useCases.json dataset. Kept separate
// from data.ts so that components which only need e.g. BASE_PATH (like
// Header.tsx, rendered on every page) don't pull the full USE_CASES array
// into their bundle.

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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
  slug: string;
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

  // Trust & context fields
  confidence?: "high" | "medium" | "low";
  region?: "global" | "brazil" | "latam" | "us" | "eu";
  last_verified?: string; // ISO "YYYY-MM-DD"

  // Cross-linking
  related_tools?: string[]; // tool IDs from toolsData.ts
}

export const DIFF_COLOR: Record<string, string> = {
  beginner: "#F26D6D",
  intermediate: "#F2C46D",
  advanced: "#8FE3D2",
  expert: "#9F8CFF",
};

/** Single source of truth for category accent colours — used by cards, modals, and the library browser. */
export const CAT_ACCENT: Record<string, string> = {
  "quick-wins":     "#9F8CFF",
  "productivity":   "#9F8CFF",
  "writing":        "#9F8CFF",
  "research":       "#9F8CFF",
  "finance":        "#9F8CFF",
  "data-analytics": "#9F8CFF",
  "coding":         "#9F8CFF",
  "creative-ai":    "#9F8CFF",
  "game-advanced":  "#9F8CFF",
};

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
