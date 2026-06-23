// Sintra AI service worker.
// Network-first navigation keeps editorial content current. Fingerprinted assets
// remain cache-first. HTML responses receive the current runnerless hardening layer.
const CACHE_NAME = "sintra-ai-v3-8fa880d";
const OFFLINE_URL = "/sintra-ai/offline.html";
const RUNTIME_URL = "/sintra-ai/runtime-hardening.js?v=8fa880d";

function withRuntime(response) {
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return Promise.resolve(response);

  return response.text().then((html) => {
    if (!html.includes("runtime-hardening.js")) {
      const boot = '<script>(function(){try{var t=["dark","light","forest","ocean"],s=localStorage.getItem("sintra-theme"),v=t.indexOf(s)>=0?s:(matchMedia("(prefers-color-scheme:light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",v)}catch(e){}})();<\/script>';
      const runtime = `<script src="${RUNTIME_URL}" defer><\/script>`;
      html = html.replace("</head>", `${boot}${runtime}</head>`);
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.set("x-sintra-release", "8fa880d");

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
      .then((cache) => cache.addAll([OFFLINE_URL, RUNTIME_URL]))
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

  if (url.pathname.endsWith("/runtime-hardening.js")) {
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
          return withRuntime(response);
        })
        .catch(() =>
          caches.match(request)
            .then((cached) => cached || caches.match(url.pathname) || caches.match(OFFLINE_URL))
            .then((response) => response ? withRuntime(response) : caches.match(OFFLINE_URL))
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
