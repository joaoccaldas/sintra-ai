# Use Case Schema

All use cases live in `src/data/useCases.json`. Each object must follow this schema exactly. The page automatically picks up new entries — no code changes required for new use cases.

---

## Required Fields

| Field | Type | Valid values / format |
|---|---|---|
| `domain` | string | See **Domain → Category mapping** below |
| `skill_level` | string | `"BEGINNER"` · `"INTERMEDIATE"` · `"ADVANCED"` · `"EXPERT"` |
| `title` | string | Short, action-oriented title (max ~60 chars) |
| `prompt` | string | Full prompt template. Use `[placeholder]` for user-supplied values |
| `tags` | string[] | 2–5 lowercase kebab-case strings |
| `outcome` | string | One sentence: what the user ends up with |
| `inputs` | `{ label: string }[]` | One entry per `[placeholder]` in the prompt |
| `tools` | string[] | Software the prompt works with (e.g. `"Notion"`, `"Excel"`) |
| `output_kind` | string | See **output_kind guide** below |
| `sample_output` | string | Markdown-formatted realistic example of the AI response |

## Optional Fields

| Field | Type | Notes |
|---|---|---|
| `section` | string | Sub-section label within the domain |
| `best_for` | string | Who this use case is best for (shown as `desc`) |
| `source` | string | Attribution link or name |
| `skill_emoji` | string | Decorative emoji matching skill level |
| `est_time` | string | Time estimate — kept for reference, not shown in UI |
| `best_llm` | string | Override the auto-derived LLM recommendation (e.g. `"GPT-4o"`) |
| `llm_reason` | string | Override reason text (required if `best_llm` is set) |

> `best_llm` and `llm_reason` are **auto-derived** from category + skill level (see `src/lib/data.ts → LLM_MAP`). Only add them to JSON when the auto-derived value would be wrong for a specific use case.

---

## Domain → Category Mapping

| `domain` value | Page category | Carousel position |
|---|---|---|
| `"Quick Wins"` | Quick Wins | 1 — beginner-friendly |
| `"Personal Productivity"` | Productivity | 2 |
| `"Communication & Writing"` | Writing & Copy | 3 |
| `"Research & Analysis"` | Research | 4 |
| `"Business Intelligence"` | Data & Finance | 5 |
| `"Software Development"` | Code & Build | 6 |
| `"Creative AI"` | Creative AI | 7 |
| `"Game Development"` | Game & Advanced | 8 |

To add a new top-level category, update `DOMAIN_MAP` in `src/lib/data.ts` and add the entry to `CAROUSEL_ITEMS` in `src/components/CategoryCarousel3D.tsx`.

---

## output_kind Guide

| value | Use when the output is… |
|---|---|
| `analysis` | A written breakdown, findings, or evaluation |
| `code` | Runnable code, scripts, or config files |
| `visual` | Charts, diagrams, or image generation specs |
| `spec` | A formal specification or requirements doc |
| `templates` | Reusable text or document templates |
| `table` | A structured table of data |
| `deck` | Slide deck outline or full content |
| `plan` | A project plan, roadmap, or action list |

---

## Difficulty Guide

| `skill_level` | Meaning | Auto-selected LLM |
|---|---|---|
| `BEGINNER` | No prior AI experience needed; under 15 min | Claude Haiku 3.5 or Perplexity |
| `INTERMEDIATE` | Comfortable with prompting; 15–60 min | Claude 3.5 Sonnet or GPT-4o |
| `ADVANCED` | Some domain expertise needed; 1–3 hrs | Claude 3.5 Sonnet |
| `EXPERT` | Deep expertise; multi-session workflow | Claude Opus 4 |

---

## Prompt Template Rules

- Use `[bracket placeholders]` for every value the user must supply
- Add one matching `{ "label": "..." }` entry in `inputs` per placeholder
- Write prompts in the second person (you / your) with a clear task, context, and output instruction
- Include format instructions in the prompt (e.g. "Output as a markdown table", "Write 3 options")
- Keep prompts under 400 words; split complex workflows into multiple use cases

---

## Complete Example

```json
{
  "domain": "Communication & Writing",
  "section": "Email & Outreach",
  "skill_level": "INTERMEDIATE",
  "title": "Cold Outreach Sequence",
  "prompt": "Write a 3-email cold outreach sequence for [target role] at [company type] companies. The sequence should feel human, reference a specific pain point around [pain point], and end with a low-friction CTA. Keep each email under 120 words.",
  "tags": ["sales", "email", "outreach", "copywriting"],
  "best_for": "SDRs, founders, freelancers",
  "outcome": "A three-email sequence ready to load into your sequencing tool, each under 120 words with distinct opening hooks.",
  "inputs": [
    { "label": "target role" },
    { "label": "company type" },
    { "label": "pain point" }
  ],
  "tools": ["Gmail", "Apollo", "Outreach"],
  "output_kind": "templates",
  "sample_output": "**Email 1 — Hook**\nSubject: Quick question, [Name]\n\nHi [Name],\n\nNoticed [company] just expanded into EMEA — congrats. Most [role]s I talk to at that stage are scrambling to replicate their US pipeline motion without a local team. Happy to share what's worked.\n\nWorth 15 min?\n\n—[Your name]\n\n**Email 2 — Value**\n...\n\n**Email 3 — Breakup**\n..."
}
```

---

## Checklist Before Adding a Use Case

- [ ] `domain` matches one of the values in the mapping table above
- [ ] `skill_level` is uppercase
- [ ] Every `[placeholder]` in `prompt` has a matching entry in `inputs`
- [ ] `sample_output` is realistic, uses markdown formatting, and is 100–400 words
- [ ] `tags` are lowercase and kebab-case
- [ ] `output_kind` matches one of the 8 valid values
- [ ] `title` is action-oriented (starts with a verb or noun-phrase describing the task)
