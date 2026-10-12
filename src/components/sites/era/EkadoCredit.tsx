/**
 * Tasarım künyesi: EkadoWorksuite. Logo, D:\repos\Ekado_V2\site\assets\mail-logo.svg dosyasından alındı;
 * alt bilgi her temada koyu olduğu için koyu çizgiler açık tona çevrildi.
 */
export function EkadoCredit({ label }: { label: string }) {
  return (
    <a
      href="https://www.ekado.ch"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} EkadoWorksuite`}
      className="group/e flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px] text-era-on-dark/55 no-underline transition-colors hover:text-era-on-dark"
    >
      <span>{label}</span>
      <svg viewBox="0 -2 484 84" role="img" aria-hidden className="h-[18px] w-auto">
        <path d="M5 5 H52 L75 28 V75 H5 Z" fill="none" stroke="#e6ebf5" strokeWidth="8" />
        <path d="M52 5 L75 28 H52 Z" fill="#7aa7ff" />
        <g transform="translate(104 0)">
          <path d="M52 4.5 H9 V75.5 H52 M9 40 H44" fill="none" stroke="#e6ebf5" strokeWidth="9" />
          <g transform="translate(68 0)">
            <path d="M9 4.5 V75.5 M51 4 L14 40 L51 76" fill="none" stroke="#7aa7ff" strokeWidth="9" />
          </g>
          <g transform="translate(138 0)">
            <path d="M5 80 L30 4 L55 80" fill="none" stroke="#7aa7ff" strokeWidth="9" />
            <path d="M30 36 L41 68 H19 Z" fill="#7aa7ff" />
          </g>
          <g transform="translate(208 0)">
            <path d="M9 4.5 H26 A33 35.5 0 0 1 26 75.5 H9 Z" fill="none" stroke="#e6ebf5" strokeWidth="9" />
          </g>
          <g transform="translate(284 0)">
            <ellipse cx="30" cy="40" rx="24" ry="35.5" fill="none" stroke="#e6ebf5" strokeWidth="9" />
          </g>
        </g>
      </svg>
      <span className="font-semibold tracking-wide text-era-on-dark/75 transition-colors group-hover/e:text-era-on-dark">Worksuite</span>
    </a>
  );
}
