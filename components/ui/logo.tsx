export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="weblirev logo"
    >
      {/* Icon mark — abstract "W" made of three angled bars */}
      <rect x="2" y="6" width="3" height="20" rx="1.5" fill="white" transform="rotate(-12 2 6)" />
      <rect x="12" y="4" width="3" height="24" rx="1.5" fill="white" />
      <rect x="22" y="6" width="3" height="20" rx="1.5" fill="white" transform="rotate(12 22 6)" />

      {/* Wordmark */}
      <text
        x="38"
        y="22"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="white"
      >
        weblirev
      </text>

      {/* Accent dot */}
      <circle cx="133" cy="22" r="2.5" fill="white" />
    </svg>
  );
}
