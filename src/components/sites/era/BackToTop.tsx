"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { KeyRound, Lock, LockOpen } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

const label = { tr: "Yukarı çık", en: "Back to top", de: "Nach oben" } as const;

/**
 * Sayfanın sağ altında yukarı çıkma düğmesi: kilit, üzerine gelince açılır; tıklayınca anahtar döner ve sayfa başa kayar.
 * Halka, sayfanın ne kadarının okunduğunu gösterir. Panelde görünmez (alt menüyle çakışmasın).
 */
export function BackToTop() {
  const { locale } = useLocale();
  const path = usePathname();
  const [progress, setProgress] = useState(0);
  const [turning, setTurning] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (path.startsWith("/panel")) return null;

  const show = progress > 0.06;
  const R = 24;
  const C = 2 * Math.PI * R;

  const go = () => {
    setTurning(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }), 380);
    window.setTimeout(() => setTurning(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={go}
      aria-label={label[locale]}
      title={label[locale]}
      tabIndex={show ? 0 : -1}
      className={`group fixed right-5 bottom-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-era-primary text-era-on-dark shadow-[0_14px_34px_var(--c-shadow)] transition-all duration-500 ease-[cubic-bezier(.34,1.45,.64,1)] hover:-translate-y-1 hover:brightness-110 active:scale-95 mob:right-4 mob:bottom-4 mob:h-12 mob:w-12 ${
        show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-75 opacity-0"
      }`}
    >
      {/* okuma ilerlemesi halkası */}
      <svg viewBox="0 0 56 56" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="28" cy="28" r={R} fill="none" stroke="var(--c-glow)" strokeWidth="3" />
        <circle cx="28" cy="28" r={R} fill="none" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
      </svg>
      <span className="relative flex h-6 w-6 items-center justify-center">
        {turning ? (
          <KeyRound size={24} strokeWidth={2} className="[animation:era-wiggle_.6s_both] -translate-y-0.5 -rotate-90 transition-transform duration-500" />
        ) : (
          <>
            <Lock size={24} strokeWidth={2} className="absolute transition-all duration-300 group-hover:scale-50 group-hover:opacity-0" />
            <LockOpen size={24} strokeWidth={2} className="absolute scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
          </>
        )}
      </span>
    </button>
  );
}
