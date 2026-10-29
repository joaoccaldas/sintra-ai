import assert from "node:assert/strict";
import test from "node:test";
import { KNOWLEDGE } from "../../src/lib/knowledgeData";
import { buildRagCandidateExport } from "../../src/lib/knowledgeExport";

test("RAG candidate projection is complete, stable and explicitly unapproved", () => {
  const a = buildRagCandidateExport("https://example.test/sintra", "2026-10-29T00:00:00Z");
  const b = buildRagCandidateExport("https://example.test/sintra", "2026-11-01T00:00:00Z");
  assert.equal(a.count, KNOWLEDGE.length);
  assert.equal(a.promotionAllowed, false);
  assert.equal(a.status, "CANDIDATE_ONLY");
  assert.deepEqual(a.data, b.data, "a rebuild must not renew verification");
  assert.equal(new Set(a.data.map(r => r.candidateId)).size, a.data.length);
  for (const item of a.data) {
    assert.equal(item.rightsStatus, "UNKNOWN");
    assert.equal(item.permissionStatus, "NOT_ASSESSED");
    assert.equal(item.verificationStatus, "PENDING_VERIFICATION");
    assert.equal(item.ingestionStatus, "CANDIDATE_ONLY");
    assert.match(item.candidateId, /^sintra:knowledge:[a-z0-9-]+$/);
    assert.ok(item.sourceUrls.length > 0);
    assert.ok(item.reviewDueAt > item.reviewedAt);
    assert.ok(item.canonicalUrl.startsWith("https://example.test/sintra/knowledge/"));
    assert.ok(!("facts" in item) && !("prompt" in item) && !("replication" in item),
      "candidate export must not replicate claim bodies or executable guidance");
  }
});

test("finance lab remains a synthetic-only candidate, never a verified tenant claim", () => {
  const data = buildRagCandidateExport("https://example.test/sintra", "2026-10-29T00:00:00Z").data;
  const lab = data.find(item => item.sourceRecordId === "power-bi-variance-review");
  assert.ok(lab);
  assert.equal(lab.executionStatus, "synthetic-calculation-tested");
  assert.equal(lab.ingestionStatus, "CANDIDATE_ONLY");
});
