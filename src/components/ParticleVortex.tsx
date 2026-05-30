"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Desktop: 8 k particles; mobile: 3.5 k
const COUNT        = 8000;
const COUNT_MOBILE = 3500;
const GALAXY_R     = 8.8;  // world-units radius — fills the ~22° overhead FOV
const NUM_ARMS     = 2;    // two clean spiral arms, like HELIOS

function makeGlowSprite(): THREE.Texture {
  const size = 128;
  const cv   = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d")!;
  const cx  = size / 2;
  const g   = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  g.addColorStop(0.00, "rgba(255,255,255,1.0)");
  g.addColorStop(0.15, "rgba(255,255,255,0.85)");
  g.addColorStop(0.40, "rgba(255,255,255,0.35)");
  g.addColorStop(0.75, "rgba(255,255,255,0.08)");
  g.addColorStop(1.00, "rgba(255,255,255,0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(cv);
}

export default function ParticleVortex() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile       = window.innerWidth < 768;
    const count          = isMobile ? COUNT_MOBILE : COUNT;

    // ── Renderer ────────────────────────────────────────────────────
    const W = mount.clientWidth  || window.innerWidth;
    const H = mount.clientHeight || window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure  = 1.45;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute", top: "0", left: "0",
      width: "100%", height: "100%", display: "block",
    });

    // ── Camera — nearly overhead (~22° from vertical, like HELIOS) ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 100);
    camera.position.set(0, 5.6, 2.2);
    camera.lookAt(0, 0, 0);

    // ── Glow sprite ─────────────────────────────────────────────────
    const sprite = makeGlowSprite();

    // ── Particle geometry ────────────────────────────────────────────
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    // sintra-ai palette, vivid
    const C_WHITE   = new THREE.Color(1.00, 1.00, 1.00);
    const C_BVIOL   = new THREE.Color("#C8BAFF"); // boosted bright violet
    const C_VIOL    = new THREE.Color("#9F8CFF");
    const C_TEAL    = new THREE.Color("#5EEAD4");
    const C_DVIOLET = new THREE.Color("#5540AA");

    for (let i = 0; i < count; i++) {
      let radius: number;

      // ~22 % of particles form a very dense bright core
      if (i < count * 0.22) {
        radius = Math.pow(Math.random(), 1.8) * GALAXY_R * 0.18;
      } else {
        radius = Math.pow(Math.random(), 0.55) * GALAXY_R;
      }

      const arm    = i % NUM_ARMS;
      const spin   = radius * 1.85;                         // tight spiral
      const branch = (arm / NUM_ARMS) * Math.PI * 2;
      const angle  = branch + spin;
      const perpA  = angle + Math.PI * 0.5;

      // Perpendicular scatter — tighter at core, wider at rim
      const sc = (Math.random() - 0.5) * 0.22 * (0.3 + 0.7 * radius / GALAXY_R);

      const x = Math.cos(angle) * radius + Math.cos(perpA) * sc;
      const z = Math.sin(angle) * radius + Math.sin(perpA) * sc;
      // Very flat disc — HELIOS looks nearly 2-D from above
      const y = (Math.random() - 0.5) * 0.18 * (1 - 0.80 * radius / GALAXY_R);

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Colour: white core → bright violet → violet → teal → deep violet rim
      const rn = radius / GALAXY_R;
      let col: THREE.Color;
      if (rn < 0.08) {
        col = C_WHITE.clone().lerp(C_BVIOL, rn / 0.08);
      } else if (rn < 0.35) {
        col = C_BVIOL.clone().lerp(C_VIOL, (rn - 0.08) / 0.27);
      } else if (rn < 0.68) {
        col = C_VIOL.clone().lerp(C_TEAL, (rn - 0.35) / 0.33);
      } else {
        col = C_TEAL.clone().lerp(C_DVIOLET, (rn - 0.68) / 0.32);
      }
      col.r = Math.max(0, Math.min(1, col.r + (Math.random() - 0.5) * 0.06));
      col.g = Math.max(0, Math.min(1, col.g + (Math.random() - 0.5) * 0.06));
      col.b = Math.max(0, Math.min(1, col.b + (Math.random() - 0.5) * 0.06));

      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));

    const mat = new THREE.PointsMaterial({
      size:            0.24,
      map:             sprite,
      vertexColors:    true,
      transparent:     true,
      opacity:         0.92,
      depthWrite:      false,
      blending:        THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    // Near-flat; camera provides the overhead perspective angle
    points.rotation.x = -Math.PI * 0.04;
    scene.add(points);

    // ── Mouse parallax ───────────────────────────────────────────────
    let mX = 0, mY = 0;
    const onMouse = (e: MouseEvent) => {
      mX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!prefersReduced) {
      window.addEventListener("mousemove", onMouse, { passive: true });
    }

    // ── Animation loop ───────────────────────────────────────────────
    let raf: number;
    const clock = new THREE.Clock();
    let camX = 0, camY = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const elapsed = clock.getElapsedTime();

      if (!prefersReduced) {
        points.rotation.y = elapsed * 0.034;

        // Gentle camera drift following mouse
        camX += (mX *  0.30 - camX) * 0.020;
        camY += (mY * -0.20 - camY) * 0.020;
        camera.position.x = camX;
        camera.position.y = 5.6 + camY;
        camera.lookAt(0, 0, 0);

        mat.opacity = 0.88 + Math.sin(elapsed * 0.55) * 0.04;
      }

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ───────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (!prefersReduced) window.removeEventListener("mousemove", onMouse);
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} aria-hidden="true" />;
}
