import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VarianceExample from "@/components/VarianceExample";
import ReplicationGuide from "@/components/ReplicationGuide";
import { BASE_PATH } from "@/lib/constants";
import { KNOWLEDGE, KNOWLEDGE_KIND_LABELS } from "@/lib/knowledgeData";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";
export function generateStaticParams() { return KNOWLEDGE.map(item => ({ id: item.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = KNOWLEDGE.find(record => record.id === id);
  return item ? { title: `${item.title} — Sintra AI`, description: item.summary, alternates: { canonical: `${SITE_URL}/knowledge/${id}/` } } : {};
}

export default async function KnowledgeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = KNOWLEDGE.find(record => record.id === id);
  if (!item) notFound();
  const structured = { "@context": "https://schema.org", "@type": "TechArticle", headline: item.title, description: item.summary, dateModified: item.reviewedAt, url: `${SITE_URL}/knowledge/${id}/`, citation: item.sources.map(s => s.url), articleBody: item.facts.map(f => f.text).join("\n"), creativeWorkStatus: KNOWLEDGE_KIND_LABELS[item.kind] };
  return <><Header total={USE_CASES_COUNT} /><main id="main-content" className="pt-16 min-h-screen bg-void"><article className="[overflow-wrap:anywhere] max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <Link href="/knowledge/" className="text-sm text-violet-bright">← All knowledge</Link>
    <header className="mt-8 mb-10"><p className="font-mono text-[11px] uppercase tracking-wider text-violet-bright mb-4">{KNOWLEDGE_KIND_LABELS[item.kind]}</p><h1 className="font-serif text-[clamp(34px,5vw,54px)] leading-[1.08] text-fg-1 mb-5">{item.title}</h1><p className="text-lg leading-relaxed text-fg-2 mb-5">{item.summary}</p><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-fg-4"><span>Sources checked <time dateTime={item.reviewedAt}>{item.reviewedAt}</time></span><span>Review due <time dateTime={item.reviewDueAt}>{item.reviewDueAt}</time></span><span>{item.executionStatus === "synthetic-calculation-tested" ? "Synthetic calculation tested · tenant untested" : "No Sintra execution test"}</span></div></header>
    {item.spatial && <section aria-label="Visual procedure" className="mb-10"><div className="flex flex-wrap gap-3 text-xs text-fg-3 mb-4"><Link href={`/knowledge/3d/#${item.spatial.category}`} className="text-violet-bright underline">{item.spatial.categoryLabel} →</Link><span>{item.spatial.complexity}</span></div><figure className="rounded-2xl overflow-hidden border border-hairline bg-steel"><a href={`${BASE_PATH}${item.spatial.diagram.url}`} target="_blank" rel="noopener noreferrer" aria-label="Open the full-size procedure diagram"><img src={`${BASE_PATH}${item.spatial.diagram.url}`} alt={item.spatial.diagram.alt} width={960} height={640} className="w-full h-auto" /></a><figcaption className="px-5 py-4 text-xs leading-relaxed text-fg-3">{item.spatial.diagram.caption} <a href={`${BASE_PATH}${item.spatial.diagram.url}`} target="_blank" rel="noopener noreferrer" className="text-violet-bright underline">Open full size ↗</a>. The complete steps follow below.</figcaption></figure></section>}
    {item.id === "power-bi-variance-review" && <VarianceExample />}
    {item.replication && <ReplicationGuide record={item} />}
    <section className="rounded-2xl border border-hairline bg-steel p-5 sm:p-7 mb-10"><h2 className="font-serif text-2xl text-fg-1 mb-4">What the sources establish</h2><ul className="space-y-4 text-sm leading-relaxed text-fg-2">{item.facts.map((fact, i) => <li key={i}>{fact.text}<span className="ml-2 inline-flex gap-2">{fact.sourceIds.map(sourceId => { const index = item.sources.findIndex(s => s.id === sourceId); return <a key={sourceId} href={`#source-${sourceId}`} className="text-violet-bright underline underline-offset-2" aria-label={`Source ${index + 1}`}>[{index + 1}]</a>; })}</span></li>)}</ul></section>
    <div className="space-y-9">
      {item.integrations && <section><h2 className="font-serif text-2xl text-fg-1 mb-3">Tools and access for this example</h2><dl className="space-y-3">{item.integrations.map(tool => <div key={tool.name}><dt className="text-sm text-fg-1">{tool.name} · {tool.access}</dt><dd className="text-sm leading-relaxed text-fg-3">{tool.purpose}</dd></div>)}</dl><p className="text-xs text-fg-4 mt-3">Use an existing authorized connection or a supplied export. Tool names do not establish availability or grant access.</p></section>}
      {item.tips && <section><h2 className="font-serif text-2xl text-fg-1 mb-3">Tips that improve the result</h2><ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-fg-3">{item.tips.map(tip => <li key={tip}>{tip}</li>)}</ul></section>}
      <section><h2 className="font-serif text-2xl text-fg-1 mb-3">Before you start</h2><ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-fg-3">{item.prerequisites.map(text => <li key={text}>{text}</li>)}</ul></section>
      <section id="procedure" className="scroll-mt-24"><h2 className="font-serif text-2xl text-fg-1 mb-3">{item.replication ? "Follow the procedure" : item.kind === "capability" ? "How to choose" : "A practical starting point"}</h2><p className="text-xs text-fg-4 mb-4">Sintra’s suggested procedure. Validate it in your own environment.</p><ol className="list-decimal pl-5 space-y-3 text-sm leading-relaxed text-fg-2">{item.steps.map(text => <li key={text} className="pl-1">{text}</li>)}</ol></section>
      <section><h2 className="font-serif text-2xl text-fg-1 mb-3">What you should get</h2><p className="text-sm leading-relaxed text-fg-3">{item.output}</p></section>
      <section><h2 className="font-serif text-2xl text-fg-1 mb-3">How to check the result</h2><ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-fg-3">{item.validation.map(text => <li key={text}>{text}</li>)}</ul></section>
      {item.prompt && <section className="rounded-2xl border border-hairline bg-steel p-5 sm:p-7"><h2 className="font-serif text-2xl text-fg-1 mb-3">Try this prompt</h2><p className="text-sm leading-relaxed text-fg-2 select-all whitespace-pre-wrap">{item.prompt}</p><p className="text-xs text-fg-4 mt-4">Replace bracketed inputs. The complete prompt is also in the JSON record below.</p></section>}
      <section><h2 className="font-serif text-2xl text-fg-1 mb-3">Limits of this brief</h2><ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-fg-3">{item.limitations.map(text => <li key={text}>{text}</li>)}</ul></section>
      <section><h2 className="font-serif text-2xl text-fg-1 mb-3">Primary sources</h2><ol className="space-y-4">{item.sources.map((source, i) => <li id={`source-${source.id}`} key={source.id} className="scroll-mt-24 text-sm"><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-violet-bright underline underline-offset-4">[{i + 1}] {source.title} ↗</a><p className="text-xs text-fg-4 mt-2">{source.publisher}{source.publishedAt && ` · Published ${source.publishedAt}`} · Checked {source.checkedAt}</p></li>)}</ol></section>
      <aside className="border-t border-hairline pt-7"><h2 className="font-serif text-2xl text-fg-1 mb-3">Keep exploring</h2><ul className="space-y-3">{item.related.map(relatedId => { const related = KNOWLEDGE.find(record => record.id === relatedId); return related && <li key={relatedId}><Link href={`/knowledge/${relatedId}/`} className="text-sm text-violet-bright">{related.title} →</Link></li>; })}{item.replication?.relatedPrompts.map(slug => <li key={slug}><Link href={`/prompts/${slug}/`} className="text-sm text-fg-3 underline underline-offset-4">Existing prompt: {slug.replace(/-/g, " ")} →</Link></li>)}</ul><div className="flex flex-wrap gap-5 mt-7 text-xs"><a href={`${BASE_PATH}/api/knowledge/${id}.json`} className="text-violet-bright underline underline-offset-4">Read this brief as JSON</a><Link href="/agents/" className="text-fg-3 underline underline-offset-4">LLM access guide</Link></div></aside>
    </div>
  </article></main><Footer /></>;
}
