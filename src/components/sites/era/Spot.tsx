"use client";

import type { PointerEvent, ReactNode } from "react";

/** Kart: imleç üstünde gezinen yumuşak ışık ve hafif yükselme (renkler theme.css'ten) */
export function Spot({ children, className = "" }: { children: ReactNode; className?: string }) {
  const move = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article onPointerMove={move} className={`ekado-spot ${className}`}>
      {children}
    </article>
  );
}
