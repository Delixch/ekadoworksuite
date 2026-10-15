"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/useLocale";
import { soon, type SoonKind } from "@/i18n/soon";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/** Menü başlığının t.nav.links içindeki sırası */
const NAV_INDEX: Record<Exclude<SoonKind, "tech">, number> = { clients: 1, blog: 3 };
const YELLOW = "#f5b301";

/** Teknolojimiz: birbirini döndüren üç dişli */
function Gear({ cx, cy, r, teeth, dir, dur, className }: { cx: number; cy: number; r: number; teeth: number; dir: 1 | -1; dur: number; className: string }) {
  const th = r * 0.28;
  return (
    <g className={dir === 1 ? "era-cons-spin" : "era-cons-spin-r"} style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: `${dur}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" }}>
      {Array.from({ length: teeth }).map((_, i) => (
        <rect key={i} x={cx - th * 0.55} y={cy - r - th * 0.7} width={th * 1.1} height={th * 1.5} rx={2} className={className} transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r={r} className={className} />
      <circle cx={cx} cy={cy} r={r * 0.55} className="fill-era-white" />
      <circle cx={cx} cy={cy} r={r * 0.2} className={className} />
    </g>
  );
}

function TechScene() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-hidden className="h-full w-full">
      <Gear cx={150} cy={132} r={52} teeth={12} dir={1} dur={10} className="fill-era-primary" />
      <Gear cx={246} cy={96} r={36} teeth={9} dir={-1} dur={7.5} className="fill-era-accent" />
      <Gear cx={218} cy={186} r={30} teeth={8} dir={-1} dur={6.2} className="fill-era-dark" />
      {/* devre çizgisi ve yanıp sönen ışıklar */}
      <g className="stroke-era-cute" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M30 230 H110 V212 H190" />
        <path d="M300 60 H340 V120 H370" />
      </g>
      {[[30, 230], [190, 212], [300, 60], [370, 120]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} className="era-cons-blink fill-era-success" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
    </svg>
  );
}

/** Müşterilerimiz: kat kat yükselen bina ve vinç */
function ClientsScene() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-hidden className="h-full w-full">
      <rect x="20" y="226" width="360" height="8" rx="4" className="fill-era-cute" />
      {/* bina: alttan üste 5 kat */}
      {Array.from({ length: 5 }).map((_, n) => {
        const y = 196 - n * 30;
        return (
          <g key={n} className={`era-cons-floor-${n}`}>
            <rect x="96" y={y} width="130" height="30" className={n % 2 ? "fill-era-primary" : "fill-era-dark"} stroke="var(--c-page)" strokeWidth="2" />
            {[0, 1, 2].map((w) => (
              <rect key={w} x={110 + w * 38} y={y + 8} width="20" height="14" rx="2" className="era-cons-blink fill-era-white" style={{ animationDelay: `${(n + w) * 0.3}s` }} />
            ))}
          </g>
        );
      })}
      {/* vinç */}
      <g>
        <rect x="288" y="40" width="10" height="188" fill={YELLOW} />
        <path d="M288 80 L298 80 M288 120 L298 120 M288 160 L298 160" stroke="#1b1b1b" strokeWidth="2" />
        <rect x="150" y="34" width="200" height="8" rx="2" fill={YELLOW} />
        <rect x="338" y="42" width="26" height="22" rx="2" className="fill-era-dark" />
        <path d="M293 34 L240 12 L150 34" fill="none" stroke={YELLOW} strokeWidth="3" />
        <g className="era-cons-hook" style={{ transformOrigin: "186px 42px" }}>
          <line x1="186" y1="42" x2="186" y2="84" stroke="#1b1b1b" strokeWidth="2" />
          <rect x="170" y="84" width="32" height="20" rx="2" className="fill-era-accent" />
        </g>
      </g>
    </svg>
  );
}

/** Blog: sayfaya satır satır yazan kalem */
const LINE_W = [100, 78, 100, 56, 88];
function BlogScene() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-hidden className="h-full w-full">
      <g className="era-cons-float">
        <rect x="120" y="22" width="160" height="216" rx="12" className="fill-era-white stroke-era-cute" strokeWidth="3" />
        <rect x="142" y="44" width="70" height="12" rx="6" className="fill-era-primary" />
        {LINE_W.map((w, n) => (
          <rect key={n} x="142" y={84 + n * 30} width={w} height="8" rx="4" className={`era-cons-line era-cons-line-${n} fill-era-dark`} />
        ))}
        {/* kalem: ucu yazılan satırın sonunda */}
        <g className="era-cons-pencil" style={{ transform: "translate(0,0)" }}>
          <g transform="translate(142 92)">
            <g className="era-cons-wobble">
              <polygon points="0,0 6,-8 -2,-12" fill="#f1c9a0" />
              <rect x="2" y="-40" width="10" height="30" rx="2" transform="rotate(35 2 -10)" fill={YELLOW} />
              <polygon points="0,0 -2,-12 6,-8" className="fill-era-dark" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function ConstructionPage({ kind }: { kind: SoonKind }) {
  const { locale, t } = useLocale();
  const s = soon[locale];
  // Modüler Yapı 2026-10-15'ten beri Modüller menüsünün ilk öğesi
  const title = kind === "tech" ? t.nav.solutionItems[0] : t.nav.links[NAV_INDEX[kind]];

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className="relative bg-[radial-gradient(60%_40%_at_50%_0%,var(--c-sky),transparent)] pt-[130px] pb-24 tab:pt-[110px] mob:pb-14">
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-6 px-[15px] text-center">
          <span className="flex items-center gap-3 rounded-full bg-era-white px-4 py-1.5 text-[13px] font-medium tracking-[0.12em] text-era-black uppercase ring-1 ring-era-line">
            <i aria-hidden className="era-cons-tape block h-3 w-10 rounded-sm" />
            {s.badge}
            <i aria-hidden className="era-cons-tape block h-3 w-10 rounded-sm" />
          </span>
          <h1 className="text-[52px] leading-[1.05] font-semibold tracking-tight text-era-black mob:text-[36px]">{title}</h1>
          <p className="max-w-[520px] text-[18px] leading-[1.55] text-era-gray">{s.lines[kind]}</p>

          <div className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] bg-era-secondary p-4 ring-1 ring-era-line">
            <div className="aspect-[400/260] w-full">
              {kind === "tech" && <TechScene />}
              {kind === "clients" && <ClientsScene />}
              {kind === "blog" && <BlogScene />}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-era-white">
              <div className="era-cons-bar h-full w-full rounded-full bg-era-primary" />
            </div>
            <div aria-hidden className="era-cons-tape absolute inset-x-0 bottom-0 h-2" />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="flex h-12 items-center rounded-(--r-s1) bg-era-coolblue/60 px-6 text-[16px] font-medium text-era-primary-ink no-underline transition hover:-translate-y-0.5 hover:bg-era-coolblue">
              ← {s.back}
            </Link>
            <Link href="/#demo" className="flex h-12 items-center rounded-(--r-s1) bg-era-primary px-6 text-[16px] font-medium text-era-on-dark no-underline transition hover:-translate-y-0.5 hover:brightness-110">
              {s.demo}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
