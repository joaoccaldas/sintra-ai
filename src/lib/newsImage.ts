import type { NewsItem } from "./newsData";

/**
 * Provider logo for a news item. A NewsItem can set `image` to override;
 * otherwise we derive a favicon-based logo from the provider's official domain
 * (or, as a fallback, the source article's domain). Side-effect-free.
 *
 * Uses Google's public favicon service — resolved client-side by the visitor's
 * browser, so no build-time fetching and nothing to host.
 */
const PROVIDER_DOMAINS: Record<string, string> = {
  OpenAI: "openai.com",
  Anthropic: "anthropic.com",
  Google: "google.com",
  "Google DeepMind": "deepmind.google",
  "Google Cloud": "cloud.google.com",
  Meta: "meta.com",
  Microsoft: "microsoft.com",
  "Mistral AI": "mistral.ai",
  xAI: "x.ai",
  Nvidia: "nvidia.com",
  NVIDIA: "nvidia.com",
  "Samsung Electronics": "samsung.com",
  Samsung: "samsung.com",
  Amazon: "amazon.com",
  AWS: "aws.amazon.com",
  Apple: "apple.com",
  DeepSeek: "deepseek.com",
  Perplexity: "perplexity.ai",
  "Hugging Face": "huggingface.co",
  Cohere: "cohere.com",
  Databricks: "databricks.com",
  Snowflake: "snowflake.com",
  Salesforce: "salesforce.com",
  ServiceNow: "servicenow.com",
  IBM: "ibm.com",
  Oracle: "oracle.com",
  Broadcom: "broadcom.com",
  Qualcomm: "qualcomm.com",
  Baseten: "baseten.co",
  Sierra: "sierra.ai",
  "Cognition AI": "cognition.ai",
  Cognition: "cognition.ai",
  Alibaba: "alibaba.com",
  "Z.ai": "z.ai",
  Zhipu: "z.ai",
  Moonshot: "moonshot.cn",
  Wayve: "wayve.ai",
  Stellantis: "stellantis.com",
  Uber: "uber.com",
  "Prem AI": "premai.io",
  CoreWeave: "coreweave.com",
  Ericsson: "ericsson.com",
  Telia: "telia.com",
  Micron: "micron.com",
  "European Commission": "ec.europa.eu",
  Gallup: "gallup.com",
  Figure: "figure.ai",
  Suno: "suno.com",
  Ramp: "ramp.com",
  Supabase: "supabase.com",
};

function hostname(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/** Best-guess domain for a news item's provider (for logos / attribution). */
export function providerDomain(item: NewsItem): string | undefined {
  return PROVIDER_DOMAINS[item.provider] ?? hostname(item.url);
}

/** Logo URL for a news item, or undefined if we can't derive a domain. */
export function newsLogo(item: NewsItem): string | undefined {
  if (item.image) return item.image;
  const domain = providerDomain(item);
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : undefined;
}
