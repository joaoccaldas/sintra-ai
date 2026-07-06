#!/usr/bin/env node
/**
 * aggregate-live-feed.mjs — Sintra AI live feed builder
 * ----------------------------------------------------------------------------
 * Pulls the latest posts from a curated set of primary AI sources (labs,
 * research, and high-signal press) and writes a single normalised, deduped,
 * date-sorted JSON file consumed by the site:
 *
 *     src/data/liveFeed.generated.json
 *
 * Design constraints (match the rest of this static Next.js project):
 *   - No runtime fetch on the site. This runs at BUILD time only.
 *   - Zero npm dependencies — Node 18+ global fetch + a small hand-rolled
 *     RSS/Atom parser. Keeps CI fast and supply-chain surface at zero.
 *   - Fault-tolerant: a dead or slow source is logged and skipped, never
 *     fails the build. A stale-but-present feed is always better than a
 *     broken deploy.
 *
 * Run: `node scripts/aggregate-live-feed.mjs`
 * Wired into `npm run prebuild` so every deploy refreshes the feed.
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../src/data/liveFeed.generated.json");

const UA = "SintraAI-FeedBot/1.0 (+https://joaoccaldas.github.io/sintra-ai)";
const PER_SOURCE_CAP = 6; // max items kept from any single source
const TOTAL_CAP = 60; // max items in the final feed
const TIMEOUT_MS = 12_000;
const FRESH_DAYS = 120; // drop anything older than this to keep the feed live

/**
 * Source registry. `category` groups items in the UI; `color` is the accent.
 * type: "rss" (RSS 2.0 <item>), "atom" (<entry>), or "hn" (HN Algolia JSON).
 */
const SOURCES = [
  { name: "Google DeepMind", type: "rss",  category: "Labs",     color: "#4285f4", url: "https://deepmind.google/blog/rss.xml" },
  { name: "Google AI",       type: "rss",  category: "Labs",     color: "#4285f4", url: "https://blog.google/technology/ai/rss/" },
  { name: "OpenAI",          type: "rss",  category: "Labs",     color: "#10a37f", url: "https://openai.com/news/rss.xml" },
  { name: "Hugging Face",    type: "rss" , category: "Open Source", color: "#ff9d00", url: "https://huggingface.co/blog/feed.xml" },
  { name: "arXiv cs.AI",     type: "atom", category: "Research", color: "#b31b1b", url: "http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=12" },
  { name: "BAIR Berkeley",   type: "rss" , category: "Research", color: "#003262", url: "https://bair.berkeley.edu/blog/feed.xml" },
  { name: "MIT Tech Review", type: "rss",  category: "Press",    color: "#e2231a", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed" },
  { name: "TechCrunch AI",   type: "rss",  category: "Press",    color: "#0a8f3c", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { name: "VentureBeat AI",  type: "rss",  category: "Press",    color: "#c8102e", url: "https://venturebeat.com/category/ai/feed/" },
  { name: "Simon Willison",  type: "atom", category: "Practitioner", color: "#ff7f2a", url: "https://simonwillison.net/atom/everything/" },
  { name: "Hacker News · AI", type: "hn",  category: "Community", color: "#ff6600", url: "https://hn.algolia.com/api/v1/search_by_date?tags=story&query=AI&hitsPerPage=25&numericFilters=points%3E30" },
];

/* ── tiny XML helpers (no deps) ─────────────────────────────────────────── */
const unesc = (s = "") =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");

const stripTags = (s = "") => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? unesc(m[1]).trim() : "";
}

function atomLink(block) {
  // Prefer rel="alternate", else first <link href="...">
  const alt = block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i);
  if (alt) return alt[1];
  const any = block.match(/<link[^>]*href=["']([^"']+)["']/i);
  return any ? any[1] : "";
}

function splitBlocks(xml, el) {
  const out = [];
  const re = new RegExp(`<${el}(?:\\s[^>]*)?>([\\s\\S]*?)</${el}>`, "gi");
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
}

function toIso(d) {
  if (!d) return null;
  const t = Date.parse(d);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

/* ── per-type parsers ───────────────────────────────────────────────────── */
function parseRss(xml, src) {
  return splitBlocks(xml, "item").map((b) => ({
    title: stripTags(tag(b, "title")),
    url: tag(b, "link") || (b.match(/<link[^>]*href=["']([^"']+)["']/i)?.[1] ?? ""),
    summary: stripTags(tag(b, "description") || tag(b, "content:encoded")).slice(0, 260),
    publishedAt: toIso(tag(b, "pubDate") || tag(b, "dc:date")),
    source: src.name, category: src.category, color: src.color,
  }));
}

function parseAtom(xml, src) {
  return splitBlocks(xml, "entry").map((b) => ({
    title: stripTags(tag(b, "title")),
    url: atomLink(b),
    summary: stripTags(tag(b, "summary") || tag(b, "content")).slice(0, 260),
    publishedAt: toIso(tag(b, "published") || tag(b, "updated")),
    source: src.name, category: src.category, color: src.color,
  }));
}

function parseHn(text, src) {
  const data = JSON.parse(text);
  return (data.hits || [])
    .filter((h) => h.url && h.title)
    .map((h) => ({
      title: stripTags(h.title),
      url: h.url,
      summary: `${h.points ?? 0} points · ${h.num_comments ?? 0} comments on Hacker News`,
      publishedAt: h.created_at ? new Date(h.created_at).toISOString() : null,
      source: src.name, category: src.category, color: src.color,
    }));
}

/* ── fetch one source (timeout + graceful failure) ──────────────────────── */
async function pull(src) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(src.url, { signal: ctrl.signal, headers: { "User-Agent": UA, Accept: "*/*" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const items =
      src.type === "hn" ? parseHn(text, src)
      : src.type === "atom" ? parseAtom(text, src)
      : parseRss(text, src);
    const clean = items
      .filter((i) => i.title && i.url && i.url.startsWith("http"))
      // All curated sources serve https; upgrade any http:// permalinks
      // (e.g. arXiv abstract links) so the feed ships zero mixed-content links.
      .map((i) => ({ ...i, url: i.url.replace(/^http:\/\//, "https://") }))
      .slice(0, PER_SOURCE_CAP);
    console.log(`  ✓ ${src.name.padEnd(18)} ${String(clean.length).padStart(2)} items`);
    return { ok: true, name: src.name, items: clean };
  } catch (err) {
    console.warn(`  ⚠ ${src.name.padEnd(18)} skipped — ${err.message}`);
    return { ok: false, name: src.name, items: [] };
  } finally {
    clearTimeout(timer);
  }
}

/* ── dedupe by normalised url + title ───────────────────────────────────── */
function keyFor(item) {
  const u = item.url.replace(/^https?:\/\/(www\.)?/, "").replace(/[/?#].*$/, "").toLowerCase();
  return `${u}::${item.title.toLowerCase().slice(0, 40)}`;
}

async function main() {
  console.log("Aggregating live AI feed…");
  const results = await Promise.all(SOURCES.map(pull));

  const cutoff = Date.now() - FRESH_DAYS * 864e5;
  const seen = new Set();
  const items = results
    .flatMap((r) => r.items)
    .filter((i) => {
      const t = i.publishedAt ? Date.parse(i.publishedAt) : Date.now();
      return t >= cutoff;
    })
    .filter((i) => {
      const k = keyFor(i);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .map((i, idx) => ({ id: `live-${idx}-${keyFor(i).replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`, ...i }))
    .sort((a, b) => Date.parse(b.publishedAt ?? 0) - Date.parse(a.publishedAt ?? 0))
    .slice(0, TOTAL_CAP);

  const okSources = results.filter((r) => r.ok).map((r) => r.name);
  const payload = {
    generatedAt: new Date().toISOString(),
    sourceCount: okSources.length,
    sources: okSources,
    itemCount: items.length,
    items,
  };

  // Guard: never clobber a good committed snapshot with an empty feed.
  // In egress-blocked environments (some CI sandboxes) every fetch 403s;
  // the stale-but-real committed snapshot is better than a broken build,
  // so keep it, warn loudly, and let the freshness audit surface the age.
  if (items.length === 0) {
    if (existsSync(OUT)) {
      console.warn("⚠ All sources failed — keeping the existing snapshot untouched.");
      return;
    }
    console.error("✗ Live feed is EMPTY and no previous snapshot exists.");
    process.exitCode = 1;
    return;
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`\n✓ Live feed written → src/data/liveFeed.generated.json`);
  console.log(`  ${items.length} items from ${okSources.length}/${SOURCES.length} sources`);
}

main();
