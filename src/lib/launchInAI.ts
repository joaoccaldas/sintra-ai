const PROVIDERS: Array<{ match: string; url: (p: string) => string }> = [
  { match: "Claude",      url: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}` },
  { match: "GPT",         url: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { match: "ChatGPT",     url: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { match: "Gemini",      url: (p) => `https://gemini.google.com/app?q=${encodeURIComponent(p)}` },
  { match: "Perplexity",  url: (p) => `https://www.perplexity.ai/?q=${encodeURIComponent(p)}` },
  { match: "Grok",        url: (p) => `https://grok.com/?q=${encodeURIComponent(p)}` },
  { match: "Qwen",        url: (p) => `https://chat.qwen.ai/?q=${encodeURIComponent(p)}` },
];

/** Returns the best deep-link URL to open a prompt in the recommended AI. Falls back to Claude. */
export function getLaunchUrl(bestLlm: string, prompt: string): string {
  for (const { match, url } of PROVIDERS) {
    if (bestLlm.toLowerCase().includes(match.toLowerCase())) return url(prompt);
  }
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}

/** Returns the short provider name shown on the button label. */
export function getLaunchLabel(bestLlm: string): string {
  if (bestLlm.includes("Claude"))     return "Claude";
  if (bestLlm.includes("GPT"))        return "ChatGPT";
  if (bestLlm.includes("Gemini"))     return "Gemini";
  if (bestLlm.includes("Perplexity")) return "Perplexity";
  if (bestLlm.includes("Grok"))       return "Grok";
  if (bestLlm.includes("Qwen"))       return "Qwen";
  return "AI";
}
