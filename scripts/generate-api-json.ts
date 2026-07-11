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

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";
const outDir = join(__dirname, "../public/api");
mkdirSync(outDir, { recursive: true });

function write(name: string, data: unknown) {
  const payload = {
    source: "https://github.com/joaoccaldas/sintra-ai",
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
write("tools", AI_TOOLS.map(t => ({ ...t, url: `${SITE_URL}/tools/${t.id}/` })));
write("models", AI_MODELS.map(m => ({ ...m, url: `${SITE_URL}/models/` })));
write("use-cases", USE_CASES.map(u => ({
  id: u.id, slug: u.slug, title: u.title, category: u.category, difficulty: u.difficulty,
  tags: u.tags, outcome: u.outcome, tools: u.tools, est_time: u.est_time,
  url: `${SITE_URL}/prompts/${u.slug}/`,
})));
