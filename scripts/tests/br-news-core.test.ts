import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BRAZIL_SOURCES, titleIsAiNews, titleHasBrazilImpact } from "../br-news-sources.mjs";
import { extractRssItems, selectBrazilNews } from "../br-news-core.mjs";

const canaltech = BRAZIL_SOURCES[0];
const rss = `<?xml version="1.0"?>
<rss version="2.0"><channel>
  <item>
    <title><![CDATA[Brasil lança programa de inteligência artificial para escolas]]></title>
    <link>https://canaltech.com.br/inteligencia-artificial/programa-brasil?utm_source=email</link>
    <description><![CDATA[Detalhes sobre o programa &amp; escolas.]]></description>
    <pubDate>Fri, 23 Oct 2026 10:00:00 GMT</pubDate>
  </item>
  <item>
    <title>OpenAI anuncia nova ferramenta para agentes</title>
    <link>https://canaltech.com.br/inteligencia-artificial/novo-agente</link>
    <pubDate>Fri, 23 Oct 2026 09:00:00 GMT</pubDate>
  </item>
  <item>
    <title>História do futebol brasileiro</title>
    <link>https://canaltech.com.br/futebol/futebol</link>
    <pubDate>Fri, 23 Oct 2026 09:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Inteligência artificial no site errado</title>
    <link>https://attacker.example.net/redirect</link>
    <pubDate>Fri, 23 Oct 2026 09:00:00 GMT</pubDate>
  </item>
</channel></rss>`;

test("Brazil source registry uses HTTPS known publisher hosts, not user supplied feed URLs", () => {
  assert.equal(BRAZIL_SOURCES.length, 2);
  for (const source of BRAZIL_SOURCES) {
    assert.ok(source.feedUrl.startsWith("https://"));
    assert.equal(source.coverageRegion, "BR");
    assert.equal(source.language, "pt-BR");
    assert.ok(source.publisherHost);
  }
});

test("filters a proper Portuguese AI term, not substring 'ia' inside unrelated words", () => {
  assert.equal(titleIsAiNews("História dos computadores"), false);
  assert.equal(titleIsAiNews("Nova IA brasileira"), true);
  assert.equal(titleIsAiNews("OpenAI publica pesquisa"), true);
  assert.equal(titleHasBrazilImpact("IA no Brasil"), true);
  assert.equal(titleHasBrazilImpact("OpenAI in global market"), false);
});

test("RSS reader extracts bounded, attributed excerpts, with no off-publisher links", () => {
  const entries = extractRssItems(rss, canaltech);
  assert.equal(entries.length, 4);
  assert.equal(entries[0].source, "Canaltech");
  assert.equal(entries[0].title, "Brasil lança programa de inteligência artificial para escolas");
  assert.equal(entries[0].url, "https://canaltech.com.br/inteligencia-artificial/programa-brasil");
  assert.equal(entries[0].providerExcerpt, "Detalhes sobre o programa & escolas.");
  assert.equal(entries[3].url, null);
});

test("Brazil-first ranking selects local impact before global coverage, and never invents stories", () => {
  const entries = extractRssItems(rss, canaltech);
  const list = selectBrazilNews(entries, { now: new Date("2026-10-23T11:00:00Z") });
  assert.equal(list.length, 2);
  assert.equal(list[0].brazilImpact, true);
  assert.equal(list[1].brazilImpact, false);
  for (const item of list) {
    assert.equal(item.editorialStatus, "aggregated-unverified");
    assert.equal(item.language, "pt-BR");
    assert.ok(item.url.startsWith("https://canaltech.com.br/"));
  }
});

test("duplicate source URL collapses; stale/future publication dates fail closed", () => {
  const [entry] = extractRssItems(rss, canaltech);
  const cases = [entry, { ...entry }, { ...entry, publishedAt: "2026-08-01T00:00:00Z" }, { ...entry, publishedAt: "2026-10-27T00:00:00Z" }];
  const list = selectBrazilNews(cases, { now: new Date("2026-10-23T11:00:00Z") });
  assert.equal(list.length, 1);
  assert.equal(selectBrazilNews([], { now: new Date("2026-10-23T11:00:00Z") }).length, 0);
});

test("unbounded RSS input fails rather than exhausting memory during parsing", () => {
  assert.throws(() => extractRssItems("x".repeat(2_000_001), canaltech), /2 MB/);
});

test("homepage actually renders Brazil radar before the international feed", () => {
  const page = readFileSync("src/app/page.tsx", "utf8");
  assert.ok(page.indexOf("<BrazilRadar />") > page.indexOf("<BrazilFirstHero />"));
  assert.ok(page.indexOf("<BrazilRadar />") < page.indexOf("<ContentNav"));
  const br = readFileSync("src/components/BrazilRadar.tsx", "utf8");
  assert.match(br, /editorialStatus|NÃO REVISADOS PELA REDAÇÃO|agregado|NÃO REVISADOS/);
});

test("Portuguese-first default remains reversible by explicitly switching language", () => {
  const ctx = readFileSync("src/context/LanguageContext.tsx", "utf8");
  assert.match(ctx, /useState<Locale>\("pt"\)/);
  assert.match(ctx, /setLocale\(l => \(l === "en" \? "pt" : "en"\)\)/);
  assert.match(readFileSync("src/app/layout.tsx", "utf8"), /lang="pt-BR"/);
});

test("feed builder runs before pages and standalone collector writes only declared JSON", () => {
  const pkg = JSON.parse(readFileSync("package.json","utf8"));
  assert.ok(pkg.scripts.prebuild.includes("node scripts/collect-br-news.mjs"));
  const code = readFileSync("scripts/collect-br-news.mjs","utf8");
  assert.match(code, /BRAZIL_SOURCES/);
  assert.doesNotMatch(code, /ANTHROPIC_API_KEY|OPENAI_API_KEY|sendMail|sendEmail/);
});
