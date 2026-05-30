import { UseCase, USE_CASES } from "./data";

export interface Collection {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  color: string;
  /** Category filter (optional) */
  category?: string;
  /** Difficulty filter (optional) */
  difficulty?: string;
  /** Tag must be present (optional) */
  tag?: string;
  /** Max items to show */
  limit: number;
}

export const COLLECTIONS: Collection[] = [
  {
    id: "finance-essentials",
    title: "Finance Essentials",
    tagline: "Board-ready analysis, variance reports, and FP&A automation.",
    icon: "📊",
    color: "#6EE7A0",
    category: "finance",
    limit: 6,
  },
  {
    id: "quick-wins",
    title: "5-Minute Wins",
    tagline: "Prompts anyone can use today with zero AI experience.",
    icon: "⚡",
    color: "#F4D06F",
    category: "quick-wins",
    difficulty: "beginner",
    limit: 6,
  },
  {
    id: "content-creator",
    title: "Content Creator Pack",
    tagline: "Blogs, social copy, email campaigns — at scale.",
    icon: "✍️",
    color: "#F08CA8",
    category: "writing",
    limit: 6,
  },
  {
    id: "data-power-user",
    title: "Data Power User",
    tagline: "SQL, dashboards, pipelines, and automated insight reports.",
    icon: "🔬",
    color: "#E8C089",
    category: "data-analytics",
    limit: 6,
  },
  {
    id: "code-automation",
    title: "Code & Automation",
    tagline: "Scripts, refactors, APIs, and agentic workflows.",
    icon: "💻",
    color: "#9F8CFF",
    category: "coding",
    limit: 6,
  },
];

/** Returns the use cases matching a collection's filters. */
export function getCollectionItems(collection: Collection): UseCase[] {
  return USE_CASES.filter(u => {
    if (collection.category && u.category !== collection.category) return false;
    if (collection.difficulty && u.difficulty !== collection.difficulty) return false;
    if (collection.tag && !u.tags.includes(collection.tag)) return false;
    return true;
  }).slice(0, collection.limit);
}
