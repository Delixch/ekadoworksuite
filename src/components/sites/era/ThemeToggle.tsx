"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

/** html[data-theme] değişince haber verir (kaynak: tarayıcıdaki tema özniteliği). */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** Gündüz / gece teması düğmesi. Seçim tarayıcıda saklanır, ilk açılışta sistem temasına uyulur. */
export function ThemeToggle() {
  const { t } = useLocale();
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false
  );

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.ui.toLight : t.ui.toDark}
      title={dark ? t.ui.lightTitle : t.ui.darkTitle}
      className="flex h-12 w-12 flex-none items-center justify-center rounded-(--r-s1) border border-era-lightgray bg-era-white text-era-black transition-transform duration-300 hover:scale-[.94]"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
