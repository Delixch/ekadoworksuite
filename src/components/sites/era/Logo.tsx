/**
 * Punn Digital logosu (SVG). Renkler tema dosyasından gelir:
 * --c-logo-from / --c-logo-to (yazı), simge kutusu her iki temada marka mavisi.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="258 310 1176 336"
      role="img"
      aria-label="Punn Digital"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="punn-icon" x1="0" y1="316" x2="0" y2="631" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0a0af0" />
          <stop offset="1" stopColor="#020285" />
        </linearGradient>
        <linearGradient id="punn-word" x1="0" y1="328" x2="0" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--c-logo-from)" }} />
          <stop offset="1" style={{ stopColor: "var(--c-logo-to)" }} />
        </linearGradient>
      </defs>
      <rect x="264" y="316" width="320" height="315" rx="62" fill="url(#punn-icon)" />
      <g fill="none" stroke="#ffffff" strokeWidth="24" strokeLinecap="round">
        <circle cx="425" cy="455" r="71" />
        <path d="M354 455V578" />
      </g>
      <g fill="none" stroke="url(#punn-word)" strokeWidth="38" strokeLinecap="round">
        <path d="M641 347V440A100 100 0 0 0 841 440V347" />
        <path d="M923 538V447A99 99 0 0 1 1121 447V538" />
        <path d="M1209 538V447A98 98 0 0 1 1405 447V538" />
      </g>
      <text
        x="904"
        y="640"
        textLength="524"
        lengthAdjust="spacing"
        fontSize="70"
        fontWeight="700"
        fill="url(#punn-word)"
        style={{ fontFamily: "var(--font-main)" }}
      >
        DIGITAL
      </text>
    </svg>
  );
}
