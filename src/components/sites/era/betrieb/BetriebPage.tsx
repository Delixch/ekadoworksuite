"use client";

import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { betrieb } from "@/i18n/betrieb";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { V1Program } from "./V1Program";
import { V2Day } from "./V2Day";
import { V3Chat } from "./V3Chat";
import { V4Episodes } from "./V4Episodes";
import { V5Stack } from "./V5Stack";

const designs = [V1Program, V2Day, V3Chat, V4Episodes, V5Stack];

/**
 * "Genel Bakış ve İşletme" sayfası. TASLAK: aynı içerik beş farklı tasarımla alt alta.
 * Adnan birini seçince sadece o kalır; diğer V*.tsx dosyaları ve atlama çubuğu silinir.
 */
export function BetriebPage() {
  const { locale } = useLocale();
  const c = betrieb[locale];

  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        {/* üst */}
        <section className="relative bg-[radial-gradient(60%_45%_at_80%_0%,var(--c-sky),transparent)] pt-[130px] pb-14 tab:pt-[100px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 px-[15px]">
            <span className="era-in-up flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {c.eyebrow}
            </span>
            <h1 className="era-in-up max-w-[900px] text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-era-black" style={{ animationDelay: ".08s" }}>
              {c.heading}
            </h1>
            <p className="era-in-up max-w-[760px] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.6] text-era-gray" style={{ animationDelay: ".16s" }}>
              {c.lead}
            </p>
            <div className="era-in-up flex max-w-[820px] items-start gap-4 rounded-(--r-x) bg-era-white p-5 ring-1 ring-era-lightgray shadow-[0_12px_32px_var(--c-shadow-soft)]" style={{ animationDelay: ".24s" }}>
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
                <Eye size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <strong className="text-[18px] font-semibold text-era-black">{c.pictureTitle}</strong>
                <p className="text-[16px] leading-[1.6] text-era-gray">{c.pictureText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* taslak: tasarımlar arası atlama */}
        <div className="sticky top-[60px] z-[50] tab:top-[52px] border-y border-era-lightgray bg-era-nav/95 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1300px] items-center gap-3 overflow-x-auto px-[15px] py-2.5">
            <span className="flex-none text-[12px] font-medium tracking-[0.12em] text-era-gray uppercase">{c.draftLabel}</span>
            {c.variants.map((v, i) => (
              <a key={v.name} href={`#taslak-${i + 1}`} className="flex flex-none items-center gap-2 rounded-[8px] bg-era-white px-3.5 py-1.5 text-[14px] font-semibold text-era-black no-underline ring-1 ring-era-lightgray transition hover:bg-era-primary hover:text-era-on-dark">
                <span className="tabular-nums">{i + 1}</span> {v.name}
              </a>
            ))}
          </div>
        </div>

        {designs.map((Design, i) => {
          const v = c.variants[i];
          return (
            <section key={v.name} id={`taslak-${i + 1}`} className={`scroll-mt-[120px] py-20 tab:py-14 ${i % 2 ? "bg-era-secondary/40" : ""}`}>
              <div className="mx-auto mb-10 flex w-full max-w-[1300px] items-end gap-5 px-[15px]">
                <span className="text-[clamp(4rem,8vw,6.5rem)] leading-[0.8] font-medium tracking-[-0.06em] text-era-coolblue tabular-nums">{i + 1}</span>
                <div className="flex flex-col gap-1 pb-1">
                  <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-semibold tracking-[-0.02em] text-era-black">{v.name}</h2>
                  <p className="text-[16px] text-era-gray">{v.idea}</p>
                </div>
              </div>
              <Design />
            </section>
          );
        })}

        {/* son */}
        <section className="py-20 tab:py-14">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 rounded-(--r-mx) bg-era-primary p-12 text-era-on-dark mob:p-7">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight font-semibold tracking-[-0.02em]">{c.ctaHeading}</h2>
            <p className="max-w-[620px] text-[18px] leading-[1.6] opacity-85">{c.ctaText}</p>
            <Link href="/#bize-ulasin" className="flex h-12 items-center gap-2 rounded-(--r-s1) bg-era-white px-6 text-[17px] font-semibold text-era-black no-underline transition hover:-translate-y-0.5">
              {c.ctaButton} <ArrowRight size={18} />
            </Link>
            <p className="pt-2 text-[14px] opacity-70">{c.draftNote}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
