"use client";

import { useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";

/** Seçili dile göre <html lang>, sayfa başlığı ve açıklamasını günceller (ilk HTML Türkçe gelir). */
export function LocaleSync() {
  const { locale, t } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <>
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
    </>
  );
}
