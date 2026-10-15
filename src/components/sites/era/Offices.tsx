"use client";

import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight, Building2, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { officeText } from "@/i18n/offices";
import { contactInfo, mapsUrl, offices, telHref } from "@/lib/offices";
import { Heading, Reveal } from "./ui";

const MapPlayer = dynamic(() => import("./map/MapPlayer"), { ssr: false });

/**
 * Harita karosu: Google'ın gömülü haritası çerez/takip getirdiği için kullanılmıyor.
 * Google Haritalar görünümünde çizilmiş, Remotion ile oynayan harita (src/components/sites/era/map);
 * tıklayınca Google Maps yeni sekmede açılır.
 */
function MapTile({ kind, href, label, tall = false }: { kind: "hq" | "ch"; href: string; label: string; tall?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`group/map relative block overflow-hidden bg-[#f2efe9] ${tall ? "h-[300px] mob:h-[200px]" : "h-[170px] mob:h-[150px]"}`}>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover/map:scale-105">
        <MapPlayer kind={kind} />
      </div>
    </a>
  );
}

export function Offices() {
  const { locale, t } = useLocale();
  const o = officeText[locale];
  const chips = [
    { Icon: Mail, label: o.email, value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { Icon: Phone, label: o.phone, value: contactInfo.phone, href: telHref(contactInfo.phone) },
    { Icon: Smartphone, label: o.mobile, value: contactInfo.mobile, href: telHref(contactInfo.mobile) },
  ].filter((c) => c.value);
  const names = { hq: [o.hq, o.hqCountry], ch: [o.ch, o.chCountry] } as const;

  return (
    <section id="iletisim" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      {/* iki sütun (Adnan 2026-10-15: tek başına kontakt güzel değil): solda başlık, kısa yazı, e-posta ve iki düğme; sağda büyük harita kartı */}
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] items-center gap-14 px-[15px] tab:grid-cols-1 tab:gap-10">
        <div className="flex flex-col items-start gap-6">
          <span className="flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
            <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {o.eyebrow}
          </span>
          <Heading as="h2">{o.heading}</Heading>
          <p className="max-w-[520px] text-[18px] leading-[1.6] text-era-gray">{o.lead}</p>
          <div className="flex w-full max-w-[460px] flex-col gap-3">
            {chips.map((c, i) => (
              <Reveal key={c.label} variant="up" delay={i * 90}>
                <a href={c.href} className="ekado-panel group/c flex items-center gap-4 rounded-(--r-x) px-5 py-4 no-underline">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-secondary text-era-primary-ink transition-transform duration-500 group-hover/c:scale-110">
                    <c.Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold tracking-wide text-era-gray uppercase">{c.label}</span>
                    <span className="block truncate text-[16.5px] font-semibold text-era-black">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#bize-ulasin" className="flex h-12 items-center gap-2 rounded-(--r-s1) bg-era-primary px-6 text-[16px] font-semibold text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110">
              {t.hero.demo} <ArrowRight size={18} />
            </a>
            <a href="#hizli-demo" className="flex h-12 items-center rounded-(--r-s1) border-2 border-era-black px-6 text-[16px] font-semibold text-era-black no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-era-secondary">
              {t.hero.test}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {offices.map((off, i) => (
            <Reveal key={off.id} variant="up" delay={i * 120}>
              <article className="ekado-panel flex h-full flex-col overflow-hidden rounded-(--r-x)">
                <div className="flex flex-col gap-4 p-6 mob:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-era-secondary text-era-primary-ink">
                      <Building2 size={20} strokeWidth={1.8} />
                    </span>
                    <a href={mapsUrl(off.mapQuery)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-[8px] px-4 py-1.5 text-[13.5px] font-semibold text-era-black no-underline ring-1 ring-era-line transition hover:bg-era-secondary">
                      <span className="text-era-black">{o.openMap}</span> <ArrowUpRight size={15} className="text-era-black" />
                    </a>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-medium text-era-black">{names[off.id][0]}</h3>
                    <p className="text-[14px] font-semibold text-era-primary-ink">{names[off.id][1]}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-[15px] text-era-gray">
                    <li className="flex items-start gap-3">
                      <MapPin size={17} strokeWidth={1.8} className="mt-0.5 flex-none text-era-primary-ink" />
                      <span>{off.address}</span>
                    </li>
                    {off.phone && (
                      <li className="flex items-center gap-3">
                        <Phone size={17} strokeWidth={1.8} className="flex-none text-era-primary-ink" />
                        <a href={telHref(off.phone)} className="text-era-gray no-underline hover:text-era-black">
                          {off.phone}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="mt-auto">
                  <MapTile kind={off.id} href={mapsUrl(off.mapQuery)} label={`${names[off.id][0]}: ${o.openMap}`} tall={offices.length === 1} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
