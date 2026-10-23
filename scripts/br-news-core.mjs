import { createHash } from "node:crypto";
import { titleIsAiNews, titleHasBrazilImpact } from "./br-news-sources.mjs";

const strip = (value = "") => String(value)
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/<[^>]*>/g, " ")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Math.min(Number(code), 0x10ffff)))
  .replace(/\s+/g, " ").trim();

function tag(block, name) {
  const match = block.match(new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + name + ">", "i"));
  return match ? match[1].trim() : "";
}

function sourceUrl(raw, host) {
  try {
    const url = new URL(strip(raw));
    const normalizedHost = url.hostname.toLowerCase().replace(/^www\./, "");
    if (url.protocol !== "https:" || normalizedHost !== host) return null;
    url.hash = "";
    for (const name of [...url.searchParams.keys()]) {
      if (/^utm_/i.test(name) || ["fbclid", "gclid"].includes(name.toLowerCase())) url.searchParams.delete(name);
    }
    return url.toString();
  } catch { return null; }
}

function publishedDate(raw) {
  const millis = Date.parse(strip(raw));
  return Number.isFinite(millis) ? new Date(millis).toISOString() : null;
}

/**
 * Minimal RSS 2.0 reader for two fixed publisher endpoints.
 * No arbitrary user URL input, no XML entity expansion, no HTML rendering.
 * This is intentionally not a general-purpose document XML parser.
 */
export function extractRssItems(xml, source) {
  if (typeof xml !== "string" || xml.length > 2_000_000) throw new Error("RSS exceeds 2 MB text limit");
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].slice(0, 120).map(([, part]) => ({
    title: strip(tag(part, "title")).slice(0, 230),
    url: sourceUrl(tag(part, "link"), source.publisherHost),
    providerExcerpt: strip(tag(part, "description")).slice(0, 320),
    publishedAt: publishedDate(tag(part, "pubDate") || tag(part, "dc:date")),
    sourceId: source.id,
    source: source.name,
    language: source.language,
    country: source.coverageRegion,
  }));
}

export function selectBrazilNews(rows, { now = new Date(), maxItems = 12, maxAgeDays = 21 } = {}) {
  const asOf = new Date(now).getTime();
  if (!Number.isFinite(asOf)) throw new Error("Invalid reference date");
  const seen = new Set();
  const items = [];
  for (const row of rows) {
    if (!row || !row.url || !row.publishedAt || !titleIsAiNews(row.title)) continue;
    const published = Date.parse(row.publishedAt);
    const age = asOf - published;
    if (!Number.isFinite(published) || age < -3_600_000 || age > maxAgeDays * 86_400_000) continue;
    const canonical = row.url.replace(/\/$/, "");
    if (seen.has(canonical)) continue;
    seen.add(canonical);
    items.push({
      id: "br-" + createHash("sha256").update(canonical).digest("hex").slice(0, 20),
      title: row.title,
      url: row.url,
      source: row.source,
      sourceId: row.sourceId,
      providerExcerpt: row.providerExcerpt,
      publishedAt: row.publishedAt,
      language: "pt-BR",
      coverageRegion: "BR",
      brazilImpact: titleHasBrazilImpact(row.title),
      editorialStatus: "aggregated-unverified",
    });
  }
  items.sort((a, b) => Number(b.brazilImpact) - Number(a.brazilImpact) ||
    Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.id.localeCompare(b.id));
  return items.slice(0, maxItems);
}
