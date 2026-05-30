import { USE_CASES } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsData";
import { AI_TOOLS } from "@/lib/toolsData";
import { CONCEPTS } from "@/lib/concepts";

export interface TopicDef {
  slug: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  matchTags: string[];   // case-insensitive, partial-match allowed
}

export const TOPIC_HUBS: TopicDef[] = [
  {
    slug: "agents",
    label: "AI Agents",
    icon: "◈",
    color: "#9F8CFF",
    description: "Autonomous AI systems that plan, use tools, and act across multi-step workflows.",
    matchTags: ["agents", "agentic", "agentic ai", "multi-agent", "computer use", "autonomous"],
  },
  {
    slug: "coding",
    label: "Coding",
    icon: "⬡",
    color: "#10b981",
    description: "Prompts, tools and news for software development, debugging, and code generation.",
    matchTags: ["coding", "code", "python", "developer", "swe-bench", "github", "copilot", "software"],
  },
  {
    slug: "writing",
    label: "Writing",
    icon: "✦",
    color: "#f59e0b",
    description: "Content creation, copywriting, editing, and storytelling with AI.",
    matchTags: ["writing", "copywriting", "content", "editing", "storytelling", "email"],
  },
  {
    slug: "research",
    label: "Research",
    icon: "◇",
    color: "#4285f4",
    description: "Literature review, synthesis, citation, and knowledge discovery.",
    matchTags: ["research", "academic", "citations", "literature", "synthesis"],
  },
  {
    slug: "multimodal",
    label: "Multimodal",
    icon: "△",
    color: "#ec4899",
    description: "Models and tools that work across text, images, audio, and video.",
    matchTags: ["multimodal", "vision", "image", "audio", "video", "text-to-image", "text-to-video"],
  },
  {
    slug: "reasoning",
    label: "Reasoning",
    icon: "◎",
    color: "#a855f7",
    description: "Chain-of-thought, math, logic, and deep analytical thinking in AI systems.",
    matchTags: ["reasoning", "chain-of-thought", "math", "logic", "thinking", "o1", "benchmark", "arc-agi", "gpqa"],
  },
  {
    slug: "open-source",
    label: "Open Source",
    icon: "⊞",
    color: "#06b6d4",
    description: "Open-weight models, self-hosted tools, and community-driven AI development.",
    matchTags: ["open source", "open-source", "open weights", "open-weights", "self-hosted", "llama", "mistral"],
  },
  {
    slug: "productivity",
    label: "Productivity",
    icon: "✦",
    color: "#f97316",
    description: "Workflows, automation, and AI tools that multiply personal and team output.",
    matchTags: ["productivity", "workflow", "automation", "meetings", "templates", "scheduling"],
  },
  {
    slug: "anthropic",
    label: "Anthropic",
    icon: "◈",
    color: "#d97706",
    description: "Claude models, research, and products from Anthropic.",
    matchTags: ["anthropic", "claude"],
  },
  {
    slug: "openai",
    label: "OpenAI",
    icon: "◇",
    color: "#10a37f",
    description: "GPT, ChatGPT, Sora, and the broader OpenAI ecosystem.",
    matchTags: ["openai", "gpt", "chatgpt", "sora", "dall-e", "o3", "o4"],
  },
  {
    slug: "google",
    label: "Google AI",
    icon: "△",
    color: "#4285f4",
    description: "Gemini, Vertex AI, Google DeepMind, and AI Overviews.",
    matchTags: ["google", "gemini", "deepmind", "vertex", "google ai", "google i/o"],
  },
  {
    slug: "enterprise",
    label: "Enterprise AI",
    icon: "⬡",
    color: "#0078d4",
    description: "Deployment at scale, governance, compliance, and ROI in large organizations.",
    matchTags: ["enterprise", "enterprise ai", "governance", "compliance", "b2b", "deployment"],
  },
  {
    slug: "finance",
    label: "Finance & FP&A",
    icon: "◎",
    color: "#10b981",
    description: "Financial analysis, modeling, forecasting, and AI in fintech.",
    matchTags: ["finance", "fp&a", "financial", "fintech", "investment", "excel", "dashboard", "power-bi"],
  },
  {
    slug: "brazil",
    label: "Brazil",
    icon: "⊞",
    color: "#009c3b",
    description: "AI news, regulations, and use cases specific to Brazil and Latin America.",
    matchTags: ["brazil", "brasil", "latam", "regulation", "lei 2338"],
  },
  {
    slug: "sweden",
    label: "Sweden",
    icon: "◇",
    color: "#006aa7",
    description: "AI ecosystem, research, and policy in Sweden and the Nordic region.",
    matchTags: ["sweden", "nordic", "kth", "chalmers", "vinnova"],
  },
  {
    slug: "safety",
    label: "AI Safety",
    icon: "◈",
    color: "#ef4444",
    description: "Alignment, interpretability, regulation, and responsible AI development.",
    matchTags: ["safety", "alignment", "interpretability", "policy", "regulation", "governance", "responsible ai"],
  },
  {
    slug: "infrastructure",
    label: "Infrastructure",
    icon: "⬡",
    color: "#6b7280",
    description: "GPUs, data centers, chips, and the compute layer powering modern AI.",
    matchTags: ["infrastructure", "gpu", "nvidia", "chips", "data center", "compute", "hardware"],
  },
];

function tagsMatch(itemTags: string[], matchTags: string[]): boolean {
  const lower = itemTags.map(t => t.toLowerCase());
  return matchTags.some(m => lower.some(t => t.includes(m) || m.includes(t)));
}

export function getTopicContent(topic: TopicDef) {
  const prompts = USE_CASES.filter(u => tagsMatch(u.tags, topic.matchTags));
  const news = AI_NEWS
    .filter(n => tagsMatch(n.tags, topic.matchTags))
    .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0));
  const tools = AI_TOOLS.filter(t => tagsMatch(t.tags, topic.matchTags));
  const concepts = CONCEPTS.filter(c =>
    tagsMatch([c.term, c.tagline, c.category], topic.matchTags) ||
    c.body.toLowerCase().split(" ").slice(0, 40).join(" ").includes(topic.matchTags[0])
  );
  return { prompts, news, tools, concepts };
}

export function tagToTopicSlug(tag: string): string | null {
  const lower = tag.toLowerCase();
  return TOPIC_HUBS.find(t =>
    t.matchTags.some(m => lower === m || lower.includes(m) || m.includes(lower))
  )?.slug ?? null;
}
