(function () {
  "use strict";

  var SOURCE_URL = "/sintra-ai/news-latest-source.js?v=20260623";
  var latest = [];

  try {
    var request = new XMLHttpRequest();
    request.open("GET", SOURCE_URL, false);
    request.send(null);
    if (request.status >= 200 && request.status < 300) {
      var source = request.responseText
        .replace(/^import type[^\n]*\n/, "")
        .replace(/export const LATEST_AI_NEWS:\s*NewsItem\[\]\s*=\s*/, "return ");
      latest = Function(source)();
    }
  } catch (error) {
    console.error("Sintra AI news patch could not load", error);
  }

  if (!Array.isArray(latest) || latest.length === 0) return;

  function mergeNews(exports) {
    var all = exports.vy;
    var current = exports.h3;
    if (!Array.isArray(all)) return;

    var ids = new Set(all.map(function (item) { return item.id; }));
    latest.forEach(function (item) {
      if (ids.has(item.id)) return;
      ids.add(item.id);
      all.push(item);
      if (Array.isArray(current) && item.dateNum === 202606) current.push(item);
    });

    if (Array.isArray(current)) {
      current.sort(function (a, b) {
        return b.dateNum - a.dateNum || (b.dateDay || 1) - (a.dateDay || 1);
      });
    }
  }

  var chunks = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
  var originalPush = chunks.push.bind(chunks);

  chunks.push = function (payload) {
    var modules = payload && payload[1];
    if (modules && modules[4503]) {
      var originalModule = modules[4503];
      modules[4503] = function (module, exports, require) {
        originalModule(module, exports, require);
        mergeNews(exports);
      };
    }
    return originalPush(payload);
  };
})();
