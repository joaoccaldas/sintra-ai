/**
 * Pure helpers for the Obsidian vault exporter (scripts/export-obsidian.ts).
 * Kept separate and side-effect-free so they can be unit-tested
 * (scripts/tests/obsidian-lib.test.ts).
 */

/** Characters Obsidian disallows in note file names. */
const ILLEGAL_FILENAME = /[\\/:*?"<>|#^[\]]/g;

/** Make a string safe to use as an Obsidian note file name (no extension). */
export function sanitizeFilename(title: string): string {
  return title
    .replace(ILLEGAL_FILENAME, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "untitled";
}

/** Make a string safe as a `[[wikilink]]` target (no link-breaking chars). */
export function wikiTarget(title: string): string {
  return title.replace(/[[\]|#^]/g, "").replace(/\s+/g, " ").trim();
}

/** A `[[wikilink]]`, optionally with a display alias: [[target|alias]]. */
export function wikilink(title: string, alias?: string): string {
  const target = wikiTarget(title);
  return alias && alias !== target ? `[[${target}|${alias}]]` : `[[${target}]]`;
}

/** Convert an arbitrary label into a valid Obsidian tag token (no spaces). */
export function slugTag(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type FrontmatterValue = string | number | boolean | string[] | undefined;

/** Encode a single YAML scalar, quoting only when necessary. */
function yamlScalar(v: string | number | boolean): string {
  if (typeof v !== "string") return String(v);
  // Safe bare strings: letters, digits, spaces and a few punctuation marks,
  // not starting with a YAML indicator. Otherwise JSON-quote (handles escaping).
  if (/^[A-Za-z0-9][A-Za-z0-9 ._\-/]*$/.test(v)) return v;
  return JSON.stringify(v);
}

/** Build a YAML frontmatter block (including the `---` fences) from an object.
 *  `undefined` values and empty arrays are skipped. */
export function frontmatter(obj: Record<string, FrontmatterValue>): string {
  const lines: string[] = ["---"];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${yamlScalar(item)}`);
    } else {
      lines.push(`${key}: ${yamlScalar(value)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

/** Assemble a full note: frontmatter + blank line + body (trailing newline). */
export function note(fm: Record<string, FrontmatterValue>, body: string): string {
  return `${frontmatter(fm)}\n\n${body.trim()}\n`;
}

/** De-duplicate while preserving order. */
export function uniq<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}
