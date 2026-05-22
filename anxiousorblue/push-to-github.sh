#!/usr/bin/env bash
set -e

echo ""
echo "=== Push anxiousorblue to GitHub ==="
echo ""
echo "You need a GitHub Personal Access Token with 'repo' scope."
echo "Create one at: https://github.com/settings/tokens/new"
echo ""

# Prompt for token (hidden — never echoed)
read -rsp "Paste your GitHub token (hidden): " GH_TOKEN
echo ""

if [ -z "$GH_TOKEN" ]; then
  echo "No token provided. Exiting."
  exit 1
fi

REPO_URL="https://${GH_TOKEN}@github.com/joaoccaldas/anxiousorblue.git"

cd "$(dirname "$0")"

# Update remote to use token
git remote set-url origin "$REPO_URL"

echo ""
echo "Pushing to github.com/joaoccaldas/anxiousorblue (main)..."
git push -u origin main

# Clear token from remote URL immediately after push
git remote set-url origin "https://github.com/joaoccaldas/anxiousorblue.git"

echo ""
echo "Done! Your code is now at:"
echo "  https://github.com/joaoccaldas/anxiousorblue"
echo ""
echo "Next steps to go live:"
echo "  1. Go to https://github.com/joaoccaldas/anxiousorblue/settings/pages"
echo "  2. Under 'Source', select 'GitHub Actions'"
echo "  3. Save — the workflow will build and deploy automatically (~2 min)"
echo "  4. Site will be live at: https://joaoccaldas.github.io/anxiousorblue"
echo "     (or anxiousorblue.com once DNS is pointed)"
echo ""
