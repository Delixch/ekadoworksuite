"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { linkHrefs, solutionHrefs } from "./nav-links";
import { ThemeToggle } from "./ThemeToggle";


/** Açılışta sırayla büyüyerek gelen öğe */
const pop = (i: number) => ({ animationDelay: `${0.3 + i * 0.07}s` });

const pill =
  "flex h-12 items-center rounded-(--r-s1) px-5 text-[17px] font-medium whitespace-nowrap no-underline transition-all duration-300 hover:-translate-y-0.5";
const pillSoft = `${pill} bg-era-coolblue/60 text-era-primary-ink hover:bg-era-coolblue`;

export function Navbar() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Aşağı kaydırınca gizlen, yukarı kaydırınca geri gel
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > last && y > 100) setHidden(true);
      else if (y < last) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] w-full border-b transition-[transform,background-color,border-color] duration-500 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "border-era-line bg-era-nav backdrop-blur-md" : "border-transparent bg-transparent"}`}
    >
      <div className="relative mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex items-center justify-between gap-3 py-4 tab:py-3">
          <a href="#" aria-label={t.ui.homeAria} className="era-in-pop block h-[52px] flex-none tab:h-11" style={pop(0)}>
            <Logo className="h-full w-auto" />
          </a>

          {/* masaüstü menü */}
          <nav className="flex items-center gap-3 tab:hidden" aria-label="Ana menü">
            <div className="era-in-pop group relative" style={pop(1)}>
              <button
                type="button"
                aria-haspopup="menu"
                className={`${pill} gap-2 bg-era-primary text-era-on-dark hover:brightness-110`}
              >
                {t.nav.solutions}
                <ChevronDown size={18} className="transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute top-full left-0 z-10 w-[300px] pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="flex flex-col gap-1 rounded-(--r-x) border border-era-line bg-era-white p-2 shadow-[0_12px_40px_var(--c-shadow)]">
                  {t.nav.solutionItems.map((label, i) => (
                    <li key={solutionHrefs[i]}>
                      <a
                        href={solutionHrefs[i]}
                        className="block rounded-(--r-s1) px-4 py-3 text-[16px] font-medium text-era-black no-underline transition-colors hover:bg-era-secondary"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {t.nav.links.map((label, i) => (
              <a key={linkHrefs[i]} href={linkHrefs[i]} className={`era-in-pop ${pillSoft}`} style={pop(i + 2)}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="era-in-pop flex" style={pop(7)}>
              <LanguageSwitcher />
            </div>
            <div className="era-in-pop flex" style={pop(7.5)}>
              <ThemeToggle />
            </div>
            <a
              href="#demo"
              className="era-in-pop flex h-12 items-center rounded-(--r-s1) bg-era-primary px-6 text-[17px] font-medium whitespace-nowrap text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 tab:hidden"
              style={pop(8)}
            >
              {t.nav.demo}
            </a>
            <button
              type="button"
              aria-label={t.ui.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="era-in-pop hidden h-12 w-10 flex-col items-center justify-center tab:flex"
              style={pop(8)}
            >
              <span className={`h-0.5 w-6 bg-era-black transition-transform duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`} />
              <span className={`my-1.5 h-0.5 w-6 bg-era-black transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-era-black transition-transform duration-300 ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* tablet / mobil menü paneli */}
        <nav
          aria-label="Mobil menü"
          className={`absolute inset-x-[15px] top-full z-[15] hidden max-h-[calc(100vh-90px)] overflow-y-auto rounded-(--r-s) border border-era-line bg-era-white p-5 shadow-[0_12px_40px_var(--c-shadow)] ${
            open ? "tab:block" : ""
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="px-3 pb-1 text-[13px] font-semibold tracking-wide text-era-gray uppercase">{t.nav.solutions}</div>
            {t.nav.solutionItems.map((label, i) => (
              <a key={solutionHrefs[i]} href={solutionHrefs[i]} onClick={() => setOpen(false)} className="rounded-(--r-s1) px-3 py-3 text-[16px] font-medium text-era-black no-underline hover:bg-era-secondary">
                {label}
              </a>
            ))}
            <div className="my-2 h-px bg-era-line" />
            {t.nav.links.map((label, i) => (
              <a key={linkHrefs[i]} href={linkHrefs[i]} onClick={() => setOpen(false)} className="rounded-(--r-s1) px-3 py-3 text-[16px] font-medium text-era-black no-underline hover:bg-era-secondary">
                {label}
              </a>
            ))}
            <a href="#demo" onClick={() => setOpen(false)} className="mt-3 flex h-12 items-center justify-center rounded-(--r-s1) bg-era-primary text-[17px] font-medium text-era-on-dark no-underline">
              {t.nav.demo}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
