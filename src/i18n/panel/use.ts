"use client";

import { useLocale, type Locale } from "@/i18n/useLocale";

/** Panel metinleri her dil için aynı biçimde yazılır: { tr, en, de }. Seçili dilin metnini verir. */
export type PanelDict<T> = Record<Locale, T>;

export function usePT<T>(dict: PanelDict<T>): T {
  const { locale } = useLocale();
  return dict[locale];
}
