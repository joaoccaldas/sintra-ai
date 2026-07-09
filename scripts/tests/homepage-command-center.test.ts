import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("homepage includes the cinematic AI stack journey", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /import AIStackJourney from "@\/components\/AIStackJourney"/);
  assert.match(page, /<HeroMinimal total=\{USE_CASES_COUNT\} \/>/);
  assert.match(page, /<AIStackJourney \/>/);
  assert.match(page, /<ContentNav \/>/);
});

test("AI stack journey defines the six professional layers", () => {
  const source = read("src/components/AIStackJourney.tsx");
  for (const layer of ["signal", "meaning", "automation", "decision", "mastery", "trust"]) {
    assert.match(source, new RegExp(`id: "${layer}"`));
  }
  assert.match(source, /Scroll the AI stack/);
  assert.match(source, /A downward journey from/);
  assert.match(source, /Build workflows/);
});

test("hero positions Sintra as an AI command center", () => {
  const hero = read("src/components/HeroMinimal.tsx");
  assert.match(hero, /AI command center/);
  assert.match(hero, /The operating map for/);
  assert.match(hero, /Explore live AI/);
  assert.match(hero, /Build an automation/);
});
