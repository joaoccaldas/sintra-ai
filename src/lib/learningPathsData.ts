import { BASE_PATH } from "./constants";

export interface PathStep {
  type: "concept" | "use-case" | "tool" | "page" | "read";
  label: string;
  desc: string;
  href: string;
  duration: string;
  icon: string;
}

export interface LearningPath {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  color: string;
  level: "beginner" | "intermediate" | "advanced";
  audience: string;
  totalDuration: string;
  steps: PathStep[];
}

const concept = (id: string) => `${BASE_PATH}/concepts/#${id}`;
const page = (route: string) => `${BASE_PATH}/${route.replace(/^\/+|\/+$/g, "")}/`;
const library = `${BASE_PATH}/library/`;

export const LEARNING_PATHS: LearningPath[] = [
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
        desc: "Start with the big picture: 70 years of AI history from the Dartmouth Conference to modern generative AI.",
        href: page("ai-history"),
        duration: "10 min",
        icon: "🕰️",
      },
      {
        type: "concept",
        label: "What Is Machine Learning?",
        desc: "Understand systems that learn patterns from examples instead of relying only on explicit rules.",
        href: concept("machine-learning"),
        duration: "5 min",
        icon: "🤖",
      },
      {
        type: "concept",
        label: "Large Language Models",
        desc: "Learn what powers ChatGPT, Claude, and Gemini, and why next-token prediction became so capable.",
        href: concept("llm"),
        duration: "5 min",
        icon: "⬡",
      },
      {
        type: "concept",
        label: "Tokens and Context Windows",
        desc: "Understand how text is split into tokens and how much information a model can process at once.",
        href: concept("tokens"),
        duration: "5 min",
        icon: "🪙",
      },
      {
        type: "page",
        label: "Meet the Major AI Labs",
        desc: "Compare the organizations shaping frontier AI, their products, strengths, and strategic differences.",
        href: page("ai-labs"),
        duration: "10 min",
        icon: "🏛️",
      },
      {
        type: "use-case",
        label: "Try Your First AI Task",
        desc: "Choose a Quick Win prompt and run it in your preferred assistant. Real output makes the concepts concrete.",
        href: library,
        duration: "10 min",
        icon: "✨",
      },
    ],
  },
  {
    id: "prompt-practitioner",
    title: "Prompt Practitioner",
    tagline: "Master the craft of prompting and get consistently useful AI outputs.",
    emoji: "✍️",
    color: "#5EEAD4",
    level: "intermediate",
    audience: "For knowledge workers and professionals",
    totalDuration: "~50 min",
    steps: [
      {
        type: "concept",
        label: "Prompt Engineering Fundamentals",
        desc: "Learn role-setting, examples, context, constraints, and output formatting.",
        href: concept("prompt-engineering"),
        duration: "8 min",
        icon: "✨",
      },
      {
        type: "use-case",
        label: "Writing and Editing Use Cases",
        desc: "Study practical prompts for email, reports, social content, and long-form writing.",
        href: library,
        duration: "10 min",
        icon: "📝",
      },
      {
        type: "use-case",
        label: "Research and Synthesis Prompts",
        desc: "Practise summarizing sources, spotting contradictions, extracting data, and generating analysis.",
        href: library,
        duration: "10 min",
        icon: "🔍",
      },
      {
        type: "concept",
        label: "RAG: Grounding AI in Your Documents",
        desc: "Understand how retrieval gives models relevant evidence before they answer.",
        href: concept("rag"),
        duration: "6 min",
        icon: "📚",
      },
      {
        type: "use-case",
        label: "Productivity and Planning Prompts",
        desc: "Apply structured prompting to meetings, projects, decisions, and recurring workflows.",
        href: library,
        duration: "8 min",
        icon: "⚡",
      },
      {
        type: "concept",
        label: "Fine-Tuning vs. Prompting",
        desc: "Learn when prompting is enough and when a specialized model is justified.",
        href: concept("fine-tuning"),
        duration: "5 min",
        icon: "🎯",
      },
      {
        type: "read",
        label: "Quick Wins Practice",
        desc: "Run three prompts, compare the results, and note which context or constraints improved each output.",
        href: library,
        duration: "15 min",
        icon: "⏱️",
      },
    ],
  },
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
        label: "APIs: How Code Talks to AI",
        desc: "Understand requests, responses, system instructions, token limits, and model parameters.",
        href: concept("api"),
        duration: "6 min",
        icon: "🔌",
      },
      {
        type: "concept",
        label: "Function Calling and Tool Use",
        desc: "Learn how models request structured actions that application code executes safely.",
        href: concept("function-calling"),
        duration: "7 min",
        icon: "🛠️",
      },
      {
        type: "concept",
        label: "AI Agents: From Prompts to Workflows",
        desc: "Understand planning, tools, memory, observations, and iterative execution.",
        href: concept("agents"),
        duration: "8 min",
        icon: "⚡",
      },
      {
        type: "concept",
        label: "MCP: Reusable AI Integrations",
        desc: "Learn the protocol used to expose tools and data sources to compatible AI applications.",
        href: concept("mcp"),
        duration: "7 min",
        icon: "🔗",
      },
      {
        type: "use-case",
        label: "Software Development Use Cases",
        desc: "Apply AI to code review, debugging, tests, documentation, and system design.",
        href: library,
        duration: "10 min",
        icon: "💻",
      },
      {
        type: "page",
        label: "Compare AI Labs and APIs",
        desc: "Understand provider differences across pricing, context, capabilities, and deployment choices.",
        href: page("ai-labs"),
        duration: "10 min",
        icon: "🏛️",
      },
      {
        type: "page",
        label: "Google AI Tools Ecosystem",
        desc: "Explore AI Studio, the Gemini API, Vertex AI, and related developer tooling.",
        href: page("google-ai-tools"),
        duration: "7 min",
        icon: "🔬",
      },
    ],
  },
  {
    id: "ai-creator",
    title: "AI Creator",
    tagline: "Use AI to produce richer creative work across text, image, audio, and video.",
    emoji: "🎨",
    color: "#F4A6C0",
    level: "intermediate",
    audience: "For designers, artists, and content creators",
    totalDuration: "~45 min",
    steps: [
      {
        type: "concept",
        label: "How AI Generates Images and Video",
        desc: "Understand diffusion, denoising, text conditioning, and the foundations of generative media.",
        href: concept("diffusion-model"),
        duration: "7 min",
        icon: "🖼️",
      },
      {
        type: "use-case",
        label: "Creative AI Use Cases",
        desc: "Practise image briefs, style systems, naming, UI copy, and visual-direction prompts.",
        href: library,
        duration: "10 min",
        icon: "✨",
      },
      {
        type: "concept",
        label: "Prompt Engineering for Creatives",
        desc: "Specify medium, composition, mood, style, constraints, and negative guidance.",
        href: concept("prompt-engineering"),
        duration: "6 min",
        icon: "🎨",
      },
      {
        type: "page",
        label: "The Labs Shaping Creative AI",
        desc: "Map the companies and research groups behind major creative tools and models.",
        href: page("ai-labs"),
        duration: "8 min",
        icon: "🏛️",
      },
      {
        type: "use-case",
        label: "Writing for Creative Campaigns",
        desc: "Apply AI to taglines, product narratives, social campaigns, and brand voice systems.",
        href: library,
        duration: "8 min",
        icon: "📢",
      },
      {
        type: "read",
        label: "Creative AI Milestones",
        desc: "Trace the evolution of image and video generation in the AI history timeline.",
        href: page("ai-history"),
        duration: "6 min",
        icon: "🕰️",
      },
    ],
  },
];
