export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  channel: string;
  summary: string;
  url: string;
  tags: string[];
  duration?: string;
  year?: number;
}

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "karpathy-intro-llm",
    videoId: "zjkBMFhNj_g",
    title: "Intro to Large Language Models",
    channel: "Andrej Karpathy",
    summary:
      "A 1-hour general-purpose introduction to LLMs — what they are, how they're trained, and where the field is headed. Covers tokenization, fine-tuning, RLHF, and emergent capabilities without requiring a maths background.",
    url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    tags: ["LLM", "Fundamentals", "Beginner-friendly"],
    duration: "59 min",
    year: 2023,
  },
  {
    id: "karpathy-gpt-from-scratch",
    videoId: "kCc8FmEb1nY",
    title: "Let's build GPT: from scratch, in code",
    channel: "Andrej Karpathy",
    summary:
      "Step-by-step implementation of a GPT language model in PyTorch, covering tokenization, self-attention, transformer blocks, and training on Shakespeare text. One of the most-watched AI coding tutorials on YouTube.",
    url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
    tags: ["PyTorch", "Transformer", "Hands-on", "Code"],
    duration: "1h 56min",
    year: 2023,
  },
  {
    id: "3b1b-neural-networks",
    videoId: "aircAruvnKk",
    title: "But what is a neural network?",
    channel: "3Blue1Brown",
    summary:
      "The definitive visual introduction to neural networks — how layers, weights, and activation functions combine to learn from data. Part of the acclaimed 'Neural Networks' series with stunning animations that make backpropagation intuitive.",
    url: "https://www.youtube.com/watch?v=aircAruvnKk",
    tags: ["Neural Networks", "Visual", "Beginner-friendly"],
    duration: "19 min",
    year: 2017,
  },
  {
    id: "mastering-data-fpa",
    videoId: "LAEVBfnOhVM",
    title: "Mastering Data in FP&A",
    channel: "Board",
    summary:
      "Deep dive into building analytical capabilities for Finance & Planning functions — covering data architecture, forecasting automation, and how AI tools are transforming the FP&A role from spreadsheet-driven to insight-driven.",
    url: "https://www.youtube.com/watch?v=LAEVBfnOhVM",
    tags: ["FP&A", "Finance", "Data", "Practical"],
    duration: "Podcast",
    year: 2024,
  },
  {
    id: "3b1b-attention",
    videoId: "eMlx5fFNoYc",
    title: "Attention in Transformers, visually explained",
    channel: "3Blue1Brown",
    summary:
      "Visual explanation of the self-attention mechanism — the core innovation behind every modern LLM. Shows exactly how queries, keys, and values interact and why attention scales to long-context reasoning.",
    url: "https://www.youtube.com/watch?v=eMlx5fFNoYc",
    tags: ["Attention", "Transformer", "Visual", "Deep Learning"],
    duration: "26 min",
    year: 2024,
  },
  {
    id: "how-to-powerbi-ai-charts",
    videoId: "mBdStGiyT9c",
    title: "AI Can Now Build ANY Power BI Chart You Want",
    channel: "How to Power BI",
    summary:
      "Step-by-step walkthrough of using AI and Microsoft Copilot to generate any chart type in Power BI from a plain-English prompt — no manual drag-and-drop needed. Covers natural language chart generation, auto-written DAX measures, and how to prepare your data model so Copilot gives accurate results every time.",
    url: "https://www.youtube.com/watch?v=mBdStGiyT9c",
    tags: ["Power BI", "Copilot", "DAX", "AI Charts", "Practical"],
    duration: "~20 min",
    year: 2026,
  },
  {
    id: "karpathy-backprop-nn-zero-hero",
    videoId: "VMj-3S1tku0",
    title: "The spelled-out intro to neural networks and backpropagation",
    channel: "Andrej Karpathy",
    summary:
      "Part of the 'Neural Networks: Zero to Hero' series. Builds micrograd — a tiny autograd engine — from scratch to demystify how gradients flow through a network and how PyTorch's autograd works under the hood.",
    url: "https://www.youtube.com/watch?v=VMj-3S1tku0",
    tags: ["Backpropagation", "Autograd", "PyTorch", "Code"],
    duration: "2h 25min",
    year: 2022,
  },
  {
    id: "google-io-2026-keynote",
    videoId: "CdJjph8-2Oc",
    title: "Google I/O 2026 Keynote",
    channel: "Google",
    summary:
      "The full Google I/O 2026 keynote — Sundar Pichai and Demis Hassabis unveil Gemini 3.5 Flash, Gemini Omni (native video world model), Antigravity 2.0 agent platform, Gemini Spark (24/7 personal agent), AI Mode hitting 1 billion users, and Android XR audio glasses. The most product-dense I/O in Google's history.",
    url: "https://www.youtube.com/watch?v=CdJjph8-2Oc",
    tags: ["Google I/O", "Gemini", "AI Agents", "2026", "Keynote"],
    duration: "~2h",
    year: 2026,
  },
  {
    id: "diamandis-anthropic-ipo-chatgpt-1b",
    videoId: "hyeoYsVl1No",
    title: "Anthropic Files $965B IPO, Trump Signs AI Executive Order, and ChatGPT Crosses 1B Users",
    channel: "Moonshots with Peter Diamandis",
    summary:
      "EP #262 of the Moonshots podcast covers the week's biggest AI market moves: Anthropic's confidential S-1 IPO filing at a $965B valuation, Trump's AI executive order establishing voluntary 30-day pre-release reviews, ChatGPT crossing 1 billion monthly active users (the fastest consumer product adoption in history), Claude's 640% year-over-year growth, and OpenAI's push into robotics. Also covers Bernie Sanders' AI sovereign wealth fund bill and three major longevity breakthroughs.",
    url: "https://www.youtube.com/watch?v=hyeoYsVl1No",
    tags: ["AI Market", "IPO", "Anthropic", "OpenAI", "Policy", "Industry", "Podcast", "2026"],
    duration: "~45 min",
    year: 2026,
  },
  {
    id: "anthropic-introducing-claude-fable-5",
    videoId: "Y9Wz2PV404E",
    title: "Introducing Claude Fable 5",
    channel: "Anthropic",
    summary:
      "Anthropic's official launch video for Claude Fable 5, released June 9, 2026. Walks through the model's headline numbers — 95% on SWE-bench Verified, a 1M-token context window, and always-on adaptive thinking — and shows how it sustains long-horizon agentic tasks with built-in self-verification and sub-agent delegation.",
    url: "https://www.youtube.com/watch?v=Y9Wz2PV404E",
    tags: ["Claude Fable 5", "Anthropic", "Launch", "Agents", "2026"],
    duration: "~5 min",
    year: 2026,
  },
  {
    id: "claude-fable-5-coding-demo",
    videoId: "I3PYGi_tGy0",
    title: "Claude Fable 5 in Claude Code: The Hardest Coding Test Yet",
    channel: "Anthropic",
    summary:
      "A hands-on walkthrough of Claude Fable 5 running inside Claude Code on a multi-day refactoring task — using the memory tool to persist progress across sessions, delegating sub-tasks to background agents, and self-verifying its own changes before reporting completion. Demonstrates the kind of long-horizon, low-supervision workflow Fable 5's 1M-token context and adaptive thinking are designed for.",
    url: "https://www.youtube.com/watch?v=I3PYGi_tGy0",
    tags: ["Claude Fable 5", "Claude Code", "Coding", "Agents", "Demo"],
    duration: "~18 min",
    year: 2026,
  },
];
