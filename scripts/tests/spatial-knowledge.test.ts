import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { KNOWLEDGE, searchKnowledge } from "../../src/lib/knowledgeData";
import { SPATIAL_KNOWLEDGE } from "../../src/lib/spatialKnowledge";
import { SPATIAL_CATEGORIES } from "../../src/lib/spatialCategories";
import { buildKnowledgeExport, buildKnowledgeIndex, buildKnowledgeBrowseData } from "../../src/lib/knowledgeExport";
import { buildKnowledgeSkill } from "../knowledge-skills";

test("100 distinct 3D procedures share canonical identities, ten areas and explicit unrun status", () => {
  const recipes = SPATIAL_KNOWLEDGE.filter(item => item.spatial);
  assert.equal(recipes.length, 100);
  assert.equal(SPATIAL_KNOWLEDGE.length, 102);
  assert.equal(new Set(recipes.map(item => item.title)).size, 100);
  assert.equal(new Set(recipes.map(item => item.replication!.practice.task)).size, 100);
  assert.equal(new Set(recipes.map(item => item.steps.slice(2, 5).join(" "))).size, 100);
  for (const category of SPATIAL_CATEGORIES) {
    assert.equal(recipes.filter(item => item.spatial!.category === category.id).length, 10);
    assert.ok(recipes.some(item => item.id === category.exampleId));
  }
  for (const item of recipes) {
    assert.equal(KNOWLEDGE.filter(record => record.id === item.id).length, 1);
    assert.equal(item.executionStatus, "not-run-in-sintra");
    assert.equal(item.evidenceLevel, "example-workflow");
    assert.ok(item.replication && item.steps.length >= 6 && item.validation.length >= 3);
    assert.ok(item.prompt?.includes("Claude") || item.steps.some(step => step.includes("Claude Code")));
    assert.ok(item.limitations.some(text => /not a render/.test(text)));
    assert.ok(item.limitations.some(text => /not an executed/.test(text)));
  }
});

test("each recipe has a safe, source-bound, accessible original procedure diagram", () => {
  for (const record of SPATIAL_KNOWLEDGE.filter(item => item.spatial)) {
    const diagram = record.spatial!.diagram;
    assert.match(diagram.url, /^\/visuals\/3d\/[a-z0-9-]+\.svg$/);
    const svg = readFileSync(`public${diagram.url}`, "utf8");
    assert.ok(svg.includes('<title id="title">') && svg.includes('<desc id="desc">'));
    assert.ok(svg.includes("not a render or execution receipt"));
    assert.ok(!/<script|foreignObject|https?:\/\/[^w]|\/Users\//i.test(svg));
    assert.ok(diagram.alt.includes(record.title.toLowerCase()));
    assert.equal(record.replication!.practice.resourceUrl, undefined, "A diagram must not masquerade as downloadable sample data");
    assert.ok(buildKnowledgeSkill(record, "https://example.test").includes(`https://example.test${diagram.url}`));
  }
});

test("3D discovery, full JSON and skills agree while browser records omit procedure bodies", () => {
  const site = "https://example.test/sintra-ai";
  const full = buildKnowledgeExport(site, "2026-10-18T00:00:00Z");
  const index = buildKnowledgeIndex(site, full.generatedAt);
  const browse = buildKnowledgeBrowseData();
  assert.equal(searchKnowledge("", "3D", "workflow", "all", true).length, 100);
  assert.equal(searchKnowledge("", "Space & scientific data", "workflow").length, 10);
  for (const record of SPATIAL_KNOWLEDGE.filter(item => item.spatial)) {
    const exported = full.data.find(item => item.id === record.id)!;
    const compact = index.data.find(item => item.id === record.id)!;
    const browser = browse.find(item => item.id === record.id)!;
    assert.equal(exported.spatial!.diagram.url, site + record.spatial!.diagram.url);
    assert.equal(compact.spatial!.diagramUrl, exported.spatial!.diagram.url);
    assert.equal(compact.spatial!.category, record.spatial!.category);
    assert.equal(browser.hasSkill, true);
    assert.ok(!("steps" in browser) && !("replication" in browser) && !("sources" in browser));
    for (const source of record.sources) assert.ok(buildKnowledgeSkill(record, site).includes(source.url));
    assert.ok(!JSON.stringify(exported).includes("/Users/"));
  }
});

test("connection guidance separates documented community control from private read-only discovery", () => {
  const guide = KNOWLEDGE.find(item => item.id === "3d-mcp-connections")!;
  for (const path of ["ahujasid/mcp-for-blender", "Coding-Solo/godot-mcp", "CoplayDev/unity-mcp"]) {
    assert.ok(guide.sources.some(source => source.url.endsWith(path)));
  }
  assert.ok(guide.limitations.some(text => text.includes("does not host a 3D MCP server")));
  assert.ok(guide.steps.some(text => text.includes("tools") && text.includes("discovery")));
  assert.ok(guide.tips!.some(text => text.includes("not a sandbox")));
  assert.ok(KNOWLEDGE.find(item => item.id === "3d-ar-placement")!.sources.some(source => source.url === "https://immersive-web.github.io/hit-test/"));
});
