# Sintra → Obsidian (Second Brain)

Two complementary ways to get Sintra's knowledge — and your own raw notes — into
an Obsidian vault that Claude Code and local agents (e.g. openclaw) can read natively.

## 1. Bulk export the site's knowledge — `npm run export:obsidian`
Generates a markdown vault from Sintra's data files: one note per item with YAML
frontmatter (`type`, `tags`, source `url`, dates) and `[[wikilinks]]`
(prompts → tools, concepts → related concepts), plus per-section Maps of Content
and a root `Sintra AI.md`.

```bash
npm run export:obsidian                      # → ./obsidian-vault (gitignored)
OBSIDIAN_OUT=/path/to/vault npm run export:obsidian
```

Covers prompts, tools, concepts, news, learning paths, resources, labs, and the
history timeline (~940 notes). Re-run any time to refresh — it reads the same
data the site uses, kept current by the daily `/update-news` task.

In PARA terms this export is **Resources** (reference material): drop it under a
`Resources/Sintra AI/` folder in your vault if you organize with PARA.

- Code: `scripts/export-obsidian.ts` + pure helpers `scripts/obsidian-lib.ts`
  (tested in `scripts/tests/obsidian-lib.test.ts`, runs under `npm run check`).
- Add a content type: read its data file and call `write(folder, title, note(fm, body))`.

## 2. Turn raw input into PARA notes — `/second-brain`
A Claude Code command (`.claude/commands/second-brain.md`) implementing the
"Second Brain builder" workflow: paste notes/ideas/articles/highlights and it
returns **atomic** notes as ready-to-copy ```markdown blocks — strong titles,
`[[wikilinks]]`, `#tags`, YAML frontmatter (`date`, `source`, `para`), extracted
**insights / action items / connections**, a suggested PARA folder, and a closing
summary + next step.

```
/second-brain <paste raw data, or attach a screenshot/article>
```

It prefers linking to notes the bulk export already created (same titles → links
resolve), so ad-hoc captures connect straight into the Sintra knowledge graph.

## Using the vault with Claude Code / openclaw
The vault is plain markdown on disk — point the agent at the folder and it can
read, search, follow `[[wikilinks]]`, and cite notes with no API. Examples:
- "Summarise every `#prompt` tagged `finance` and draft a combined SOP."
- "From the `#tool` notes, recommend an FP&A stack and link the notes."
- "Follow the `[[wikilinks]]` from [[Retrieval-Augmented Generation]] and build a study path."
