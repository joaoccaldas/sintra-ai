"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { BASE_PATH } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";

const Tesseract3D = dynamic(() => import("./Tesseract3D"), { ssr: false });

interface Props {
  total: number;
}

export default function Hero({ total }: Props) {
  const diveRef = useRef<(() => void) | null>(null);
  const reducedMotion = useReducedMotion();

  const handleEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    if (diveRef.current && !reducedMotion) diveRef.current();
    setTimeout(() => {
      document.getElementById("library")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }, reducedMotion ? 0 : 700);
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-end">
      {/* Hero image — webp, 14x smaller than original PNG */}
      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 bg-cover bg-[center_35%] opacity-[0.28] mix-blend-screen",
          "[filter:blur(1px)_saturate(0.8)] scale-[1.06]",
          reducedMotion ? "" : "motion-safe:animate-hero-drift",
        ].join(" ")}
        style={{ backgroundImage: `url('${BASE_PATH}/tesseract-hero.webp')` }}
      />

      {/* Architectural grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(159,140,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(159,140,255,0.045) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)",
        }}
      />

      {/* 3D Tesseract */}
      <Tesseract3D
        reducedMotion={reducedMotion}
        onDive={fn => { diveRef.current = fn; }}
      />

      {/* Veil — keeps hero copy legible against the photo + 3D */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 40% at 50% -5%, rgba(159,140,255,0.18) 0%, rgba(159,140,255,0) 60%), radial-gradient(40% 40% at 85% 100%, rgba(143,227,210,0.10) 0%, rgba(143,227,210,0) 60%), linear-gradient(180deg, rgba(5,6,11,0.5) 0%, rgba(5,6,11,0.15) 35%, rgba(5,6,11,0.75) 85%, rgba(5,6,11,1) 100%)",
        }}
      />

      {/* Copy */}
      <div className="relative z-[3] w-full max-w-[1040px] mx-auto px-6 md:px-8 pb-20 md:pb-24">
        <div className="inline-flex gap-3.5 items-center mb-6">
          <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="eyebrow violet">The use-case library · {total} curated</span>
        </div>
        <h1 className="t-display text-[clamp(38px,6.4vw,92px)] mb-7">
          A library of{" "}
          <span
            className="italic"
            style={{
              backgroundImage: "linear-gradient(180deg, #F4F2EA 0%, #B6A6FF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 32px rgba(159,140,255,0.35))",
            }}
          >
            every
          </span>{" "}
          way<br className="hidden sm:inline" /> to think with a machine.
        </h1>
        <p className="font-sans text-base sm:text-lg leading-[1.55] text-fg-2 max-w-xl mb-10">
          Browse {total} curated AI use cases by difficulty, domain, and what you want to do.
          Open a card, lift the prompt, ship the work.
        </p>
        <div className="flex gap-3.5 items-center flex-wrap">
          <a href="#library" className="btn" onClick={handleEnter}>
            Enter the library →
          </a>
          <a href="#disciplines" className="btn btn-ghost">Six disciplines</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-fg-3 z-[3]"
      >
        <span>Scroll</span>
        <span
          className={[
            "w-px h-9 bg-gradient-to-b from-violet-bright to-transparent",
            reducedMotion ? "" : "animate-cue-pulse",
          ].join(" ")}
        />
      </div>
    </section>
  );
}
