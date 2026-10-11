"use client";

import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Clock } from "./Clock";
import { Logo } from "./Logo";
import { linkHrefs, solutionHrefs } from "./nav-links";
import { Reveal, RollLink } from "./ui";

/** İletişim bilgileri (PDF sayfa 4) */
const contact = [
  { icon: Globe, label: "punndigital.com", href: "https://punndigital.com" },
  { icon: Mail, label: "info@punndigital.com", href: "mailto:info@punndigital.com" },
  { icon: Phone, label: "+90 533 401 90 35", href: "tel:+905334019035" },
];

export function Footer() {
  const { t } = useLocale();
  const f = t.footer;
  const heading = "text-[18px] font-semibold text-era-on-dark";

  return (
    <footer id="bize-ulasin" className="relative scroll-mt-0 overflow-hidden bg-era-dark pt-[90px] pb-8 text-era-on-dark tab:pt-[60px] mob:pt-10">
      {/* kayan renkli ışık bulutları ve üst kenarda süzülen ışık çizgisi */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="era-aurora absolute -top-40 left-[8%] h-[420px] w-[560px] rounded-full bg-era-primary/45 blur-[110px]" />
        <span className="era-aurora absolute -right-[6%] -bottom-52 h-[480px] w-[600px] rounded-full bg-era-accent/25 blur-[120px] [animation-delay:-9s]" />
        <span className="era-aurora absolute top-[30%] left-[48%] h-[260px] w-[360px] rounded-full bg-era-primary/25 blur-[100px] [animation-delay:-4s]" />
        <span className="era-sheen absolute inset-x-0 top-0 h-px" />
      </div>
      <div className="relative z-[1] mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="grid grid-cols-[1.3fr_1fr_1fr_1.1fr] gap-12 tab:grid-cols-2 tab:gap-10 sm2:grid-cols-1">
          <Reveal variant="up" className="flex flex-col gap-5">
            <Link href="/" aria-label={t.ui.homeAria} className="block h-[52px] w-fit">
              <Logo onDark className="h-full w-auto" />
            </Link>
            <p className="max-w-[320px] text-[16px] leading-[1.55] text-era-on-dark/75">{f.tagline}</p>
          </Reveal>

          <Reveal variant="up" delay={120} className="flex flex-col gap-5">
            <div className={heading}>{f.solutions}</div>
            {t.nav.solutionItems.map((label, i) => (
              <RollLink key={solutionHrefs[i]} href={solutionHrefs[i]} height={22} textClass="text-era-on-dark/85">
                {label}
              </RollLink>
            ))}
          </Reveal>

          <Reveal variant="up" delay={240} className="flex flex-col gap-5">
            <div className={heading}>{f.menu}</div>
            {t.nav.links.map((label, i) => (
              <RollLink key={linkHrefs[i]} href={linkHrefs[i]} height={22} textClass="text-era-on-dark/85">
                {label}
              </RollLink>
            ))}
          </Reveal>

          <Reveal variant="up" delay={360} className="flex flex-col gap-5">
            <div className={heading}>{f.contact}</div>
            {contact.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group/c flex items-center gap-3 text-era-on-dark/85 no-underline transition-colors hover:text-era-on-dark"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-era-on-dark/10 transition-all duration-300 group-hover/c:scale-110 group-hover/c:bg-era-primary">
                  <c.icon size={17} strokeWidth={1.9} />
                </span>
                <span className="break-all">{c.label}</span>
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal variant="fade" delay={300}>
          <div className="relative mt-14 flex items-center justify-between gap-4 border-t border-era-on-dark/15 pt-6 text-[14px] text-era-on-dark/65 mob:flex-col mob:items-start">
            {/* çizginin üstünde yavaşça sağa sola kayan küçük kare */}
            <span aria-hidden className="era-slide absolute -top-[4px] left-0 block h-[7px] w-[7px] rounded-[2px] bg-era-accent shadow-[0_0_12px_2px_var(--c-accent)]" />
            <span>{f.rights}</span>
            <div className="mr-[76px] mob:mr-0">
              <Clock />
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
