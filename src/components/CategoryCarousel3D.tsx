"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export const CAROUSEL_ITEMS = [
  { id: "quick-wins",     label: "Quick Wins",        cosmicName: "The Moon",       essence: "Closest. Brightest. Easiest to reach.",             color: 0xD4C9A0, hex: "#D4C9A0" },
  { id: "productivity",   label: "Productivity",      cosmicName: "Ringed Planet",  essence: "Orbits aligned. Momentum self-sustaining.",         color: 0x8FE3D2, hex: "#8FE3D2" },
  { id: "writing",        label: "Writing & Copy",    cosmicName: "The Star",       essence: "Every word — a photon that travels forever.",        color: 0xF4C56A, hex: "#F4C56A" },
  { id: "research",       label: "Research",          cosmicName: "Mars",           essence: "Unexplored terrain. Answers buried in red dust.",    color: 0xD4845A, hex: "#D4845A" },
  { id: "finance",        label: "Finance & FP&A",    cosmicName: "The Pulsar",     essence: "Precise rhythm. Relentless accuracy.",               color: 0x6EE7A0, hex: "#6EE7A0" },
  { id: "data-analytics", label: "Data & Analytics",  cosmicName: "The Galaxy",     essence: "Billions of points. One story.",                    color: 0xE8C089, hex: "#E8C089" },
  { id: "coding",         label: "Code & Automation", cosmicName: "The Supernova",  essence: "One burst of energy. Everything changes.",          color: 0x9F8CFF, hex: "#9F8CFF" },
  { id: "creative-ai",    label: "Creative & Design", cosmicName: "The Quasar",     essence: "Brightest object in the observable universe.",       color: 0x5EEAD4, hex: "#5EEAD4" },
  { id: "game-advanced",  label: "Game & Advanced",   cosmicName: "Black Hole",     essence: "Where the rules of physics collapse.",              color: 0xC4A8F0, hex: "#C4A8F0" },
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
    // 0 — Moon (NASA texture, 128-segment sphere for full UV coverage) ─────────
    case 0: {
      const diffuse = loadTex(`${BASE}/moon-texture.png`);
      const bump    = loadTex(`${BASE}/moon-texture.png`, false);
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

    // 1 — Ringed Planet (Saturn-like, teal) ──────────────────────────────────
    case 1: {
      const mat = pbr({ metalness: 0.08, roughness: 0.42 });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.52, 40, 40), mat));
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.74, 1.12, 80),
        new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.44 }),
      );
      ring.rotation.x = Math.PI * 0.36;
      body.add(ring);
      return { body, mainMat: mat };
    }

    // 2 — Star / Sun ──────────────────────────────────────────────────────────
    case 2: {
      const mat = pbr({ metalness: 0.0, roughness: 0.2, emissive: c, emissiveIntensity: 0.32 });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.58, 36, 36), mat));
      for (let i = 0; i < 14; i++) {
        const phi   = Math.acos(1 - 2 * (i / 14));
        const theta = i * 2.399;
        const h     = 0.22 + Math.random() * 0.14;
        const cone  = new THREE.Mesh(
          new THREE.ConeGeometry(0.035, h, 4),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.52 }),
        );
        const dir = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta),
        );
        cone.position.copy(dir.clone().multiplyScalar(0.68));
        cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        body.add(cone);
      }
      return { body, mainMat: mat };
    }

    // 3 — Mars (NASA texture, 128-segment sphere for full UV coverage) ────────
    case 3: {
      const diffuse = loadTex(`${BASE}/mars-texture.png`);
      const bump    = loadTex(`${BASE}/mars-texture.png`, false);
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

    // 4 — Pulsar ──────────────────────────────────────────────────────────────
    case 4: {
      const mat = pbr({ metalness: 0.88, roughness: 0.04, emissive: c, emissiveIntensity: 0.18 });
      body.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.44, 0), mat));
      for (const sign of [1, -1]) {
        const jet = new THREE.Mesh(
          new THREE.CylinderGeometry(0.0, 0.065, 0.82, 6),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.60 }),
        );
        jet.position.y = sign * 0.60;
        if (sign < 0) jet.rotation.z = Math.PI;
        body.add(jet);
      }
      return { body, mainMat: mat };
    }

    // 5 — Galaxy (spiral) ─────────────────────────────────────────────────────
    case 5: {
      const mat = pbr({ metalness: 0.2, roughness: 0.5, emissive: c, emissiveIntensity: 0.22 });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), mat));
      const pos: number[] = [];
      for (let i = 0; i < 520; i++) {
        const t     = i / 520;
        const arm   = i % 2;
        const angle = t * Math.PI * 5 + arm * Math.PI + (Math.random() - 0.5) * 0.52;
        const r     = 0.16 + t * 0.96 + (Math.random() - 0.5) * 0.09;
        pos.push(Math.cos(angle) * r, (Math.random() - 0.5) * 0.07, Math.sin(angle) * r);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      body.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color, size: 0.021, transparent: true, opacity: 0.9 })));
      return { body, mainMat: mat };
    }

    // 6 — Supernova (spiky) ───────────────────────────────────────────────────
    case 6: {
      const geo  = new THREE.IcosahedronGeometry(0.52, 1);
      const attr = geo.attributes.position;
      for (let i = 0; i < attr.count; i++) {
        const v = new THREE.Vector3(attr.getX(i), attr.getY(i), attr.getZ(i));
        v.multiplyScalar(1 + Math.random() * 0.46);
        attr.setXYZ(i, v.x, v.y, v.z);
      }
      geo.computeVertexNormals();
      const mat = pbr({ metalness: 0.28, roughness: 0.16, emissive: c, emissiveIntensity: 0.16 });
      body.add(new THREE.Mesh(geo, mat));
      return { body, mainMat: mat };
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

    // 8 — Black Hole ──────────────────────────────────────────────────────────
    case 8: {
      body.add(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x010108 }),
      ));
      let mainMat = new THREE.MeshPhysicalMaterial();
      for (let r = 0; r < 3; r++) {
        const rMat = new THREE.MeshPhysicalMaterial({
          color, metalness: 0.6, roughness: 0.06, clearcoat: 1.0,
          transparent: true, opacity: 0.88 - r * 0.24,
          emissive: c, emissiveIntensity: 0.28 - r * 0.06,
        });
        if (r === 0) mainMat = rMat;
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.46 + r * 0.2, 0.054 - r * 0.01, 8, 80), rMat);
        ring.rotation.x = Math.PI / 2 + (r - 1) * 0.11;
        body.add(ring);
      }
      return { body, mainMat };
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
        obj.group.position.x += (tX - obj.group.position.x) * 0.08;
        obj.group.position.z += (tZ - obj.group.position.z) * 0.08;
        obj.group.position.y += (tY - obj.group.position.y) * 0.08;

        // ── Scale ──
        const tScale = isFront   ? 1.40
          : isHovered ? 0.78
          : isAdj     ? 0.72
          : 0.01;
        obj.group.scale.lerp(new THREE.Vector3(tScale, tScale, tScale), 0.08);

        // ── Opacity ──
        const tOpacity = isFront ? 1.0 : isAdj ? 0.52 : 0;
        obj.mainMat.opacity += (tOpacity - obj.mainMat.opacity) * 0.10;
        obj.mainMat.transparent = true;

        // ── Self-rotation ──
        selfAngles[i] += isFront ? 0.009 : isAdj ? 0.002 : 0;
        obj.body.rotation.y = selfAngles[i];
        if (i === 5) obj.body.rotation.y = selfAngles[i] * 0.5; // galaxy slower
        if (i === 4) obj.body.rotation.x = selfAngles[i] * 0.4; // pulsar wobble

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
