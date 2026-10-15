"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { locales, setLocale, useLocale } from "@/i18n/useLocale";

/** Dil seçici: TR / EN / DE. Seçim tarayıcıda saklanır. */
export function LanguageSwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // dışarı tıklayınca / Esc ile kapan
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.ui.language}
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 items-center gap-1.5 rounded-(--r-s1) border border-era-lightgray bg-era-white px-3 text-[15px] font-semibold tracking-wide text-era-black transition-transform duration-300 hover:scale-[.96]"
      >
        <Globe size={17} strokeWidth={1.9} className="text-era-primary-ink" />
        {locale.toUpperCase()}
        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute top-full z-20 w-[190px] pt-2 transition-all duration-200 ${
          align === "right" ? "right-0" : "left-0"
        } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
      >
        <ul
          role="listbox"
          aria-label={t.ui.language}
          className="flex flex-col gap-1 rounded-(--r-x) border border-era-line bg-era-white p-2 shadow-[0_12px_40px_var(--c-shadow)]"
        >
          {locales.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-(--r-s1) px-3 py-2.5 text-left text-[16px] transition-colors hover:bg-era-secondary ${
                    active ? "font-semibold text-era-primary-ink" : "font-medium text-era-black"
                  }`}
                >
                  <span className="flex h-7 w-9 items-center justify-center rounded-md bg-era-secondary text-[12px] font-medium tracking-wider text-era-primary-ink">
                    {l.code.toUpperCase()}
                  </span>
                  <span className="flex-1">{l.label}</span>
                  {active && <Check size={16} strokeWidth={2.4} />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
