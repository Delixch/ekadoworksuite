"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { modular, type ShowBusiness } from "@/i18n/modular";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ForWhom, ModuleGrid, useBuilder } from "./builder/ModuleBuilder";
import { landing } from "@/i18n/landing";

type Box = { x: number; y: number; w: number; h: number };
type Layout = { W: number; H: number; biz: Box[]; core: Box; mods: Box[]; goal: Box; font: number; narrow: boolean };

const TICK_MS = 950;

function layout(narrow: boolean, modCount: number): Layout {
  if (!narrow) {
    const mh = 70;
    const gap = 18;
    const total = modCount * mh + (modCount - 1) * gap;
    const y0 = 270 - total / 2;
    return {
      W: 1200,
      H: 540,
      narrow,
      font: 19,
      biz: [0, 1, 2, 3].map((i) => ({ x: 20, y: 56 + i * 112, w: 232, h: 86 })),
      core: { x: 350, y: 135, w: 250, h: 270 },
      mods: Array.from({ length: modCount }, (_, i) => ({ x: 690, y: y0 + i * (mh + gap), w: 232, h: mh })),
      goal: { x: 975, y: 180, w: 215, h: 180 },
    };
  }
  return {
    W: 420,
    H: 900,
    narrow,
    font: 13.5,
    biz: [0, 1, 2, 3].map((i) => ({ x: 6 + i * 104, y: 10, w: 98, h: 70 })),
    core: { x: 60, y: 175, w: 300, h: 220 },
    mods: Array.from({ length: modCount }, (_, i) => ({ x: i % 2 ? 218 : 12, y: 490 + Math.floor(i / 2) * 82, w: 190, h: 68 })),
    goal: { x: 90, y: 730, w: 240, h: 130 },
  };
}

/** İki kutu arasında eğri çizgi; dar düzende dikey, geniş düzende yatay çıkar */
function link(a: Box, b: Box, narrow: boolean) {
  if (narrow) {
    const x1 = a.x + a.w / 2;
    const y1 = a.y + a.h;
    const x2 = b.x + b.w / 2;
    const y2 = b.y;
    const d = (y2 - y1) / 2;
    return `M${x1} ${y1} C${x1} ${y1 + d} ${x2} ${y2 - d} ${x2} ${y2}`;
  }
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const d = (x2 - x1) / 2;
  return `M${x1} ${y1} C${x1 + d} ${y1} ${x2 - d} ${y2} ${x2} ${y2}`;
}

function Label({ box, text, size, className, dy = 0 }: { box: Box; text: string; size: number; className: string; dy?: number }) {
  let lines = [text];
  if (text.includes(" · ")) lines = text.split(" · ");
  else if (text.length > 14 && text.includes(" ")) {
    const mid = text.length / 2;
    const cut = [...text].reduce((best, ch, i) => (ch === " " && Math.abs(i - mid) < Math.abs(best - mid) ? i : best), -100);
    lines = [text.slice(0, cut), text.slice(cut + 1)];
  }
  const lh = size * 1.25;
  const top = box.y + box.h / 2 - ((lines.length - 1) * lh) / 2 + dy;
  return (
    <text textAnchor="middle" dominantBaseline="central" fontSize={size} fontWeight={700} className={className} style={{ fontFamily: "var(--font-main)" }}>
      {lines.map((l, i) => (
        <tspan key={l} x={box.x + box.w / 2} y={top + i * lh}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(max-width: 700px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useNarrow = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(max-width: 700px)").matches,
    () => false,
  );

/**
 * Gösteri: çekirdek ortada durur. Sırayla her branş seçilir, modülleri çizgilerle çekirdeğe takılır
 * ve hepsi aynı ortak amaca bağlanır. Sonra sıradaki branşa geçer.
 */
function Show() {
  const { locale } = useLocale();
  const m = modular[locale];
  const narrow = useNarrow();
  const [biz, setBiz] = useState(0);
  const [phase, setPhase] = useState(0);

  const active: ShowBusiness = m.businesses[biz];
  const count = active.modules.length;
  const L = layout(narrow, count);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => {
        if (p >= count + 2) {
          setBiz((b) => (b + 1) % m.businesses.length);
          return 0;
        }
        return p + 1;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [count, m.businesses.length]);

  const step = phase === 0 ? 1 : phase <= count ? 2 : 3;
  const goalOn = phase > count;

  const pathStyle = (on: boolean, delay = 0) => ({
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    transition: `stroke-dashoffset 700ms ease ${delay}ms, opacity 400ms`,
    opacity: on ? 1 : 0,
  });

  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-[15px]">
      <ol className="flex flex-wrap items-center justify-start gap-2 mob:gap-1.5" aria-label="Steps">
        {m.steps.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-[16px] font-semibold transition-colors duration-500 mob:px-3 mob:py-1.5 mob:text-[12px] ${
              i <= step ? "bg-era-primary text-era-on-dark" : "bg-era-secondary text-era-gray"
            }`}
          >
            <span className="opacity-80">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <svg viewBox={`0 0 ${L.W} ${L.H}`} role="img" aria-label={`${m.core.name}: ${m.goal.text}`} className="mx-auto h-auto w-full" style={{ maxWidth: narrow ? 460 : 1200 }}>
        {/* çizgiler */}
        <path d={link(L.biz[biz], L.core, narrow)} pathLength={1} fill="none" strokeWidth={narrow ? 3 : 3.5} strokeLinecap="round" className="stroke-era-primary" style={pathStyle(true)} />
        {active.modules.map((mod, j) => {
          const on = phase > j;
          return (
            <g key={`${biz}-${mod.name}`}>
              <path d={link(L.core, L.mods[j], narrow)} pathLength={1} fill="none" strokeWidth={narrow ? 2.5 : 3} strokeLinecap="round" className="stroke-era-accent" style={pathStyle(on)} />
              <path d={link(L.mods[j], L.goal, narrow)} pathLength={1} fill="none" strokeWidth={narrow ? 2.5 : 3} strokeLinecap="round" strokeDasharray="1" className="stroke-era-gray/60" style={{ ...pathStyle(goalOn, j * 120), strokeDasharray: 1 }} />
            </g>
          );
        })}

        {/* branşlar */}
        {m.businesses.map((b, i) => {
          const on = i === biz;
          return (
            <g key={b.name} style={{ transition: "opacity 500ms", opacity: on ? 1 : 0.6 }}>
              <rect
                x={L.biz[i].x}
                y={L.biz[i].y}
                width={L.biz[i].w}
                height={L.biz[i].h}
                rx={14}
                strokeWidth={2}
                strokeDasharray={b.request ? "6 5" : undefined}
                className={`transition-colors duration-500 ${on ? "fill-era-primary stroke-era-primary" : "fill-era-white stroke-era-cute"}`}
              />
              <Label box={L.biz[i]} text={b.name} size={L.font - (narrow ? 1.5 : 1)} className={on ? "fill-era-on-dark" : "fill-era-gray"} />
            </g>
          );
        })}

        {/* çekirdek */}
        <g>
          <rect x={L.core.x} y={L.core.y} width={L.core.w} height={L.core.h} rx={22} strokeWidth={2.5} className="fill-era-white stroke-era-accent" />
          <text x={L.core.x + L.core.w / 2} y={L.core.y + 40} textAnchor="middle" fontSize={L.font + 3} fontWeight={800} className="fill-era-black" style={{ fontFamily: "var(--font-main)" }}>
            {m.core.name}
          </text>
          {m.core.items.map((it, i) => (
            <g key={it}>
              <rect x={L.core.x + 24} y={L.core.y + 70 + i * (narrow ? 46 : 62)} width={L.core.w - 48} height={narrow ? 36 : 48} rx={10} className="fill-era-secondary" />
              <text x={L.core.x + L.core.w / 2} y={L.core.y + 70 + i * (narrow ? 46 : 62) + (narrow ? 18 : 24)} textAnchor="middle" dominantBaseline="central" fontSize={L.font - 2} fontWeight={600} className="fill-era-black" style={{ fontFamily: "var(--font-main)" }}>
                {it}
              </text>
            </g>
          ))}
        </g>

        {/* modüller */}
        {active.modules.map((mod, j) => {
          const on = phase > j;
          const b = L.mods[j];
          return (
            <g key={`${biz}-m-${mod.name}`} style={{ transition: "opacity 450ms, transform 450ms", opacity: on ? 1 : 0, transform: on ? "none" : "translateX(14px)" }}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={14} strokeWidth={2} strokeDasharray={mod.request ? "6 5" : undefined} className={mod.request ? "fill-era-secondary stroke-era-gray" : "fill-era-white stroke-era-primary"} />
              <Label box={b} text={mod.name} size={L.font - 1} dy={mod.request ? -7 : 0} className="fill-era-black" />
              {mod.request && (
                <text x={b.x + b.w / 2} y={b.y + b.h - 17} textAnchor="middle" fontSize={L.font - 6} fontWeight={600} letterSpacing="0.06em" className="fill-era-primary-ink" style={{ fontFamily: "var(--font-main)" }}>
                  {m.requestBadge.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* ortak amaç */}
        <g>
          <rect
            x={L.goal.x}
            y={L.goal.y}
            width={L.goal.w}
            height={L.goal.h}
            rx={26}
            strokeWidth={2.5}
            className={`transition-all duration-700 ${goalOn ? "fill-era-primary stroke-era-primary" : "fill-era-secondary stroke-era-cute"}`}
            style={{ filter: goalOn ? "drop-shadow(0 0 18px var(--c-primary))" : "none" }}
          />
          <text x={L.goal.x + L.goal.w / 2} y={L.goal.y + L.goal.h * 0.3} textAnchor="middle" fontSize={L.font - 5} fontWeight={700} letterSpacing="0.12em" className={goalOn ? "fill-era-on-dark" : "fill-era-gray"} style={{ fontFamily: "var(--font-main)" }}>
            {m.goal.label.toUpperCase()}
          </text>
          <Label box={{ ...L.goal, y: L.goal.y + 22 }} text={m.goal.text} size={L.font + (narrow ? 1 : 0)} className={goalOn ? "fill-era-on-dark" : "fill-era-black"} />
        </g>
      </svg>

      <p className="max-w-[780px] text-left text-[16px] leading-[1.55] text-era-gray">{m.note}</p>
    </div>
  );
}

export function ModularPage() {
  const { locale } = useLocale();
  const m = modular[locale];
  const lb = landing[locale].b;
  const bld = useBuilder();

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <section className="relative bg-[radial-gradient(60%_40%_at_50%_0%,var(--c-sky),transparent)] pt-[112px] pb-[80px] text-era-black tab:pt-[96px] tab:pb-14">
          <div className="mx-auto mb-10 flex w-full max-w-[1240px] flex-col items-start gap-5 px-[15px] text-left">
            <span className="flex items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[14px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {m.eyebrow}
            </span>
            <h1 className="text-[clamp(2.7rem,5.8vw,5rem)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance text-era-black">{m.heading}</h1>
            <p className="max-w-[780px] text-[clamp(1.2rem,1.9vw,1.5rem)] leading-[1.55] text-era-gray">{m.lead}</p>
          </div>
          <Show />
        </section>

        {/* Programını kur: bölümleri aç/kapa + kimin için (ortak bileşen; ana sayfa taslağı B ile aynı) */}
        <section id="kur" className="relative scroll-mt-[90px] py-[60px] tab:py-[44px]">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-center gap-12 px-[15px] tab:grid-cols-1 tab:gap-8">
            <div className="flex flex-col items-start gap-4 text-left">
              <h2 className="text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-era-black">{lb.h1}</h2>
              <p className="max-w-[480px] text-[18px] leading-[1.55] text-era-gray">{lb.lead}</p>
            </div>
            <ModuleGrid b={bld} compact />
          </div>
          <div className="mx-auto mt-14 flex w-full max-w-[1240px] flex-col gap-6 px-[15px]">
            <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-[-0.02em] text-era-black">{lb.forTitle}</h3>
            <ForWhom b={bld} compact onPick={() => document.getElementById("kur")?.scrollIntoView({ behavior: "smooth" })} />
          </div>
        </section>

        <section className="relative py-[70px] tab:py-[50px] mob:py-10">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start gap-5 px-[15px] text-left">
            <h2 className="text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-era-black">{m.customHeading}</h2>
            <p className="max-w-[720px] text-[19px] leading-[1.55] text-era-gray">{m.customText}</p>
            <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
              <a
                href="#hizli-demo"
                className="flex h-14 items-center gap-3 rounded-(--r-s1) bg-era-primary px-8 text-[18px] font-semibold text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                {m.ctaPrimary} <ArrowRight size={20} />
              </a>
              <Link
                href="/#bize-ulasin"
                className="flex h-14 items-center rounded-(--r-s1) border-2 border-era-black px-8 text-[18px] font-semibold text-era-black no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-era-secondary"
              >
                {m.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
