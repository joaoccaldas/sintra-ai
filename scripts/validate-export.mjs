// Validate the actual exported navigation, including Next Link's automatic prefix.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, join, dirname, relative } from "node:path";
process.env.NODE_ENV = "production";
const { default: config } = await import("../next.config.mjs");
const root = resolve(config.distDir);
const prefix = config.basePath;
const pages = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith(".html")) pages.push(path);
  }
}
walk(root);
const failures = new Map();
let count = 0;
for (const page of pages) {
  for (const [, href] of readFileSync(page, "utf8").matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) continue;
    const path = decodeURIComponent(href.split(/[?#]/)[0]);
    if (!path) continue;
    count++;
    let target;
    if (path.startsWith(`${prefix}/`)) {
      target = join(root, path.slice(prefix.length));
    } else if (
      // Existing source-authored guide links intentionally target the canonical
      // GitHub Pages site. In a deeper *temporary preview only*, resolve them
      // against equivalent exported files; never loosen production validation.
      process.env.SINTRA_PREVIEW_BASE_PATH === prefix &&
      prefix.startsWith("/sintra-ai/preview/") &&
      path.startsWith("/sintra-ai/")
    ) {
      target = join(root, path.slice("/sintra-ai".length));
    } else if (path.startsWith("/")) {
      target = null;
    } else {
      target = resolve(dirname(page), path);
    }
    if (target && existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.html");
    if (!target || !existsSync(target)) {
      const sources = failures.get(href) ?? [];
      sources.push(relative(root, page));
      failures.set(href, sources);
    }
  }
}
if (failures.size) {
  for (const [href, sources] of failures) console.error(`Broken exported link ${href} (${sources[0]}, ${sources.length} occurrence(s))`);
  process.exitCode = 1;
} else console.log(`Export navigation passed: ${pages.length} HTML files, ${count} internal links.`);
