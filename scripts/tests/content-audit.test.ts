import assert from "node:assert/strict";
import test from "node:test";
import {
  conceptIdFromHref,
  findDuplicates,
  isHttpUrl,
  isIsoDate,
} from "../content-audit-lib";

test("findDuplicates normalizes case and whitespace", () => {
  assert.deepEqual(findDuplicates(["Agents", " tools ", "agents", "TOOLS"]), ["agents", "tools"]);
});

test("isIsoDate accepts real ISO dates and rejects impossible dates", () => {
  assert.equal(isIsoDate("2026-06-23"), true);
  assert.equal(isIsoDate("2026-02-31"), false);
  assert.equal(isIsoDate("23-06-2026"), false);
});

test("isHttpUrl only accepts HTTP and HTTPS URLs", () => {
  assert.equal(isHttpUrl("https://example.com/path"), true);
  assert.equal(isHttpUrl("http://example.com"), true);
  assert.equal(isHttpUrl("javascript:alert(1)"), false);
  assert.equal(isHttpUrl("not-a-url"), false);
});

test("conceptIdFromHref extracts concept anchors with or without trailing slash", () => {
  assert.equal(conceptIdFromHref("/sintra-ai/concepts#agents"), "agents");
  assert.equal(conceptIdFromHref("/sintra-ai/concepts/#function-calling"), "function-calling");
  assert.equal(conceptIdFromHref("/sintra-ai/tools/"), null);
});
