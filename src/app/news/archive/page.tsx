import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_PATH } from "@/lib/constants";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";
import { ARCHIVE_MONTHS, CURRENT_MONTH_LABEL } from "@/lib/newsData";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI News Archive — Sintra Tesseract",
  description: `Browse past months of AI news, organized by month. The current month (${CURRENT_MONTH_LABEL}) lives on the main AI News Timeline.`,
};

export default function NewsArchivePage() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main className="pt-16 min-h-screen bg-abyss text-fg-1">
        <div className="max-w-[860px] mx-auto px-6 md:px-8">
          <div className="pt-10 pb-6">
            <a href={`${BASE_PATH}/news/`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 hover:text-violet-bright transition-colors group">
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to AI News
            </a>
          </div>

          <header className="pt-6 pb-12 border-b border-violet/[0.12]">
            <div className="inline-flex gap-3.5 items-center mb-6">
              <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
              <span className="eyebrow violet">AI Intelligence</span>
            </div>
            <h1 className="font-serif font-light text-[clamp(36px,5.5vw,64px)] leading-[1.04] tracking-[-0.025em] text-fg-1 mb-5">
              News archive.
            </h1>
            <p className="font-sans text-[17px] text-fg-2 max-w-xl leading-[1.55]">
              {CURRENT_MONTH_LABEL}&apos;s events live on the main{" "}
              <a href={`${BASE_PATH}/news/`} className="text-violet-bright hover:underline">AI News Timeline</a>.
              Earlier months are archived below.
            </p>
          </header>

          <div className="py-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ARCHIVE_MONTHS.map(m => (
              <a
                key={m.slug}
                href={`${BASE_PATH}/news/archive/${m.slug}/`}
                className="flex items-center justify-between gap-3 rounded-lg border border-violet/[0.12] bg-violet/[0.03] px-5 py-4 hover:border-violet/40 hover:bg-violet/[0.06] transition-colors group"
              >
                <span className="font-serif text-[19px] text-fg-1">{m.label}</span>
                <span className="flex items-center gap-2 font-mono text-[11px] text-fg-4">
                  {m.count} events
                  <ArrowRight size={13} className="text-fg-4 group-hover:text-violet-bright group-hover:translate-x-0.5 transition-all" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
