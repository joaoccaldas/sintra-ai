// Indicative model pricing for the token/cost calculator.
//
// Prices are LIST prices in USD per 1,000,000 tokens and are INDICATIVE only —
// providers change them often, and batch/cached/volume tiers differ. The
// calculator UI lets the user override any price inline, so these are just
// sensible starting points. Keep `PRICING_UPDATED` honest when editing.

export const PRICING_UPDATED = "Jun 2026";

export interface ModelPrice {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  /** USD per 1M input tokens */
  input: number;
  /** USD per 1M output tokens */
  output: number;
  /** Context window in tokens, for reference */
  context: number;
  note?: string;
}

export const MODEL_PRICES: ModelPrice[] = [
  { id: "claude-fable-5",   name: "Claude Fable 5",   provider: "Anthropic", providerColor: "#d97706", input: 5,    output: 25,   context: 200_000, note: "Flagship reasoning" },
  { id: "claude-opus-4-8",  name: "Claude Opus 4.8",  provider: "Anthropic", providerColor: "#d97706", input: 15,   output: 75,   context: 200_000 },
  { id: "claude-sonnet-4-6",name: "Claude Sonnet 4.6",provider: "Anthropic", providerColor: "#d97706", input: 3,    output: 15,   context: 200_000, note: "Best price/capability" },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "Anthropic", providerColor: "#d97706", input: 0.8,  output: 4,    context: 200_000, note: "Fast & cheap" },
  { id: "gpt-5",            name: "GPT-5",            provider: "OpenAI",    providerColor: "#10a37f", input: 10,   output: 30,   context: 400_000 },
  { id: "gpt-5-mini",       name: "GPT-5 mini",       provider: "OpenAI",    providerColor: "#10a37f", input: 0.5,  output: 2,    context: 400_000 },
  { id: "gemini-3-pro",     name: "Gemini 3 Pro",     provider: "Google",    providerColor: "#4285f4", input: 2.5,  output: 15,   context: 1_000_000, note: "1M context" },
  { id: "gemini-flash",     name: "Gemini 3 Flash",   provider: "Google",    providerColor: "#4285f4", input: 0.15, output: 0.6,  context: 1_000_000 },
  { id: "deepseek-v3",      name: "DeepSeek V3",      provider: "DeepSeek",  providerColor: "#1a73e8", input: 0.5,  output: 1.5,  context: 128_000, note: "Open weights" },
  { id: "llama-4-70b",      name: "Llama 4 70B",      provider: "Meta",      providerColor: "#0866ff", input: 0.6,  output: 0.6,  context: 128_000, note: "Self-host / Together" },
];

/**
 * Estimate token count from raw text.
 *
 * Uses the widely-cited ~4-characters-per-token heuristic for English, with a
 * word-based floor so very short or whitespace-heavy inputs aren't undercounted.
 * This is an ESTIMATE — true counts depend on the model's tokenizer.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(Math.ceil(chars / 4), Math.ceil(words * 1.33));
}
