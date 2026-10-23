import { createHash } from "node:crypto";

/**
 * Stable identifiers for build-time RSS/Atom/HN signals.
 * A full canonical publisher URL, not the hostname or array index, defines
 * one source item. Similar stories on different URLs require editorial review.
 */
export function canonicalSignalUrl(raw) {
  if (typeof raw !== "string") return null;
  try {
    const url = new URL(raw);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (!host) return null;
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const params = [...url.searchParams.entries()]
      .filter(([key]) => !/^utm_/i.test(key) &&
        !["fbclid", "gclid", "mc_cid", "mc_eid"].includes(key.toLowerCase()))
      .sort(([ak, av], [bk, bv]) => ak.localeCompare(bk) || av.localeCompare(bv));
    const query = new URLSearchParams(params).toString();
    return host + path + (query ? "?" + query : "");
  } catch {
    return null;
  }
}

/** Same permalink -> same ID across builds regardless of ordering or title. */
export function signalId(raw) {
  const url = canonicalSignalUrl(raw);
  if (!url) return null;
  return "live-" + createHash("sha256").update(url).digest("hex").slice(0, 24);
}

/**
 * First source wins on the same canonical publisher URL.
 * Review/cross-source event clustering is deliberately out of scope.
 */
export function dedupeSignalItems(items) {
  const seen = new Set();
  const output = [];
  let skipped = 0;
  for (const item of items) {
    const key = canonicalSignalUrl(item.url);
    if (!key || seen.has(key)) { skipped++; continue; }
    seen.add(key);
    output.push({ ...item, id: signalId(item.url) });
  }
  return { items: output, skipped };
}
