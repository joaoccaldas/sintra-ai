// Writes a stable, versioned, directly-fetchable JSON mirror of every content
// type under /api/*.json — for agents and scripts that want structured data
// without parsing rendered HTML. Sintra has no backend (static export), so
// these are pre-built at compile time rather than served dynamically; that
// means they're only as fresh as the last deploy, same as every other page.
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { USE_CASES } from "../src/lib/data.js";
import { CONCEPTS } from "../src/lib/concepts.js";
import { GUIDES } from "../src/lib/guidesData.js";
import { TOPIC_HUBS } from "../src/lib/topicHubs.js";
import { AI_TOOLS } from "../src/lib/toolsData.js";
import { AI_MODELS } from "../src/lib/modelsData.js";

import { buildKnowledgeExport, buildKnowledgeIndex, buildUseCaseExport } from "../src/lib/knowledgeExport.js";
import { buildVarianceExport } from "../src/lib/varianceExport.js";
import { varianceCsv, VARIANCE_DAX, VARIANCE_IMPORT } from "../src/lib/varianceWorkflow.js";
import { buildKnowledgeSkill } from "./knowledge-skills.js";
import { KNOWLEDGE } from "../src/lib/knowledgeData.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";
const outDir = join(__dirname, "../public/api");
mkdirSync(outDir, { recursive: true });

function write(name: string, data: unknown) {
  const payload = {
    schemaVersion: "1.1",
    source: "https://github.com/joaoccaldas/sintra-ai",
    freshness: "generatedAt is file assembly time, not source verification. Inspect per-record review dates; missing dates mean unknown.",
    siteUrl: SITE_URL,
    generatedAt: new Date().toISOString(),
    count: Array.isArray(data) ? data.length : undefined,
    data,
  };
  const path = join(outDir, `${name}.json`);
  writeFileSync(path, JSON.stringify(payload, null, 2));
  console.log(`✓ api/${name}.json written (${data && Array.isArray(data) ? data.length : "?"} items)`);
}

write("concepts", CONCEPTS.map(c => ({ ...c, url: `${SITE_URL}/concepts/${c.id}/` })));
write("guides", GUIDES.map(g => ({ ...g, url: `${SITE_URL}/guides/${g.slug}/` })));
write("topics", TOPIC_HUBS.map(t => ({ ...t, url: `${SITE_URL}/topics/${t.slug}/` })));
write("tools", AI_TOOLS.map(t => ({ ...t, providerUrl: t.url, url: `${SITE_URL}/tools/${t.id}/` })));
write("models", AI_MODELS.map(m => ({ ...m, url: `${SITE_URL}/models/` })));
write("use-cases", buildUseCaseExport(USE_CASES, SITE_URL));

const knowledge = buildKnowledgeExport(SITE_URL, new Date().toISOString());
writeFileSync(join(outDir, "knowledge-index.json"), JSON.stringify(buildKnowledgeIndex(SITE_URL, knowledge.generatedAt), null, 2));
const skillRecords = KNOWLEDGE.filter(record => record.replication);
for (const record of skillRecords) {
  const directory = join(__dirname, "../public/skills", record.id);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "SKILL.md"), buildKnowledgeSkill(record, SITE_URL));
}
write("skills", skillRecords.map(record => ({ id: record.id, title: record.title, environment: record.replication!.environment, executionStatus: record.executionStatus, reviewedAt: record.reviewedAt, reviewDueAt: record.reviewDueAt, skillUrl: `${SITE_URL}/skills/${record.id}/SKILL.md`, resourceUrl: `${SITE_URL}/api/knowledge/${record.id}.json` })));
const variance = buildVarianceExport(SITE_URL);
mkdirSync(join(outDir, "workflows"), { recursive: true });
for (const [extension, value] of Object.entries({ json: JSON.stringify(variance, null, 2), csv: varianceCsv(), dax: VARIANCE_DAX, pq: VARIANCE_IMPORT })) {
  writeFileSync(join(outDir, "workflows", `power-bi-variance.${extension}`), value);
}
writeFileSync(join(outDir, "knowledge.json"), JSON.stringify(knowledge, null, 2));
mkdirSync(join(outDir, "knowledge"), { recursive: true });
for (const record of knowledge.data) {
  writeFileSync(join(outDir, "knowledge", `${record.id}.json`), JSON.stringify({ ...knowledge, count: 1, data: [record] }, null, 2));
}
writeFileSync(join(outDir, "index.json"), JSON.stringify({
  schemaVersion: "1.0", siteUrl: SITE_URL, generatedAt: knowledge.generatedAt,
  access: { transport: "static HTTPS GET", authentication: "none", mcpServer: false },
  policy: knowledge.policy,
  retrieval: [
    "Fetch this manifest, then choose one resource. JSON endpoints are static files, not query APIs.",
    "Filter knowledge data by id, tags or kind locally; use resourceUrl for a smaller single-brief response.",
    "Keep sourceIds, review dates, evidenceLevel and limitations with retrieved claims.",
    "For live tenant data, connect the documented provider MCP separately; Sintra contains public reference material only.",
  ],
  resources: [
    { id: "knowledge-index", url: `${SITE_URL}/api/knowledge-index.json`, contains: "Compact discovery: titles, audiences, tags, provenance, dates and links to individual full briefs. Start here, then retrieve only the relevant record.", count: knowledge.count },
    { id: "skills", url: `${SITE_URL}/api/skills.json`, contains: "Replication guide index with portable SKILL.md instructions. App execution is untested unless explicitly stated; use the named environment and existing access.", count: skillRecords.length },
    { id: "power-bi-variance", url: variance.resourceUrl, contains: "Synthetic fixture, reconciled result, DAX and Power Query, HoldingCo / Finance AI Lab receipt; live Power BI execution untested" },
    { id: "knowledge", url: `${SITE_URL}/api/knowledge.json`, contains: "Full cited ChatGPT, Claude Code, Cowork, Office, finance and MCP briefs, example procedures, prompts, checks and limitations", count: knowledge.count },
    { id: "use-cases", url: `${SITE_URL}/api/use-cases.json`, contains: "Complete prompt library including inputs, prompt text and sample outputs; examples, not execution evidence" },
    { id: "models", url: `${SITE_URL}/api/models.json`, contains: "Model specifications with individual lastVerified dates; currentSnapshot identifies the newly checked Claude lineup" },
    ...["tools", "topics", "concepts", "guides"].map(id => ({ id, url: `${SITE_URL}/api/${id}.json`, contains: "Reference collection; review source dates before relying on volatile claims" })),
    { id: "news", url: `${SITE_URL}/feed.json`, contains: "Recent news with _sintra provenance; feed publication does not imply verification" },
  ],
}, null, 2));
console.log(`✓ knowledge collection, ${knowledge.count} individual briefs and agent manifest written`);
