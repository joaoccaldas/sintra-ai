import type { ReactNode } from "react";
import styles from "./SintraBrandLockup.module.css";

interface Props {
  compact?: boolean;
  showEndorsement?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Product endorsement, NOT an asserted ownership of sintra.ai domain.
 * Open monochrome wave follows ond.ai's creative direction. Geometry is a
 * recreated study pending legal clearance and approved SVG master.
 */
export default function SintraBrandLockup({
  compact = false, showEndorsement = true, className = "",
}: Props) {
  return (
    <span className={`${styles.lockup} ${compact ? styles.compact : ""} ${className}`}>
      <svg className={styles.wave} viewBox="0 0 80 32" role="img" aria-label="ond.ai open wave"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 19 C 17 20 22 5 35 7 C 48 9 48 25 61 23 C 68 22 73 15 77 16"
          stroke="currentColor" strokeWidth="4.25" strokeLinecap="round"/>
      </svg>
      <span className={styles.names}>
        <span className={styles.product}>sintra<span className={styles.dot}>.</span>ai</span>
        {showEndorsement && <span className={styles.parent}>by <strong>ond.ai</strong></span>}
      </span>
    </span>
  );
}
