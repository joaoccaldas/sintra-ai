/**
 * Weekly editorial picks — update this file every Monday.
 * Items are hand-curated: one news story, one prompt, one guide, one tool/paper.
 * Each "why" line is the editorial voice — plain English, 1 sentence.
 */

export type FeaturedItemType = "news" | "prompt" | "guide" | "tool" | "paper";

export interface FeaturedItem {
  type: FeaturedItemType;
  title: string;
  /** 1-sentence editor's note explaining why this item this week */
  why: string;
  href: string;
  /** Short label shown as a badge (e.g. provider name or domain) */
  badge?: string;
  badgeColor?: string;
}

export interface WeeklyFeature {
  /** Display date shown to users, e.g. "15 Jun 2026" */
  weekOf: string;
  /** 1–2 sentence overall editorial framing for the week */
  editorial: string;
  items: [FeaturedItem, FeaturedItem, FeaturedItem, FeaturedItem];
}

// ── Archive of past weekly digests ────────────────────────────────────────

export const WEEKLY_ARCHIVE: WeeklyFeature[] = [
  {
    weekOf: "15 Jun 2026",
    editorial:
      "Claude Fable 5 landed at 95% on SWE-bench Verified and redrew the frontier — then a researcher cracked its system prompt within days. Meanwhile Apple handed Siri to Gemini, Anthropic locked in 220,000 GPUs at Colossus 1, Salesforce paid $3.6B for an AI agent, and world leaders met in Évian to debate who governs all of it.",
    items: [
      {
        type: "news",
        title: "Claude Fable 5 — 95% SWE-bench, 1M Context, Always-On Thinking",
        why: "Anthropic's new flagship rewrites what 'capable' means for coding agents — 95% SWE-bench Verified and 128K output tokens means multi-file refactors finally work end-to-end.",
        href: "https://www.anthropic.com/news/claude-fable-5-mythos-5",
        badge: "Anthropic",
        badgeColor: "#d97706",
      },
      {
        type: "prompt",
        title: "Board Presentation Builder",
        why: "With enterprise AI partnerships closing at record speed this week, the real bottleneck is communicating AI strategy clearly to boards — this prompt structures it.",
        href: "#library",
        badge: "Writing",
        badgeColor: "#f59e0b",
      },
      {
        type: "tool",
        title: "Kimi K2.7-Code — Free 1T-Parameter Coding Model",
        why: "A 1-trillion-parameter Apache 2.0 coding model that outperforms Claude on SWE-Bench is now free for commercial use — the cost floor for code generation just hit zero.",
        href: "https://huggingface.co/moonshotai",
        badge: "Open Source",
        badgeColor: "#6B5CFF",
      },
      {
        type: "paper",
        title: "Scaling Laws for Neural Language Models (Kaplan et al., 2020)",
        why: "With Anthropic securing 220,000 GPUs at Colossus 1, understanding what that compute actually buys in terms of capability is the most relevant background reading this week.",
        href: "https://arxiv.org/abs/2001.08361",
        badge: "Research",
        badgeColor: "#9F8CFF",
      },
    ],
  },
  {
    weekOf: "2 Jun 2026",
    editorial:
      "Microsoft repositioned Windows as an agent OS at Build, OpenAI launched its enterprise deployment JV, and Brazil's AI law vote is now confirmed for late June. This week: the agentic era becomes infrastructure.",
    items: [
      {
        type: "news",
        title: "Microsoft Build 2026: Windows Is Now an Agent Execution Platform",
        why: "Scout, Windows Agent Framework, and MCP-native execution containers arrived simultaneously — the enterprise agentic stack just became an OS feature.",
        href: "https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/",
        badge: "Microsoft",
        badgeColor: "#0078d4",
      },
      {
        type: "prompt",
        title: "M&A Due Diligence Data Room Analyser",
        why: "Deal teams can now compress a 500-page data room review from 3 days to half a day — the most time-intensive part of any deal.",
        href: "#library",
        badge: "Finance",
        badgeColor: "#10b981",
      },
      {
        type: "guide",
        title: "AI Security: Prompt Injection & Hardening",
        why: "Every agent that reads untrusted content is vulnerable — this guide covers the attacks and the defences before you shift.",
        href: "https://joaoccaldas.github.io/sintra-ai/guides/",
        badge: "Guide",
        badgeColor: "#ef4444",
      },
      {
        type: "paper",
        title: "ReAct: Synergizing Reasoning and Acting in Language Models",
        why: "The Thought→Action→Observation loop that underpins every tool-using agent today — foundational reading before building anything agentic.",
        href: "https://arxiv.org/abs/2210.03629",
        badge: "Research",
        badgeColor: "#9F8CFF",
      },
    ],
  },
];

// ── Update every Monday ────────────────────────────────────────────────────

export const THIS_WEEK: WeeklyFeature = {
  weekOf: "6 Jul 2026",
  editorial:
    "Anthropic made Claude Sonnet 5 the default for every Free and Pro user, and Claude Fable 5 came back online on 1 July after three weeks under export controls. Meanwhile the White House moved toward voluntary frontier-model release standards — the week agentic capability got cheaper and the rules around it got real.",
  items: [
    {
      type: "news",
      title: "Claude Sonnet 5 Becomes the Default for Every Free & Pro User",
      why: "The most agentic Sonnet yet ships as the everyday default at introductory $2/$10 pricing — frontier-adjacent tool use and autonomy without the flagship bill, right when enterprises are reining in agent costs.",
      href: "https://www.anthropic.com/news",
      badge: "Anthropic",
      badgeColor: "#d97706",
    },
    {
      type: "prompt",
      title: "Board Presentation Builder",
      why: "With model choice and AI cost now a board-level topic, the bottleneck is communicating strategy clearly — this prompt structures the narrative, the numbers, and the ask.",
      href: "#library",
      badge: "Writing",
      badgeColor: "#f59e0b",
    },
    {
      type: "tool",
      title: "Claude Fable 5 — Restored After Export-Control Pause",
      why: "The first Mythos-class model returned across Claude.ai, the API, and Claude Code on 1 July — the most capable coding model on the market is available again, with a hardened safety classifier.",
      href: "https://www.anthropic.com/news",
      badge: "Anthropic",
      badgeColor: "#d97706",
    },
    {
      type: "paper",
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      why: "As agentic defaults reach every user, the Thought→Action→Observation loop is the mental model that explains what these systems are actually doing — foundational reading.",
      href: "https://arxiv.org/abs/2210.03629",
      badge: "Research",
      badgeColor: "#9F8CFF",
    },
  ],
};
