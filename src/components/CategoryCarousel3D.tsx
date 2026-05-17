"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export const CAROUSEL_ITEMS = [
  { id: "quick-wins",     label: "Quick Wins",        cosmicName: "The Moon",       essence: "Closest. Brightest. Easiest to reach.",             color: 0xD4C9A0, hex: "#D4C9A0" },
  { id: "productivity",   label: "Productivity",      cosmicName: "Ringed Planet",  essence: "Orbits aligned. Momentum self-sustaining.",         color: 0x8FE3D2, hex: "#8FE3D2" },
  { id: "writing",        label: "Writing & Copy",    cosmicName: "The Star",       essence: "Every word — a photon that travels forever.",        color: 0xF4C56A, hex: "#F4C56A" },
  { id: "research",       label: "Research",          cosmicName: "The Nebula",     essence: "Vast. Formless. Until you look closely.",            color: 0xB6A6FF, hex: "#B6A6FF" },
  { id: "finance",        label: "Finance & FP&A",    cosmicName: "The Pulsar",     essence: "Precise rhythm. Relentless accuracy.",               color: 0x6EE7A0, hex: "#6EE7A0" },
  { id: "data-analytics", label: "Data & Analytics",  cosmicName: "The Galaxy",     essence: "Billions of points. One story.",                    color: 0xE8C089, hex: "#E8C089" },
  { id: "coding",         label: "Code & Automation", cosmicName: "The Supernova",  essence: "One burst of energy. Everything changes.",          color: 0x9F8CFF, hex: "#9F8CFF" },
  { id: "creative-ai",    label: "Creative & Design", cosmicName: "The Quasar",     essence: "Brightest object in the observable universe.",       color: 0x5EEAD4, hex: "#5EEAD4" },
  { id: "game-advanced",  label: "Game & Advanced",   cosmicName: "Black Hole",     essence: "Where the rules of physics collapse.",              color: 0xC4A8F0, hex: "#C4A8F0" },
] as const;

// ── Cosmic body factory ────────────────────────────────────────────────────
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
    // 0 — Moon (texture-mapped) ───────────────────────────────────────────
    case 0: {
      const loader   = new THREE.TextureLoader();
      const basePath = "/sintra-ai";
      const diffuse  = loader.load(`${basePath}/moon-texture.png`);
      diffuse.colorSpace = THREE.SRGBColorSpace;
      // Reuse the same texture as a bump map for crater depth
      const bump    = loader.load(`${basePath}/moon-texture.png`);
      const mat = new THREE.MeshPhysicalMaterial({
        map:            diffuse,
        bumpMap:        bump,
        bumpScale:      0.06,
        metalness:      0.0,
        roughness:      0.92,
        clearcoat:      0.0,
      });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.68, 64, 64), mat));
      return { body, mainMat: mat };
    }

    // 1 — Ringed Planet (Saturn) ──────────────────────────────────────────
    case 1: {
      const mat = pbr({ metalness: 0.14, roughness: 0.38 });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.52, 40, 40), mat));
      const ringGeo = new THREE.RingGeometry(0.72, 1.1, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color, side: THREE.DoubleSide, transparent: true, opacity: 0.42,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI * 0.36;
      body.add(ring);
      return { body, mainMat: mat };
    }

    // 2 — Star / Sun ──────────────────────────────────────────────────────
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

    // 3 — Nebula ──────────────────────────────────────────────────────────
    case 3: {
      const mat = pbr({ metalness: 0.0, roughness: 0.72, transparent: true, opacity: 0.72 });
      body.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.46, 1), mat));
      const pos: number[] = [];
      for (let i = 0; i < 320; i++) {
        const r = 0.52 + Math.random() * 0.58;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        pos.push(Math.sin(p)*Math.cos(t)*r, Math.cos(p)*r, Math.sin(p)*Math.sin(t)*r);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      body.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color, size: 0.038, transparent: true, opacity: 0.62 })));
      return { body, mainMat: mat };
    }

    // 4 — Pulsar ──────────────────────────────────────────────────────────
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

    // 5 — Galaxy (spiral) ─────────────────────────────────────────────────
    case 5: {
      const mat = pbr({ metalness: 0.2, roughness: 0.5, emissive: c, emissiveIntensity: 0.22 });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), mat));
      const pos: number[] = [];
      for (let i = 0; i < 520; i++) {
        const t     = i / 520;
        const arm   = i % 2;
        const angle = t * Math.PI * 5 + arm * Math.PI + (Math.random() - 0.5) * 0.52;
        const r     = 0.16 + t * 0.96 + (Math.random() - 0.5) * 0.09;
        pos.push(Math.cos(angle)*r, (Math.random()-0.5)*0.07, Math.sin(angle)*r);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      body.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color, size: 0.021, transparent: true, opacity: 0.9 })));
      return { body, mainMat: mat };
    }

    // 6 — Supernova (spiky) ───────────────────────────────────────────────
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

    // 7 — Quasar (core + disc + jets) ─────────────────────────────────────
    case 7: {
      const mat = pbr({ metalness: 0.0, roughness: 0.08, emissive: c, emissiveIntensity: 0.48 });
      body.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 22, 22), mat));
      const disc = new THREE.Mesh(
        new THREE.TorusGeometry(0.66, 0.13, 10, 80),
        new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: 0.52, metalness: 0.3, roughness: 0.2 }),
      );
      disc.rotation.x = Math.PI * 0.36;
      body.add(disc);
      for (const sign of [1, -1]) {
        const jet = new THREE.Mesh(
          new THREE.ConeGeometry(0.068, 0.74, 6),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.44 }),
        );
        jet.position.y = sign * 0.58;
        if (sign < 0) jet.rotation.z = Math.PI;
        body.add(jet);
      }
      return { body, mainMat: mat };
    }

    // 8 — Black Hole ──────────────────────────────────────────────────────
    case 8: {
      body.add(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x010108 }),
      ));
      let mainMat = new THREE.MeshPhysicalMaterial(); // will be overwritten
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
  const containerRef   = useRef<HTMLDivElement>(null);
  const selectRef      = useRef(onSelect);
  const selectedRef    = useRef(selectedIndex);
  const targetAngleRef = useRef(0);

  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    selectedRef.current    = selectedIndex;
    targetAngleRef.current = -(2 * Math.PI * selectedIndex) / CAROUSEL_ITEMS.length;
  }, [selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let w = container.clientWidth;
    let h = container.clientHeight;
    const N      = CAROUSEL_ITEMS.length;
    const RADIUS = 3.2;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Camera ────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 1.8, 8.8);
    camera.lookAt(0, 0, 0);

    // ── Scene & lighting ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xfff8f0, 0x080d24, 0.45));
    // Strong key: upper-right-front — carves crater shadows on Moon
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(7, 12, 9);
    scene.add(keyLight);
    // Cool fill / rim from behind
    const fillLight = new THREE.DirectionalLight(0x7a88ff, 0.55);
    fillLight.position.set(-6, 3, -9);
    scene.add(fillLight);
    // Secondary warm fill for right-side depth on textured objects
    const warmFill = new THREE.DirectionalLight(0xffddb0, 0.35);
    warmFill.position.set(5, -4, 6);
    scene.add(warmFill);

    // ── Carousel group ────────────────────────────────────────────────
    const carousel = new THREE.Group();
    scene.add(carousel);

    // ── Build cosmic objects ──────────────────────────────────────────
    type Obj = {
      group:   THREE.Group;
      body:    THREE.Group;
      hit:     THREE.Mesh;
      pt:      THREE.PointLight;
      mainMat: THREE.MeshPhysicalMaterial;
    };

    const objects: Obj[] = CAROUSEL_ITEMS.map((item, i) => {
      const angle = (2 * Math.PI * i) / N;
      const g = new THREE.Group();
      g.position.set(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS);

      const { body, mainMat } = makeCosmicBody(i, item.color);
      g.add(body);

      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(1.15, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      g.add(hit);

      const pt = new THREE.PointLight(item.color, 0, 4.5);
      g.add(pt);

      carousel.add(g);
      return { group: g, body, hit, pt, mainMat };
    });

    // ── Animation state ───────────────────────────────────────────────
    let currentAngle = 0;
    const selfAngles = new Array(N).fill(0);

    // ── Hover / click raycasting ──────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();
    let hoveredIdx  = -1;

    const getHitIdx = (e: MouseEvent): number => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(objects.map(o => o.hit));
      return hits.length ? objects.findIndex(o => o.hit === hits[0].object) : -1;
    };

    const onMouseMove = (e: MouseEvent) => {
      hoveredIdx = getHitIdx(e);
      renderer.domElement.style.cursor = hoveredIdx >= 0 ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const idx = getHitIdx(e);
      if (idx >= 0) {
        targetAngleRef.current = -(2 * Math.PI * idx) / N;
        selectRef.current(idx);
      }
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click",     onClick);

    // ── Render loop ───────────────────────────────────────────────────
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      currentAngle += (targetAngleRef.current - currentAngle) * 0.07;
      carousel.rotation.y = currentAngle;

      const sel = selectedRef.current;

      objects.forEach((obj, i) => {
        const worldAngle = (2 * Math.PI * i) / N + currentAngle;
        const norm       = ((worldAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const fromFront  = Math.min(norm, 2 * Math.PI - norm);
        const isFront    = i === sel;
        const isHovered  = hoveredIdx === i && !isFront;

        // Self-rotation (galaxy spins on y, pulsar tilts on x too)
        selfAngles[i] += isFront ? 0.009 : 0.003;
        obj.body.rotation.y = selfAngles[i];
        if (i === 5) obj.body.rotation.y = selfAngles[i] * 0.6; // galaxy: slower y
        if (i === 4) obj.body.rotation.x = selfAngles[i] * 0.4; // pulsar: wobble

        // Scale
        const tScale = isFront ? 1.48 : isHovered ? 1.18 : 1.0;
        obj.group.scale.lerp(new THREE.Vector3(tScale, tScale, tScale), 0.08);

        // Float active item up
        const tY = isFront ? 0.18 : 0;
        obj.group.position.y += (tY - obj.group.position.y) * 0.08;

        // Material emissive pulse
        const tEmissive = isFront ? 0.18 : isHovered ? 0.07 : 0.02;
        obj.mainMat.emissiveIntensity += (tEmissive - obj.mainMat.emissiveIntensity) * 0.1;

        // Opacity (distance fade)
        const tOpacity = isFront ? 1.0 : isHovered ? 0.82 : Math.max(0.28, 1 - fromFront / Math.PI * 1.2);
        obj.mainMat.opacity  = tOpacity;
        obj.mainMat.transparent = true;

        // Point light
        const tIntensity = isFront ? 2.4 : isHovered ? 0.9 : 0;
        obj.pt.intensity += (tIntensity - obj.pt.intensity) * 0.08;
      });

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      w = container.clientWidth; h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────
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
            if (Array.isArray(m)) m.forEach(x => x.dispose()); else (m as THREE.Material).dispose();
          }
        });
        o.hit.geometry.dispose();
        (o.hit.material as THREE.Material).dispose();
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="w-full h-full" aria-hidden="true" />;
}
