import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Sintra is built to be read by AI agents as well as people (see /agents/ and
// /llms.txt) — these named rules make that explicit for the crawlers/agents
// that check for a specific allow rule rather than relying on the wildcard.
const AI_AGENTS = [
  "GPTBot", "ChatGPT-User", "OAI-SearchBot",
  "ClaudeBot", "Claude-User", "anthropic-ai",
  "Google-Extended", "PerplexityBot", "Perplexity-User",
  "CCBot", "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://joaoccaldas.github.io/sintra-ai/sitemap.xml",
  };
}
