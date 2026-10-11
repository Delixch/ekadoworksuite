"use client";

import { useEffect, useRef } from "react";

const LAP_MS = 7500; // bir kartın çevresini dolaşma süresi
const TRAIL = [0, 16, 32]; // iz: baştaki kare ve arkasındaki iki kare (px geride)

/**
 * Kartın kenarında dolaşan ışıklı kare. Sağ alt köşeden başlar, saat yönünde
 * dört köşeyi dolaşır; tur bitince onDone çağrılır (üst bileşen sıradaki karta geçirir).
 */
export function Chaser({ run, onDone }: { run: boolean; onDone: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!run || !el) {
      dots.current.forEach((d) => d && (d.style.opacity = "0"));
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const parent = el.parentElement;
    const radius = parent ? parseFloat(getComputedStyle(parent).borderTopLeftRadius) || 0 : 0;
    const r = Math.max(0, Math.min(radius, w / 2, h / 2));
    const sw = w - 2 * r;
    const sh = h - 2 * r;
    const arc = (Math.PI / 2) * r;
    const total = 2 * (sw + sh) + 4 * arc;

    // yol: alt kenar (sağdan sola) → sol alt yay → sol kenar (aşağıdan yukarı) → sol üst yay →
    // üst kenar (soldan sağa) → sağ üst yay → sağ kenar (yukarıdan aşağı) → sağ alt yay
    const at = (d: number): [number, number] => {
      d = ((d % total) + total) % total;
      if (d < sw) return [w - r - d, h];
      d -= sw;
      if (d < arc) {
        const a = Math.PI / 2 + d / r;
        return [r + r * Math.cos(a), h - r + r * Math.sin(a)];
      }
      d -= arc;
      if (d < sh) return [0, h - r - d];
      d -= sh;
      if (d < arc) {
        const a = Math.PI + d / r;
        return [r + r * Math.cos(a), r + r * Math.sin(a)];
      }
      d -= arc;
      if (d < sw) return [r + d, 0];
      d -= sw;
      if (d < arc) {
        const a = (3 * Math.PI) / 2 + d / r;
        return [w - r + r * Math.cos(a), r + r * Math.sin(a)];
      }
      d -= arc;
      if (d < sh) return [w, r + d];
      d -= sh;
      const a = d / r;
      return [w - r + r * Math.cos(a), h - r + r * Math.sin(a)];
    };

    let raf = 0;
    let finished = false;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / LAP_MS);
      // yumuşak başlangıç ve bitiş
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const head = eased * total;
      dots.current.forEach((d, i) => {
        if (!d) return;
        const [x, y] = at(head - TRAIL[i]);
        const fade = Math.min(1, p * 8) * Math.min(1, (1 - p) * 8 + 0.15);
        d.style.transform = `translate(${x - 3.5}px, ${y - 3.5}px)`;
        d.style.opacity = String((i === 0 ? 1 : 0.55 - i * 0.2) * fade);
      });
      if (p < 1) raf = requestAnimationFrame(tick);
      else if (!finished) {
        finished = true;
        dots.current.forEach((d) => d && (d.style.opacity = "0"));
        onDone();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, onDone]);

  return (
    <div ref={box} aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
      {TRAIL.map((_, i) => (
        <span
          key={i}
          ref={(n) => {
            dots.current[i] = n;
          }}
          className="absolute top-0 left-0 block rounded-[2px] bg-era-accent opacity-0"
          style={{
            width: 7 - i,
            height: 7 - i,
            boxShadow: i === 0 ? "0 0 12px 3px var(--c-accent)" : "0 0 8px 1px var(--c-accent)",
          }}
        />
      ))}
    </div>
  );
}
