import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function harness() {
  const listeners: Record<string, (event: any) => void> = {};
  const deleted: string[] = [];
  const stored = new Map<string, Response>();
  let online = true;
  let status = 200;
  const key = (request: string | { url: string }) => typeof request === "string" ? request : request.url;
  const cache = {
    add: async () => {},
    put: async (request: any, response: Response) => { stored.set(key(request), response); },
    match: async (request: any) => stored.get(key(request)),
  };
  vm.runInNewContext(readFileSync("public/sw.js", "utf8"), {
    URL, Response,
    self: {
      registration: { scope: "https://example.com/sintra-ai/" },
      location: { origin: "https://example.com" },
      addEventListener: (name: string, callback: any) => { listeners[name] = callback; },
      skipWaiting: () => {}, clients: { claim: async () => {} },
    },
    caches: {
      open: async () => cache,
      keys: async () => ["sintra-tesseract-v2", "sintra-tesseract-v3", "kona-world-v1", "bellagio-offline"],
      delete: async (name: string) => { deleted.push(name); return true; },
    },
    fetch: async () => {
      if (!online) throw new Error("offline");
      return new Response("network", { status });
    },
  });
  return {
    listeners, deleted, stored,
    offline: () => { online = false; },
    status: (value: number) => { status = value; },
    request: (path: string, mode = "navigate") => {
      let response: Promise<Response> | undefined;
      listeners.fetch({ request: { method: "GET", url: `https://example.com${path}`, mode },
        respondWith: (value: Promise<Response>) => { response = value; } });
      return response;
    },
  };
}

test("service worker activation preserves other projects' offline caches", async () => {
  const h = harness();
  let pending: Promise<any> = Promise.resolve();
  h.listeners.activate({ waitUntil: (value: Promise<any>) => { pending = value; } });
  await pending;
  assert.deepEqual(h.deleted, ["sintra-tesseract-v2"]);
});

test("service worker ignores sibling projects and falls back for uncached navigation", async () => {
  const h = harness();
  assert.equal(h.request("/konam/"), undefined);
  h.stored.set("/sintra-ai/offline.html", new Response("offline fallback"));
  h.offline();
  assert.equal(await (await h.request("/sintra-ai/news/"))!.text(), "offline fallback");
});

test("mutable feeds refresh; only successful responses enter the cache", async () => {
  const h = harness();
  h.stored.set("https://example.com/sintra-ai/feed.json", new Response("old feed"));
  assert.equal(await (await h.request("/sintra-ai/feed.json", "cors"))!.text(), "network");
  h.status(404);
  assert.equal((await h.request("/sintra-ai/missing/"))!.status, 404);
  assert.equal(h.stored.has("https://example.com/sintra-ai/missing/"), false);
  h.stored.set("https://example.com/sintra-ai/_next/static/hash.js", new Response("hashed asset"));
  assert.equal(await (await h.request("/sintra-ai/_next/static/hash.js", "cors"))!.text(), "hashed asset");
});
