#!/usr/bin/env node
/**
 * Validates src/data/useCases.json against the expected UseCase schema.
 * Runs as part of `npm run check` — fails the build on bad data.
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "../src/data/useCases.json");

const VALID_OUTPUT_KINDS = ["analysis", "code", "visual", "spec", "templates", "table", "deck", "plan"];
const VALID_SKILL_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];
const VALID_DOMAINS = [
  "Quick Wins", "Personal Productivity", "Communication & Writing",
  "Research & Analysis", "Finance & FP&A", "Data & Analytics",
  "Software Development", "Creative AI", "Design & Creative", "Game Development",
];

const UseCaseSchema = z.object({
  title:        z.string().min(1, "title must not be empty"),
  prompt:       z.string().min(10, "prompt must be at least 10 chars"),
  domain:       z.string().refine(v => VALID_DOMAINS.includes(v), { message: "unknown domain" }),
  skill_level:  z.string().refine(v => VALID_SKILL_LEVELS.includes(v.toUpperCase()), { message: "invalid skill_level" }),
  outcome:      z.string().min(1, "outcome must not be empty"),
  tags:         z.array(z.string()).min(1, "at least one tag required"),
  tools:        z.array(z.string()).optional().default([]),
  inputs:       z.array(z.object({ label: z.string() })).optional().default([]),
  output_kind:  z.string().refine(v => !v || VALID_OUTPUT_KINDS.includes(v), { message: "invalid output_kind" }).optional(),
  sample_output: z.string().optional(),
  best_llm:     z.string().optional(),
  llm_reason:   z.string().optional(),
  est_time:     z.string().optional(),
  source:         z.string().optional(),
  best_for:       z.string().optional(),
  section:        z.string().optional(),
  skill_emoji:    z.string().optional(),
  dateAdded:      z.string().optional(),
  confidence:     z.enum(["high", "medium", "low"]).optional(),
  region:         z.enum(["global", "brazil", "latam", "us", "eu"]).optional(),
  last_verified:  z.string().optional(),
});

const raw = JSON.parse(readFileSync(DATA_FILE, "utf8"));
const items = Array.isArray(raw) ? raw : raw.use_cases ?? [];

let errors = 0;
const titles = new Set();

items.forEach((item, idx) => {
  const label = `[${idx + 1}] "${item.title ?? "?"}"`;

  // Duplicate title check
  const key = (item.title ?? "").toLowerCase().trim();
  if (key && titles.has(key)) {
    console.error(`  DUPLICATE title ${label}`);
    errors++;
  }
  titles.add(key);

  // Schema check
  const result = UseCaseSchema.safeParse(item);
  if (!result.success) {
    result.error.issues.forEach(issue => {
      console.error(`  INVALID ${label} — ${issue.path.join(".")}: ${issue.message}`);
      errors++;
    });
  }
});

if (errors > 0) {
  console.error(`\n✗ ${errors} validation error(s) in useCases.json`);
  process.exit(1);
} else {
  console.log(`✓ useCases.json valid — ${items.length} items, 0 errors`);
}
