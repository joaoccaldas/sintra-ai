"use client";

import { motion } from "framer-motion";
import CategoryIllustration from "./CategoryIllustration";

export const CAROUSEL_ITEMS = [
  { id: "marketing",   label: "Marketing",   essence: "Voice, copy, outreach, growth.", color: 0xF08CA8, hex: "#F08CA8" },
  { id: "engineering", label: "Engineering", essence: "Code review, debugging, migration.", color: 0x8FE3D2, hex: "#8FE3D2" },
  { id: "operations",  label: "Operations",  essence: "Meetings, planning, finance.", color: 0xE8C089, hex: "#E8C089" },
  { id: "research",    label: "Research",    essence: "Papers, synthesis, interviews.", color: 0xB6A6FF, hex: "#B6A6FF" },
  { id: "design",      label: "Design",      essence: "Critique, tokens, audits.", color: 0x9F8CFF, hex: "#9F8CFF" },
  { id: "leadership",  label: "Leadership",  essence: "Memos, strategy, hiring.", color: 0xE9D9B6, hex: "#E9D9B6" },
] as const;

interface Props {
  selectedIndex: number;
  onSelect: (idx: number) => void;
}

// Compute shortest-path offset in a ring of N items
function ringOffset(i: number, selected: number, N: number): number {
  let d = i - selected;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

export default function CategoryCarousel3D({ selectedIndex, onSelect }: Props) {
  const N = CAROUSEL_ITEMS.length;

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{ perspective: "900px" }}
    >
      {/* Fixed-height track so items have a stable centre */}
      <div className="relative flex items-center justify-center w-full" style={{ height: "100%" }}>
        {CAROUSEL_ITEMS.map((item, i) => {
          const offset = ringOffset(i, selectedIndex, N);
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const visible = abs <= 2;

          // Translate, rotate, scale, opacity based on offset
          const x = offset * 185;
          const rotateY = offset * -42;
          const scale = isActive ? 1 : abs === 1 ? 0.72 : 0.52;
          const opacity = isActive ? 1 : abs === 1 ? 0.62 : 0.3;
          const zIndex = 20 - abs * 6;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSelect(i)}
              aria-label={`Select ${item.label}`}
              initial={false}
              animate={{ x, rotateY, scale, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 300, damping: 34, opacity: { duration: 0.18 } }}
              style={{
                position: "absolute",
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                pointerEvents: visible ? "auto" : "none",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <CarouselCard item={item} isActive={isActive} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

type Item = (typeof CAROUSEL_ITEMS)[number];

function CarouselCard({ item, isActive }: { item: Item; isActive: boolean }) {
  return (
    <div
      className="relative flex flex-col items-center select-none"
      style={{ width: "clamp(148px, 20vw, 210px)" }}
    >
      {/* Glass card backing */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${item.hex}1a 0%, transparent 70%)`,
          border: `1px solid ${item.hex}${isActive ? "40" : "1c"}`,
          boxShadow: isActive
            ? `0 0 48px ${item.hex}28, 0 0 16px ${item.hex}18, inset 0 1px 0 ${item.hex}22`
            : "none",
        }}
      />

      {/* Illustration */}
      <div
        className="relative z-10 mt-7"
        style={{
          filter: isActive ? `drop-shadow(0 0 18px ${item.hex}60)` : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <CategoryIllustration
          id={item.id}
          color={item.hex}
          size={isActive ? 92 : 68}
          active={isActive}
        />
      </div>

      {/* Category name */}
      <span
        className="relative z-10 mt-4 mb-6 font-serif tracking-[-0.01em] transition-colors duration-200"
        style={{
          fontSize: isActive ? "clamp(16px,2vw,20px)" : "clamp(13px,1.6vw,16px)",
          color: isActive ? item.hex : "rgba(244,242,234,0.5)",
        }}
      >
        {item.label}
      </span>
    </div>
  );
}
