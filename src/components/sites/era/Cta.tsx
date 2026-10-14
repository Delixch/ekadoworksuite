"use client";

import { ArrowRight, Gift } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Reveal } from "./ui";

/** Ücretsiz demo bandı (PDF sayfa 4 + eski site) */
export function Cta() {
  const { t } = useLocale();
  const c = t.cta;
  return (
    <section id="demo" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <Reveal variant="scale">
          <div className="ekado-feature relative overflow-hidden rounded-(--r-mx) px-8 py-16 text-center text-era-on-dark mob:px-5 mob:py-12">
            {/* süzülen dekor halkalar */}
            <span aria-hidden className="era-float pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full border border-era-on-dark/15" />
            <span aria-hidden className="era-float pointer-events-none absolute -right-20 -bottom-28 h-80 w-80 rounded-full border border-era-on-dark/15 [animation-delay:-3s]" />
            {/* yörüngede dönen uydu: turkuaz nokta kuyruklu yıldız izi bırakır */}
            <span aria-hidden className="pointer-events-none absolute top-8 right-[13%] h-40 w-40 mob:top-4 mob:right-4 mob:h-24 mob:w-24">
              <span className="absolute inset-0 rounded-full border border-era-on-dark/15" />
              <span className="era-orbit absolute inset-0">
                <span className="era-comet absolute inset-0 rounded-full" />
                <i className="absolute -top-1.5 left-1/2 block h-3 w-3 -translate-x-1/2 rounded-full bg-era-accent shadow-[0_0_20px_5px_var(--c-accent)]" />
              </span>
              <i className="era-pulse absolute inset-0 m-auto block h-2.5 w-2.5 rounded-full bg-era-on-dark/80" />
            </span>
            {/* yükselen küçük parçacıklar */}
            {[8, 22, 64, 78, 91].map((l, i) => (
              <i
                key={l}
                aria-hidden
                className="era-rise pointer-events-none absolute bottom-6 block h-1.5 w-1.5 rounded-full bg-era-on-dark/70"
                style={{ left: `${l}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${7 + (i % 3) * 2}s` }}
              />
            ))}
            {/* bandın üstünden süzülen ışık */}
            <span aria-hidden className="era-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3" />

            <div className="relative z-[1] mx-auto flex max-w-[760px] flex-col items-center gap-6">
              <span className="flex items-center gap-2 rounded-full bg-era-on-dark/15 px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] uppercase">
                <Gift size={15} className="era-wiggle" /> {c.badge}
              </span>
              <h2 className="text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance">{c.title}</h2>
              <p className="max-w-[620px] text-[17px] leading-[1.55] text-era-on-dark/80">{c.text}</p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm2:w-full sm2:flex-col">
                <a
                  href="#hizli-demo"
                  className="era-glowpulse group/btn flex h-14 items-center gap-3 rounded-(--r-s1) bg-era-on-dark px-8 text-[17px] font-semibold text-era-dark no-underline transition-all duration-300 hover:-translate-y-0.5 sm2:w-full sm2:justify-center"
                >
                  {c.primary}
                  <ArrowRight size={19} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </a>
                <a
                  href="#bize-ulasin"
                  className="flex h-14 items-center rounded-(--r-s1) border-2 border-era-on-dark/60 px-8 text-[17px] font-semibold text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-era-on-dark/10 sm2:w-full sm2:justify-center"
                >
                  {c.secondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
