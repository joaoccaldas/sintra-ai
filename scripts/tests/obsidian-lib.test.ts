import assert from "node:assert/strict";
import test from "node:test";
import {
  sanitizeFilename,
  wikiTarget,
  wikilink,
  slugTag,
  frontmatter,
  note,
  uniq,
} from "../obsidian-lib";

test("sanitizeFilename strips Obsidian-illegal characters", () => {
  assert.equal(sanitizeFilename("M&A: Due/Diligence *Data* #room?"), "M&A Due Diligence Data room");
  assert.equal(sanitizeFilename("   "), "untitled");
});

test("wikilink targets drop link-breaking chars and support aliases", () => {
  assert.equal(wikiTarget("Claude [Opus] | 4.8 #ai"), "Claude Opus 4.8 ai");
  assert.equal(wikilink("ChatGPT"), "[[ChatGPT]]");
  assert.equal(wikilink("openai-gpt", "GPT"), "[[openai-gpt|GPT]]");
  assert.equal(wikilink("Same", "Same"), "[[Same]]"); // no redundant alias
});

test("slugTag produces valid space-free Obsidian tags", () => {
  assert.equal(slugTag("FP&A"), "fp-and-a");
  assert.equal(slugTag("Data & Analytics"), "data-and-analytics");
  assert.equal(slugTag("GPT-5.6"), "gpt-5-6");
});

test("frontmatter skips undefined/empty, block-encodes arrays, quotes when needed", () => {
  const fm = frontmatter({
    title: "Hello: World",
    n: 3,
    flag: true,
    empty: [],
    skip: undefined,
    tags: ["a", "b"],
  });
  assert.match(fm, /title: "Hello: World"/);
  assert.match(fm, /n: 3/);
  assert.match(fm, /flag: true/);
  assert.doesNotMatch(fm, /empty:/);
  assert.doesNotMatch(fm, /skip:/);
  assert.match(fm, /tags:\n {2}- a\n {2}- b/);
  assert.ok(fm.startsWith("---\n") && fm.endsWith("\n---"));
});

test("note joins frontmatter and body with a blank line and trailing newline", () => {
  const out = note({ title: "X" }, "body text");
  assert.match(out, /---\ntitle: X\n---\n\nbody text\n$/);
});

test("uniq preserves order", () => {
  assert.deepEqual(uniq(["a", "b", "a", "c", "b"]), ["a", "b", "c"]);
});
