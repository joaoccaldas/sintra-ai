"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { CAROUSEL_ITEMS } from "@/lib/carouselData";

export { CAROUSEL_ITEMS };

// ── Signed shortest arc in circular index list ────────────────────────────
function getDiff(i: number, sel: number, n: number): number {
  const d = ((i - sel) % n + n) % n;
  return d > Math.floor(n / 2) ? d - n : d;
}

// ── Parametric helix curve used for Writing & Copy ────────────────────────
class HelixCurve extends THREE.Curve<THREE.Vector3> {
  private offset: number;
  constructor(offset = 0) { super(); this.offset = offset; }
  getPoint(t: number): THREE.Vector3 {
    const a = t * Math.PI * 6 + this.offset;
    return new THREE.Vector3(0.26 * Math.cos(a), (t - 0.5) * 1.1, 0.26 * Math.sin(a));
  }
}

// ── Extra material entry: tracks its "full-brightness" base opacity ────────
type ExtraMat = { mat: THREE.Material; base: number };
type ShapeResult = {
  body:      THREE.Group;
  mainMat:   THREE.MeshPhysicalMaterial;
  extraMats: ExtraMat[];
};

// ── Domain shape factory — one distinct 3-D geometry per subject area ──────
function makeShape(idx: number, color: number): ShapeResult {
  const body      = new THREE.Group();
  const c         = new THREE.Color(color);
  const extraMats: ExtraMat[] = [];

  // Helper: MeshPhysicalMaterial with sane defaults
  const phys = (o: Partial<THREE.MeshPhysicalMaterialParameters> = {}): THREE.MeshPhysicalMaterial =>
    new THREE.MeshPhysicalMaterial({ color, emissive: c, emissiveIntensity: 0, ...o });

  // Helper: glowing edge lines on any geometry
  const addEdges = (geo: THREE.BufferGeometry, lineColor: number, base: number) => {
    const mat = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: base });
    extraMats.push({ mat, base });
    body.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat));
  };

  switch (idx) {

    // ── 0 · Quick Wins ────────────────────────────────────────────────────
    // Polished gold icosahedron — 20 triangular faces read as a trophy/star.
    // Flat shading makes each facet catch light individually.
    case 0: {
      const geo = new THREE.IcosahedronGeometry(0.65, 0);
      const mat = phys({
        metalness: 0.96, roughness: 0.06,
        clearcoat: 1.0,  clearcoatRoughness: 0.04,
        flatShading: true,
      });
      body.add(new THREE.Mesh(geo, mat));
      addEdges(geo, 0xfffbe0, 0.55);
      return { body, mainMat: mat, extraMats };
    }

    // ── 1 · Productivity ──────────────────────────────────────────────────
    // Teal trefoil torus knot — a continuous, self-intersecting loop that
    // never stops. Perfect metaphor for compounding systems.
    case 1: {
      const geo = new THREE.TorusKnotGeometry(0.44, 0.135, 220, 20, 2, 3);
      const mat = phys({
        metalness: 0.88, roughness: 0.09,
        clearcoat: 1.0,  clearcoatRoughness: 0.05,
      });
      body.add(new THREE.Mesh(geo, mat));
      return { body, mainMat: mat, extraMats };
    }

    // ── 2 · Writing & Copy ────────────────────────────────────────────────
    // Double helix — two intertwined amber tubes, like the double strand of
    // language: form and meaning spiralling together.
    case 2: {
      const matA = phys({
        metalness: 0.28, roughness: 0.20,
        clearcoat: 0.85, clearcoatRoughness: 0.08,
      });
      body.add(new THREE.Mesh(
        new THREE.TubeGeometry(new HelixCurve(0),        300, 0.065, 12, false), matA,
      ));
      const matB = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffe898), emissive: new THREE.Color(0xffe898), emissiveIntensity: 0,
        metalness: 0.22, roughness: 0.26, clearcoat: 0.80, clearcoatRoughness: 0.10,
        transparent: true, opacity: 1,
      });
      extraMats.push({ mat: matB, base: 1.0 });
      body.add(new THREE.Mesh(
        new THREE.TubeGeometry(new HelixCurve(Math.PI), 300, 0.040, 12, false), matB,
      ));
      return { body, mainMat: matA, extraMats };
    }

    // ── 3 · Research ──────────────────────────────────────────────────────
    // Glass octahedron — physically-based transmission creates real refraction.
    // Eight clean faces = precision; transparency = the desire to see through.
    case 3: {
      const geo = new THREE.OctahedronGeometry(0.68, 0);
      const mat = phys({
        metalness:           0.0,
        roughness:           0.02,
        transmission:        0.82,
        thickness:           1.8,
        ior:                 1.65,
        clearcoat:           1.0,
        clearcoatRoughness:  0.02,
        flatShading:         true,
      });
      body.add(new THREE.Mesh(geo, mat));
      addEdges(geo, 0xffd8b0, 0.78);
      return { body, mainMat: mat, extraMats };
    }

    // ── 4 · Finance & FP&A ────────────────────────────────────────────────
    // Rising bar chart cylinders — the most literal possible symbol: the chart
    // bars from a financial dashboard, rendered in 3D metallic green.
    case 4: {
      const mat = phys({
        metalness: 0.84, roughness: 0.11,
        clearcoat: 0.90, clearcoatRoughness: 0.08,
      });
      const bars = [
        { h: 0.55, x: -0.38 },
        { h: 0.90, x: -0.125 },
        { h: 1.15, x:  0.125 },
        { h: 0.70, x:  0.38  },
      ];
      bars.forEach(({ h, x }) => {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, h, 32), mat);
        m.position.set(x, -0.38 + h / 2, 0);
        body.add(m);
      });
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0x0c2e1c, metalness: 0.55, roughness: 0.45,
        transparent: true, opacity: 1,
      });
      extraMats.push({ mat: baseMat, base: 1.0 });
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.042, 0.28), baseMat);
      base.position.y = -0.40;
      body.add(base);
      return { body, mainMat: mat, extraMats };
    }

    // ── 5 · Data & Analytics ─────────────────────────────────────────────
    // Icosphere node network — the subdivided sphere's edges form a graph of
    // connections; glowing vertex spheres are the data points.
    case 5: {
      const geo = new THREE.IcosahedronGeometry(0.58, 1); // 80 faces
      const mat = phys({ metalness: 0.14, roughness: 0.50 });
      body.add(new THREE.Mesh(geo, mat));
      addEdges(geo, color, 0.50);

      // Glowing vertex nodes
      const dotGeo = new THREE.SphereGeometry(0.028, 6, 6);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 1.0 });
      extraMats.push({ mat: dotMat, base: 1.0 });
      const pos  = geo.attributes.position as THREE.BufferAttribute;
      const seen = new Set<string>();
      for (let vi = 0; vi < pos.count; vi++) {
        const key = `${pos.getX(vi).toFixed(3)},${pos.getY(vi).toFixed(3)},${pos.getZ(vi).toFixed(3)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.fromBufferAttribute(pos, vi);
        body.add(dot);
      }
      return { body, mainMat: mat, extraMats };
    }

    // ── 6 · Code & Automation ────────────────────────────────────────────
    // Three orthogonal interlocking rings — like mechanical gears or the
    // three-axis gyroscope. Automated, precise, always in motion.
    case 6: {
      const mat = phys({
        metalness: 0.92, roughness: 0.06,
        clearcoat: 1.0,  clearcoatRoughness: 0.03,
      });
      const rGeo = new THREE.TorusGeometry(0.42, 0.095, 32, 80);
      // Ring 1 — XY plane (upright)
      body.add(new THREE.Mesh(rGeo, mat));
      // Ring 2 — YZ plane (side-on)
      const r2 = new THREE.Mesh(rGeo, mat);
      r2.rotation.y = Math.PI / 2;
      body.add(r2);
      // Ring 3 — XZ plane (flat)
      const r3 = new THREE.Mesh(rGeo, mat);
      r3.rotation.x = Math.PI / 2;
      body.add(r3);
      return { body, mainMat: mat, extraMats };
    }

    // ── 7 · Creative & Design ────────────────────────────────────────────
    // Iridescent dodecahedron gem — 12 pentagonal faces, glass transmission,
    // and full iridescence create a shifting soap-bubble / opal effect that
    // looks different from every angle. Genuinely creative geometry.
    case 7: {
      const geo = new THREE.DodecahedronGeometry(0.62, 0);
      const mat = phys({
        metalness: 0.04, roughness: 0.02,
        transmission: 0.65, thickness: 1.3, ior: 1.52,
        clearcoat: 1.0,  clearcoatRoughness: 0.02,
        flatShading: true,
      });
      // Iridescence via property assignment (TS-safe for Three.js ≥ r139)
      (mat as any).iridescence    = 1.0;
      (mat as any).iridescenceIOR = 1.38;
      body.add(new THREE.Mesh(geo, mat));
      addEdges(geo, 0xb0fff8, 0.42);
      return { body, mainMat: mat, extraMats };
    }

    // ── 8 · Game & Advanced ───────────────────────────────────────────────
    // D20 icosahedron — literally a twenty-sided die. Flat-shaded faces,
    // bright violet edge glow, and a heavy emissive pulse make it feel alive.
    case 8: {
      const geo = new THREE.IcosahedronGeometry(0.66, 0);
      const mat = phys({
        metalness: 0.72, roughness: 0.15,
        clearcoat: 0.80, clearcoatRoughness: 0.10,
        flatShading: true,
      });
      body.add(new THREE.Mesh(geo, mat));
      addEdges(geo, 0xe8d0ff, 0.85);
      return { body, mainMat: mat, extraMats };
    }

    default: {
      const mat = phys({ metalness: 0.5, roughness: 0.3 });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.65, 20, 20), mat));
      return { body, mainMat: mat, extraMats };
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
    const SPACING = 2.70;

    // ── Renderer ─────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace   = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ── Camera ───────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 0.8, 7.5);
    camera.lookAt(0, 0, 0);

    // ── Three-point + rim lighting ────────────────────────────────────────
    const scene = new THREE.Scene();

    // Sky/ground hemisphere — warm above, deep cool below
    scene.add(new THREE.HemisphereLight(0xfff4e0, 0x080c20, 0.55));

    // Key — main warm light from upper-right front
    const key = new THREE.DirectionalLight(0xfff9f0, 3.0);
    key.position.set(6, 10, 8);
    scene.add(key);

    // Fill — cool blue, left side, softens shadows
    const fill = new THREE.DirectionalLight(0x8099ff, 0.72);
    fill.position.set(-7, 2, -5);
    scene.add(fill);

    // Rim — pure white from behind-below, creates silhouette separation
    const rim = new THREE.DirectionalLight(0xffffff, 0.55);
    rim.position.set(-1, -5, -10);
    scene.add(rim);

    // Warm bounce — subtle orange from below, simulates floor bounce
    const bounce = new THREE.DirectionalLight(0xffcc88, 0.25);
    bounce.position.set(3, -7, 5);
    scene.add(bounce);

    // ── Scene objects ────────────────────────────────────────────────────
    type Obj = {
      group:     THREE.Group;
      body:      THREE.Group;
      hit:       THREE.Mesh;
      pt:        THREE.PointLight;
      mainMat:   THREE.MeshPhysicalMaterial;
      extraMats: ExtraMat[];
    };

    const carrier = new THREE.Group();
    scene.add(carrier);

    const objects: Obj[] = CAROUSEL_ITEMS.map((item, i) => {
      const diff = getDiff(i, 0, N);
      const g    = new THREE.Group();
      g.position.set(
        diff * SPACING,
        diff === 0 ? 0.1 : 0,
        diff === 0 ? 0.3 : Math.abs(diff) === 1 ? -0.3 : -20,
      );

      const { body, mainMat, extraMats } = makeShape(i, item.color);
      g.add(body);

      // Invisible sphere hit-target for raycasting
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      g.add(hit);

      // Per-object coloured point light for local glow
      const pt = new THREE.PointLight(item.color, 0, 5);
      g.add(pt);

      carrier.add(g);
      return { group: g, body, hit, pt, mainMat, extraMats };
    });

    // ── Raycasting — only test front + adjacent slots ────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();
    let hoveredIdx  = -1;

    const getHitIdx = (e: MouseEvent): number => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const candidates = objects
        .filter((_, ii) => Math.abs(getDiff(ii, selectedRef.current, N)) <= 1)
        .map(o => o.hit);
      const hits = raycaster.intersectObjects(candidates);
      return hits.length ? objects.findIndex(o => o.hit === hits[0].object) : -1;
    };

    const onMouseMove = (e: MouseEvent) => {
      hoveredIdx = getHitIdx(e);
      renderer.domElement.style.cursor = hoveredIdx >= 0 ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const ii = getHitIdx(e);
      if (ii >= 0) selectRef.current(ii);
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
        const diff    = getDiff(i, sel, N);
        const front   = diff === 0;
        const adj     = Math.abs(diff) === 1;
        const hovered = hoveredIdx === i && !front;
        const lerpF   = prefersReducedMotion ? 1 : 0.08;

        // ── Position lerp ──
        obj.group.position.x += (diff * SPACING          - obj.group.position.x) * lerpF;
        obj.group.position.z += ((front ? 0.3 : adj ? -0.3 : -20) - obj.group.position.z) * lerpF;
        obj.group.position.y += ((front ? 0.12 : 0)      - obj.group.position.y) * lerpF;

        // ── Scale lerp ──
        const tS = front ? 1.40 : hovered ? 0.65 : adj ? 0.56 : 0.01;
        obj.group.scale.lerp(new THREE.Vector3(tS, tS, tS), prefersReducedMotion ? 1 : 0.08);

        // ── Opacity — main material + proportional extras ──
        const tOp = front ? 1.0 : adj ? 0.52 : 0;
        obj.mainMat.opacity += (tOp - obj.mainMat.opacity) * 0.10;
        obj.mainMat.transparent = true;
        obj.extraMats.forEach(({ mat, base }) => {
          (mat as any).opacity     = base * obj.mainMat.opacity;
          (mat as any).transparent = true;
        });

        // ── Self-rotation ──
        if (!prefersReducedMotion) {
          selfAngles[i] += front ? 0.009 : adj ? 0.002 : 0;
          // Secondary axis rotations per shape
          if (i === 1) obj.body.rotation.z = selfAngles[i] * 0.30; // knot tumbles
          if (i === 2) obj.body.rotation.z = selfAngles[i] * 0.42; // helix twists
          if (i === 6) obj.body.rotation.z = selfAngles[i] * 0.62; // rings gyrate
        }
        obj.body.rotation.y = selfAngles[i];

        // ── Emissive pulse ──
        const tEm = front ? 0.24 : adj ? 0.04 : 0;
        obj.mainMat.emissiveIntensity += (tEm - obj.mainMat.emissiveIntensity) * 0.10;

        // ── Point light glow ──
        const tPt = front ? 2.8 : adj ? 0.5 : 0;
        obj.pt.intensity += (tPt - obj.pt.intensity) * 0.08;
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
          const m = child as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
          if (m.material) {
            if (Array.isArray(m.material)) m.material.forEach(x => x.dispose());
            else (m.material as THREE.Material).dispose();
          }
        });
        o.hit.geometry.dispose();
        (o.hit.material as THREE.Material).dispose();
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="w-full h-full" aria-hidden="true" />;
}
