/**
 * Ekado logosu (SVG), D:\repos\Ekado_V2\site\assets\mail-logo.svg dosyasından alındı.
 * Renkler tema dosyasından gelir: --c-logo-ink (koyu çizgiler), --c-logo-accent (mavi çizgiler).
 * Koyu zeminde onDark ile açık tonlara döner.
 */
export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  const ink = { stroke: "var(--c-logo-ink)" };
  const accent = { stroke: "var(--c-logo-accent)" };
  return (
    <svg
      viewBox="0 -2 484 84"
      role="img"
      aria-label="Ekado"
      className={`overflow-visible ${onDark ? "logo-on-dark" : ""} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* simge adım adım döner (globals.css era-logo-spin) */}
      <g className="era-logo-spin">
        <path d="M5 5 H52 L75 28 V75 H5 Z" fill="none" style={ink} strokeWidth="8" />
        <path d="M52 5 L75 28 H52 Z" style={{ fill: "var(--c-logo-accent)" }} />
      </g>
      <g transform="translate(104 0)">
        <path d="M52 4.5 H9 V75.5 H52 M9 40 H44" fill="none" style={ink} strokeWidth="9" />
        <g transform="translate(68 0)">
          <path d="M9 4.5 V75.5 M51 4 L14 40 L51 76" fill="none" style={accent} strokeWidth="9" />
        </g>
        <g transform="translate(138 0)">
          <path d="M5 80 L30 4 L55 80" fill="none" style={accent} strokeWidth="9" />
          <path d="M30 36 L41 68 H19 Z" style={{ fill: "var(--c-logo-accent)" }} />
        </g>
        <g transform="translate(208 0)">
          <path d="M9 4.5 H26 A33 35.5 0 0 1 26 75.5 H9 Z" fill="none" style={ink} strokeWidth="9" />
        </g>
        <g transform="translate(284 0)">
          <ellipse cx="30" cy="40" rx="24" ry="35.5" fill="none" style={ink} strokeWidth="9" />
        </g>
      </g>
    </svg>
  );
}
