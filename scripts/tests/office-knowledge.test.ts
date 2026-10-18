import assert from "node:assert/strict";
import test from "node:test";
import { KNOWLEDGE, searchKnowledge } from "../../src/lib/knowledgeData";
import { buildKnowledgeExport } from "../../src/lib/knowledgeExport";
import { USE_CASES } from "../../src/lib/data";
import { buildKnowledgeSkill } from "../knowledge-skills";

test("replication guides reuse existing prompt identities and preserve execution boundaries", () => {
  const skills = KNOWLEDGE.filter(record => record.replication);
  const slugs = new Set(USE_CASES.map(record => record.slug));
  assert.equal(skills.length, 23);
  assert.equal(KNOWLEDGE.length, 38);
  assert.equal(USE_CASES.length, 256);
  for (const record of skills) {
    const guide = record.replication!;
    assert.equal(record.kind, "workflow");
    assert.equal(record.executionStatus, "not-run-in-sintra");
    assert.ok(guide.environment && guide.useWhen && guide.timeEstimate.includes("estimate"));
    assert.ok(guide.inputs.length >= 2 && guide.launch.length >= 2);
    assert.ok(guide.practice.task && guide.practice.expected);
    assert.ok(guide.acceptanceTests.length >= 2 && guide.troubleshooting.length >= 2);
    assert.ok(guide.relatedPrompts.length);
    for (const slug of guide.relatedPrompts) assert.ok(slugs.has(slug), `${record.id}: missing existing prompt ${slug}`);
  }
});

test("LLMs can follow each brief to the same source-backed portable instructions", () => {
  const site = "https://example.test/sintra-ai";
  const exported = buildKnowledgeExport(site, "2026-10-18T00:00:00Z");
  for (const record of KNOWLEDGE.filter(record => record.replication)) {
    const json = exported.data.find(item => item.id === record.id)!;
    assert.equal(json.skillUrl, `${site}/skills/${record.id}/SKILL.md`);
    const expected = structuredClone(record.replication!);
    if (expected.practice.resourceUrl) expected.practice.resourceUrl = site + expected.practice.resourceUrl;
    assert.deepEqual(json.replication, expected);
    const markdown = buildKnowledgeSkill(record, site);
    for (const source of record.sources) assert.ok(markdown.includes(source.url), "skill lost source citation");
    for (const step of record.steps) assert.ok(markdown.includes(step), "skill lost a procedure step");
    assert.ok(markdown.includes(record.executionStatus));
    assert.ok(markdown.includes(record.replication!.practice.expected));
    assert.ok(markdown.includes(`${site}/knowledge/${record.id}/`));
    assert.ok(!markdown.includes("/Users/"));
  }
  assert.throws(() => buildKnowledgeSkill(KNOWLEDGE.find(item => item.id === "power-bi-mcp")!, site), /No replication/);
});

test("Office product routes and case studies retain the distinction between reported and tested", () => {
  assert.ok(searchKnowledge("PowerPoint", "Microsoft 365", "workflow").some(item => item.id === "copilot-powerpoint-source-slide"));
  assert.ok(searchKnowledge("Excel", "Claude", "workflow").some(item => item.id === "claude-excel-model-audit"));
  const slide = KNOWLEDGE.find(item => item.id === "copilot-powerpoint-source-slide")!;
  assert.ok(slide.facts.some(fact => fact.text.includes("coming soon to Agent Mode")));
  for (const id of ["crunched-excel-case-study", "softcat-copilot-case-study"]) {
    const item = KNOWLEDGE.find(record => record.id === id)!;
    assert.equal(item.kind, "case-study");
    assert.equal(item.evidenceLevel, "provider-case-study");
    assert.equal(item.executionStatus, "not-run-in-sintra");
    assert.equal(item.news, undefined, "historical customer stories are not newly dated product news");
  }
});
