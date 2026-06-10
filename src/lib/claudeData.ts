export interface ClaudeModel {
  id: string;
  name: string;
  tagline: string;
  tier: "haiku" | "sonnet" | "opus" | "fable";
  color: string;
  contextWindow: string;
  inputPrice: string;
  outputPrice: string;
  speed: "fastest" | "balanced" | "most capable";
  bestFor: string[];
  features: string[];
  freeAccess: boolean;
}

export interface ClaudeProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  url: string;
  highlights: string[];
}

export interface ClaudeCapability {
  id: string;
  name: string;
  icon: string;
  desc: string;
  link?: string;
}

// ─── Models ──────────────────────────────────────────────────────────────────

export const CLAUDE_MODELS: ClaudeModel[] = [
  {
    id: "claude-haiku-4-5-20251001",
    name: "Claude Haiku 4.5",
    tagline: "Fastest Claude for high-volume tasks",
    tier: "haiku",
    color: "#10b981",
    contextWindow: "200K",
    inputPrice: "$0.80 / 1M tokens",
    outputPrice: "$4 / 1M tokens",
    speed: "fastest",
    bestFor: [
      "High-frequency pipelines",
      "Real-time chat",
      "Classification",
      "Summarization",
    ],
    features: [
      "Lowest latency in the Claude family",
      "Cost-optimized for production scale",
      "200K token context window",
      "Strong instruction following",
      "Ideal for agentic sub-tasks that require speed",
    ],
    freeAccess: false,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    tagline: "The sweet spot of intelligence and speed",
    tier: "sonnet",
    color: "#9F8CFF",
    contextWindow: "200K",
    inputPrice: "$3 / 1M tokens",
    outputPrice: "$15 / 1M tokens",
    speed: "balanced",
    bestFor: [
      "Software engineering",
      "Research & analysis",
      "Long-form writing",
      "Agentic workflows",
    ],
    features: [
      "Top performance on SWE-bench coding evals",
      "200K token context for multi-document tasks",
      "Accurate multi-step agentic execution",
      "Nuanced instruction following and tone control",
      "Best cost-to-capability ratio for production apps",
    ],
    freeAccess: false,
  },
  {
    id: "claude-opus-4-7",
    name: "Claude Opus 4.7",
    tagline: "Maximum intelligence with extended thinking",
    tier: "opus",
    color: "#f59e0b",
    contextWindow: "200K",
    inputPrice: "$15 / 1M tokens",
    outputPrice: "$75 / 1M tokens",
    speed: "most capable",
    bestFor: [
      "Complex reasoning",
      "Strategic analysis",
      "Long-horizon agents",
      "Scientific research",
    ],
    features: [
      "Extended Thinking mode for deep chain-of-thought",
      "Highest accuracy on complex reasoning benchmarks",
      "Ideal for long-horizon autonomous agent tasks",
      "Superior performance on graduate-level STEM problems",
      "Best-in-class for nuanced multi-step decision making",
    ],
    freeAccess: false,
  },
  {
    id: "claude-fable-5",
    name: "Claude Fable 5",
    tagline: "Anthropic's most capable model — frontier agentic reasoning",
    tier: "fable",
    color: "#e11d48",
    contextWindow: "1M",
    inputPrice: "$10 / 1M tokens",
    outputPrice: "$50 / 1M tokens",
    speed: "most capable",
    bestFor: [
      "Multi-day autonomous agents",
      "Frontier software engineering",
      "Long-horizon planning",
      "Scientific research",
    ],
    features: [
      "95% on SWE-bench Verified — state of the art at launch",
      "1M-token context window with up to 128K output tokens",
      "Always-on adaptive thinking — no separate 'extended thinking' toggle",
      "Sustains autonomous multi-day tasks with self-verification and sub-agent delegation",
      "Memory tool, code execution, and programmatic tool calling built in",
    ],
    freeAccess: false,
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const CLAUDE_PRODUCTS: ClaudeProduct[] = [
  {
    id: "claude-ai",
    name: "Claude.ai",
    tagline: "The flagship Claude chat interface",
    description:
      "A polished web and mobile chat interface giving direct access to the Claude model family. Supports Projects for persistent context, artifact rendering, file uploads, vision, and voice.",
    icon: "💬",
    color: "#9F8CFF",
    url: "https://claude.ai",
    highlights: [
      "Projects with persistent memory across conversations",
      "Artifact preview for code, documents, and SVGs",
      "File and image upload with vision understanding",
      "Free tier available with Claude access",
    ],
  },
  {
    id: "claude-api",
    name: "Claude API",
    tagline: "Full programmatic access via Anthropic's API",
    description:
      "Enterprise-grade REST API giving developers access to all Claude models with tool use, streaming, batch processing, prompt caching, and the full suite of capabilities for production applications.",
    icon: "⚡",
    color: "#5EEAD4",
    url: "https://console.anthropic.com",
    highlights: [
      "Access all Claude models with a single API key",
      "Prompt caching for up to 90% cost reduction on repeated context",
      "Streaming, tool use, and structured output support",
      "Python and TypeScript SDKs with full type safety",
    ],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    tagline: "Agentic AI coding assistant for the terminal",
    description:
      "A CLI tool that brings Claude directly into your development workflow. Claude Code can read and edit files, run terminal commands, manage git, and complete multi-step software engineering tasks autonomously.",
    icon: "🖥️",
    color: "#8FE3D2",
    url: "https://claude.ai/code",
    highlights: [
      "Reads, writes, and refactors entire codebases",
      "Runs shell commands, tests, and git operations",
      "MCP server support for custom tool integrations",
      "Remote Control for browser-based agent sessions",
    ],
  },
  {
    id: "claude-ios",
    name: "Claude iOS App",
    tagline: "Claude on the go — with Remote Control support",
    description:
      "The native iOS app for Claude gives you access to conversations on iPhone and iPad, with voice input, image understanding, and Remote Control capability to manage Claude Code sessions from your phone.",
    icon: "📱",
    color: "#f59e0b",
    url: "https://apps.apple.com/us/app/claude-by-anthropic/id6473753684",
    highlights: [
      "Full Claude model access on iPhone and iPad",
      "Voice input for hands-free conversation",
      "Remote Control: monitor and guide Claude Code sessions",
      "Projects sync with claude.ai for continuity",
    ],
  },
];

// ─── Capabilities ─────────────────────────────────────────────────────────────

export const CLAUDE_CAPABILITIES: ClaudeCapability[] = [
  {
    id: "extended-thinking",
    name: "Extended Thinking",
    icon: "🧠",
    desc: "Claude Opus 4.7 can reason through problems step-by-step before answering, spending more compute tokens on hard problems to produce more accurate, transparent conclusions.",
    link: "https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking",
  },
  {
    id: "tool-use",
    name: "Tool Use",
    icon: "🔧",
    desc: "Define custom tools (functions) that Claude can invoke mid-conversation. Enables reliable structured data extraction, API calls, and dynamic agentic behavior.",
    link: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
  },
  {
    id: "vision",
    name: "Vision",
    icon: "👁️",
    desc: "All Claude models can analyze images — screenshots, diagrams, documents, photographs. Upload images via base64 or URL for multi-modal reasoning.",
    link: "https://docs.anthropic.com/en/docs/build-with-claude/vision",
  },
  {
    id: "computer-use",
    name: "Computer Use",
    icon: "🖱️",
    desc: "Claude can interact with a computer: move the mouse, click, type, take screenshots, and navigate GUIs autonomously. Enables fully automated desktop and browser workflows.",
    link: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use",
  },
  {
    id: "multi-turn",
    name: "Multi-turn Conversations",
    icon: "🔄",
    desc: "The Messages API supports full conversation history, enabling coherent multi-turn dialogues, project-scoped memory, and complex back-and-forth reasoning sessions.",
  },
  {
    id: "batch-api",
    name: "Batch API",
    icon: "📦",
    desc: "Process thousands of requests asynchronously at up to 50% lower cost. Ideal for offline evaluation, data labeling, content generation, and large-scale analysis pipelines.",
    link: "https://docs.anthropic.com/en/docs/build-with-claude/batch",
  },
  {
    id: "mcp",
    name: "Model Context Protocol",
    icon: "🔌",
    desc: "An open standard for connecting AI models to external data sources and tools. MCP servers expose resources, prompts, and tools that Claude can discover and use at runtime.",
    link: "https://modelcontextprotocol.io",
  },
  {
    id: "prompt-caching",
    name: "Prompt Caching",
    icon: "⚡",
    desc: "Cache frequently reused context (system prompts, documents, tool definitions) between API calls. Reduces latency by up to 85% and costs by up to 90% for cache hits.",
    link: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
  },
];

// ─── Links ────────────────────────────────────────────────────────────────────

export const CLAUDE_LINKS: { label: string; url: string; category: string }[] = [
  { label: "Anthropic Docs",      url: "https://docs.anthropic.com",                                    category: "docs"    },
  { label: "API Reference",       url: "https://docs.anthropic.com/en/api",                             category: "docs"    },
  { label: "Pricing",             url: "https://www.anthropic.com/pricing",                              category: "pricing" },
  { label: "API Console",         url: "https://console.anthropic.com",                                  category: "api"     },
  { label: "Status Page",         url: "https://status.anthropic.com",                                   category: "ops"     },
  { label: "Claude Code Docs",    url: "https://docs.anthropic.com/en/docs/claude-code",                 category: "docs"    },
  { label: "MCP Docs",            url: "https://modelcontextprotocol.io/introduction",                   category: "docs"    },
  { label: "Remote Control Docs", url: "https://code.claude.com/docs/en/remote-control",                category: "docs"    },
];
