interface Props {
  size?: number;
  className?: string;
}

export default function TesseractMark({ size = 20, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="6"  y="14" width="36" height="36" />
      <rect x="22" y="6"  width="36" height="36" />
      <line x1="6"  y1="14" x2="22" y2="6"  />
      <line x1="42" y1="14" x2="58" y2="6"  />
      <line x1="6"  y1="50" x2="22" y2="42" />
      <line x1="42" y1="50" x2="58" y2="42" />
    </svg>
  );
}
