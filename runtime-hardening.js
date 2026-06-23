(function () {
  "use strict";

  var release = "8fa880decde7cf904ed8448880329c9efaad7287";
  var themes = ["dark", "light", "forest", "ocean"];

  try {
    var saved = localStorage.getItem("sintra-theme");
    var theme = themes.indexOf(saved) >= 0
      ? saved
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {}

  function addStyles() {
    if (document.getElementById("sintra-hardening-styles")) return;
    var style = document.createElement("style");
    style.id = "sintra-hardening-styles";
    style.textContent = [
      '[data-theme="light"]{--fg-4-rgb:98 96 126!important}',
      ':where(a,button,input,select,textarea,[role="button"]):focus-visible{outline:2px solid var(--violet-bright,#B6A6FF)!important;outline-offset:3px!important}',
      ':where(h1,h2,h3,h4,[id]){scroll-margin-top:5rem}',
      '.sintra-runtime-language{display:inline-flex!important}',
      '.sintra-release-marker{opacity:.72;font:10px/1.4 ui-monospace,monospace}',
      '@media(max-width:640px){.eyebrow{font-size:12px!important;letter-spacing:.16em!important}}'
    ].join("");
    document.head.appendChild(style);
  }

  function normalizeMetadata() {
    document.title = document.title.replace(/Sintra Tesseract/g, "Sintra AI");
    var selectors = 'meta[property="og:site_name"],meta[property="og:title"],meta[name="twitter:title"]';
    document.querySelectorAll(selectors).forEach(function (meta) {
      var value = meta.getAttribute("content") || "";
      meta.setAttribute("content", value.replace(/Sintra Tesseract/g, "Sintra AI"));
    });
    var marker = document.querySelector('meta[name="sintra-release"]');
    if (!marker) {
      marker = document.createElement("meta");
      marker.setAttribute("name", "sintra-release");
      document.head.appendChild(marker);
    }
    marker.setAttribute("content", release);
  }

  function exposeLanguageToggle() {
    document.querySelectorAll("button").forEach(function (button) {
      var text = (button.textContent || "").trim();
      var label = button.getAttribute("aria-label") || "";
      if (text === "PT" || text === "EN" || /Portuguese|English/i.test(label)) {
        button.classList.remove("hidden");
        button.classList.add("sintra-runtime-language");
        if (!label) button.setAttribute("aria-label", text === "PT" ? "Switch to Portuguese" : "Switch to English");
      }
    });
  }

  function repairControls() {
    document.querySelectorAll('[role="checkbox"]').forEach(function (checkbox) {
      var button = checkbox.closest("button");
      if (!button) return;
      button.setAttribute("aria-pressed", checkbox.getAttribute("aria-checked") || "false");
      checkbox.removeAttribute("role");
      checkbox.removeAttribute("aria-checked");
    });
    document.querySelectorAll('[role="dialog"]').forEach(function (dialog) {
      dialog.setAttribute("aria-modal", "true");
      if (!dialog.getAttribute("aria-label") && !dialog.getAttribute("aria-labelledby")) dialog.setAttribute("aria-label", "Dialog");
    });
  }

  function ensureSkipLink() {
    var links = Array.prototype.slice.call(document.querySelectorAll('a[href="#main-content"],a[href="#library"]'))
      .filter(function (link) { return /skip/i.test(link.textContent || ""); });
    links.slice(1).forEach(function (link) { link.remove(); });
    if (links.length) return;
    var link = document.createElement("a");
    link.href = document.getElementById("main-content") ? "#main-content" : "#library";
    link.textContent = "Skip to content";
    link.className = "sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-3 focus:py-2";
    document.body.insertBefore(link, document.body.firstChild);
  }

  function addReleaseMarker() {
    if (document.querySelector(".sintra-release-marker")) return;
    var footer = document.querySelector("footer");
    if (!footer) return;
    var marker = document.createElement("span");
    marker.className = "sintra-release-marker";
    marker.textContent = "Release " + release.slice(0, 7);
    marker.title = release;
    footer.appendChild(marker);
  }

  function apply() {
    addStyles();
    normalizeMetadata();
    exposeLanguageToggle();
    repairControls();
    ensureSkipLink();
    addReleaseMarker();
    window.__SINTRA_RELEASE__ = release;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply, { once: true });
  else apply();
  window.setTimeout(apply, 800);
  window.setTimeout(apply, 2200);
})();
