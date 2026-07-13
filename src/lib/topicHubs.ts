// Lightweight topic-hub definitions and helpers that do NOT depend on
// USE_CASES (and therefore not on the 8600+ line src/data/useCases.json).
// Kept separate from topicsData.ts so that components which only need
// TOPIC_HUBS / tagToTopicSlug (like AINewsPage.tsx, ExpandedCard.tsx,
// app/sitemap.ts) don't pull the full USE_CASES array into their bundle.

/**
 * A structured, actionable brief for a topic — written for an agent (or a
 * person) that needs to *act* on the topic, not just read about it. Kept
 * optional so existing topics don't all need one at once; populate the
 * highest-value topics first.
 */
export interface TopicPlaybook {
  /** 1-2 sentence definition — what this actually is, no marketing language. */
  whatItIs: string;
  /** Non-negotiable design/engineering principles for working in this space. */
  designPrinciples: string[];
  /** Concrete, specific tools/frameworks/models recommended today. */
  recommendedStack: string[];
  /** Situations where this approach is the right call. */
  bestUseCases: string[];
  /** Failure modes seen in practice — specific, not generic. */
  commonPitfalls: string[];
  /** Small, immediately-actionable tips. */
  tips: string[];
}

export interface TopicDef {
  slug: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  matchTags: string[];   // case-insensitive, partial-match allowed
  playbook?: TopicPlaybook;
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
  {
    slug: "generative-ui",
    label: "Generative UI",
    icon: "◆",
    color: "#ec4899",
    description: "Interfaces a model composes at runtime from a fixed component vocabulary, instead of a developer hand-coding every screen state in advance.",
    matchTags: ["generative ui", "generative-ui", "dynamic ui", "adaptive interface", "ai ui", "rsc", "streamui", "component generation", "ai-generated interface"],
    playbook: {
      whatItIs:
        "Generative UI is a model choosing and assembling interface components at runtime — picking a chart vs. a table vs. a form, and filling in its props — rather than a developer pre-building one fixed screen per possible state. The model decides *what* to show; the application still owns *how* each piece renders.",
      designPrinciples: [
        "Constrain generation to a fixed, finite component vocabulary — never let the model emit raw HTML/CSS. It should choose and configure pre-built, pre-tested components via structured output (tool calls / JSON), not author markup.",
        "Schema-validate every generated payload before render. Treat model output as untrusted input: validate against a strict schema and fail closed to a safe default view on any validation error.",
        "Stream incrementally. Render a skeleton immediately, then hydrate with structure and content as it arrives, rather than blocking on the full response.",
        "Keep state ownership with the application, not the model. The model selects and configures views; your code still owns data fetching, validation, and any mutation — never let generated UI directly trigger unvalidated actions.",
        "Solve accessibility once, at the component level. Because generation composes pre-built components, each component only needs to be accessible once — it doesn't need to be re-verified per generation.",
        "Always keep a deterministic fallback path. Every generatively-composed view should degrade to a static, testable equivalent; the generative path should never be the only path that renders the data.",
      ],
      recommendedStack: [
        "Vercel AI SDK's streamUI / React Server Components — the most mature generative-UI primitive as of 2026: the model's tool calls stream React components directly to the client.",
        "Claude (or another tool-use-capable model) with UI components defined as callable tools with strict JSON-schema inputs — the model 'renders' by calling the right tool with the right props.",
        "Zod (or an equivalent runtime validator) to check every generated prop payload against its schema before a component ever mounts.",
        "A small, well-documented component library (e.g. shadcn/ui) so the model is choosing from a constrained, known vocabulary rather than an open-ended design space.",
      ],
      bestUseCases: [
        "Adaptive dashboards that reconfigure based on a natural-language query (\"show churn by region this quarter\" → the model picks the chart type and filters, not a fixed pre-built dashboard).",
        "Dynamic form generation, where fields are added or removed based on earlier answers in a conversation rather than a static form schema.",
        "Chat-driven data exploration, where the model decides whether a table, a chart, or a one-line summary best answers a specific question.",
        "Adaptive onboarding flows that change shape based on the user's role or prior answers.",
      ],
      commonPitfalls: [
        "Letting the model generate raw HTML, CSS, or arbitrary JS directly — this is an XSS risk and produces inconsistent, unmaintainable output. Constrain to a component vocabulary instead.",
        "Skipping runtime validation and trusting model output structurally — a single malformed prop can crash the render tree with no safe fallback.",
        "No fallback state — a bad or partial generation leaves the user with a blank screen instead of a safe default view.",
        "Over-generating: treating every pixel as model-decided when most UIs are mostly static chrome plus a smaller generative region. Over-generation hurts consistency, cost, and latency for little benefit.",
      ],
      tips: [
        "Start with a small, fixed set of 5-8 components before expanding the vocabulary — prove selection quality on a narrow set first.",
        "Log every generation (input query, chosen component, props) — it's the dataset you'll need to evaluate and improve selection quality over time.",
        "Cache generated layouts for identical or near-identical queries where the underlying data hasn't changed.",
        "Ship the skeleton-then-hydrate streaming pattern from day one — retrofitting it later is much harder than building it in.",
      ],
    },
  },
  {
    slug: "ai-scratch-games",
    label: "AI-Built Scratch Games",
    icon: "▲",
    color: "#14b8a6",
    description: "Using AI to build a full Scratch (.sb3) game from idea to sprites to a loadable project file — and to test-play it via browser control and computer vision.",
    matchTags: ["scratch", "sb3", "scratch game", "game development", "computer use", "playwright", "browser agent", "sprite generation"],
    playbook: {
    whatItIs:
      "An .sb3 file is a ZIP archive containing project.json (a JSON graph of sprites, scripts, and blocks — not visual drag-and-drop data) plus asset files named by content hash. That structure is simple enough for an AI agent to construct directly; a second, separate AI loop can then play the finished game in a browser by screenshotting the stage and reasoning over the pixels, since Scratch exposes no external debug/state API.",
    designPrinciples: [
      "Treat generation and testing as two separate systems: one produces the .sb3 file (mostly one-shot generation), the other plays it back (a perception-action loop). Don't couple them.",
      "Lock the design brief before generating any art — a fixed sprite list, control scheme, and win/lose condition stated as one sentence each, so the block-graph logic has something concrete to target.",
      "Generate sprite costumes on transparent backgrounds, never baked into a scene — Scratch composites sprites onto the backdrop itself.",
      "Validate a hand-built project.json against the Scratch Foundation's published JSON Schema before assuming it will load — most load failures are a missing required field, not a zip-format error.",
      "The browser-testing agent must read game state from screenshots only. There is no console or state API to query from outside — this is a genuine computer-vision task, not a shortcut.",
      "Build and verify the simplest possible project (one sprite, one script) by hand-loading it into the Scratch editor before generating anything complex.",
    ],
    recommendedStack: [
      "Claude for the generative half: design-brief writing, block-graph construction, sprite-prompt generation.",
      "Plain JSON + zip handling (Python or Node, no Scratch-specific SDK required) to assemble project.json and package the .sb3.",
      "Playwright — via its MCP server or Anthropic's Computer Use pattern — as the actual browser-control mechanism for the testing half; there is no Scratch-specific browser-automation tool.",
      "Claude's vision input to read stage-canvas screenshots directly; no separate OCR/object-detection step needed for typical simple 2D Scratch games.",
      "Nous Research's Hermes models as an open-weight substitute for the generation half if a fully self-hosted pipeline is required — verify current licensing before commercial use.",
    ],
    bestUseCases: [
      "Rapid prototyping: turn a one-paragraph game idea into a loadable .sb3 for playtesting within one session.",
      "Automated regression testing of an existing Scratch project after an edit, using the perceive-decide-act loop to catch a stuck sprite or unreachable game-over state.",
      "Generating a batch of sprite/backdrop variations for the same game concept to compare art directions quickly.",
      "Teaching contexts: showing how a visual, block-based format maps to a plain JSON graph underneath, as an intro to how agents 'see' structured formats generally.",
    ],
    commonPitfalls: [
      "Hand-guessing the project.json shape instead of validating against the real JSON Schema — small omissions (a missing `shadow` or `topLevel` field) cause silent load failures.",
      "Baking backgrounds into sprite art, which breaks compositing and makes sprites look pasted-on once moving over the actual backdrop.",
      "Sending the full browser screenshot (including the block editor and menus) to the vision model instead of cropping to just the stage canvas — this adds noise and produces less reliable state reads.",
      "Skipping manual verification of the generated .sb3 before wiring up the autonomous playtester — debugging a malformed block graph is much harder once a testing loop is also in the mix.",
    ],
    tips: [
      "Generate the backdrop last, after seeing the sprite art style, so the two match.",
      "Crop screenshots to the stage canvas only before sending them to the vision model.",
      "Start the perceive-decide-act loop with a generous fixed interval between cycles and tune it down — too fast wastes calls on near-identical frames, too slow misses fast game state changes.",
      "Ask the testing agent for structured pass/fail output (stuck sprite? reachable win state? score behaving correctly?) so repeated playtest runs are actually comparable.",
    ],
    },
  },
];

export function tagsMatch(itemTags: string[], matchTags: string[]): boolean {
  const lower = itemTags.map(t => t.toLowerCase());
  return matchTags.some(m => lower.some(t => t.includes(m) || m.includes(t)));
}

export function tagToTopicSlug(tag: string): string | null {
  const lower = tag.toLowerCase();
  return TOPIC_HUBS.find(t =>
    t.matchTags.some(m => lower === m || lower.includes(m) || m.includes(lower))
  )?.slug ?? null;
}
