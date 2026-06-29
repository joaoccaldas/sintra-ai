/**
 * Free, no-login AI tools a visitor can use to run a prompt directly — no
 * account, no API key. Used by the "Try free" control on prompt cards.
 *
 * Design: we ALWAYS copy the (filled) prompt to the clipboard before opening
 * the tool, so even tools that can't prefill from a URL are one paste away.
 * `prefills` only controls the helper text shown to the user.
 *
 * Side-effect-free (no top-level data computation) — safe to import anywhere
 * without pulling extra bundles, per the constants/topicHubs split convention.
 */
export interface FreeAiRunner {
  id: string;
  /** Short display name. */
  name: string;
  /** Builds the URL to open, prefilled with the prompt where supported. */
  url: (prompt: string) => string;
  /** Whether the URL prefills the prompt (vs the user pasting from clipboard). */
  prefills: boolean;
  /** One-line descriptor shown in the menu. */
  blurb: string;
}

export const FREE_AI_RUNNERS: FreeAiRunner[] = [
  {
    id: "perplexity",
    name: "Perplexity",
    url: (p) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
    prefills: true,
    blurb: "Web-grounded answers · opens prefilled",
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo AI",
    url: (p) => `https://duckduckgo.com/?q=${encodeURIComponent(p)}&ia=chat`,
    prefills: true,
    blurb: "Anonymous AI chat (GPT, Llama, Mistral)",
  },
  {
    id: "lmarena",
    name: "LMArena",
    url: () => "https://lmarena.ai/",
    prefills: false,
    blurb: "Chat with frontier models free · paste the prompt",
  },
  {
    id: "perchance",
    name: "Perchance AI",
    url: () => "https://perchance.org/ai-chat",
    prefills: false,
    blurb: "No-login AI chat · paste the prompt",
  },
];

/** Truncate guard: most browsers handle long query strings, but cap prefill
 *  URLs so we never produce an absurd link. The clipboard always has the full
 *  prompt, so truncation here only affects the prefill convenience. */
export const PREFILL_MAX_CHARS = 6000;

export function runnerUrl(runner: FreeAiRunner, prompt: string): string {
  const safe = prompt.length > PREFILL_MAX_CHARS ? prompt.slice(0, PREFILL_MAX_CHARS) : prompt;
  return runner.url(safe);
}
