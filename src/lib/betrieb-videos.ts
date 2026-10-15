/**
 * "Übersicht & Betrieb" tanıtım videoları (Cloudinary, sunucuda yer kaplamaz).
 * Sıra programdaki menü sırası: 01 Übersicht, 02-09 Betrieb alt menüleri.
 * Link boşsa o bölümde "video yakında" görünür. Yeni link gelince sadece buraya yazılır.
 */
export type BetriebKey =
  | "uebersicht"
  | "schichtplan"
  | "stempeluhr"
  | "hygiene"
  | "einsaetze"
  | "vitrine"
  | "treuekarte"
  | "webseite"
  | "brett";

export const betriebOrder: BetriebKey[] = [
  "uebersicht",
  "schichtplan",
  "stempeluhr",
  "hygiene",
  "einsaetze",
  "vitrine",
  "treuekarte",
  "webseite",
  "brett",
];

export const betriebVideos: Record<BetriebKey, { de?: string; tr?: string }> = {
  uebersicht: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792053847/1a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792053878/1t.mp4",
  },
  schichtplan: {},
  stempeluhr: {},
  hygiene: {},
  einsaetze: {},
  vitrine: {},
  treuekarte: {},
  webseite: {},
  brett: {},
};

export type VideoLang = "de" | "tr";

/** Sitenin diline göre önce hangi video: Türkçe sayfada Türkçe, diğerlerinde Almanca; yoksa öbürü */
export function pickVideo(key: BetriebKey, locale: string, prefer?: VideoLang) {
  const v = betriebVideos[key];
  const first: VideoLang = prefer ?? (locale === "tr" ? "tr" : "de");
  const second: VideoLang = first === "tr" ? "de" : "tr";
  if (v[first]) return { url: v[first]!, lang: first };
  if (v[second]) return { url: v[second]!, lang: second };
  return null;
}

/** Cloudinary videosundan kapak resmi: 8. saniyedeki kare, küçültülmüş jpg */
export function posterOf(url: string, second = 8) {
  return url.replace("/video/upload/", `/video/upload/so_${second},w_1280,q_auto/`).replace(/\.mp4$/, ".jpg");
}
