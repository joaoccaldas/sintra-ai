import Fuse from "fuse.js";
import { USE_CASES, BASE_PATH } from "./data";
import { AI_TOOLS } from "./toolsData";
import { AI_NEWS } from "./newsDataCombined";
import { LEARNING_PATHS } from "./learningPathsData";
import { CONCEPTS } from "./concepts";
import { AI_LABS } from "./aiLabsData";
import { RESOURCES } from "./resourcesData";
import { TOPIC_HUBS } from "./topicsData";
import { AI_MODELS } from "./modelsData";
import { AUTOMATION_WORKFLOWS } from "./automationData";

export type EntityKind =
  | "use_case"
  | "tool"
  | "concept"
  | "lab"
  | "news"
  | "path"
  | "resource"
  | "topic"
  | "model"
  | "automation";

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
  use_case: { label: "Use Case", pluralLabel: "Use Cases", color: "#9F8CFF" },
  tool: { label: "Tool", pluralLabel: "Tools", color: "#8FE3D2" },
  concept: { label: "Concept", pluralLabel: "Concepts", color: "#F4D06F" },
  lab: { label: "AI Lab", pluralLabel: "AI Labs", color: "#F08CA8" },
  news: { label: "News", pluralLabel: "News", color: "#6EE7A0" },
  path: { label: "Learning Path", pluralLabel: "Learning Paths", color: "#E8C089" },
  resource: { label: "Resource", pluralLabel: "Resources", color: "#B6A6FF" },
  topic: { label: "Topic Hub", pluralLabel: "Topic Hubs", color: "#FDA4AF" },
  model: { label: "AI Model", pluralLabel: "AI Models", color: "#E879F9" },
  automation: { label: "Automation", pluralLabel: "Automation", color: "#8FE3D2" },
};

const KIND_ORDER: EntityKind[] = ["use_case", "automation", "model", "tool", "concept", "news", "lab", "path", "resource", "topic"];

// The concept corpus contains a small amount of legacy duplicate-ID debt.
// Last-write-wins keeps search IDs deterministic until the source migration is complete.
const CANONICAL_CONCEPTS = [...new Map(CONCEPTS.map(concept => [concept.id, concept])).values()];

function internalSearchHref(route: string, query: string): string {
  return `${BASE_PATH}/${route}/?q=${encodeURIComponent(query)}`;
}

export const SEARCH_INDEX: SearchDocument[] = [
  ...USE_CASES.map(useCase => ({
    id: `use_case-${useCase.id}`,
    kind: "use_case" as EntityKind,
    title: useCase.title,
    summary: useCase.desc || useCase.outcome,
    tags: useCase.tags,
    href: `${BASE_PATH}/prompts/${useCase.slug}/`,
    body: [
      useCase.title,
      useCase.desc,
      useCase.outcome,
      useCase.prompt,
      useCase.best_llm,
      ...useCase.tags,
      ...useCase.tools,
      ...useCase.inputs.map(input => input.label),
    ].join(" "),
    useCaseId: useCase.id,
  })),
  ...AUTOMATION_WORKFLOWS.map(workflow => ({
    id: `automation-${workflow.id}`,
    kind: "automation" as EntityKind,
    title: workflow.title,
    summary: workflow.summary,
    tags: [workflow.domain, workflow.maturity, ...workflow.tools.slice(0, 3)],
    href: `${BASE_PATH}/automate/#workflows`,
    body: [
      workflow.title,
      workflow.domain,
      workflow.summary,
      workflow.outcome,
      workflow.maturity,
      ...workflow.steps,
      ...workflow.tools,
    ].join(" "),
  })),
  ...AI_TOOLS.map(tool => ({
    id: `tool-${tool.id}`,
    kind: "tool" as EntityKind,
    title: tool.name,
    summary: tool.tagline,
    tags: tool.tags,
    href: `${BASE_PATH}/tools/${tool.id}/`,
    body: [tool.name, tool.tagline, tool.description, tool.provider, tool.category, tool.highlight, ...tool.tags].join(" "),
  })),
  ...CANONICAL_CONCEPTS.map(concept => ({
    id: `concept-${concept.id}`,
    kind: "concept" as EntityKind,
    title: concept.term + (concept.shortTerm ? ` (${concept.shortTerm})` : ""),
    summary: concept.tagline,
    tags: [concept.category, ...concept.related].slice(0, 4),
    href: `${BASE_PATH}/concepts/${concept.id}/`,
    body: [
      concept.term,
      concept.shortTerm ?? "",
      concept.tagline,
      concept.body,
      concept.analogy,
      concept.category,
      ...concept.related,
    ].join(" "),
  })),
  ...AI_NEWS.map(news => ({
    id: `news-${news.id}`,
    kind: "news" as EntityKind,
    title: news.title,
    summary: news.summary,
    tags: news.tags,
    href: internalSearchHref("news", news.title),
    body: [news.title, news.summary, news.provider, news.date, news.significance, ...news.tags].join(" "),
  })),
  ...AI_LABS.map(lab => ({
    id: `lab-${lab.id}`,
    kind: "lab" as EntityKind,
    title: lab.name,
    summary: lab.tagline,
    tags: lab.focus.slice(0, 3),
    href: `${BASE_PATH}/ai-labs/#${lab.id}`,
    body: [
      lab.name,
      lab.tagline,
      lab.type,
      lab.description,
      ...lab.focus,
      ...lab.strengths,
      ...lab.useCases,
      ...lab.products,
      ...lab.models.map(model => model.name),
    ].join(" "),
  })),
  ...LEARNING_PATHS.map(path => ({
    id: `path-${path.id}`,
    kind: "path" as EntityKind,
    title: path.title,
    summary: path.tagline,
    tags: [path.level, path.audience],
    href: `${BASE_PATH}/learn/?path=${encodeURIComponent(path.id)}`,
    body: [path.title, path.tagline, path.level, path.audience, ...path.steps.map(step => `${step.label} ${step.desc}`)].join(" "),
  })),
  ...RESOURCES.map(resource => ({
    id: `resource-${resource.id}`,
    kind: "resource" as EntityKind,
    title: resource.name,
    summary: resource.tagline,
    tags: resource.tags,
    href: internalSearchHref("resources", resource.name),
    body: [resource.name, resource.tagline, resource.category, resource.highlight ?? "", ...resource.tags].join(" "),
  })),
  ...AI_MODELS.map(model => ({
    id: `model-${model.id}`,
    kind: "model" as EntityKind,
    title: model.name,
    summary: model.highlight,
    tags: [model.provider, model.tier, ...model.bestFor.slice(0, 3)],
    href: `${BASE_PATH}/models/?model=${encodeURIComponent(model.id)}`,
    body: [model.name, model.provider, model.highlight, model.tier, ...model.bestFor, model.apiId ?? ""].join(" "),
  })),
  ...TOPIC_HUBS.map(topic => ({
    id: `topic-${topic.slug}`,
    kind: "topic" as EntityKind,
    title: topic.label,
    summary: topic.description,
    tags: topic.matchTags,
    href: `${BASE_PATH}/topics/${topic.slug}/`,
    body: [topic.label, topic.description, ...topic.matchTags].join(" "),
  })),
];

let fuse: Fuse<SearchDocument> | null = null;

function getFuse(): Fuse<SearchDocument> {
  if (!fuse) {
    fuse = new Fuse(SEARCH_INDEX, {
      keys: [
        { name: "title", weight: 3 },
        { name: "tags", weight: 2 },
        { name: "summary", weight: 1.5 },
        { name: "body", weight: 0.8 },
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
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return [];

  const results = getFuse().search(normalizedQuery).map(result => result.item);
  const grouped: Partial<Record<EntityKind, SearchDocument[]>> = {};

  for (const document of results) {
    if (!grouped[document.kind]) grouped[document.kind] = [];
    grouped[document.kind]!.push(document);
  }

  return KIND_ORDER
    .filter(kind => grouped[kind]?.length)
    .map(kind => ({ kind, docs: grouped[kind]! }));
}
