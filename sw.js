// Sintra AI service worker.
// Network-first navigation keeps editorial content current. Fingerprinted assets
// remain cache-first. The news patch runs before Next.js chunks so the existing
// news page, homepage, ticker, filters and counters share one updated dataset.
const CACHE_NAME = "sintra-ai-v5-news-20260623";
const OFFLINE_URL = "/sintra-ai/offline.html";
const RUNTIME_URL = "/sintra-ai/runtime-hardening.js?v=news-20260623";
const NEWS_PATCH_URL = "/sintra-ai/news-data-patch.js?v=20260623";
const NEWS_SOURCE_URL = "/sintra-ai/news-latest-source.js?v=20260623";

function enhanceHtml(response) {
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return Promise.resolve(response);

  return response.text().then((html) => {
    if (!html.includes("news-data-patch.js")) {
      html = html.replace("<head>", `<head><script src="${NEWS_PATCH_URL}"><\/script>`);
    }
    if (!html.includes("runtime-hardening.js")) {
      const boot = '<script>(function(){try{var t=["dark","light","forest","ocean"],s=localStorage.getItem("sintra-theme"),v=t.indexOf(s)>=0?s:(matchMedia("(prefers-color-scheme:light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",v)}catch(e){}})();<\/script>';
      const runtime = `<script src="${RUNTIME_URL}" defer><\/script>`;
      html = html.replace("</head>", `${boot}${runtime}</head>`);
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.set("x-sintra-release", "news-20260623");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([OFFLINE_URL, RUNTIME_URL, NEWS_PATCH_URL, NEWS_SOURCE_URL]))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (
    url.pathname.endsWith("/runtime-hardening.js") ||
    url.pathname.endsWith("/news-data-patch.js") ||
    url.pathname.endsWith("/news-latest-source.js")
  ) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return enhanceHtml(response);
        })
        .catch(() =>
          caches.match(request)
            .then((cached) => cached || caches.match(url.pathname) || caches.match(OFFLINE_URL))
            .then((response) => response ? enhanceHtml(response) : caches.match(OFFLINE_URL))
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
