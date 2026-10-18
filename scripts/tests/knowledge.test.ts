import assert from "node:assert/strict";
import test from "node:test";
import { KNOWLEDGE, searchKnowledge } from "../../src/lib/knowledgeData";
import { buildKnowledgeExport, buildUseCaseExport } from "../../src/lib/knowledgeExport";
import { AI_NEWS } from "../../src/lib/newsDataCombined";
import { AI_MODELS, CURRENT_CLAUDE_MODELS } from "../../src/lib/modelsData";
import { CLAUDE_MODELS } from "../../src/lib/claudeData";
import { USE_CASES } from "../../src/lib/data";
import { searchAll } from "../../src/lib/searchIndex";
import { isIsoDate } from "../content-audit-lib";

test("knowledge claims resolve to primary sources, with stable identities and real review dates", () => {
  const ids = new Set(KNOWLEDGE.map(item => item.id));
  assert.equal(ids.size, KNOWLEDGE.length);
  for (const item of KNOWLEDGE) {
    assert.match(item.id, /^[a-z0-9-]+$/);
    assert.ok(isIsoDate(item.reviewedAt) && isIsoDate(item.reviewDueAt));
    assert.ok(item.reviewDueAt > item.reviewedAt);
    assert.equal(item.executionStatus, item.id === "power-bi-variance-review" ? "synthetic-calculation-tested" : "not-run-in-sintra");
    assert.ok(item.prerequisites.length && item.steps.length && item.validation.length && item.limitations.length);
    for (const source of item.sources) {
      assert.ok(["learn.microsoft.com", "support.microsoft.com", "www.microsoft.com", "www.anthropic.com", "claude.com", "support.claude.com", "academy.claude.com"].includes(new URL(source.url).hostname));
      assert.ok(isIsoDate(source.checkedAt));
      if (source.publishedAt) assert.ok(source.publishedAt <= source.checkedAt);
    }
    for (const fact of item.facts) {
      assert.ok(fact.text && fact.sourceIds.length);
      assert.ok(fact.sourceIds.every(id => item.sources.some(source => source.id === id)), `${item.id}: dangling citation`);
    }
    assert.ok(item.related.every(id => ids.has(id) && id !== item.id));
    if (item.kind === "workflow") assert.ok(item.prompt);
  }
});

test("search supports combined terms and evidence filters, including global discovery", () => {
  assert.ok(searchKnowledge("Power BI variance", "Finance", "workflow").some(item => item.id === "power-bi-variance-review"));
  assert.equal(searchKnowledge("no-such-brief").length, 0);
  assert.deepEqual(searchKnowledge("Brex", "all", "case-study").map(item => item.id), ["brex-expense-review"]);
  assert.ok(searchAll("Power BI MCP").some(item => item.kind === "knowledge"));
});

test("regeneration changes assembly time without silently renewing source checks", () => {
  const older = buildKnowledgeExport("https://example.test/sintra-ai", "2026-10-18T00:00:00Z");
  const newer = buildKnowledgeExport("https://example.test/sintra-ai", "2027-01-01T00:00:00Z");
  assert.notEqual(older.generatedAt, newer.generatedAt);
  assert.deepEqual(older.data, newer.data);
  assert.equal(newer.schemaVersion, "1.0");
  for (const item of newer.data) {
    assert.ok(item.resourceUrl.endsWith(`/api/knowledge/${item.id}.json`));
    assert.ok(item.url.endsWith(`/knowledge/${item.id}/`));
  }
  assert.match(newer.policy.generatedAt, /not a source verification/);
});

test("prompt exports retain every original field and distinguish sample content from execution evidence", () => {
  const exported = buildUseCaseExport(USE_CASES, "https://example.test");
  assert.equal(exported.length, USE_CASES.length);
  exported.forEach((record, index) => {
    const { validationStatus, url, ...original } = record;
    assert.deepEqual(original, USE_CASES[index]);
    assert.ok(record.prompt && record.inputs);
    assert.equal(typeof record.sample_output, "string");
    assert.equal(validationStatus, "not-validated-by-export");
    assert.equal(url, `https://example.test/prompts/${record.slug}/`);
  });
});

test("source-checked news reuses the existing finance announcement and preserves its publication date", () => {
  const finance = AI_NEWS.filter(item => item.url === "https://www.anthropic.com/news/finance-agents");
  assert.equal(finance.length, 1);
  assert.equal(finance[0].id, "anthropic-claude-finance-agents-10-templates");
  assert.equal(finance[0].dateNum, 202605);
  assert.equal(finance[0].dateDay, 5);
  assert.equal(finance[0].checkedAt, "2026-10-18");
  assert.equal(finance[0].knowledgeId, "anthropic-finance-agents");
  assert.ok(AI_NEWS.filter(item => item.origin === "aggregated").every(item => !item.checkedAt));
});

test("Claude page, model radar and exports share current model specifications without discarding history", () => {
  assert.deepEqual(CLAUDE_MODELS.map(model => model.id), CURRENT_CLAUDE_MODELS.map(model => model.id));
  assert.ok(AI_MODELS.some(model => model.id === "claude-fable-5"));
  for (const model of CURRENT_CLAUDE_MODELS) {
    assert.equal(model.contextWindow, 1000);
    assert.equal(model.lastVerified, "2026-10-18");
    assert.ok(isIsoDate(model.releaseDateIso!));
    assert.ok(model.docsUrl.includes(model.id.replace("claude-", "")));
    assert.equal(model.sweBench, null, "do not invent unverified benchmark scores");
  }
  assert.match(CURRENT_CLAUDE_MODELS.find(model => model.id === "claude-haiku-5-5")!.priceNote!, /over 100K: \$0.50\/\$2.50/);
});
