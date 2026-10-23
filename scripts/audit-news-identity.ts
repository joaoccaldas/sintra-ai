/**
 * Read-only, reproducible identity report for editorial and CI reviews.
 * Run: npx tsx scripts/audit-news-identity.ts
 *
 * This reports exact suppression and headline review candidates, not factual
 * duplicates or independent source verification.
 */
import { AI_NEWS, NEWS_IDENTITY_AUDIT } from "../src/lib/newsDataCombined";

const byOrigin: Record<string, number> = {};
for (const item of AI_NEWS) {
  const origin = item.origin ?? "unspecified";
  byOrigin[origin] = (byOrigin[origin] ?? 0) + 1;
}

const report = {
  schemaVersion: "1.0",
  kind: "news-identity-diagnostic",
  source: "newsDataCombined",
  inputs: NEWS_IDENTITY_AUDIT.inputs,
  visibleRecords: NEWS_IDENTITY_AUDIT.published,
  suppressedExactDuplicates: NEWS_IDENTITY_AUDIT.exactSuppressed.length,
  headlineReviewCandidates: NEWS_IDENTITY_AUDIT.possibleRelatedStories.length,
  byOrigin,
  suppressed: NEWS_IDENTITY_AUDIT.exactSuppressed,
  possibleRelatedStories: NEWS_IDENTITY_AUDIT.possibleRelatedStories,
  interpretation: "Headline matches are for editorial review, not automatic deduplication or source verification.",
};

if (report.inputs !== report.visibleRecords + report.suppressedExactDuplicates) {
  throw new Error("identity accounting invariant failed");
}

console.log(JSON.stringify(report, null, 2));
