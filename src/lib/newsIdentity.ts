import type { NewsItem } from "./newsData";

/**
 * Pure identity rules for combining editorial records with provider signals.
 *
 * A normalized source URL or explicit ID is a deterministic duplicate.
 * Matching titles with different URLs are only REVIEW CANDIDATES. They may be
 * two legitimate articles from different publishers and must not be silently
 * discarded or called an independently verified event.
 */

export type NewsIdentityReason = "duplicate-id" | "duplicate-source-url";

export interface NewsIdentityDecision {
  keptId: string;
  droppedId: string;
  reason: NewsIdentityReason;
}

export interface NewsReviewCandidate {
  firstId: string;
  secondId: string;
  reason: "matching-headline-different-source";
}

export interface NewsComposition {
  items: NewsItem[];
  suppressed: NewsIdentityDecision[];
  reviewCandidates: NewsReviewCandidate[];
  inputCount: number;
}

/** Normalize *tracking* noise only. Preserve meaningful query arguments. */
export function canonicalNewsSourceUrl(raw?: string): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (!host) return null;
    const pathname = url.pathname.replace(/\/+$/, "") || "/";
    const params = [...url.searchParams.entries()]
      .filter(([key]) => !/^utm_/i.test(key) &&
        !["fbclid", "gclid", "mc_cid", "mc_eid"].includes(key.toLowerCase()))
      .sort(([ka, va], [kb, vb]) => ka.localeCompare(kb) || va.localeCompare(vb));
    const query = new URLSearchParams(params).toString();
    return host + pathname + (query ? "?" + query : "");
  } catch {
    return null;
  }
}

/** Candidate matching, NOT a proof that two published reports are the same. */
export function normalizedNewsHeadline(raw: string): string {
  return raw.toLocaleLowerCase("en").normalize("NFKC")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

/** First item wins: caller controls source precedence. Never mutate inputs. */
export function composeNewsItems(sourceItems: readonly NewsItem[]): NewsComposition {
  const items: NewsItem[] = [];
  const suppressed: NewsIdentityDecision[] = [];
  const reviewCandidates: NewsReviewCandidate[] = [];
  const byId = new Map<string, NewsItem>();
  const byUrl = new Map<string, NewsItem>();
  const byHeadline = new Map<string, NewsItem>();

  for (const item of sourceItems) {
    const matchedId = byId.get(item.id);
    if (matchedId) {
      suppressed.push({ keptId: matchedId.id, droppedId: item.id, reason: "duplicate-id" });
      continue;
    }
    const url = canonicalNewsSourceUrl(item.url);
    const matchedUrl = url ? byUrl.get(url) : undefined;
    if (matchedUrl) {
      suppressed.push({ keptId: matchedUrl.id, droppedId: item.id, reason: "duplicate-source-url" });
      continue;
    }
    const headline = normalizedNewsHeadline(item.title);
    const matchedTitle = headline ? byHeadline.get(headline) : undefined;
    if (matchedTitle) {
      reviewCandidates.push({
        firstId: matchedTitle.id,
        secondId: item.id,
        reason: "matching-headline-different-source",
      });
    }

    // Do not enrich a low-trust signal with a previous record's 'checkedAt'.
    items.push(item);
    byId.set(item.id, item);
    if (url) byUrl.set(url, item);
    if (headline && !matchedTitle) byHeadline.set(headline, item);
  }

  return { items, suppressed, reviewCandidates, inputCount: sourceItems.length };
}
