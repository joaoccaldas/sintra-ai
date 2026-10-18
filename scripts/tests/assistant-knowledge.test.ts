import assert from "node:assert/strict";
import test from "node:test";
import { KNOWLEDGE, searchKnowledge } from "../../src/lib/knowledgeData";
import { buildKnowledgeExport, buildKnowledgeIndex } from "../../src/lib/knowledgeExport";
import { AI_NEWS } from "../../src/lib/newsDataCombined";
import { ASSISTANT_KNOWLEDGE } from "../../src/lib/assistantKnowledge";

test("audience, product, evidence and skill filters compose without hiding missing results", () => {
  const personal = searchKnowledge("", "ChatGPT", "workflow", "personal", true);
  assert.ok(personal.some(item => item.id === "chatgpt-source-learning"));
  assert.ok(personal.every(item => item.replication && item.audiences?.includes("personal")));
  assert.ok(!personal.some(item => item.id === "codex-cloud-bugfix"));
  assert.ok(searchKnowledge("Salesforce", "Claude Cowork", "workflow", "corporate", true).some(item => item.id === "cowork-account-research"));
  assert.deepEqual(searchKnowledge("Salesforce", "ChatGPT", "workflow", "personal", true), []);
  assert.ok(searchKnowledge("", "all", "all").some(item => item.id === "power-bi-variance-review"));
});

test("compact LLM discovery preserves trust metadata and resolves to exactly one canonical brief", () => {
  const site = "https://example.test/sintra-ai";
  const full = buildKnowledgeExport(site, "2026-10-18T00:00:00Z");
  const index = buildKnowledgeIndex(site, full.generatedAt);
  assert.equal(index.count, full.count);
  assert.ok(JSON.stringify(index).length < JSON.stringify(full).length * 0.6);
  for (const entry of index.data) {
    const matches = full.data.filter(item => item.id === entry.id);
    assert.equal(matches.length, 1);
    const record = matches[0];
    for (const key of ["resourceUrl", "url", "reviewedAt", "reviewDueAt", "executionStatus", "evidenceLevel"] as const) assert.deepEqual(entry[key], record[key]);
    assert.deepEqual(entry.sourceUrls, record.sources.map(source => source.url));
    assert.deepEqual(entry.audiences, record.audiences ?? []);
    assert.equal(entry.skillUrl, record.skillUrl);
    assert.ok(!("steps" in entry), "discovery should not eagerly load procedures");
  }
});

test("dated provider updates keep original dates and connect news to canonical workflows", () => {
  for (const brief of ASSISTANT_KNOWLEDGE.filter(item => item.news)) {
    const news = AI_NEWS.filter(item => item.url === brief.sources[0].url);
    assert.equal(news.length, 1, `duplicate news for ${brief.id}`);
    assert.equal(news[0].knowledgeId, brief.id);
    assert.equal(news[0].origin, "primary-checked");
    assert.equal(news[0].checkedAt, brief.reviewedAt);
    const [year, month, day] = brief.news!.publishedAt.split("-").map(Number);
    assert.equal(news[0].dateNum, year * 100 + month);
    assert.equal(news[0].dateDay, day);
  }
  for (const brief of ASSISTANT_KNOWLEDGE) {
    assert.equal(brief.executionStatus, "not-run-in-sintra");
    assert.ok(brief.audiences?.length);
    assert.equal(KNOWLEDGE.filter(item => item.id === brief.id).length, 1);
    if (brief.kind === "case-study") assert.equal(brief.news, undefined);
  }
});

test("existing topic hubs discover canonical briefs without parallel topic copies", async () => {
  const { TOPIC_HUBS, getTopicContent } = await import("../../src/lib/topicsData");
  for (const [slug, id] of [["openai", "chatgpt-source-learning"], ["anthropic", "cowork-file-organization"], ["coding", "claude-code-bugfix"], ["enterprise", "cowork-account-research"]]) {
    const topic = TOPIC_HUBS.find(item => item.slug === slug)!;
    const content = getTopicContent(topic);
    assert.equal(content.knowledge.filter(item => item.id === id).length, 1);
    assert.ok(content.knowledge.every(item => KNOWLEDGE.some(record => record.id === item.id)));
    assert.ok(content.prompts.length || content.news.length || content.tools.length);
  }
});

test("weekly picks resolve to checked knowledge and retain the previous edition as history", async () => {
  const { THIS_WEEK, WEEKLY_ARCHIVE } = await import("../../src/lib/featuredData");
  assert.ok(WEEKLY_ARCHIVE.some(edition => edition.weekOf === "6 Jul 2026"));
  assert.ok(!WEEKLY_ARCHIVE.some(edition => edition.weekOf === THIS_WEEK.weekOf));
  for (const pick of THIS_WEEK.items) {
    const record = KNOWLEDGE.find(item => pick.href === `/knowledge/${item.id}/`);
    assert.ok(record && record.sources.length && record.reviewedAt);
    assert.equal(record.title, pick.title);
  }
});
