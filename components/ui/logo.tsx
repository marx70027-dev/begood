interface LogoProps {
  className?: string;
  dark?: boolean;
}

export default function Logo({ className = "", dark = false }: LogoProps) {
  const color = dark ? "#000" : "#fff";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5 15 L27 85 L40 45 L28 15 Z M40 45 L53 85 L65 45 L53 15 L40 45 Z M65 45 L78 85 L95 15 L78 15 Z"
          fill={color}
        />
      </svg>
      <div className="leading-none">
        <div
          className="font-bold tracking-tight text-2xl"
          style={{ color, fontFamily: "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif" }}
        >
          WebliRev
        </div>
        <div
          className="text-[10px] tracking-[0.3em] uppercase mt-1"
          style={{ color: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)" }}
        >
          Web Design Agency
        </div>
      </div>
    </div>
  );
}
