"use client";

import { useEffect, useRef, useState, useCallback, WheelEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { X, ArrowLeft, ZoomIn, ZoomOut } from "lucide-react";
import { ERAS, MILESTONES, type Era, type Milestone } from "@/lib/timelineData";

// ─── Layout constants ────────────────────────────────────────────────────────
const ERA_HEIGHT     = 700;          // px per era in natural space
const TOTAL_HEIGHT   = ERAS.length * ERA_HEIGHT;
const LINE_X_CENTER  = 0.50;         // center line x fraction
const MIN_SCALE      = 0.05;
const MAX_SCALE      = 3.5;
const ERA_ZOOM_SCALE = 1.1;          // how zoomed-in era view is

// ─── Helpers ─────────────────────────────────────────────────────────────────
function eraY(idx: number) { return idx * ERA_HEIGHT; }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

// Milestone positions: alternate L / R
function milestoneX(idx: number, containerW: number) {
  return idx % 2 === 0
    ? containerW * 0.10
    : containerW * 0.62;
}

// ─── StarField (Three.js) ────────────────────────────────────────────────────
function StarField({ className }: { className?: string }) {
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

    // Stars
    const count = 1800;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 2400;
    const geo  = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat  = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: true, transparent: true, opacity: 0.55 });
    scene.add(new THREE.Points(geo, mat));

    // Nebula particles
    const nCount = 400;
    const nPos   = new Float32Array(nCount * 3);
    const nCol   = new Float32Array(nCount * 3);
    const palette = [[0.62, 0.55, 1.0], [0.24, 0.47, 0.9], [1.0, 0.33, 0.55]];
    for (let i = 0; i < nCount; i++) {
      nPos[i*3]   = (Math.random() - 0.5) * 1600;
      nPos[i*3+1] = (Math.random() - 0.5) * 1600;
      nPos[i*3+2] = (Math.random() - 0.5) * 800;
      const c = palette[Math.floor(Math.random() * palette.length)];
      nCol[i*3] = c[0]; nCol[i*3+1] = c[1]; nCol[i*3+2] = c[2];
    }
    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
    nGeo.setAttribute("color",    new THREE.BufferAttribute(nCol, 3));
    const nMat = new THREE.PointsMaterial({ size: 4, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.18 });
    scene.add(new THREE.Points(nGeo, nMat));

    let raf = 0;
    let t   = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t  += 0.0003;
      camera.position.x = Math.sin(t * 0.7) * 15;
      camera.position.y = Math.cos(t * 0.5) * 10;
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
      renderer.dispose();
      geo.dispose(); mat.dispose();
      nGeo.dispose(); nMat.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}

// ─── Milestone detail modal ──────────────────────────────────────────────────
function MilestoneModal({ m, era, onClose }: { m: Milestone; era: Era; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <>
        {/* Scrim */}
        <motion.div
          key="scrim"
          className="fixed inset-0 z-[110] bg-void/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          key="panel"
          className="fixed inset-x-0 bottom-0 z-[120] max-h-[92vh] overflow-y-auto rounded-t-2xl bg-[#0e0b1a] border-t border-violet/20 shadow-2xl"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 290, damping: 33 }}
        >
          {/* Accent bar */}
          <div className="h-[3px] w-full rounded-t-[inherit] shrink-0"
            style={{ background: `linear-gradient(90deg, ${era.color}, transparent)` }} />

          <div className="max-w-3xl mx-auto px-6 py-8 pb-12">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase px-2 py-0.5 rounded-full border"
                    style={{ color: era.color, borderColor: era.color + "44", background: era.color + "14" }}>
                    {era.icon} {era.label}
                  </span>
                  <span className="font-mono text-[12px] text-fg-3">{m.year}</span>
                </div>
                <h2 className="font-serif font-normal text-[clamp(22px,3.5vw,36px)] leading-[1.08] tracking-[-0.015em] text-fg-1">
                  {m.title}
                </h2>
                {m.by && (
                  <p className="font-mono text-[12px] text-fg-3 mt-2">{m.by}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-violet/[0.10] border border-violet/20 text-fg-3 hover:text-fg-1 hover:bg-violet/20 transition-all"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Description */}
            <p className="font-sans text-[15px] leading-[1.65] text-fg-2 mb-6">{m.desc}</p>

            {/* Significance callout */}
            <div className="rounded-xl px-5 py-4 mb-6 border"
              style={{ borderColor: era.color + "33", background: era.color + "0a" }}>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase block mb-1.5"
                style={{ color: era.color }}>
                Why it matters
              </span>
              <p className="font-serif italic text-[17px] leading-[1.5] text-fg-1">{m.significance}</p>
            </div>

            {/* Tags */}
            {m.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {m.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded-sm bg-violet/[0.08] text-fg-2 border border-violet/20">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            {m.links && m.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {m.links.map(link => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[12px] tracking-[0.04em] px-3 py-2 rounded-lg border transition-colors"
                    style={{ color: era.color, borderColor: era.color + "44", background: era.color + "0e" }}
                  >
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
  const containerRef  = useRef<HTMLDivElement>(null);
  const [vpW, setVpW] = useState(1200);
  const [vpH, setVpH] = useState(800);

  // overview scale = show full timeline
  const overviewScale = useCallback(
    (h: number) => clamp((h - 80) / TOTAL_HEIGHT, MIN_SCALE, 0.22),
    []
  );

  const [scale,     setScale]     = useState(() => overviewScale(800));
  const [panY,      setPanY]      = useState(40);
  const [activeEra, setActiveEra] = useState<string | null>(null);
  const [milestone, setMilestone] = useState<Milestone | null>(null);

  // Sync viewport size
  useEffect(() => {
    const update = () => {
      setVpW(window.innerWidth);
      setVpH(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Initial overview pan
  useEffect(() => {
    const s = overviewScale(vpH);
    setScale(s);
    setPanY(40);
  }, [vpH, overviewScale]);

  // ── Era click: zoom into that era ──
  const zoomEra = useCallback((eraId: string, h: number) => {
    const idx     = ERAS.findIndex(e => e.id === eraId);
    if (idx < 0) return;
    const newScale = clamp(h * ERA_ZOOM_SCALE / ERA_HEIGHT, 0.5, MAX_SCALE);
    const centerY  = eraY(idx) + ERA_HEIGHT / 2;
    const newPanY  = h / 2 - centerY * newScale;
    setScale(newScale);
    setPanY(newPanY);
    setActiveEra(eraId);
  }, []);

  // ── Back to overview ──
  const toOverview = useCallback(() => {
    const s = overviewScale(vpH);
    setScale(s);
    setPanY(40);
    setActiveEra(null);
  }, [vpH, overviewScale]);

  // ── Mouse wheel zoom toward cursor ──
  const onWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect     = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseY   = e.clientY - rect.top;
    const delta    = e.deltaY > 0 ? 0.88 : 1.14;
    setScale(prev => {
      const newScale = clamp(prev * delta, MIN_SCALE, MAX_SCALE);
      const mouseNat = (mouseY - panY) / prev;
      setPanY(mouseY - mouseNat * newScale);
      return newScale;
    });
  }, [panY]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeEra && !milestone) toOverview();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [activeEra, milestone, toOverview]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#060411] overflow-hidden select-none"
      style={{ height: "100dvh" }}
      onWheel={onWheel}
    >
      {/* Background starfield */}
      <StarField className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ── Zoomable canvas ── */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{ height: TOTAL_HEIGHT }}
        animate={{ scale, y: panY }}
        transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.8 }}
      >
        {/* Center line */}
        <div
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{
            left: `${LINE_X_CENTER * 100}%`,
            background: "linear-gradient(180deg, transparent 0%, rgba(159,140,255,0.25) 5%, rgba(159,140,255,0.15) 95%, transparent 100%)",
          }}
        />

        {/* Era sections */}
        {ERAS.map((era, eraIdx) => {
          const y          = eraY(eraIdx);
          const milestones = MILESTONES.filter(m => m.era === era.id);

          return (
            <div
              key={era.id}
              className="absolute left-0 w-full"
              style={{ top: y, height: ERA_HEIGHT }}
            >
              {/* Era background gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${era.color}08 0%, transparent 70%)`,
                }}
              />

              {/* Era separator */}
              <div
                className="absolute top-0 left-[5%] right-[5%] h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${era.color}44, transparent)` }}
              />

              {/* Era label pill — click to zoom */}
              <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-auto">
                <button
                  onClick={() => activeEra === era.id ? toOverview() : zoomEra(era.id, vpH)}
                  className="group flex items-center gap-2.5 px-5 py-2 rounded-full border transition-all duration-200"
                  style={{
                    background: era.color + "18",
                    borderColor: era.color + "55",
                    color: era.color,
                  }}
                >
                  <span className="text-[15px]">{era.icon}</span>
                  <span className="font-serif text-[14px] font-normal leading-none tracking-[0.01em]" style={{ color: era.color }}>
                    {era.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.10em] opacity-70">
                    {era.years}
                  </span>
                </button>
              </div>

              {/* Milestones */}
              {milestones.map((m, mIdx) => {
                const mLeft     = mIdx % 2 === 0;
                const spacing   = (ERA_HEIGHT - 140) / Math.max(milestones.length, 1);
                const mY        = 110 + mIdx * spacing;
                const dotLeft   = `${LINE_X_CENTER * 100}%`;
                const cardLeft  = mLeft ? "5%" : "55%";
                const cardRight = mLeft ? "50%" : "5%";

                return (
                  <div key={m.id} className="absolute w-full" style={{ top: mY }}>
                    {/* Connector line from center to card */}
                    <div
                      className="absolute top-[5px] h-px pointer-events-none"
                      style={{
                        left:  mLeft ? dotLeft : cardLeft,
                        right: mLeft ? cardRight : dotLeft,
                        background: `linear-gradient(${mLeft ? "270deg" : "90deg"}, transparent, ${era.color}50)`,
                      }}
                    />

                    {/* Center dot */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-0 w-[10px] h-[10px] rounded-full z-10"
                      style={{
                        left:      dotLeft,
                        background: era.color,
                        boxShadow: `0 0 10px ${era.color}88, 0 0 0 2px #060411, 0 0 0 3px ${era.color}`,
                      }}
                    />

                    {/* Milestone card */}
                    <button
                      onClick={() => setMilestone(m)}
                      className="absolute pointer-events-auto group cursor-pointer text-left rounded-xl border transition-all duration-200 px-4 py-3"
                      style={{
                        left:             mLeft ? "5%" : "55%",
                        right:            mLeft ? "50%" : "4%",
                        background:       "#0e0b1a",
                        borderColor:      era.color + "30",
                        top:              -14,
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-[18px] shrink-0 leading-none mt-0.5">{m.emoji}</span>
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] tracking-[0.12em] uppercase mb-1" style={{ color: era.color }}>
                            {m.year}
                          </div>
                          <div className="font-serif text-[13px] leading-[1.3] text-fg-1 group-hover:text-white transition-colors">
                            {m.title}
                          </div>
                          {m.by && (
                            <div className="font-mono text-[10px] text-fg-4 mt-1 truncate">{m.by}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </motion.div>

      {/* ── Fixed UI overlays ── */}

      {/* Top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-20"
        style={{ background: "linear-gradient(180deg, #060411 0%, transparent 100%)" }} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-20"
        style={{ background: "linear-gradient(0deg, #060411 0%, transparent 100%)" }} />

      {/* Header bar */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 pt-5 pb-3 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          {activeEra ? (
            <button
              onClick={toOverview}
              className="flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-fg-3 hover:text-fg-1 transition-colors"
            >
              <ArrowLeft size={14} />
              Overview
            </button>
          ) : (
            <div>
              <h1 className="font-serif text-[20px] md:text-[24px] text-fg-1 leading-none tracking-[-0.01em]">
                History of <em className="italic text-violet-bright">Artificial Intelligence</em>
              </h1>
              <p className="font-mono text-[11px] text-fg-3 mt-1 tracking-[0.06em]">
                {MILESTONES.length} milestones · {ERAS.length} eras · ~20,000 BC → 2026
              </p>
            </div>
          )}
        </div>

        {activeEra && (
          <div className="flex items-center gap-2 pointer-events-none">
            {(() => {
              const era = ERAS.find(e => e.id === activeEra);
              if (!era) return null;
              return (
                <span
                  className="font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border"
                  style={{ color: era.color, borderColor: era.color + "44", background: era.color + "14" }}
                >
                  {era.icon} {era.label}
                </span>
              );
            })()}
          </div>
        )}

        {/* Zoom controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              const newScale = clamp(scale * 1.3, MIN_SCALE, MAX_SCALE);
              const newPanY  = vpH / 2 - (vpH / 2 - panY) * (newScale / scale);
              setScale(newScale);
              setPanY(newPanY);
            }}
            className="w-8 h-8 rounded-full bg-violet/[0.10] border border-violet/20 flex items-center justify-center text-fg-3 hover:text-fg-1 hover:bg-violet/20 transition-all"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => {
              const newScale = clamp(scale * 0.77, MIN_SCALE, MAX_SCALE);
              const newPanY  = vpH / 2 - (vpH / 2 - panY) * (newScale / scale);
              setScale(newScale);
              setPanY(newPanY);
            }}
            className="w-8 h-8 rounded-full bg-violet/[0.10] border border-violet/20 flex items-center justify-center text-fg-3 hover:text-fg-1 hover:bg-violet/20 transition-all"
          >
            <ZoomOut size={14} />
          </button>
        </div>
      </div>

      {/* Era pill nav (bottom) */}
      <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center pointer-events-none">
        <div className="flex flex-wrap justify-center gap-1.5 max-w-[90vw] pointer-events-auto">
          {ERAS.map(era => (
            <button
              key={era.id}
              onClick={() => zoomEra(era.id, vpH)}
              className="font-mono text-[10px] tracking-[0.08em] px-2.5 py-1.5 rounded-full border transition-all duration-150"
              style={{
                color:       activeEra === era.id ? era.color : "#888",
                borderColor: activeEra === era.id ? era.color + "66" : "#333",
                background:  activeEra === era.id ? era.color + "18" : "transparent",
              }}
            >
              {era.icon} {era.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll/zoom hint (shown only at overview) */}
      {!activeEra && (
        <div className="absolute bottom-20 right-6 z-30 pointer-events-none">
          <span className="font-mono text-[10px] tracking-[0.08em] text-fg-4">
            scroll to zoom · click era to explore
          </span>
        </div>
      )}

      {/* ── Milestone Modal ── */}
      {milestone && (() => {
        const era = ERAS.find(e => e.id === milestone.era)!;
        return (
          <MilestoneModal
            key={milestone.id}
            m={milestone}
            era={era}
            onClose={() => setMilestone(null)}
          />
        );
      })()}
    </div>
  );
}
