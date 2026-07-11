// Generates /llms.txt (a curated, linked index) and /llms-full.txt (the full
// text of every concept, guide, and topic playbook in one file) — the two
// files an AI agent looks for when it wants a structured, text-native map of
// a site instead of scraping rendered HTML. See https://llmstxt.org.
//
// Deliberately does NOT dump the full use-case/tool/model datasets in here —
// those are large, change often, and already have dedicated JSON endpoints
// (see scripts/generate-api-json.ts) and RSS/JSON feeds. This file covers the
// stable "knowledge" content: concepts, guides, and topic playbooks.
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { CONCEPTS } from "../src/lib/concepts.js";
import { GUIDES } from "../src/lib/guidesData.js";
import { TOPIC_HUBS } from "../src/lib/topicHubs.js";
import { AI_NEWS } from "../src/lib/newsDataCombined.js";
import { AI_TOOLS } from "../src/lib/toolsData.js";
import { AI_MODELS } from "../src/lib/modelsData.js";
import { USE_CASES_COUNT } from "../src/lib/useCasesCount.generated.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

const withPlaybook = TOPIC_HUBS.filter(t => t.playbook);
const withoutPlaybook = TOPIC_HUBS.filter(t => !t.playbook);

/* ── llms.txt — curated index ────────────────────────────────────────────── */
const llmsTxt = `# Sintra AI

> A structured, source-backed reference for AI: live signals, verified news, a ${USE_CASES_COUNT}-prompt library, tool and model comparisons, plain-English concepts, and topic playbooks. Built for people and for agents — every page below either has schema.org structured data or a matching JSON endpoint, and topics with a playbook include design principles, a recommended stack, best use cases, common pitfalls, and tips, not just a definition.

## Topic Playbooks
Structured, actionable briefs — start here if you need to *act* on a topic, not just read about it. Each has \`about\` (DefinedTerm), \`hasPart\` ItemLists (design principles / recommended stack / best use cases / common pitfalls), and a \`HowTo\` for tips, all in JSON-LD on the page.
${withPlaybook.map(t => `- [${t.label}](${SITE_URL}/topics/${t.slug}/): ${t.playbook!.whatItIs}`).join("\n")}

## Other Topic Hubs
Aggregated prompts/news/tools/concepts by theme — no authored playbook yet.
${withoutPlaybook.map(t => `- [${t.label}](${SITE_URL}/topics/${t.slug}/): ${t.description}`).join("\n")}

## Concepts
Plain-English AI definitions, each with a real-world analogy and a \`DefinedTerm\` JSON-LD block.
${CONCEPTS.map(c => `- [${c.term}${c.shortTerm ? ` (${c.shortTerm})` : ""}](${SITE_URL}/concepts/${c.id}/): ${c.tagline}`).join("\n")}

## Guides
Step-by-step how-tos, each with \`Article\` + \`FAQPage\` JSON-LD.
${GUIDES.map(g => `- [${g.title}](${SITE_URL}/guides/${g.slug}/): ${g.tagline}`).join("\n")}

## Prompt Library
- [Browse all ${USE_CASES_COUNT} prompts](${SITE_URL}/library/): searchable and filterable by category, difficulty, and tool. Each prompt page (\`/prompts/{slug}/\`) carries \`HowTo\` JSON-LD with the full prompt text, inputs, and a sample output.

## Tools & Models
- [AI Tools Directory](${SITE_URL}/tools/): ${AI_TOOLS.length} tools compared across category, pricing, and provider.
- [Model Radar](${SITE_URL}/models/): ${AI_MODELS.length} models compared across capability tier and release date.

## News & Live Feed
- [AI News](${SITE_URL}/news/): ${AI_NEWS.length} verified items, updated daily, each tagged with a significance rating (landmark / major / notable) and an official source URL.
- [Live Feed](${SITE_URL}/live/): primary-source signals from ~11 feeds (labs, arXiv, major outlets), refreshed every build.
- Syndication: [RSS](${SITE_URL}/feed.xml), [JSON Feed](${SITE_URL}/feed.json)

## Machine-readable data
- [/llms-full.txt](${SITE_URL}/llms-full.txt) — full text of every concept, guide, and topic playbook in one file
- [/api/concepts.json](${SITE_URL}/api/concepts.json), [/api/topics.json](${SITE_URL}/api/topics.json) (includes full playbooks), [/api/guides.json](${SITE_URL}/api/guides.json), [/api/tools.json](${SITE_URL}/api/tools.json), [/api/models.json](${SITE_URL}/api/models.json), [/api/use-cases.json](${SITE_URL}/api/use-cases.json) — structured JSON per content type
- [/agents/](${SITE_URL}/agents/) — how to query this site programmatically, written for the agent reading this file right now
`;

/* ── llms-full.txt — full content dump ───────────────────────────────────── */
const topicBlock = (t: (typeof TOPIC_HUBS)[number]) => {
  const p = t.playbook;
  if (!p) return `## ${t.label}\n\n${t.description}\n`;
  return `## ${t.label}

${p.whatItIs}

### Design Principles
${p.designPrinciples.map(x => `- ${x}`).join("\n")}

### Recommended Stack
${p.recommendedStack.map(x => `- ${x}`).join("\n")}

### Best Use Cases
${p.bestUseCases.map(x => `- ${x}`).join("\n")}

### Common Pitfalls
${p.commonPitfalls.map(x => `- ${x}`).join("\n")}

### Tips
${p.tips.map(x => `- ${x}`).join("\n")}
`;
};

const conceptBlock = (c: (typeof CONCEPTS)[number]) => `## ${c.term}${c.shortTerm ? ` (${c.shortTerm})` : ""}

${c.tagline}

${c.body}

**Analogy:** ${c.analogy}
`;

const guideBlock = (g: (typeof GUIDES)[number]) => `## ${g.title}

${g.tagline}

${g.sections.map(s => `### ${s.heading}\n\n${s.body}${s.tip ? `\n\n**Tip:** ${s.tip}` : ""}`).join("\n\n")}
`;

const llmsFullTxt = `# Sintra AI — Full Reference

> Concatenated full text of every topic playbook, concept, and guide on Sintra AI. Generated at build time from the same source data that powers the site — nothing here is summarized or truncated. For news, tools, models, and the prompt library, use the JSON endpoints linked in /llms.txt instead: those change too often to usefully freeze into a text dump.

# Topic Playbooks

${TOPIC_HUBS.map(topicBlock).join("\n")}

# Concepts

${CONCEPTS.map(conceptBlock).join("\n")}

# Guides

${GUIDES.map(guideBlock).join("\n")}
`;

writeFileSync(join(__dirname, "../public/llms.txt"), llmsTxt);
writeFileSync(join(__dirname, "../public/llms-full.txt"), llmsFullTxt);
console.log(`✓ llms.txt written (${(llmsTxt.length / 1024).toFixed(1)} KB)`);
console.log(`✓ llms-full.txt written (${(llmsFullTxt.length / 1024).toFixed(1)} KB)`);
