import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CONCEPTS, CAT_META, DIFF_LABEL, DIFF_HEX } from "@/lib/concepts";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const concept = CONCEPTS.find((c) => c.id === slug);
  if (!concept) return { title: "Not Found" };

  const title = concept.shortTerm ? `${concept.term} (${concept.shortTerm})` : concept.term;
  return {
    title: `${title} — AI Concept Explained | Sintra Tesseract`,
    description: concept.tagline,
    keywords: [concept.term, concept.shortTerm ?? "", "AI concept", "definition", CAT_META[concept.category].label],
    openGraph: {
      title: `${title} — explained`,
      description: concept.tagline,
      url: `${SITE_URL}/concepts/${concept.id}/`,
      type: "article",
      images: [{ url: `${SITE_URL}/tesseract-hero.webp`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description: concept.tagline },
    alternates: { canonical: `${SITE_URL}/concepts/${concept.id}/` },
  };
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = CONCEPTS.find((c) => c.id === slug);
  if (!concept) notFound();

  const cat = CAT_META[concept.category];
  const diffColor = DIFF_HEX[concept.difficulty];
  const related = concept.related
    .map((id) => CONCEPTS.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: concept.term,
        alternateName: concept.shortTerm,
        description: concept.tagline,
        url: `${SITE_URL}/concepts/${concept.id}/`,
        inDefinedTermSet: { "@type": "DefinedTermSet", name: "Sintra Tesseract AI Glossary", url: `${SITE_URL}/concepts/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Concepts", item: `${SITE_URL}/concepts/` },
          { "@type": "ListItem", position: 3, name: concept.term, item: `${SITE_URL}/concepts/${concept.id}/` },
        ],
      },
    ],
  };

  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main-content" className="min-h-screen bg-abyss text-fg-1 pt-16">
        <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: `radial-gradient(circle, ${cat.hex}, transparent 70%)` }} />
        </div>

        <article className="relative z-10 max-w-[720px] mx-auto px-6 md:px-8 pt-10 pb-24">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap font-mono text-[11px] tracking-[0.1em] uppercase text-fg-4 mb-10">
            <Link href="/" className="hover:text-violet-bright transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={12} /> Home
            </Link>
            <span>/</span>
            <Link href="/concepts" className="hover:text-violet-bright transition-colors">Concepts</Link>
            <span>/</span>
            <span className="text-fg-3 normal-case tracking-normal truncate max-w-[220px]">{concept.term}</span>
          </nav>

          <div className="h-[3px] w-20 rounded-full mb-8" style={{ background: `linear-gradient(90deg, ${cat.hex}, transparent)` }} />

          <span className="text-4xl block mb-4">{concept.icon}</span>
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
              style={{ color: cat.hex, borderColor: cat.hex + "44", background: cat.hex + "12" }}>
              {cat.label}
            </span>
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
              style={{ color: diffColor, borderColor: diffColor + "44", background: diffColor + "12" }}>
              {DIFF_LABEL[concept.difficulty]}
            </span>
          </div>

          <h1 className="font-serif font-light text-[clamp(32px,5vw,56px)] leading-[1.06] tracking-[-0.02em] text-fg-1 mb-3">
            {concept.term}
            {concept.shortTerm && <span className="text-fg-4 text-[0.5em] align-middle ml-3 font-mono">{concept.shortTerm}</span>}
          </h1>
          <p className="font-serif italic text-[18px] leading-[1.55] text-fg-2 border-l-2 pl-5 mb-10"
            style={{ borderColor: cat.hex }}>
            {concept.tagline}
          </p>

          <div className="concept-body font-sans text-[15px] text-fg-2 leading-[1.75] space-y-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{concept.body}</ReactMarkdown>
          </div>

          <div className="mt-8 px-5 py-4 rounded-xl border-l-2 bg-violet/[0.05]" style={{ borderColor: cat.hex + "99" }}>
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-2">In plain terms</p>
            <p className="font-serif italic text-[16px] text-fg-2 leading-[1.6]">{concept.analogy}</p>
          </div>

          {concept.learnMore && (
            <a href={concept.learnMore} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 font-mono text-[12px] text-violet-bright hover:text-fg-1 transition-colors">
              <ExternalLink size={12} /> Learn more
            </a>
          )}

          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-hairline">
              <h2 className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-5">Related concepts</h2>
              <div className="flex flex-col gap-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/concepts/${r.id}/`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-violet/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                    <span className="text-xl leading-none">{r.icon}</span>
                    <div>
                      <p className="font-serif text-[15px] text-fg-1 group-hover:text-violet-bright transition-colors">{r.term}</p>
                      <p className="font-sans text-[12px] text-fg-3 mt-0.5 line-clamp-1">{r.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
