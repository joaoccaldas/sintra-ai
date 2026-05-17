import React from "react";
import type { OutputKind } from "@/lib/data";

const DIFF_ACCENT: Record<string, string> = {
  beginner:     "#F26D6D",
  intermediate: "#F2C46D",
  advanced:     "#8FE3D2",
  expert:       "#9F8CFF",
};

interface Props {
  kind: OutputKind;
  difficulty: string;
}

export default function CardVisual({ kind, difficulty }: Props) {
  const id = React.useId().replace(/:/g, "");
  const a = DIFF_ACCENT[difficulty] || "#9F8CFF";

  switch (kind) {
    case "analysis":
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            {[7, 14, 10, 22, 16, 30, 18, 26, 20, 34, 22, 28].map((h, i) => (
              <rect
                key={i} x={i * 10 + 2} y={44 - h} width="7" height={h} rx="1"
                fill={i === 10 ? a : `rgba(159,140,255,${0.10 + i * 0.02})`}
              />
            ))}
            <line x1="0" y1="43.5" x2="120" y2="43.5" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </svg>
        </div>
      );

    case "code":
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            <rect x="4"  y="5"  width="26" height="3.5" rx="1.75" fill={a} opacity="0.7" />
            <rect x="4"  y="13" width="52" height="3.5" rx="1.75" fill="rgba(143,227,210,0.45)" />
            <rect x="14" y="21" width="42" height="3.5" rx="1.75" fill="rgba(143,227,210,0.28)" />
            <rect x="14" y="29" width="34" height="3.5" rx="1.75" fill="rgba(143,227,210,0.22)" />
            <rect x="4"  y="37" width="20" height="3.5" rx="1.75" fill="rgba(255,255,255,0.08)" />
            <rect x="62" y="13" width="14" height="3.5" rx="1.75" fill={a} opacity="0.5" />
            <rect x="56" y="21" width="20" height="3.5" rx="1.75" fill="rgba(232,192,137,0.35)" />
          </svg>
        </div>
      );

    case "visual":
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id={`vg-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={a} stopOpacity="0.28" />
                <stop offset="100%" stopColor={a} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 38 L16 30 L32 22 L48 26 L64 14 L80 18 L96 10 L112 13 L120 9 L120 44 L0 44 Z"
              fill={`url(#vg-${id})`}
            />
            <polyline
              points="0,38 16,30 32,22 48,26 64,14 80,18 96,10 112,13 120,9"
              stroke={a} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" fill="none"
            />
            <circle cx="64" cy="14" r="3" fill={a} />
            <circle cx="64" cy="14" r="5.5" fill={a} opacity="0.18" />
          </svg>
        </div>
      );

    case "spec":
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            <rect x="4"  y="16" width="20" height="12" rx="2" stroke="rgba(159,140,255,0.4)" strokeWidth="1" fill="rgba(159,140,255,0.06)" />
            <rect x="50" y="6"  width="20" height="12" rx="2" stroke={a} strokeWidth="1" fill={`${a}30`} />
            <rect x="50" y="26" width="20" height="12" rx="2" stroke="rgba(159,140,255,0.4)" strokeWidth="1" fill="rgba(159,140,255,0.06)" />
            <rect x="96" y="16" width="20" height="12" rx="2" stroke="rgba(143,227,210,0.4)" strokeWidth="1" fill="rgba(143,227,210,0.05)" />
            <path d="M24 22 L50 12" stroke="rgba(159,140,255,0.35)" strokeWidth="1" />
            <path d="M24 22 L50 32" stroke="rgba(159,140,255,0.35)" strokeWidth="1" />
            <path d="M70 12 L96 22" stroke="rgba(143,227,210,0.25)" strokeWidth="1" />
            <path d="M70 32 L96 22" stroke="rgba(143,227,210,0.25)" strokeWidth="1" />
          </svg>
        </div>
      );

    case "templates":
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            <rect x="34" y="18" width="74" height="24" rx="2" fill="rgba(159,140,255,0.03)" stroke="rgba(159,140,255,0.15)" strokeWidth="1" />
            <rect x="24" y="11" width="74" height="24" rx="2" fill="rgba(159,140,255,0.05)" stroke="rgba(159,140,255,0.25)" strokeWidth="1" />
            <rect x="14" y="4"  width="74" height="24" rx="2" fill="rgba(159,140,255,0.07)" stroke={a} strokeWidth="1" opacity="0.85" />
            <line x1="22" y1="13" x2="64" y2="13" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <line x1="22" y1="19" x2="56" y2="19" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="22" y1="25" x2="60" y2="25" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </svg>
        </div>
      );

    case "table":
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            <rect x="4" y="4" width="112" height="36" rx="2" stroke="rgba(159,140,255,0.2)" strokeWidth="1" fill="none" />
            <rect x="4" y="4" width="112" height="10" rx="2" fill="rgba(159,140,255,0.08)" />
            <line x1="4"   y1="14" x2="116" y2="14" stroke={a} strokeWidth="0.75" opacity="0.5" />
            <line x1="4"   y1="23" x2="116" y2="23" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="4"   y1="32" x2="116" y2="32" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="42"  y1="4"  x2="42"  y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="80"  y1="4"  x2="80"  y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <rect x="8" y="7"  width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
            <rect x="46" y="7" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.13)" />
            <rect x="84" y="7" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.13)" />
          </svg>
        </div>
      );

    case "deck":
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            <rect x="4"  y="4"  width="90" height="36" rx="2" fill="rgba(159,140,255,0.06)" stroke={a} strokeWidth="1" opacity="0.8" />
            <rect x="10" y="10" width="44" height="5" rx="1.5" fill="rgba(255,255,255,0.25)" />
            <rect x="10" y="20" width="32" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
            <rect x="10" y="27" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)" />
            <rect x="10" y="34" width="26" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
            <rect x="98" y="4"  width="18" height="12" rx="1" fill="rgba(159,140,255,0.15)" stroke="rgba(159,140,255,0.3)"  strokeWidth="0.75" />
            <rect x="98" y="18" width="18" height="12" rx="1" fill="rgba(159,140,255,0.08)" stroke="rgba(159,140,255,0.18)" strokeWidth="0.75" />
            <rect x="98" y="32" width="18" height="8"  rx="1" fill="rgba(159,140,255,0.05)" stroke="rgba(159,140,255,0.12)" strokeWidth="0.75" />
          </svg>
        </div>
      );

    case "plan":
    default:
      return (
        <div className="card-visual">
          <svg viewBox="0 0 120 44" fill="none" aria-hidden="true">
            <line x1="6" y1="22" x2="114" y2="22" stroke="rgba(159,140,255,0.2)" strokeWidth="1" />
            {[16, 36, 60, 84, 104].map((cx, i) => (
              <g key={i}>
                {i === 2 && <circle cx={cx} cy={22} r={9} fill={a} opacity="0.12" />}
                <circle cx={cx} cy={22} r={i === 2 ? 5 : 3.5} fill={i === 2 ? a : "rgba(159,140,255,0.35)"} />
                <rect
                  x={cx - 12} y={i % 2 === 0 ? 5 : 29}
                  width={[22, 26, 30, 20, 16][i]} height={6} rx="1.5"
                  fill={`rgba(159,140,255,${0.05 + i * 0.025})`}
                  stroke={`rgba(159,140,255,${0.10 + i * 0.04})`}
                  strokeWidth="0.75"
                />
              </g>
            ))}
          </svg>
        </div>
      );
  }
}
