"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** 0..1 ilerleme: eleman viewport'un altından girerken (startFrac) üstüne doğru (endFrac) */
function progress(el: HTMLElement, startFrac: number, endFrac: number) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh * startFrac;
  const end = vh * endFrac;
  return Math.min(1, Math.max(0, (start - r.top) / (start - end)));
}

function useScroll(cb: () => void) {
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(cb);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [cb]);
}

/** Kaydırdıkça kelime kelime griden siyaha dönen paragraf (ScrollTrigger scrub) */
export function ScrubText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useScroll(() => {
    const el = ref.current;
    if (!el) return;
    const p = progress(el, 0.85, 0.35);
    const spans = el.querySelectorAll<HTMLElement>("[data-w]");
    spans.forEach((s, i) => {
      const t = Math.min(1, Math.max(0, p * (spans.length + 3) - i));
      s.style.opacity = String(0.3 + 0.7 * t);
    });
  });

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w style={{ opacity: 0.3, transition: "opacity .25s linear" }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Hizmet kartları: bölüm kaydırıldıkça üst üste yığılmış halden kendi yerine açılır.
 * Orijinalde 3 sütunlu masaüstünde: ilk satır sola, ikinci satır sağa toplanır.
 */
export function SpreadGrid({ children, className = "" }: { children: ReactNode[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useScroll(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const p = progress(el, 1, 0.41);
    // orijinaldeki sabit px ofsetler (tüm ekran genişliklerinde aynı)
    const offsets = [0, -462, -920, 920, 462, 0];
    items.forEach((c, i) => {
      c.style.transform = `translateX(${(offsets[i] ?? 0) * (1 - p)}px)`;
    });
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
