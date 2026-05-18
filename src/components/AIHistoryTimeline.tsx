"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ERAS, MILESTONES, type Era, type Milestone } from "@/lib/timelineData";

// ─── StarField ───────────────────────────────────────────────────────────────
function StarField() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 2000);
    camera.position.z = 600;
    const count = 1400;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 2400;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, sizeAttenuation: true, transparent: true, opacity: 0.45 });
    scene.add(new THREE.Points(geo, mat));
    // Nebula
    const nCount = 300;
    const nPos = new Float32Array(nCount * 3);
    const nCol = new Float32Array(nCount * 3);
    const pal = [[0.62, 0.55, 1.0], [0.24, 0.47, 0.9], [1.0, 0.33, 0.55]];
    for (let i = 0; i < nCount; i++) {
      nPos[i*3] = (Math.random()-0.5)*1600; nPos[i*3+1] = (Math.random()-0.5)*1600; nPos[i*3+2] = (Math.random()-0.5)*800;
      const c = pal[Math.floor(Math.random()*3)]; nCol[i*3]=c[0]; nCol[i*3+1]=c[1]; nCol[i*3+2]=c[2];
    }
    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
    nGeo.setAttribute("color",    new THREE.BufferAttribute(nCol, 3));
    const nMat = new THREE.PointsMaterial({ size: 4, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.15 });
    scene.add(new THREE.Points(nGeo, nMat));
    let raf = 0; let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate); t += 0.0002;
      camera.position.x = Math.sin(t * 0.7) * 12;
      camera.position.y = Math.cos(t * 0.5) * 8;
      renderer.render(scene, camera);
    };
    animate();
    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose(); geo.dispose(); mat.dispose(); nGeo.dispose(); nMat.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="fixed inset-0 pointer-events-none" />;
}

// ─── Milestone detail modal ──────────────────────────────────────────────────
function MilestoneModal({ m, era, onClose }: { m: Milestone; era: Era; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <>
        <motion.div key="scrim" className="fixed inset-0 z-[110] bg-void/80 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }} onClick={onClose} />
        <motion.div key="panel"
          className="fixed inset-x-0 bottom-0 z-[120] max-h-[88vh] overflow-y-auto rounded-t-2xl bg-[#0e0b1a] border-t border-violet/20 shadow-2xl"
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 290, damping: 33 }}>
          <div className="h-[3px] w-full rounded-t-[inherit]"
            style={{ background: `linear-gradient(90deg, ${era.color}, transparent)` }} />
          <div className="max-w-2xl mx-auto px-5 py-7 pb-12">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-0.5 rounded-full border"
                    style={{ color: era.color, borderColor: era.color + "44", background: era.color + "14" }}>
                    {era.icon} {era.label}
                  </span>
                  <span className="font-mono text-[12px] text-fg-3">{m.year}</span>
                </div>
                <h2 className="font-serif font-normal text-[clamp(20px,3.5vw,34px)] leading-[1.08] tracking-[-0.015em] text-fg-1">
                  {m.title}
                </h2>
                {m.by && <p className="font-mono text-[11px] text-fg-3 mt-1.5">{m.by}</p>}
              </div>
              <button onClick={onClose}
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-violet/[0.10] border border-violet/20 text-fg-3 hover:text-fg-1 hover:bg-violet/20 transition-all">
                <X size={15} />
              </button>
            </div>
            <p className="font-sans text-[15px] leading-[1.65] text-fg-2 mb-5">{m.desc}</p>
            <div className="rounded-xl px-5 py-4 mb-5 border"
              style={{ borderColor: era.color + "33", background: era.color + "0a" }}>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase block mb-1.5" style={{ color: era.color }}>
                Why it matters
              </span>
              <p className="font-serif italic text-[16px] leading-[1.5] text-fg-1">{m.significance}</p>
            </div>
            {m.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {m.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded-sm bg-violet/[0.08] text-fg-2 border border-violet/20">{tag}</span>
                ))}
              </div>
            )}
            {m.links && m.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {m.links.map(link => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-[12px] tracking-[0.04em] px-3 py-2 rounded-lg border transition-colors"
                    style={{ color: era.color, borderColor: era.color + "44", background: era.color + "0e" }}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

// ─── Main Timeline ───────────────────────────────────────────────────────────
export default function AIHistoryTimeline() {
  const [activeEraIdx, setActiveEraIdx] = useState(0);
  const [milestone,    setMilestone]    = useState<Milestone | null>(null);
  const [direction,    setDirection]    = useState<1 | -1>(1);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeEra = ERAS[activeEraIdx];
  const eraMs     = MILESTONES.filter(m => m.era === activeEra.id);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > activeEraIdx ? 1 : -1);
    setActiveEraIdx(idx);
    tabsRef.current?.querySelector(`[data-era="${ERAS[idx].id}"]`)?.scrollIntoView({ inline: "center", behavior: "smooth" });
  }, [activeEraIdx]);

  const prev = () => activeEraIdx > 0              && goTo(activeEraIdx - 1);
  const next = () => activeEraIdx < ERAS.length - 1 && goTo(activeEraIdx + 1);

  // keyboard nav
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (milestone) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEraIdx, milestone]);

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center:             { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  return (
    <div className="relative min-h-dvh bg-[#060411] pb-24">
      <StarField />

      {/* ── Hero header ─────────────────────────────────────── */}
      <div className="relative z-10 pt-24 pb-10 text-center px-4">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3 mb-3">
          {MILESTONES.length} milestones · {ERAS.length} eras
        </p>
        <h1 className="font-serif text-[clamp(32px,6vw,64px)] font-normal tracking-[-0.02em] text-fg-1 leading-[1.04]">
          History of <em className="italic text-violet-bright">Artificial Intelligence</em>
        </h1>
        <p className="font-sans text-[15px] text-fg-3 mt-3 max-w-lg mx-auto leading-[1.6]">
          From ancient mathematics to agentic AI — explore every milestone that shaped the field.
        </p>
      </div>

      {/* ── Era tab strip ───────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-[#060411]/90 backdrop-blur-md border-b border-violet/[0.10]">
        <div
          ref={tabsRef}
          className="flex gap-1 overflow-x-auto scrollbar-none px-4 py-3 max-w-5xl mx-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {ERAS.map((era, idx) => {
            const active = idx === activeEraIdx;
            return (
              <button
                key={era.id}
                data-era={era.id}
                onClick={() => goTo(idx)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.06em] transition-all duration-200 whitespace-nowrap"
                style={{
                  background:  active ? era.color + "22" : "transparent",
                  borderWidth:  1,
                  borderStyle: "solid",
                  borderColor: active ? era.color + "88" : "#ffffff18",
                  color:       active ? era.color : "#6b6a8a",
                }}
              >
                <span>{era.icon}</span>
                <span className="hidden sm:inline">{era.label}</span>
                <span className="sm:hidden">{era.years.split("–")[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Era content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeEra.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Era header */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b"
              style={{ borderColor: activeEra.color + "33" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: activeEra.color + "18", border: `1px solid ${activeEra.color}44` }}>
                {activeEra.icon}
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase mb-0.5" style={{ color: activeEra.color }}>
                  {activeEra.years}
                </p>
                <h2 className="font-serif text-[24px] md:text-[30px] font-normal text-fg-1 leading-[1.1]">
                  {activeEra.label}
                </h2>
                <p className="font-mono text-[11px] text-fg-3 mt-1">
                  {eraMs.length} milestone{eraMs.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Milestone list — vertical timeline */}
            <div className="relative">
              {/* Center line */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px -translate-x-1/2"
                style={{ background: `linear-gradient(180deg, ${activeEra.color}55 0%, ${activeEra.color}22 100%)` }} />

              <div className="flex flex-col gap-6">
                {eraMs.map((m, mIdx) => {
                  const isLeft = mIdx % 2 === 0;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: mIdx * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="md:flex md:items-start md:gap-0 relative"
                    >
                      {/* Left side */}
                      <div className={`hidden md:flex md:w-[calc(50%-20px)] ${isLeft ? "justify-end pr-6" : "justify-start pl-6 order-3"}`}>
                        {isLeft && (
                          <MilestoneCard m={m} era={activeEra} onClick={() => setMilestone(m)} align="right" />
                        )}
                        {!isLeft && (
                          <div className="flex items-center gap-2 pt-3">
                            <span className="font-mono text-[12px] font-medium" style={{ color: activeEra.color }}>{m.year}</span>
                          </div>
                        )}
                      </div>

                      {/* Center dot (desktop) */}
                      <div className="hidden md:flex items-center justify-center w-10 shrink-0 pt-3 z-10 order-2">
                        <div className="w-3 h-3 rounded-full"
                          style={{
                            background: activeEra.color,
                            boxShadow: `0 0 0 3px #060411, 0 0 0 4px ${activeEra.color}88, 0 0 12px ${activeEra.color}66`
                          }} />
                      </div>

                      {/* Right side */}
                      <div className={`hidden md:flex md:w-[calc(50%-20px)] ${!isLeft ? "justify-start pl-6" : "justify-end pr-6 order-3"}`}>
                        {!isLeft && (
                          <MilestoneCard m={m} era={activeEra} onClick={() => setMilestone(m)} align="left" />
                        )}
                        {isLeft && (
                          <div className="flex items-center gap-2 pt-3">
                            <span className="font-mono text-[12px] font-medium" style={{ color: activeEra.color }}>{m.year}</span>
                          </div>
                        )}
                      </div>

                      {/* Mobile: simple stacked card */}
                      <button
                        onClick={() => setMilestone(m)}
                        className="md:hidden w-full text-left flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 hover:border-opacity-80 active:scale-[0.99]"
                        style={{ background: "#0e0b1a", borderColor: activeEra.color + "30" }}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{m.emoji}</span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] tracking-[0.12em] uppercase mb-1" style={{ color: activeEra.color }}>{m.year}</p>
                          <p className="font-serif text-[15px] leading-[1.3] text-fg-1">{m.title}</p>
                          {m.by && <p className="font-mono text-[10px] text-fg-4 mt-1 truncate">{m.by}</p>}
                        </div>
                        <ChevronRight size={14} className="shrink-0 mt-1 text-fg-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Prev / Next navigation ── */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-violet/[0.10]">
          <button
            onClick={prev}
            disabled={activeEraIdx === 0}
            className="flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-fg-3 hover:text-fg-1 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            {activeEraIdx > 0 ? ERAS[activeEraIdx - 1].label : ""}
          </button>

          <span className="font-mono text-[11px] text-fg-4">
            {activeEraIdx + 1} / {ERAS.length}
          </span>

          <button
            onClick={next}
            disabled={activeEraIdx === ERAS.length - 1}
            className="flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-fg-3 hover:text-fg-1 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {activeEraIdx < ERAS.length - 1 ? ERAS[activeEraIdx + 1].label : ""}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Milestone modal */}
      {milestone && (
        <MilestoneModal
          key={milestone.id}
          m={milestone}
          era={ERAS.find(e => e.id === milestone.era)!}
          onClose={() => setMilestone(null)}
        />
      )}
    </div>
  );
}

// ─── Milestone card (desktop L/R) ────────────────────────────────────────────
function MilestoneCard({
  m, era, onClick, align,
}: { m: Milestone; era: Era; onClick: () => void; align: "left" | "right" }) {
  return (
    <button
      onClick={onClick}
      className="group w-full max-w-[320px] text-left rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
      style={{ background: "#0e0b1a", borderColor: era.color + "30" }}
    >
      <div className={`flex items-start gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
        <span className="text-[20px] shrink-0 mt-0.5">{m.emoji}</span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase mb-1" style={{ color: era.color }}>{m.year}</p>
          <p className="font-serif text-[14px] leading-[1.3] text-fg-1 group-hover:text-white transition-colors">{m.title}</p>
          {m.by && <p className="font-mono text-[10px] text-fg-4 mt-1 truncate">{m.by}</p>}
        </div>
      </div>
      <p className="font-sans text-[12px] text-fg-3 mt-2.5 leading-[1.5] line-clamp-2">{m.desc}</p>
    </button>
  );
}
