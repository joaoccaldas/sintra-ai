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
  { path: "/llms.txt", contains: "Curated index — links + one-line description of every concept, guide, and topic." },
  { path: "/llms-full.txt", contains: "Full text of every concept, guide, and topic playbook, concatenated." },
  { path: "/api/topics.json", contains: "Every topic hub, including the full playbook object (design principles, recommended stack, best use cases, pitfalls, tips) where one exists." },
  { path: "/api/concepts.json", contains: "Every concept: term, tagline, full body, analogy, difficulty, related concept IDs." },
  { path: "/api/guides.json", contains: "Every guide: title, tagline, and full section-by-section body." },
  { path: "/api/tools.json", contains: "Every tool: pricing tier, provider, category, and a direct URL." },
  { path: "/api/models.json", contains: "Every tracked model: provider, tier, release date." },
  { path: "/api/use-cases.json", contains: "All prompt-library items (metadata + outcome, not the full prompt text — see below for that)." },
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
            Sintra AI is built to be read by people and queried by agents. Every content type below
            has a stable URL pattern, a JSON mirror, and — where it matters — schema.org structured
            data embedded directly in the page. Nothing here requires an API key or authentication;
            everything is a static file, generated at build time and re-generated on every deploy.
          </p>

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
            <div className="rounded-xl border border-white/[0.08] overflow-hidden">
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
                        <code className="font-mono text-[13px] text-violet-bright">{e.path}</code>
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
              last deploy, generally within 24 hours. Every JSON endpoint includes a{" "}
              <code className="font-mono text-[13px]">generatedAt</code> ISO timestamp; check it
              before assuming an item is current. News and the live feed change daily; concepts,
              guides, and topic playbooks change far less often.
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
