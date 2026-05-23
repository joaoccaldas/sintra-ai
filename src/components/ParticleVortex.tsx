"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT        = 5500;
const COUNT_MOBILE = 2500;
const GALAXY_R     = 6.2;
const NUM_ARMS     = 3;

function makeGlowSprite(): THREE.Texture {
  const size = 64;
  const cv   = document.createElement("canvas");
  cv.width   = cv.height = size;
  const ctx  = cv.getContext("2d")!;
  const cx   = size / 2;
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  grad.addColorStop(0.00, "rgba(255,255,255,1.0)");
  grad.addColorStop(0.20, "rgba(255,255,255,0.75)");
  grad.addColorStop(0.50, "rgba(255,255,255,0.25)");
  grad.addColorStop(1.00, "rgba(255,255,255,0.0)");
  ctx.fillStyle = grad;
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
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute", top: "0", left: "0",
      width: "100%", height: "100%", display: "block",
    });

    // ── Scene & Camera ───────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 100);
    camera.position.set(0, 3.8, 5.4);
    camera.lookAt(0, 0, 0);

    // ── Glow sprite ──────────────────────────────────────────────────
    const sprite = makeGlowSprite();

    // ── Particle geometry ────────────────────────────────────────────
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const C_WHITE = new THREE.Color(1.0,       1.0,       1.0);
    const C_BVIOL = new THREE.Color("#B6A6FF");
    const C_VIOL  = new THREE.Color("#9F8CFF");
    const C_TEAL  = new THREE.Color("#5EEAD4");
    const C_DEEP  = new THREE.Color("#6655CC");

    for (let i = 0; i < count; i++) {
      const arm    = i % NUM_ARMS;
      const radius  = Math.sqrt(Math.random()) * GALAXY_R;
      const spin    = radius * 1.55;
      const branch  = (arm / NUM_ARMS) * Math.PI * 2;
      const angle   = branch + spin;
      const perpA   = angle + Math.PI * 0.5;

      // Perpendicular scatter — wider towards outer edge
      const scatterAmt = (Math.random() - 0.5) * 0.38 * (0.35 + 0.65 * radius / GALAXY_R);

      const x = Math.cos(angle) * radius + Math.cos(perpA) * scatterAmt;
      const z = Math.sin(angle) * radius + Math.sin(perpA) * scatterAmt;
      // Vertical dispersion: thin at edge, slightly thicker at core
      const y = (Math.random() - 0.5) * 0.28 * (1 - 0.72 * radius / GALAXY_R);

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color: white core → bright violet → violet → teal → deep violet rim
      const rn = radius / GALAXY_R;
      let col: THREE.Color;
      if (rn < 0.12) {
        col = C_WHITE.clone().lerp(C_BVIOL, rn / 0.12);
      } else if (rn < 0.42) {
        col = C_BVIOL.clone().lerp(C_VIOL, (rn - 0.12) / 0.30);
      } else if (rn < 0.72) {
        col = C_VIOL.clone().lerp(C_TEAL, (rn - 0.42) / 0.30);
      } else {
        col = C_TEAL.clone().lerp(C_DEEP, (rn - 0.72) / 0.28);
      }
      col.r = Math.max(0, Math.min(1, col.r + (Math.random() - 0.5) * 0.07));
      col.g = Math.max(0, Math.min(1, col.g + (Math.random() - 0.5) * 0.07));
      col.b = Math.max(0, Math.min(1, col.b + (Math.random() - 0.5) * 0.07));

      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));

    const mat = new THREE.PointsMaterial({
      size:          0.21,
      map:           sprite,
      vertexColors:  true,
      transparent:   true,
      opacity:       0.88,
      depthWrite:    false,
      blending:      THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    points.rotation.x = -Math.PI * 0.10;
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
        points.rotation.y = elapsed * 0.036;

        camX += (mX *  0.52 - camX) * 0.022;
        camY += (mY * -0.32 - camY) * 0.022;
        camera.position.x = camX;
        camera.position.y = 3.8 + camY;
        camera.lookAt(0, 0, 0);

        mat.opacity = 0.82 + Math.sin(elapsed * 0.62) * 0.06;
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
