import assert from "node:assert/strict";
import test from "node:test";
import { LIVE_FEED, liveAge, liveFeedAgeHours } from "../../src/lib/liveFeedData";

test("static feed labels use the snapshot clock and can advance after hydration", () => {
  const snapshot = Date.parse(LIVE_FEED.generatedAt);
  const published = new Date(snapshot - 2 * 3_600_000).toISOString();
  assert.equal(liveAge(published), "2h ago");
  assert.equal(liveAge(published, snapshot + 3_600_000), "3h ago");
  assert.equal(liveFeedAgeHours(), 0);
  assert.equal(liveFeedAgeHours(snapshot + 49 * 3_600_000), 49);
  assert.equal(liveAge(null), "");
  assert.equal(liveAge("invalid"), "");
});
