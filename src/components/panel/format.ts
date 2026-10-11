import type { Locale } from "@/i18n/useLocale";

const tag: Record<Locale, string> = { tr: "tr-TR", en: "en-GB", de: "de-CH" };

export function fmtMoney(v: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(tag[locale], { style: "currency", currency, maximumFractionDigits: 0 }).format(v);
}

export function fmtNum(v: number, locale: Locale, digits = 0) {
  return new Intl.NumberFormat(tag[locale], { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(v);
}

export function fmtTime(iso: string, locale: Locale) {
  return new Date(iso).toLocaleTimeString(tag[locale], { hour: "2-digit", minute: "2-digit" });
}

export function fmtDate(iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) {
  return new Date(iso).toLocaleDateString(tag[locale], opts);
}

/** "3 dk önce" gibi göreli zaman */
export function fmtAgo(iso: string, locale: Locale) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(tag[locale], { numeric: "auto", style: "short" });
  const abs = Math.abs(diff);
  if (abs < 60) return rtf.format(Math.round(diff), "second");
  if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
  return rtf.format(Math.round(diff / 86400), "day");
}
