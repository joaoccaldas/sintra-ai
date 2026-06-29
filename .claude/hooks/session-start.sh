#!/bin/bash
set -euo pipefail

# SessionStart hook for Claude Code on the web.
# Ensures Node dependencies are installed so `npm run check` (validate-data +
# validate-content + validate-latest-news + typecheck + build) and the
# /update-news task work in fresh remote containers.

# Only run in the remote (Claude Code on the web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Idempotent and cache-friendly: npm install is a no-op when node_modules is
# already warm, and populates it (and the container cache) when it isn't.
npm install --no-audit --no-fund
