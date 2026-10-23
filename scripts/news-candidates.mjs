/**
 * Pure, deterministic validation for untrusted AI-generated news suggestions.
 * Candidate acceptance here never means independent source verification.
 */

export function normalizeNewsUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !url.hostname) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const path = url.pathname.replace(/\/+$/, "") || "/";
    // Tracking parameters do not define a separate source article.
    const params = [...url.searchParams.entries()]
      .filter(([key]) => !/^utm_/i.test(key) && !["fbclid", "gclid", "mc_cid", "mc_eid"].includes(key.toLowerCase()))
      .sort(([a, av], [b, bv]) => a.localeCompare(b) || av.localeCompare(bv));
    const query = new URLSearchParams(params).toString();
    return host + path + (query ? "?" + query : "");
  } catch {
    return null;
  }
}

export function normalizeNewsTitle(value) {
  return typeof value === "string"
    ? value.toLocaleLowerCase("en").normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, " ").trim()
    : "";
}

function nonempty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validate suggestions against both historical and curated collections.
 * existingUrls/titles/ids must include ALL known editorial records.
 * Rejections intentionally keep reasons for an editor; never mutate inputs.
 */
export function validateNewsCandidates(candidates, { ids = [], urls = [], titles = [] } = {}) {
  if (!Array.isArray(candidates)) {
    return { accepted: [], rejected: [{ id: null, reasons: ["response must be a JSON array"] }] };
  }
  const seenIds = new Set(ids);
  const seenUrls = new Set(urls.map(normalizeNewsUrl).filter(Boolean));
  const seenTitles = new Set(titles.map(normalizeNewsTitle).filter(Boolean));
  const accepted = [];
  const rejected = [];

  for (const candidate of candidates.slice(0, 40)) {
    const item = candidate && typeof candidate === "object" && !Array.isArray(candidate) ? candidate : {};
    const id = item.id;
    const reasons = [];
    if (!nonempty(id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) reasons.push("invalid kebab-case id");
    else if (seenIds.has(id)) reasons.push("duplicate id");

    const url = normalizeNewsUrl(item.url);
    if (!url) reasons.push("missing or invalid HTTPS source URL");
    else if (seenUrls.has(url)) reasons.push("duplicate canonical source URL");

    const title = normalizeNewsTitle(item.title);
    if (!title) reasons.push("missing title");
    else if (seenTitles.has(title)) reasons.push("duplicate normalized title");

    for (const key of ["summary", "provider", "why_it_matters", "what_to_try"]) {
      if (!nonempty(item[key])) reasons.push("missing " + key);
    }
    if (!Array.isArray(item.tags) || !item.tags.length || !item.tags.every(nonempty)) {
      reasons.push("tags must contain nonempty strings");
    }
    if (!["landmark", "major", "notable"].includes(item.significance)) reasons.push("invalid significance");
    if (!/^#[\da-f]{6}$/i.test(item.providerColor ?? "")) reasons.push("invalid providerColor");

    const dateNum = item.dateNum;
    const year = Math.floor(dateNum / 100), month = dateNum % 100;
    const day = item.dateDay;
    if (!Number.isInteger(dateNum) || year < 2020 || year > 2100 || month < 1 || month > 12) {
      reasons.push("invalid dateNum");
    } else if (!Number.isInteger(day) || day < 1 || day > new Date(Date.UTC(year, month, 0)).getUTCDate()) {
      reasons.push("missing or invalid publication day");
    }
    const expectedDate = Number.isInteger(month) && month >= 1 && month <= 12
      ? new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
      : null;
    if (!nonempty(item.date) || item.date !== expectedDate) reasons.push("date does not match dateNum");
    if (item.country !== undefined && !["BR", "SE"].includes(item.country)) reasons.push("invalid country");

    if (reasons.length) {
      rejected.push({ id: nonempty(id) ? id : null, reasons });
      continue;
    }

    const record = {
      id, date: item.date, dateNum, dateDay: day, title: item.title.trim(),
      summary: item.summary.trim(), tags: [...item.tags], significance: item.significance,
      provider: item.provider.trim(), providerColor: item.providerColor,
      url: item.url, why_it_matters: item.why_it_matters.trim(),
      what_to_try: item.what_to_try.trim(),
      ...(item.country ? { country: item.country } : {}),
    };
    accepted.push(record);
    seenIds.add(id);
    seenUrls.add(url);
    seenTitles.add(title);
  }

  if (candidates.length > 40) {
    rejected.push({ id: null, reasons: ["batch exceeded 40 candidates; remainder deliberately ignored"] });
  }
  return { accepted, rejected };
}
