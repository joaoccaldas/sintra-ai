import Fuse from "fuse.js";
import { USE_CASES, BASE_PATH } from "./data";
import { AI_TOOLS } from "./toolsData";
import { AI_NEWS } from "./newsData";
import { LEARNING_PATHS } from "./learningPathsData";
import { CONCEPTS } from "./concepts";
import { AI_LABS } from "./aiLabsData";
import { RESOURCES } from "./resourcesData";
import { TOPIC_HUBS } from "./topicsData";
import { AI_MODELS } from "./modelsData";

export type EntityKind =
  | "use_case"
  | "tool"
  | "concept"
  | "lab"
  | "news"
  | "path"
  | "resource"
  | "topic"
  | "model";

export interface SearchDocument {
  id: string;
  kind: EntityKind;
  title: string;
  summary: string;
  tags: string[];
  href: string;
  body: string;
  useCaseId?: number;
}

export const KIND_META: Record<EntityKind, { label: string; pluralLabel: string; color: string }> = {
  use_case: { label: "Use Case",      pluralLabel: "Use Cases",      color: "#9F8CFF" },
  tool:     { label: "Tool",          pluralLabel: "Tools",          color: "#8FE3D2" },
  concept:  { label: "Concept",       pluralLabel: "Concepts",       color: "#F4D06F" },
  lab:      { label: "AI Lab",        pluralLabel: "AI Labs",        color: "#F08CA8" },
  news:     { label: "News",          pluralLabel: "News",           color: "#6EE7A0" },
  path:     { label: "Learning Path", pluralLabel: "Learning Paths", color: "#E8C089" },
  resource: { label: "Resource",      pluralLabel: "Resources",      color: "#B6A6FF" },
  topic:    { label: "Topic Hub",     pluralLabel: "Topic Hubs",     color: "#FDA4AF" },
  model:    { label: "AI Model",      pluralLabel: "AI Models",      color: "#E879F9" },
};

const KIND_ORDER: EntityKind[] = ["use_case", "model", "tool", "concept", "news", "lab", "path", "resource", "topic"];

export const SEARCH_INDEX: SearchDocument[] = [
  ...USE_CASES.map(u => ({
    id: `use_case-${u.id}`,
    kind: "use_case" as EntityKind,
    title: u.title,
    summary: u.desc || u.outcome,
    tags: u.tags,
    href: `${BASE_PATH}/#explore`,
    body: [u.title, u.desc, u.outcome, u.prompt, u.best_llm, ...u.tags, ...u.tools, ...u.inputs.map(i => i.label)].join(" "),
    useCaseId: u.id,
  })),
  ...AI_TOOLS.map(t => ({
    id: `tool-${t.id}`,
    kind: "tool" as EntityKind,
    title: t.name,
    summary: t.tagline,
    tags: t.tags,
    href: `${BASE_PATH}/tools/`,
    body: [t.name, t.tagline, t.description, t.provider, t.category, t.highlight, ...t.tags].join(" "),
  })),
  ...CONCEPTS.map(c => ({
    id: `concept-${c.id}`,
    kind: "concept" as EntityKind,
    title: c.term + (c.shortTerm ? ` (${c.shortTerm})` : ""),
    summary: c.tagline,
    tags: [c.category, ...c.related].slice(0, 4),
    href: `${BASE_PATH}/concepts/`,
    body: [c.term, c.shortTerm ?? "", c.tagline, c.body, c.analogy, c.category, ...c.related].join(" "),
  })),
  ...AI_NEWS.map(n => ({
    id: `news-${n.id}`,
    kind: "news" as EntityKind,
    title: n.title,
    summary: n.summary,
    tags: n.tags,
    href: `${BASE_PATH}/news/`,
    body: [n.title, n.summary, n.provider, n.date, n.significance, ...n.tags].join(" "),
  })),
  ...AI_LABS.map(l => ({
    id: `lab-${l.id}`,
    kind: "lab" as EntityKind,
    title: l.name,
    summary: l.tagline,
    tags: l.focus.slice(0, 3),
    href: `${BASE_PATH}/ai-labs/`,
    body: [l.name, l.tagline, l.type, l.description, ...l.focus, ...l.strengths, ...l.useCases, ...l.products, ...l.models.map(m => m.name)].join(" "),
  })),
  ...LEARNING_PATHS.map(p => ({
    id: `path-${p.id}`,
    kind: "path" as EntityKind,
    title: p.title,
    summary: p.tagline,
    tags: [p.level, p.audience],
    href: `${BASE_PATH}/learn/`,
    body: [p.title, p.tagline, p.level, p.audience, ...p.steps.map(s => `${s.label} ${s.desc}`)].join(" "),
  })),
  ...RESOURCES.map(r => ({
    id: `resource-${r.id}`,
    kind: "resource" as EntityKind,
    title: r.name,
    summary: r.tagline,
    tags: r.tags,
    href: `${BASE_PATH}/resources/`,
    body: [r.name, r.tagline, r.category, r.highlight ?? "", ...r.tags].join(" "),
  })),
  ...AI_MODELS.map(m => ({
    id: `model-${m.id}`,
    kind: "model" as EntityKind,
    title: m.name,
    summary: m.highlight,
    tags: [m.provider, m.tier, ...m.bestFor.slice(0, 3)],
    href: `${BASE_PATH}/models/`,
    body: [m.name, m.provider, m.highlight, m.tier, ...m.bestFor, m.apiId ?? ""].join(" "),
  })),
  ...TOPIC_HUBS.map(t => ({
    id: `topic-${t.slug}`,
    kind: "topic" as EntityKind,
    title: t.label,
    summary: t.description,
    tags: t.matchTags,
    href: `${BASE_PATH}/topics/${t.slug}/`,
    body: [t.label, t.description, ...t.matchTags].join(" "),
  })),
];

let fuse: Fuse<SearchDocument> | null = null;
function getFuse(): Fuse<SearchDocument> {
  if (!fuse) {
    fuse = new Fuse(SEARCH_INDEX, {
      keys: [
        { name: "title",   weight: 3 },
        { name: "tags",    weight: 2 },
        { name: "summary", weight: 1.5 },
        { name: "body",    weight: 0.8 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
  }
  return fuse;
}

export function searchAll(query: string): { kind: EntityKind; docs: SearchDocument[] }[] {
  const q = query.trim();
  if (!q) return [];

  const results = getFuse().search(q).map(r => r.item);

  const grouped: Partial<Record<EntityKind, SearchDocument[]>> = {};
  for (const doc of results) {
    if (!grouped[doc.kind]) grouped[doc.kind] = [];
    grouped[doc.kind]!.push(doc);
  }

  return KIND_ORDER
    .filter(k => grouped[k] && grouped[k]!.length > 0)
    .map(k => ({ kind: k, docs: grouped[k]! }));
}
