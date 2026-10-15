"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing } from "@/i18n/landing";
import { moduleHref, moduleOrder } from "@/i18n/modules/common";
import { parts, posterOf } from "@/lib/module-videos";
import { Reveal } from "./ui";
import { GlowGrid } from "./GlowGrid";

/** Her modül kartının kapağı: o alanı en iyi anlatan video parçası */
const coverPart = [1, 7, 2, 8];

/** Ana sayfadaki 4 modül kartı (video kapaklı, modül sayfalarına gider). Metin: src/i18n/landing.ts (a.moduleCards) */
export function ModuleCards() {
  const { locale } = useLocale();
  const a = landing[locale].a;
  const poster = (n: number) => {
    const u = parts[n]?.[locale === "tr" ? "tr" : "de"] ?? parts[n]?.de;
    return u ? posterOf(u) : null;
  };
  return (
    <>
        {/* dört alan */}
        <section className="py-24 tab:py-16">
          <div className="mx-auto w-full max-w-[1400px] px-[15px]">
            <div className="mb-12 flex max-w-[760px] flex-col gap-4">
              <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-era-black">{a.modulesTitle}</h2>
              <p className="text-[18px] leading-[1.6] text-era-gray">{a.modulesLead}</p>
            </div>
            <GlowGrid as="ul" className="grid grid-cols-4 gap-6 tab:grid-cols-2 mob:grid-cols-1">
              {moduleOrder.map((m, i) => {
                const card = a.moduleCards[i];
                const img = poster(coverPart[i]);
                return (
                  <Reveal key={m} variant="up" delay={i * 90} className="h-full">
                    <Link href={moduleHref(m)} data-glow className="group/c relative z-[1] flex h-full flex-col overflow-hidden rounded-(--r-x) bg-era-white no-underline ring-1 ring-era-lightgray transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_var(--c-shadow)] hover:ring-era-primary">
                      <span className="relative block aspect-video overflow-hidden bg-era-device">
                        {img && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover/c:scale-105" />
                        )}
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-era-white/95 text-era-primary shadow-lg transition-transform duration-300 group-hover/c:scale-110">
                            <Play size={18} className="ml-0.5 fill-current" />
                          </span>
                        </span>
                      </span>
                      <span className="flex flex-1 flex-col gap-3 p-6">
                        <span className="text-[13px] font-medium tracking-[0.12em] text-era-primary-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[21px] leading-tight font-semibold text-era-black">{card.title}</span>
                        <span className="text-[15px] leading-[1.55] text-era-gray">{card.text}</span>
                        <span className="mt-auto flex items-center gap-2 pt-2 text-[15px] font-semibold text-era-primary-ink">
                          {a.moduleMore} <ArrowRight size={16} className="transition-transform group-hover/c:translate-x-1" />
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </GlowGrid>
          </div>
        </section>
    </>
  );
}
