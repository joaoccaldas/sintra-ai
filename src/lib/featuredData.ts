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
  /** Display date shown to users, e.g. "2 Jun 2026" */
  weekOf: string;
  /** 1–2 sentence overall editorial framing for the week */
  editorial: string;
  items: [FeaturedItem, FeaturedItem, FeaturedItem, FeaturedItem];
}

// ── Update every Monday ────────────────────────────────────────────────────

export const THIS_WEEK: WeeklyFeature = {
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
      why: "Every agent that reads untrusted content is vulnerable — this guide covers the attacks and the defences before you ship.",
      href: "/sintra-ai/guides/",
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
};
