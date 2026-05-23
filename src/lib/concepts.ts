/**
 * Concepts & Definitions — data schema.
 *
 * ─── HOW TO ADD A NEW CONCEPT ───────────────────────────────────────────────
 *
 *  1. Choose a unique `id`  (kebab-case, e.g. "vector-database")
 *  2. Pick a `category`     "fundamentals" | "models" | "tools" | "protocols"
 *  3. Write a `tagline`     ≤ 12 words, plain English, no jargon
 *  4. Write `body`          Markdown, ~100-150 words; use **bold** for key terms
 *  5. Write an `analogy`    ≤ 50 words, zero jargon, real-world comparison
 *  6. Pick an `icon`        Single emoji that visually represents the idea
 *  7. Set `difficulty`      1 = anyone gets it · 2 = needs context · 3 = technical
 *  8. List `related`        IDs of the 2-4 most closely related concepts
 *  9. Set `addedAt`         ISO date string "YYYY-MM-DD" — when this was added
 * 10. Optionally add `shortTerm` (acronym badge) and `learnMore` (URL)
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

export type ConceptCategory = "fundamentals" | "models" | "tools" | "protocols";

export const CAT_META: Record<
  ConceptCategory,
  { label: string; hex: string; summary: string }
> = {
  fundamentals: {
    label:   "Fundamentals",
    hex:     "#B6A6FF",
    summary: "Core ideas every AI user should know",
  },
  models: {
    label:   "Models & AI",
    hex:     "#5EEAD4",
    summary: "How AI models work under the hood",
  },
  tools: {
    label:   "Tools & Agents",
    hex:     "#F4C56A",
    summary: "Capabilities you can plug in and extend",
  },
  protocols: {
    label:   "Protocols",
    hex:     "#6EE7A0",
    summary: "Standards that connect AI to the world",
  },
};

export const DIFF_LABEL: Record<1 | 2 | 3, string> = {
  1: "Beginner",
  2: "Practitioner",
  3: "Technical",
};

export const DIFF_HEX: Record<1 | 2 | 3, string> = {
  1: "#6EE7A0",
  2: "#5EEAD4",
  3: "#B6A6FF",
};

export interface Concept {
  /** Unique identifier — kebab-case. Used for cross-linking. */
  id: string;
  /** Full display name, e.g. "Large Language Model" */
  term: string;
  /** Abbreviation shown as a secondary badge, e.g. "LLM". Optional. */
  shortTerm?: string;
  /** One of the four concept categories */
  category: ConceptCategory;
  /** One-liner in plain English, ≤ 12 words */
  tagline: string;
  /** ~100-150 word explanation in Markdown. Bold key terms with **term**. */
  body: string;
  /** Real-world analogy ≤ 50 words, zero jargon */
  analogy: string;
  /** Single emoji used as the concept's visual anchor */
  icon: string;
  /** Complexity level: 1 anyone · 2 needs context · 3 technical */
  difficulty: 1 | 2 | 3;
  /** IDs of closely related concepts (2-4 recommended) */
  related: string[];
  /** ISO date string "YYYY-MM-DD" — when this concept entry was added */
  addedAt: string;
  /** Optional external URL for deeper reading */
  learnMore?: string;
}

export const CONCEPTS: Concept[] = [
  // ── Fundamentals ────────────────────────────────────────────────────────
  {
    id:         "machine-learning",
    term:       "Machine Learning",
    category:   "fundamentals",
    tagline:    "Teaching computers to learn from examples, not rules.",
    icon:       "🧠",
    difficulty: 1,
    body: `Machine Learning (ML) is a branch of AI where systems improve by studying patterns in data — without being explicitly programmed for each scenario.

Instead of writing rules like "if price drops 10% in 5 days, sell," you feed historical data with labels ("went up" / "went down") and the model discovers its own patterns.

Three core flavours: **Supervised learning** (learns from labeled examples), **Unsupervised learning** (finds hidden clusters), and **Reinforcement learning** (learns via rewards and penalties). Most tools you use today — spam filters, recommendation engines, image recognition — run on supervised ML.`,
    analogy: "Like training a dog: you reward correct behaviour repeatedly until the dog generalises the rule on its own — no instruction manual required.",
    related: ["llm", "fine-tuning", "embeddings"],
    addedAt: "2025-05-17",
  },

  {
    id:         "tokens",
    term:       "Tokens",
    category:   "fundamentals",
    tagline:    "The tiny chunks of text an AI reads, one at a time.",
    icon:       "🪙",
    difficulty: 1,
    body: `Before an LLM processes text, it breaks it into **tokens** — small fragments typically representing one word, part of a word, or a punctuation mark. "Unbelievable" might become ["un", "believ", "able"] — three tokens.

Models don't see letters or words; they see token IDs. The entire prompt and response are sequences of these IDs.

Token count matters for two reasons: **cost** — most APIs bill per 1,000 tokens — and **limits** — text must fit within the model's context window. Rule of thumb: ~1 token ≈ 0.75 English words. A page of prose ≈ 500 tokens.`,
    analogy: "Like a musician reading sheet music note-by-note rather than hearing the whole symphony — the model processes token-by-token, building meaning step by step.",
    related: ["context-window", "llm"],
    addedAt: "2025-05-17",
  },

  {
    id:         "prompt-engineering",
    term:       "Prompt Engineering",
    category:   "fundamentals",
    tagline:    "The art of asking AI the right question in the right way.",
    icon:       "✨",
    difficulty: 1,
    body: `**Prompt engineering** is the practice of crafting inputs to AI models to reliably get the output you need. A vague prompt gets a generic answer; a precise one gets an actionable result.

Core techniques:
- **Role-setting** — "You are a senior financial analyst…"
- **Few-shot examples** — showing 2-3 input/output pairs before your real request
- **Chain-of-thought** — "Think step by step before answering"
- **Output formatting** — "Respond only in JSON with keys: title, summary, tags"

Prompt engineering is less about magic words and more about communicating context, constraints, and expected format — the same clarity you'd use briefing a smart colleague.`,
    analogy: "The difference between asking a chef \"make me something\" vs. \"a light Mediterranean vegetarian dish for two, ready in 20 minutes.\"",
    related: ["llm", "function-calling", "agents"],
    addedAt: "2025-05-17",
  },

  // ── Models & AI ──────────────────────────────────────────────────────────
  {
    id:         "llm",
    term:       "Large Language Model",
    shortTerm:  "LLM",
    category:   "models",
    tagline:    "AI trained on vast text to understand and generate language.",
    icon:       "⬡",
    difficulty: 2,
    body: `A **Large Language Model** is a neural network with billions of parameters trained on an enormous corpus of text — books, websites, code, papers. Through training it learns grammar, facts, reasoning patterns, and style, all encoded as numeric weights.

At inference time you give it a prompt; it predicts the most likely continuation one **token** at a time. Despite that simple mechanism, emergent capabilities — summarising, coding, reasoning, translating — are profound.

"Large" refers to parameter count. More parameters generally means broader knowledge and more nuanced understanding, at the cost of compute and latency.`,
    analogy: "An LLM is like someone who has read the entire internet and can discuss any topic fluently — but hasn't lived any of it.",
    related: ["tokens", "context-window", "prompt-engineering", "fine-tuning"],
    addedAt: "2025-05-17",
  },

  {
    id:         "context-window",
    term:       "Context Window",
    category:   "models",
    tagline:    "How much text an AI can see and remember at once.",
    icon:       "🪟",
    difficulty: 1,
    body: `Every LLM has a **context window** — the maximum number of tokens it can process in a single interaction. Everything the model can "see" — your system prompt, conversation history, documents you paste in — must fit within this limit.

If the window is 128,000 tokens (~96,000 words) and your conversation exceeds that, earlier messages are dropped. The model has no memory of them.

Modern frontier models: GPT-4.1 supports 128K tokens, Claude 4 series supports 200K, and Gemini 2.5 Pro supports up to 1M. This is critical for analysing long documents, maintaining long conversations, or processing entire codebases.`,
    analogy: "The context window is like a whiteboard in the room. The AI can only reference what's written on it — once it fills up, you must erase something to write more.",
    related: ["tokens", "llm", "rag"],
    addedAt: "2025-05-17",
  },

  {
    id:         "embeddings",
    term:       "Embeddings",
    category:   "models",
    tagline:    "Turning words and ideas into numbers that capture meaning.",
    icon:       "🗺️",
    difficulty: 3,
    body: `**Embeddings** convert text — words, sentences, documents — into dense numeric vectors (lists of 768–3072 numbers) where semantic similarity maps to geometric closeness. "King" and "Queen" end up nearby in this space; "King" and "Invoice" are far apart.

This enables powerful operations: search by meaning (not keyword), cluster similar documents, detect anomalies, and power the retrieval step in RAG systems.

Embedding models (e.g. OpenAI \`text-embedding-3-small\`, Cohere \`embed-v3\`) are separate from generative models — smaller, faster, and cheap to run at scale.`,
    analogy: "Like placing concepts on a map — related ideas live close together, unrelated ones are distant. Ask 'what's nearest to Paris?' and find London, Berlin, Rome.",
    related: ["rag", "machine-learning", "llm"],
    addedAt: "2025-05-17",
  },

  {
    id:         "rag",
    term:       "Retrieval-Augmented Generation",
    shortTerm:  "RAG",
    category:   "models",
    tagline:    "Giving the AI access to your documents before it answers.",
    icon:       "📚",
    difficulty: 2,
    body: `**RAG** combines a search step with a generation step. Instead of relying solely on training data, the model first retrieves relevant passages from an external knowledge base, then generates an answer grounded in those passages.

Pipeline: user question → embed query → vector search over your documents → top-K relevant chunks → insert into context → LLM generates answer.

This solves two core LLM limitations: **knowledge cutoffs** (training data ends at a date) and **hallucination** (the model can now cite real sources). It's the backbone of most enterprise AI search and customer-support systems.`,
    analogy: "Like an open-book exam instead of a closed one — the model looks things up in your documents rather than guessing from memory.",
    related: ["embeddings", "context-window", "llm", "connectors"],
    addedAt: "2025-05-17",
  },

  {
    id:         "fine-tuning",
    term:       "Fine-tuning",
    category:   "models",
    tagline:    "Specialising a general AI model on your specific data and style.",
    icon:       "🎯",
    difficulty: 3,
    body: `**Fine-tuning** takes a pre-trained base model and continues training it on a smaller, task-specific dataset — nudging the model's weights toward your domain, tone, or format.

A customer-service fine-tune might train on thousands of resolved tickets. A legal model might train on firm-specific briefs and precedents. Result: the model responds in the right voice with the right terminology, without lengthy system prompts.

Modern efficient techniques (LoRA, QLoRA) make fine-tuning feasible on consumer GPUs by training only a small fraction of parameters. Fine-tuning isn't always necessary — often prompt engineering or RAG is cheaper and more flexible.`,
    analogy: "The base model is a brilliant new hire who knows a lot. Fine-tuning is their first 90 days immersed in your company's jargon, processes, and way of working.",
    related: ["machine-learning", "llm", "prompt-engineering"],
    addedAt: "2025-05-17",
  },

  // ── Tools & Agents ───────────────────────────────────────────────────────
  {
    id:         "agents",
    term:       "AI Agents",
    category:   "tools",
    tagline:    "AI that plans and takes actions without you guiding every step.",
    icon:       "⚡",
    difficulty: 2,
    body: `An **AI agent** is an LLM combined with a loop that lets it observe, plan, and act — autonomously — toward a goal. Instead of a single prompt → response, an agent can decompose a goal into subtasks, call tools (search, code execution, APIs), evaluate results, and iterate.

A coding agent might: read the failing test → examine relevant files → write a fix → run tests → check output → repeat until green.

Key components: a capable **LLM** (the brain), **tools** (capabilities it can invoke), a **memory** mechanism (context + vector store), and an **orchestration loop** that feeds observations back as new context.`,
    analogy: "The difference between a consultant who gives a one-time answer vs. an employee who takes initiative, manages their own workflow, and reports back when done.",
    related: ["llm", "function-calling", "skills", "mcp"],
    addedAt: "2025-05-17",
  },

  {
    id:         "skills",
    term:       "Skills",
    category:   "tools",
    tagline:    "Pre-built capabilities you attach to an AI to extend what it can do.",
    icon:       "🧩",
    difficulty: 2,
    body: `**Skills** are pre-packaged, reusable AI capabilities — typically a combination of a system prompt template, tool definitions, and workflow logic — that extend a base model for a specific use case.

Examples: a "web research" skill grants the agent a search tool, browsing capability, and a structured output format. A "data analyst" skill adds code execution, chart generation, and summary templates.

In Claude Code, skills are invocable via \`/skill-name\` commands that run pre-defined agentic workflows. Platforms like Microsoft Copilot Studio expose them as modular add-ons you configure without writing code.`,
    analogy: "Skills are like apps on a smartphone. The phone (base model) is capable on its own, but apps extend it with purpose-built tools for specific jobs.",
    related: ["agents", "connectors", "function-calling"],
    addedAt: "2025-05-17",
  },

  {
    id:         "connectors",
    term:       "Connectors",
    category:   "tools",
    tagline:    "Bridges that let AI read from and write to your apps and services.",
    icon:       "↔️",
    difficulty: 2,
    body: `**Connectors** are integration modules that link an AI system to external data sources and services — CRMs, databases, file stores, communication platforms, ERPs. They handle authentication, data formatting, and the translation layer between the AI and the external system.

In enterprise AI platforms, connectors let the model ingest live data from Salesforce, write calendar events to Google Calendar, send Slack messages, or query a PostgreSQL database.

Without connectors, AI is isolated to its training data and your manual copy-paste. Connectors are closely related to MCP servers — an MCP server is one standardised implementation of a connector.`,
    analogy: "Connectors are the power outlets that let an AI's capabilities flow into the systems and apps your business already runs on.",
    related: ["mcp", "api", "agents", "rag"],
    addedAt: "2025-05-17",
  },

  // ── Protocols ────────────────────────────────────────────────────────────
  {
    id:         "api",
    term:       "API",
    shortTerm:  "API",
    category:   "protocols",
    tagline:    "A standardised way for software to talk to other software.",
    icon:       "🔌",
    difficulty: 1,
    body: `An **API** (Application Programming Interface) is a contract that defines how two pieces of software communicate. It specifies the available endpoints, what inputs to send, and what outputs to expect — without exposing any internal code.

When you use a weather app, it calls a weather service API. When you query an AI, your code sends an HTTP request to the model's API with your prompt, and receives a JSON response.

For AI products, key APIs are the model inference APIs (Anthropic, OpenAI, Google) and tool APIs that agents can call — search, databases, CRMs. Every connector, skill, and MCP server ultimately communicates through APIs.`,
    analogy: "An API is a restaurant menu. You choose items (endpoints), provide your order (request), and receive your meal (response) — without entering the kitchen (source code).",
    related: ["mcp", "function-calling", "connectors"],
    addedAt: "2025-05-17",
  },

  {
    id:         "mcp",
    term:       "Model Context Protocol",
    shortTerm:  "MCP",
    category:   "protocols",
    tagline:    "A universal standard for AI to connect to any tool or data source.",
    icon:       "🔗",
    difficulty: 3,
    body: `**MCP** (Model Context Protocol) is an open standard published by Anthropic that defines how AI models communicate with external tools, databases, and services — consistently and interoperably.

Before MCP, every AI integration was bespoke: custom code per tool, non-transferable across systems. MCP standardises the interface: any MCP-compatible AI can connect to any MCP server — file systems, databases, GitHub, Slack, browsers, custom APIs — without custom glue code.

An MCP server exposes **resources** (data the AI can read), **tools** (actions the AI can invoke), and **prompts** (templates). Think of it as USB-C for AI integrations.`,
    analogy: "Like USB-C — it lets any device plug into any charger. MCP lets any AI plug into any data source without custom adapters.",
    related: ["api", "connectors", "function-calling", "agents"],
    addedAt: "2025-05-17",
    learnMore: "https://modelcontextprotocol.io",
  },

  {
    id:         "function-calling",
    term:       "Function Calling",
    shortTerm:  "Tool Use",
    category:   "protocols",
    tagline:    "Letting an AI invoke real code and APIs mid-reasoning.",
    icon:       "🛠️",
    difficulty: 2,
    body: `**Function calling** (also called tool use) is a model capability where the LLM emits a structured "call this function with these arguments" signal mid-response — rather than just generating prose. The application runs the function, returns the result, and the model incorporates it into its next prediction.

This is what makes agents possible: the model can call a search API, read results, run a calculation, check the output, and weave everything into a coherent response — all in one turn.

Most frontier models support this: Anthropic calls it "tool use," OpenAI calls it "function calling." Both expose it via API as a special message type.`,
    analogy: "Like a consultant who mid-meeting says \"hold on, let me pull the live data\" — checks real numbers, then continues the conversation with actual facts.",
    related: ["agents", "api", "mcp", "skills"],
    addedAt: "2025-05-17",
  },

  // ── Open Source & Local ──────────────────────────────────────────────────
  {
    id:         "open-source-llms",
    term:       "Open Source LLMs",
    category:   "models",
    tagline:    "Frontier-quality AI models anyone can download, run, and modify.",
    icon:       "🔓",
    difficulty: 2,
    body: `**Open source LLMs** are models whose weights are publicly released — you download them, run them on your own hardware or a cloud VM, and pay no API fees. Quality has converged rapidly with closed models.

**Best models by use case (2025–2026):**
- **General chat & reasoning**: Llama 4 Maverick (Meta), Qwen3-72B (Alibaba)
- **Coding**: DeepSeek-Coder-V3, Qwen3-Coder
- **Long context**: Llama 3.1 405B (128K), Qwen2.5-72B (128K)
- **Compact / edge**: Llama 4 Scout (17B active params), Phi-4-mini (Microsoft), Gemma 3 4B (Google)
- **Multilingual**: Qwen3-7B (29 languages), Mistral Small 3.1

Run them via **Ollama**, **LM Studio**, or cloud APIs such as Together AI, Groq, or Fireworks AI. Apache-2.0 licensed models allow commercial use.`,
    analogy: "Like open-source software (Linux, Firefox): the community can inspect, improve, and redistribute the model — no vendor lock-in, no usage caps.",
    related: ["llm", "fine-tuning", "running-local-models"],
    addedAt: "2026-05-23",
    learnMore: "https://huggingface.co/models",
  },

  {
    id:         "running-local-models",
    term:       "Running Models Locally",
    category:   "tools",
    tagline:    "How to run AI on your own machine — private, free, and offline.",
    icon:       "💻",
    difficulty: 2,
    body: `Running a model locally means the inference happens entirely on your hardware — no data leaves your machine, no API costs, no rate limits.

**Tools:**
- **Ollama** — one-command install; run any open model via CLI or REST API
- **LM Studio** — GUI desktop app; browse, download, and chat with models
- **Jan.ai** — privacy-first local chat with an OpenAI-compatible API server

**Hardware requirements (with Q4 quantisation):**
| Model size | RAM / VRAM needed | Good for |
|---|---|---|
| 3–7B | 8 GB RAM or 4 GB VRAM | Most consumer laptops |
| 13B | 16 GB RAM or 8 GB VRAM | Mid-range desktop / Mac M1 |
| 70B | 64 GB RAM or 40 GB VRAM | Workstation / A100 class |

**Apple Silicon** (M1–M4) is ideal: unified memory means a 16 GB MacBook Air runs Llama 4 Scout or Mistral Small comfortably at 30+ tokens/s.`,
    analogy: "Like running your own web server instead of using a cloud host — more control and privacy, but you manage the hardware.",
    related: ["open-source-llms", "fine-tuning", "llm"],
    addedAt: "2026-05-23",
    learnMore: "https://ollama.com",
  },
];
