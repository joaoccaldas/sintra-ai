/**
 * Publication dates must not invent a day. Month-only editorial metadata is
 * valid for sorting, but insufficient for machine-readable exact timestamps.
 */

export function exactPublicationDate(dateNum: number, dateDay?: number): string | null {
  if (!Number.isInteger(dateNum) || !Number.isInteger(dateDay)) return null;
  const year = Math.floor(dateNum / 100);
  const month = dateNum % 100;
  if (year < 1900 || year > 2100 || month < 1 || month > 12) return null;
  const maxDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (dateDay! < 1 || dateDay! > maxDay) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(dateDay).padStart(2, "0")}`;
}

/** Accept only exact YYYY-MM-DD known from a publisher (not a release year). */
export function validExactIsoDate(value?: string): string | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  return exactPublicationDate(year * 100 + month, day) === value ? value : null;
}
