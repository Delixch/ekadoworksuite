"use client";

import { useLocale } from "@/i18n/useLocale";

/** Hero'nun altında sağdan sola kayan özellik şeridi (kayma animasyonu: .era-marquee-list). Müşteri logoları gelince burada logo da gösterilebilir. */
export function Marquee() {
  const { t } = useLocale();
  return (
    <section aria-label={t.hero.channelsAria} className="relative overflow-x-clip border-y border-era-line bg-era-white/60 py-6 mob:py-4">
      <div className="flex w-full items-center gap-[67px] overflow-hidden py-1.5 leading-[1.3] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] mob:gap-10 sm2:gap-[35px]">
        {[0, 1, 2, 3].map((n) => (
          <ul key={n} aria-hidden={n > 0} className="era-marquee-list flex flex-none items-center gap-[67px] mob:gap-10 sm2:gap-[35px]">
            {t.marquee.map((label) => (
              <li key={label} className="flex flex-none items-center gap-[67px] text-[26px] font-semibold tracking-tight whitespace-nowrap text-era-black mob:gap-10 mob:text-[20px] sm2:gap-[35px]">
                {label}
                <i aria-hidden className="block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-era-primary" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
