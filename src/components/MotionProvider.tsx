"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Makes every framer-motion animation in the tree honor the user's OS
 * "reduce motion" setting. The CSS rule in globals.css already neutralizes
 * CSS animations/transitions, but framer drives transforms in JS, which that
 * rule can't reach — so without this wrapper, reduced-motion users still got
 * all the slide-up/fade-in entrance motion. `reducedMotion="user"` defers to
 * `prefers-reduced-motion`.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
