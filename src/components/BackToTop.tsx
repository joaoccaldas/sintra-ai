"use client";

import { ArrowUp } from "lucide-react";
import { useScroll } from "@/lib/hooks";

export default function BackToTop() {
  const y = useScroll();
  const visible = y > 800;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={[
        "fixed bottom-6 right-6 z-40",
        "w-11 h-11 rounded-full bg-steel/90 backdrop-blur border border-hairline",
        "flex items-center justify-center text-fg-2",
        "transition-all duration-240 ease-out-custom",
        "hover:border-violet hover:text-violet-bright hover:shadow-glow",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp size={18} />
    </button>
  );
}
