"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

type DiveFn = () => void;

interface Props {
  onDive?: (fn: DiveFn) => void;
}

export default function Tesseract3D({ onDive }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diveRef = useRef<DiveFn>(() => {});
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

    // 4D vertices: corners of the unit tesseract
    const V4: number[][] = [];
    for (let x = -1; x <= 1; x += 2)
      for (let y = -1; y <= 1; y += 2)
        for (let z = -1; z <= 1; z += 2)
          for (let w4 = -1; w4 <= 1; w4 += 2)
            V4.push([x, y, z, w4]);

    // 32 edges: pairs differing in exactly one coordinate
    const EDGES: [number, number][] = [];
    for (let i = 0; i < 16; i++)
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) if (V4[i][k] !== V4[j][k]) diff++;
        if (diff === 1) EDGES.push([i, j]);
      }

    const makeLines = (color: number, opacity: number, scale: number) => {
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
      return { geo, mat, lines, positions };
    };

    const core  = makeLines(0xF4F2EA, 0.95, 1.000);
    const glow1 = makeLines(0xB6A6FF, 0.55, 1.006);
    const glow2 = makeLines(0x6E5BD9, 0.22, 1.020);
    const group = new THREE.Group();
    group.add(glow2.lines, glow1.lines, core.lines);
    scene.add(group);

    // Vertex points
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(16 * 3), 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xB6A6FF,
      size: 0.10,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // Distant starfield
    const starCount = 1200;
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
      const rect = container.getBoundingClientRect();
      tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      tmy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const dive = { active: false, t: 0, dur: 1100, startZ: 7.2, endZ: -2.5 };
    diveRef.current = () => {
      if (dive.active) return;
      dive.active = true;
      dive.t = performance.now();
    };

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const theta = elapsed * 0.22;
      const phi   = elapsed * 0.16;

      const projected = V4.map(v => project(rotate4D(v, theta, phi)));

      const pArr = points.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 16; i++) {
        pArr[i * 3]     = projected[i][0];
        pArr[i * 3 + 1] = projected[i][1];
        pArr[i * 3 + 2] = projected[i][2];
      }
      points.geometry.attributes.position.needsUpdate = true;

      const arr = core.positions;
      for (let i = 0; i < EDGES.length; i++) {
        const [a, b] = EDGES[i];
        arr[i * 6]     = projected[a][0];
        arr[i * 6 + 1] = projected[a][1];
        arr[i * 6 + 2] = projected[a][2];
        arr[i * 6 + 3] = projected[b][0];
        arr[i * 6 + 4] = projected[b][1];
        arr[i * 6 + 5] = projected[b][2];
      }
      glow1.positions.set(arr);
      glow2.positions.set(arr);
      core.geo.attributes.position.needsUpdate = true;
      glow1.geo.attributes.position.needsUpdate = true;
      glow2.geo.attributes.position.needsUpdate = true;

      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      group.rotation.y = mx * 0.32;
      group.rotation.x = -my * 0.22;
      group.position.y = Math.sin(elapsed * 0.6) * 0.06;

      stars.rotation.y = elapsed * 0.012;
      stars.rotation.x = elapsed * 0.006;

      if (dive.active) {
        const k = Math.min(1, (now - dive.t) / dive.dur);
        const e = 1 - Math.pow(1 - k, 3);
        camera.position.z = dive.startZ + (dive.endZ - dive.startZ) * e;
        const s = 1 + e * 4;
        group.scale.setScalar(s);
        core.mat.opacity  = 0.95 * (1 - e * 0.85);
        glow1.mat.opacity = 0.55 * (1 - e * 0.85);
        glow2.mat.opacity = 0.22 * (1 - e * 0.85);
        pMat.opacity      = 0.95 * (1 - e * 0.85);
        if (k >= 1) dive.active = false;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
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
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      core.geo.dispose(); glow1.geo.dispose(); glow2.geo.dispose();
      pGeo.dispose(); sGeo.dispose();
      core.mat.dispose(); glow1.mat.dispose(); glow2.mat.dispose();
      pMat.dispose(); stars.material.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (onDive && ready) onDive(() => diveRef.current());
  }, [onDive, ready]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
    />
  );
}
