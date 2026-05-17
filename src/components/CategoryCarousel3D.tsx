"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export const CAROUSEL_ITEMS = [
  { id: "quick-wins",     label: "Quick Wins",        essence: "5-min tasks anyone can use today.",              color: 0xF4D06F, hex: "#F4D06F" },
  { id: "productivity",   label: "Productivity",      essence: "Scheduling, notes, planning, automation.",       color: 0x8FE3D2, hex: "#8FE3D2" },
  { id: "writing",        label: "Writing & Copy",    essence: "Long-form, email, social, brand voice.",         color: 0xF08CA8, hex: "#F08CA8" },
  { id: "research",       label: "Research",          essence: "Deep dives, synthesis, competitive intel.",      color: 0xB6A6FF, hex: "#B6A6FF" },
  { id: "finance",        label: "Finance & FP&A",    essence: "Forecasting, modeling, variance, board decks.",  color: 0x6EE7A0, hex: "#6EE7A0" },
  { id: "data-analytics", label: "Data & Analytics",  essence: "BI dashboards, pipelines, insight automation.",  color: 0xE8C089, hex: "#E8C089" },
  { id: "coding",         label: "Code & Automation", essence: "Apps, APIs, scripts, architecture.",             color: 0x9F8CFF, hex: "#9F8CFF" },
  { id: "creative-ai",    label: "Creative & Design", essence: "Image gen, UI/UX, visual direction, branding.",  color: 0x5EEAD4, hex: "#5EEAD4" },
  { id: "game-advanced",  label: "Game & Advanced",   essence: "Game dev, 3D, agents, LLM pipelines.",          color: 0xE9D9B6, hex: "#E9D9B6" },
] as const;

function makeGeo(idx: number): THREE.BufferGeometry {
  switch (idx) {
    case 0: return new THREE.OctahedronGeometry(0.72, 0);              // Quick Wins — sharp gem
    case 1: return new THREE.CylinderGeometry(0.52, 0.68, 0.88, 6, 1); // Productivity — hex disc
    case 2: return new THREE.ConeGeometry(0.58, 1.25, 5, 1);           // Writing — pentagon cone
    case 3: return new THREE.SphereGeometry(0.66, 40, 40);             // Research — perfect orb
    case 4: return new THREE.IcosahedronGeometry(0.68, 0);             // Finance — angular precision
    case 5: return new THREE.BoxGeometry(0.88, 0.88, 0.88);            // Data & Analytics — solid cube
    case 6: return new THREE.TorusKnotGeometry(0.40, 0.15, 120, 14);   // Code — flowing knot
    case 7: return new THREE.TorusGeometry(0.55, 0.22, 16, 48);        // Creative — ring/portal
    case 8: return new THREE.DodecahedronGeometry(0.68);               // Game & Advanced — 12-face gem
    default: return new THREE.SphereGeometry(0.65, 20, 20);
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
  const targetAngleRef = useRef(0);  // ← lives on the component, not in a closure

  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);

  // Update BOTH the selected ref AND the target rotation angle whenever selectedIndex changes
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
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // ── Camera ────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 1.8, 8.8);
    camera.lookAt(0, 0, 0);

    // ── Scene & lighting ──────────────────────────────────────────────
    const scene = new THREE.Scene();

    // Hemisphere: warm sky, cool ground
    scene.add(new THREE.HemisphereLight(0xfff8f0, 0x080d24, 0.45));

    // Key light: white, upper-right-front
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(7, 12, 9);
    scene.add(keyLight);

    // Fill / rim: cool blue-violet from behind
    const fillLight = new THREE.DirectionalLight(0x7a88ff, 0.55);
    fillLight.position.set(-6, 3, -9);
    scene.add(fillLight);

    // ── Carousel group ────────────────────────────────────────────────
    const carousel = new THREE.Group();
    scene.add(carousel);

    // ── Build objects ─────────────────────────────────────────────────
    type Obj = {
      group: THREE.Group;
      mesh:  THREE.Mesh;
      hit:   THREE.Mesh;
      pt:    THREE.PointLight;
      selfAngle: number;
    };

    const objects: Obj[] = CAROUSEL_ITEMS.map((item, i) => {
      const angle = (2 * Math.PI * i) / N;
      const g = new THREE.Group();
      g.position.set(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS);

      const geo = makeGeo(i);

      // Solid PBR material — jewel-like with clearcoat
      const mat = new THREE.MeshPhysicalMaterial({
        color:              item.color,
        metalness:          0.18,
        roughness:          0.14,
        clearcoat:          1.0,
        clearcoatRoughness: 0.06,
        reflectivity:       0.85,
        emissive:           new THREE.Color(item.color),
        emissiveIntensity:  0.04,
      });
      const mesh = new THREE.Mesh(geo, mat);
      g.add(mesh);

      // Invisible hit sphere for raycasting
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      g.add(hit);

      // Per-object accent point light
      const pt = new THREE.PointLight(item.color, 0, 4.5);
      g.add(pt);

      carousel.add(g);
      return { group: g, mesh, hit, pt, selfAngle: 0 };
    });

    // ── Animation state ───────────────────────────────────────────────
    let currentAngle = 0;
    const selfAngles   = new Array(N).fill(0);

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

      // Smooth carousel rotation — uses the ref, not a closure variable
      currentAngle += (targetAngleRef.current - currentAngle) * 0.07;
      carousel.rotation.y = currentAngle;

      const sel = selectedRef.current;

      objects.forEach((obj, i) => {
        const worldAngle = (2 * Math.PI * i) / N + currentAngle;
        const norm       = ((worldAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const fromFront  = Math.min(norm, 2 * Math.PI - norm);
        const isFront    = i === sel;
        const isHovered  = hoveredIdx === i && !isFront;

        // Self-rotation
        selfAngles[i] += isFront ? 0.008 : 0.003;
        obj.mesh.rotation.y = selfAngles[i];
        obj.mesh.rotation.x = selfAngles[i] * 0.3;

        // Scale
        const targetScale = isFront ? 1.48 : isHovered ? 1.18 : 1.0;
        obj.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

        // Float active item up
        const targetY = isFront ? 0.18 : 0;
        obj.group.position.y += (targetY - obj.group.position.y) * 0.08;

        // Material emissive pulse on active
        const mat = obj.mesh.material as THREE.MeshPhysicalMaterial;
        const targetEmissive = isFront ? 0.14 : isHovered ? 0.06 : 0.02;
        mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.1;

        // Opacity (distance fade)
        const targetOpacity = isFront ? 1.0 : isHovered ? 0.82 : Math.max(0.28, 1 - fromFront / Math.PI * 1.2);
        mat.opacity  = targetOpacity;
        mat.transparent = true;

        // Point light intensity
        const targetIntensity = isFront ? 2.2 : isHovered ? 0.9 : 0;
        obj.pt.intensity += (targetIntensity - obj.pt.intensity) * 0.08;
      });

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      w = container.clientWidth;
      h = container.clientHeight;
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
        o.mesh.geometry.dispose();
        (o.mesh.material as THREE.MeshPhysicalMaterial).dispose();
        o.hit.geometry.dispose();
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="w-full h-full" aria-hidden="true" />;
}
