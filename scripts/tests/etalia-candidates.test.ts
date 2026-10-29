import assert from "node:assert/strict";
import test from "node:test";
import { LEARNING_PATHS } from "../../src/lib/learningPathsData";
import { buildSintraDiscovery, buildEtaliaCourseCandidates, type DiscoverySeed } from "../../src/lib/etaliaCandidateExport";

const site = "https://example.test/sintra";
const example: DiscoverySeed[] = [
  { collection: "knowledge", id: "finance-variance", title: " Finance Variance ",
    summary: "An editorial example", path: "/knowledge/finance-variance/",
    tags: ["Finance", "finance", "FP&A"], reviewedAt: "2026-10-18",
    referenceUrls: ["https://example.org/doc", "https://example.org/doc"] },
  { collection: "use-cases", id: "rolling-forecast", title: "Rolling forecast",
    summary: "Unexecuted prompt example", path: "/prompts/rolling-forecast/",
    referenceUrls: ["https://example.org/doc"],
    sourceAttribution: "External author's tutorial" },
];

test("candidate records are deterministic metadata, not approved content", () => {
  const a = buildSintraDiscovery(example, site, "2026-10-29");
  const b = buildSintraDiscovery(example.slice().reverse(), site, "2026-11-01");
  assert.equal(a.count, example.length);
  assert.deepEqual(a.data, b.data);
  assert.equal(a.promotionAllowed, false);
  assert.equal(a.status, "CANDIDATE_ONLY");
  assert.deepEqual(a.countsByCollection, { knowledge: 1, "use-cases": 1 });
  assert.equal(a.diagnostics.sharedExternalReferences.length, 1);
  for (const item of a.data) {
    assert.equal(item.rightsStatus, "UNKNOWN");
    assert.equal(item.verificationStatus, "PENDING_VERIFICATION");
    assert.equal(item.admissionStatus, "CANDIDATE_ONLY");
    assert.equal(item.educationalPublicationStatus, "DRAFT_ONLY");
    assert.ok(!("prompt" in item) && !("sample_output" in item) && !("body" in item));
  }
  assert.deepEqual(a.data[0].tags, ["finance", "fp&a"]);
});

test("duplicate IDs quarantine every ambiguous record; unsafe records fail closed", () => {
  const withCollision = buildSintraDiscovery([...example, example[0]], site, "");
  assert.equal(withCollision.sourceCount, 3);
  assert.equal(withCollision.count, 1);
  assert.equal(withCollision.quarantinedCount, 2);
  assert.equal(withCollision.quarantined[0].candidateId, "sintra:knowledge:finance-variance");
  assert.equal(withCollision.quarantined[0].records.length, 2);
  assert.ok(withCollision.data.every(r => r.candidateId !== "sintra:knowledge:finance-variance"));
  assert.throws(() => buildSintraDiscovery([{...example[0], path:"//evil.example"}], site, ""), /safe site-relative/);
  assert.throws(() => buildSintraDiscovery([{...example[0], id:"unsafe ID"}], site, ""), /Invalid/);
});

test("course outlines retain links without inventing assessments or enrollment", () => {
  const courses = buildEtaliaCourseCandidates(LEARNING_PATHS, site, "2026-10-29");
  assert.equal(courses.courseCount, LEARNING_PATHS.length);
  assert.equal(courses.moduleCount, LEARNING_PATHS.reduce((n,p)=>n+p.steps.length,0));
  assert.equal(courses.publicationAllowed, false);
  for (const course of courses.data) {
    assert.equal(course.publishable, false);
    assert.equal(course.learnerEnrollmentEnabled, false);
    course.modules.forEach((module, i) => {
      assert.equal(module.sequence, i + 1);
      assert.equal(module.assessmentStatus, "NOT_AUTHORED");
      assert.equal(module.labStatus, "NOT_VALIDATED");
      assert.ok(module.sourceUrl.startsWith(site + "/"));
    });
  }
});

test("untrusted external links are dropped", () => {
  const result = buildSintraDiscovery([{...example[0], referenceUrls:
    ["javascript:alert(1)", "http://not-secure.test", "https://valid.test/ref"]}], site, "");
  assert.deepEqual(result.data[0].referenceUrls, ["https://valid.test/ref"]);
});
