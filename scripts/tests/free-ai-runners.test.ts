import assert from "node:assert/strict";
import test from "node:test";
import {
  FREE_AI_RUNNERS,
  runnerUrl,
  PREFILL_MAX_CHARS,
} from "../../src/lib/freeAiRunners";

test("free AI runners are well-formed and free/no-login by design", () => {
  assert.ok(FREE_AI_RUNNERS.length >= 2, "expected at least two free runners");
  const ids = new Set<string>();
  for (const r of FREE_AI_RUNNERS) {
    assert.ok(r.id && !ids.has(r.id), `duplicate or empty id: ${r.id}`);
    ids.add(r.id);
    assert.ok(r.name.trim(), `missing name: ${r.id}`);
    assert.ok(r.blurb.trim(), `missing blurb: ${r.id}`);
    assert.equal(typeof r.url, "function", `url must be a builder: ${r.id}`);
    const u = r.url("hello world");
    assert.match(u, /^https:\/\//, `url must be https: ${r.id} -> ${u}`);
  }
});

test("prefilling runners encode the prompt into the URL", () => {
  const prompt = "Summarize Q3 variance & risks";
  for (const r of FREE_AI_RUNNERS.filter(r => r.prefills)) {
    const u = r.url(prompt);
    assert.ok(
      u.includes(encodeURIComponent(prompt)),
      `prefill runner ${r.id} should embed the encoded prompt`,
    );
  }
});

test("runnerUrl caps prefill length but never throws on long prompts", () => {
  const long = "x".repeat(PREFILL_MAX_CHARS + 5000);
  const prefill = FREE_AI_RUNNERS.find(r => r.prefills)!;
  const u = runnerUrl(prefill, long);
  // encoded slice must be no longer than the encoded cap
  assert.ok(u.length <= prefill.url("x".repeat(PREFILL_MAX_CHARS)).length,
    "runnerUrl should truncate the prefill to PREFILL_MAX_CHARS");
});
