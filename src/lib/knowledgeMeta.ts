import type { KnowledgeKind } from "./knowledgeData";

export const KNOWLEDGE_KIND_LABELS: Record<KnowledgeKind, string> = {
  capability: "Capability guide", announcement: "Provider announcement", workflow: "Example workflow", "case-study": "Customer story",
};

export const KNOWLEDGE_AUDIENCES = { personal: "Personal", corporate: "Corporate", developer: "Developer" } as const;
export const KNOWLEDGE_TOPICS = ["ChatGPT", "Claude Code", "Claude Cowork", "Claude", "Microsoft 365", "Excel", "PowerPoint", "Power BI", "Finance", "Skills", "Plugins", "Connectors", "Cloud", "MCP", "Anthropic", "3D", "Blender", "Game assets", "Worlds & environments", "Modeling & reconstruction", "Materials & lighting", "Animation & characters", "Physics & simulation", "Architecture & products", "Space & scientific data", "Web, XR & interaction", "LLMs, MCP & production"];

