// Sintra Tesseract service worker.
// Strategy: network-first for page navigations (so the daily news digest
// never serves stale content while online), cache-first for fingerprinted
// static assets (Next.js content-hashes its JS/CSS, so they're safe to
// cache aggressively). Falls back to cache when the network is unavailable.
const CACHE_NAME = "sintra-tesseract-v2";
const OFFLINE_URL = "/sintra-ai/offline.html";

self.addEventListener("install", (event) => {
  // Precache the offline fallback so even a never-visited page has something
  // branded to show on a cold cache instead of the browser's dino error.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(url.pathname) || caches.match(OFFLINE_URL))
            .then((res) => res || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
