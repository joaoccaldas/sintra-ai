import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

export const metadata: Metadata = {
  title: "Page not found — Sintra Tesseract",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/news/", label: "AI News" },
  { href: "/tools/", label: "AI Tools" },
  { href: "/guides/", label: "Guides" },
  { href: "/#library", label: "Prompt Library" },
];

export default function NotFound() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="min-h-screen bg-abyss text-fg-1 pt-16">
        <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #9F8CFF, transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-[640px] mx-auto px-6 pt-24 pb-32 text-center">
          <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-violet-bright mb-5">404</p>
          <h1 className="font-serif font-light text-[clamp(32px,6vw,56px)] leading-[1.06] tracking-[-0.02em] text-fg-1 mb-5">
            This page slipped through the tesseract.
          </h1>
          <p className="font-sans text-[16px] text-fg-3 leading-[1.6] mb-10">
            The link may be outdated or mistyped. Try one of the main destinations below,
            or press <kbd className="font-mono text-[12px] px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04]">⌘K</kbd> to search everything.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[12px] tracking-[0.04em] px-4 py-2 rounded-full border border-violet/30 text-violet-bright bg-violet/[0.06] hover:bg-violet/[0.14] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
