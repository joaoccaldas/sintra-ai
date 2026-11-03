import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { readFileSync } from "node:fs";

/** Verify the actual Next.js configuration in isolated processes. */
function configFor(extra: Record<string,string>) {
  const result = spawnSync(process.execPath, [
    "--input-type=module", "-e",
    'import("./next.config.mjs").then(({default: c}) => process.stdout.write(JSON.stringify({basePath:c.basePath,assetPrefix:c.assetPrefix,publicBase:c.env.NEXT_PUBLIC_BASE_PATH})))',
  ], {
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: "production", VERCEL_ENV: "", SINTRA_PREVIEW_BASE_PATH: "", ...extra },
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("normal GitHub Pages production continues to serve /sintra-ai", () => {
  assert.deepEqual(configFor({}), { basePath: "/sintra-ai", assetPrefix: "/sintra-ai", publicBase: "/sintra-ai" });
});

test("isolated GitHub Pages preview serves a separate /preview/pr-27 subpath", () => {
  const out = configFor({ SINTRA_PREVIEW_BASE_PATH: "/sintra-ai/preview/pr-27" });
  assert.equal(out.basePath, "/sintra-ai/preview/pr-27");
  assert.equal(out.assetPrefix, "/sintra-ai/preview/pr-27");
  assert.equal(out.publicBase, "/sintra-ai/preview/pr-27");
});

test("Vercel preview remains root-hosted", () => {
  const out = configFor({ VERCEL_ENV: "preview" });
  assert.equal(out.basePath, "");
  assert.equal(out.publicBase, "");
});

test("preview pages are noindex but published pages retain their metadata", () => {
  const layout = readFileSync("src/app/layout.tsx", "utf8");
  assert.match(layout, /process\.env\.SINTRA_PREVIEW_BASE_PATH/);
  assert.match(layout, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
});
