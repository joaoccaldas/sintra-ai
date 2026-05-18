const BASE_PATH = "/sintra-ai";

export interface PathStep {
  type: "concept" | "use-case" | "tool" | "page" | "read";
  label: string;
  desc: string;
  href: string;       // internal anchor or page path
  duration: string;   // "5 min", "10 min"
  icon: string;       // emoji
}

export interface LearningPath {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  color: string;       // hex
  level: "beginner" | "intermediate" | "advanced";
  audience: string;    // "For total beginners", "For developers", etc.
  totalDuration: string;
  steps: PathStep[];   // 5-8 steps per path
}

export const LEARNING_PATHS: LearningPath[] = [
  // ── 1. AI Foundations ────────────────────────────────────────────────────
  {
    id: "ai-foundations",
    title: "AI Foundations",
    tagline: "Go from zero to confidently understanding AI in under an hour.",
    emoji: "🧠",
    color: "#B6A6FF",
    level: "beginner",
    audience: "For anyone new to AI",
    totalDuration: "~45 min",
    steps: [
      {
        type: "page",
        label: "The AI Story So Far",
        desc: "Start with the big picture — 70 years of AI history from the Dartmouth Conference to ChatGPT, told as a visual timeline.",
        href: `${BASE_PATH}/ai-history`,
        duration: "10 min",
        icon: "🕰️",
      },
      {
        type: "concept",
        label: "What Is Machine Learning?",
        desc: "Understand the core idea behind almost every AI product: systems that learn from examples rather than explicit rules.",
        href: `${BASE_PATH}/concepts#machine-learning`,
        duration: "5 min",
        icon: "🤖",
      },
      {
        type: "concept",
        label: "Large Language Models (LLMs)",
        desc: "Learn what powers ChatGPT, Claude, and Gemini — and why 'next-token prediction' turned out to be surprisingly powerful.",
        href: `${BASE_PATH}/concepts#llm`,
        duration: "5 min",
        icon: "⬡",
      },
      {
        type: "concept",
        label: "Tokens and Context Windows",
        desc: "Understand the two key limits that shape every AI conversation: how text is chunked into tokens and how much the model can 'see' at once.",
        href: `${BASE_PATH}/concepts#tokens`,
        duration: "5 min",
        icon: "🪙",
      },
      {
        type: "page",
        label: "Meet the Major AI Labs",
        desc: "Get a quick overview of OpenAI, Anthropic, Google DeepMind, Meta AI, and others — who they are, what they build, and how they differ.",
        href: `${BASE_PATH}/ai-labs`,
        duration: "10 min",
        icon: "🏛️",
      },
      {
        type: "use-case",
        label: "Try Your First AI Task",
        desc: "Pick any Quick Win use case from the library and run it in ChatGPT or Claude. Seeing a real result is the fastest way to make it click.",
        href: `${BASE_PATH}/#library`,
        duration: "10 min",
        icon: "✨",
      },
    ],
  },

  // ── 2. Prompt Practitioner ────────────────────────────────────────────────
  {
    id: "prompt-practitioner",
    title: "Prompt Practitioner",
    tagline: "Master the craft of prompting and get consistently great AI outputs.",
    emoji: "✍️",
    color: "#5EEAD4",
    level: "intermediate",
    audience: "For knowledge workers and professionals",
    totalDuration: "~50 min",
    steps: [
      {
        type: "concept",
        label: "Prompt Engineering Fundamentals",
        desc: "Learn the core techniques — role-setting, few-shot examples, chain-of-thought, and output formatting — that separate expert prompters from casual users.",
        href: `${BASE_PATH}/concepts#prompt-engineering`,
        duration: "8 min",
        icon: "✨",
      },
      {
        type: "use-case",
        label: "Writing & Editing Use Cases",
        desc: "Browse the Writing & Copy category for real prompts across emails, reports, social posts, and long-form content. Study the prompt structures, not just the topics.",
        href: `${BASE_PATH}/#library`,
        duration: "10 min",
        icon: "📝",
      },
      {
        type: "use-case",
        label: "Research and Synthesis Prompts",
        desc: "Explore how structured prompts unlock AI's ability to summarize sources, spot contradictions, extract key data, and generate competitive analysis.",
        href: `${BASE_PATH}/#library`,
        duration: "10 min",
        icon: "🔍",
      },
      {
        type: "concept",
        label: "RAG — Grounding AI in Your Documents",
        desc: "Understand Retrieval-Augmented Generation: how giving AI access to your specific documents produces more accurate, citable answers.",
        href: `${BASE_PATH}/concepts#rag`,
        duration: "6 min",
        icon: "📚",
      },
      {
        type: "use-case",
        label: "Productivity and Planning Prompts",
        desc: "Explore the Productivity category for meeting prep, project scoping, and workflow automation prompts you can adapt immediately.",
        href: `${BASE_PATH}/#library`,
        duration: "8 min",
        icon: "⚡",
      },
      {
        type: "concept",
        label: "Fine-Tuning vs. Prompting",
        desc: "Understand when a well-crafted prompt is enough — and when you genuinely need a custom-trained model for your use case.",
        href: `${BASE_PATH}/concepts#fine-tuning`,
        duration: "5 min",
        icon: "🎯",
      },
      {
        type: "read",
        label: "Quick Wins: 5-Minute Templates",
        desc: "Run at least three Quick Win prompts from the library in your preferred AI tool. Reflect on what made each one work and where you'd push further.",
        href: `${BASE_PATH}/#library`,
        duration: "15 min",
        icon: "⏱️",
      },
    ],
  },

  // ── 3. Build with AI ─────────────────────────────────────────────────────
  {
    id: "build-with-ai",
    title: "Build with AI",
    tagline: "Integrate AI into real products, scripts, and automated workflows.",
    emoji: "🛠️",
    color: "#F4C56A",
    level: "advanced",
    audience: "For developers and technical builders",
    totalDuration: "~55 min",
    steps: [
      {
        type: "concept",
        label: "APIs — How Code Talks to AI",
        desc: "Understand the request-response model behind every AI integration, including the key parameters (temperature, max_tokens, system prompt) that shape model behavior.",
        href: `${BASE_PATH}/concepts#api`,
        duration: "6 min",
        icon: "🔌",
      },
      {
        type: "concept",
        label: "Function Calling and Tool Use",
        desc: "Learn how models emit structured tool-call signals that your application handles — the mechanism behind every reliable AI-powered action.",
        href: `${BASE_PATH}/concepts#function-calling`,
        duration: "7 min",
        icon: "🛠️",
      },
      {
        type: "concept",
        label: "AI Agents — From Prompts to Workflows",
        desc: "Understand the observe-plan-act loop, memory mechanisms, and orchestration patterns that turn a single LLM call into an autonomous multi-step agent.",
        href: `${BASE_PATH}/concepts#agents`,
        duration: "8 min",
        icon: "⚡",
      },
      {
        type: "concept",
        label: "MCP — Universal AI Integrations",
        desc: "Learn the Model Context Protocol, Anthropic's open standard for connecting AI to any data source, tool, or service without bespoke glue code.",
        href: `${BASE_PATH}/concepts#mcp`,
        duration: "7 min",
        icon: "🔗",
      },
      {
        type: "use-case",
        label: "Software Development Use Cases",
        desc: "Explore the Code & Automation category for battle-tested prompts covering code review, debugging, test generation, documentation, and system design.",
        href: `${BASE_PATH}/#library`,
        duration: "10 min",
        icon: "💻",
      },
      {
        type: "page",
        label: "Compare the AI Labs and Their APIs",
        desc: "Understand the differences between Anthropic, OpenAI, Google, and Mistral APIs — pricing, context limits, strengths, and the right model for each use case.",
        href: `${BASE_PATH}/ai-labs`,
        duration: "10 min",
        icon: "🏛️",
      },
      {
        type: "page",
        label: "Google AI Tools Ecosystem",
        desc: "Explore Google's full developer AI stack — Vertex AI, Gemini API, AI Studio, and the tooling that wraps the Gemini model family for production use.",
        href: `${BASE_PATH}/google-ai-tools`,
        duration: "7 min",
        icon: "🔬",
      },
    ],
  },

  // ── 4. AI Creator ─────────────────────────────────────────────────────────
  {
    id: "ai-creator",
    title: "AI Creator",
    tagline: "Use AI to unlock faster, richer creative work across every medium.",
    emoji: "🎨",
    color: "#F4A6C0",
    level: "intermediate",
    audience: "For designers, artists, and content creators",
    totalDuration: "~45 min",
    steps: [
      {
        type: "concept",
        label: "How AI Generates Images and Video",
        desc: "Understand diffusion models and the text-to-image pipeline — what happens between your prompt and the pixel output, and why prompt wording changes results so dramatically.",
        href: `${BASE_PATH}/concepts#machine-learning`,
        duration: "7 min",
        icon: "🖼️",
      },
      {
        type: "use-case",
        label: "Creative AI Use Cases",
        desc: "Explore the Creative & Design category for prompts covering image generation briefs, style guides, brand naming, UI copy, and visual direction documents.",
        href: `${BASE_PATH}/#library`,
        duration: "10 min",
        icon: "✨",
      },
      {
        type: "concept",
        label: "Prompt Engineering for Creatives",
        desc: "Apply prompting fundamentals to creative work: how to specify style, mood, medium, composition, and negative constraints in image and copy prompts.",
        href: `${BASE_PATH}/concepts#prompt-engineering`,
        duration: "6 min",
        icon: "🎨",
      },
      {
        type: "page",
        label: "The AI Labs Shaping Creative Tools",
        desc: "Understand which labs produce the creative AI tools you use — Stability AI, Midjourney, OpenAI (DALL-E, Sora), Adobe Firefly, and where they sit in the ecosystem.",
        href: `${BASE_PATH}/ai-labs`,
        duration: "8 min",
        icon: "🏛️",
      },
      {
        type: "use-case",
        label: "Writing for Creative Campaigns",
        desc: "Explore the Writing & Copy category for AI-assisted taglines, product descriptions, social campaigns, and brand voice documentation.",
        href: `${BASE_PATH}/#library`,
        duration: "8 min",
        icon: "📢",
      },
      {
        type: "read",
        label: "AI History: The Creative Milestones",
        desc: "Read the Generative AI era section of the AI history timeline — DALL-E, Stable Diffusion, Midjourney, Sora — to understand how creative AI evolved so quickly.",
        href: `${BASE_PATH}/ai-history`,
        duration: "6 min",
        icon: "🕰️",
      },
    ],
  },
];
