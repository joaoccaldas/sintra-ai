/**
 * Build-time metadata projection for private downstream assessment.
 * Candidate files are NOT RAG admission, license clearance or course publishing.
 * Sources are existing Sintra collections: no new crawler or shadow catalog.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { KNOWLEDGE } from "../src/lib/knowledgeData.js";
import { USE_CASES } from "../src/lib/data.js";
import { CONCEPTS } from "../src/lib/concepts.js";
import { GUIDES } from "../src/lib/guidesData.js";
import { TOPIC_HUBS } from "../src/lib/topicHubs.js";
import { AI_TOOLS } from "../src/lib/toolsData.js";
import { AI_MODELS } from "../src/lib/modelsData.js";
import { LEARNING_PATHS } from "../src/lib/learningPathsData.js";
import { RESOURCES } from "../src/lib/resourcesData.js";
import { RESEARCH_PAPERS } from "../src/lib/researchData.js";
import { YOUTUBE_VIDEOS } from "../src/lib/videoData.js";
import { AI_LABS } from "../src/lib/aiLabsData.js";
import { COLLECTIONS } from "../src/lib/collections.js";
import { MILESTONES } from "../src/lib/timelineData.js";
import { AI_NEWS } from "../src/lib/newsDataCombined.js";
import { AUTOMATION_WORKFLOWS } from "../src/lib/automationData.js";
import { buildSintraDiscovery, buildEtaliaCourseCandidates, type DiscoverySeed } from "../src/lib/etaliaCandidateExport.js";

const SITE = "https://joaoccaldas.github.io/sintra-ai";
const generatedAt = new Date().toISOString();
const seeds: DiscoverySeed[] = [
  ...KNOWLEDGE.map(r => ({
    collection: "knowledge", id: r.id, title: r.title, summary: r.summary,
    path: '/knowledge/' + r.id + '/', tags: r.tags,
    referenceUrls: r.sources.map(s => s.url),
    reviewedAt: r.reviewedAt, evidenceLevel: r.evidenceLevel, executionStatus: r.executionStatus,
    audience: r.audiences?.join(", "),
  })),
  ...USE_CASES.map(r => ({
    collection: "use-cases", id: r.slug, title: r.title, summary: r.desc,
    path: '/prompts/' + r.slug + '/', tags: r.tags,
    sourceAttribution: r.source, addedAt: r.dateAdded,
    reviewedAt: r.last_verified, difficulty: r.difficulty,
    evidenceLevel: "EXAMPLE_PROMPT_NOT_EXECUTION",
  })),
  ...CONCEPTS.map(r => ({
    collection: "concepts", id: r.id, title: r.term, summary: r.tagline,
    path: '/concepts/#' + r.id, tags: [r.category],
    difficulty: String(r.difficulty), addedAt: r.addedAt,
  })),
  ...GUIDES.map(r => ({
    collection: "guides", id: r.slug, title: r.title, summary: r.tagline,
    path: '/guides/' + r.slug + '/', tags: [r.level],
    difficulty: r.level,
  })),
  ...TOPIC_HUBS.map(r => ({
    collection: "topics", id: r.slug, title: r.label, summary: r.description,
    path: '/topics/' + r.slug + '/', tags: r.matchTags,
  })),
  ...AI_TOOLS.map(r => ({
    collection: "tools", id: r.id, title: r.name, summary: r.tagline,
    path: '/tools/' + r.id + '/', tags: r.tags,
    referenceUrls: [r.url], sourceAttribution: r.provider,
  })),
  ...AI_MODELS.map(r => ({
    collection: "models", id: r.id, title: r.name, summary: r.highlight,
    path: '/models/', tags: [r.provider, r.tier],
    referenceUrls: [r.docsUrl], sourceAttribution: r.provider,
    reviewedAt: r.lastVerified,
  })),
  ...LEARNING_PATHS.map(r => ({
    collection: "learning-paths", id: r.id, title: r.title, summary: r.tagline,
    path: '/learn/', tags: [r.level], audience: r.audience, difficulty: r.level,
  })),
  ...RESOURCES.map(r => ({
    collection: "resources", id: r.id, title: r.name, summary: r.tagline,
    path: '/resources/', tags: r.tags, referenceUrls: [r.url],
  })),
  ...RESEARCH_PAPERS.map(r => ({
    collection: "research", id: r.id, title: r.title, summary: r.tldr,
    path: '/research/', tags: r.tags,
    referenceUrls: r.url ? [r.url] : [], difficulty: r.difficulty,
    sourceAttribution: r.authors, addedAt: r.dateAdded,
  })),
  ...YOUTUBE_VIDEOS.map(r => ({
    collection: "videos", id: r.id, title: r.title, summary: r.summary,
    path: '/videos/', tags: r.tags, referenceUrls: [r.url],
    sourceAttribution: r.channel,
  })),
  ...AI_LABS.map(r => ({
    collection: "labs", id: r.id, title: r.name, summary: r.tagline,
    path: '/ai-labs/', tags: r.focus, referenceUrls: [r.website],
  })),
  ...COLLECTIONS.map(r => ({
    collection: "collections", id: r.id, title: r.title, summary: r.tagline,
    path: '/library/', tags: [r.category, r.tag].filter((v): v is string => Boolean(v)),
  })),
  ...MILESTONES.map(r => ({
    collection: "history", id: r.id, title: r.title, summary: r.desc,
    path: '/ai-history/', tags: r.tags,
    referenceUrls: r.links?.map(l => l.url) ?? [],
  })),
  ...AI_NEWS.map(r => ({
    collection: "news", id: r.id, title: r.title, summary: r.summary,
    path: '/news/', tags: r.tags,
    referenceUrls: r.url ? [r.url] : [], sourceAttribution: r.provider,
  })),
  ...AUTOMATION_WORKFLOWS.map(r => ({
    collection: "automation", id: r.id, title: r.title, summary: r.summary,
    path: '/automate/', tags: [r.domain, ...r.tools], difficulty: r.maturity,
  })),
];

const discovery = buildSintraDiscovery(seeds, SITE, generatedAt);
const courses = buildEtaliaCourseCandidates(LEARNING_PATHS, SITE, generatedAt);
const dir = join(dirname(fileURLToPath(import.meta.url)), "../public/api");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "etalia-discovery-candidates.json"), JSON.stringify(discovery, null, 2));
writeFileSync(join(dir, "etalia-course-candidates.json"), JSON.stringify(courses, null, 2));
console.log('✓ Etalia candidate discovery: ' + discovery.count + ' records from ' +
  Object.keys(discovery.countsByCollection).length + ' collections');
console.log('  Collection census: ' + JSON.stringify(discovery.countsByCollection));
console.log('  Quarantined records: ' + discovery.quarantinedCount +
  ' (from ' + discovery.sourceCount + ' raw seeds), collisions: ' +
  discovery.quarantined.map(item => item.candidateId).join(', '));
console.log('✓ Etalia course candidates: ' + courses.courseCount +
  ' outlines / ' + courses.moduleCount + ' unreviewed module outlines');
