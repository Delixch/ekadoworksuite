"use client";

import { useEffect, useState } from "react";
import { a } from "./assets";
import { PrimaryButton, RollLink } from "./ui";

const links = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#Features" },
  { label: "Services", href: "#Service" },
  { label: "Testimonials", href: "#Testimonials" },
  { label: "FAQ", href: "#Faq" },
];

/** Açılışta sırayla büyüyerek gelen öğe (orijinaldeki animation="item") */
const pop = (i: number) => ({ animationDelay: `${0.35 + i * 0.07}s` });

export function Navbar() {
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
      className={`fixed inset-x-0 top-0 z-[100] w-full transition-[transform,background-color] duration-500 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-[#b9b9b9b9] backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="relative mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex items-center justify-between py-5 tab:pb-2.5 mob:py-4">
          <a href="#" className="era-in-pop block h-[31px] w-[154px]" style={pop(0)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a("699427-frame-5.svg")} alt="I’m Era" className="h-full w-full" />
          </a>

          <nav
            className={`tab:absolute tab:inset-x-[15px] tab:top-full tab:z-[15] tab:rounded-(--r-s) tab:bg-era-secondary tab:p-[30px] ${
              open ? "tab:block" : "tab:hidden"
            }`}
          >
            <div className="flex items-center gap-12 tab:flex-col tab:items-start tab:gap-[30px]">
              {links.map((l, i) => (
                <div key={l.label} className="era-in-pop" style={pop(i + 1)}>
                  <RollLink href={l.href} onClick={() => setOpen(false)} textClass="text-era-black font-medium">
                    {l.label}
                  </RollLink>
                </div>
              ))}
              <div className="hidden tab:block">
                <PrimaryButton>Get Started</PrimaryButton>
              </div>
            </div>
          </nav>

          <div className="flex items-center">
            <div className="era-in-pop tab:hidden" style={pop(6)}>
              <PrimaryButton>Get Started</PrimaryButton>
            </div>
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="era-in-pop hidden h-12 w-12 flex-col items-center justify-center tab:flex"
              style={pop(6)}
            >
              <span
                className={`h-0.5 w-6 bg-era-black transition-transform duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`}
              />
              <span
                className={`my-1.5 h-0.5 w-6 bg-era-black transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-6 bg-era-black transition-transform duration-300 ${open ? "-translate-y-[8px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
