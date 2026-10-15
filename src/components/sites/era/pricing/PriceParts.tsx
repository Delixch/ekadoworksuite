"use client";

import { Info } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { pricing, PRICE } from "@/i18n/pricing";

/** Fiyat sayfalarının ortak parçaları: aylık/yıllık anahtarı, örnek fiyat uyarısı, para biçimi */
export const chf = (n: number) => n.toLocaleString("de-CH", { maximumFractionDigits: 0 });
/** yıllık ödemede aylık karşılık (2 ay hediye → 10/12) */
export const yearlyMonthly = (n: number) => Math.round((n * (12 - PRICE.yearlyFreeMonths)) / 12);

export function SampleNote() {
  const { locale } = useLocale();
  if (!PRICE.sample) return null;
  return (
    <span className="flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold text-era-black ring-1 ring-era-cute">
      <Info size={15} className="text-era-accent" /> {pricing[locale].sampleNote}
    </span>
  );
}

export function PeriodToggle({ yearly, setYearly }: { yearly: boolean; setYearly: (v: boolean) => void }) {
  const { locale } = useLocale();
  const p = pricing[locale];
  return (
    <div className="flex items-center gap-3">
      <div className="flex rounded-[10px] bg-era-secondary p-1 ring-1 ring-era-lightgray">
        {[false, true].map((y) => (
          <button
            key={String(y)}
            type="button"
            onClick={() => setYearly(y)}
            aria-pressed={yearly === y}
            className={`rounded-[8px] px-5 py-2 text-[15px] font-semibold transition ${yearly === y ? "bg-era-primary text-era-on-dark shadow-[0_6px_16px_var(--c-shadow-soft)]" : "text-era-black"}`}
          >
            {y ? p.yearly : p.monthly}
          </button>
        ))}
      </div>
      <span className="rounded-[6px] bg-era-coolblue px-3 py-1 text-[13px] font-bold text-era-primary-ink">{p.yearlyGift}</span>
    </div>
  );
}

/** Büyük fiyat: CHF 79 / ay (yıllıkta üstü çizili aylık fiyat da görünür) */
export function PriceTag({ monthly, yearly, light = false }: { monthly: number; yearly: boolean; light?: boolean }) {
  const { locale } = useLocale();
  const p = pricing[locale];
  const now = yearly ? yearlyMonthly(monthly) : monthly;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2">
        <span className={`text-[15px] font-semibold ${light ? "opacity-80" : "text-era-gray"}`}>CHF</span>
        <span className="text-[clamp(2.6rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums">{chf(now)}</span>
        <span className={`text-[15px] ${light ? "opacity-80" : "text-era-gray"}`}>{p.perMonth}</span>
        {yearly && <span className={`text-[15px] line-through tabular-nums ${light ? "opacity-60" : "text-era-matte"}`}>{chf(monthly)}</span>}
      </div>
      <span className={`h-5 text-[13px] ${light ? "opacity-75" : "text-era-gray"}`}>{yearly ? p.billedYearly : ""}</span>
    </div>
  );
}
