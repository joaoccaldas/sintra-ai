import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { exactPublicationDate, validExactIsoDate } from "../../src/lib/publicationDates";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

test("month-only news records have no machine-readable publication date", () => {
  assert.equal(exactPublicationDate(202610), null);
  assert.equal(exactPublicationDate(202610, undefined), null);
  assert.equal(exactPublicationDate(202610, 23), "2026-10-23");
});

test("calendar validation prevents impossible and invented dates", () => {
  assert.equal(exactPublicationDate(202602, 29), null);
  assert.equal(exactPublicationDate(202402, 29), "2024-02-29");
  assert.equal(exactPublicationDate(202604, 31), null);
  assert.equal(exactPublicationDate(202613, 1), null);
  assert.equal(exactPublicationDate(202610, 0), null);
  assert.equal(exactPublicationDate(202610, 1.5), null);
});

test("video upload date requires exact independently sourced YYYY-MM-DD", () => {
  assert.equal(validExactIsoDate("2026"), null);
  assert.equal(validExactIsoDate("2026-01-00"), null);
  assert.equal(validExactIsoDate("2026-02-30"), null);
  assert.equal(validExactIsoDate("2026-10-23"), "2026-10-23");
});

test("all page and feed generators use exact publication date helpers", () => {
  const page = read("src/app/news/page.tsx");
  const video = read("src/app/videos/page.tsx");
  const feed = read("scripts/generate-rss.ts");
  const card = read("src/components/NewsCard.tsx");
  assert.match(page, /exactPublicationDate/);
  assert.doesNotMatch(page, /dateDay\s*\?\?\s*1/);
  assert.match(video, /validExactIsoDate/);
  assert.doesNotMatch(video, /\$\{v\.year\}-01-01/);
  assert.match(feed, /exactPublicationDate/);
  assert.doesNotMatch(feed, /dateDay\s*=\s*1/);
  assert.match(card, /exactPublicationDate/);
});
