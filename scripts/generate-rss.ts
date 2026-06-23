import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { AI_NEWS } from "../src/lib/newsDataCombined.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

function dateNumToRFC822(dateNum: number, dateDay = 1): string {
  const year = Math.floor(dateNum / 100);
  const month = dateNum % 100;
  return new Date(Date.UTC(year, month - 1, dateDay)).toUTCString();
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
    <pubDate>${dateNumToRFC822(n.dateNum, n.dateDay)}</pubDate>
    <category>${n.provider.replace(/&/g, "&amp;")}</category>
  </item>`)
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sintra AI — AI News</title>
    <description>Curated AI news: model releases, benchmarks, research breakthroughs, and industry events.</description>
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
