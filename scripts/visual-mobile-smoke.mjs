/**
 * Headless browser smoke for PR30 static preview only.
 * Invoked by the isolated GitHub Actions workflow with pinned playwright.
 * Never called as part of public runtime or publisher ingestion.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const base = process.env.SINTRA_VISUAL_URL;
if (!base || !base.startsWith("http://127.0.0.1:4173/sintra-ai/preview/first-win/")) {
  throw new Error("Expected only isolated local preview URL");
}

const widths = [320, 360, 390, 430, 768, 1440];
const folder = join(process.cwd(), "artifacts", "sintra-mobile");
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const failures = [];

try {
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width < 500 ? 844 : 900 },
      deviceScaleFactor: 1,
      isMobile: width <= 430,
      hasTouch: width <= 430,
    });
    try {
      const response = await page.goto(base, { waitUntil: "domcontentloaded", timeout: 25_000 });
      if (!response?.ok()) throw new Error("HTTP " + response?.status());
      await page.locator("h1").waitFor({ state: "visible", timeout: 15_000 });
      await page.locator("#pratique").waitFor({ state: "attached" });
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        headline: document.querySelector("h1")?.textContent?.trim(),
      }));
      if (state.scrollWidth > width + 2) {
        throw new Error(`Horizontal overflow: ${state.scrollWidth}px at ${width}px viewport`);
      }
      if (!state.headline?.includes("Entenda a IA.")) throw new Error("Missing PT hero");

      const dock = page.locator("nav[aria-label='Navegação principal do celular']");
      if (width < 1024) {
        if (!(await dock.isVisible())) throw new Error("Mobile dock not visible");
        const count = await dock.locator("a, button").count();
        if (count !== 5) throw new Error(`Mobile dock has ${count} slots instead of 5`);
      } else if (await dock.isVisible()) {
        throw new Error("Mobile dock visible on desktop");
      }

      const firstWin = page.locator("a[href='#pratique']");
      if (!(await firstWin.isVisible())) throw new Error("First-win CTA not visible");
      const canonicalExample = page.locator("#pratique a[href*='/prompts/']");
      if (await canonicalExample.count() < 1) throw new Error("No real exercise links");
      if (!(await page.getByRole("button", { name: "Compartilhar Sintra Brasil" }).isVisible())) {
        throw new Error("Voluntary share action not visible");
      }

      await page.screenshot({ path: join(folder, `home-${width}.png`), fullPage: true });
      console.log(JSON.stringify({ width, status: "pass", ...state, practiceLinks: await canonicalExample.count() }));
    } catch (error) {
      failures.push({ width, error: String(error?.message ?? error) });
      console.error(JSON.stringify({ width, status: "fail", error: String(error?.message ?? error) }));
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exitCode = 1;
}
