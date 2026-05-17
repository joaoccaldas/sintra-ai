"use client";

interface IllustrationProps {
  color: string;
  active: boolean;
}

// Marketing: Megaphone with upward trend line
function Marketing({ color, active }: IllustrationProps) {
  return (
    <>
      <defs>
        <radialGradient id="mkt-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={active ? 0.25 : 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#mkt-glow)" />
      {/* Megaphone body */}
      <polygon points="18,38 18,62 38,56 38,44" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Bell */}
      <path d="M38 42 Q64 28 74 50 Q64 72 38 58 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Sound waves */}
      <path d="M78 42 Q85 50 78 58" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M83 36 Q93 50 83 64" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Trend line */}
      <path d="M16 80 L32 66 L48 72 L72 52" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx="72" cy="52" r="3.5" fill={color} opacity={active ? 1 : 0.7} />
    </>
  );
}

// Engineering: Code terminal with </>
function Engineering({ color, active }: IllustrationProps) {
  return (
    <>
      <defs>
        <radialGradient id="eng-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={active ? 0.22 : 0.08} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#eng-glow)" />
      {/* Monitor */}
      <rect x="10" y="16" width="80" height="56" rx="5" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.8" />
      {/* Screen inner area */}
      <rect x="16" y="22" width="68" height="44" rx="3" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {/* Stand */}
      <path d="M50 72 L50 84 M40 84 L60 84" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* < bracket */}
      <path d="M28 38 L18 50 L28 62" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* > bracket */}
      <path d="M72 38 L82 50 L72 62" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* / slash */}
      <path d="M43 34 L57 66" stroke={color} strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
    </>
  );
}

// Operations: Three-node process pipeline
function Operations({ color, active }: IllustrationProps) {
  return (
    <>
      <defs>
        <radialGradient id="ops-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={active ? 0.22 : 0.08} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#ops-glow)" />
      {/* Top data input */}
      <circle cx="50" cy="20" r="5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.5" />
      <path d="M50 25 L50 37" stroke={color} strokeWidth="1.5" strokeDasharray="2.5 2" strokeLinecap="round" opacity="0.65" />
      {/* Three process boxes */}
      <rect x="5" y="38" width="24" height="18" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.7" />
      <rect x="38" y="38" width="24" height="18" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.7" />
      <rect x="71" y="38" width="24" height="18" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.7" />
      {/* Arrows */}
      <path d="M29 47 L36 47 M34 44 L37 47 L34 50" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 47 L69 47 M67 44 L70 47 L67 50" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      {/* Gear icon in center box */}
      <circle cx="50" cy="47" r="5.5" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="47" r="2" fill={color} opacity="0.9" />
      {/* Bottom output arrow */}
      <path d="M50 56 L50 68 M46 65 L50 69 L54 65" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Output label */}
      <rect x="35" y="70" width="30" height="10" rx="2" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2" opacity="0.7" />
    </>
  );
}

// Research: Magnifying glass with bar chart
function Research({ color, active }: IllustrationProps) {
  return (
    <>
      <defs>
        <radialGradient id="res-glow" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={active ? 0.22 : 0.08} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#res-glow)" />
      {/* Lens circle */}
      <circle cx="42" cy="42" r="28" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="2.2" />
      {/* Handle */}
      <path d="M63 63 L84 84" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Bar chart inside lens */}
      <path d="M28 56 L28 44" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M36 56 L36 34" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <path d="M44 56 L44 40" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      <path d="M52 56 L52 30" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="1" />
      <path d="M26 56 L55 56" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Sparkle dot */}
      <circle cx="78" cy="22" r="2.5" fill={color} opacity="0.6" />
      <path d="M78 16 L78 28 M72 22 L84 22" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </>
  );
}

// Design: Pen nib with bezier curve and color swatches
function Design({ color, active }: IllustrationProps) {
  return (
    <>
      <defs>
        <radialGradient id="des-glow" cx="40%" cy="60%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity={active ? 0.25 : 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#des-glow)" />
      {/* Pen body */}
      <path d="M22 80 L40 24 L58 42 Z" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Pen highlight */}
      <path d="M38 58 L48 28" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      {/* Nib detail */}
      <path d="M22 80 L30 72 L28 60" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bezier curve */}
      <path d="M22 80 C40 58 70 28 84 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      {/* Anchor squares */}
      <rect x="43" y="44" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(45 46.5 47.5)" />
      <rect x="66" y="26" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(45 69.5 29.5)" />
      {/* Color swatches */}
      <circle cx="72" cy="70" r="7" fill={color} opacity="0.75" />
      <circle cx="84" cy="68" r="6" fill={color} opacity="0.4" />
      <circle cx="80" cy="80" r="6" fill={color} opacity="0.55" />
    </>
  );
}

// Leadership: Person with radiating network
function Leadership({ color, active }: IllustrationProps) {
  return (
    <>
      <defs>
        <radialGradient id="lead-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={active ? 0.28 : 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#lead-glow)" />
      {/* Center hub */}
      <circle cx="50" cy="50" r="15" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" />
      {/* Person in center */}
      <circle cx="50" cy="44" r="5.5" fill={color} opacity="0.9" />
      <path d="M39 62 Q50 55 61 62" fill={color} opacity="0.75" />
      {/* Spokes */}
      <line x1="50" y1="35" x2="50" y2="16" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="63" y1="40" x2="78" y2="25" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="65" y1="55" x2="84" y2="64" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="50" y1="65" x2="50" y2="84" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="35" y1="55" x2="16" y2="64" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="37" y1="40" x2="22" y2="25" stroke={color} strokeWidth="1.5" opacity="0.7" />
      {/* Outer nodes */}
      <circle cx="50" cy="12" r="5.5" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
      <circle cx="82" cy="22" r="5" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
      <circle cx="88" cy="66" r="5" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="88" r="5.5" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="66" r="5" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="22" r="5" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
    </>
  );
}

const MAP: Record<string, (p: IllustrationProps) => JSX.Element> = {
  marketing: Marketing,
  engineering: Engineering,
  operations: Operations,
  research: Research,
  design: Design,
  leadership: Leadership,
};

interface Props {
  id: string;
  color: string;
  size?: number;
  active?: boolean;
}

export default function CategoryIllustration({ id, color, size = 96, active = false }: Props) {
  const Component = MAP[id];
  if (!Component) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Component color={color} active={active} />
    </svg>
  );
}
