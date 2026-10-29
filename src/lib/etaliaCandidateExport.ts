/**
 * Etalia / Finance RAG discovery contract.
 * This is metadata only: never embed, copy, republish or teach from this export
 * without separate purpose, licensing, privacy and factual review.
 */
export interface DiscoverySeed {
  collection: string;
  id: string;
  title: string;
  summary?: string;
  path: string;
  tags?: string[];
  referenceUrls?: string[];
  sourceAttribution?: string;
  reviewedAt?: string;
  addedAt?: string;
  difficulty?: string;
  audience?: string;
  executionStatus?: string;
  evidenceLevel?: string;
}

export interface SintraLearningPathSeed {
  id: string;
  title: string;
  tagline: string;
  level: string;
  audience: string;
  totalDuration: string;
  steps: { type: string; label: string; desc: string; href: string; duration: string }[];
}

const safeId = (s: string) => /^[a-z0-9][a-z0-9._-]*$/.test(s);
const normalizeTags = (tags: string[] = []) =>
  [...new Set(tags.filter(t => typeof t === "string").map(t => t.normalize("NFKC").trim().toLowerCase()).filter(Boolean))].sort();
const httpsUrls = (urls: string[] = []) =>
  [...new Set(urls.filter(u => typeof u === "string" && /^https:\/\/[^/\s?#]+/i.test(u)))].sort();

export function buildSintraDiscovery(seeds: DiscoverySeed[], siteUrl: string, generatedAt: string) {
  if (!/^https:\/\/[^/\s?#]+/.test(siteUrl)) throw new Error("HTTPS site URL required");
  const seen = new Set<string>();
  const data = seeds.map(seed => {
    if (!safeId(seed.collection) || !safeId(seed.id)) throw new Error("Invalid stable candidate ID");
    if (!seed.title?.trim() || !seed.path.startsWith("/") || seed.path.startsWith("//")) {
      throw new Error("Candidate requires title and safe site-relative path");
    }
    const candidateId = 'sintra:' + seed.collection + ':' + seed.id;
    if (seen.has(candidateId)) throw new Error('Duplicate candidate ID: ' + candidateId);
    seen.add(candidateId);
    return {
      candidateId, sourceSystem: "sintra-ai",
      sourceCollection: seed.collection, sourceRecordId: seed.id,
      title: seed.title.trim(), summary: (seed.summary ?? "").trim(),
      canonicalUrl: siteUrl.replace(/\/+$/, "") + seed.path,
      referenceUrls: httpsUrls(seed.referenceUrls),
      sourceAttribution: seed.sourceAttribution ?? null,
      tags: normalizeTags(seed.tags),
      reviewedAt: seed.reviewedAt ?? null,
      addedAt: seed.addedAt ?? null,
      difficulty: seed.difficulty ?? null,
      audience: seed.audience ?? null,
      executionStatus: seed.executionStatus ?? "NOT_EVALUATED",
      evidenceLevel: seed.evidenceLevel ?? "EDITORIAL_UNVERIFIED",
      rightsStatus: "UNKNOWN" as const,
      permissionStatus: "NOT_ASSESSED" as const,
      verificationStatus: "PENDING_VERIFICATION" as const,
      admissionStatus: "CANDIDATE_ONLY" as const,
      educationalPublicationStatus: "DRAFT_ONLY" as const,
    };
  }).sort((a, b) => a.candidateId.localeCompare(b.candidateId));
  const countsByCollection: Record<string, number> = {};
  for (const record of data) countsByCollection[record.sourceCollection] =
    (countsByCollection[record.sourceCollection] ?? 0) + 1;
  const externalUrlGroups = new Map<string, string[]>();
  for (const record of data) for (const url of record.referenceUrls) {
    externalUrlGroups.set(url, [...(externalUrlGroups.get(url) ?? []), record.candidateId]);
  }
  const sharedExternalReferences = [...externalUrlGroups.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([url, candidateIds]) => ({ url, candidateIds })).sort((a,b)=>a.url.localeCompare(b.url));
  return {
    schemaVersion: "1.0", source: "sintra-ai", generatedAt, status: "CANDIDATE_ONLY",
    promotionAllowed: false, count: data.length, countsByCollection,
    diagnostics: {
      missingExternalReferences: data.filter(r => !r.referenceUrls.length).length,
      sharedExternalReferences,
      note: "Shared source URLs are review hints, not evidence of duplicate claims. Missing URL is not an automatic rejection of first-party editorial material.",
    },
    policy: "Metadata discovery only. Do not embed source bodies, copy third-party content, execute prompts, infer source verification from generatedAt, or publish training until rights and evidence are approved.",
    data,
  };
}

function learningHref(href: string, siteUrl: string) {
  if (!href.startsWith("/sintra-ai/") && href !== "/sintra-ai") {
    throw new Error("Learning step must use the canonical Sintra path: " + href);
  }
  return siteUrl.replace(/\/+$/, "") + href.slice("/sintra-ai".length);
}

export function buildEtaliaCourseCandidates(paths: SintraLearningPathSeed[], siteUrl: string, generatedAt: string) {
  const seen = new Set<string>();
  const data = paths.map(path => {
    if (!safeId(path.id) || seen.has(path.id)) throw new Error("Duplicate or invalid course path ID");
    seen.add(path.id);
    return {
      courseCandidateId: 'etalia:course:sintra:' + path.id,
      upstreamId: 'sintra:learning-paths:' + path.id,
      title: path.title, overview: path.tagline,
      level: path.level, audience: path.audience, estimatedDuration: path.totalDuration,
      locale: "en", // current canonical Sintra learning-path copy is English
      modules: path.steps.map((step, index) => ({
        moduleCandidateId: 'etalia:module:sintra:' + path.id + ':' + String(index + 1).padStart(2, "0"),
        sequence: index + 1, title: step.label, overview: step.desc,
        activityType: step.type, estimatedDuration: step.duration,
        sourceUrl: learningHref(step.href, siteUrl),
        learningObjectiveStatus: "NEEDS_EDITORIAL_REVIEW",
        assessmentStatus: "NOT_AUTHORED",
        labStatus: "NOT_VALIDATED",
      })),
      rightsStatus: "UNKNOWN", approvalStatus: "CURRICULUM_DRAFT_ONLY",
      publishable: false, learnerEnrollmentEnabled: false,
    };
  });
  return {
    schemaVersion: "1.0", source: "sintra-ai", destination: "etalia.edu",
    generatedAt, status: "CURRICULUM_DRAFT_ONLY", publicationAllowed: false,
    courseCount: data.length, moduleCount: data.reduce((n,p)=>n+p.modules.length,0),
    policy: "Candidate course outlines only; not reviewed instructional content, assessed learning, certificates or course publication. Require rights, learner objectives, scenario/lab, rubric, accessibility and human editorial review.",
    data,
  };
}
