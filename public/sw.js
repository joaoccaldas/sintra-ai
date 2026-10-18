// Sintra owns only its scope and its own caches on the shared GitHub Pages origin.
const CACHE_PREFIX = "sintra-tesseract-";
const CACHE_NAME = `${CACHE_PREFIX}v3`;
const SCOPE_PATH = new URL(self.registration.scope).pathname;
const OFFLINE_URL = `${SCOPE_PATH}offline.html`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;

  // Only hashed assets are immutable. JSON feeds, pages and public files must refresh.
  const immutable = url.pathname.startsWith(`${SCOPE_PATH}_next/static/`);
  const network = async () => {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  };
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (immutable) {
      const cached = await cache.match(request);
      if (cached) return cached;
    }
    try {
      return await network();
    } catch {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (request.mode === "navigate") {
        const offline = await cache.match(OFFLINE_URL);
        if (offline) return offline;
      }
      return Response.error();
    }
  })());
});
