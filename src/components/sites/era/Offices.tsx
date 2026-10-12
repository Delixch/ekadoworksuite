"use client";

import { ArrowUpRight, Building2, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { officeText } from "@/i18n/offices";
import { contactInfo, mapsUrl, offices, telHref } from "@/lib/offices";
import { Heading, Reveal } from "./ui";

/**
 * Harita karosu: Google'ın gömülü haritası çerez/takip getirdiği için kullanılmıyor.
 * Çizilmiş sakin bir harita, tıklayınca Google Maps yeni sekmede açılır.
 */
function MapTile({ kind, href, label }: { kind: "hq" | "ch"; href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group/map relative block h-[170px] overflow-hidden bg-era-secondary mob:h-[150px]">
      <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice" aria-hidden className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover/map:scale-105">
        {kind === "hq" ? (
          <>
            {/* körfez */}
            <path d="M0 0 H150 C120 40 150 70 110 105 C80 135 90 160 60 170 H0 Z" className="fill-era-coolblue" />
            <path d="M150 0 C120 40 150 70 110 105 C80 135 90 160 60 170" fill="none" className="stroke-era-primary/25" strokeWidth="2" />
            {/* bloklar */}
            {[[190, 20], [250, 12], [310, 28], [200, 92], [270, 84], [340, 96], [180, 138], [250, 130]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width={i % 2 ? 44 : 52} height={i % 3 ? 34 : 40} rx="6" className="fill-era-white" />
            ))}
            {/* caddeler */}
            <path d="M120 170 L330 0" className="stroke-era-primary/30" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M160 60 H400 M200 125 H400" className="stroke-era-cute" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* nehir */}
            <path d="M-10 118 C80 98 130 150 210 128 C290 106 330 60 410 70" fill="none" className="stroke-era-coolblue" strokeWidth="22" strokeLinecap="round" />
            {/* ızgara bloklar */}
            {[[24, 14], [100, 14], [176, 14], [252, 14], [328, 14], [24, 62], [252, 58], [328, 50]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="62" height={i > 4 ? 30 : 36} rx="6" className="fill-era-white" />
            ))}
            {[[40, 140], [120, 150], [300, 128], [356, 124]].map(([x, y], i) => (
              <rect key={`b${i}`} x={x} y={y} width="48" height="22" rx="6" className="fill-era-white" />
            ))}
            <path d="M0 52 H400 M92 0 V170 M244 0 V170 M320 0 V170" className="stroke-era-cute" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        )}
        {/* hedefsiz dolaşan küçük araba: sokaklarda döner, yönünü yola göre çevirir */}
        <g className="era-car">
          <animateMotion
            dur={kind === "hq" ? "13s" : "15s"}
            repeatCount="indefinite"
            rotate="auto"
            path={kind === "hq" ? "M256 60 H388 Q396 60 396 68 V117 Q396 125 388 125 H176 L256 60 Z" : "M92 52 H244 V150 Q244 160 254 160 H310 Q320 160 320 150 V52 H92 Z"}
          />
          <g transform="scale(1.3)">
          <ellipse cx="0" cy="5.5" rx="10" ry="2.4" fill="#000" opacity=".12" />
          <rect x="-9.5" y="-4.6" width="19" height="9.2" rx="3.2" className="fill-era-primary" />
          <rect x="-7.5" y="-3.4" width="4" height="6.8" rx="1.2" fill="#fff" opacity=".35" />
          <rect x="-0.5" y="-3.4" width="5.2" height="6.8" rx="1.6" fill="#fff" opacity=".8" />
          <circle cx="8.4" cy="-2.7" r="1.15" fill="#ffd35a" />
          <circle cx="8.4" cy="2.7" r="1.15" fill="#ffd35a" />
          </g>
        </g>
        {/* iğne ve nabız */}
        <g transform="translate(236 78)">
          <circle r="16" className="era-pin-pulse fill-era-primary/25" />
          <path d="M0 0 C-12 -14 -14 -30 0 -34 C14 -30 12 -14 0 0 Z" transform="translate(0 6)" className="fill-era-primary" />
          <circle cy="-22" r="5" className="fill-white" />
        </g>
      </svg>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-era-white/70 to-transparent" />
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
  ];
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

        <div className="grid grid-cols-3 gap-4 tab:grid-cols-1">
          {chips.map((c, i) => (
            <Reveal key={c.label} variant="up" delay={i * 90}>
              <a href={c.href} className="punn-panel group/c flex h-full items-center gap-4 rounded-(--r-x) px-5 py-4 no-underline">
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

        <div className="mt-4 grid grid-cols-2 gap-4 tab:grid-cols-1">
          {offices.map((off, i) => (
            <Reveal key={off.id} variant="up" delay={i * 120}>
              <article className="punn-panel flex h-full flex-col overflow-hidden rounded-(--r-x)">
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
                    <li className="flex items-center gap-3">
                      <Phone size={17} strokeWidth={1.8} className="flex-none text-era-primary-ink" />
                      <a href={telHref(off.phone)} className="text-era-gray no-underline hover:text-era-black">
                        {off.phone}
                      </a>
                    </li>
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
