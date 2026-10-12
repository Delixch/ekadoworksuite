import type { Locale } from "./useLocale";

export const video: Record<Locale, { watch: string; how: string; title: string; close: string; fallback: string }> = {
  tr: { watch: "Tanıtım videosunu izle", how: "Nasıl çalışır?", title: "Dijital Resepsiyon nasıl çalışır?", close: "Kapat", fallback: "Video yüklenemedi." },
  en: { watch: "Watch the intro video", how: "How it works", title: "How does the Digital Reception work?", close: "Close", fallback: "The video could not be loaded." },
  de: { watch: "Vorstellungsvideo ansehen", how: "So funktioniert es", title: "So funktioniert die Digitale Rezeption", close: "Schließen", fallback: "Das Video konnte nicht geladen werden." },
};
