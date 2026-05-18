export interface NewsItem {
  id: string;
  date: string;          // "Jan 2024", "May 2024", etc.
  dateNum: number;       // YYYYMM for sorting, e.g. 202401
  title: string;
  summary: string;       // 2-3 sentences, factual
  tags: string[];        // ["OpenAI", "GPT", "multimodal"] etc.
  significance: "landmark" | "major" | "notable";
  provider: string;      // company name
  providerColor: string; // hex color
}

export const AI_NEWS: NewsItem[] = [
  // ── 2023 ─────────────────────────────────────────────────────────────────

  {
    id: "bing-chat-launch",
    date: "Feb 2023",
    dateNum: 202302,
    title: "Microsoft Bing Chat Launches — GPT-4 Meets Search",
    summary:
      "Microsoft launched Bing Chat powered by an early version of GPT-4 in limited preview, integrating a conversational AI directly into its search engine and Edge browser. The product generated significant press when users discovered the model, codenamed Sydney, would make unusual and emotionally charged claims in extended conversations. Microsoft rapidly limited conversation lengths and adjusted the model's behavior in response.",
    tags: ["Microsoft", "Bing", "GPT-4", "Search", "Chatbot"],
    significance: "major",
    provider: "Microsoft",
    providerColor: "#0078d4",
  },
  {
    id: "llama-1-leak",
    date: "Mar 2023",
    dateNum: 202303,
    title: "LLaMA-1 Leaks Online — Open-Weight Era Begins",
    summary:
      "Meta's LLaMA-1 models (7B–65B parameters), initially shared only with select researchers, leaked publicly within days and triggered an immediate wave of community fine-tuning that produced models like Alpaca and Vicuna within weeks. The leak effectively democratized access to frontier-class open weights overnight. It ignited the open-source LLM ecosystem that would grow into thousands of derivative projects over the following two years.",
    tags: ["Meta", "LLaMA", "Open Source", "Open Weights", "Community"],
    significance: "landmark",
    provider: "Meta",
    providerColor: "#0866ff",
  },
  {
    id: "gpt-4-launch",
    date: "Mar 2023",
    dateNum: 202303,
    title: "GPT-4 Released — Professional-Grade Multimodal AI",
    summary:
      "OpenAI released GPT-4, the first frontier large language model capable of processing both text and images as inputs. It scored in the 90th percentile on the bar exam, 99th percentile on the GRE verbal, and outperformed GPT-3.5 substantially across professional and academic benchmarks. Enterprises across law, medicine, education, and finance began integrating it within weeks of launch.",
    tags: ["OpenAI", "GPT-4", "Multimodal", "Benchmark", "Professional"],
    significance: "landmark",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "claude-1",
    date: "Mar 2023",
    dateNum: 202303,
    title: "Anthropic Launches Claude — Constitutional AI in Production",
    summary:
      "Anthropic released Claude, its first publicly available model, trained using Constitutional AI — a technique where a set of written principles guides model behavior rather than relying purely on human feedback labels. Claude was noted for a longer context window than GPT-3.5 and a cautious, thoughtful conversational style. It was made available via API to select partners and enterprise customers.",
    tags: ["Anthropic", "Claude", "Constitutional AI", "Safety", "RLHF"],
    significance: "major",
    provider: "Anthropic",
    providerColor: "#d97706",
  },
  {
    id: "google-bard-launch",
    date: "Mar 2023",
    dateNum: 202303,
    title: "Google Launches Bard — Search Giant Responds to ChatGPT",
    summary:
      "Google launched Bard, a conversational AI built on its LaMDA language model, as a direct competitive response to ChatGPT's rapid growth. The launch was marred by a factual error in a promotional demo that contributed to Alphabet's stock dropping and erasing roughly $100 billion in market capitalization in a single day. Bard later transitioned to the Gemini brand and underlying Gemini models in February 2024.",
    tags: ["Google", "Bard", "LaMDA", "Chatbot", "Search"],
    significance: "major",
    provider: "Google",
    providerColor: "#4285f4",
  },
  {
    id: "gpt-4-plugins",
    date: "Mar 2023",
    dateNum: 202303,
    title: "ChatGPT Plugins — AI Gets Internet Access and Real-World Tools",
    summary:
      "OpenAI introduced plugins for ChatGPT, allowing the model to browse the web in real time, execute code in a sandbox, and connect to third-party services such as Expedia, Klarna, and Wolfram Alpha. This was the first mainstream demonstration of LLMs operating as tool-using agents capable of taking real-world actions beyond generating text. The plugin architecture was the conceptual precursor to the later GPT Store and OpenAI Assistants API.",
    tags: ["OpenAI", "ChatGPT", "Plugins", "Tool Use", "Agents", "Web Browsing"],
    significance: "major",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "claude-2",
    date: "Jul 2023",
    dateNum: 202307,
    title: "Claude 2 — 100K Token Context Window and Claude.ai Launch",
    summary:
      "Anthropic released Claude 2, featuring a 100,000-token context window — roughly 75,000 words, or an entire novel — which far exceeded any competing model at the time. The model showed meaningful improvements over Claude 1 in coding, mathematics, and instruction following. Claude 2 was made available to the public via Claude.ai, moving Anthropic into the consumer market for the first time.",
    tags: ["Anthropic", "Claude 2", "Long Context", "100K Tokens", "Consumer AI"],
    significance: "major",
    provider: "Anthropic",
    providerColor: "#d97706",
  },
  {
    id: "llama-2-release",
    date: "Jul 2023",
    dateNum: 202307,
    title: "LLaMA 2 Released — Meta Opens Frontier AI for Commercial Use",
    summary:
      "Meta formally released LLaMA 2 in 7B, 13B, and 70B parameter sizes under a permissive license allowing free commercial use, in partnership with Microsoft. The 70B model was competitive with GPT-3.5 on many standard benchmarks. This release established LLaMA as the de facto foundation for the open-source AI ecosystem, with thousands of derivative fine-tunes, tools, and applications building on it within months.",
    tags: ["Meta", "LLaMA 2", "Open Source", "Commercial License", "Open Weights"],
    significance: "landmark",
    provider: "Meta",
    providerColor: "#0866ff",
  },
  {
    id: "mistral-7b",
    date: "Sep 2023",
    dateNum: 202309,
    title: "Mistral 7B — Efficient European Open-Weight Model",
    summary:
      "French startup Mistral AI released Mistral 7B, a 7-billion-parameter model released with no license restrictions that outperformed LLaMA 2 13B across most benchmarks, demonstrating that efficient architecture choices could substantially narrow the gap with larger models. The model was distributed as a torrent and via direct download with no access controls. Mistral's team, drawn largely from DeepMind and Meta, subsequently raised $415 million at a roughly $2 billion valuation.",
    tags: ["Mistral AI", "Open Weights", "Efficiency", "7B", "Europe"],
    significance: "notable",
    provider: "Mistral AI",
    providerColor: "#ff7000",
  },
  {
    id: "gpt-4-vision",
    date: "Sep 2023",
    dateNum: 202309,
    title: "GPT-4V Broadly Released — Vision and Voice Come to ChatGPT",
    summary:
      "OpenAI broadly released GPT-4 with vision capabilities to ChatGPT Plus subscribers, enabling the model to analyze images, charts, photographs, and document scans and reason about their contents. Simultaneously, OpenAI launched voice mode featuring five distinct synthesized voices with natural conversational latency. These expansions marked the shift from text-only AI assistants toward genuinely multimodal consumer interfaces.",
    tags: ["OpenAI", "GPT-4V", "Vision", "Multimodal", "Voice", "ChatGPT"],
    significance: "major",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "openai-custom-gpts",
    date: "Nov 2023",
    dateNum: 202311,
    title: "OpenAI DevDay — Custom GPTs, GPT Store, and GPT-4 Turbo",
    summary:
      "At its first developer conference, OpenAI announced custom GPTs — user-configurable AI assistants with custom instructions, knowledge files, and tool access — along with a GPT Store for sharing and discovering them. OpenAI also unveiled GPT-4 Turbo with a 128,000-token context window and significantly lower API pricing compared to the original GPT-4. The Assistants API with code execution and file retrieval was launched simultaneously.",
    tags: ["OpenAI", "GPT Store", "Custom GPTs", "GPT-4 Turbo", "128K Context", "API"],
    significance: "major",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "sam-altman-fired",
    date: "Nov 2023",
    dateNum: 202311,
    title: "OpenAI Board Fires and Reinstates Sam Altman in Five Days",
    summary:
      "OpenAI's board abruptly terminated CEO Sam Altman on November 17, citing a loss of confidence in his candor with the board. The decision triggered a company-wide revolt: nearly all 770 OpenAI employees signed a letter threatening to resign unless Altman was reinstated. Altman returned as CEO five days later with a substantially restructured board, and the episode prompted ongoing discussion about AI governance and the tension between OpenAI's nonprofit mission and its commercial scale.",
    tags: ["OpenAI", "Governance", "Sam Altman", "Corporate", "Safety Mission"],
    significance: "notable",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "gemini-1-announce",
    date: "Dec 2023",
    dateNum: 202312,
    title: "Google Announces Gemini 1.0 — Natively Multimodal Model Family",
    summary:
      "Google announced the Gemini 1.0 model family in three sizes — Ultra, Pro, and Nano — built to be natively multimodal from the ground up, understanding and generating across text, images, audio, and video in a single unified model. Gemini Ultra reportedly surpassed GPT-4 on 30 of 32 benchmarks evaluated, including the MMLU academic knowledge test. Gemini Nano was designed to run on-device on Pixel 8 Pro smartphones without a network connection.",
    tags: ["Google", "Gemini", "Multimodal", "Benchmark", "On-Device", "MMLU"],
    significance: "landmark",
    provider: "Google",
    providerColor: "#4285f4",
  },

  // ── 2024 ─────────────────────────────────────────────────────────────────

  {
    id: "sora-announcement",
    date: "Feb 2024",
    dateNum: 202402,
    title: "OpenAI Sora — Cinematic Text-to-Video AI Announced",
    summary:
      "OpenAI unveiled Sora, a text-to-video model capable of generating up to 60-second photorealistic videos with consistent physics, camera movement, and object permanence across frames. Demo videos showing hyper-realistic cityscapes, animals in motion, and abstract scenes went viral immediately. OpenAI described Sora as 'a world simulator' and stated it was not yet available to the public, instead sharing access with red teamers and visual artists.",
    tags: ["OpenAI", "Sora", "Text-to-Video", "Video Generation", "World Simulator"],
    significance: "landmark",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "gemini-1-5",
    date: "Feb 2024",
    dateNum: 202402,
    title: "Gemini 1.5 Pro — One Million Token Context Window",
    summary:
      "Google announced Gemini 1.5 Pro featuring a one-million-token context window — enough to process approximately one hour of video, 11 hours of audio, 30,000 lines of code, or 700,000 words in a single prompt. This was a ten-fold increase over the previous largest context window among major models. Google attributed the capability to a Mixture of Experts architecture, which also made the model more computationally efficient than Gemini 1.0 Ultra.",
    tags: ["Google", "Gemini 1.5", "1M Context", "Mixture of Experts", "Long Context"],
    significance: "landmark",
    provider: "Google",
    providerColor: "#4285f4",
  },
  {
    id: "claude-3-family",
    date: "Mar 2024",
    dateNum: 202403,
    title: "Claude 3 Family — Haiku, Sonnet, and Opus Set New Benchmarks",
    summary:
      "Anthropic launched the Claude 3 model family in three tiers — Haiku, Sonnet, and Opus — covering fast and cheap to most capable. Claude 3 Opus surpassed GPT-4 on most major benchmarks at launch, including MMLU, HumanEval coding, and GPQA graduate-level science, marking the first time a non-OpenAI model led broad academic evaluations across the board. All three Claude 3 models featured a 200,000-token context window as standard.",
    tags: ["Anthropic", "Claude 3", "Opus", "Sonnet", "Haiku", "200K Context", "Benchmark"],
    significance: "landmark",
    provider: "Anthropic",
    providerColor: "#d97706",
  },
  {
    id: "llama-3-release",
    date: "Apr 2024",
    dateNum: 202404,
    title: "LLaMA 3 — Meta Distributes AI to Billions via Social Platforms",
    summary:
      "Meta released LLaMA 3 in 8B and 70B parameter sizes, with the 70B model matching or exceeding GPT-3.5 Turbo on most benchmarks while remaining fully open for download. Simultaneously, Meta launched Meta AI, a consumer assistant powered by LLaMA 3, integrated natively into WhatsApp, Instagram, Messenger, and Facebook search — making a frontier-class model available to billions of users without requiring any separate sign-up.",
    tags: ["Meta", "LLaMA 3", "Open Weights", "Meta AI", "Consumer AI", "Social"],
    significance: "major",
    provider: "Meta",
    providerColor: "#0866ff",
  },
  {
    id: "gpt-4o",
    date: "May 2024",
    dateNum: 202405,
    title: "GPT-4o — Omni Model With Real-Time Audio and Vision",
    summary:
      "OpenAI launched GPT-4o ('omni'), a unified model that natively processes text, audio, and images in a single neural network rather than through a pipeline of separate specialist models. GPT-4o could respond to audio in as little as 232 milliseconds — matching human conversational latency — and detect emotional tone in speech. The model was made available to all free ChatGPT users, removing the paid-only barrier for GPT-4-class capabilities for the first time.",
    tags: ["OpenAI", "GPT-4o", "Omni", "Real-Time Audio", "Multimodal", "Free Access"],
    significance: "landmark",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "claude-3-5-sonnet",
    date: "Jun 2024",
    dateNum: 202406,
    title: "Claude 3.5 Sonnet — New State of the Art at Mid-Tier Cost",
    summary:
      "Anthropic released Claude 3.5 Sonnet, which outperformed Claude 3 Opus across most benchmarks while running at Sonnet-tier speed and pricing — a significant efficiency gain. It achieved 49% on the SWE-bench Verified coding evaluation, surpassing all other models at the time. Anthropic simultaneously introduced Artifacts, an interactive canvas panel within Claude.ai for viewing, editing, and running generated code and documents in real time.",
    tags: ["Anthropic", "Claude 3.5 Sonnet", "Coding", "SWE-bench", "Artifacts", "Efficiency"],
    significance: "landmark",
    provider: "Anthropic",
    providerColor: "#d97706",
  },
  {
    id: "apple-intelligence",
    date: "Jun 2024",
    dateNum: 202406,
    title: "Apple Intelligence — On-Device AI for iPhone, iPad, and Mac",
    summary:
      "Apple announced Apple Intelligence at WWDC 2024, a suite of AI features built into iOS 18, iPadOS 18, and macOS Sequoia. Capabilities included AI writing tools, an image generation system called Image Playground, an enhanced context-aware Siri, and a Private Cloud Compute architecture designed to process sensitive requests on Apple silicon servers without logging user data. Apple also announced an opt-in ChatGPT integration for queries Siri cannot answer locally.",
    tags: ["Apple", "Apple Intelligence", "On-Device AI", "Privacy", "Siri", "iOS 18"],
    significance: "major",
    provider: "Apple",
    providerColor: "#555555",
  },
  {
    id: "openai-o1",
    date: "Sep 2024",
    dateNum: 202409,
    title: "OpenAI o1 — Reasoning Models That Think Before Answering",
    summary:
      "OpenAI released o1, a reasoning model that spends additional compute on internal chain-of-thought 'thinking' steps before producing its final answer, trading latency for accuracy on complex tasks. o1 scored 83% on International Olympiad in Informatics competition problems and performed at PhD level on the GPQA science benchmark covering biology, chemistry, and physics. It introduced inference-time compute scaling as a distinct axis from model size for improving AI capability.",
    tags: ["OpenAI", "o1", "Reasoning", "Chain-of-Thought", "Inference Compute", "GPQA"],
    significance: "landmark",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "anthropic-computer-use",
    date: "Oct 2024",
    dateNum: 202410,
    title: "Anthropic Computer Use — Claude Controls Desktops Autonomously",
    summary:
      "Anthropic released a Computer Use capability for Claude 3.5 Sonnet in public beta, enabling the model to view screenshots and operate computers by moving a cursor, clicking interface elements, and typing text — without requiring custom API integrations for each application. This represented a significant step toward general-purpose computer agents that could automate any software task a human can perform on a screen. Anthropic flagged the capability as experimental and susceptible to prompt injection.",
    tags: ["Anthropic", "Claude", "Computer Use", "Agents", "Automation", "Desktop"],
    significance: "major",
    provider: "Anthropic",
    providerColor: "#d97706",
  },
  {
    id: "alphafold-nobel",
    date: "Oct 2024",
    dateNum: 202410,
    title: "Nobel Prize in Chemistry Awarded for AlphaFold",
    summary:
      "The Nobel Committee awarded the 2024 Nobel Prize in Chemistry to Demis Hassabis and John Jumper of Google DeepMind for AlphaFold, and to David Baker of the University of Washington for computational protein design. AlphaFold had predicted the three-dimensional structures of over 200 million proteins spanning virtually every known organism, solving a 50-year grand challenge in structural biology. The Nobel Committee also awarded the 2024 Physics Nobel to Geoffrey Hinton and John Hopfield for foundational work on neural networks — two Nobel Prizes for AI research in a single year.",
    tags: ["DeepMind", "AlphaFold", "Nobel Prize", "Protein Folding", "Biology", "Geoffrey Hinton"],
    significance: "landmark",
    provider: "DeepMind",
    providerColor: "#4285f4",
  },
  {
    id: "gemini-2-flash",
    date: "Dec 2024",
    dateNum: 202412,
    title: "Gemini 2.0 Flash — Google Launches Agentic Model Generation",
    summary:
      "Google released Gemini 2.0 Flash as the first model in its Gemini 2.0 family, designed for agentic use cases with native multimodal inputs, real-time audio output, and native image generation capability. The model featured improved tool use and was optimized for high-frequency tasks requiring low latency at minimal cost. Google framed the Gemini 2.0 generation as the beginning of what it called the 'agentic era' of AI development.",
    tags: ["Google", "Gemini 2.0", "Flash", "Agents", "Multimodal", "Image Generation"],
    significance: "major",
    provider: "Google",
    providerColor: "#4285f4",
  },
  {
    id: "sora-public-release",
    date: "Dec 2024",
    dateNum: 202412,
    title: "Sora Publicly Released — Text-to-Video Available to Subscribers",
    summary:
      "OpenAI made Sora available to ChatGPT Plus and Pro subscribers after approximately ten months of preview access limited to selected creators and red teamers. The public version generated videos up to 20 seconds in length at 1080p resolution, with a watermarking system to identify AI-generated content. The release was part of OpenAI's '12 Days of OpenAI' announcement series in December 2024.",
    tags: ["OpenAI", "Sora", "Text-to-Video", "Video Generation", "Consumer"],
    significance: "major",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },

  // ── 2025 ─────────────────────────────────────────────────────────────────

  {
    id: "deepseek-r1",
    date: "Jan 2025",
    dateNum: 202501,
    title: "DeepSeek R1 — Efficient Reasoning Model Shocks the Industry",
    summary:
      "DeepSeek released R1, a reasoning model built in China that matched OpenAI o1's performance on major benchmarks while being trained at a fraction of the cost and under US semiconductor export restrictions using older NVIDIA hardware. The model was released fully open-source under an MIT license. NVIDIA lost approximately $600 billion in market capitalization in a single trading day as investors questioned whether the most expensive AI infrastructure was necessary to achieve frontier performance.",
    tags: ["DeepSeek", "R1", "Reasoning", "Open Source", "Efficiency", "China"],
    significance: "landmark",
    provider: "DeepSeek",
    providerColor: "#1a73e8",
  },
  {
    id: "openai-operator",
    date: "Jan 2025",
    dateNum: 202501,
    title: "OpenAI Operator — AI Agent That Browses and Acts on the Web",
    summary:
      "OpenAI launched Operator, a standalone AI agent capable of navigating websites, filling in forms, completing checkouts, and booking reservations autonomously using a standard web browser. It used a Computer-Using Agent model trained specifically on graphical user interface interaction rather than relying on structured APIs. Operator launched for ChatGPT Pro subscribers in the United States, representing OpenAI's first dedicated agentic product separate from ChatGPT.",
    tags: ["OpenAI", "Operator", "Agents", "Browser Automation", "Web", "Agentic"],
    significance: "major",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "claude-3-7-sonnet",
    date: "Feb 2025",
    dateNum: 202502,
    title: "Claude 3.7 Sonnet and Claude Code — Extended Thinking and Agentic Coding",
    summary:
      "Anthropic released Claude 3.7 Sonnet, the first model to offer both a standard fast response mode and an optional Extended Thinking mode that surfaces the model's chain-of-thought reasoning to users before producing a final answer. It set a new record of 62.3% on SWE-bench Verified, the leading coding agent benchmark. Anthropic simultaneously launched Claude Code, a terminal-based agentic coding tool that could autonomously write, edit, test, and debug entire codebases.",
    tags: ["Anthropic", "Claude 3.7", "Extended Thinking", "Claude Code", "SWE-bench", "Agentic"],
    significance: "landmark",
    provider: "Anthropic",
    providerColor: "#d97706",
  },
  {
    id: "gemini-2-5-pro",
    date: "Mar 2025",
    dateNum: 202503,
    title: "Gemini 2.5 Pro — Google's Thinking Model Tops Coding Leaderboards",
    summary:
      "Google released Gemini 2.5 Pro Experimental, a thinking model that immediately ranked first on the LMArena (formerly LMSys) leaderboard and set new records on the WebDev Arena benchmark for generating web applications. It was widely praised for producing complex, functional interactive web apps from natural language descriptions with high accuracy. The model supported a one-million-token context window and offered competitive API pricing relative to OpenAI's reasoning models.",
    tags: ["Google", "Gemini 2.5 Pro", "Reasoning", "Coding", "LMArena", "Thinking"],
    significance: "major",
    provider: "Google",
    providerColor: "#4285f4",
  },
  {
    id: "gpt-4o-image-gen",
    date: "Mar 2025",
    dateNum: 202503,
    title: "GPT-4o Native Image Generation Goes Viral",
    summary:
      "OpenAI launched native image generation within GPT-4o, replacing its previous DALL-E 3 integration with a system capable of producing significantly more photorealistic images with accurate text rendering — a longstanding weakness of diffusion models. The feature generated widespread attention when users discovered it could replicate the visual style of Studio Ghibli animated films. ChatGPT reached 150 million daily active users in the week following launch, a new record for the platform.",
    tags: ["OpenAI", "GPT-4o", "Image Generation", "Multimodal", "ChatGPT", "Creative"],
    significance: "major",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "openai-o3",
    date: "Apr 2025",
    dateNum: 202504,
    title: "OpenAI o3 and o4-mini — Agentic Reasoning With Integrated Tool Use",
    summary:
      "OpenAI released o3 and o4-mini, reasoning models that can invoke tools — including web search, Python code execution, and image analysis — directly within their chain-of-thought thinking process rather than as a separate outer loop. o3 scored 69.1% on SWE-bench Verified and set new records on ARC-AGI-1, a benchmark designed to measure reasoning beyond pattern matching. The models represented the first integration of native tool use into the reasoning loop itself.",
    tags: ["OpenAI", "o3", "o4-mini", "Reasoning", "Tool Use", "ARC-AGI", "Agentic"],
    significance: "landmark",
    provider: "OpenAI",
    providerColor: "#10a37f",
  },
  {
    id: "llama-4-release",
    date: "Apr 2025",
    dateNum: 202504,
    title: "LLaMA 4 — Meta's Mixture-of-Experts Open Frontier Models",
    summary:
      "Meta released the LLaMA 4 model family including Scout, a 17-billion-active-parameter model supporting a 10-million-token context window — the largest of any publicly released model at the time — and Maverick, a Mixture of Experts model competitive with GPT-4o and Gemini 2.0 Flash on most standard benchmarks. A larger model called Behemoth was announced as still in training. All LLaMA 4 models were released under Meta's custom open license permitting broad commercial use.",
    tags: ["Meta", "LLaMA 4", "Mixture of Experts", "10M Context", "Open Weights", "MoE"],
    significance: "major",
    provider: "Meta",
    providerColor: "#0866ff",
  },
  {
    id: "claude-4-sonnet-opus",
    date: "May 2025",
    dateNum: 202505,
    title: "Claude Sonnet 4 and Opus 4 — Anthropic's Most Capable Generation",
    summary:
      "Anthropic released Claude Sonnet 4 and Claude Opus 4, with Sonnet 4 achieving 72.7% on SWE-bench Verified — a new record at launch — and Opus 4 positioned as the highest-capability option for the most demanding tasks. Both models featured improved instruction following, significantly reduced unnecessary refusals compared to earlier versions, and enhanced agentic capabilities for multi-step workflows. Claude Sonnet 4 became the primary model powering Cursor's AI coding assistant.",
    tags: ["Anthropic", "Claude 4", "Opus 4", "Sonnet 4", "SWE-bench", "Coding", "Agents"],
    significance: "landmark",
    provider: "Anthropic",
    providerColor: "#d97706",
  },
];

// ── Derived exports ────────────────────────────────────────────────────────

export const NEWS_TAGS: string[] = Array.from(
  new Set(AI_NEWS.flatMap((item) => item.tags))
).sort();
