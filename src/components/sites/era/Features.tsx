"use client";

import {
  CalendarClock,
  Clock,
  FileSpreadsheet,
  FileText,
  Gift,
  Landmark,
  Languages,
  ListChecks,
  ScanLine,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Thermometer,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { BrushStroke, Heading, Reveal, type Variant } from "./ui";
import { ClockDivider, ClockRow } from "./Clock";
import { Spot } from "./Spot";

/** Metinler src/i18n içinde; burada sadece ikon ve animasyon yönü var (sıra sözlükle aynı). */
const groupMeta: { variant: Variant; icons: LucideIcon[] }[] = [
  { variant: "left", icons: [Clock, CalendarClock, Wallet, FileText] },
  { variant: "up", icons: [Thermometer, ListChecks, ShoppingCart, Gift] },
  { variant: "right", icons: [ScanLine, Landmark, FileSpreadsheet, FileText] },
];
const extraIcons: LucideIcon[] = [Settings, Languages, ShieldCheck];

function IconBox({ icon: Icon, featured }: { icon: LucideIcon; featured?: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 flex-none items-center justify-center rounded-full transition-transform duration-500 group-hover/item:scale-110 ${
        featured
          ? "bg-era-on-dark/12 text-era-on-dark ring-1 ring-era-on-dark/25"
          : "bg-era-white text-era-primary-ink ring-1 ring-era-line"
      }`}
    >
      <Icon size={20} strokeWidth={1.8} />
    </span>
  );
}

export function Features() {
  const { t } = useLocale();
  const c = t.features;
  return (
    <section id="moduller" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-14 mob:gap-9">
          <div className="relative mx-auto flex w-full max-w-[820px] flex-col items-center gap-4 text-center">
            <ClockRow className="absolute top-[72px] right-full mr-0 hidden min-[1280px]:flex" />
            <span className="flex items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {c.eyebrow}
            </span>
            <Heading>{c.heading}</Heading>
            <Reveal variant="fade">
              <p className="text-era-gray">{c.lead}</p>
            </Reveal>
          </div>

          <ClockDivider />

          <div className="mx-auto mt-6 grid w-full grid-cols-3 items-stretch gap-x-6 gap-y-14 tab:max-w-[680px] tab:grid-cols-1">
            {c.groups.map((g, gi) => {
              const featured = gi === 0;
              const meta = groupMeta[gi];
              return (
                <Reveal key={g.title} variant={meta.variant} delay={gi * 120} className="h-full">
                  <div className="relative h-full">
                  {/* Karteireiter: kartın üst kenarına oturan sekme */}
                  <h3
                    className={`absolute bottom-full left-7 z-[2] -mb-px rounded-t-[16px] px-6 pt-3 pb-3.5 text-[19px] leading-none font-extrabold tracking-[-0.015em] mob:left-5 mob:px-5 mob:text-[17px] ${
                      featured
                        ? "bg-era-primary text-era-on-dark"
                        : "border-[1.5px] border-b-0 border-(--c-panel-border) bg-(--c-panel) text-era-black"
                    }`}
                  >
                    {g.title}
                  </h3>
                  <Spot
                    className={`flex h-full flex-col rounded-(--r-x) px-8 py-9 mob:px-6 mob:py-7 ${
                      featured ? "ekado-feature text-era-on-dark" : "ekado-panel"
                    }`}
                  >
                    {/* ışık şeridi kartlar arasında akar: önce mavi kartta beyaz, sonra iki yandaki kartta mavi */}
                    <span
                      aria-hidden
                      className={`ekado-flow ${featured ? "ekado-flow-white" : "ekado-flow-blue"}`}
                      style={{ animationDelay: `${gi * 2.7}s` }}
                    />
                    <div className="relative z-[1] flex flex-col gap-3">
                      <span
                        className={`flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold ${
                          featured ? "bg-era-on-dark/12 text-era-on-dark" : "bg-era-secondary text-era-primary-ink"
                        }`}
                      >
                        <i className={`block h-1.5 w-1.5 rounded-full ${featured ? "bg-era-on-dark" : "bg-era-accent"}`} />
                        {g.kicker}
                      </span>
                    </div>

                    <ul className="relative z-[1] mt-7 flex flex-col">
                      {g.items.map((it, i) => (
                        <li
                          key={it.title}
                          className="group/item relative py-5 first:pt-0 last:pb-0"
                        >
                          {i < g.items.length - 1 && (
                            <span
                              aria-hidden
                              className={`absolute left-[21.5px] w-px ${i === 0 ? "top-[50px]" : "top-[70px]"} -bottom-3.5 ${
                                featured ? "bg-era-on-dark/30" : "bg-era-line"
                              }`}
                            >
                              <i
                                className={`line-dot ${featured ? "ring-1 ring-white/80" : ""}`}
                                style={{ animationDelay: `${i * 1.2}s` }}
                              />
                            </span>
                          )}
                          <Reveal variant="fade" delay={200 + i * 130} className="flex gap-4">
                            <IconBox icon={meta.icons[i]} featured={featured} />
                            <div className="min-w-0">
                              <h4
                                className={`text-[17px] leading-snug font-semibold transition-colors duration-300 ${
                                  featured ? "" : "text-era-black group-hover/item:text-era-primary-ink"
                                }`}
                              >
                                {it.title}
                              </h4>
                              <p
                                className={`mt-1 text-[15px] leading-[1.55] ${
                                  featured ? "text-era-on-dark/75" : "text-era-gray"
                                }`}
                              >
                                {it.text}
                              </p>
                            </div>
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                  </Spot>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="up">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-era-line" />
                <span className="text-[13px] font-semibold tracking-[0.14em] text-era-gray uppercase">{c.extrasTitle}</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-era-line" />
              </div>
              <div className="grid grid-cols-3 gap-8 tab:grid-cols-1 tab:gap-6">
                {c.extras.map((e, ei) => {
                  const EIcon = extraIcons[ei];
                  return (
                  <div key={e.title} className="group/item relative flex items-center gap-4">
                    <BrushStroke flip={ei % 2 === 1} />
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-secondary text-era-primary-ink ring-1 ring-era-line transition-transform duration-500 group-hover/item:scale-110">
                      <EIcon size={21} strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className="text-[17px] font-semibold text-era-black">{e.title}</div>
                      <div className="text-[15px] text-era-gray">{e.text}</div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
