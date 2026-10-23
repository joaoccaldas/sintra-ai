# Studio comparison and refinement criteria

Reviewed 23 October 2026. These are relevant leading-product reference patterns, not a claim of a comprehensive market ranking or hands-on competitive testing. Only Sintra was executed in this evaluation. No competitor account was accessed and no comparative speed/cost superiority is claimed.

| Reference | Documented capability | Studio implication / current gap |
| --- | --- | --- |
| Google NotebookLM | Public YouTube sources and citations linked to transcript passages ([official announcement](https://blog.google/innovation-and-ai/products/notebooklm-audio-video-sources/)) | Timestamp links and inspectable passages are the minimum. Studio preserves track, source hash and fixture/import/live mode. It lacks conversational exploration and broad source ingestion. |
| LangSmith | Dataset-based experiments, expert feedback, separate retrieval and generation evaluation ([official evaluation overview](https://www.langchain.com/langsmith/evaluation)) | Keep fixtures separate from live runs; preserve failed attempts and provider usage; compare refinements on the same benchmark. Current sample size is one video, not a calibrated evaluation dataset. |
| n8n | A human decision can gate a specific tool call and its proposed inputs ([official human review guide](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools/)) | Bind approval to exact content/evidence and enforce it in server code. Studio adds draft invalidation and an export gate; it does not offer n8n's integrations, canvas or multi-user review channels. |

## Refinements driven by evaluation

1. Copy quotations deterministically from validated segment IDs instead of asking the model to reproduce text. The first local-model output failed exact quotation validation.
2. Retrieve a single selected caption track. The broad initial request encountered HTTP 429; the Portuguese track succeeded. Keep language selection visible and configurable.
3. Persist revision-aware run state and recover interrupted work. The ZIP kept everything in memory.
4. Bind approval to the source/transcript/claims/evidence/draft hash. The ZIP retained approval after edits.
5. Reject malformed timestamps, fabricated evidence passages, unsupported citations and unsafe export markup. Never silently drop invalid input.
6. Keep human judgment explicit. An allowed primary-source URL plus matching text is not proof of claim support; the reviewer must assess entailment and limitations.

Next improvements should be measured against held-out videos: extraction coverage and precision, claim/paragraph support, caption-language fidelity, reviewer corrections, time to approved output, and provider failure recovery. Add at least 10 varied videos before drawing general quality conclusions. Broader provider coverage or automation should not weaken the evidence and approval gates.
