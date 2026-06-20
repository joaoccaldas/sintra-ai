import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GUIDES } from "@/lib/guidesData";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

const LEVEL_STYLE = {
  beginner: { label: "Beginner", color: "#10b981" },
  intermediate: { label: "Intermediate", color: "#9F8CFF" },
  advanced: { label: "Advanced", color: "#ef4444" },
} as const;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return { title: "Not Found" };

  return {
    title: `${guide.title} — AI Guide | Sintra Tesseract`,
    description: guide.tagline,
    keywords: [guide.title, "AI guide", "AI playbook", guide.level, "how to"],
    openGraph: {
      title: guide.title,
      description: guide.tagline,
      url: `${SITE_URL}/guides/${guide.slug}/`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.tagline },
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}/` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const lvl = LEVEL_STYLE[guide.level];
  const related = GUIDES.filter((g) => g.id !== guide.id && g.level === guide.level).slice(0, 3);

  // Article + BreadcrumbList structured data, plus FAQPage when the guide is
  // written as questions (headings ending in "?") so it can earn rich results.
  const faqSections = guide.sections.filter((s) => s.heading.trim().endsWith("?"));
  const graph: object[] = [
    {
      "@type": "Article",
      headline: guide.title,
      description: guide.tagline,
      articleSection: lvl.label,
      url: `${SITE_URL}/guides/${guide.slug}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}/`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides/` },
        { "@type": "ListItem", position: 3, name: guide.title, item: `${SITE_URL}/guides/${guide.slug}/` },
      ],
    },
  ];
  if (faqSections.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqSections.map((s) => ({
        "@type": "Question",
        name: s.heading,
        acceptedAnswer: { "@type": "Answer", text: s.body },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main-content" className="min-h-screen bg-abyss text-fg-1 pt-16">
        <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: `radial-gradient(circle, ${guide.color}, transparent 70%)` }} />
        </div>

        <article className="relative z-10 max-w-[760px] mx-auto px-6 md:px-8 pt-10 pb-24">
          {/* Breadcrumb trail (mirrors BreadcrumbList schema) */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap font-mono text-[11px] tracking-[0.1em] uppercase text-fg-4 mb-10">
            <Link href="/" className="hover:text-violet-bright transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={12} /> Home
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-violet-bright transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-fg-3 normal-case tracking-normal truncate max-w-[220px]">{guide.title}</span>
          </nav>

          <div className="h-[3px] w-20 rounded-full mb-8" style={{ background: `linear-gradient(90deg, ${guide.color}, transparent)` }} />

          <span className="text-4xl block mb-4">{guide.emoji}</span>
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
              style={{ color: lvl.color, borderColor: lvl.color + "44", background: lvl.color + "12" }}>
              {lvl.label}
            </span>
            <span className="font-mono text-[10px] text-fg-4 flex items-center gap-1">
              <Clock size={10} /> {guide.estimatedRead}
            </span>
            <span className="font-mono text-[10px] text-fg-4">{guide.sections.length} sections</span>
          </div>

          <h1 className="font-serif font-light text-[clamp(32px,5vw,56px)] leading-[1.06] tracking-[-0.02em] text-fg-1 mb-5">
            {guide.title}
          </h1>
          <p className="font-serif italic text-[18px] leading-[1.55] text-fg-2 border-l-2 pl-5 mb-12"
            style={{ borderColor: guide.color }}>
            {guide.tagline}
          </p>

          <div className="flex flex-col gap-10">
            {guide.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="font-serif text-[22px] font-normal text-fg-1 leading-[1.2] mb-3">
                  {section.heading}
                </h2>
                <p className="font-sans text-[15px] text-fg-2 leading-[1.75]">{section.body}</p>
                {section.tip && (
                  <div className="mt-4 px-4 py-3 rounded-lg border-l-2 bg-violet/[0.06] font-sans text-[14px] text-fg-2 italic leading-[1.6]"
                    style={{ borderColor: guide.color + "99" }}>
                    {section.tip}
                  </div>
                )}
              </section>
            ))}
          </div>

          {guide.relatedLinks && guide.relatedLinks.length > 0 && (
            <div className="mt-12 pt-8 border-t border-violet/[0.12]">
              <h2 className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-4">Related</h2>
              <div className="flex flex-col gap-2">
                {guide.relatedLinks.map((link) => (
                  <a key={link.href} href={link.href}
                    className="inline-flex items-center gap-2 font-sans text-[14px] text-fg-3 hover:text-violet-bright transition-colors group">
                    <ExternalLink size={12} className="shrink-0 text-fg-4 group-hover:text-violet-bright transition-colors" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-hairline">
              <h2 className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-5">More {lvl.label} guides</h2>
              <div className="flex flex-col gap-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/guides/${r.slug}/`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-violet/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                    <span className="text-xl leading-none">{r.emoji}</span>
                    <div>
                      <p className="font-serif text-[15px] text-fg-1 group-hover:text-violet-bright transition-colors">{r.title}</p>
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
