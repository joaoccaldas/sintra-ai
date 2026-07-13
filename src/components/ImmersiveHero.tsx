"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { ArrowRight, Radio, ShieldCheck, Workflow } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { LIVE_FEED, LIVE_ITEMS } from "@/lib/liveFeedData";
import { AUTOMATION_WORKFLOWS } from "@/lib/automationData";
import NewsTicker from "./NewsTicker";

interface Props { total: number; }

const line = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function feedFreshnessLabel(): string {
  const generated = new Date(LIVE_FEED.generatedAt).getTime();
  if (Number.isNaN(generated)) return "feed timestamp checked";
  const hours = Math.max(0, Math.floor((Date.now() - generated) / 3.6e6));
  if (hours < 1) return "feed fresh · just updated";
  if (hours < 24) return `feed fresh · ${hours}h old`;
  return `feed snapshot · ${Math.floor(hours / 24)}d old`;
}

/**
 * Tesseract wireframe scene — two offset cubes connected corner-to-corner,
 * the same projection as the site's TesseractMark logo, extruded into 3D and
 * set rotating. Reacts to cursor position and to scroll: as the visitor
 * scrolls through the hero, the wireframe fades and a particle field expands
 * to fill its place (the "shatter" moment), while the camera pushes forward.
 * All of this lives on a canvas *behind* real DOM content — the headline,
 * stats, and CTAs below are actual HTML, not canvas text, so search engines,
 * screen readers, and prefers-reduced-motion visitors all get a complete,
 * navigable hero regardless of whether the canvas renders.
 */
function TesseractScene({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    const hero = heroRef.current;
    if (!el || !hero) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 4000);
    camera.position.z = 620;

    // ── Tesseract: inner cube + outer cube + 8 connecting edges ──────────
    const inner = 80, outer = 160;
    const cubeVerts = (s: number) => [
      [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
      [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
    ];
    const innerV = cubeVerts(inner);
    const outerV = cubeVerts(outer);
    const cubeEdges = (v: number[][]) => [
      [0,1],[1,2],[2,3],[3,0], [4,5],[5,6],[6,7],[7,4], [0,4],[1,5],[2,6],[3,7],
    ].flatMap(([a, b]) => [...v[a], ...v[b]]);
    const connectEdges = innerV.flatMap((v, i) => [...v, ...outerV[i]]);
    const tesseractPositions = new Float32Array([
      ...cubeEdges(innerV), ...cubeEdges(outerV), ...connectEdges,
    ]);
    const tGeo = new THREE.BufferGeometry();
    tGeo.setAttribute("position", new THREE.BufferAttribute(tesseractPositions, 3));
    const tMat = new THREE.LineBasicMaterial({ color: 0x9f8cff, transparent: true, opacity: 0.85 });
    const tesseract = new THREE.LineSegments(tGeo, tMat);
    scene.add(tesseract);

    const vertGeo = new THREE.BufferGeometry();
    vertGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([...innerV, ...outerV].flat()), 3));
    const vertMat = new THREE.PointsMaterial({ color: 0xb6a6ff, size: 5, sizeAttenuation: true, transparent: true, opacity: 0.9 });
    const tesseractVerts = new THREE.Points(vertGeo, vertMat);
    scene.add(tesseractVerts);

    // ── Particle field: violet / cyan / amber, Sintra's own palette ──────
    const count = 2400;
    const pPos = new Float32Array(count * 3);
    const pCol = new Float32Array(count * 3);
    const palette = [[0.62, 0.55, 1.0], [0.56, 0.89, 0.82], [0.91, 0.75, 0.54]];
    for (let i = 0; i < count; i++) {
      const r = 260 + Math.random() * 1400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi) - 400;
      const c = palette[i % 3];
      pCol[i * 3] = c[0]; pCol[i * 3 + 1] = c[1]; pCol[i * 3 + 2] = c[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({ size: 2.2, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let raf = 0;
    let mouseX = 0, mouseY = 0, targetRotX = 0, targetRotY = 0;
    let scrollProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      // 0 at the top of the hero, 1 once scrolled a full viewport past it
      scrollProgress = Math.min(1, Math.max(0, -rect.top / window.innerHeight));
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.0032;

      targetRotX += (mouseY * 0.5 - targetRotX) * 0.04;
      targetRotY += (mouseX * 0.5 - targetRotY) * 0.04;
      tesseract.rotation.x = t * 0.25 + targetRotX;
      tesseract.rotation.y = t * 0.35 + targetRotY;
      tesseractVerts.rotation.copy(tesseract.rotation);

      const fade = 1 - scrollProgress;
      tMat.opacity = 0.85 * fade;
      vertMat.opacity = 0.9 * fade;
      pMat.opacity = 0.75 * Math.min(1, scrollProgress * 1.6);
      particles.rotation.y = t * 0.02;
      particles.scale.setScalar(0.6 + scrollProgress * 0.9);

      camera.position.z = 620 - scrollProgress * 380;
      tesseract.scale.setScalar(1 + scrollProgress * 0.6);
      tesseractVerts.scale.copy(tesseract.scale);

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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      tGeo.dispose(); vertGeo.dispose(); pGeo.dispose();
      tMat.dispose(); vertMat.dispose(); pMat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [heroRef]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}

export default function ImmersiveHero({ total }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : line;

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-32 md:pt-36 md:pb-40 overflow-hidden bg-void min-h-[130vh]"
    >
      {/* Three.js canvas — decorative only; disabled entirely for
          prefers-reduced-motion so nothing forces motion on visitors who've
          asked for none, and so there's no WebGL cost for them either. */}
      {!prefersReducedMotion && <TesseractScene heroRef={heroRef} />}

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 58% at 50% -8%, rgba(159,140,255,0.16) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--abyss))" }}
      />

      {/* Real DOM content — sits in front of (and survives without) the canvas. */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          custom={0} variants={variants} initial="hidden" animate="show"
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="eyebrow violet">AI command center · live intelligence · automation</span>
          <span className="w-6 h-px bg-gradient-to-l from-transparent to-violet-bright" />
        </motion.div>

        <motion.h1
          custom={1} variants={variants} initial="hidden" animate="show"
          className="font-serif font-light text-[clamp(52px,9vw,112px)] leading-[0.94] tracking-[-0.055em] text-fg-1 mb-6"
        >
          The operating map for <em className="italic text-violet-bright">AI work</em>.
        </motion.h1>

        <motion.p
          custom={2} variants={variants} initial="hidden" animate="show"
          className="text-[16px] md:text-[20px] leading-relaxed text-fg-3 mb-7 max-w-2xl mx-auto"
        >
          Track what is changing, understand what matters, compare tools and models, then turn it into prompts, workflows and automation systems.
        </motion.p>

        <motion.div
          custom={3} variants={variants} initial="hidden" animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto mb-8"
        >
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 backdrop-blur-sm">
            <p className="font-mono text-[15px] text-fg-1 tabular-nums">{LIVE_ITEMS.length}</p>
            <p className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">live signals</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 backdrop-blur-sm">
            <p className="font-mono text-[15px] text-fg-1 tabular-nums">{AUTOMATION_WORKFLOWS.length}</p>
            <p className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">workflow blueprints</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 backdrop-blur-sm">
            <p className="font-mono text-[15px] text-fg-1 tabular-nums">{total.toLocaleString()}</p>
            <p className="font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4">AI use cases</p>
          </div>
        </motion.div>

        <motion.div
          custom={4} variants={variants} initial="hidden" animate="show"
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <a href={`${BASE_PATH}/live/`} className="btn inline-flex items-center gap-2">
            <Radio size={13} /> Explore live AI
          </a>
          <a href={`${BASE_PATH}/automate/`} className="btn btn-ghost inline-flex items-center gap-2">
            <Workflow size={13} /> Build an automation
          </a>
          <a
            href="#explore"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-ghost inline-flex items-center gap-2"
          >
            Browse the map <ArrowRight size={13} />
          </a>
        </motion.div>

        <motion.div
          custom={5} variants={variants} initial="hidden" animate="show"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.10em] uppercase text-fg-4"
        >
          <span className="inline-flex items-center gap-1.5 text-emerald-400"><ShieldCheck size={12} /> {feedFreshnessLabel()}</span>
          <span>{LIVE_FEED.sourceCount} sources</span>
          <span>RSS + JSON feed</span>
          <span>static, auditable, source-backed</span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <NewsTicker />
      </div>
    </section>
  );
}
