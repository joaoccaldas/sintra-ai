#!/usr/bin/env node
/**
 * Brazil-first ingestion: fetch a fixed, transparent publisher registry.
 * Stores publisher excerpts ONLY. AI rewriting, translation and publication
 * are separate, revision-bound editorial workflows, never implied by RSS.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BRAZIL_SOURCES } from "./br-news-sources.mjs";
import { extractRssItems, selectBrazilNews } from "./br-news-core.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "../src/data/brNews.generated.json");
const maxResponseBytes = 2_000_000;

async function collect(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(source.feedUrl, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml", "User-Agent": "SintraAI-BrRadar/0.1 (+https://joaoccaldas.github.io/sintra-ai)" },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!response.ok) throw new Error("upstream HTTP " + response.status);
    const size = Number(response.headers.get("content-length") || 0);
    if (size > maxResponseBytes) throw new Error("source content too large");
    const body = await response.text();
    if (body.length > maxResponseBytes) throw new Error("source body too large");
    const rows = extractRssItems(body, source);
    if (!rows.length) throw new Error("no RSS items parsed");
    console.log("[br-news] " + source.id + ": " + rows.length + " raw records");
    return { source: source.id, status: "ok", rows };
  } catch (error) {
    console.warn("[br-news] " + source.id + ": " + String(error.message || error));
    return { source: source.id, status: "failed", rows: [] };
  } finally {
    clearTimeout(timeout);
  }
}

const existing = JSON.parse(readFileSync(out, "utf8"));
const collected = await Promise.all(BRAZIL_SOURCES.map(collect));
const items = selectBrazilNews(collected.flatMap(result => result.rows));
const healthy = collected.filter(result => result.status === "ok").length;
if (healthy === 0) {
  // Preserve original fetched/reviewed time. Do not repaint old information
  // as fresh when both live sources are unavailable.
  console.warn("[br-news] zero healthy publishers; preserving original snapshot as stale");
  if (!Array.isArray(existing.items)) process.exitCode = 1;
} else {
  const snapshot = {
    schemaVersion: "1.0",
    generatedAt: new Date().toISOString(),
    status: healthy === BRAZIL_SOURCES.length ? "ok" : "degraded",
    sourceHealth: collected.map(({ source, status }) => ({ source, status })),
    itemCount: items.length,
    items,
  };
  writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  console.log("[br-news] wrote " + items.length + " AI-relevant publisher excerpts; status=" + snapshot.status);
}
