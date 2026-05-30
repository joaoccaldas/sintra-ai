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

Modern frontier models: GPT-5.5 supports 1M tokens, Claude Opus 4.7 and Sonnet 4.6 also support 1M, and Gemini 3.1 Pro extends to 2M — the largest of any frontier model as of mid-2026. This is critical for analysing long documents, maintaining long conversations, or processing entire codebases.`,
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

**Best models by use case (mid-2026):**
- **General chat & reasoning**: Llama 4 Maverick (Meta, MoE, 1M ctx), Qwen3-235B (Alibaba)
- **Coding & agentic**: DeepSeek V4 (1.6T params, rivals GPT-5.5), Devstral Small 24B (Mistral), Qwen3-Coder
- **Compact / edge**: Llama 4 Scout (17B active, 10M ctx), Gemma 4 E4B (Google, runs on phones), Mistral Small 4
- **Long context**: Llama 4 Scout (10M tokens), Mistral Medium 3.5 (256K, open-weight)
- **Multilingual**: Qwen3-7B (29 languages), Gemma 4 (140+ languages)

Run via **Ollama**, **LM Studio**, or cloud APIs (Together AI, Groq, Fireworks AI). Apache-2.0 models allow commercial use without restriction.`,
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
    body: `Running a model locally means inference happens entirely on your hardware — no data leaves your machine, no API costs, no rate limits.

**Tools (2026):**
- **Ollama** — one-command install; OpenAI-compatible REST API, supports Llama 4, Gemma 4, Mistral Small 4
- **LM Studio** — GUI desktop app; browse HuggingFace, download, chat, and serve models
- **Jan.ai** — privacy-first local chat with built-in OpenAI-compatible server

**Hardware requirements (Q4 quantisation):**
| Model size | RAM / VRAM | Example models |
|---|---|---|
| 3–7B | 6–8 GB | Gemma 4 E4B, Mistral Small 4, Llama 4 Scout |
| 13–27B | 12–16 GB | Devstral Small 24B, Gemma 4 26B A4B |
| 70B+ | 40–80 GB VRAM | Llama 4 Maverick, Mistral Large 3 |

**Apple Silicon** (M1–M4) excels: unified memory means a 16 GB MacBook Air runs Llama 4 Scout or Mistral Small 4 at 40+ tokens/s with full privacy. Gemma 4 E4B targets phones (Pixel, Snapdragon) at near-zero latency.`,
    analogy: "Like running your own web server instead of using a cloud host — more control and privacy, but you manage the hardware.",
    related: ["open-source-llms", "fine-tuning", "llm"],
    addedAt: "2026-05-23",
    learnMore: "https://ollama.com",
  },

  // ── Google I/O 2026 — Software Ecology frameworks ───────────────────────
  {
    id:         "jevons-paradox",
    term:       "Jevons Paradox",
    category:   "fundamentals",
    tagline:    "Making AI cheaper creates more usage, not less.",
    icon:       "⚡",
    difficulty: 2,
    body: `**Jevons Paradox** (1865) states that when the cost of a resource falls, total consumption rises — often dramatically — as new use cases become economically viable.

In AI this plays out constantly: as token prices drop, organisations don't use the same amount of AI more cheaply; they find entirely new applications that were previously unaffordable. Claude Haiku 4.5 at $0.80/M tokens unlocks checks that teams would never have commissioned at $15/M.

Two practical implications:
- **Cost governance** — cheaper models don't reduce your AI bill; they expand the scope of what gets automated
- **Second-order volume** — 10× velocity doesn't produce 10× productivity; it produces 10× output that must be reviewed, tested, and maintained by the same team

Surfaced in Google's DORA research and Adam Bender's Google I/O 2026 talk on Software Ecology.`,
    analogy: "When motorways improved, people didn't drive the same route faster — they drove 5× more miles. Fuel efficiency made us drive more, not less.",
    related: ["tokens", "agents", "ai-as-amplifier"],
    addedAt: "2026-05-24",
    learnMore: "https://en.wikipedia.org/wiki/Jevons_paradox",
  },

  {
    id:         "ai-as-amplifier",
    term:       "AI as Amplifier",
    shortTerm:  "Amplifier",
    category:   "fundamentals",
    tagline:    "AI multiplies what you already are — good or chaotic.",
    icon:       "📣",
    difficulty: 1,
    body: `The **AI as Amplifier** principle — surfaced in Google's DORA research and framed by Adam Bender at Google I/O 2026 — states that AI is directionally neutral: it accelerates and scales *existing* processes, culture, and quality.

Teams with clear processes, well-tested outputs, and solid data governance get dramatically more productive. Teams without those foundations generate confusion, technical debt, and low-quality output faster.

This makes AI adoption a **diagnostic before it's a deployment**. Ask: *"If we 10× our output tomorrow, would we amplify good work — or amplify problems?"*

Applied to FP&A: solid data models and review processes → AI amplifies accurate analysis. Fragmented spreadsheets and ad-hoc workflows → AI generates 10× more fragmented spreadsheets.

The DORA State of DevOps report found the same pattern in software: elite performers improved further with AI; low performers saw marginal gains or regression.`,
    analogy: "A loudspeaker amplifies whatever you put in. A great singer sounds better; a bad signal becomes louder noise. The speaker has no opinion on which.",
    related: ["software-ecology", "jevons-paradox", "agents"],
    addedAt: "2026-05-24",
    learnMore: "https://dora.dev/research/",
  },

  {
    id:         "software-ecology",
    term:       "Software Ecology",
    category:   "fundamentals",
    tagline:    "The holistic study of social and technical systems that produce software.",
    icon:       "🌿",
    difficulty: 2,
    body: `**Software Ecology** (Adam Bender, Google I/O 2026) is the study of *socio-technical ecosystems* — the humans, tools, processes, incentives, and cultural norms that together determine what gets built and how.

The framework asks two questions of any team or process:
- **WHY?** — Why do we test this way? Why this language, this review process, this deploy cadence?
- **WHAT IF?** — What if AI wrote all the code? What if we removed this review layer entirely?

It explains why identical AI tools produce wildly different results across teams: the tools are the same; the ecology differs. At 10× AI velocity, five **second-order effects** dominate before benefits:
1. More code → more **liability**, not just more productivity
2. 10× code → potentially 100–1000× test cases (quadratic growth)
3. Code review becomes a **bottleneck** — tech leads can't review for 10 AI developers
4. Internal APIs become **de-facto public** — agents find and call them without negotiation
5. **Agentic edit wars** — one agent changes, another reverts; you pay tokens for both`,
    analogy: "A forest ecologist doesn't study trees in isolation — she studies soil chemistry, species interactions, water cycles. Software ecology says code needs more than smart developers: it needs the right culture, process clarity, and incentive alignment.",
    related: ["ai-as-amplifier", "jevons-paradox", "agents"],
    addedAt: "2026-05-24",
    learnMore: "https://www.youtube.com/watch?v=2n41YjR5QfU",
  },

  {
    id:         "temperature",
    term:       "Temperature",
    shortTerm:  "temp",
    category:   "models",
    tagline:    "The dial that controls how random or predictable an AI's output is.",
    icon:       "🌡️",
    difficulty: 1,
    body: `**Temperature** is a number — typically between 0 and 2 — that controls how much randomness the model introduces when choosing its next word.

At **temperature 0**, the model always picks the single highest-probability next token. Output is deterministic and focused — ideal for factual Q&A, code generation, and structured data extraction where you want the same answer every time.

At **higher temperatures** (0.7–1.0), the model samples from a wider distribution of likely tokens. Output becomes more varied, creative, and sometimes surprising — better for brainstorming, storytelling, and open-ended generation.

Above **temperature 1.5**, outputs often become incoherent. Most production uses stay between 0 and 1.

Related parameters: **top-p** (nucleus sampling) and **top-k** control similar tradeoffs. Many APIs expose all three; temperature is the most intuitive to adjust first.

**Rule of thumb:** Start at 0 for precise tasks, 0.7 for creative ones.`,
    analogy: "Imagine a typewriter where 'temperature 0' locks every key to the most-used letter at that point. At higher temperature, adjacent keys become reachable. At temperature 2, you're flailing across the keyboard.",
    related: ["llm", "tokens", "prompt-engineering"],
    addedAt: "2026-05-30",
  },

  {
    id:         "hallucination",
    term:       "Hallucination",
    category:   "fundamentals",
    tagline:    "When an AI generates confident-sounding facts that are simply wrong.",
    icon:       "👁️",
    difficulty: 1,
    body: `**Hallucination** is when a language model produces output that is fluent and confident but factually incorrect, fabricated, or unsupported by its training data or context.

LLMs generate text by predicting the most plausible next token — they have no internal fact-checker. The model doesn't "know" it's wrong; it's completing a pattern. This produces plausible-sounding citations, statistics, names, and dates that don't exist.

**Common forms:**
- **Factual errors** — wrong dates, misattributed quotes, invented statistics
- **Source fabrication** — citing papers, URLs, or people that don't exist
- **Confident gaps** — answering questions outside its training with false certainty
- **Intrinsic contradictions** — saying opposite things in the same response

**Mitigation strategies:**
- Ground the model with retrieval (RAG) — give it real documents to cite
- Ask it to say "I don't know" when uncertain (works better than it sounds)
- Lower temperature for factual tasks
- Request sources and verify them independently
- Use models with web search or citations for current events`,
    analogy: "A very confident student who studied hard but misremembers details during the exam — not lying, just pattern-matching to what 'sounds right' based on everything they've read.",
    related: ["llm", "rag", "prompt-engineering"],
    addedAt: "2026-05-30",
  },

  {
    id:         "system-prompt",
    term:       "System Prompt",
    category:   "fundamentals",
    tagline:    "The hidden instruction that shapes how an AI behaves before you say anything.",
    icon:       "📋",
    difficulty: 1,
    body: `A **system prompt** is a set of instructions given to a model *before* the user conversation begins. It defines the model's persona, constraints, tone, output format, and scope of knowledge.

In the API, it appears as a message with role \`"system"\` (OpenAI) or the \`system\` parameter (Claude). In consumer products like Claude.ai or ChatGPT, it's invisible — already set by the product team.

**What system prompts do:**
- Set persona: *"You are a concise technical assistant"*
- Define constraints: *"Only answer questions about cooking. Decline everything else."*
- Specify format: *"Always respond in JSON with fields: summary, steps, caveats"*
- Inject context: *"The user's account tier is Pro. Today's date is…"*

**Why it matters for practitioners:**
When building AI features, the system prompt is your primary control surface. A well-crafted system prompt reduces the need for per-request instructions, improves consistency, and can dramatically change output quality without changing the model.

System prompts are **not foolproof** — users can sometimes override them through prompt injection or jailbreaking techniques.`,
    analogy: "A job briefing before a contractor walks on site. The contractor (the model) hasn't met the client yet, but already knows: here's the project scope, here's how to communicate, here's what's off-limits.",
    related: ["prompt-engineering", "llm", "function-calling"],
    addedAt: "2026-05-30",
  },

  {
    id:         "chain-of-thought",
    term:       "Chain of Thought",
    shortTerm:  "CoT",
    category:   "fundamentals",
    tagline:    "Prompting a model to reason step-by-step before giving its final answer.",
    icon:       "🔗",
    difficulty: 2,
    body: `**Chain of Thought (CoT)** prompting instructs a model to break its reasoning into explicit steps before producing a final answer. This dramatically improves accuracy on multi-step tasks like math, logic puzzles, and complex planning.

**How it works:** Simply adding "Let's think step by step" or "Explain your reasoning before answering" to a prompt causes most modern LLMs to generate intermediate reasoning steps. These steps then inform the final answer, reducing errors that arise from trying to jump directly to a conclusion.

**Variants:**
- **Zero-shot CoT** — just append "Think step by step" to any prompt
- **Few-shot CoT** — provide worked examples showing the reasoning process
- **Self-consistency** — sample multiple CoT chains, take the majority answer
- **Tree of Thought** — explore multiple reasoning branches simultaneously
- **Extended thinking** — Claude and some models support a dedicated reasoning phase

**When to use it:**
Anytime the task requires more than one logical step — arithmetic, multi-condition decisions, code planning, scientific reasoning. For simple factual recall, CoT adds tokens without benefit.

**The tradeoff:** More tokens = more cost and latency, but much higher accuracy on hard problems.`,
    analogy: "Showing your work in a math exam. The process of writing each step forces you to catch errors you'd miss when calculating in your head.",
    related: ["prompt-engineering", "llm", "temperature"],
    addedAt: "2026-05-30",
    learnMore: "https://arxiv.org/abs/2201.11903",
  },

  {
    id:         "multimodal",
    term:       "Multimodal AI",
    category:   "models",
    tagline:    "AI that understands and generates more than one type of media — text, images, audio, or video.",
    icon:       "🎨",
    difficulty: 1,
    body: `**Multimodal AI** refers to models that process or generate multiple types of data (modalities) — most commonly text + images, but increasingly audio, video, documents, and code.

**Input modalities (what the model can receive):**
- **Vision** — understand photos, screenshots, diagrams, charts (GPT-4o, Claude 3.5+, Gemini)
- **Audio** — transcribe and understand speech (Whisper, Gemini Live)
- **Video** — analyze video frames and sequences (Gemini 1.5+)
- **Documents** — PDFs, spreadsheets, slides with formatting intact

**Output modalities (what the model can generate):**
- **Text** — all frontier models
- **Images** — DALL·E, Imagen, Stable Diffusion, Midjourney
- **Audio/Speech** — ElevenLabs, Gemini Live, GPT-4o voice
- **Code** — all frontier models, often better than pure-text outputs

**Practical implications:**
You can now paste a screenshot of an error and ask for a fix, share a chart and ask for insights, or describe an image with a voice note. Products like Claude's Projects and ChatGPT can maintain mixed-media context across a conversation.

The **frontier** in mid-2026: natively multimodal models that take any combination of inputs in a single prompt, with no intermediate conversion step.`,
    analogy: "The difference between a specialist who only reads reports versus a generalist who can read, listen, watch, and sketch — and respond in whichever format you need.",
    related: ["llm", "function-calling", "agents"],
    addedAt: "2026-05-30",
  },

  {
    id:         "vector-database",
    term:       "Vector Database",
    category:   "tools",
    tagline:    "A database that stores meaning, not just text — finding similar content by concept rather than keyword.",
    icon:       "🗄️",
    difficulty: 2,
    body: `A **vector database** stores data as high-dimensional numerical vectors (embeddings) and enables fast similarity search — finding items that are *semantically* similar even if they share no keywords.

**How it works:**
1. Pass text (or images, audio) through an **embedding model** — it outputs a list of ~1,500 numbers representing meaning
2. Store those numbers in the vector DB alongside the original content
3. At query time, embed the user's question, then find stored vectors with the smallest geometric distance

The result: search that understands *meaning*, not just string matching. "How do I cancel my subscription?" will surface relevant results even if no document uses the word "cancel."

**Popular vector databases:**
- **Pinecone** — managed, production-grade
- **Weaviate** — open-source, hybrid search
- **Qdrant** — open-source, fast, Rust-based
- **pgvector** — PostgreSQL extension (add vectors to your existing DB)
- **Chroma** — lightweight, great for prototyping

**Primary use case:** The retrieval layer in **RAG** (Retrieval-Augmented Generation) pipelines. The vector DB finds relevant document chunks; the LLM reads those chunks and generates an answer.`,
    analogy: "A librarian who organizes books not by title or author, but by what they're *about* — so asking for 'something like Sapiens but more technical' returns the right shelf.",
    related: ["embeddings", "rag", "api"],
    addedAt: "2026-05-30",
  },

  {
    id:         "inference",
    term:       "Inference",
    category:   "models",
    tagline:    "The moment a trained model actually runs and generates output.",
    icon:       "⚡",
    difficulty: 2,
    body: `**Inference** is the process of running a trained model to produce output from new input. It's distinct from **training**, which is the expensive, one-time process of teaching the model.

When you send a message to Claude or GPT, you're triggering inference. The model processes your tokens through its billions of parameters and generates a response, one token at a time.

**Key inference concepts:**

**Latency** — time to first token (TTFT). Users notice anything over ~500ms.

**Throughput** — tokens per second. GPT-4o runs at ~100 tok/s; older models at 20–40 tok/s. Matters for streaming long responses.

**Batch inference** — processing many requests at once, more efficient, used for non-real-time jobs (the Claude Batch API cuts costs by ~50%).

**On-device inference** — running small models locally (Phi-3 Mini, Llama 3.2 1B) — no API call, private, lower latency, limited capability.

**Inference cost** — billed per input + output token. Frontier models cost $3–$75 per million tokens; efficient models cost $0.10–$0.40.

**Hardware:** GPUs (NVIDIA H100/H200, AMD MI300X) dominate inference workloads. Google uses custom TPUs. Apple Silicon enables on-device inference via the Neural Engine.`,
    analogy: "Training is writing a textbook over years. Inference is a student using that textbook to answer a question in seconds.",
    related: ["llm", "tokens", "fine-tuning"],
    addedAt: "2026-05-30",
  },

  {
    id:         "benchmark",
    term:       "AI Benchmark",
    category:   "models",
    tagline:    "Standardised tests that measure what a model can actually do.",
    icon:       "📊",
    difficulty: 2,
    body: `An **AI benchmark** is a standardised evaluation — a fixed test set with known correct answers — that allows objective comparison between models.

**Key benchmarks in 2026:**

| Benchmark | What it measures |
|-----------|-----------------|
| **MMLU** | Broad knowledge across 57 subjects — medicine, law, maths, history |
| **GPQA** | Graduate-level science questions only PhD experts can reliably answer |
| **SWE-bench** | Real GitHub issues — can the model write code that fixes the bug? |
| **AIME** | American Invitational Math Exam — hard competition maths |
| **HumanEval** | Code generation correctness across standard programming tasks |
| **HELM** | Holistic multi-task evaluation across safety + capability dimensions |
| **ARC-AGI** | Abstract visual reasoning tasks humans find easy, models find hard |

**Caveats:**
- **Contamination** — if benchmark questions appeared in training data, scores are inflated
- **Saturation** — top models now score 85–90% on MMLU; it no longer differentiates them
- **Task gap** — scoring 90% on a benchmark ≠ 90% reliability on your specific use case
- **Benchmark gaming** — labs optimise for popular benchmarks; this doesn't always generalise

**Rule of thumb:** Treat benchmarks as a rough filter. Then build your own eval on tasks that mirror production.`,
    analogy: "A university entrance exam: useful for ranking applicants, but a 99th-percentile scorer might still be terrible at the specific job you're hiring for.",
    related: ["llm", "fine-tuning", "inference"],
    addedAt: "2026-05-30",
  },

  {
    id:         "ai-safety",
    term:       "AI Safety",
    category:   "fundamentals",
    tagline:    "The field working to ensure AI systems do what humans actually want — now and as they become more capable.",
    icon:       "🛡️",
    difficulty: 2,
    body: `**AI Safety** is a research and engineering field focused on ensuring that AI systems are reliably beneficial — that they behave as intended, avoid harmful outputs, and remain aligned with human values as they become more capable.

**Near-term safety (today's concern):**
- **Jailbreaking** — bypassing safety guidelines through clever prompting
- **Prompt injection** — malicious instructions hidden in user content that redirect an agent
- **Bias and fairness** — models encoding historical prejudices from training data
- **Misuse** — generating disinformation, malware, or harmful content at scale

**Long-term alignment (future concern):**
- **Specification gaming** — model achieves the stated goal but not the intended one
- **Reward hacking** — optimizing proxy metrics while missing the real objective
- **Scalable oversight** — how do you evaluate outputs of a model smarter than you?
- **Deceptive alignment** — a model that behaves well during training but not deployment

**Key approaches:**
- **RLHF** (Reinforcement Learning from Human Feedback) — train on human preference data
- **Constitutional AI** (Anthropic) — self-critique against a written set of principles
- **Interpretability** — understanding what's happening inside the model's weights
- **Red-teaming** — adversarial testing to find failure modes before deployment

**Leading labs:** Anthropic, DeepMind's safety team, OpenAI's safety team, ARC (Alignment Research Center), MIRI.`,
    analogy: "Seat belts and crash-test dummies: not because every driver is reckless, but because the consequences of failure at scale are severe enough to justify the engineering investment before the problem occurs.",
    related: ["prompt-engineering", "agents", "llm"],
    addedAt: "2026-05-30",
    learnMore: "https://www.anthropic.com/safety",
  },
];
