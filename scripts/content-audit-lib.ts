export function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const raw of values) {
    const value = raw.trim().toLowerCase();
    if (!value) continue;
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates].sort();
}

export function isIsoDate(value: string | undefined): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function isHttpUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function conceptIdFromHref(href: string): string | null {
  const match = href.match(/\/concepts\/?#([^/?#]+)/i);
  return match?.[1] ?? null;
}

export function formatList(values: string[]): string {
  return values.length ? values.join(", ") : "none";
}
