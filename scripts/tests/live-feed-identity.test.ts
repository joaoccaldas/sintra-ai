import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { canonicalSignalUrl, dedupeSignalItems, signalId } from "../live-feed-identity.mjs";

const entry = (title: string, url: string) => ({
  title, url, summary: "Synthetic test item", publishedAt: "2026-10-23T10:00:00.000Z",
  source: "Fixture", category: "Labs", color: "#123abc",
});

test("preserves multiple posts from the same publisher with distinct permalinks", () => {
  const { items, skipped } = dedupeSignalItems([
    entry("Launch A", "https://blog.example.org/posts/launch-a"),
    entry("Launch B", "https://blog.example.org/posts/launch-b"),
  ]);
  assert.equal(items.length, 2);
  assert.equal(skipped, 0);
  assert.notEqual(items[0].id, items[1].id);
});

test("deduplicates exact source links with trackers without losing canonical identity", () => {
  const { items, skipped } = dedupeSignalItems([
    entry("First title", "https://www.example.org/posts/a/?utm_source=newsletter#intro"),
    entry("Updated title", "https://example.org/posts/a"),
  ]);
  assert.equal(items.length, 1);
  assert.equal(skipped, 1);
  assert.equal(items[0].title, "First title");
});

test("keeps meaningful query parameters, ignores tracking noise and rejects unsafe URLs", () => {
  assert.equal(canonicalSignalUrl("https://example.org/article?id=2&utm_campaign=foo"), "example.org/article?id=2");
  assert.equal(canonicalSignalUrl("https://example.org/article?id=3"), "example.org/article?id=3");
  assert.equal(canonicalSignalUrl("javascript:alert(1)"), null);
  assert.equal(canonicalSignalUrl("not a link"), null);
});

test("IDs survive reordering and headline changes when canonical source is unchanged", () => {
  const a = "https://example.org/a?utm_source=social";
  const b = "https://example.org/b";
  const run1 = dedupeSignalItems([entry("Old", a), entry("Other", b)]);
  const run2 = dedupeSignalItems([entry("Other", b), entry("Changed title", "https://www.example.org/a/")]);
  const first = run1.items.find(x => x.url === a);
  const second = run2.items.find(x => x.title === "Changed title");
  assert.equal(first?.id, second?.id);
  assert.ok(first?.id.startsWith("live-"));
  assert.equal(signalId(a), signalId("https://www.example.org/a/"));
});

test("invalid source links are excluded, with an explicit skipped count", () => {
  const r = dedupeSignalItems([entry("Bad", "javascript:evil()"), entry("Good", "https://example.org/ok")]);
  assert.equal(r.items.length, 1);
  assert.equal(r.skipped, 1);
});

test("legacy array-position ID algorithm is no longer used", () => {
  const source = readFileSync("scripts/aggregate-live-feed.mjs", "utf8");
  assert.doesNotMatch(source, /live-\$\{idx\}/);
  assert.match(source, /dedupeSignalItems/);
});
