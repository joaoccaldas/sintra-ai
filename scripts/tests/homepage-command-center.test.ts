import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("homepage composes hero directly into ContentNav, no duplicate IA section", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /<ImmersiveHero total=\{USE_CASES_COUNT\} \/>/);
  assert.match(page, /<ContentNav \/>/);
  assert.doesNotMatch(page, /AIStackJourney/);
});

test("hero positions Sintra as an AI command center", () => {
  const hero = read("src/components/ImmersiveHero.tsx");
  assert.match(hero, /AI command center/);
  assert.match(hero, /The operating map for/);
  assert.match(hero, /Explore live AI/);
  assert.match(hero, /Build an automation/);
});

test("immersive hero disables the Three.js canvas for prefers-reduced-motion", () => {
  const hero = read("src/components/ImmersiveHero.tsx");
  assert.match(hero, /useReducedMotion/);
  assert.match(hero, /!prefersReducedMotion && <TesseractScene/);
});

test("ContentNav keeps one IA recap (IntentNav) and a library teaser linking to /library/", () => {
  const source = read("src/components/ContentNav.tsx");
  assert.match(source, /function IntentNav/);
  assert.doesNotMatch(source, /function StatsBar/);
  assert.doesNotMatch(source, /function AutomationPreview/);
  assert.doesNotMatch(source, /function LearningPathsStrip/);
  assert.match(source, /import LibraryTeaser from "\.\/LibraryTeaser"/);
});

test("LibraryTeaser does not import the full use-case dataset", () => {
  const source = read("src/components/LibraryTeaser.tsx");
  assert.doesNotMatch(source, /from "@\/lib\/data"/);
});

test("dedicated /library/ route hosts the full prompt library", () => {
  const source = read("src/app/library/page.tsx");
  assert.match(source, /PromptLibrarySection/);
});
