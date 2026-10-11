"use client";

import { useSyncExternalStore } from "react";
import { tr, type Dict } from "./tr";
import { en } from "./en";
import { de } from "./de";

export type Locale = "tr" | "en" | "de";

/** Dil listesi: kısa kod ve kendi dilindeki adı */
export const locales: { code: Locale; label: string }[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

const dictionaries: Record<Locale, Dict> = { tr, en, de };
const KEY = "lang";
const listeners = new Set<() => void>();

function read(): Locale {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "tr" || v === "en" || v === "de") return v;
  } catch {}
  return "tr";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function setLocale(l: Locale) {
  try {
    localStorage.setItem(KEY, l);
  } catch {}
  document.documentElement.lang = l;
  listeners.forEach((f) => f());
}

/** Seçili dil + o dildeki metinler (t). Sunucuda ve ilk çizimde Türkçe. */
export function useLocale() {
  const locale = useSyncExternalStore(subscribe, read, () => "tr" as Locale);
  return { locale, t: dictionaries[locale], setLocale };
}
