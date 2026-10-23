import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { AI_NEWS } from "../src/lib/newsDataCombined.js";
import { exactPublicationDate } from "../src/lib/publicationDates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

function dateNumToRFC822(dateNum: number, dateDay?: number): string | null {
  const exact = exactPublicationDate(dateNum, dateDay);
  return exact ? new Date(exact + "T00:00:00.000Z").toUTCString() : null;
}

const items = [...AI_NEWS]
  .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
  .slice(0, 50)
  .map(n => `
  <item>
    <title><![CDATA[${n.title}]]></title>
    <description><![CDATA[${n.summary}]]></description>
    <link>${n.url || `${SITE_URL}/news/`}</link>
    <guid isPermaLink="${n.url ? "true" : "false"}">${n.url || `${SITE_URL}/news/#${n.id}`}</guid>
    ${dateNumToRFC822(n.dateNum, n.dateDay) ? `<pubDate>${dateNumToRFC822(n.dateNum, n.dateDay)}</pubDate>` : ""}
    <category>${n.provider.replace(/&/g, "&amp;")}</category>
  </item>`)
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sintra AI — AI News</title>
    <description>AI news with editorial records and aggregated source signals; review status differs by item.</description>
    <link>${SITE_URL}/news/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <copyright>Open source · sintra-ai</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>`;

const out = join(__dirname, "../public/feed.xml");
writeFileSync(out, xml, "utf8");
console.log(`✓ RSS feed written → public/feed.xml (${AI_NEWS.length} items)`);

// ── JSON Feed 1.1 (https://jsonfeed.org) — modern readers & JS clients ──────
const jsonItems = [...AI_NEWS]
  .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0))
  .slice(0, 50)
  .map(n => ({
    id: n.url || `${SITE_URL}/news/#${n.id}`,
    url: n.url || `${SITE_URL}/news/`,
    title: n.title,
    content_text: n.summary,
    _sintra: { origin: n.origin ?? "editorial", checkedAt: n.checkedAt ?? null, knowledgeUrl: n.knowledgeId ? `${SITE_URL}/knowledge/${n.knowledgeId}/` : null, workflowResource: n.origin === "lab-tested" ? `${SITE_URL}/api/workflows/power-bi-variance.json` : null, verification: n.origin === "lab-tested" ? "synthetic-calculation-tested-tenant-untested" : n.checkedAt ? "primary-source-checked" : "not-reverified" },
    ...(exactPublicationDate(n.dateNum, n.dateDay)
      ? { date_published: exactPublicationDate(n.dateNum, n.dateDay) + "T00:00:00.000Z" }
      : {}),
    tags: [n.provider, ...(n.tags ?? [])].filter(Boolean),
  }));

const jsonFeed = {
  version: "https://jsonfeed.org/version/1.1",
  title: "Sintra AI — AI News",
  home_page_url: `${SITE_URL}/news/`,
  feed_url: `${SITE_URL}/feed.json`,
  description: "Curated AI news: model releases, benchmarks, research breakthroughs, and industry events.",
  language: "en-us",
  items: jsonItems,
};

const jsonOut = join(__dirname, "../public/feed.json");
writeFileSync(jsonOut, JSON.stringify(jsonFeed, null, 2) + "\n", "utf8");
console.log(`✓ JSON Feed written → public/feed.json (${jsonItems.length} items)`);
