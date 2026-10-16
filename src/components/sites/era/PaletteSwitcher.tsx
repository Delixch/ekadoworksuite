"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "@/i18n/useLocale";
import { DEFAULT_PALETTE, PALETTES, type Palette } from "@/styles/palettes";

/** html[data-palette] değişince haber verir (kaynak: tarayıcıdaki palet özniteliği). */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });
  return () => mo.disconnect();
}

/**
 * Renk paleti seçici: her palet için küçük kare kutucuk. Seçim tarayıcıda saklanır.
 * Kutucuğun rengi kendi data-palette özniteliğinden gelir (renk kodu yok, palet dosyasındaki --c-primary).
 */
export function PaletteSwitcher({ large = false }: { large?: boolean }) {
  const { t } = useLocale();
  const current = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.palette ?? DEFAULT_PALETTE,
    () => DEFAULT_PALETTE
  );

  const choose = (p: Palette) => {
    document.documentElement.setAttribute("data-palette", p);
    try {
      localStorage.setItem("palette", p);
    } catch {}
  };

  return (
    <div role="group" aria-label={t.ui.palette} className={`flex items-center ${large ? "gap-3" : "gap-1"}`}>
      {PALETTES.map((p) => {
        const active = current === p;
        return (
          <button
            key={p}
            type="button"
            data-palette={p}
            onClick={() => choose(p)}
            aria-pressed={active}
            aria-label={t.ui.paletteNames[p]}
            title={t.ui.paletteNames[p]}
            className={`flex-none bg-era-primary transition-transform duration-300 hover:scale-110 ${
              large ? "h-8 w-8 rounded-[8px]" : "h-3.5 w-3.5 rounded-[4px]"
            } ${
              active
                ? large
                  ? "ring-2 ring-era-black ring-offset-2 ring-offset-era-white"
                  : "ring-[1.5px] ring-era-black ring-offset-[1.5px] ring-offset-era-nav"
                : "opacity-80"
            }`}
          />
        );
      })}
    </div>
  );
}
