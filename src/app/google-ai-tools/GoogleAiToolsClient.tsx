"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ChevronDown, ExternalLink, Zap, Video, Code, Globe, Bot,
  Sparkles, Glasses, Cpu, Search, Sunrise, Clock,
} from "lucide-react";
import { BASE_PATH } from "@/lib/constants";

// ── Types ──────────────────────────────────────────────────────────────────

interface Step {
  n: number;
  text: string;
  tip?: string;
}

interface UseCase {
  icon: string;
  label: string;
  desc: string;
}

interface Tool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  accent: string;
  Icon: React.ElementType;
  status: "live" | "beta" | "coming-soon";
  statusLabel: string;
  access: string;
  what: string;
  whyNew: string;
  steps: Step[];
  useCases: UseCase[];
  tryThis: string;
  learnUrl: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const TOOLS: Tool[] = [
  {
    id: "gemini-35-flash",
    name: "Gemini 3.5 Flash",
    tagline: "4× faster than the previous Pro model — now the default everywhere",
    category: "Model",
    accent: "#4285f4",
    Icon: Zap,
    status: "live",
    statusLabel: "Generally available",
    access: "Google AI Studio · Gemini API · Gemini app",
    what:
      "Gemini 3.5 Flash is Google's new flagship model launched at I/O 2026. It scores 76.2% on Terminal-Bench 2.1 and 83.6% on MCP Atlas, outperforming last year's Gemini 3.1 Pro on coding and agentic benchmarks — while running 4× faster and costing 40% less ($1.50 / $9 per million tokens).",
    whyNew:
      "It replaced all previous models as the default powering the Gemini app and AI Mode in Search for 900M+ monthly users. For developers it's the de-facto base model for any new agentic build in 2026.",
    steps: [
      { n: 1, text: "Go to aistudio.google.com and sign in with your Google account." },
      { n: 2, text: "Click 'Create new prompt' → in the model dropdown select 'Gemini 3.5 Flash'." },
      { n: 3, text: "Click 'Get API key' in the left sidebar. Copy the key.", tip: "Free tier includes 1,500 requests/day. Pay-as-you-go: $1.50/M input tokens, $9/M output tokens." },
      { n: 4, text: "In your code set model='gemini-3.5-flash' in the Gemini Python/JS SDK, or POST to: https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" },
      { n: 5, text: "For non-developers: visit gemini.google.com — it already uses 3.5 Flash by default. No setup needed.", tip: "AI Ultra subscribers ($100/month) also unlock Gemini Omni video generation." },
    ],
    useCases: [
      { icon: "⌨", label: "Code review", desc: "Fastest model for iterative code fixes and PR summaries." },
      { icon: "🤖", label: "Agentic loops", desc: "Low latency makes it ideal for multi-step agent chains." },
      { icon: "📊", label: "Data extraction", desc: "Structured JSON outputs from documents and spreadsheets." },
      { icon: "✍", label: "Long-form writing", desc: "2M-token context handles full books or entire code repos." },
    ],
    tryThis: "Paste a GitHub PR diff and ask: 'List all potential bugs, categorised by severity. Return JSON.'",
    learnUrl: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    id: "gemini-omni",
    name: "Gemini Omni",
    tagline: "Native video output with multi-turn editing — describe → edit → done",
    category: "Video AI",
    accent: "#F08CA8",
    Icon: Video,
    status: "live",
    statusLabel: "AI Ultra subscribers",
    access: "gemini.google.com (Ultra plan) · YouTube Create · YouTube Shorts",
    what:
      "Gemini Omni is Google's 'world model' family, accepting text, images, audio, and video as inputs and generating native video output. It preserves character consistency and physics across multi-turn edits — you can say 'make her smile' in a follow-up and the rest of the scene stays intact.",
    whyNew:
      "This is the first commercially available video model with multi-turn conversational editing. Previous tools (Sora, Veo) produced a video and stopped. Omni treats it as a dialogue — each refinement prompt builds on what came before.",
    steps: [
      { n: 1, text: "Subscribe to Google AI Ultra at one.google.com/about/ai-ultra ($100/month). Omni Flash is included." },
      { n: 2, text: "Open gemini.google.com. In the bottom toolbar, click the video camera icon to enter Omni mode." },
      { n: 3, text: "Type a scene description: 'A golden retriever runs along a beach at sunset, slow motion, cinematic.' Press Enter." },
      { n: 4, text: "When the video renders (15–45 sec), type a refinement: 'Add waves crashing in the background.' Omni preserves the dog and lighting.", tip: "Max duration: 8 seconds per generation. Chain multiple generations for longer sequences." },
      { n: 5, text: "Download via the ⬇ button or share directly to YouTube Shorts.", tip: "Free Omni access is available via YouTube Shorts and YouTube Create (limited to 5 generations/day)." },
    ],
    useCases: [
      { icon: "📱", label: "Social media", desc: "Generate Reels/Shorts for product launches in seconds." },
      { icon: "🎓", label: "Education", desc: "Animate diagrams or historical scenes for online courses." },
      { icon: "🏠", label: "Real estate", desc: "Visualise room renovations or property walkthroughs." },
      { icon: "🎨", label: "Prototyping", desc: "Storyboard ads, trailers, or explainers before production." },
    ],
    tryThis: "Describe a product demo video in plain English. Use follow-up messages to adjust lighting, pace, and background until it matches your brief.",
    learnUrl: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/",
  },
  {
    id: "antigravity",
    name: "Antigravity 2.0",
    tagline: "CLI + desktop app for AI agents — install, describe, run",
    category: "Developer",
    accent: "#8FE3D2",
    Icon: Code,
    status: "live",
    statusLabel: "Public beta",
    access: "npm / pip CLI · Desktop app (Mac/Windows) · Gemini API",
    what:
      "Antigravity 2.0 is Google's agent-first development platform. It combines a desktop application, a CLI, and an SDK — all sharing authentication and context. The Antigravity CLI provisions isolated remote Linux sandboxes with code execution and web search in a single API call.",
    whyNew:
      "Previously, building an AI agent with real tools required separate infrastructure for each capability. Antigravity collapses the entire setup into one POST to the Managed Agents API — sandbox, shell, browser, and file system are included.",
    steps: [
      { n: 1, text: "Install: npm install -g @google/antigravity  (or pip install google-antigravity for Python)." },
      { n: 2, text: "Authenticate: antigravity auth login — opens a browser window. Sign in with the Google account that has a Gemini API key." },
      { n: 3, text: "Initialise: antigravity init my-agent — creates agent.md with default instructions, tool declarations, and memory config." },
      { n: 4, text: "Edit agent.md: describe the agent's purpose and which tools it can use (web_search, bash, python, file_manager).", tip: "Tools are declared in a YAML frontmatter block at the top of the Markdown file." },
      { n: 5, text: "Run: antigravity run my-agent 'Research the top 5 AI news stories today and write a summary to output.md'" },
      { n: 6, text: "Desktop app: download from developers.google.com/antigravity — GUI version with visual step-by-step logging. Shares auth with the CLI.", tip: "Log in once — the desktop app and CLI both work with the same credentials." },
    ],
    useCases: [
      { icon: "🔍", label: "Research agents", desc: "Web research → structured report, fully automated." },
      { icon: "🛠", label: "Code agents", desc: "Fix bugs, run tests, commit — all in an isolated sandbox." },
      { icon: "📄", label: "Document processing", desc: "Ingest PDFs, extract data, output structured JSON." },
      { icon: "🔄", label: "Pipelines", desc: "Chain agents: scrape → analyse → email report." },
    ],
    tryThis: "antigravity run my-agent 'Go to Hacker News, find the top 10 posts today, and save a ranked summary to hn-summary.md'",
    learnUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/",
  },
  {
    id: "gemini-spark",
    name: "Gemini Spark",
    tagline: "24/7 personal agent — monitors your inbox while you sleep",
    category: "Personal Agent",
    accent: "#9F8CFF",
    Icon: Bot,
    status: "beta",
    statusLabel: "Beta · US AI Ultra",
    access: "gemini.google.com → Spark tab · Gemini Android / iOS app",
    what:
      "Gemini Spark is a 24/7 personal AI agent running on dedicated cloud VMs. It reads Gmail, Calendar, Drive, and connected apps to take actions on your behalf — scheduling, drafting, researching, summarising — while checking before major decisions.",
    whyNew:
      "Unlike per-prompt assistant features, Spark runs continuously in the background and proactively surfaces insights (e.g. 'you have three conflicting meetings next week') without you needing to ask first.",
    steps: [
      { n: 1, text: "Requires Google AI Ultra ($100/month). Subscribe at one.google.com/about/ai-ultra." },
      { n: 2, text: "Open gemini.google.com and look for the 'Spark' tab in the left sidebar (rolling out from May 26, US-first)." },
      { n: 3, text: "Click 'Set up Spark' and grant permissions: Gmail read/send, Calendar read/write, Drive read.", tip: "Each permission is independent — enable only the services you want Spark to access." },
      { n: 4, text: "In the Spark config panel, describe your preferences: 'I prefer morning meetings, never schedule calls on Fridays, always draft emails formally.'" },
      { n: 5, text: "Spark begins monitoring. You'll receive a daily summary in the Gemini app. Tap any item to approve, edit, or reject the proposed action." },
      { n: 6, text: "On mobile: open the Gemini app → tap the Spark icon → see the live action log and pending approvals.", tip: "Every action Spark takes is logged with a timestamp. You can audit and undo any action within 24 hours." },
    ],
    useCases: [
      { icon: "📅", label: "Calendar management", desc: "Auto-schedule focus blocks, reschedule conflicts, decline low-priority invites." },
      { icon: "📧", label: "Email triage", desc: "Draft replies, flag urgent items, unsubscribe from newsletters." },
      { icon: "🔔", label: "Proactive alerts", desc: "'Your flight check-in opens in 24 hours — want me to do it?'" },
      { icon: "📝", label: "Meeting prep", desc: "Auto-generate briefing docs from Drive before every call." },
    ],
    tryThis: "After setup, send Spark: 'Review my emails from the last 48 hours and draft replies for anything that needs a response. Show me the drafts before sending.'",
    learnUrl: "https://techcrunch.com/2026/05/19/google-introduces-gemini-spark-a-24-7-agentic-assistant-with-gmail-integration/",
  },
  {
    id: "ai-mode-search",
    name: "AI Mode in Google Search",
    tagline: "1 billion users — redesigned for research sessions, not single queries",
    category: "Search",
    accent: "#E8C089",
    Icon: Search,
    status: "live",
    statusLabel: "Live globally",
    access: "google.com → AI Mode tab · Chrome address bar",
    what:
      "Google AI Mode is a conversational search experience powered by Gemini 3.5 Flash, now used by over 1 billion monthly users. It returns synthesised answers with citations and supports multi-turn follow-ups within the same session. Over 16% of AI Mode searches are now multimodal — voice, image, or video input.",
    whyNew:
      "The biggest redesign of Google Search in 25 years. AI Mode handles full research sessions rather than single queries, and the search box now natively accepts images and voice. This is the default for complex queries in Chrome.",
    steps: [
      { n: 1, text: "Go to google.com. Click the 'AI Mode' tab in the search bar (next to Images, Maps, etc.)." },
      { n: 2, text: "Type a complex question: 'Compare the cost of solar panel installation in Portugal vs Spain, including current tax incentives.'" },
      { n: 3, text: "Review the synthesised answer. Scroll to see inline citations — each claim links to its source." },
      { n: 4, text: "Ask a follow-up: 'Which government grants are currently open in Lisbon?' — AI Mode carries context from the previous answer.", tip: "Sessions last 30 minutes. Start a new search to clear the context." },
      { n: 5, text: "For image input: click the camera icon in the AI Mode search bar. Upload an image, then ask a question about it." },
      { n: 6, text: "On Chrome: type your question directly in the address bar. AI Mode is now the default for complex queries.", tip: "To see classic web results, click 'Web' in the tab bar after any AI Mode response." },
    ],
    useCases: [
      { icon: "🔬", label: "Research", desc: "Multi-source synthesis with citations for academic or market research." },
      { icon: "🛒", label: "Shopping", desc: "Compare products across retailers with real-time pricing." },
      { icon: "🗺", label: "Local discovery", desc: "'Best coffee shops near me open before 7am' — with voice." },
      { icon: "📚", label: "Learning", desc: "Ask follow-up questions to go progressively deeper on any topic." },
    ],
    tryThis: "Open AI Mode and ask a question that would normally require opening 5 tabs. Count the citations, then check 2–3 for accuracy.",
    learnUrl: "https://blog.google/products-and-platforms/products/search/ai-mode-us-insights/",
  },
  {
    id: "managed-agents-api",
    name: "Managed Agents API",
    tagline: "Full Linux sandbox for your agent — provisioned in one API call",
    category: "Developer",
    accent: "#8FE3D2",
    Icon: Cpu,
    status: "live",
    statusLabel: "Preview · Gemini API",
    access: "Google AI Studio · Gemini API Interactions endpoint",
    what:
      "The Managed Agents API provisions an isolated Linux environment with Bash, Python, Node.js, web search, and file management via a single POST to the Gemini API. The agent runs Gemini 3.5 Flash and executes tasks autonomously in the sandbox. Instructions and tools are defined in plain Markdown.",
    whyNew:
      "Building a capable AI agent previously required stitching together separate services — code execution, browser automation, a file store, and a model API. Managed Agents collapses all of this into one call, deeply integrated with Google Cloud infrastructure.",
    steps: [
      { n: 1, text: "Get a Gemini API key from aistudio.google.com → API Keys." },
      { n: 2, text: "Install: pip install google-generativeai  or  npm install @google/generative-ai" },
      { n: 3, text: "POST to: https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:interact", tip: "Include your API key in the x-goog-api-key header." },
      { n: 4, text: "In the request body, set tools: ['code_execution', 'google_search', 'file_manager'] and your agent's system instructions." },
      { n: 5, text: "The API returns step-by-step execution logs plus the final result. Each log entry shows what the agent ran and what it got back.", tip: "Add timeout_seconds (max 300) to bound long-running tasks." },
      { n: 6, text: "No-code option: open Google AI Studio → Agent Builder tab → define your agent in the form → run tasks in the browser." },
    ],
    useCases: [
      { icon: "🤖", label: "Autonomous coding", desc: "Give the agent a bug report — it reads code, writes a fix, runs tests." },
      { icon: "📊", label: "Data pipelines", desc: "Fetch a URL, parse data, run analysis, return a chart." },
      { icon: "📨", label: "Report automation", desc: "Read emails → produce a digest → save to Drive." },
      { icon: "🌐", label: "Web scraping", desc: "Navigate sites, extract structured data, export to CSV." },
    ],
    tryThis: "POST to the Interactions API: 'Go to news.ycombinator.com, find the top 5 posts about AI today, return a JSON array with title, score, and URL.'",
    learnUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api/",
  },
  {
    id: "daily-brief",
    name: "Gemini Daily Brief + Information Agents",
    tagline: "Wakes up before you — morning digest from your digital life",
    category: "Productivity",
    accent: "#E8C089",
    Icon: Sunrise,
    status: "live",
    statusLabel: "AI Pro & Ultra",
    access: "gemini.google.com · Gemini Android / iOS app",
    what:
      "Daily Brief is an out-of-box agent that builds a personalised morning digest from Gmail, Calendar, and Tasks — with prioritised next actions for your day. Information Agents run 24/7 monitoring topics, news, shopping trends, and finance, pushing synthesised updates when something significant happens.",
    whyNew:
      "This shifts Gemini from reactive (answer when asked) to proactive (surface what matters without being asked). Information Agents are the first Google product that subscribes to topics and pushes you an update when a threshold is crossed.",
    steps: [
      { n: 1, text: "Open gemini.google.com. Requires Google AI Pro ($20/month) or Ultra ($100/month)." },
      { n: 2, text: "In the left sidebar click 'Agents' → 'Daily Brief' → 'Enable'." },
      { n: 3, text: "Choose your briefing time (default 7:00 AM local) and enable data sources: Gmail, Calendar, Tasks, Google News." },
      { n: 4, text: "The next morning, the brief appears at the top of the Gemini app: urgent emails, today's meetings with prep notes, pending tasks, one focus suggestion.", tip: "Say 'refresh my brief' at any time to regenerate it on-demand." },
      { n: 5, text: "For Information Agents: Agents → Information Agents → '+ New Agent'." },
      { n: 6, text: "Describe what to monitor: 'Track announcements from Anthropic, OpenAI, and Google DeepMind. Alert me when a new model is released.' Set frequency: real-time, daily, or weekly.", tip: "Agents pull from blogs, X/Twitter, Reddit, LinkedIn, and news. You can also add specific RSS feeds." },
    ],
    useCases: [
      { icon: "🌅", label: "Morning routine", desc: "Replace 30 min of email scanning with a 2-minute brief." },
      { icon: "📈", label: "Market monitoring", desc: "Alert when a competitor announces something or a stock moves ±5%." },
      { icon: "🔔", label: "Topic tracking", desc: "Stay current on a regulation, technology, or research area." },
      { icon: "🗓", label: "Meeting prep", desc: "Brief on each attendee and agenda item before you join a call." },
    ],
    tryThis: "Enable Daily Brief, then create one Information Agent: 'Monitor TechCrunch and The Verge for AI product launches. Send me a summary each weekday at 9am.'",
    learnUrl: "https://www.androidauthority.com/google-gemini-neural-expressive-gemini-spark-daily-brief-omni-updates-3668384/",
  },
  {
    id: "android-xr-glasses",
    name: "Android XR Audio Glasses",
    tagline: "Gemini in your eyeline — Warby Parker & Gentle Monster, fall 2026",
    category: "Hardware",
    accent: "#F2C46D",
    Icon: Glasses,
    status: "coming-soon",
    statusLabel: "Pre-order · fall 2026",
    access: "warbyparker.com · gentlemonster.com (available July 2026) · Android XR app",
    what:
      "Android XR-powered audio glasses from Warby Parker and Gentle Monster. A 'Hey Google' trigger or a tap on the frame gives instant Gemini access — contextual help, live translation, object recognition, navigation — through speakers in the frame. No visible display. Project Aura (wired XR display glasses with XREAL) is a separate developer-focused product.",
    whyNew:
      "Unlike previous smart glasses that required looking at your phone to see responses, these deliver everything through the frame speakers — Gemini speaks answers into your ear. Live translation works bi-directionally: you hear a real-time translation of what the other person is saying.",
    steps: [
      { n: 1, text: "Join the waitlist at warbyparker.com or gentlemonster.com — links go live in July 2026.", tip: "Gentle Monster = fashion-forward; Warby Parker = classic/minimal. Both run identical Android XR software." },
      { n: 2, text: "When shipping (fall 2026): pair the glasses to your Android phone via Bluetooth. Settings → Pair new device → select your glasses model." },
      { n: 3, text: "Download the Android XR companion app from the Play Store (auto-prompted during pairing)." },
      { n: 4, text: "Say 'Hey Google' or tap the right temple to wake Gemini. For translation: 'Hey Google, translate Spanish for me' — glasses switch to real-time translation mode." },
      { n: 5, text: "For object recognition: look at something, say 'Hey Google, what is this?' — Gemini describes what the built-in camera sees.", tip: "Privacy LED is always visible when the camera is active. Camera is opt-in and off by default." },
      { n: 6, text: "Navigation: 'Hey Google, navigate to the nearest pharmacy' — turn-by-turn plays through the frame speakers." },
    ],
    useCases: [
      { icon: "🌍", label: "Travel", desc: "Real-time translation in 40+ language pairs, hands-free." },
      { icon: "🧭", label: "Navigation", desc: "Hands-free turn-by-turn for walking, cycling, or driving." },
      { icon: "📸", label: "Recall", desc: "'What was the name of the restaurant I walked past?' — Gemini checks your timeline." },
      { icon: "📞", label: "Calls", desc: "Answer calls, get real-time transcripts, have Gemini draft responses." },
    ],
    tryThis: "When available: try the live translation feature at a restaurant with a menu in a foreign language. Point the glasses at the menu and ask 'What does this say?'",
    learnUrl: "https://blog.google/products-and-platforms/platforms/android/android-xr-io-2026/",
  },
  {
    id: "webmcp",
    name: "WebMCP (Chrome 149)",
    tagline: "An open web standard so AI agents control sites via typed APIs, not screenshots",
    category: "Developer",
    accent: "#8FE3D2",
    Icon: Globe,
    status: "beta",
    statusLabel: "Origin trial · Chrome 149",
    access: "chrome://flags → WebMCP · Origin trial registration for site owners",
    what:
      "WebMCP is a proposed open web standard in Chrome 149 origin trial. Websites expose structured JavaScript functions and annotated HTML elements as tools AI agents can call directly. Agents complete tasks 8–12× faster on WebMCP-enabled sites versus those where they rely on vision-based screenshot control.",
    whyNew:
      "Current browser AI agents (like Claude's computer use) take screenshots and click visually — slow and error-prone. WebMCP gives agents a typed API: 'here is a book() function that accepts date, time, and guests.' The agent calls the function directly. No screenshot needed.",
    steps: [
      { n: 1, text: "As a user: open Chrome 149+. Go to chrome://flags, search 'WebMCP', enable it, relaunch.", tip: "Visit developer.chrome.com/origintrials to see enrolled sites you can test on." },
      { n: 2, text: "As a site owner: go to developer.chrome.com/origintrials, register your origin, get a trial token." },
      { n: 3, text: "Add the token to your site: <meta name='origin-trial' content='YOUR_TOKEN'>" },
      { n: 4, text: "Register tools in JavaScript: navigator.mcp.registerTool('book_table', { description, parameters }, bookTableFn)" },
      { n: 5, text: "Or annotate existing HTML without JS: add webmcp-tool and webmcp-field attributes to forms — no code changes needed.", tip: "HTML annotation is the zero-effort path — just add attributes to your existing form elements." },
      { n: 6, text: "Test with DevTools: DevTools → More tools → WebMCP Inspector. Lists all registered tools and lets you invoke them manually." },
    ],
    useCases: [
      { icon: "🏨", label: "Booking agents", desc: "Agent books flights, hotels, tables without filling visual forms." },
      { icon: "🛒", label: "Shopping agents", desc: "Agent adds to cart, applies promo codes, checks out." },
      { icon: "📝", label: "Form automation", desc: "Agent completes long forms (tax returns, visa applications) via structured calls." },
      { icon: "🔌", label: "SaaS integrations", desc: "Expose your app's actions to any AI agent without building a REST API." },
    ],
    tryThis: "Enable WebMCP in Chrome 149 flags. Visit a WebMCP-enrolled demo site on developer.chrome.com. Ask a browser AI agent to complete a task and compare speed to a non-enrolled site.",
    learnUrl: "https://developer.chrome.com/blog/chrome-at-io26",
  },
  {
    id: "google-ai-ultra",
    name: "Google AI Ultra",
    tagline: "$100/month — the all-access pass for every I/O 2026 feature",
    category: "Subscription",
    accent: "#9F8CFF",
    Icon: Sparkles,
    status: "live",
    statusLabel: "Live · $100/month",
    access: "one.google.com/about/ai-ultra",
    what:
      "Google AI Ultra is Google's top-tier subscription giving access to Gemini Omni, Gemini Spark, 10× higher API rate limits, NotebookLM Plus, Google Vids, and Flow — essentially all the headline features announced at I/O 2026 that are not available on the free or Pro tiers.",
    whyNew:
      "I/O 2026 redrew the access tiers more sharply than any previous year. Most headline features (Spark, Omni, advanced AI Mode capabilities) are Ultra-only. The gap between free and Ultra is now the widest it has been.",
    steps: [
      { n: 1, text: "Go to one.google.com/about/ai-ultra. Click 'Get AI Ultra'." },
      { n: 2, text: "Choose individual ($100/month) or family plan (up to 5 people, $150/month, coming Q3 2026). Enter payment details." },
      { n: 3, text: "After subscribing, revisit gemini.google.com — the Spark tab, Omni video mode, and extended context windows unlock immediately." },
      { n: 4, text: "In the Gemini app settings, tap 'AI Ultra features' to see a checklist of everything now enabled for your account.", tip: "Usage limits reset monthly. Ultra gives 10× the API quota of the Pro plan." },
      { n: 5, text: "For developers: your API key now includes gemini-3.5-flash-ultra (2M token context) and Managed Agents API at higher concurrency." },
    ],
    useCases: [
      { icon: "💼", label: "Power users", desc: "Professionals using Gemini daily for research, writing, and coding." },
      { icon: "🧑‍💻", label: "Developers", desc: "Higher API quotas and early access to new model releases." },
      { icon: "🎨", label: "Creators", desc: "Omni video generation for content pipelines." },
      { icon: "🏢", label: "Small teams", desc: "Family plan splits cost across 5 users at $30/person." },
    ],
    tryThis: "Sign up for a free trial month. Enable Spark and Daily Brief in the first 10 minutes — these two features alone will reclaim at least an hour per week.",
    learnUrl: "https://one.google.com/about/ai-ultra",
  },
];

// ── Status badge styles ─────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  live:          "border-green-500/40 text-green-400 bg-green-500/10",
  beta:          "border-amber-500/40 text-amber-400 bg-amber-500/10",
  "coming-soon": "border-fg-4/30 text-fg-3 bg-white/[0.03]",
};

// ── Accordion card ──────────────────────────────────────────────────────────

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = tool.Icon;

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: 0.06 * (index % 5), ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-white/[0.07] overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-start gap-4 p-5 md:p-6 hover:bg-white/[0.025] transition-colors"
      >
        <span
          className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 mt-0.5"
          style={{ background: `${tool.accent}18`, border: `1px solid ${tool.accent}28`, color: tool.accent }}
        >
          <Icon size={18} />
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-fg-4">
              {tool.category}
            </span>
            <span className={`inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-full border ${STATUS_STYLES[tool.status]}`}>
              {tool.status === "live" && <span className="w-1 h-1 rounded-full bg-green-400" />}
              {tool.statusLabel}
            </span>
          </div>
          <h2 className="font-sans font-semibold text-[17px] text-fg-1 leading-tight">
            {tool.name}
          </h2>
          <p className="font-mono text-[11px] text-fg-3 mt-1 leading-relaxed">
            {tool.tagline}
          </p>
          <p className="font-mono text-[10px] text-fg-4 mt-2">
            <span className="text-fg-5">Access: </span>{tool.access}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 text-fg-4 mt-2 transition-transform duration-250 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 border-t border-white/[0.06] pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Left: what + why + steps */}
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-2">What it is</p>
                  <p className="font-sans text-[13.5px] text-fg-2 leading-[1.65]">{tool.what}</p>
                </div>

                <div
                  className="rounded-lg p-4 border"
                  style={{ background: `${tool.accent}0A`, borderColor: `${tool.accent}22` }}
                >
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase mb-2" style={{ color: tool.accent }}>
                    What changed at I/O 2026
                  </p>
                  <p className="font-sans text-[13px] text-fg-2 leading-[1.6]">{tool.whyNew}</p>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-3">
                    Step-by-step: how to use it
                  </p>
                  <ol className="space-y-3">
                    {tool.steps.map(step => (
                      <li key={step.n} className="flex gap-3">
                        <span
                          className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 font-mono text-[10px] font-bold mt-0.5"
                          style={{ background: `${tool.accent}18`, color: tool.accent }}
                        >
                          {step.n}
                        </span>
                        <div className="flex-1">
                          <p className="font-sans text-[13px] text-fg-2 leading-[1.55]">{step.text}</p>
                          {step.tip && (
                            <p className="font-mono text-[11px] text-fg-4 mt-1 pl-3 border-l border-fg-5 leading-relaxed">
                              {step.tip}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Right: when to use + try this */}
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-3">
                    When and where to use it
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tool.useCases.map(uc => (
                      <div key={uc.label} className="rounded-lg p-3 border border-white/[0.06] bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[15px]">{uc.icon}</span>
                          <span className="font-sans font-medium text-[12px] text-fg-1">{uc.label}</span>
                        </div>
                        <p className="font-sans text-[12px] text-fg-3 leading-[1.5]">{uc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-violet/[0.07] border border-violet/[0.18]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock size={11} className="text-violet-bright" />
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-violet-bright">
                      Try this now
                    </span>
                  </div>
                  <p className="font-sans text-[13px] text-fg-2 leading-[1.6] italic">
                    &ldquo;{tool.tryThis}&rdquo;
                  </p>
                </div>

                <a
                  href={tool.learnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-fg-3 hover:text-violet-bright transition-colors"
                >
                  <ExternalLink size={11} />
                  Official docs / announcement
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function GoogleAiToolsPage() {
  const liveCount = TOOLS.filter(t => t.status === "live").length;
  const betaCount = TOOLS.filter(t => t.status === "beta").length;
  const soonCount = TOOLS.filter(t => t.status === "coming-soon").length;

  return (
    <div className="min-h-screen bg-abyss text-fg-1" style={{ fontFamily: "var(--font-sans)" }}>

      {/* Ambient blobs */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #4285f4, transparent 70%)" }} />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #F08CA8, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-4 md:px-8">

        {/* Nav */}
        <div className="pt-10 pb-6">
          <a
            href={`${BASE_PATH}/`}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-140" />
            Back to Sintra
          </a>
        </div>

        {/* Hero */}
        <motion.header
          className="pt-4 pb-12 border-b border-white/[0.07]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4285f4]/30 bg-[#4285f4]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#7fb3ff]">
              Google I/O 2026 · May 19–20
            </span>
          </div>

          <h1 className="font-serif font-light text-[clamp(36px,5.5vw,72px)] leading-[1.05] tracking-[-0.025em] text-fg-1 mb-5">
            Every new Google AI tool{" "}
            <em className="italic" style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #4285f4 120%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              explained.
            </em>
          </h1>
          <p className="font-sans text-[16px] text-fg-2 max-w-2xl leading-[1.6] mb-8">
            Everything Google launched at I/O 2026 — with plain-English explanations,
            step-by-step access guides, and concrete examples of when to use each tool.
            Expand any card to see the full guide.
          </p>

          <div className="flex flex-wrap gap-5">
            {[
              { label: "Tools covered", value: String(TOOLS.length), color: "#4285f4" },
              { label: "Live now",      value: String(liveCount),    color: "#4ade80" },
              { label: "In beta",       value: String(betaCount),    color: "#fbbf24" },
              { label: "Coming soon",   value: String(soonCount),    color: "#9ca3af" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 font-mono text-[12px]">
                <span className="font-bold text-[18px]" style={{ color: s.color }}>{s.value}</span>
                <span className="text-fg-4">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.header>

        {/* Guide note */}
        <div className="my-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-2">How to use this guide</p>
          <p className="font-sans text-[13px] text-fg-3 leading-[1.6]">
            Click any card to expand it. Each card includes: what the tool does, what changed at I/O 2026,
            a numbered step-by-step to get started, 4 real-world use cases, and one specific prompt
            to try in the next 5 minutes.
          </p>
        </div>

        {/* Tool cards */}
        <div className="space-y-3 mb-20">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>

        {/* Footer */}
        <footer className="pb-20 border-t border-white/[0.06] pt-10 text-center">
          <p className="font-sans text-[13px] text-fg-4 max-w-md mx-auto leading-[1.6] mb-6">
            Google&apos;s AI tooling evolves weekly. This guide reflects the state at I/O 2026 (May 19–20).
            All access levels and pricing are as announced — check each tool&apos;s official page for updates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`${BASE_PATH}/`} className="btn btn-ghost">
              ← Back to Sintra
            </a>
            <a
              href="https://blog.google/innovation-and-ai/sundar-pichai-io-2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-fg-3 hover:text-violet-bright transition-colors"
            >
              <ExternalLink size={11} />
              Google I/O 2026 keynote
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
