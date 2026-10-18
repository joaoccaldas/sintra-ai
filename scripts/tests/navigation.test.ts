import assert from "node:assert/strict";
import test from "node:test";
import { withBasePath } from "../../src/lib/constants";

test("editorial paths resolve once on GitHub Pages and without a prefix in development", () => {
  assert.equal(withBasePath("/library/", "/sintra-ai"), "/sintra-ai/library/");
  assert.equal(withBasePath("/sintra-ai/library/", "/sintra-ai"), "/sintra-ai/library/");
  assert.equal(withBasePath("/", "/sintra-ai"), "/sintra-ai/");
  assert.equal(withBasePath("/library/", ""), "/library/");
  assert.equal(withBasePath("https://example.com/", "/sintra-ai"), "https://example.com/");
  assert.equal(withBasePath("#explore", "/sintra-ai"), "#explore");
});
