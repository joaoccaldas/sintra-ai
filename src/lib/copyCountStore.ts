const KEY = "sintra_copy_counts";

export function recordCopy(id: string | number) {
  if (typeof window === "undefined") return;
  const key = String(id);
  try {
    const raw = localStorage.getItem(KEY);
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    map[key] = (map[key] ?? 0) + 1;
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

export function getCopyCounts(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
