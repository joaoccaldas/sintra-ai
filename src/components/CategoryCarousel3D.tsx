"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export const CAROUSEL_ITEMS = [
  { id: "quick-wins",     label: "Quick Wins",        cosmicName: "The Moon",       essence: "Closest. Brightest. Easiest to reach.",             color: 0xD4C9A0, hex: "#D4C9A0" },
  { id: "productivity",   label: "Productivity",      cosmicName: "Jupiter",        essence: "Orbits aligned. Momentum self-sustaining.",         color: 0x8FE3D2, hex: "#8FE3D2" },
  { id: "writing",        label: "Writing & Copy",    cosmicName: "Venus",          essence: "Every word — a photon that travels forever.",        color: 0xF4C56A, hex: "#F4C56A" },
  { id: "research",       label: "Research",          cosmicName: "Mars",           essence: "Unexplored terrain. Answers buried in red dust.",    color: 0xD4845A, hex: "#D4845A" },
  { id: "finance",        label: "Finance & FP&A",    cosmicName: "Io",             essence: "The most volcanic world. Energy never sleeps.",     color: 0x6EE7A0, hex: "#6EE7A0" },
  { id: "data-analytics", label: "Data & Analytics",  cosmicName: "Neptune",        essence: "Billions of points. One story.",                    color: 0xE8C089, hex: "#E8C089" },
  { id: "coding",         label: "Code & Automation", cosmicName: "Europa",         essence: "Beneath the ice: an ocean of possibility.",         color: 0x9F8CFF, hex: "#9F8CFF" },
  { id: "creative-ai",    label: "Creative & Design", cosmicName: "The Quasar",     essence: "Brightest object in the observable universe.",       color: 0x5EEAD4, hex: "#5EEAD4" },
  { id: "game-advanced",  label: "Game & Advanced",   cosmicName: "Rigel",          essence: "Where the rules of physics collapse.",              color: 0xC4A8F0, hex: "#C4A8F0" },
] as const;

const BASE = "/sintra-ai";

// ── Texture loader — callback sets needsUpdate after image arrives ────────────
function loadTex(path: string, srgb = true): THREE.Texture {
  const tex = new THREE.TextureLoader().load(path, (t) => { t.needsUpdate = true; });
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  // Leave wrapS/wrapT at default ClampToEdgeWrapping — correct for sphere UV mapping
  return tex;
}

// ── Signed shortest distance in a circular index list ────────────────────────
function getDiff(i: number, sel: number, n: number): number {
  const d = ((i - sel) % n + n) % n;
  return d > Math.floor(n / 2) ? d - n : d;
}

// ── Cosmic body factory ───────────────────────────────────────────────────────
function makeCosmicBody(
  idx: number,
  color: number,
): { body: THREE.Group; mainMat: THREE.MeshPhysicalMaterial } {
  const body = new THREE.Group();
  const c    = new THREE.Color(color);

  const pbr = (o: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
    new THREE.MeshPhysicalMaterial({
      color, clearcoat: 0.9, clearcoatRoughness: 0.08,
      reflectivity: 0.8, ...o,
    });

  switch (idx) {
    // 0 — Moon (NASA texture, 128-segment sphere) ────────────────────────────
    case 0: {
      const diffuse = loadTex(`${BASE}/moon-texture.png`);
      const bump    = loadTex(`${BASE}/moon-texture.png`, false);
      // Both textures share 52px dark borders L/R and 57/56px T/B out of 1408×768.
      // Crop them precisely so every pixel on the sphere shows actual surface data.
      for (const t of [diffuse, bump]) {
        t.wrapS = THREE.RepeatWrapping; // seamless horizontal wrap at seam
        t.repeat.set(0.9261, 0.8529);
        t.offset.set(0.0369, 0.0729);
      }
      const mat = new THREE.MeshStandardMaterial({
        map:       diffuse,
        bumpMap:   bump,
        bumpScale: 0.055,
        roughness: 0.95,
        metalness: 0.0,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.68, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    // 1 — Jupiter (NASA texture, 128-segment sphere) ─────────────────────────
    case 1: {
      const diffuse = loadTex(`${BASE}/jupiter-texture.png`);
      const bump    = loadTex(`${BASE}/jupiter-texture.png`, false);
      // 52px L/R dark borders, 57px top, 12px bottom out of 1408×768
      for (const t of [diffuse, bump]) {
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.set(0.9261, 0.9102);
        t.offset.set(0.0369, 0.0156);
      }
      const mat = new THREE.MeshStandardMaterial({
        map:       diffuse,
        bumpMap:   bump,
        bumpScale: 0.030,
        roughness: 0.75,
        metalness: 0.0,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.62, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    // 2 — Venus (NASA volcanic surface texture) ───────────────────────────────
    case 2: {
      const diffuse = loadTex(`${BASE}/venus-texture.png`);
      const bump    = loadTex(`${BASE}/venus-texture.png`, false);
      const mat = new THREE.MeshStandardMaterial({
        map:       diffuse,
        bumpMap:   bump,
        bumpScale: 0.035,
        roughness: 0.88,
        metalness: 0.0,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.62, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    // 3 — Mars (NASA texture, 128-segment sphere) ────────────────────────────
    case 3: {
      const diffuse = loadTex(`${BASE}/mars-texture.png`);
      const bump    = loadTex(`${BASE}/mars-texture.png`, false);
      // Same 52px L/R + 57/56px T/B dark borders as moon — apply identical crop.
      for (const t of [diffuse, bump]) {
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.set(0.9261, 0.8529);
        t.offset.set(0.0369, 0.0729);
      }
      const mat = new THREE.MeshStandardMaterial({
        map:       diffuse,
        bumpMap:   bump,
        bumpScale: 0.045,
        roughness: 0.90,
        metalness: 0.0,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.60, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    // 4 — Io ─────────────────────────────────────────────────────────────────
    case 4: {
      const diffuse = loadTex(`${BASE}/io-texture.png`);
      const bump    = loadTex(`${BASE}/io-texture.png`, false);
      for (const t of [diffuse, bump]) {
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.set(0.9492, 0.9056);
        t.offset.set(0.0254, 0.0472);
      }
      const mat = new THREE.MeshStandardMaterial({
        map: diffuse, bumpMap: bump, bumpScale: 0.022,
        roughness: 0.82, metalness: 0.0,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.62, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    // 5 — Neptune (NASA texture, deep-blue ice giant) ─────────────────────────
    case 5: {
      const diffuse = loadTex(`${BASE}/neptune-texture.png`);
      const bump    = loadTex(`${BASE}/neptune-texture.png`, false);
      const mat = new THREE.MeshStandardMaterial({
        map:       diffuse,
        bumpMap:   bump,
        bumpScale: 0.018,
        roughness: 0.72,
        metalness: 0.0,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.62, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    // 6 — Europa ──────────────────────────────────────────────────────────────
    case 6: {
      const diffuse = loadTex(`${BASE}/europa-texture.png`);
      const bump    = loadTex(`${BASE}/europa-texture.png`, false);
      for (const t of [diffuse, bump]) {
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.set(0.9602, 0.9583);
        t.offset.set(0.0199, 0.0167);
      }
      const mat = new THREE.MeshStandardMaterial({
        map: diffuse, bumpMap: bump, bumpScale: 0.010,
        roughness: 0.30, metalness: 0.05,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.62, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    // 7 — Quasar (NASA texture disk + dark core + relativistic jets) ──────────
    case 7: {
      const tex = loadTex(`${BASE}/quasar-texture.png`);
      const mat = new THREE.MeshPhysicalMaterial({
        map: tex, side: THREE.DoubleSide, transparent: true, opacity: 0.93,
        roughness: 0.10, metalness: 0.04, emissive: c, emissiveIntensity: 0.10,
      });
      const disk = new THREE.Mesh(new THREE.CircleGeometry(0.90, 96), mat);
      disk.rotation.x = Math.PI * 0.30;
      body.add(disk);
      body.add(new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x000005 }),
      ));
      for (const sign of [1, -1]) {
        const jet = new THREE.Mesh(
          new THREE.ConeGeometry(0.055, 0.78, 6),
          new THREE.MeshBasicMaterial({ color: 0xaaddff, transparent: true, opacity: 0.50 }),
        );
        jet.position.y = sign * 0.54;
        if (sign < 0) jet.rotation.z = Math.PI;
        body.add(jet);
      }
      return { body, mainMat: mat };
    }

    // 8 — Rigel (blue supergiant star surface texture) ────────────────────────
    case 8: {
      const diffuse = loadTex(`${BASE}/rigel-texture.png`);
      const bump    = loadTex(`${BASE}/rigel-texture.png`, false);
      // The source image is an oval star disk on a black background — the
      // black corners map to the sphere's poles and leave them dark.
      // Crop to the central 75% in both axes so the poles land within the
      // lit star-surface oval instead of the black border region.
      for (const t of [diffuse, bump]) {
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(0.75, 0.75);
        t.offset.set(0.125, 0.125);
      }
      const mat = new THREE.MeshStandardMaterial({
        map:            diffuse,
        bumpMap:        bump,
        bumpScale:      0.025,
        roughness:      0.30,
        metalness:      0.0,
        emissive:       new THREE.Color(0x1a2fff),
        emissiveIntensity: 0.22,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.62, 128, 64), mat));
      return { body, mainMat: mat as unknown as THREE.MeshPhysicalMaterial };
    }

    default: {
      const mat = pbr({});
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.65, 20, 20), mat));
      return { body, mainMat: mat };
    }
  }
}

interface Props {
  selectedIndex: number;
  onSelect: (idx: number) => void;
}

export default function CategoryCarousel3D({ selectedIndex, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef    = useRef(onSelect);
  const selectedRef  = useRef(selectedIndex);

  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);
  useEffect(() => { selectedRef.current = selectedIndex; }, [selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = container.clientWidth;
    let h = container.clientHeight;
    const N       = CAROUSEL_ITEMS.length;
    const SPACING = 2.70; // horizontal gap between item centres

    // ── Renderer ─────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Camera — FOV 38°, z=7.5 → visible half-width ≈ 2.58 units ───────
    // Adjacent centres at ±2.70 means ~35% of each adjacent sphere peeks in
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 0.8, 7.5);
    camera.lookAt(0, 0, 0);

    // ── Scene & lighting ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xfff8f0, 0x080d24, 0.45));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(7, 12, 9);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x7a88ff, 0.55);
    fillLight.position.set(-6, 3, -9);
    scene.add(fillLight);
    const warmFill = new THREE.DirectionalLight(0xffddb0, 0.30);
    warmFill.position.set(5, -4, 6);
    scene.add(warmFill);

    // ── Objects — placed linearly on X axis ───────────────────────────────
    type Obj = {
      group:   THREE.Group;
      body:    THREE.Group;
      hit:     THREE.Mesh;
      pt:      THREE.PointLight;
      mainMat: THREE.MeshPhysicalMaterial;
    };

    const carrier = new THREE.Group();
    scene.add(carrier);

    const objects: Obj[] = CAROUSEL_ITEMS.map((item, i) => {
      const diff = getDiff(i, 0, N);
      const g = new THREE.Group();
      // Initial position based on diff from selectedIndex=0
      g.position.set(
        diff * SPACING,
        diff === 0 ? 0.1 : 0,
        diff === 0 ? 0.3 : Math.abs(diff) === 1 ? -0.3 : -20,
      );

      const { body, mainMat } = makeCosmicBody(i, item.color);
      g.add(body);

      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      g.add(hit);

      const pt = new THREE.PointLight(item.color, 0, 5);
      g.add(pt);

      carrier.add(g);
      return { group: g, body, hit, pt, mainMat };
    });

    // ── Raycasting — only test visible slots (front + adjacent) ──────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();
    let hoveredIdx  = -1;

    const getHitIdx = (e: MouseEvent): number => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const candidates = objects
        .filter((_, idx) => Math.abs(getDiff(idx, selectedRef.current, N)) <= 1)
        .map(o => o.hit);
      const hits = raycaster.intersectObjects(candidates);
      return hits.length ? objects.findIndex(o => o.hit === hits[0].object) : -1;
    };

    const onMouseMove = (e: MouseEvent) => {
      hoveredIdx = getHitIdx(e);
      renderer.domElement.style.cursor = hoveredIdx >= 0 ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const idx = getHitIdx(e);
      if (idx >= 0) selectRef.current(idx);
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click",     onClick);

    // ── Render loop ───────────────────────────────────────────────────────
    let raf = 0;
    const selfAngles = new Array(N).fill(0);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const sel = selectedRef.current;

      objects.forEach((obj, i) => {
        const diff     = getDiff(i, sel, N);
        const isFront  = diff === 0;
        const isAdj    = Math.abs(diff) === 1;
        const isHovered = hoveredIdx === i && !isFront;

        // ── Target position ──
        const tX = diff * SPACING;
        const tZ = isFront ? 0.3 : isAdj ? -0.3 : -20;
        const tY = isFront ? 0.12 : 0;
        const lerpFactor = prefersReducedMotion ? 1 : 0.08;
        obj.group.position.x += (tX - obj.group.position.x) * lerpFactor;
        obj.group.position.z += (tZ - obj.group.position.z) * lerpFactor;
        obj.group.position.y += (tY - obj.group.position.y) * lerpFactor;

        // ── Scale ──
        const tScale = isFront   ? 1.40
          : isHovered ? 0.65
          : isAdj     ? 0.56
          : 0.01;
        obj.group.scale.lerp(new THREE.Vector3(tScale, tScale, tScale), prefersReducedMotion ? 1 : 0.08);

        // ── Opacity ──
        const tOpacity = isFront ? 1.0 : isAdj ? 0.52 : 0;
        obj.mainMat.opacity += (tOpacity - obj.mainMat.opacity) * 0.10;
        obj.mainMat.transparent = true;

        // ── Self-rotation ──
        if (!prefersReducedMotion) selfAngles[i] += isFront ? 0.009 : isAdj ? 0.002 : 0;
        obj.body.rotation.y = selfAngles[i];
        if (i === 5) obj.body.rotation.y = selfAngles[i] * 0.4; // galaxy slow-spin

        // ── Emissive pulse ──
        const tEmissive = isFront ? 0.20 : isAdj ? 0.04 : 0;
        obj.mainMat.emissiveIntensity += (tEmissive - obj.mainMat.emissiveIntensity) * 0.1;

        // ── Point light ──
        const tIntensity = isFront ? 2.6 : isAdj ? 0.5 : 0;
        obj.pt.intensity += (tIntensity - obj.pt.intensity) * 0.08;
      });

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      w = container.clientWidth; h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click",     onClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      objects.forEach(o => {
        o.body.traverse(child => {
          if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
          if ((child as THREE.Mesh).material) {
            const m = (child as THREE.Mesh).material;
            if (Array.isArray(m)) m.forEach(x => x.dispose());
            else (m as THREE.Material).dispose();
          }
        });
        o.hit.geometry.dispose();
        (o.hit.material as THREE.Material).dispose();
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="w-full h-full" aria-hidden="true" />;
}
