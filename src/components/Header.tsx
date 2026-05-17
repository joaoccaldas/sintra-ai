"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import TesseractMark from "./TesseractMark";

interface Props {
  total: number;
}

const LINKS = [
  { href: "#library",       label: "Library" },
  { href: "#disciplines",   label: "Disciplines" },
  { href: "#by-difficulty", label: "By difficulty" },
];

export default function Header({ total }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 h-16 flex items-center transition-all duration-240 ease-out-custom",
          scrolled
            ? "bg-abyss/72 backdrop-blur-[14px] border-b border-violet/[0.12]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-center gap-7">
          <a href="#" className="flex items-center gap-2.5 text-violet-bright [filter:drop-shadow(0_0_12px_rgba(159,140,255,0.25))]" aria-label="Sintra Tesseract — home">
            <TesseractMark size={20} />
            <span className="font-serif text-[17px] text-fg-1 leading-none tracking-[0.005em]">
              Sintra <em className="italic text-violet-bright">Tesseract</em>
            </span>
          </a>

          <nav className="hidden md:flex gap-6 ml-7">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="font-sans text-[13px] text-fg-3 hover:text-fg-1 transition-colors duration-140 ease-out-custom whitespace-nowrap"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex-1" />

          <span className="hidden sm:inline font-mono text-[11px] text-fg-3 tracking-[0.06em] whitespace-nowrap">
            <b className="text-fg-1 font-medium">{total}</b> use cases
          </span>

          <a href="#library" className="btn hidden sm:inline-flex">Enter library →</a>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-fg-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-abyss/95 backdrop-blur-md animate-scrim-in">
          <div className="flex items-center justify-between h-16 px-6">
            <a href="#" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 text-violet-bright">
              <TesseractMark size={20} />
              <span className="font-serif text-[17px] text-fg-1">
                Sintra <em className="italic text-violet-bright">Tesseract</em>
              </span>
            </a>
            <button
              className="flex items-center justify-center w-10 h-10 -mr-2 text-fg-1"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-8 gap-4">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-fg-1 py-2 border-b border-violet/[0.12]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#library"
              onClick={() => setMobileOpen(false)}
              className="btn mt-6 self-start"
            >
              Enter library →
            </a>
            <span className="font-mono text-[11px] text-fg-3 tracking-[0.06em] mt-6">
              <b className="text-fg-1 font-medium">{total}</b> use cases curated
            </span>
          </nav>
        </div>
      )}
    </>
  );
}
