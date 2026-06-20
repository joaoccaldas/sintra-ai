import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_PATH } from "@/lib/constants";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { ARCHIVE_MONTHS, getNewsForMonth, monthFromSlug } from "@/lib/newsData";
import { NewsCard } from "@/components/NewsCard";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return ARCHIVE_MONTHS.map(m => ({ month: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string }>;
}): Promise<Metadata> {
  const { month } = await params;
  const archiveMonth = ARCHIVE_MONTHS.find(m => m.slug === month);
  if (!archiveMonth) return {};
  return {
    title: `${archiveMonth.label} AI News Archive — Sintra Tesseract`,
    description: `${archiveMonth.count} AI news events from ${archiveMonth.label} — model releases, benchmarks, and industry events.`,
  };
}

export default async function NewsArchiveMonthPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const archiveMonth = ARCHIVE_MONTHS.find(m => m.slug === month);
  if (!archiveMonth) notFound();

  const items = getNewsForMonth(monthFromSlug(month));

  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="pt-16 min-h-screen bg-abyss text-fg-1">
        <div className="max-w-[860px] mx-auto px-6 md:px-8">
          <div className="pt-10 pb-6">
            <a href={`${BASE_PATH}/news/archive/`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to archive
            </a>
          </div>

          <header className="pt-6 pb-10 border-b border-violet/[0.12]">
            <div className="inline-flex gap-3.5 items-center mb-6">
              <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
              <span className="eyebrow violet">AI Intelligence</span>
            </div>
            <h1 className="font-serif font-light text-[clamp(36px,5.5vw,64px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-3">
              {archiveMonth.label}
            </h1>
            <p className="font-mono text-[11px] text-fg-4 tracking-[0.06em]">
              {archiveMonth.count} events ·{" "}
              <a href={`${BASE_PATH}/news/`} className="text-violet-bright hover:underline">Current month →</a>
            </p>
          </header>

          <div className="pt-2 pb-24">
            {items.map(item => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
