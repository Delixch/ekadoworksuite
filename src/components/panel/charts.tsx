"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Kutunun genişliğini izler (grafik net çizilsin diye) */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/** Düzgün eğri: Catmull-Rom benzeri, noktalar arası yumuşak geçiş */
function smooth(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

/* ------------------------------- Mini grafik ------------------------------- */

export function Sparkline({ data, color = "var(--c-primary)" }: { data: number[]; color?: string }) {
  const id = useId();
  const w = 120;
  const h = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts: [number, number][] = data.map((v, i) => [(i / (data.length - 1)) * w, h - 4 - ((v - min) / (max - min || 1)) * (h - 8)]);
  const line = smooth(pts);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.32" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} className="panel-fade" />
      <path d={line} pathLength={1} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="panel-draw" />
    </svg>
  );
}

/* ------------------------------- Alan grafiği ------------------------------- */

export interface AreaPoint {
  label: string;
  a: number;
  b: number;
}

export function AreaChart({ data, aName, bName }: { data: AreaPoint[]; aName: string; bName: string }) {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const gid = useId();
  const h = 300;
  const pad = { l: 40, r: 14, t: 16, b: 30 };
  const iw = Math.max(0, width - pad.l - pad.r);
  const ih = h - pad.t - pad.b;
  const maxA = Math.max(...data.map((d) => d.a), 1);
  const niceMax = Math.ceil(maxA / 10) * 10 || 10;
  const maxB = Math.max(...data.map((d) => d.b), 1);
  const x = (i: number) => pad.l + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
  const yA = (v: number) => pad.t + ih - (v / niceMax) * ih;
  const yB = (v: number) => pad.t + ih - (v / (maxB * 1.15)) * ih;
  const ptsA: [number, number][] = data.map((d, i) => [x(i), yA(d.a)]);
  const ptsB: [number, number][] = data.map((d, i) => [x(i), yB(d.b)]);
  const lineA = smooth(ptsA);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(niceMax * t));
  const labelEvery = Math.ceil(data.length / Math.max(2, Math.floor(iw / 64)));

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rel = e.clientX - r.left - pad.l;
    const i = Math.round((rel / (iw || 1)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  return (
    <div ref={ref} className="relative w-full" style={{ height: h }}>
      {width > 0 && (
        <svg width={width} height={h} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="touch-pan-y overflow-visible">
          <defs>
            <linearGradient id={`${gid}a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--c-primary)" stopOpacity="0.34" />
              <stop offset="1" stopColor="var(--c-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={width - pad.r} y1={yA(t)} y2={yA(t)} stroke="var(--c-line)" strokeDasharray="3 5" />
              <text x={pad.l - 10} y={yA(t) + 4} textAnchor="end" fontSize="11" fill="var(--c-muted-soft)">
                {t}
              </text>
            </g>
          ))}
          {data.map((d, i) =>
            i % labelEvery === 0 ? (
              <text key={i} x={x(i)} y={h - 8} textAnchor="middle" fontSize="11" fill="var(--c-muted-soft)">
                {d.label}
              </text>
            ) : null
          )}
          <path d={`${lineA} L${x(data.length - 1)},${pad.t + ih} L${x(0)},${pad.t + ih} Z`} fill={`url(#${gid}a)`} className="panel-fade" />
          <path d={smooth(ptsB)} pathLength={1} fill="none" stroke="var(--c-accent)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1" className="panel-draw" style={{ animationDelay: ".25s" }} />
          <path d={lineA} pathLength={1} fill="none" stroke="var(--c-primary)" strokeWidth="2.8" strokeLinecap="round" className="panel-draw" />
          <g className="panel-fade" style={{ animationDelay: "1.3s" }}>
            <circle cx={x(data.length - 1)} cy={yA(data[data.length - 1].a)} r="5" fill="var(--c-primary)" />
            <circle cx={x(data.length - 1)} cy={yA(data[data.length - 1].a)} r="5" fill="var(--c-primary)" className="era-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
          </g>
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} stroke="var(--c-primary)" strokeOpacity="0.35" />
              <circle cx={x(hover)} cy={yA(data[hover].a)} r="5.5" fill="var(--c-surface)" stroke="var(--c-primary)" strokeWidth="2.5" />
              <circle cx={x(hover)} cy={yB(data[hover].b)} r="4.5" fill="var(--c-surface)" stroke="var(--c-accent)" strokeWidth="2.5" />
            </g>
          )}
        </svg>
      )}
      {hover !== null && width > 0 && (
        <div
          className="pointer-events-none absolute top-2 z-10 min-w-[128px] rounded-(--r-s1) border border-era-cute bg-era-white px-3 py-2 text-[12px] shadow-[0_10px_28px_var(--c-shadow)]"
          style={{ left: Math.min(Math.max(x(hover) - 64, 4), width - 136) }}
        >
          <div className="mb-1 font-bold text-era-black">{data[hover].label}</div>
          <div className="flex items-center gap-1.5 text-era-gray">
            <i className="h-2 w-2 rounded-full bg-era-primary" /> {aName}: <b className="text-era-black">{data[hover].a}</b>
          </div>
          <div className="flex items-center gap-1.5 text-era-gray">
            <i className="h-2 w-2 rounded-full bg-era-accent" /> {bName}: <b className="text-era-black">{data[hover].b}</b>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Halka grafiği ------------------------------- */

export interface DonutPart {
  key: string;
  value: number;
  color: string;
}

export function Donut({ parts, centerTop, centerBottom, active, onActive }: { parts: DonutPart[]; centerTop: string; centerBottom: string; active: string | null; onActive: (k: string | null) => void }) {
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  const r = 70;
  const c = 2 * Math.PI * r;
  const gap = 4;
  const starts = parts.map((_, i) => parts.slice(0, i).reduce((a, p) => a + p.value, 0) / total) ;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px]">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="var(--c-line)" strokeWidth="16" />
        {parts.map((p, i) => {
          const len = Math.max(0, (p.value / total) * c - gap);
          const off = -starts[i] * c;
          const on = active === null || active === p.key;
          return (
            <circle
              key={p.key}
              cx="90"
              cy="90"
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth={active === p.key ? 20 : 16}
              strokeLinecap="round"
              strokeDasharray={`${len} ${c}`}
              strokeDashoffset={off}
              opacity={on ? 1 : 0.28}
              className="cursor-pointer transition-all duration-300"
              style={{ animation: `panel-fade .7s ${0.15 * i}s both` }}
              onPointerEnter={() => onActive(p.key)}
              onPointerLeave={() => onActive(null)}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[30px] leading-none font-extrabold text-era-black tabular-nums">{centerTop}</span>
        <span className="mt-1 text-[12px] font-semibold tracking-wide text-era-gray uppercase">{centerBottom}</span>
      </div>
    </div>
  );
}
