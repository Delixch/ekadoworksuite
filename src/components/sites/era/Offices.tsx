"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, Building2, Mail, MapPin, Phone, Smartphone } from "lucide-react";
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
function MapTile({ kind, href, label }: { kind: "hq" | "ch"; href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group/map relative block h-[170px] overflow-hidden bg-[#f2efe9] mob:h-[150px]">
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover/map:scale-105">
        <MapPlayer kind={kind} />
      </div>
    </a>
  );
}

export function Offices() {
  const { locale } = useLocale();
  const o = officeText[locale];
  const chips = [
    { Icon: Mail, label: o.email, value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { Icon: Phone, label: o.phone, value: contactInfo.phone, href: telHref(contactInfo.phone) },
    { Icon: Smartphone, label: o.mobile, value: contactInfo.mobile, href: telHref(contactInfo.mobile) },
  ].filter((c) => c.value);
  const names = { hq: [o.hq, o.hqCountry], ch: [o.ch, o.chCountry] } as const;

  return (
    <section id="iletisim" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1100px] px-[15px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <span className="flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
            <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {o.eyebrow}
          </span>
          <Heading as="h2">{o.heading}</Heading>
        </div>

        <div className={`mx-auto grid gap-4 tab:grid-cols-1 ${chips.length === 1 ? "max-w-[540px] grid-cols-1" : "grid-cols-3"}`}>
          {chips.map((c, i) => (
            <Reveal key={c.label} variant="up" delay={i * 90}>
              <a href={c.href} className="ekado-panel group/c flex h-full items-center gap-4 rounded-(--r-x) px-5 py-4 no-underline">
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

        <div className={`mx-auto mt-4 grid gap-4 tab:grid-cols-1 ${offices.length === 1 ? "max-w-[540px] grid-cols-1" : "grid-cols-2"}`}>
          {offices.map((off, i) => (
            <Reveal key={off.id} variant="up" delay={i * 120}>
              <article className="ekado-panel flex h-full flex-col overflow-hidden rounded-(--r-x)">
                <div className="flex flex-col gap-4 p-6 mob:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-era-secondary text-era-primary-ink">
                      <Building2 size={20} strokeWidth={1.8} />
                    </span>
                    <a href={mapsUrl(off.mapQuery)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13.5px] font-semibold text-era-black no-underline ring-1 ring-era-line transition hover:bg-era-secondary">
                      <span className="text-era-black">{o.openMap}</span> <ArrowUpRight size={15} className="text-era-black" />
                    </a>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold text-era-black">{names[off.id][0]}</h3>
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
                  <MapTile kind={off.id} href={mapsUrl(off.mapQuery)} label={`${names[off.id][0]}: ${o.openMap}`} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
