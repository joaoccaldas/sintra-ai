# Sintra → governed RAG discovery → etalia.edu curriculum

**Status: engineering candidate / not approved.** These exports inventory public Sintra editorial metadata and draft learning-path structures, not verified RAG evidence or licensed teaching content.

## Existing source of truth and generated outputs
- Existing draft PR #35: /api/rag-candidates.json, for KNOWLEDGE only, with rights unknown.
- This stacked branch: /api/etalia-discovery-candidates.json normalizes metadata from 16 public Sintra collections.
- This stacked branch: /api/etalia-course-candidates.json projects existing learning paths into course and module OUTLINES.
- Source remains the existing Sintra TS/JSON content, not a duplicated database or crawler.
- Static assets are public after merge and deployment. Publishing requires owner/legal editorial review. No direct RAG, Supabase, Neon or etalia.edu writes occur.

## Source coverage
KNOWLEDGE, USE_CASES, CONCEPTS, GUIDES, TOPIC_HUBS, AI_TOOLS, AI_MODELS, LEARNING_PATHS, RESOURCES, RESEARCH_PAPERS, YOUTUBE_VIDEOS, AI_LABS, COLLECTIONS, MILESTONES, AI_NEWS, AUTOMATION_WORKFLOWS.

Treat other Sintra resources by grain: weekly picks are derived views, not new underlying evidence; UI / branding / 3D assets need asset-rights checks; feed content can be unverified news signals; model recommendations need current verification. The synthetic Nordvik finance calculations have their own baseline receipt. No employer or real client data is in scope.

## Identity, normalization, permissions
- Stable candidate key: sintra:<collection>:<source-id>. Never deduplicate by title alone.
- Tags normalize to NFKC, lowercase, trimmed, sorted unique values.
- Copy only titles, editorial short descriptions, source link metadata, attribution, original review/add dates, status. Never copy third-party bodies, use-case prompts, example outputs or untrusted instructions into the metadata.
- Build timestamp is file assembly time, not verification. Missing review dates stay null.
- Every candidate has rights UNKNOWN, verification PENDING_VERIFICATION, admission CANDIDATE_ONLY and education DRAFT_ONLY.
- Duplicated candidate IDs fail. Shared external URLs are review hints rather than proof two claims are equivalent.
- Current use-case IDs are derived from their title slugs: changing a title can change identity. Before production sync, implement reviewed ID aliases, not destructive overwrite.

## Private Finance RAG intake contract
1. Inspect the manifest in an isolated, read-only discovery stage and record SHA, source revision, import timestamp and dedup receipt. Do not reactivate paused AUT-0001 or create a redundant crawler.
2. Independently verify original first-party source, each material factual claim, effective time, author/licence, permitted uses, reproduction/embedding rights and privacy.
3. Admit a minimal versioned derivative ONLY after approval into the existing canonical source/claim store, with original provenance, content fingerprint, audience visibility and explicit permitted purposes.
4. Test retrieval and answer quality on source recall, citation accuracy, contradictions, recency, abstention and injected-text resistance. Compare numerical FP&A claims with synthetic Nordvik reference calculations.
5. Keep an audit trail of every acceptance/rejection and rollback. A Sintra build cannot autonomously approve knowledge.

## etalia.edu course factory
Course → Module → Lesson → Worked example → Lab → Rubric → Quiz → Feedback → Certification criteria. This export provides only Course and Module OUTLINES. Modules require learning objectives, legal/editorial review, lab execution, accessible assets, language adaptation and assessed mastery before learner exposure.

### Pilot curriculum, proposed and not published
**Evidence-First AI for Finance Teams.** Audience: finance analysts, controllers, FP&A leaders and AI architects. Four modules of roughly 30–45 minutes each, with synthetic Nordvik Home Appliances AB data only.

| Module | Outcome | Sintra reference | Practice / assessment |
|---|---|---|---|
| 1. Evidence boundary | Distinguish untested prompt, source claim and verified result | concept rag; guide rag-architecture; knowledge power-bi-mcp | Label 12 mixed statements and justify three abstentions |
| 2. Governed RAG | Design IDs, source permissions, recency and citations | knowledge power-bi-variance-review; guide rag-architecture | Reject stale, unlicensed and injected documents; produce a source receipt |
| 3. MCP + finance agents | Separate delegated reading from privileged model authoring | knowledge power-bi-mcp; power-bi-model-change | Choose permissions for three scenarios and produce a safe test plan |
| 4. Variance analysis | Reconcile reported numbers without inventing drivers | synthetic power-bi variance workflow | Reconcile currency, entity, period and model total; explain residual |

**Capstone:** A user asks why revenue missed forecast and asks to automatically edit a semantic model. Learner must first verify entity, period, currency and grain; run a read-only, approved calculation; separate observation from causal hypothesis; obtain owner approval before authoring; and propose tests plus rollback.

Draft rubric (not a validated exam): traceable citations 25%, numeric reconciliation 25%, least privilege 20%, abstention/injection handling 20%, communication 10%. An instructor must review the rubric and passing standard before learner certification. This is not an official Anthropic or CCAR-P certification.

## Required checks and approvals
Run npm test, npm run typecheck and npm run check on a real checkout. Confirm 16 collection counts reconcile, generated assets have no body/prompt, IDs remain unique, source dates are not renewed, and no write to external systems occurs. PR merge, source rights, etalia.edu repository/LMS, tenant controls, translations, course publication and credential claims need separate owner approval.

**Status:** code proposed in a review branch; tests and CI results must be recorded before any approval.
