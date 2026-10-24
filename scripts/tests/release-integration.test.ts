import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { exactPublicationDate } from "../../src/lib/publicationDates";
import { canonicalNewsSourceUrl, composeNewsItems } from "../../src/lib/newsIdentity";
import { signalId, dedupeSignalItems } from "../live-feed-identity.mjs";
import type { NewsItem } from "../../src/lib/newsData";

const read = (path: string) => readFileSync(path, "utf8");

test("release retains all independent editorial safety and news identity modules", () => {
  const generator = read("scripts/update-news.mjs");
  assert.match(generator, /unverified-review-candidates/);
  assert.doesNotMatch(generator, /writeFileSync|appendFileSync|git push/);
  const combined = read("src/lib/newsDataCombined.ts");
  assert.match(combined, /NEWS_IDENTITY_AUDIT/);
  const feed = read("scripts/aggregate-live-feed.mjs");
  assert.match(feed, /dedupeSignalItems/);
  const newsletter = read("src/components/Footer.tsx");
  assert.match(newsletter, /NewsletterComingSoon/);
  assert.doesNotMatch(newsletter, /NewsletterCapture|NEXT_PUBLIC_NEWSLETTER_ENDPOINT/);
});

test("release checks event identity without conflating provider URL or publication day", () => {
  const source = "https://www.example.org/ai/story?utm_source=media";
  const cleaned = "https://example.org/ai/story";
  assert.equal(canonicalNewsSourceUrl(source), canonicalNewsSourceUrl(cleaned));
  assert.equal(signalId(source), signalId(cleaned));
  const events = dedupeSignalItems([
    {url:source,title:"AI in Brazil"},
    {url:cleaned,title:"Different publisher headline"},
    {url:"https://example.org/ai/another-story",title:"AI in Brazil"},
  ]);
  assert.equal(events.items.length, 2);
  assert.equal(exactPublicationDate(202610), null);
  assert.equal(exactPublicationDate(202610,23), "2026-10-23");
});

test("same headline at two sources is a review candidate, not silently hidden", () => {
  function item(id: string, url: string): NewsItem {
    return {id, title:"IA no Brasil", url, date:"Oct 2026", dateNum:202610,
      dateDay:23, summary:"Synthetic fixture", tags:["Brazil"], significance:"notable",
      provider:"Test", providerColor:"#123abc"};
  }
  const result = composeNewsItems([item("one","https://one.example/story"),item("two","https://two.example/story")]);
  assert.equal(result.items.length,2);
  assert.equal(result.reviewCandidates.length,1);
  assert.equal(result.suppressed.length,0);
});

test("root production has no build-time Google Fonts fetch and retains brand-fallback aliases", () => {
  const root=read("src/app/layout.tsx");
  const css=read("src/app/font-fallback.css");
  assert.doesNotMatch(root, /next\/font\/google/);
  assert.match(root, /font-fallback\.css/);
  for(const key of ["--font-manrope","--font-instrument","--font-geist-mono"]) assert.ok(css.includes(key));
  assert.match(css, /EB Garamond/);
  assert.match(css, /Inter/);
  assert.doesNotMatch(css,/url\(https?:\/\//);
});

test("beta preview cannot claim installed app or expose production worker", () => {
  const config=read("next.config.mjs");
  const layout=read("src/app/layout.tsx");
  const worker=read("src/components/ServiceWorkerRegister.tsx");
  assert.match(config, /SINTRA_PREVIEW_BASE_PATH/);
  assert.match(config, /NEXT_PUBLIC_PREVIEW_MODE/);
  assert.match(layout, /index:\s*false,\s*follow:\s*false/);
  assert.match(worker, /NEXT_PUBLIC_PREVIEW_MODE === "1"/);
});

test("Brazil-first static route remains accessible and the first-win is honest", () => {
  const home=read("src/app/page.tsx");
  assert.ok(home.indexOf("<BrazilRadar />")<home.indexOf("<HomeEditorialSections />"));
  assert.match(home, /<BrazilFirstHero \/>/);
  assert.doesNotMatch(home, /ContentNav/);
  const practice=read("src/components/HomeEditorialClient.tsx");
  assert.match(practice, /execução não verificada/);
  const radar=read("src/components/BrazilRadar.tsx");
  assert.match(radar, /NÃO REVISADOS PELA REDAÇÃO/);
});
