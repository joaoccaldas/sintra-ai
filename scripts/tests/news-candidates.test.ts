import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
// JS source is intentional: the research script uses plain Node without TS loader.
import { normalizeNewsUrl, validateNewsCandidates } from "../news-candidates.mjs";

const valid = {
  id: "brazil-ai-skills-2026", date: "Oct 2026", dateNum: 202610, dateDay: 23,
  title: "Brazil announces verified AI training initiative",
  summary: "A hypothetical test fixture, not a published event.",
  tags: ["Brazil", "Education"], significance: "major", provider: "Test Provider",
  providerColor: "#123abc", url: "https://example.org/news/ai-training?utm_source=test",
  why_it_matters: "This is only a synthetic fixture.",
  what_to_try: "Verify the original primary source before publishing.",
  country: "BR",
};

test("normalizes trackers without combining genuinely distinct source URLs", () => {
  assert.equal(normalizeNewsUrl("https://www.Example.org/news/ai-training/?utm_source=test#top"), "example.org/news/ai-training");
  assert.equal(normalizeNewsUrl("https://example.org/news/ai-training/?item=2&utm_campaign=a"), "example.org/news/ai-training?item=2");
  assert.equal(normalizeNewsUrl("http://example.org/news"), null);
  assert.equal(normalizeNewsUrl("javascript:alert(1)"), null);
});

test("accepts a synthetic complete candidate without publishing it", () => {
  const { accepted, rejected } = validateNewsCandidates([valid]);
  assert.equal(accepted.length, 1);
  assert.equal(rejected.length, 0);
  assert.equal(accepted[0].id, valid.id);
  assert.equal(accepted[0].country, "BR");
});

test("rejects collisions against BOTH curated and historical identities", () => {
  const { accepted, rejected } = validateNewsCandidates([valid], {
    ids: ["old-article"], urls: ["https://example.org/news/ai-training/"], titles: ["Different article"],
  });
  assert.equal(accepted.length, 0);
  assert.match(rejected[0].reasons.join(" "), /duplicate canonical source URL/);

  const r2 = validateNewsCandidates([valid], { titles: [valid.title.toUpperCase()] });
  assert.match(r2.rejected[0].reasons.join(" "), /duplicate normalized title/);
});

test("rejects duplicates within one model response", () => {
  const { accepted, rejected } = validateNewsCandidates([valid, { ...valid, id: "another-id", url: "https://example.org/other" }]);
  assert.equal(accepted.length, 1);
  assert.match(rejected[0].reasons.join(" "), /duplicate normalized title/);
});

test("rejects invented month-days, missing verification fields, unsafe URLs and inconsistent dates", () => {
  const candidates = [
    { ...valid, dateNum: 202602, date: "Feb 2026", dateDay: 31 },
    { ...valid, id: "another", dateDay: undefined },
    { ...valid, url: "javascript:evil()" },
    { ...valid, date: "Sep 2026" },
    { ...valid, why_it_matters: "" },
  ];
  for (const candidate of candidates) {
    const result = validateNewsCandidates([candidate]);
    assert.equal(result.accepted.length, 0);
    assert.ok(result.rejected[0].reasons.length >= 1);
  }
});

test("invalid provider payload cannot silently become accepted news", () => {
  assert.equal(validateNewsCandidates({ title: "not an array" }).accepted.length, 0);
  assert.equal(validateNewsCandidates([null, "story", {}]).accepted.length, 0);
});

test("legacy standalone updater cannot write to source news datasets", () => {
  const code = readFileSync(join(process.cwd(), "scripts/update-news.mjs"), "utf8");
  assert.doesNotMatch(code, /writeFileSync|appendFileSync|renameSync/);
  assert.doesNotMatch(code, /git push|git commit/);
  assert.match(code, /unverified-review-candidates/);
  assert.match(code, /newsLatestData\.ts/);
});


test("research CLI parses, documents draft-only behavior, and needs no provider for help", () => {
  const file = join(process.cwd(), "scripts/update-news.mjs");
  const syntax = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  assert.equal(syntax.status, 0, syntax.stderr);
  const help = spawnSync(process.execPath, [file, "--help"], {
    env: { ...process.env, ANTHROPIC_API_KEY: "" }, encoding: "utf8",
  });
  assert.equal(help.status, 0, help.stderr);
  assert.match(help.stdout, /does not edit or publish news/);
});
