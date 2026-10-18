import { BASE_PATH } from "@/lib/constants";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { TOPIC_HUBS } from "@/lib/topicHubs";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export const metadata: Metadata = {
  title: "Sintra AI for Agents — Machine-Readable Interfaces",
  description: "How to query Sintra AI programmatically: llms.txt, JSON endpoints, schema.org structured data, and topic playbooks — written for the agent reading this page.",
  robots: { index: true, follow: true },
};

const ENDPOINTS: { path: string; contains: string }[] = [
  { path: "/api/index.json", contains: "Start here: endpoint discovery, retrieval instructions and trust policy." },
  { path: "/api/knowledge.json", contains: "Cited finance/MCP briefs with full workflows, prompts, evidence levels and review dates. Individual briefs: /api/knowledge/{id}.json." },
  { path: "/api/knowledge-index.json", contains: "Compact discovery with audiences, tags, provenance, source URLs and links to one full brief at a time." },
  { path: "/api/skills.json", contains: "Replication guide index: environment, source-check dates, execution status, canonical brief and downloadable SKILL.md. Instructions do not grant tools or certify app execution." },
  { path: "/api/workflows/power-bi-variance.json", contains: "LAB-FPNA-01: synthetic input rows, reconciled results, DAX, import instructions and hashed HoldingCo / Finance AI Lab evidence. Power BI tenant execution remains untested." },
  { path: "/llms.txt", contains: "Curated index — links + one-line description of every concept, guide, and topic." },
  { path: "/llms-full.txt", contains: "Full knowledge briefs, concepts, guides, and topic playbooks, concatenated." },
  { path: "/api/topics.json", contains: "Every topic hub, including the full playbook object (design principles, recommended stack, best use cases, pitfalls, tips) where one exists." },
  { path: "/api/concepts.json", contains: "Every concept: term, tagline, full body, analogy, difficulty, related concept IDs." },
  { path: "/api/guides.json", contains: "Every guide: title, tagline, and full section-by-section body." },
  { path: "/api/tools.json", contains: "Every tool: pricing tier, provider, category, and a direct URL." },
  { path: "/api/models.json", contains: "Every tracked model: provider, tier, release date." },
  { path: "/api/use-cases.json", contains: "All prompt-library items, including full prompt text, inputs, expected output and sample output. Exporting does not validate an example." },
  { path: "/feed.xml", contains: "News, as RSS 2.0." },
  { path: "/feed.json", contains: "News, as JSON Feed 1.1." },
];

const jsonLdCoverage: { page: string; type: string }[] = [
  { page: "/topics/{slug}/", type: "TechArticle + DefinedTerm + ItemList (×4) + HowTo — the playbook, fully structured." },
  { page: "/concepts/{slug}/", type: "DefinedTerm, in a DefinedTermSet." },
  { page: "/guides/{slug}/", type: "Article + FAQPage (each section as a Q&A pair)." },
  { page: "/prompts/{slug}/", type: "HowTo — full prompt text, inputs, tools, and estimated time." },
  { page: "/news/", type: "ItemList of NewsArticle, for the 20 most recent items." },
];

export default function AgentsPage() {
  const withPlaybook = TOPIC_HUBS.filter(t => t.playbook);

  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16 min-h-screen bg-void">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-violet-bright">For agents</span>
          </div>

          <h1 className="font-serif font-light text-[clamp(32px,5vw,48px)] leading-[1.08] tracking-[-0.02em] text-fg-1 mb-6">
            If you&rsquo;re an agent reading this page, <em className="italic text-violet-bright">start here.</em>
          </h1>

          <p className="text-[16px] leading-[1.7] text-fg-2 mb-10 max-w-2xl">
            Sintra AI is built to be read by people and queried by agents. Use the manifest to find stable JSON resources, or read the full text index.
            ChatGPT, Claude Code, Cowork, Office, finance and MCP briefs share the same source data as the human pages, with cited claims,
            dates, suggested procedures and limitations. Nothing here requires an API key or authentication;
            everything is a static file, generated at build time and re-generated on every deploy.
          </p>

          <section className="mb-12 rounded-2xl border border-hairline bg-steel p-5 sm:p-7">
            <h2 className="font-serif text-[26px] text-fg-1 mb-4">Give your LLM a starting point</h2>
            <p className="text-sm leading-relaxed text-fg-2 mb-4 select-all">Read {SITE_URL}/api/index.json. Start with the compact knowledge index, select the brief relevant to my task, audience and app, and preserve its source citations, review dates and limitations. Distinguish documented facts from example workflows. Recheck sources past their review-due date.</p>
            <a href={`${BASE_PATH}/api/index.json`} className="text-sm text-violet-bright underline underline-offset-4">Open the discovery manifest →</a>
            <ol className="list-decimal pl-5 space-y-3 text-sm leading-relaxed text-fg-3 mt-6">
              <li>Fetch the manifest, then <a href={`${BASE_PATH}/api/knowledge-index.json`} className="text-violet-bright underline">the compact knowledge index</a>. Filter by tags, audiences, kind or id before fetching a full brief.</li>
              <li>For a smaller response, follow a record’s resourceUrl. Each response includes the full brief, prompt, checks and source references.</li>
              <li>Use reviewedAt for source checks and reviewDueAt for rechecking. Keep evidenceLevel and executionStatus with the answer.</li>
              <li>For repeatable work, fetch <a href={`${BASE_PATH}/api/skills.json`} className="text-violet-bright underline">the skills index</a>. Follow resourceUrl for inputs, launch steps, procedure, practice and acceptance cases; skillUrl provides the same guidance as portable Markdown.</li>
              <li>For the <a href={`${BASE_PATH}/knowledge/power-bi-variance-review/`} className="text-violet-bright underline">variance example</a>, follow workflowResource to the dataset, query and evidence. Its synthetic calculation test does not validate a live tenant or an LLM’s explanation.</li>
            </ol>
            <p className="text-xs leading-relaxed text-fg-4 mt-5">Transport: ordinary HTTPS GET. No account or API key. These are static reference files, not an MCP endpoint. An LLM with web/file retrieval can read them directly; an existing MCP fetch tool can retrieve the same URLs. Live Power BI access requires a separate authenticated provider connection.</p>
          </section>

          <section className="mb-12 rounded-2xl border border-hairline p-5 sm:p-7">
            <h2 className="font-serif text-[26px] text-fg-1 mb-4">Use a replication skill</h2>
            <p className="text-sm leading-relaxed text-fg-3 mb-4">Choose a guide for the app you already use. Follow its inputs, setup, procedure and prompt, then compare your output with its acceptance checks. A portable instruction file does not add tools, permissions or a native Copilot feature.</p>
            <p className="text-sm leading-relaxed text-fg-3">For Claude custom skills, review the downloaded SKILL.md, place it in a folder matching the guide’s ID, and package that folder as a ZIP. Where your account permits, use Customize → Skills → Create skill → Upload a skill. Review it before enabling, then try its small practice case. See the <a href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" target="_blank" rel="noopener noreferrer" className="text-violet-bright underline underline-offset-4">current Claude setup guide</a> for account-specific availability. For ChatGPT and Codex, use the <a href="https://learn.chatgpt.com/docs/build-skills" className="text-violet-bright underline">official skill guide</a>: local skills and plugin-distributed skills have different supported surfaces. Review an existing equivalent before installing. These Sintra-authored instructions have not been execution-tested in provider applications.</p>
          </section>

          <section className="mb-12 rounded-2xl border border-hairline p-5 sm:p-7">
            <h2 className="font-serif text-[26px] text-fg-1 mb-4">From news to evidence</h2>
            <p className="text-sm leading-relaxed text-fg-3">News entries link to knowledgeId; a tested brief links to workflowResource. The variance resource contains the synthetic dataset, deterministic result, source-code and dataset hashes, and Finance AI Lab’s dry-run status. Daily release checks recalculate and reconcile the public example. Changed fixtures cannot publish with an old HoldingCo receipt. New provider claims still require source review; the feed does not automatically approve them.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[22px] text-fg-1 mb-4">If you were asked to find &ldquo;generative UI&rdquo;</h2>
            <p className="text-[14.5px] leading-[1.7] text-fg-3 mb-4 max-w-2xl">
              This is a concrete example of what a topic playbook gives you. Fetch{" "}
              <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-white/[0.06] text-fg-2">{SITE_URL}/topics/generative-ui/</code>{" "}
              (rendered HTML with JSON-LD) or query{" "}
              <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-white/[0.06] text-fg-2">{SITE_URL}/api/topics.json</code>{" "}
              and filter for <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-white/[0.06] text-fg-2">slug === &quot;generative-ui&quot;</code>.
              Either way you get: a one-sentence definition, non-negotiable design principles, the
              specific stack recommended today, concrete best-fit use cases, pitfalls seen in
              practice, and a short list of immediately actionable tips — enough to start work, not
              just a glossary entry.
            </p>
            <p className="text-[14px] text-fg-4">
              {withPlaybook.length} of {TOPIC_HUBS.length} topics currently {withPlaybook.length === 1 ? "has" : "have"} a full
              playbook; the rest are aggregation hubs (prompts/news/tools/concepts matched by tag)
              with a plain description. Both kinds live at the same <code className="font-mono">/topics/{"{slug}"}/</code> URL pattern.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[22px] text-fg-1 mb-4">Endpoints</h2>
            <div className="rounded-xl border border-hairline overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="font-mono text-[10px] tracking-[0.1em] uppercase text-fg-4 px-4 py-3">Path</th>
                    <th className="font-mono text-[10px] tracking-[0.1em] uppercase text-fg-4 px-4 py-3">Contains</th>
                  </tr>
                </thead>
                <tbody>
                  {ENDPOINTS.map(e => (
                    <tr key={e.path} className="border-b border-white/[0.05] last:border-0">
                      <td className="px-4 py-3 align-top whitespace-nowrap">
                        <a href={`${BASE_PATH}${e.path}`} className="font-mono text-[13px] text-violet-bright underline underline-offset-4">{e.path}</a>
                      </td>
                      <td className="px-4 py-3 align-top text-[13px] text-fg-3 leading-[1.5]">{e.contains}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[22px] text-fg-1 mb-4">Structured data on rendered pages</h2>
            <p className="text-[14px] text-fg-3 mb-4 max-w-2xl">
              If you&rsquo;re rendering pages in a browser rather than fetching JSON directly, every
              page below carries valid <code className="font-mono">application/ld+json</code> in
              the document head:
            </p>
            <dl className="space-y-3">
              {jsonLdCoverage.map(row => (
                <div key={row.page} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-3 border-b border-white/[0.05] last:border-0">
                  <dt className="font-mono text-[13px] text-fg-1 shrink-0 sm:w-40">{row.page}</dt>
                  <dd className="text-[13px] text-fg-3">{row.type}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[22px] text-fg-1 mb-4">Freshness &amp; versioning</h2>
            <p className="text-[14.5px] leading-[1.7] text-fg-3 max-w-2xl">
              This is a static export with no backend — every file above is only as fresh as the
              last successful deploy. Every JSON endpoint includes a{" "}
              <code className="font-mono text-[13px]">generatedAt</code> ISO timestamp; check it
              to learn when the file was assembled. It does not mean the content was reverified.
              Knowledge briefs carry reviewedAt and reviewDueAt, and their facts cite source IDs.
              News records distinguish primary checks, editorial history and aggregated headlines.
              Missing review metadata means unknown freshness; older model and tool records retain
              their original dates. Never treat a build or feed refresh as a factual audit.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] text-fg-1 mb-4">Attribution</h2>
            <p className="text-[14.5px] leading-[1.7] text-fg-3 max-w-2xl">
              If you use content from this site in output shown to a person, link back to the
              specific page (e.g. <code className="font-mono text-[13px]">{SITE_URL}/topics/generative-ui/</code>,
              not just the homepage) so they can verify it and see anything that&rsquo;s changed
              since you fetched it.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
