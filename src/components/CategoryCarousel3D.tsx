"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

export const CAROUSEL_ITEMS = [
  { id: "marketing",   label: "Marketing",   essence: "Voice, copy, outreach, growth.", color: 0xF08CA8, hex: "#F08CA8" },
  { id: "engineering", label: "Engineering", essence: "Code review, debugging, migration.", color: 0x8FE3D2, hex: "#8FE3D2" },
  { id: "operations",  label: "Operations",  essence: "Meetings, planning, finance.", color: 0xE8C089, hex: "#E8C089" },
  { id: "research",    label: "Research",    essence: "Papers, synthesis, interviews.", color: 0xB6A6FF, hex: "#B6A6FF" },
  { id: "design",      label: "Design",      essence: "Critique, tokens, audits.", color: 0x9F8CFF, hex: "#9F8CFF" },
  { id: "leadership",  label: "Leadership",  essence: "Memos, strategy, hiring.", color: 0xE9D9B6, hex: "#E9D9B6" },
] as const;

function makeGeo(idx: number): THREE.BufferGeometry {
  switch (idx) {
    case 0: return new THREE.TorusGeometry(0.55, 0.18, 14, 40);
    case 1: return new THREE.OctahedronGeometry(0.72);
    case 2: return new THREE.BoxGeometry(0.94, 0.94, 0.94);
    case 3: return new THREE.IcosahedronGeometry(0.72);
    case 4: return new THREE.TorusKnotGeometry(0.42, 0.16, 80, 10);
    case 5: return new THREE.DodecahedronGeometry(0.68);
    default: return new THREE.SphereGeometry(0.65, 16, 16);
  }
}

interface Props {
  selectedIndex: number;
  onSelect: (idx: number) => void;
}

export default function CategoryCarousel3D({ selectedIndex, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef(onSelect);
  const selectedRef = useRef(selectedIndex);

  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);
  useEffect(() => { selectedRef.current = selectedIndex; }, [selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let w = container.clientWidth;
    let h = container.clientHeight;
    const N = CAROUSEL_ITEMS.length;
    const RADIUS = 3.2;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Camera ────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 1.8, 8.5);
    camera.lookAt(0, 0, 0);

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));

    // ── Carousel group ────────────────────────────────────────────────────────
    const carousel = new THREE.Group();
    scene.add(carousel);

    // ── Build objects ─────────────────────────────────────────────────────────
    type Obj = {
      group: THREE.Group;
      wires: THREE.LineSegments[];
      solid: THREE.Mesh;
      hit: THREE.Mesh;
      pt: THREE.PointLight;
      baseColor: number;
    };

    const objects: Obj[] = CAROUSEL_ITEMS.map((item, i) => {
      const angle = (2 * Math.PI * i) / N;
      const g = new THREE.Group();
      g.position.set(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS);

      // Solid core
      const geo = makeGeo(i);
      const solidMat = new THREE.MeshStandardMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.08,
        wireframe: false,
      });
      const solid = new THREE.Mesh(geo, solidMat);
      g.add(solid);

      // Wireframe layers (bloom imitation)
      const wireLayers = [
        { scale: 1.000, opacity: 0.90, color: item.color },
        { scale: 1.012, opacity: 0.40, color: 0xffffff },
        { scale: 1.030, opacity: 0.15, color: item.color },
      ];
      const wires: THREE.LineSegments[] = wireLayers.map(l => {
        const edges = new THREE.EdgesGeometry(geo);
        const mat = new THREE.LineBasicMaterial({
          color: l.color,
          transparent: true,
          opacity: l.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const ls = new THREE.LineSegments(edges, mat);
        ls.scale.setScalar(l.scale);
        g.add(ls);
        return ls;
      });

      // Invisible hit sphere
      const hitGeo = new THREE.SphereGeometry(1.1, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hit = new THREE.Mesh(hitGeo, hitMat);
      g.add(hit);

      // Point light per object
      const pt = new THREE.PointLight(item.color, 0, 3.5);
      pt.position.set(0, 0, 0);
      g.add(pt);

      carousel.add(g);
      return { group: g, wires, solid, hit, pt, baseColor: item.color };
    });

    // Ground reflection plane
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x090b14, transparent: true, opacity: 0 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.6;
    scene.add(ground);

    // ── Animation state ────────────────────────────────────────────────────────
    let currentAngle = 0;
    let targetAngle = 0;
    let selfAngles = new Array(N).fill(0);

    // ── Hover / click raycasting ───────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredIdx = -1;

    const getHitIdx = (e: MouseEvent): number => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(objects.map(o => o.hit));
      if (!hits.length) return -1;
      return objects.findIndex(o => o.hit === hits[0].object);
    };

    const onMouseMove = (e: MouseEvent) => {
      hoveredIdx = getHitIdx(e);
      renderer.domElement.style.cursor = hoveredIdx >= 0 ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const idx = getHitIdx(e);
      if (idx >= 0) {
        targetAngle = -(2 * Math.PI * idx) / N;
        selectRef.current(idx);
      }
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onClick);

    // ── Render loop ────────────────────────────────────────────────────────────
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Smooth carousel rotation
      currentAngle += (targetAngle - currentAngle) * 0.07;
      carousel.rotation.y = currentAngle;

      const sel = selectedRef.current;

      objects.forEach((obj, i) => {
        // Which index is visually in front right now?
        const worldAngle = (2 * Math.PI * i) / N + currentAngle;
        // Normalize to [-π, π]
        const norm = ((worldAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const fromFront = Math.min(norm, 2 * Math.PI - norm);
        const isFront = i === sel;
        const isHovered = hoveredIdx === i && !isFront;

        // Self-rotation speed
        selfAngles[i] += isFront ? 0.007 : 0.003;
        obj.solid.rotation.y = selfAngles[i];
        obj.wires.forEach(w => { w.rotation.y = selfAngles[i]; });

        // Scale
        const targetScale = isFront ? 1.45 : isHovered ? 1.15 : 1.0;
        obj.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

        // Y position (float active item up slightly)
        const targetY = isFront ? 0.15 : 0;
        obj.group.position.y += (targetY - obj.group.position.y) * 0.08;

        // Opacity
        const targetOpacity = isFront ? 1.0 : isHovered ? 0.75 : Math.max(0.25, 1 - fromFront / Math.PI * 1.2);
        (obj.wires[0].material as THREE.LineBasicMaterial).opacity = targetOpacity * 0.9;
        (obj.solid.material as THREE.MeshStandardMaterial).opacity = targetOpacity * 0.1;

        // Point light intensity
        const targetIntensity = isFront ? 1.8 : isHovered ? 0.7 : 0;
        obj.pt.intensity += (targetIntensity - obj.pt.intensity) * 0.08;
      });

      renderer.render(scene, camera);
    };
    tick();

    // Update target when selectedIndex changes from outside
    const updateTarget = () => {
      targetAngle = -(2 * Math.PI * selectedRef.current) / N;
    };

    // ── Resize ─────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      objects.forEach(o => {
        o.wires.forEach(w => { (w.geometry as THREE.EdgesGeometry).dispose(); });
        (o.solid.geometry as THREE.BufferGeometry).dispose();
        (o.hit.geometry as THREE.SphereGeometry).dispose();
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When selectedIndex changes, update the carousel rotation externally
  useEffect(() => {
    selectedRef.current = selectedIndex;
  }, [selectedIndex]);

  return <div ref={containerRef} className="w-full h-full" aria-hidden="true" />;
}
