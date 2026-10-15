"use client";

import { BookOpen, Calculator, CalendarDays, Clock, FileText, Gift, Globe, HandCoins, Landmark, ListChecks, Percent, Receipt, ShieldCheck, ShoppingCart, Wallet } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

/** t.marquee sırasıyla: puantaj, vardiya, görevler, sipariş, alacak/borç, kasa, banka, bordro, kaynakta vergi, maaş belgesi, HACCP, sadakat, muhasebe, defter, web sitesi */
const ICONS = [Clock, CalendarDays, ListChecks, ShoppingCart, Receipt, Wallet, Landmark, HandCoins, Percent, FileText, ShieldCheck, Gift, Calculator, BookOpen, Globe];

/** Hero'nun altında sağdan sola kayan özellik şeridi (kayma animasyonu: .era-marquee-list). Müşteri logoları gelince burada logo da gösterilebilir. */
export function Marquee() {
  const { t } = useLocale();
  return (
    <section aria-label={t.hero.channelsAria} className="relative overflow-x-clip bg-era-primary py-4 mob:py-2.5">
      <div className="flex w-full items-center gap-[67px] overflow-hidden py-1 leading-[1.3] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] mob:gap-10 sm2:gap-[35px]">
        {[0, 1, 2, 3].map((n) => (
          <ul key={n} aria-hidden={n > 0} className="era-marquee-list flex flex-none items-center gap-[67px] mob:gap-10 sm2:gap-[35px]">
            {t.marquee.map((label, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <li key={label} className="flex flex-none items-center gap-3 text-[26px] font-bold tracking-tight whitespace-nowrap text-[#e4efff] mob:text-[20px]">
                  <Icon aria-hidden strokeWidth={1.9} className="h-[1em] w-[1em] flex-none text-[#bcd6ff]" />
                  {label}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
