import { USE_CASES } from "../src/lib/data";
import { AI_NEWS } from "../src/lib/newsData";
import { AI_TOOLS } from "../src/lib/toolsData";
import { AI_MODELS } from "../src/lib/modelsData";
import { CONCEPTS } from "../src/lib/concepts";
import { LEARNING_PATHS } from "../src/lib/learningPathsData";
import { GUIDES } from "../src/lib/guidesData";
import {
  conceptIdFromHref,
  findDuplicates,
  formatList,
  isHttpUrl,
  isIsoDate,
} from "./content-audit-lib";

type Problem = { scope: string; message: string };

const errors: Problem[] = [];
const warnings: Problem[] = [];

function fail(scope: string, message: string): void {
  errors.push({ scope, message });
}

function warn(scope: string, message: string): void {
  warnings.push({ scope, message });
}

function requireUnique(scope: string, values: string[]): void {
  const duplicates = findDuplicates(values);
  if (duplicates.length) fail(scope, `duplicate identifiers: ${formatList(duplicates)}`);
}

function reportLegacyDuplicates(scope: string, values: string[]): void {
  const duplicates = findDuplicates(values);
  if (duplicates.length) {
    warn(scope, `legacy duplicate identifiers require migration: ${formatList(duplicates)}`);
  }
}

function requireHttpUrl(scope: string, value: string | undefined): void {
  if (!isHttpUrl(value)) fail(scope, `invalid URL: ${value ?? "missing"}`);
}

requireUnique("use cases", USE_CASES.map(item => item.slug));
requireUnique("news", AI_NEWS.map(item => item.id));
requireUnique("tools", AI_TOOLS.map(item => item.id));
requireUnique("models", AI_MODELS.map(item => item.id));
reportLegacyDuplicates("concepts", CONCEPTS.map(item => item.id));
requireUnique("learning paths", LEARNING_PATHS.map(item => item.id));
requireUnique("guides", GUIDES.map(item => item.slug));

const toolIds = new Set(AI_TOOLS.map(tool => tool.id));
const conceptIds = new Set(CONCEPTS.map(concept => concept.id));

for (const item of USE_CASES) {
  const scope = `use case:${item.slug}`;
  if (!item.title.trim()) fail(scope, "missing title");
  if (!item.prompt.trim()) fail(scope, "missing prompt");
  if (!isIsoDate(item.dateAdded)) fail(scope, `invalid dateAdded: ${item.dateAdded}`);
  if (item.last_verified && !isIsoDate(item.last_verified)) {
    fail(scope, `invalid last_verified: ${item.last_verified}`);
  }
  for (const toolId of item.related_tools ?? []) {
    if (!toolIds.has(toolId)) warn(scope, `related tool does not exist: ${toolId}`);
  }
}

for (const item of AI_NEWS) {
  const scope = `news:${item.id}`;
  if (!/^\d{6}$/.test(String(item.dateNum))) fail(scope, `invalid dateNum: ${item.dateNum}`);
  if (item.dateDay !== undefined && (item.dateDay < 1 || item.dateDay > 31)) {
    fail(scope, `invalid dateDay: ${item.dateDay}`);
  }
  if (item.url) requireHttpUrl(scope, item.url);
  if (!item.summary.trim()) fail(scope, "missing summary");
}

for (const item of AI_TOOLS) {
  const scope = `tool:${item.id}`;
  requireHttpUrl(scope, item.url);
  if (!item.description.trim()) fail(scope, "missing description");
  if (!item.highlight.trim()) warn(scope, "missing editorial highlight");
}

for (const item of AI_MODELS) {
  const scope = `model:${item.id}`;
  requireHttpUrl(scope, item.docsUrl);
  if (!isIsoDate(item.lastVerified)) fail(scope, `invalid lastVerified: ${item.lastVerified}`);
  if (item.contextWindow <= 0) fail(scope, "contextWindow must be positive");
  if (item.inputPrice !== null && item.inputPrice < 0) fail(scope, "inputPrice must not be negative");
  if (item.outputPrice !== null && item.outputPrice < 0) fail(scope, "outputPrice must not be negative");
}

for (const item of CONCEPTS) {
  const scope = `concept:${item.id}`;
  for (const relatedId of item.related) {
    if (!conceptIds.has(relatedId)) {
      warn(scope, `legacy related concept does not exist: ${relatedId}`);
    }
  }
  if (item.learnMore) requireHttpUrl(scope, item.learnMore);
  if (!isIsoDate(item.addedAt)) fail(scope, `invalid addedAt: ${item.addedAt}`);
}

for (const path of LEARNING_PATHS) {
  const scope = `learning path:${path.id}`;
  if (!path.steps.length) fail(scope, "path has no steps");
  for (const [index, step] of path.steps.entries()) {
    if (!step.href.trim()) fail(scope, `step ${index + 1} has no href`);
    const conceptId = conceptIdFromHref(step.href);
    if (conceptId && !conceptIds.has(conceptId)) {
      fail(scope, `step ${index + 1} references missing concept: ${conceptId}`);
    }
  }
}

if (warnings.length) {
  console.warn(`\nContent audit warnings (${warnings.length})`);
  for (const issue of warnings) console.warn(`  WARN [${issue.scope}] ${issue.message}`);
}

if (errors.length) {
  console.error(`\nContent audit failed (${errors.length} errors)`);
  for (const issue of errors) console.error(`  ERROR [${issue.scope}] ${issue.message}`);
  process.exit(1);
}

console.log(
  `Content graph release checks passed: ${USE_CASES.length} use cases, ${AI_NEWS.length} news items, ` +
  `${AI_TOOLS.length} tools, ${AI_MODELS.length} models, ${CONCEPTS.length} concept records, ` +
  `${LEARNING_PATHS.length} learning paths, ${GUIDES.length} guides.`,
);
