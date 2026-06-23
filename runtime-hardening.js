(function () {
  "use strict";
  var release = "916f846-news-20260623";
  var themes = ["dark", "light", "forest", "ocean"];
  function apply() {
    try {
      var saved = localStorage.getItem("sintra-theme");
      var theme = themes.indexOf(saved) >= 0 ? saved : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (_) {}
    if (!document.getElementById("sintra-hardening-styles")) {
      var style = document.createElement("style");
      style.id = "sintra-hardening-styles";
      style.textContent = '[data-theme="light"]{--fg-4-rgb:98 96 126!important}:where(a,button,input,select,textarea,[role="button"]):focus-visible{outline:2px solid var(--violet-bright,#9f8cff)!important;outline-offset:3px!important}.sintra-runtime-language{display:inline-flex!important}.sintra-news-update{display:block;margin:28px 0 18px;padding:22px 24px;border:1px solid rgba(159,140,255,.36);border-radius:18px;background:linear-gradient(135deg,rgba(159,140,255,.15),rgba(143,227,210,.055));text-decoration:none;color:inherit}.sintra-news-update-kicker{display:block;margin-bottom:9px;color:#9f8cff;font:10px ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}.sintra-news-update-title{display:block;color:var(--fg-1,#f4f2ea);font:400 clamp(22px,4vw,34px)/1.15 Georgia,serif}.sintra-news-update-copy{display:block;margin-top:10px;color:var(--fg-3,#aaa6ba);font:14px/1.55 system-ui,sans-serif}';
      document.head.appendChild(style);
    }
    document.title = document.title.replace(/Sintra Tesseract/g, "Sintra AI");
    document.querySelectorAll("h1,h2,h3,a,span,p").forEach(function (node) {
      if (!node.children.length && /Sintra Tesseract/.test(node.textContent || "")) node.textContent = (node.textContent || "").replace(/Sintra Tesseract/g, "Sintra AI");
    });
    document.querySelectorAll("button").forEach(function (button) {
      var text = (button.textContent || "").trim();
      if (text === "PT" || text === "EN") { button.classList.remove("hidden"); button.classList.add("sintra-runtime-language"); }
    });
    if (location.pathname === "/sintra-ai/news/" && !document.getElementById("sintra-latest-news-card")) {
      var header = document.querySelector("main header, header");
      if (header) {
        var card = document.createElement("a");
        card.id = "sintra-latest-news-card";
        card.className = "sintra-news-update";
        card.href = "/sintra-ai/news/latest/";
        card.innerHTML = '<span class="sintra-news-update-kicker">Updated 23 June 2026 · Global · Europe · Sweden · Brazil</span><span class="sintra-news-update-title">30 new verified AI developments</span><span class="sintra-news-update-copy">Infrastructure, frontier models, cyber risk, sovereign AI and applied research. Open the reviewed June 19–23 collection →</span>';
        header.insertAdjacentElement("afterend", card);
      }
    }
    window.__SINTRA_RELEASE__ = release;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply, { once: true }); else apply();
  setTimeout(apply, 700); setTimeout(apply, 1800);
})();
