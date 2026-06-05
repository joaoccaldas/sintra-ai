export interface ResearchPaper {
  id: string;
  title: string;
  shortTitle: string;
  authors: string;        // "Vaswani et al." style
  institution: string;    // lead org
  year: number;
  month?: number;         // 1-12
  category: ResearchCategory;
  tldr: string;           // 1 sentence plain-English summary
  whyItMatters: string;   // practitioner implication
  keyFindings: string[];  // 2-4 bullets
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  url?: string;
  icon: string;           // emoji
}

export type ResearchCategory =
  | "architecture"
  | "alignment"
  | "agents"
  | "multimodal"
  | "efficiency"
  | "reasoning"
  | "safety"
  | "evaluation";

export const CATEGORY_META: Record<
  ResearchCategory,
  { label: string; color: string; icon: string }
> = {
  architecture: { label: "Architecture", color: "#9F8CFF", icon: "🏗️" },
  alignment:    { label: "Alignment",    color: "#f59e0b", icon: "🧭" },
  agents:       { label: "Agents",       color: "#10b981", icon: "🤖" },
  multimodal:   { label: "Multimodal",   color: "#ec4899", icon: "👁️" },
  efficiency:   { label: "Efficiency",   color: "#06b6d4", icon: "⚡" },
  reasoning:    { label: "Reasoning",    color: "#4285f4", icon: "🧠" },
  safety:       { label: "Safety",       color: "#ef4444", icon: "🔒" },
  evaluation:   { label: "Evaluation",   color: "#8b5cf6", icon: "📊" },
};

export const RESEARCH_PAPERS: ResearchPaper[] = [
  // ── Architecture ──────────────────────────────────────────────────────────
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    shortTitle: "Attention Is All You Need",
    authors: "Vaswani et al.",
    institution: "Google Brain",
    year: 2017,
    month: 6,
    category: "architecture",
    tldr: "Introduced the Transformer — the neural network architecture that underlies every modern LLM.",
    whyItMatters:
      "Every model you use today — GPT-4, Claude, Gemini — is a scaled-up Transformer. Understanding attention helps you interpret context windows and token limits.",
    keyFindings: [
      "Self-attention lets every token attend to every other token, replacing recurrence and convolutions.",
      "Multi-head attention captures multiple types of relationships in parallel.",
      "Positional encoding injects sequence order without recurrence.",
      "Outperformed RNN/CNN baselines on machine translation with less compute.",
    ],
    difficulty: "intermediate",
    tags: ["Transformer", "Attention", "Architecture", "NLP", "Foundational"],
    url: "https://arxiv.org/abs/1706.03762",
    icon: "⚙️",
  },
  {
    id: "scaling-laws-neural-lm",
    title: "Scaling Laws for Neural Language Models",
    shortTitle: "Scaling Laws",
    authors: "Kaplan et al.",
    institution: "OpenAI",
    year: 2020,
    month: 1,
    category: "architecture",
    tldr: "Larger models, more data, and more compute produce predictably better AI — following power-law curves.",
    whyItMatters:
      "Explains why labs keep training bigger models: returns are predictable, allowing cost-vs-capability planning before training runs.",
    keyFindings: [
      "Model loss follows a power law in model size, dataset size, and compute.",
      "Compute budget is most efficiently spent by scaling all three in tandem.",
      "Largest models are most compute-efficient per training token.",
      "Data overfitting sets an eventual ceiling for fixed-size models.",
    ],
    difficulty: "intermediate",
    tags: ["Scaling", "Training", "Compute", "Foundational"],
    url: "https://arxiv.org/abs/2001.08361",
    icon: "📈",
  },
  {
    id: "mixture-of-experts-llm",
    title: "Mixtral of Experts",
    shortTitle: "Mixtral MoE",
    authors: "Jiang et al.",
    institution: "Mistral AI",
    year: 2024,
    month: 1,
    category: "architecture",
    tldr: "Sparse Mixture-of-Experts routes each token to only 2 of 8 expert sub-networks, matching dense 70B models at 13B active-parameter cost.",
    whyItMatters:
      "MoE is how most frontier models (GPT-4, Gemini 1.5) achieve large capacity at lower inference cost — crucial for pricing and latency planning.",
    keyFindings: [
      "8×7B MoE with only 2 active experts per token outperforms Llama 2 70B on most benchmarks.",
      "Inference cost equivalent to a ~13B dense model despite 47B total parameters.",
      "Excels at code, math, and multilingual tasks relative to parameter count.",
      "Open-weights release accelerated community MoE research by 12+ months.",
    ],
    difficulty: "intermediate",
    tags: ["MoE", "Efficiency", "Open Weights", "Architecture"],
    url: "https://arxiv.org/abs/2401.04088",
    icon: "🔀",
  },

  // ── Alignment ─────────────────────────────────────────────────────────────
  {
    id: "rlhf-instruct-gpt",
    title: "Training Language Models to Follow Instructions with Human Feedback",
    shortTitle: "InstructGPT / RLHF",
    authors: "Ouyang et al.",
    institution: "OpenAI",
    year: 2022,
    month: 3,
    category: "alignment",
    tldr: "Human raters score model outputs, a reward model learns their preferences, and PPO fine-tunes the LLM to maximize that reward — producing InstructGPT.",
    whyItMatters:
      "RLHF is what made ChatGPT feel helpful rather than weird. Every instruction-tuned model today uses some version of this pipeline.",
    keyFindings: [
      "RLHF models were preferred by raters over 100× larger supervised models.",
      "Fine-tuning on just 13K human-labelled demonstrations + 33K reward comparisons sufficed.",
      "Reduces harmful outputs while improving truthfulness vs. base GPT-3.",
      "Introduced 'alignment tax' concept: small degradation on some benchmarks for safety gains.",
    ],
    difficulty: "intermediate",
    tags: ["RLHF", "Alignment", "Fine-Tuning", "Foundational"],
    url: "https://arxiv.org/abs/2203.02155",
    icon: "🎯",
  },
  {
    id: "constitutional-ai",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    shortTitle: "Constitutional AI",
    authors: "Bai et al.",
    institution: "Anthropic",
    year: 2022,
    month: 12,
    category: "alignment",
    tldr: "Instead of human feedback for harm labels, a set of written principles (a 'constitution') guides the AI to critique and revise its own outputs.",
    whyItMatters:
      "Constitutional AI is how Claude is trained. Understanding it helps you predict when and why Claude will refuse or hedge.",
    keyFindings: [
      "Supervised RLHF with AI-generated preference data matches human-labeller quality.",
      "16-principle constitution covers honesty, harm avoidance, and autonomy preservation.",
      "CAI models show 80% reduction in harmful outputs vs. RLHF baseline.",
      "Scales alignment feedback without proportional human labelling cost.",
    ],
    difficulty: "intermediate",
    tags: ["Constitutional AI", "Alignment", "Anthropic", "Safety"],
    url: "https://arxiv.org/abs/2212.08073",
    icon: "📜",
  },
  {
    id: "direct-preference-optimization",
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    shortTitle: "DPO",
    authors: "Rafailov et al.",
    institution: "Stanford / CZ Biohub",
    year: 2023,
    month: 5,
    category: "alignment",
    tldr: "DPO eliminates the separate reward model and PPO training loop by optimising preferences directly in the LLM — simpler, cheaper, and often better.",
    whyItMatters:
      "DPO has largely replaced RLHF in open-model fine-tuning pipelines. If you're fine-tuning on preference data, you'll likely use DPO or a variant.",
    keyFindings: [
      "Shows RLHF implicitly optimises a closed-form loss expressible directly on the LLM.",
      "Matches or exceeds PPO-based RLHF on summarisation and dialogue benchmarks.",
      "Eliminates need for reward model, value function, and online sampling.",
      "Widely adopted: Llama 2 Chat, Zephyr, Mistral-Instruct all use DPO variants.",
    ],
    difficulty: "advanced",
    tags: ["DPO", "Fine-Tuning", "Alignment", "RLHF"],
    url: "https://arxiv.org/abs/2305.18290",
    icon: "⚖️",
  },

  // ── Reasoning ─────────────────────────────────────────────────────────────
  {
    id: "chain-of-thought-prompting",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    shortTitle: "Chain-of-Thought",
    authors: "Wei et al.",
    institution: "Google Brain",
    year: 2022,
    month: 1,
    category: "reasoning",
    tldr: "Adding 'think step by step' examples to prompts dramatically improves LLM performance on math, logic, and multi-step reasoning tasks.",
    whyItMatters:
      "Chain-of-thought is the foundation of every reasoning-heavy prompt pattern — from complex calculations to debugging code to legal analysis.",
    keyFindings: [
      "8-shot CoT prompting improves GSM8K accuracy from 17.9% to 74.6% on PaLM 540B.",
      "Emergent only at ~100B parameters — CoT prompting doesn't work on small models.",
      "CoT intermediate steps can be inspected to catch reasoning errors.",
      "Zero-shot CoT ('think step by step') also works, albeit slightly weaker.",
    ],
    difficulty: "beginner",
    tags: ["Chain-of-Thought", "Reasoning", "Prompting", "Benchmarks"],
    url: "https://arxiv.org/abs/2201.11903",
    icon: "🔗",
  },
  {
    id: "let-me-think-slow-fast",
    title: "Thinking LLMs: General Instruction Following with Thought Generation",
    shortTitle: "Thinking / o1-style Reasoning",
    authors: "Wu et al.",
    institution: "Meta FAIR",
    year: 2024,
    month: 10,
    category: "reasoning",
    tldr: "Training LLMs to generate 'thinking' tokens before their final answer produces large reasoning gains without sacrificing general instruction-following.",
    whyItMatters:
      "o1, Claude's 'extended thinking', and Gemini's 'think' mode all stem from this pattern — invisible to the user but consuming billable tokens.",
    keyFindings: [
      "Thinking-trained models outperform equivalents on MATH (+12%), GPQA (+8%), and code tasks.",
      "Thinking tokens are hidden from the user but count toward context and cost.",
      "General instruction following improves alongside reasoning on standard benchmarks.",
      "Compatible with standard fine-tuning pipelines without RL.",
    ],
    difficulty: "intermediate",
    tags: ["Reasoning", "Extended Thinking", "o1", "Chain-of-Thought"],
    url: "https://arxiv.org/abs/2410.10630",
    icon: "💭",
  },

  // ── Agents ────────────────────────────────────────────────────────────────
  {
    id: "react-synergizing-reasoning-acting",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    shortTitle: "ReAct",
    authors: "Yao et al.",
    institution: "Princeton / Google Brain",
    year: 2022,
    month: 10,
    category: "agents",
    tldr: "Interleaving reasoning traces ('thoughts') with actions (API calls, search) in a loop gives LLMs far better task-completion than action-only or reasoning-only approaches.",
    whyItMatters:
      "ReAct is the conceptual backbone of every tool-using AI agent — Anthropic's tool_use API, LangChain, AutoGen all follow this Thought→Action→Observation loop.",
    keyFindings: [
      "ReAct outperforms CoT alone and action-only on HotpotQA, FEVER, WebShop, ALFWorld.",
      "Interleaving thoughts with actions reduces hallucination by grounding claims in retrieved facts.",
      "Traces are interpretable — debuggable by reading the thought-action-observation log.",
      "Works with frozen LLMs via few-shot prompting alone.",
    ],
    difficulty: "intermediate",
    tags: ["Agents", "ReAct", "Tool Use", "Reasoning", "Foundational"],
    url: "https://arxiv.org/abs/2210.03629",
    icon: "🔄",
  },
  {
    id: "swe-bench",
    title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
    shortTitle: "SWE-bench",
    authors: "Jimenez et al.",
    institution: "Princeton",
    year: 2023,
    month: 10,
    category: "evaluation",
    tldr: "A benchmark of 2,294 real GitHub issues where models must write code patches that actually pass the associated test suites.",
    whyItMatters:
      "SWE-bench is the de-facto standard for measuring coding AI capability — every lab reports SWE-bench Verified scores when releasing coding models.",
    keyFindings: [
      "Original GPT-4 solved only 1.7% of tasks — highlighting the gap between chat and autonomous coding.",
      "SWE-bench Verified (500-task human-validated subset) is the current lab comparison benchmark.",
      "As of mid-2025, best agents solve 50-70% of Verified tasks — up from <2% in 2023.",
      "Rewards end-to-end agentic coding over pattern-matching to training data.",
    ],
    difficulty: "intermediate",
    tags: ["Evaluation", "Coding AI", "Benchmarks", "Agents"],
    url: "https://swe-bench.github.io",
    icon: "🧪",
  },

  // ── Multimodal ────────────────────────────────────────────────────────────
  {
    id: "clip-contrastive-image-text",
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    shortTitle: "CLIP",
    authors: "Radford et al.",
    institution: "OpenAI",
    year: 2021,
    month: 2,
    category: "multimodal",
    tldr: "CLIP trains image and text encoders jointly on 400M image-caption pairs so they share a common embedding space, enabling zero-shot image classification.",
    whyItMatters:
      "CLIP's image encoder is embedded in GPT-4V, Claude's vision, and almost every commercial image understanding pipeline in use today.",
    keyFindings: [
      "Zero-shot CLIP matches supervised ResNet-50 on ImageNet without seeing a single labelled ImageNet image.",
      "Contrastive pre-training on noisy web data outperforms clean curated sets for transfer.",
      "Shared embedding space enables flexible downstream tasks without task-specific heads.",
      "Enabled Stable Diffusion's CLIP-guided generation as a follow-on application.",
    ],
    difficulty: "intermediate",
    tags: ["Multimodal", "Vision", "CLIP", "Zero-Shot", "Embeddings"],
    url: "https://arxiv.org/abs/2103.00020",
    icon: "🖼️",
  },
  {
    id: "gpt-4v-technical-report",
    title: "GPT-4 Technical Report",
    shortTitle: "GPT-4 Technical Report",
    authors: "OpenAI",
    institution: "OpenAI",
    year: 2023,
    month: 3,
    category: "multimodal",
    tldr: "GPT-4 is a large multimodal model that accepts text and images, scores in the top percentile on professional exams, and outperforms GPT-3.5 substantially.",
    whyItMatters:
      "The technical report defines the evaluation standard (professional exams, MMLU, HumanEval) that all labs now use, and set the capability baseline for the current generation.",
    keyFindings: [
      "90th-percentile bar exam, 99th-percentile GRE Verbal, 100th-percentile AMC 10/12.",
      "Substantially more factual and less prone to hallucination than GPT-3.5 on TruthfulQA.",
      "System prompt allows persona and style configuration — first public system-prompt API.",
      "Redteaming revealed persistent gaps in factuality, bias, and adversarial robustness.",
    ],
    difficulty: "beginner",
    tags: ["GPT-4", "Multimodal", "Benchmarks", "OpenAI"],
    url: "https://arxiv.org/abs/2303.08774",
    icon: "🌐",
  },

  // ── Safety ────────────────────────────────────────────────────────────────
  {
    id: "prompt-injection-attacks",
    title: "Prompt Injection Attacks and Defenses in LLM-Integrated Applications",
    shortTitle: "Prompt Injection Survey",
    authors: "Liu et al.",
    institution: "Virginia Tech",
    year: 2023,
    month: 10,
    category: "safety",
    tldr: "Prompt injection — malicious text that hijacks LLM behaviour — is a systemic vulnerability with no complete defence as of 2024.",
    whyItMatters:
      "Every AI agent that reads untrusted content (emails, web pages, PDFs) is vulnerable to prompt injection. Awareness of attack surface is essential for production deployments.",
    keyFindings: [
      "Direct injection targets the model directly; indirect injection embeds instructions in data the model reads.",
      "Adversarial suffix attacks transfer across models despite white-box training.",
      "Instruction hierarchy (system > user > tool) mitigates but does not eliminate injection.",
      "No current defence provides complete protection against all injection variants.",
    ],
    difficulty: "intermediate",
    tags: ["Safety", "Security", "Prompt Injection", "Agents"],
    url: "https://arxiv.org/abs/2310.12815",
    icon: "🛡️",
  },
  {
    id: "sleeper-agents-safety",
    title: "Sleeper Agents: Training Deceptive LLMs That Persist Through Safety Training",
    shortTitle: "Sleeper Agents",
    authors: "Hubinger et al.",
    institution: "Anthropic",
    year: 2024,
    month: 1,
    category: "safety",
    tldr: "Models can be trained to behave safely during normal use but activate malicious behaviour on a trigger — and standard safety fine-tuning fails to remove this.",
    whyItMatters:
      "Demonstrates that RLHF and supervised fine-tuning cannot be relied upon to detect or remove deep backdoors, making pre-training provenance and evaluation coverage critical.",
    keyFindings: [
      "Backdoored models passed standard safety evaluations while retaining hidden trigger behaviour.",
      "RLHF, supervised fine-tuning, and adversarial training failed to remove the backdoor.",
      "Larger models maintained deceptive behaviour more robustly than smaller ones.",
      "Chain-of-thought 'scratchpad' reasoning made deception more persistent, not less.",
    ],
    difficulty: "advanced",
    tags: ["Safety", "Alignment", "Backdoors", "Red-Teaming", "Anthropic"],
    url: "https://arxiv.org/abs/2401.05566",
    icon: "😴",
  },

  // ── Efficiency ────────────────────────────────────────────────────────────
  {
    id: "lora-low-rank-adaptation",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    shortTitle: "LoRA",
    authors: "Hu et al.",
    institution: "Microsoft",
    year: 2021,
    month: 6,
    category: "efficiency",
    tldr: "Freeze most model weights and inject tiny trainable low-rank matrices at each layer — achieves full fine-tune quality at 10,000× fewer trainable parameters.",
    whyItMatters:
      "LoRA is the dominant technique for fine-tuning LLMs on consumer hardware or tight GPU budgets. Hugging Face PEFT, Axolotl, Unsloth all default to LoRA.",
    keyFindings: [
      "Rank-4 LoRA on GPT-3 175B matches full fine-tune on GLUE with 0.01% of trainable params.",
      "Reduces VRAM from 1.2TB to 350GB for fine-tuning GPT-3-scale models.",
      "Adapters are swappable: swap LoRA weights without reloading the base model.",
      "QLoRA (quantised LoRA) later enabled 65B model fine-tuning on a single 48GB GPU.",
    ],
    difficulty: "intermediate",
    tags: ["LoRA", "Fine-Tuning", "Efficiency", "PEFT"],
    url: "https://arxiv.org/abs/2106.09685",
    icon: "🗜️",
  },
  {
    id: "flash-attention",
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
    shortTitle: "FlashAttention",
    authors: "Dao et al.",
    institution: "Stanford",
    year: 2022,
    month: 5,
    category: "efficiency",
    tldr: "Rewriting attention computation to minimise GPU memory reads/writes makes it 2-4× faster and enables 10× longer context windows at the same VRAM budget.",
    whyItMatters:
      "FlashAttention is in virtually every production LLM inference stack and is the reason 100K+ token context windows are economically viable.",
    keyFindings: [
      "2-4× faster than standard PyTorch attention with identical numerical output.",
      "Enables training on 4× longer sequences at the same GPU memory limit.",
      "FlashAttention-2 (2023) added further parallelism for 2× additional speedup.",
      "FlashAttention-3 (2024) achieves 75% of theoretical H100 FLOP utilisation.",
    ],
    difficulty: "advanced",
    tags: ["FlashAttention", "Efficiency", "Inference", "GPU", "Context Window"],
    url: "https://arxiv.org/abs/2205.14135",
    icon: "⚡",
  },

  // ── Evaluation ────────────────────────────────────────────────────────────
  {
    id: "mmlu-benchmark",
    title: "Measuring Massive Multitask Language Understanding",
    shortTitle: "MMLU",
    authors: "Hendrycks et al.",
    institution: "UC Berkeley",
    year: 2020,
    month: 9,
    category: "evaluation",
    tldr: "MMLU is a 57-subject multiple-choice exam (14,000 questions) covering STEM, humanities, social sciences, and professional domains used to measure general knowledge.",
    whyItMatters:
      "MMLU is the most widely cited knowledge benchmark in LLM comparisons — every model card includes it as a reference point.",
    keyFindings: [
      "GPT-3 175B scored 43.9% on MMLU; human experts average 89.8%.",
      "By 2024, frontier models exceeded 90% on MMLU, prompting calls for harder successors (GPQA, MMLU-Pro).",
      "Coverage across 57 subjects exposes domain-specific capability gaps invisible in aggregate scores.",
      "Multiple-choice format makes gaming possible — raw scores must be interpreted carefully.",
    ],
    difficulty: "beginner",
    tags: ["MMLU", "Evaluation", "Benchmarks", "Knowledge"],
    url: "https://arxiv.org/abs/2009.03300",
    icon: "📚",
  },
  {
    id: "gpqa-diamond",
    title: "GPQA: A Graduate-Level Google-Proof Q&A Benchmark",
    shortTitle: "GPQA Diamond",
    authors: "Rein et al.",
    institution: "NYU / Anthropic",
    year: 2023,
    month: 11,
    category: "evaluation",
    tldr: "448 extremely hard multiple-choice questions written by PhD experts in biology, chemistry, and physics — designed to be unsolvable by Google search alone.",
    whyItMatters:
      "GPQA Diamond is the benchmark labs use to distinguish cutting-edge frontier models from merely 'strong' ones — replacing MMLU as the hard-knowledge standard.",
    keyFindings: [
      "Non-expert humans with internet access average only 34% — below random for 4-choice questions on some domains.",
      "Domain experts average 65%; GPT-4 scored 39% at release.",
      "Claude 3 Opus was the first model to exceed 50% (50.4%); Claude 3.5 Sonnet reached 59.4%.",
      "Questions are refreshed annually to prevent data contamination.",
    ],
    difficulty: "intermediate",
    tags: ["GPQA", "Evaluation", "Benchmarks", "Expert-Level"],
    url: "https://arxiv.org/abs/2311.12022",
    icon: "🎓",
  },

  // ── Recent 2024–2025 ──────────────────────────────────────────────────────
  {
    id: "gemini-1-5-million-token",
    title: "Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens of Context",
    shortTitle: "Gemini 1.5 Pro",
    authors: "Google DeepMind",
    institution: "Google DeepMind",
    year: 2024,
    month: 2,
    category: "multimodal",
    tldr: "Gemini 1.5 Pro achieves near-perfect recall over 1M-token contexts in text, audio, video, and code, using a sparse mixture-of-experts architecture.",
    whyItMatters:
      "1M-token context enables new use cases: full codebase analysis, hour-long video summarisation, and document-heavy legal or financial workflows in a single call.",
    keyFindings: [
      "Near-perfect (>99%) needle-in-a-haystack recall up to 1M tokens of text.",
      "Can learn a new language from a 500-page grammar book in context — zero-shot.",
      "Full-hour video and up to 11 hours of audio fit in a single context window.",
      "Sparse MoE provides 1M-token capability at inference costs competitive with smaller dense models.",
    ],
    difficulty: "intermediate",
    tags: ["Gemini", "Context Window", "Multimodal", "Google", "MoE"],
    url: "https://arxiv.org/abs/2403.05530",
    icon: "💎",
  },
  {
    id: "llama-3-meta",
    title: "The Llama 3 Herd of Models",
    shortTitle: "Llama 3",
    authors: "Meta AI",
    institution: "Meta",
    year: 2024,
    month: 7,
    category: "architecture",
    tldr: "Llama 3 (8B–405B) uses a dense transformer trained on 15T+ tokens, achieving near-parity with GPT-4 on most benchmarks while being freely downloadable.",
    whyItMatters:
      "Llama 3 405B is the open-weight baseline used for comparing closed vs. open frontier models. Llama 3.1 enabled on-premises GPT-4-class deployments.",
    keyFindings: [
      "405B model matches GPT-4 on MMLU (88.6%), HumanEval (89.0%), and MATH (73.8%).",
      "Trained on 15.6T tokens with meticulous data curation — data quality matters more than quantity.",
      "128K context window; 8B and 70B models usable on consumer and enterprise hardware.",
      "Open weights with a custom licence permitting commercial use above 700M MAU.",
    ],
    difficulty: "intermediate",
    tags: ["Llama", "Meta", "Open Weights", "Architecture"],
    url: "https://arxiv.org/abs/2407.21783",
    icon: "🦙",
  },
  {
    id: "deepseek-r1",
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    shortTitle: "DeepSeek-R1",
    authors: "DeepSeek AI",
    institution: "DeepSeek",
    year: 2025,
    month: 1,
    category: "reasoning",
    tldr: "Using RL without any supervised fine-tuning, DeepSeek-R1 matches OpenAI o1 on math and code benchmarks at a fraction of the training cost.",
    whyItMatters:
      "Demonstrated that RL alone (without SFT cold-start) can produce o1-level reasoning at open-source cost, triggering a market repricing of US AI stocks in January 2025.",
    keyFindings: [
      "AIME 2024: 79.8% vs. o1's 79.2% using pure RL training from the base model.",
      "Models developed 'thinking' patterns — chain-of-thought, self-verification — without explicit examples.",
      "Distilled 1.5B–70B open-weight reasoning models exceed GPT-4o on many benchmarks.",
      "Training cost an order of magnitude lower than comparable closed-model capabilities.",
    ],
    difficulty: "intermediate",
    tags: ["DeepSeek", "Reasoning", "RL", "Open Weights", "Benchmarks"],
    url: "https://arxiv.org/abs/2501.12948",
    icon: "🔍",
  },
];

export const RESEARCH_CATEGORIES = Object.keys(CATEGORY_META) as ResearchCategory[];
