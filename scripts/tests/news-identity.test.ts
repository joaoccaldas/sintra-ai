import assert from "node:assert/strict";
import test from "node:test";
import { canonicalNewsSourceUrl, composeNewsItems, normalizedNewsHeadline } from "../../src/lib/newsIdentity";
import type { NewsItem } from "../../src/lib/newsData";

function item(id: string, title: string, url?: string, origin: NewsItem["origin"] = "editorial"): NewsItem {
  return {
    id, title, url, origin,
    date: "Oct 2026", dateNum: 202610, dateDay: 23,
    summary: "Synthetic regression fixture, not a verified news announcement.",
    tags: ["Test"], significance: "notable",
    provider: "Fixture", providerColor: "#123abc",
  };
}

test("normalizes benign URL tracking but preserves distinct query identity", () => {
  assert.equal(canonicalNewsSourceUrl("https://www.Example.com/a/?utm_source=x&x=3#ref"), "example.com/a?x=3");
  assert.equal(canonicalNewsSourceUrl("http://example.com/a/?x=3&utm_medium=y"), "example.com/a?x=3");
  assert.equal(canonicalNewsSourceUrl("https://example.com/a?x=4"), "example.com/a?x=4");
  assert.equal(canonicalNewsSourceUrl("https://example.com/a?x=3&y=1"), "example.com/a?x=3&y=1");
  assert.equal(canonicalNewsSourceUrl("javascript:alert(1)"), null);
  assert.equal(canonicalNewsSourceUrl(), null);
});

test("headline normalization supports Brazilian Portuguese rather than dropping Unicode words", () => {
  assert.equal(normalizedNewsHeadline("IA para Educação: São Paulo!"), "ia para educação são paulo");
  assert.equal(normalizedNewsHeadline(" IA   para EDUCAÇÃO - São Paulo "), "ia para educação são paulo");
});

test("keeps higher-priority curated record when source URL differs only by trackers", () => {
  const curated = item("curated", "Provider announces capability", "https://example.com/posts/update?utm_source=mail");
  const signal = item("signal", "Alternate name", "https://www.example.com/posts/update/#hero", "aggregated");
  const result = composeNewsItems([curated, signal]);
  assert.deepEqual(result.items, [curated]);
  assert.deepEqual(result.suppressed, [{ keptId: "curated", droppedId: "signal", reason: "duplicate-source-url" }]);
  assert.equal(result.reviewCandidates.length, 0);
});

test("does not silently delete distinct publisher articles sharing the same headline", () => {
  const first = item("paper-a", "Pesquisa brasileira sobre IA", "https://a.example/report");
  const second = item("paper-b", "PESQUISA BRASILEIRA SOBRE IA", "https://b.example/report", "aggregated");
  const result = composeNewsItems([first, second]);
  assert.equal(result.items.length, 2);
  assert.equal(result.suppressed.length, 0);
  assert.deepEqual(result.reviewCandidates, [
    { firstId: "paper-a", secondId: "paper-b", reason: "matching-headline-different-source" },
  ]);
});

test("preserves distinct useful query parameters and missing source URLs", () => {
  const results = composeNewsItems([
    item("page1", "Different issue", "https://example.org/post?id=1"),
    item("page2", "Other issue", "https://example.org/post?id=2"),
    item("offline", "No source URI on historic item"),
  ]);
  assert.equal(results.items.length, 3);
  assert.equal(results.suppressed.length, 0);
});

test("collapses repeated source IDs, preserving first-writer precedence", () => {
  const first = item("story", "Reviewed first", "https://a.test/story", "primary-checked");
  const second = item("story", "Unreviewed second", "https://b.test/story", "aggregated");
  const out = composeNewsItems([first, second]);
  assert.equal(out.items.length, 1);
  assert.equal(out.items[0].origin, "primary-checked");
  assert.deepEqual(out.suppressed, [{ keptId: "story", droppedId: "story", reason: "duplicate-id" }]);
});

test("does not mutate input records and gives deterministic results across runs", () => {
  const records = Object.freeze([
    Object.freeze(item("a", "The story", "https://example.org/a")),
    Object.freeze(item("b", "The story", "https://other.org/b")),
  ]);
  const first = composeNewsItems(records);
  const second = composeNewsItems(records);
  assert.deepEqual(first, second);
  assert.equal(first.inputCount, 2);
});

test("combined feed exposes a consistently audited number of visible records", async () => {
  const { AI_NEWS, NEWS_IDENTITY_AUDIT } = await import("../../src/lib/newsDataCombined");
  assert.equal(AI_NEWS.length, NEWS_IDENTITY_AUDIT.published);
  assert.equal(NEWS_IDENTITY_AUDIT.inputs,
    NEWS_IDENTITY_AUDIT.published + NEWS_IDENTITY_AUDIT.exactSuppressed.length);
  assert.ok(AI_NEWS.some(n => n.origin === "aggregated"), "generated provider news remains distinguishable");
  assert.ok(AI_NEWS.some(n => n.origin === "editorial"), "curated editorial records still accessible");
});
