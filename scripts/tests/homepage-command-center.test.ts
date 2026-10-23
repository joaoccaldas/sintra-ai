import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("homepage uses a simple first-use hero before the existing editorial sections", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /<BrazilFirstHero \/>/);
  assert.match(page, /<ContentNav showIntents=\{false\} \/>/);
  assert.doesNotMatch(page, /<ImmersiveHero/);
  assert.match(page, /<Header total=\{USE_CASES_COUNT\}/);
  assert.match(page, /<Footer \/>/);
});

test("new first-screen goals link to real existing routes without invented community destinations", () => {
  const hero = read("src/components/BrazilFirstHero.tsx");
  assert.match(hero, /BASE_PATH\}\/learn\//);
  assert.match(hero, /BASE_PATH\}\/library\//);
  assert.match(hero, /BASE_PATH\}\/automate\//);
  assert.match(hero, /BASE_PATH\}\/news\//);
  assert.doesNotMatch(hero, /href=.*\/community\//);
});

test("Brazil-first hero is text-led with no WebGL or external images", () => {
  const hero = read("src/components/BrazilFirstHero.tsx");
  assert.match(hero, /aria-labelledby="home-heading"/);
  assert.match(hero, /<h1 id="home-heading"/);
  assert.doesNotMatch(hero, /from "three"|from 'three'|<canvas|<iframe|requestAnimationFrame/);
  const copy = read("src/lib/homeExperienceCopy.ts");
  assert.match(copy, /Entenda a IA/);
  assert.match(copy, /Understand AI/);
  assert.match(copy, /Fontes originais/);
});

test("visual styles include phone breakpoints, readable cards and reduced motion", () => {
  const css = read("src/components/BrazilFirstHero.module.css");
  assert.match(css, /max-width: 760px/);
  assert.match(css, /max-width: 540px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.journey/);
  assert.match(css, /\.resources/);
});

test("ContentNav exposes only one intent-navigation layer on redesigned homepage", () => {
  const source = read("src/components/ContentNav.tsx");
  assert.match(source, /showIntents = true/);
  assert.match(source, /showIntents && <IntentNav \/>/);
  assert.match(source, /<ThisWeekHub \/>/);
  assert.match(source, /<LiveStrip \/>/);
  assert.match(source, /<LibraryTeaser \/>/);
});

test("mobile dock has four working routes and a fifth control opening the existing drawer", () => {
  const dock = read("src/components/MobileDock.tsx");
  const header = read("src/components/Header.tsx");
  const css = read("src/components/MobileDock.module.css");
  assert.match(header, /<MobileDock \/>/);
  for (const route of ["news", "learn", "library"]) {
    assert.ok(dock.includes("BASE_PATH}/" + route + "/"), "dock missing " + route);
  }
  assert.match(dock, /setMobileOpen\(true\)/);
  assert.match(dock, /aria-current/);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /min-height: 52px/);
});

test("LibraryTeaser still avoids importing the entire prompt dataset", () => {
  const source = read("src/components/LibraryTeaser.tsx");
  assert.doesNotMatch(source, /from "@\/lib\/data"/);
});

test("existing dedicated /library/ route still hosts the full prompt library", () => {
  const source = read("src/app/library/page.tsx");
  assert.match(source, /PromptLibrarySection/);
});
