"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type PointerEvent, type ReactNode } from "react";

/**
 * KAYAN ÇERÇEVE EFEKTİ (Adnan'ın en sevdiği efekt, kural: yan yana paneller varsa her zaman uygula).
 * Izgaranın arkasında, imlecin üstünde olduğu panele kayan yarı saydam bir çerçeve. Panelden panele geçerken kayarak gider.
 * Kullanım: ızgarayı <GlowGrid as="ul" className="grid ..."> ile sar, her panele data-glow ver (<li data-glow>).
 * tone: "light" açık zemin (bordo tonlu), "dark" koyu zemin (beyaz tonlu). pad: çerçevenin panel dışına taşma payı (px).
 * Dokunmatikte basınca 2.8 sn görünür. İlk örnek: Solutions.tsx ("Dört alan, tek uygulama"). Renkler temadan.
 */
export function GlowGrid({
  as: Tag = "div",
  className = "",
  children,
  tone = "light",
  pad = 12,
  radius = 34,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  pad?: number;
  radius?: number;
}) {
  const [glow, setGlow] = useState<{ x: number; y: number; w: number; h: number; slide: boolean } | null>(null);
  const wasVisible = useRef(false);
  const current = useRef<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const hide = () => {
    clearTimeout(timer.current);
    wasVisible.current = false;
    current.current = null;
    setGlow(null);
  };
  const show = (el: HTMLElement, touch: boolean) => {
    clearTimeout(timer.current);
    if (current.current !== el) {
      current.current = el;
      setGlow({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight, slide: wasVisible.current });
      wasVisible.current = true;
    }
    if (touch) timer.current = setTimeout(hide, 2800);
  };
  const itemOf = (e: PointerEvent<HTMLElement>) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-glow]");
    return el && e.currentTarget.contains(el) ? el : null;
  };

  // yerleşim değişince ölçü eskir: gizle
  useEffect(() => {
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("resize", hide);
      clearTimeout(timer.current);
    };
  }, []);

  const ease = "cubic-bezier(.22,1,.36,1)";
  const style: CSSProperties = {
    left: (glow?.x ?? 0) - pad,
    top: (glow?.y ?? 0) - pad,
    width: (glow?.w ?? 0) + pad * 2,
    height: (glow?.h ?? 0) + pad * 2,
    borderRadius: radius,
    opacity: glow ? 1 : 0,
    transition: glow?.slide ? `left .35s ${ease}, top .35s ${ease}, width .35s ${ease}, height .35s ${ease}, opacity .2s` : "opacity .2s",
  };

  return (
    <Tag
      className={`relative ${className}`}
      onPointerMove={(e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "mouse") return;
        const el = itemOf(e);
        if (el) show(el, false);
      }}
      onPointerUp={(e: PointerEvent<HTMLElement>) => {
        if (e.pointerType === "mouse") return;
        const el = itemOf(e);
        if (el) show(el, true);
      }}
      onPointerLeave={(e: PointerEvent<HTMLElement>) => {
        if (e.pointerType === "mouse") hide();
      }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute z-0 border ${
          tone === "dark" ? "border-era-on-dark/25 bg-era-on-dark/10" : "border-2 border-era-primary/55 bg-era-primary/[0.18] shadow-[0_14px_36px_var(--c-shadow)]"
        }`}
        style={style}
      />
      {children}
    </Tag>
  );
}
