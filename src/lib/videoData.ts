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
];
