/**
 * Export Sintra Tesseract's structured content into an Obsidian-flavoured
 * markdown vault: one note per item, YAML frontmatter, #tags, and [[wikilinks]]
 * that form a knowledge graph any file-reading agent (Claude Code, local
 * tooling) can traverse.
 *
 *   npm run export:obsidian            # writes ./obsidian-vault
 *   OBSIDIAN_OUT=/path/to/vault npm run export:obsidian
 *
 * Re-run any time to refresh — it's driven by the same data the site uses, so
 * it stays in sync with the daily /update-news task.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

import { USE_CASES } from "../src/lib/data";
import { AI_TOOLS } from "../src/lib/toolsData";
import { CONCEPTS } from "../src/lib/concepts";
import { AI_NEWS } from "../src/lib/newsDataCombined";
import { LEARNING_PATHS } from "../src/lib/learningPathsData";
import { RESOURCES } from "../src/lib/resourcesData";
import { AI_LABS } from "../src/lib/aiLabsData";
import { MILESTONES } from "../src/lib/timelineData";

import { sanitizeFilename, wikilink, slugTag, note, uniq, type FrontmatterValue } from "./obsidian-lib";

const SITE = "https://joaoccaldas.github.io/sintra-ai";
const OUT = process.env.OBSIDIAN_OUT || join(process.cwd(), "obsidian-vault");

// ── lookups for cross-linking ────────────────────────────────────────────────
const toolById = new Map(AI_TOOLS.map(t => [t.id, t]));
const toolNames = new Set(AI_TOOLS.map(t => t.name));
const conceptById = new Map(CONCEPTS.map(c => [c.id, c]));

let fileCount = 0;
function write(folder: string, title: string, content: string) {
  const dir = join(OUT, folder);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${sanitizeFilename(title)}.md`), content);
  fileCount++;
}

const tags = (type: string, extra: string[] = []) =>
  uniq([type, ...extra.map(slugTag)].filter(Boolean));

// ── Prompts ──────────────────────────────────────────────────────────────────
function exportPrompts() {
  for (const p of USE_CASES) {
    const linkedTools = uniq([
      ...(p.related_tools ?? []).map(id => toolById.get(id)?.name).filter((n): n is string => Boolean(n)),
      ...p.tools.filter(n => toolNames.has(n)),
    ]);
    const fm: Record<string, FrontmatterValue> = {
      title: p.title,
      type: "prompt",
      category: p.category,
      difficulty: p.difficulty,
      tools: p.tools,
      best_llm: p.best_llm,
      est_time: p.est_time,
      output_kind: p.output_kind,
      source: p.source,
      added: p.dateAdded,
      url: `${SITE}/prompts/${p.slug}/`,
      tags: tags("prompt", [p.category, p.difficulty, ...p.tags]),
    };
    const runIt = [
      `- Recommended model: **${p.best_llm}** — try it free, no login, via the Sintra "Try free" runner.`,
      linkedTools.length ? `- Tools: ${linkedTools.map(n => wikilink(n)).join(" · ")}` : "",
    ].filter(Boolean).join("\n");
    const body = [
      `> ${p.outcome || p.desc}`,
      `**Category:** ${p.category} · **Difficulty:** ${p.difficulty} · **Est. time:** ${p.est_time} · **Output:** ${p.output_kind}`,
      "## Prompt\n\n```text\n" + p.prompt + "\n```",
      p.inputs.length ? "## Inputs to fill\n\n" + p.inputs.map(i => `- ${i.label}`).join("\n") : "",
      "## Run it\n\n" + runIt,
      `[Open on Sintra](${SITE}/prompts/${p.slug}/)` + (p.source ? `  ·  Source: ${p.source}` : ""),
    ].filter(Boolean).join("\n\n");
    write("Prompts", p.title, note(fm, body));
  }
}

// ── Tools ────────────────────────────────────────────────────────────────────
function exportTools() {
  for (const t of AI_TOOLS) {
    const fm: Record<string, FrontmatterValue> = {
      title: t.name,
      type: "tool",
      category: t.category,
      provider: t.provider,
      pricing: t.pricing,
      status: t.status,
      url: t.url,
      tags: tags("tool", [t.category, t.pricing, ...t.tags]),
    };
    const body = [
      `> ${t.tagline}`,
      t.description,
      t.highlight ? `**Highlight:** ${t.highlight}` : "",
      `**Pricing:** ${t.pricing} — ${t.priceNote}`,
      `**Provider:** ${t.provider} · **Status:** ${t.status}`,
      `[Visit ${t.name}](${t.url})`,
    ].filter(Boolean).join("\n\n");
    write("Tools", t.name, note(fm, body));
  }
}

// ── Concepts ─────────────────────────────────────────────────────────────────
function exportConcepts() {
  for (const c of CONCEPTS) {
    const related = c.related.map(id => conceptById.get(id)?.term).filter((x): x is string => Boolean(x));
    const fm: Record<string, FrontmatterValue> = {
      title: c.term,
      type: "concept",
      aliases: c.shortTerm ? [c.shortTerm] : undefined,
      category: c.category,
      difficulty: c.difficulty,
      added: c.addedAt,
      tags: tags("concept", [c.category]),
    };
    const body = [
      `${c.icon} *${c.tagline}*`,
      c.body,
      `**Analogy:** ${c.analogy}`,
      related.length ? `**Related:** ${related.map(t => wikilink(t)).join(" · ")}` : "",
      c.learnMore ? `[Learn more](${c.learnMore})` : "",
      `[Open on Sintra](${SITE}/concepts/#${c.id})`,
    ].filter(Boolean).join("\n\n");
    write("Concepts", c.term, note(fm, body));
  }
}

// ── News ─────────────────────────────────────────────────────────────────────
function newsDate(dateNum: number, dateDay?: number) {
  const year = Math.floor(dateNum / 100);
  const month = String(dateNum % 100).padStart(2, "0");
  const day = dateDay ? String(dateDay).padStart(2, "0") : undefined;
  const iso = day ? `${year}-${month}-${day}` : `${year}-${month}`;
  return { iso, prefix: `${year}-${month}-${day ?? "00"}` };
}
function exportNews() {
  for (const n of AI_NEWS) {
    const { iso, prefix } = newsDate(n.dateNum, n.dateDay);
    const fm: Record<string, FrontmatterValue> = {
      title: n.title,
      type: "news",
      date: iso,
      provider: n.provider,
      significance: n.significance,
      country: n.country,
      url: n.url,
      tags: tags("news", [n.provider, ...(n.country ? [n.country] : []), ...n.tags]),
    };
    const body = [
      `**${n.date}** · ${n.provider} · _${n.significance}_`,
      n.summary,
      n.why_it_matters ? `**Why it matters:** ${n.why_it_matters}` : "",
      n.what_to_try ? `**What to try:** ${n.what_to_try}` : "",
      n.url ? `[Source](${n.url})` : "",
    ].filter(Boolean).join("\n\n");
    write("News", `${prefix} ${n.title}`, note(fm, body));
  }
}

// ── Learning paths ───────────────────────────────────────────────────────────
function exportLearningPaths() {
  for (const lp of LEARNING_PATHS) {
    const fm: Record<string, FrontmatterValue> = {
      title: lp.title,
      type: "learning-path",
      level: lp.level,
      audience: lp.audience,
      duration: lp.totalDuration,
      tags: tags("learning-path", [lp.level]),
    };
    const steps = lp.steps
      .map((s, i) => `${i + 1}. **${s.label}** (${s.type}, ${s.duration}) — ${s.desc}`)
      .join("\n");
    const body = [`${lp.emoji} *${lp.tagline}*`, `**Audience:** ${lp.audience} · **Level:** ${lp.level} · **Duration:** ${lp.totalDuration}`, "## Steps\n\n" + steps].join("\n\n");
    write("Learning Paths", lp.title, note(fm, body));
  }
}

// ── Resources ────────────────────────────────────────────────────────────────
function exportResources() {
  for (const r of RESOURCES) {
    const fm: Record<string, FrontmatterValue> = {
      title: r.name,
      type: "resource",
      category: r.category,
      free: r.free,
      url: r.url,
      tags: tags("resource", [r.category, ...r.tags]),
    };
    const body = [`> ${r.tagline}`, r.highlight ? r.highlight : "", `**Free:** ${r.free ? "yes" : "no"}`, `[Open resource](${r.url})`].filter(Boolean).join("\n\n");
    write("Resources", r.name, note(fm, body));
  }
}

// ── AI labs ──────────────────────────────────────────────────────────────────
function exportLabs() {
  for (const l of AI_LABS) {
    const fm: Record<string, FrontmatterValue> = {
      title: l.name,
      type: "lab",
      lab_type: l.type,
      founded: l.founded,
      hq: l.hq,
      website: l.website,
      focus: l.focus,
      tags: tags("lab", [l.type, ...l.focus]),
    };
    const body = [
      `${l.emoji} *${l.tagline}*`,
      l.description,
      `**Founded:** ${l.founded} · **HQ:** ${l.hq} · **Type:** ${l.type}`,
      l.models.length ? `## Models\n\n` + l.models.map(m => `- **${m.name}** (${m.type})${m.highlight ? ` — ${m.highlight}` : ""}`).join("\n") : "",
      l.products.length ? `## Products\n\n` + l.products.map(p => `- ${p}`).join("\n") : "",
      `[Visit ${l.name}](${l.website})`,
    ].filter(Boolean).join("\n\n");
    write("Labs", l.name, note(fm, body));
  }
}

// ── Timeline / milestones ────────────────────────────────────────────────────
function exportTimeline() {
  for (const m of MILESTONES) {
    const fm: Record<string, FrontmatterValue> = {
      title: m.title,
      type: "milestone",
      year: m.year,
      era: m.era,
      by: m.by,
      tags: tags("milestone", [m.era, ...m.tags]),
    };
    const links = (m.links ?? []).map(l => `- [${l.label}](${l.url})`).join("\n");
    const body = [`${m.emoji} **${m.year}**${m.by ? ` · ${m.by}` : ""}`, m.desc, `**Why it mattered:** ${m.significance}`, links ? `## Links\n\n${links}` : ""].filter(Boolean).join("\n\n");
    write("Timeline", `${String(m.yearNum)} ${m.title}`, note(fm, body));
  }
}

// ── Maps of Content + README ─────────────────────────────────────────────────
function moc(folder: string, title: string, items: string[]) {
  const list = items.map(t => `- ${wikilink(t)}`).sort().join("\n");
  write(folder, `_${title}`, note({ title, type: "moc", tags: ["moc"] }, `# ${title} (${items.length})\n\n${list}`));
}

function exportIndexes() {
  moc("Prompts", "Prompts", USE_CASES.map(p => p.title));
  moc("Tools", "Tools", AI_TOOLS.map(t => t.name));
  moc("Concepts", "Concepts", CONCEPTS.map(c => c.term));
  moc("Learning Paths", "Learning Paths", LEARNING_PATHS.map(l => l.title));
  moc("Resources", "Resources", RESOURCES.map(r => r.name));
  moc("Labs", "Labs", AI_LABS.map(l => l.name));

  const root = [
    "# Sintra AI — Knowledge Vault",
    "",
    "Exported from [Sintra Tesseract](" + SITE + "). Re-run `npm run export:obsidian` to refresh.",
    "",
    "## Maps of Content",
    `- ${wikilink("_Prompts", "Prompts")} (${USE_CASES.length})`,
    `- ${wikilink("_Tools", "Tools")} (${AI_TOOLS.length})`,
    `- ${wikilink("_Concepts", "Concepts")} (${CONCEPTS.length})`,
    `- ${wikilink("_Learning Paths", "Learning Paths")} (${LEARNING_PATHS.length})`,
    `- ${wikilink("_Resources", "Resources")} (${RESOURCES.length})`,
    `- ${wikilink("_Labs", "Labs")} (${AI_LABS.length})`,
    `- News (${AI_NEWS.length}) and Timeline (${MILESTONES.length}) — browse the folders or graph view.`,
  ].join("\n");
  writeFileSync(join(OUT, "Sintra AI.md"), note({ title: "Sintra AI", type: "moc", tags: ["moc", "home"] }, root));
  fileCount++;
}

function exportReadme() {
  const body = `# Sintra AI — Obsidian Vault

Generated by \`scripts/export-obsidian.ts\` from the Sintra Tesseract data files.
Every note has YAML frontmatter (\`type\`, \`tags\`, source \`url\`, dates) and
\`[[wikilinks]]\` (prompts → tools, concepts → related concepts) so the graph view
and any file-reading agent can traverse the knowledge base.

## Use it
1. Copy this folder into your Obsidian vault (or open it as a vault).
2. Open **[[Sintra AI]]** as the home note, or use Graph view.
3. Filter by tag: \`#prompt\`, \`#tool\`, \`#concept\`, \`#news\`, \`#lab\`, \`#milestone\`.

## With Claude Code / local agents (e.g. openclaw)
The vault is plain markdown on disk, so point the agent at this folder and it can
read, search, and cite notes natively — no API needed. Good patterns:
- "Summarise every \`#prompt\` tagged \`finance\` and draft a combined SOP."
- "Using the \`#tool\` notes, recommend a stack for FP&A and link the notes."
- Wikilinks let the agent follow relationships (a prompt's tools, a concept's neighbours).

## Refresh
Re-run \`npm run export:obsidian\` (optionally \`OBSIDIAN_OUT=/path/to/vault\`).
Because it reads the same data the site uses — kept current by the daily
\`/update-news\` task — the vault stays in sync.
`;
  writeFileSync(join(OUT, "README.md"), body);
  fileCount++;
}

// ── run ──────────────────────────────────────────────────────────────────────
function main() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  exportPrompts();
  exportTools();
  exportConcepts();
  exportNews();
  exportLearningPaths();
  exportResources();
  exportLabs();
  exportTimeline();
  exportIndexes();
  exportReadme();
  console.log(`Obsidian vault exported to ${OUT}`);
  console.log(
    `  ${fileCount} notes — prompts ${USE_CASES.length}, tools ${AI_TOOLS.length}, ` +
    `concepts ${CONCEPTS.length}, news ${AI_NEWS.length}, paths ${LEARNING_PATHS.length}, ` +
    `resources ${RESOURCES.length}, labs ${AI_LABS.length}, milestones ${MILESTONES.length}`,
  );
}

main();
