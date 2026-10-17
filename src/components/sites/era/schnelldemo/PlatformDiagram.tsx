"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import type { SchnellDemoText } from "@/i18n/schnelldemo";

/**
 * Platform diyagramı (Ekado_V2 sig-firma.js'in React hâli): ortada platform, çevresinde 6 alan; çizgilerde akan veri noktaları.
 * Görünürken 5 sn'de bir sıradaki alana geçer (tur). Üstüne gelince/odaklanınca tur durur, o alan anlatılır.
 * Alana tıklayınca çizgi dolar (1,4 sn), sonra onJump ile "Bereiche & Ablauf" sekmesinde o alan açılır.
 * Telefonda (mob) dikey liste olur, çizgiler gizlenir.
 */
const W = 600;
const H = 440;
const CX = 300;
const CY = 220;
const RX = 195;
const RY = 160;
const STEP_MS = 5000;
const JUMP_MS = 1400;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export function PlatformDiagram({ t, heading, onJump }: { t: SchnellDemoText; heading: string; onJump: (i: number) => void }) {
  const areas = t.areas;
  const n = areas.length;
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [jump, setJump] = useState<number | null>(null);

  const pts = areas.map((_, i) => {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
    return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
  });
  const paths = pts.map((p) => {
    const mx = (CX + p.x) / 2;
    const my = (CY + p.y) / 2;
    const dx = p.x - CX;
    const dy = p.y - CY;
    const len = Math.hypot(dx, dy) || 1;
    const qx = mx - (dy / len) * 22;
    const qy = my + (dx / len) * 22;
    return `M${CX} ${CY} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  });

  // yalnız ekrandayken ve sekme açıkken tur döner
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const io = new IntersectionObserver((es) => {
      inView = es.some((e) => e.isIntersecting);
      sync();
    }, { threshold: 0.35 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const running = auto && visible && !reduced && jump === null;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setCur((c) => (c + 1 + n) % n), STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, cur, n]);

  useEffect(() => {
    if (jump === null) return;
    const id = window.setTimeout(() => {
      setJump(null);
      onJump(jump);
    }, reduced ? 250 : JUMP_MS);
    return () => window.clearTimeout(id);
  }, [jump, reduced, onJump]);

  const select = (i: number) => {
    setAuto(false);
    setJump(null);
    setCur(i);
  };

  const active = cur >= 0 ? areas[cur] : null;
  const barClass = jump !== null ? "era-demo-bar-jump" : running ? "era-demo-bar" : "";

  return (
    <div ref={root} className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-center gap-10 tab:grid-cols-1 tab:gap-8">
      <div
        role="group"
        aria-label={t.diagramAria}
        className="relative aspect-[600/440] w-full mob:flex mob:aspect-auto mob:flex-col mob:gap-2 mob:border-l-2 mob:border-dashed mob:border-era-cute mob:pl-5"
      >
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className="absolute inset-0 h-full w-full overflow-visible mob:hidden">
          {paths.map((d, i) => (
            <path
              key={i}
              id={`demo-p${i}`}
              d={d}
              fill="none"
              strokeWidth={cur === i ? 3 : 1.5}
              strokeDasharray={cur === i ? undefined : "3 6"}
              className={`transition-[stroke,stroke-width] duration-300 ${cur === i ? "stroke-era-primary" : "stroke-era-cute"}`}
            />
          ))}
          {paths.map((_, i) =>
            [true, false].map((rev) =>
              !rev && cur !== i ? null : (
                <circle key={`${i}-${rev}`} r={cur === i ? (rev ? 6 : 4) : 4} className={cur === i ? "fill-era-primary-ink" : "fill-era-primary"} cx={reduced ? (CX + pts[i].x) / 2 : 0} cy={reduced ? (CY + pts[i].y) / 2 : 0}>
                  {!reduced && (
                    <animateMotion dur={`${3.2 + (i % 3) * 0.4}s`} begin={`${-i * 0.55}s`} repeatCount="indefinite" keyPoints={rev ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear">
                      <mpath href={`#demo-p${i}`} />
                    </animateMotion>
                  )}
                </circle>
              ),
            ),
          )}
        </svg>

        <button
          type="button"
          aria-pressed={cur === -1}
          aria-controls="demo-platform-panel"
          onClick={() => select(-1)}
          className={`absolute top-1/2 left-1/2 flex h-[7.4rem] w-[7.4rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-(--r-s) border-2 border-era-primary transition-colors duration-300 mob:static mob:order-first mob:h-auto mob:w-full mob:translate-x-0 mob:translate-y-0 mob:flex-row mob:justify-start mob:gap-3 mob:px-4 mob:py-3 ${cur === -1 ? "bg-era-btn text-era-on-btn" : "bg-era-coolblue text-era-black hover:bg-era-white"}`}
        >
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase">{t.platform}</span>
          <span className="text-[24px] leading-tight font-semibold tracking-tight">Ekado</span>
        </button>

        {areas.map((a, i) => (
          <button
            key={a.id}
            type="button"
            aria-pressed={cur === i}
            aria-controls="demo-platform-panel"
            onClick={() => {
              select(i);
              setJump(i);
            }}
            onFocus={() => cur !== i && select(i)}
            onPointerEnter={(e) => e.pointerType === "mouse" && cur !== i && select(i)}
            style={{ left: `${((pts[i].x / W) * 100).toFixed(2)}%`, top: `${((pts[i].y / H) * 100).toFixed(2)}%` }}
            className={`absolute flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-4 py-2 text-[15px] whitespace-nowrap shadow-[0_8px_22px_var(--c-shadow-soft)] ring-1 transition-colors duration-300 mob:static mob:w-full mob:translate-x-0 mob:translate-y-0 mob:rounded-(--r-s1) mob:whitespace-normal ${cur === i ? "bg-era-btn text-era-on-btn ring-era-btn" : "bg-era-white text-era-black ring-era-lightgray hover:ring-era-primary"}`}
          >
            <span className="font-mono text-[12px] opacity-70">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-semibold">{a.name}</span>
          </button>
        ))}
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div id="demo-platform-panel" aria-live="polite" className="min-h-[13rem] rounded-(--r-r) bg-era-white p-6 shadow-[0_18px_44px_var(--c-shadow-soft)] ring-1 ring-era-lightgray mob:min-h-0 mob:p-5">
          {active && (
            <p className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-era-gray uppercase">
              {active.name}
              <ArrowLeftRight size={15} aria-hidden className="text-era-primary" />
              {t.platform} Ekado
            </p>
          )}
          <h4 className="text-[22px] leading-tight font-semibold tracking-tight text-era-black">{active ? active.name : heading}</h4>
          <p className="mt-2 text-[17px] leading-[1.55] text-era-gray">{active ? active.short : t.platformLead}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-pressed={!auto}
            onClick={() => {
              if (!auto && cur < 0) setCur(0);
              setAuto(!auto);
            }}
            className={`flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold ring-1 transition ${auto ? "bg-era-white text-era-black ring-era-lightgray hover:ring-era-primary" : "bg-era-btn text-era-on-btn ring-era-btn"}`}
          >
            <span aria-hidden className={`block h-3.5 w-3 bg-current ${auto ? "[clip-path:polygon(0_0,35%_0,35%_100%,0_100%,0_0,65%_0,100%_0,100%_100%,65%_100%,65%_0)]" : "[clip-path:polygon(0_0,100%_50%,0_100%)]"}`} />
            {auto ? t.pause : t.play}
          </button>
          <span aria-hidden className="relative h-[3px] min-w-12 flex-1 overflow-hidden rounded-full bg-era-lightgray">
            <span key={`${cur}-${jump}-${running}`} className={`absolute inset-0 origin-left scale-x-0 bg-era-primary ${barClass}`} />
          </span>
        </div>
      </div>
    </div>
  );
}
