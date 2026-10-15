"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/useLocale";
import { RobotChat } from "./RobotChat";

const LED = [
  "era-robot-led-a",
  "era-robot-led-b",
  "era-robot-led-c",
  "era-robot-led-b",
  "era-robot-led-a",
];

/**
 * Sağ kenarda duran dashboard robotu: dikdörtgen kafa, eski bir mekanik kasa şeklinde gövde, fareyi (telefonda parmağı) izleyen gözler.
 * Sayfa kaydıkça sağ kenarda aşağı yukarı süzülür. Yapay zeka sonra buraya bağlanacak (şimdilik süs).
 * Tıklamayı engellemez; yeri belli olunca yalnızca layout.tsx'teki yeri değişir.
 */
export function Robot() {
  const path = usePathname();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const eyes = useRef<(HTMLSpanElement | null)[]>([]);
  const pupils = useRef<(HTMLSpanElement | null)[]>([]);
  const hidden = path.startsWith("/panel");

  useEffect(() => {
    if (hidden) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let target = 0;
    let y = 0;
    let raf = 0;

    const measure = () => {
      const el = box.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      // sayfa başında sağ altta durur, okudukça yukarı süzülür (yukarı çık düğmesinin üstünde başlar)
      const bottom = window.innerHeight - el.offsetHeight - 96;
      const top = Math.min(bottom, window.innerHeight * 0.28);
      target = bottom - p * (bottom - top);
    };

    const frame = () => {
      y += (target - y) * (reduce ? 1 : 0.08);
      if (box.current)
        box.current.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
      raf = requestAnimationFrame(frame);
    };

    const look = (e: PointerEvent) => {
      const h = head.current;
      if (h) {
        // kafa fareye doğru döner, eğilir ve hafifçe yan yatar (ekranın yarısı = tam açı)
        const r = h.getBoundingClientRect();
        const nx = Math.max(
          -1,
          Math.min(
            1,
            (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2),
          ),
        );
        const ny = Math.max(
          -1,
          Math.min(
            1,
            (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2),
          ),
        );
        h.style.transform = `perspective(260px) rotateY(${(nx * 32).toFixed(1)}deg) rotateX(${(-ny * 20).toFixed(1)}deg) rotateZ(${(nx * 7).toFixed(1)}deg) translate(${(nx * 3).toFixed(1)}px,${(ny * 2).toFixed(1)}px)`;
      }
      eyes.current.forEach((eye, i) => {
        const pupil = pupils.current[i];
        if (!eye || !pupil) return;
        const r = eye.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 160) * (r.width * 0.26);
        pupil.style.transform = `translate(${((dx / d) * k).toFixed(1)}px,${((dy / d) * k).toFixed(1)}px)`;
      });
    };

    measure();
    y = target;
    raf = requestAnimationFrame(frame);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", look, { passive: true });
    window.addEventListener("pointerdown", look, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", look);
      window.removeEventListener("pointerdown", look);
    };
  }, [hidden]);

  // robot birkaç saniye sonra selam balonunu gösterir, sohbet açılınca ya da kapatılınca kalkar
  useEffect(() => {
    if (hidden) return;
    const a = window.setTimeout(() => setTeaser(true), 4000);
    const b = window.setTimeout(() => setTeaser(false), 14000);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      <div
        ref={box}
        className="pointer-events-none fixed top-0 right-2 z-[80] will-change-transform mob:right-1"
      >
        {teaser && !open && (
          <button
            type="button"
            onClick={() => {
              setTeaser(false);
              setOpen(true);
            }}
            className="era-pop-in pointer-events-auto absolute top-9 right-full mr-2 w-max max-w-[210px] rounded-2xl rounded-tr-sm bg-era-white px-3.5 py-2 text-left text-[14px] leading-snug font-semibold text-era-black shadow-[0_10px_26px_var(--c-shadow)] ring-1 ring-era-line mob:max-w-[160px] mob:text-[13px]"
          >
            {t.chat.teaser}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setTeaser(false);
            setOpen((o) => !o);
          }}
          aria-label={open ? t.chat.close : t.chat.open}
          aria-expanded={open}
          className="pointer-events-auto absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-era-primary"
        />
        <div
          aria-hidden
          className="era-robot-bob flex w-[78px] flex-col items-center mob:w-[58px]"
        >
          {/* anten + kafa birlikte döner */}
          <div
            ref={head}
            className="flex w-full flex-col items-center transition-transform duration-200 ease-out [transform-origin:50%_85%]"
          >
            <span className="era-robot-led-a block h-2.5 w-2.5 rounded-full bg-era-accent shadow-[0_0_10px_var(--c-accent)] mob:h-2 mob:w-2" />
            <span className="block h-2.5 w-[3px] bg-era-cute mob:h-2" />
            {/* kafa */}
            <div className="relative w-full rounded-[10px] bg-era-dark p-[5px] shadow-[0_10px_24px_var(--c-shadow)] ring-1 ring-white/25 mob:rounded-lg mob:p-1">
              <span className="absolute top-1/2 -left-[5px] h-5 w-[5px] -translate-y-1/2 rounded-l-sm bg-era-cute mob:h-4" />
              <span className="absolute top-1/2 -right-[5px] h-5 w-[5px] -translate-y-1/2 rounded-r-sm bg-era-cute mob:h-4" />
              <div className="flex flex-col items-center gap-[7px] rounded-md bg-era-chinese px-2 py-2.5 mob:gap-1.5 mob:py-2">
                <div className="flex gap-2.5 mob:gap-2">
                  {[0, 1].map((i) => (
                    <span
                      key={i}
                      ref={(n) => {
                        eyes.current[i] = n;
                      }}
                      className="era-robot-blink relative flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white mob:h-4 mob:w-4"
                    >
                      <span
                        ref={(n) => {
                          pupils.current[i] = n;
                        }}
                        className="block h-[10px] w-[10px] rounded-full bg-[#0b1240] transition-transform duration-100 ease-out mob:h-[7px] mob:w-[7px]"
                      />
                    </span>
                  ))}
                </div>
                <div className="flex gap-[3px]">
                  {LED.map((c, i) => (
                    <i
                      key={i}
                      className={`${c} block h-[3px] w-2.5 rounded-full bg-era-success mob:w-1.5`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="block h-1.5 w-4 bg-era-cute" />
          {/* gövde: eski bir mekanik kasa (fiş penceresi, sayı tuşları, kol ve para çekmecesi) */}
          <div className="relative flex w-[96%] flex-col items-center">
            {/* üst pencere: tutar göstergesi */}
            <div className="relative z-10 -mb-px w-[78%] rounded-t-[8px] bg-era-dark px-1.5 pt-1.5 pb-1 ring-1 ring-white/25 mob:px-1 mob:pt-1">
              <div className="flex h-[15px] items-center justify-end rounded-[3px] bg-era-chinese px-1 font-mono text-[9px] leading-none font-medium tracking-wider text-era-accent mob:h-[11px] mob:text-[7px]">
                12.50
              </div>
            </div>
            {/* gövde: eğimli tuş paneli */}
            <div className="relative w-full rounded-[10px] bg-era-dark p-2 shadow-[0_10px_24px_var(--c-shadow)] ring-1 ring-white/25 mob:rounded-lg mob:p-1.5">
              {/* yan kol */}
              <span className="absolute top-1.5 -right-[6px] h-5 w-[4px] rounded-r-full bg-era-cute mob:h-3.5" />
              <span className="absolute top-0.5 -right-[8px] block h-2.5 w-2.5 rounded-full bg-era-accent ring-1 ring-era-chinese mob:h-2 mob:w-2" />
              <div className="grid grid-cols-4 gap-[3px] mob:gap-0.5">
                {Array.from({ length: 12 }, (_, i) => (
                  <i
                    key={i}
                    className={`block aspect-square rounded-full ring-1 ring-era-chinese ${
                      i === 3
                        ? "era-robot-led-b bg-era-accent"
                        : i === 11
                          ? "bg-era-success"
                          : i % 4 === 3
                            ? "bg-era-primary"
                            : "bg-era-cute"
                    }`}
                  />
                ))}
              </div>
              {/* para çekmecesi */}
              <div className="mt-2 flex h-[14px] items-center justify-center rounded-[4px] bg-era-chinese mob:mt-1.5 mob:h-[10px]">
                <span className="era-robot-slide block h-[3px] w-1/3 rounded-full bg-era-accent" />
              </div>
            </div>
            {/* ayaklar */}
            <div className="flex w-[86%] justify-between">
              <span className="block h-1 w-3 rounded-b-sm bg-era-cute" />
              <span className="block h-1 w-3 rounded-b-sm bg-era-cute" />
            </div>
          </div>
        </div>
      </div>
      {open && <RobotChat onClose={() => setOpen(false)} />}
    </>
  );
}
