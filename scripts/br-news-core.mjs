import { createHash } from "node:crypto";
import { titleIsAiNews, titleHasBrazilImpact } from "./br-news-sources.mjs";

// A small deterministic entity set for Brazilian-language publisher RSS.
// React escapes the resulting text: source HTML is never rendered as markup.
// The parser is deliberately NOT a general-purpose HTML document interpreter.
const TEXT_ENTITIES = Object.freeze({
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  aacute: "á", Aacute: "Á", agrave: "à", Agrave: "À",
  acirc: "â", Acirc: "Â", atilde: "ã", Atilde: "Ã",
  eacute: "é", Eacute: "É", ecirc: "ê", Ecirc: "Ê",
  iacute: "í", Iacute: "Í", oacute: "ó", Oacute: "Ó",
  ocirc: "ô", Ocirc: "Ô", otilde: "õ", Otilde: "Õ",
  uacute: "ú", Uacute: "Ú", ccedil: "ç", Ccedil: "Ç",
  uml: "¨", ndash: "–", mdash: "—", hellip: "…",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  bull: "•", middot: "·", trade: "™", reg: "®", copy: "©",
  euro: "€", pound: "£",
});

function decodeEntities(text) {
  const decode = (input) => input.replace(/&(#x[\\da-fA-F]+|#\\d+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity.startsWith("#")) {
      const hex = /^#x/i.test(entity);
      const code = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      if (!Number.isFinite(code) || code < 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return "�";
      return String.fromCodePoint(code);
    }
    return Object.prototype.hasOwnProperty.call(TEXT_ENTITIES, entity) ? TEXT_ENTITIES[entity] : match;
  });
  // Handles feeds with common nested escaping such as &amp;ccedil;.
  return decode(decode(text));
}

const strip = (value = "") => decodeEntities(String(value)
  .replace(/<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>/g, "$1")
  .replace(/<[^>]*>/g, " "))
  .replace(/\\s+/g, " ").trim();

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
