"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

const label = { tr: "Yukarı çık", en: "Back to top", de: "Nach oben" } as const;

/**
 * Sayfanın sağ altında yukarı çıkma düğmesi, bir "kapanış sayacı" gibi çalışır: ortadaki rakam sayfanın yüzde kaçının
 * "kayda geçtiğini" gösterir, halka bunu çizer, sayfa sonuna varınca madeni para "Abschluss" onayına döner (ay kapanışı gibi).
 * Tıklayınca sayfa başa kayar ve sayaç sıfıra iner. Panelde görünmez (alt menüyle çakışmasın).
 */
export function BackToTop() {
  const { locale } = useLocale();
  const path = usePathname();
  const [progress, setProgress] = useState(0);

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

  const pct = Math.round(progress * 100);
  const closed = progress >= 0.985;

  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
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
      {/* madeni para kenarı: yavaş dönen kesik halka */}
      <svg viewBox="0 0 56 56" className="pointer-events-none absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite] opacity-60" aria-hidden>
        <circle cx="28" cy="28" r="19" fill="none" stroke="var(--c-on-dark)" strokeWidth="1" strokeDasharray="2 3.2" />
      </svg>
      {/* okuma ilerlemesi halkası */}
      <svg viewBox="0 0 56 56" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="28" cy="28" r={R} fill="none" stroke="var(--c-glow)" strokeWidth="3" />
        <circle cx="28" cy="28" r={R} fill="none" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
      </svg>
      <span className="relative flex h-7 w-7 flex-col items-center justify-center leading-none tabular-nums">
        {closed ? (
          <>
            <Check size={15} strokeWidth={3.4} className="era-pop-in" />
            <span className="mt-0.5 text-[6.5px] font-medium tracking-[0.12em] uppercase">Abschl.</span>
          </>
        ) : (
          <>
            <span className="text-[15px] font-medium tracking-tight">{pct}</span>
            <span className="mt-0.5 text-[7px] font-semibold opacity-80">%</span>
          </>
        )}
      </span>
    </button>
  );
}
