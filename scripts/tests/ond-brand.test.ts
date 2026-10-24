import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (path: string) => readFileSync(path, "utf8");

/** Color ratios measured against the actual light surfaces. */
function channel(v: number): number {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function luminance(hex: string): number {
  const c = [1, 3, 5].map(i => channel(parseInt(hex.slice(i, i + 2), 16)));
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
}
function contrast(a: string, b: string): number {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}

test("ond.ai brand master palette and Sintra coral have accessible body-text alternatives", () => {
  const css = read("src/app/ond-brand.css");
  for (const value of ["#F7F8F5", "#172238", "#FFFFFF", "#5B48D9", "#0789B0", "#DDE5EE"]) {
    assert.ok(css.includes(value), "missing canonical token " + value);
  }
  assert.ok(contrast("#172238", "#FFFFFF") >= 7);
  assert.ok(contrast("#5B48D9", "#FFFFFF") >= 4.5);
  assert.ok(contrast("#B65344", "#FFFFFF") >= 4.5);
  assert.ok(contrast("#B65344", "#F7F8F5") >= 4.5);
});

test("new brand uses one open line in its master mark; no decorative infinity, external asset or font file", () => {
  const brand = read("src/components/SintraBrandLockup.tsx");
  assert.match(brand, /<path d="M3 19/);
  assert.match(brand, /stroke="currentColor"/);
  assert.match(brand, /by <strong>ond\.ai<\/strong>/);
  assert.doesNotMatch(brand, /<circle|<image|<iframe|src="https?:\/\//);
});

test("Sintra offers a mobile-first Portuguese promise with optional English", () => {
  const copy = read("src/lib/homeExperienceCopy.ts");
  assert.match(copy, /Entenda a IA\./);
  assert.match(copy, /Coloque em prática\./);
  assert.match(copy, /Understand AI/);
  assert.match(copy, /Fontes originais/);
  const ctx = read("src/context/LanguageContext.tsx");
  assert.match(ctx, /useState<Locale>\("pt"\)/);
});

test("brand lives in shared header + navigation, not multiple competing product marks", () => {
  for(const path of ["src/components/Header.tsx","src/components/SidebarNav.tsx"]) {
    const code = read(path);
    assert.match(code, /SintraBrandLockup/);
    assert.doesNotMatch(code, /TesseractMark/);
  }
  const page = read("src/app/page.tsx");
  assert.match(page, /<BrazilRadar \/>/);
  assert.match(page, /<BrazilFirstHero \/>/);
});

test("light is the first-run default but users keep manual dark/forest/ocean themes", () => {
  const theme = read("src/context/ThemeContext.tsx");
  const layout = read("src/app/layout.tsx");
  assert.match(theme, /useState<Theme>\("light"\)/);
  assert.match(layout, /import "\.\/ond-brand\.css"/);
  assert.match(layout, /: "light";/);
  assert.match(theme, /"dark", "light", "forest", "ocean"/);
});

test("branding is open-wave instead of generic concentric loops and is responsive", () => {
  const hero = read("src/components/BrazilFirstHero.tsx");
  const css = read("src/components/BrazilFirstHero.module.css");
  assert.match(hero, /sintra-open-current/);
  assert.match(css, /max-width:\s*760px/);
  assert.match(css, /max-width:\s*540px/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(hero, /s\.waveOne|s\.waveTwo|s\.waveFive/);
});

test("brand assets are explicitly a candidate pending clearance and font master", () => {
  const text = read("src/app/ond-brand.css") + read("src/components/SintraBrandLockup.tsx");
  assert.match(text, /pending legal clearance|WORKING DESIGN/);
});

test("every permanent Sintra touchpoint uses the ond.ai endorsed family instead of the Tesseract", () => {
  const footer = read("src/components/Footer.tsx");
  assert.match(footer, /SintraBrandLockup/);
  assert.doesNotMatch(footer, /TesseractMark|Sintra Tesseract/);
  assert.match(footer, /NewsletterComingSoon/);
  assert.doesNotMatch(footer, /NEXT_PUBLIC_NEWSLETTER_ENDPOINT|<form|NewsletterCapture/);
  assert.match(footer, /<details/);
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /sintra-mark\.svg/);
  assert.doesNotMatch(layout, /tesseract-mark\.svg/);
  assert.match(layout, /Sintra Brasil, by ond\.ai/);
  assert.match(layout, /locale: "pt_BR"/);
  const og = read("src/app/opengraph-image.tsx");
  assert.match(og, /Entenda a IA/);
  assert.match(og, /Coloque em prática/);
  assert.match(og, /#F7F8F5/);
  assert.doesNotMatch(og, /The AI one-stop shop/);
});

test("PWA metadata is Brazil-first and preview builds cannot register production service workers", () => {
  const manifest = JSON.parse(read("public/manifest.json"));
  assert.equal(manifest.lang, "pt-BR");
  assert.equal(manifest.name, "Sintra Brasil, by ond.ai");
  assert.equal(manifest.background_color, "#F7F8F5");
  assert.equal(manifest.icons[0].src, "/sintra-ai/sintra-mark.svg");
  assert.equal(manifest.shortcuts[2].url, "/sintra-ai/library/");
  const sw = read("src/components/ServiceWorkerRegister.tsx");
  const config = read("next.config.mjs");
  const layout = read("src/app/layout.tsx");
  assert.match(sw, /NEXT_PUBLIC_PREVIEW_MODE === "1"/);
  assert.match(config, /NEXT_PUBLIC_PREVIEW_MODE/);
  assert.match(layout, /manifest: process\.env\.SINTRA_PREVIEW_BASE_PATH \? undefined/);
});
