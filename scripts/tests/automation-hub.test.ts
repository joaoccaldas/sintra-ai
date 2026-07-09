import test from "node:test";
import assert from "node:assert/strict";
import {
  AUTOMATION_GUARDRAILS,
  AUTOMATION_PILLARS,
  AUTOMATION_STACK,
  AUTOMATION_WORKFLOWS,
} from "../../src/lib/automationData";

test("automation hub has complete operating-loop data", () => {
  assert.equal(AUTOMATION_PILLARS.length, 4);
  assert.ok(AUTOMATION_WORKFLOWS.length >= 6);
  assert.ok(AUTOMATION_STACK.length >= 6);
  assert.ok(AUTOMATION_GUARDRAILS.length >= 5);
});

test("automation workflow IDs and links are safe", () => {
  const ids = new Set<string>();
  for (const workflow of AUTOMATION_WORKFLOWS) {
    assert.ok(workflow.id, "workflow id is required");
    assert.ok(!ids.has(workflow.id), `duplicate workflow id: ${workflow.id}`);
    ids.add(workflow.id);
    assert.ok(workflow.title.trim(), `missing title for ${workflow.id}`);
    assert.ok(workflow.summary.trim(), `missing summary for ${workflow.id}`);
    assert.ok(workflow.outcome.trim(), `missing outcome for ${workflow.id}`);
    assert.ok(workflow.steps.length >= 4, `${workflow.id} needs at least four steps`);
    assert.ok(workflow.tools.length >= 3, `${workflow.id} needs at least three tools`);
    assert.ok(!workflow.href.startsWith("/sintra-ai/"), `${workflow.id} hardcodes base path`);
    assert.ok(workflow.href.startsWith("/") || workflow.href.startsWith("https://"), `${workflow.id} has invalid href`);
  }
});

test("automation stack examples are concise", () => {
  for (const layer of AUTOMATION_STACK) {
    assert.ok(layer.id.trim(), "stack layer id is required");
    assert.ok(layer.label.trim(), `missing label for ${layer.id}`);
    assert.ok(layer.examples.length >= 3, `${layer.id} needs at least three examples`);
  }
});
