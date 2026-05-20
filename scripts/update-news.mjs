#!/usr/bin/env node
/**
 * Fetches recent AI news via Claude + web search and appends new items to newsData.ts.
 * Runs daily in CI. Safe to run manually — won't duplicate existing IDs.
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "../src/lib/newsData.ts");

const client = new Anthropic();

// Compute search window: start from latest item date in DB or 14 days ago, whichever is more recent
const source = readFileSync(DATA_FILE, "utf8");
const existingIds = new Set([...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]));
const existingTitles = [...source.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]).slice(-20);
const dateNums = [...source.matchAll(/dateNum:\s*(\d+)/g)].map((m) => parseInt(m[1]));
const latestDateNum = Math.max(...dateNums);
const latestYear = Math.floor(latestDateNum / 100);
const latestMonth = (latestDateNum % 100) - 1; // 0-indexed for Date

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);
// Search from the 1st of the latest month already in DB (so we catch any remaining items that month)
const dbFrom = new Date(Date.UTC(latestYear, latestMonth, 1));
const windowFrom = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000); // 14-day fallback
const sinceDate = dbFrom > windowFrom ? windowFrom : dbFrom;
const sinceStr = sinceDate.toISOString().slice(0, 10);

const SYSTEM = `You maintain an AI news database for a developer-focused site called Sintra Tesseract.
Your job is to find real, factual, verifiable AI news events and output them as structured JSON.
Only include genuinely significant events: major model releases, landmark benchmarks, key product launches, or important industry events.
Accuracy is critical — never fabricate URLs or statistics. If a detail is uncertain, omit it rather than guess.
Output ONLY a valid JSON array. No markdown fences, no explanation, no preamble.`;

const USER = `Search the web for significant AI news events published between ${sinceStr} and ${todayStr}.

Focus on:
- New model releases or major updates (GPT, Claude, Gemini, LLaMA, Mistral, DeepSeek, Grok, etc.)
- Record-breaking benchmark scores (SWE-bench, GPQA, ARC-AGI, MMLU, AIME, etc.)
- Major product launches (agents, APIs, tools, platforms)
- Key industry events (acquisitions, funding rounds, regulation, partnerships)

Companies to cover: OpenAI, Anthropic, Google/DeepMind, Meta, Microsoft, Apple, Mistral AI, DeepSeek, xAI, Nvidia, Cohere, and others.

IDs already in the database — DO NOT return items matching these IDs:
${[...existingIds].slice(-40).join(", ")}

Recent titles already covered — avoid returning items about the same events:
${existingTitles.map(t => `"${t}"`).join("\n")}

For each NEW significant event found, return a JSON object with these exact fields:
{
  "id": "kebab-case-unique-id",
  "date": "Mon YYYY",
  "dateNum": YYYYMM,
  "dateDay": DD,
  "title": "Concise factual title — max 12 words",
  "summary": "2-3 sentences. Factual. Include specific numbers and benchmark scores where available. No marketing language.",
  "tags": ["Company", "ModelName", "Feature", "Category"],
  "significance": "landmark or major or notable",
  "provider": "Company Name",
  "providerColor": "#hexcolor",
  "url": "https://official-announcement-url"
}

Provider hex colors:
OpenAI=#10a37f · Anthropic=#d97706 · Google=#4285f4 · Meta=#0866ff
Microsoft=#0078d4 · Apple=#555555 · Mistral AI=#ff7000 · DeepSeek=#1a73e8
xAI=#000000 · Nvidia=#76b900

Significance guide:
- landmark: changes the trajectory of the field (max 2-3 per year — be very selective)
- major: significant release or event most AI practitioners should know
- notable: worth tracking but not world-changing

IMPORTANT for the url field:
- Use the ACTUAL official announcement URL you found via web search
- Prefer: openai.com/index/..., anthropic.com/news/..., blog.google/..., ai.meta.com/blog/...
- Only include url if you actually found and verified the page exists
- Omit the url field entirely if you cannot confirm the exact URL

Return ONLY a valid JSON array (no markdown, no extra text). If nothing new was found, return [].`;

function escapeStr(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .replace(/\r/g, "");
}

function itemToTs(item) {
  const tags = item.tags.map((t) => `"${escapeStr(t)}"`).join(", ");
  const dayLine = item.dateDay ? `\n    dateDay: ${item.dateDay},` : "";
  const urlLine = item.url ? `\n    url: "${escapeStr(item.url)}",` : "";
  return `  {
    id: "${escapeStr(item.id)}",
    date: "${escapeStr(item.date)}",
    dateNum: ${item.dateNum},${dayLine}
    title: "${escapeStr(item.title)}",
    summary:
      "${escapeStr(item.summary)}",
    tags: [${tags}],
    significance: "${item.significance}",
    provider: "${escapeStr(item.provider)}",
    providerColor: "${escapeStr(item.providerColor)}",${urlLine}
  },`;
}

async function main() {
  console.log(`Searching for AI news from ${sinceStr} to ${todayStr} (latest DB dateNum: ${latestDateNum})...`);

  let response;
  try {
    response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      system: SYSTEM,
      messages: [{ role: "user", content: USER }],
    });
  } catch (err) {
    console.error("Anthropic API error:", err.message);
    process.exit(1);
  }

  // Collect all text blocks (web search results are tool_use/tool_result blocks; final answer is text)
  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  if (!text.trim()) {
    console.log("No text output from model — stop_reason:", response.stop_reason);
    process.exit(0);
  }

  // Strip accidental markdown fences, then parse JSON
  const cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  let items;
  try {
    items = JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error("Could not parse JSON from model output:");
      console.error(text.slice(0, 800));
      process.exit(1);
    }
    try {
      items = JSON.parse(match[0]);
    } catch (e2) {
      console.error("JSON parse error:", e2.message);
      console.error(match[0].slice(0, 400));
      process.exit(1);
    }
  }

  if (!Array.isArray(items) || items.length === 0) {
    console.log("No new items returned by model.");
    process.exit(0);
  }

  console.log(`Model returned ${items.length} candidate item(s). Validating...`);

  const VALID_SIG = new Set(["landmark", "major", "notable"]);

  const newItems = items.filter((item) => {
    if (!item.id || typeof item.id !== "string") {
      console.warn("  SKIP: missing id →", JSON.stringify(item).slice(0, 80));
      return false;
    }
    if (existingIds.has(item.id)) {
      console.log(`  SKIP duplicate id: ${item.id}`);
      return false;
    }
    if (!item.title) { console.warn(`  SKIP ${item.id}: missing title`); return false; }
    if (!item.date)  { console.warn(`  SKIP ${item.id}: missing date`);  return false; }
    if (!item.summary) { console.warn(`  SKIP ${item.id}: missing summary`); return false; }
    if (!item.provider) { console.warn(`  SKIP ${item.id}: missing provider`); return false; }
    if (!VALID_SIG.has(item.significance)) {
      console.warn(`  SKIP ${item.id}: invalid significance "${item.significance}"`);
      return false;
    }
    if (typeof item.dateNum !== "number" || !/^\d{6}$/.test(String(item.dateNum))) {
      console.warn(`  SKIP ${item.id}: invalid dateNum ${item.dateNum}`);
      return false;
    }
    if (item.url && (typeof item.url !== "string" || !item.url.startsWith("https://"))) {
      console.warn(`  WARN ${item.id}: stripping invalid url "${item.url}"`);
      delete item.url;
    }
    if (item.dateDay !== undefined && (typeof item.dateDay !== "number" || item.dateDay < 1 || item.dateDay > 31)) {
      console.warn(`  WARN ${item.id}: stripping invalid dateDay ${item.dateDay}`);
      delete item.dateDay;
    }
    console.log(`  OK  ${item.id} (${item.significance})`);
    return true;
  });

  if (newItems.length === 0) {
    console.log("All returned items are duplicates or invalid — nothing to write.");
    process.exit(0);
  }

  const tsEntries = newItems.map(itemToTs).join("\n");
  const dateComment = `\n  // ── Auto-updated ${todayStr} ────────────────────────────────────────────\n\n`;

  const insertPoint = source.lastIndexOf("];");
  if (insertPoint === -1) {
    console.error("FATAL: could not find closing ]; in newsData.ts");
    process.exit(1);
  }

  const updated =
    source.slice(0, insertPoint) +
    dateComment +
    tsEntries +
    "\n" +
    source.slice(insertPoint);

  writeFileSync(DATA_FILE, updated, "utf8");
  console.log(`\n✓ Wrote ${newItems.length} new item(s) to newsData.ts:`);
  newItems.forEach((i) => console.log(`  • ${i.id}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
