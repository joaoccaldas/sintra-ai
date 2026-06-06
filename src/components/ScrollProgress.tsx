"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const el = barRef.current;
      if (!el) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(scrolled / total, 1) : 0;
      el.style.width = `${pct * 100}%`;
      el.style.opacity = scrolled > 40 ? "1" : "0";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      aria-hidden="true"
      style={{ width: "0%", opacity: 0 }}
    />
  );
}
