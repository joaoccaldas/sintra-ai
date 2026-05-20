import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05060B",
        abyss: "#090B14",
        night: "#0E1120",
        steel: { DEFAULT: "#161A2C", 2: "#1F2440" },
        hairline: "#2A2F4A",
        violet: { DEFAULT: "#9F8CFF", bright: "#B6A6FF", deep: "#6E5BD9" },
        "cyan-ice": "#8FE3D2",
        "cyan-dim": "#5BB9A8",
        "amber-warm": "#E8C089",
        parchment: "#E9D9B6",
        "rose-pulse": "#F08CA8",
        fg: {
          1: "#F4F2EA",
          2: "#C5C3D6",
          3: "#8B8AA6",
          4: "#5A5A78",
          "on-violet": "#0A0B14",
        },
        diff: {
          beginner: "#F26D6D",
          intermediate: "#F2C46D",
          advanced: "#8FE3D2",
          expert: "#9F8CFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "8px",
        lg: "12px",
        full: "9999px",
      },
      boxShadow: {
        "sh-1": "0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.6)",
        "sh-2": "0 8px 24px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset",
        "sh-3": "0 24px 60px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.05) inset",
        glow: "0 0 0 1px rgba(159,140,255,0.55), 0 0 32px rgba(159,140,255,0.35)",
        "glow-strong": "0 0 0 1px rgba(182,166,255,0.85), 0 0 64px rgba(159,140,255,0.55)",
        "glow-cyan": "0 0 0 1px rgba(143,227,210,0.55), 0 0 32px rgba(143,227,210,0.25)",
      },
      transitionTimingFunction: {
        "ease-out-custom": "cubic-bezier(0.22, 1, 0.36, 1)",
        "ease-std": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        "140": "140ms",
        "240": "240ms",
        "480": "480ms",
      },
      keyframes: {
        "hero-drift": {
          from: { transform: "scale(1.06) translate3d(0,0,0)" },
          to: { transform: "scale(1.12) translate3d(-1.5%,-1%,0)" },
        },
        "cue-pulse": {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.6)", transformOrigin: "top" },
          "50%": { opacity: "1", transform: "scaleY(1)", transformOrigin: "top" },
        },
        "modal-in": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "scrim-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hero-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "hero-drift": "hero-drift 32s cubic-bezier(0.22, 1, 0.36, 1) infinite alternate",
        "cue-pulse": "cue-pulse 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "modal-in": "modal-in 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scrim-in": "scrim-in 240ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-up": "fade-up 480ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "hero-float": "hero-float 7s ease-in-out infinite",
        "ticker": "ticker 44s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
