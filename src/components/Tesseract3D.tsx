"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

type DiveFn = () => void;

interface Props {
  onDive?: (fn: DiveFn) => void;
  reducedMotion?: boolean;
}

// 5-layer additive "fake bloom" — gives a richer glow than the original 3 layers
// without paying the cost of a real post-processing pipeline on a transparent canvas.
const LAYERS = [
  { color: 0xF4F2EA, opacity: 1.0,  scale: 1.000, lineWidth: 1 }, // parchment core
  { color: 0xCBC0FF, opacity: 0.55, scale: 1.008, lineWidth: 1 },
  { color: 0xB6A6FF, opacity: 0.32, scale: 1.020, lineWidth: 1 }, // bright violet
  { color: 0x9F8CFF, opacity: 0.18, scale: 1.045, lineWidth: 1 },
  { color: 0x6E5BD9, opacity: 0.10, scale: 1.085, lineWidth: 1 }, // deep violet halo
];

export default function Tesseract3D({ onDive, reducedMotion = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diveRef = useRef<DiveFn>(() => {});
  const visibleRef = useRef(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let w = container.clientWidth;
    let h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 200);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 16 vertices of a unit tesseract
    const V4: number[][] = [];
    for (let x = -1; x <= 1; x += 2)
      for (let y = -1; y <= 1; y += 2)
        for (let z = -1; z <= 1; z += 2)
          for (let w4 = -1; w4 <= 1; w4 += 2)
            V4.push([x, y, z, w4]);

    // 32 edges
    const EDGES: [number, number][] = [];
    for (let i = 0; i < 16; i++)
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) if (V4[i][k] !== V4[j][k]) diff++;
        if (diff === 1) EDGES.push([i, j]);
      }

    type Layer = {
      geo: THREE.BufferGeometry;
      mat: THREE.LineBasicMaterial;
      lines: THREE.LineSegments;
      positions: Float32Array;
      baseOpacity: number;
    };

    const makeLayer = (color: number, opacity: number, scale: number): Layer => {
      const positions = new Float32Array(EDGES.length * 2 * 3);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(geo, mat);
      lines.scale.setScalar(scale);
      return { geo, mat, lines, positions, baseOpacity: opacity };
    };

    const layers = LAYERS.map(L => makeLayer(L.color, L.opacity, L.scale));
    const group = new THREE.Group();
    // back-to-front: largest halo first so additive blending stacks correctly
    [...layers].reverse().forEach(l => group.add(l.lines));
    scene.add(group);

    // Emissive vertex sprites — a circular soft texture gives proper halo at corners
    const spriteSize = 64;
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = spriteSize;
    const ctx = spriteCanvas.getContext("2d")!;
    const g = ctx.createRadialGradient(spriteSize / 2, spriteSize / 2, 0, spriteSize / 2, spriteSize / 2, spriteSize / 2);
    g.addColorStop(0,    "rgba(182,166,255,1)");
    g.addColorStop(0.35, "rgba(159,140,255,0.7)");
    g.addColorStop(1,    "rgba(110,91,217,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, spriteSize, spriteSize);
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);
    spriteTex.colorSpace = THREE.SRGBColorSpace;

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(16 * 3), 3));
    const pMat = new THREE.PointsMaterial({
      map: spriteTex,
      color: 0xFFFFFF,
      size: 0.32,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // Starfield — fewer if reduced motion
    const starCount = reducedMotion ? 400 : 1200;
    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(starCount * 3);
    const sCol = new Float32Array(starCount * 3);
    const palette = [
      [1.0, 0.95, 0.92],
      [0.78, 0.78, 0.86],
      [0.62, 0.55, 1.0],
      [0.56, 0.88, 0.82],
    ];
    for (let i = 0; i < starCount; i++) {
      const r = 18 + Math.random() * 38;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sPos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      sPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      sPos[i * 3 + 2] = r * Math.cos(ph);
      const c = palette[Math.floor(Math.random() * palette.length)];
      sCol[i * 3] = c[0]; sCol[i * 3 + 1] = c[1]; sCol[i * 3 + 2] = c[2];
    }
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
    const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    scene.add(stars);

    // 4D math
    const project = (v: number[]) => {
      const dist = 2.4;
      const k = dist / (dist - v[3]);
      return [v[0] * k, v[1] * k, v[2] * k];
    };

    const rotate4D = (v: number[], t: number, p: number) => {
      const ct = Math.cos(t), st = Math.sin(t);
      const x = v[0] * ct - v[3] * st;
      let ww = v[0] * st + v[3] * ct;
      const cp = Math.cos(p), sp = Math.sin(p);
      const y = v[1] * cp - ww * sp;
      ww = v[1] * sp + ww * cp;
      return [x, y, v[2], ww];
    };

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMove = (e: PointerEvent) => {
      if (reducedMotion) return;
      const rect = container.getBoundingClientRect();
      tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      tmy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    // Pause RAF when out of view
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(container);

    // Scroll-linked opacity: tesseract fades as user enters page-content
    let scrollOpacity = 1;
    const onScroll = () => {
      const k = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
      scrollOpacity = 1 - k;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Dive animation
    const dive = { active: false, t: 0, dur: 1100, startZ: 7.2, endZ: -2.5 };
    diveRef.current = () => {
      if (dive.active) return;
      dive.active = true;
      dive.t = performance.now();
    };

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visibleRef.current && !dive.active) return; // skip render when offscreen

      const elapsed = (now - start) / 1000;
      // Reduced motion: slow auto-rotation way down
      const spd = reducedMotion ? 0.04 : 0.22;
      const theta = elapsed * spd;
      const phi   = elapsed * spd * 0.73;

      const projected = V4.map(v => project(rotate4D(v, theta, phi)));

      const pArr = points.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 16; i++) {
        pArr[i * 3]     = projected[i][0];
        pArr[i * 3 + 1] = projected[i][1];
        pArr[i * 3 + 2] = projected[i][2];
      }
      points.geometry.attributes.position.needsUpdate = true;

      // Subtle vertex pulse — uses elapsed * 1.4 so it doesn't sync with rotation
      pMat.size = 0.30 + Math.sin(elapsed * 1.4) * 0.025;

      // Shared edge positions across all layers
      const base = layers[0].positions;
      for (let i = 0; i < EDGES.length; i++) {
        const [a, b] = EDGES[i];
        base[i * 6]     = projected[a][0]; base[i * 6 + 1] = projected[a][1]; base[i * 6 + 2] = projected[a][2];
        base[i * 6 + 3] = projected[b][0]; base[i * 6 + 4] = projected[b][1]; base[i * 6 + 5] = projected[b][2];
      }
      for (let i = 1; i < layers.length; i++) layers[i].positions.set(base);
      for (const L of layers) L.geo.attributes.position.needsUpdate = true;

      // Pointer parallax (skipped under reduced motion)
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      group.rotation.y = mx * 0.32;
      group.rotation.x = -my * 0.22;
      group.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.6) * 0.06;

      stars.rotation.y = elapsed * 0.012;
      stars.rotation.x = elapsed * 0.006;

      // Apply scroll fade (combined with dive fade)
      let diveOpacity = 1;
      if (dive.active) {
        const k = Math.min(1, (now - dive.t) / dive.dur);
        const e = 1 - Math.pow(1 - k, 3);
        camera.position.z = dive.startZ + (dive.endZ - dive.startZ) * e;
        const s = 1 + e * 4;
        group.scale.setScalar(s);
        diveOpacity = 1 - e * 0.85;
        if (k >= 1) dive.active = false;
      }
      const o = scrollOpacity * diveOpacity;
      for (const L of layers) L.mat.opacity = L.baseOpacity * o;
      pMat.opacity = 0.95 * o;
      (stars.material as THREE.PointsMaterial).opacity = 0.85 * o;

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(tick);
    setReady(true);

    const onResize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      for (const L of layers) { L.geo.dispose(); L.mat.dispose(); }
      pGeo.dispose(); sGeo.dispose();
      pMat.dispose(); (stars.material as THREE.PointsMaterial).dispose();
      spriteTex.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (onDive && ready) onDive(() => diveRef.current());
  }, [onDive, ready]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-[1]"
    />
  );
}
