import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("homepage uses a server route and focused practical sections, avoiding giant ContentNav imports", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /<BrazilFirstHero \/>/);
  assert.match(page, /<HomeEditorialSections \/>/);
  assert.doesNotMatch(page, /ContentNav/);
  assert.doesNotMatch(page, /^"use client"/);
  assert.doesNotMatch(page, /<ImmersiveHero/);
  assert.match(page, /<Header total=\{USE_CASES_COUNT\}/);
  assert.match(page, /<Footer \/>/);
});

test("one first-win CTA and existing mobile dock replace redundant home menus", () => {
  const hero = read("src/components/BrazilFirstHero.tsx");
  assert.match(hero, /href="#pratique"/);
  assert.match(hero, /<ShareSintraButton \/>/);
  assert.doesNotMatch(hero, /s\.resources|s\.journeys|s\.directionHeader/);
  const dock = read("src/components/MobileDock.tsx");
  for (const route of ["news", "learn", "library"]) {
    assert.ok(dock.includes("BASE_PATH}/" + route + "/"), "dock missing " + route);
  }
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
  assert.match(css, /max-width:\s*760px/);
  assert.match(css, /max-width:\s*540px/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.primaryCta/);
  assert.doesNotMatch(css, /\.journey/);
  assert.doesNotMatch(css, /\.resources/);
});

test("server sections source world news and prompts from canonical registries, not mock lists", () => {
  const source = read("src/components/HomeEditorialSections.tsx");
  assert.match(source, /LIVE_ITEMS/);
  assert.match(source, /USE_CASES/);
  assert.match(source, /"meeting-notes-to-action-items"/);
  assert.match(source, /"quick-insights-from-spreadsheets"/);
  const localized = read("src/components/HomeEditorialClient.tsx");
  assert.match(localized, /execução não verificada/);
  assert.match(localized, /id="pratique"/);
  assert.match(localized, /useLanguage/);
  assert.match(localized, /"World news and practical AI"/);
  assert.doesNotMatch(source, /"use client"|from "framer-motion"|from "@\/lib\/newsDataCombined"/);
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

test("homepage offers exactly one first win CTA and a voluntary share interaction", () => {
  const hero = read("src/components/BrazilFirstHero.tsx");
  assert.match(hero, /href="#pratique"/);
  assert.match(hero, /<ShareSintraButton \/>/);
  const share = read("src/components/ShareSintraButton.tsx");
  assert.match(share, /navigator.share/);
  assert.match(share, /https:\/\/wa.me\/\?text=/);
  assert.match(share, /AbortError/);
  assert.doesNotMatch(share, /sendEmail\(|fetch\(/);
});

test("persistent navigation no longer imports broad news/tools registries for simple counts", () => {
  const sidebar = read("src/components/SidebarNav.tsx");
  assert.doesNotMatch(sidebar, /from "@\/lib\/newsDataCombined"/);
  assert.doesNotMatch(sidebar, /from "@\/lib\/toolsData"/);
});

test("mobile back-to-top and non-light dock do not visually overlap", () => {
  assert.match(read("src/components/BackToTop.tsx"), /88px\+env\(safe-area-inset-bottom\)/);
  const css = read("src/components/MobileDock.module.css");
  assert.match(css, /data-theme="dark"/);
  assert.match(css, /data-theme="forest"/);
  assert.match(css, /data-theme="ocean"/);
});
