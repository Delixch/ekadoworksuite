"use client";

import { Languages, Scale, ScanLine, ShieldCheck, type LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing } from "@/i18n/landing";

const icons: LucideIcon[] = [Scale, ScanLine, ShieldCheck, Languages];

/** "İsviçre'ye göre yapıldı" bandı: L-GAV/İş Kanunu, QR fatura ve banka, veri gizliliği, 5 dil. Ana sayfada ve taslak B'de. Metin: src/i18n/landing.ts (b.swiss) */
export function SwissBand() {
  const { locale } = useLocale();
  const b = landing[locale].b;
  return (
    <section className="py-20 tab:py-14">
      <div className="mx-auto w-full max-w-[1400px] px-[15px]">
        <div className="ekado-feature relative overflow-hidden rounded-(--r-mx) p-12 text-era-on-dark mob:p-7">
          {/* dekor: Cta bandıyla aynı (süzülen halkalar, yörüngede dönen altın nokta, yükselen parçacıklar, süzülen ışık) */}
          <span aria-hidden className="era-float pointer-events-none absolute -top-28 -left-24 h-72 w-72 rounded-full border border-era-on-dark/15" />
          <span aria-hidden className="era-float pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full border border-era-on-dark/15 [animation-delay:-3s]" />
          <span aria-hidden className="pointer-events-none absolute top-8 right-[8%] h-36 w-36 mob:top-4 mob:right-4 mob:h-20 mob:w-20">
            <span className="absolute inset-0 rounded-full border border-era-on-dark/15" />
            <span className="era-orbit absolute inset-0">
              <span className="era-comet absolute inset-0 rounded-full" />
              <i className="absolute -top-1.5 left-1/2 block h-3 w-3 -translate-x-1/2 rounded-full bg-era-accent shadow-[0_0_20px_5px_var(--c-accent)]" />
            </span>
            <i className="era-pulse absolute inset-0 m-auto block h-2.5 w-2.5 rounded-full bg-era-on-dark/80" />
          </span>
          {[12, 34, 57, 73, 88].map((l, i) => (
            <i
              key={l}
              aria-hidden
              className="era-rise pointer-events-none absolute bottom-6 block h-1.5 w-1.5 rounded-full bg-era-on-dark/70"
              style={{ left: `${l}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${7 + (i % 3) * 2}s` }}
            />
          ))}
          <span aria-hidden className="era-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3" />

          <h2 className="relative z-[1] mb-10 text-[clamp(2rem,3.8vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em]">{b.swissTitle}</h2>
          <ul className="relative z-[1] grid grid-cols-4 gap-8 tab:grid-cols-2 mob:grid-cols-1">
            {b.swiss.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.title} className="flex flex-col gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-era-on-dark/15">
                    <Icon size={22} />
                  </span>
                  <span className="text-[20px] font-semibold">{s.title}</span>
                  <span className="text-[15px] leading-[1.55] opacity-85">{s.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
