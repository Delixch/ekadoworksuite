/**
 * Modül sayfalarının (/modul/...) videoları.
 *
 * Videolar: VideoEditMaster/projects/ekado-sunum3/renders/teile içindeki 9 bölüm (TR + DE), Cloudinary'de.
 * Yeni link gelince SADECE `parts` içine yazılır; sayfalar kendiliğinden kullanır.
 * Bir parça birkaç modülde kullanılabilir: her modül kendi konusunun başladığı saniyeye atlar.
 * Saniyeler remotion/timeline_{tr,de}.ts içindeki konuşma başlangıcından hesaplandı (bölüm başına göre).
 */
export type ModuleId = "uebersicht-betrieb" | "einkauf" | "personal" | "finanzen";
export type VideoLang = "de" | "tr" | "en";

/** 01 Panel, 02 Yeni çalışan, 03 Vardiya planı, 04 İş günü, 05 Çalışan istekleri, 06 Günlük işler, 07 Satın alma, 08 Para, 09 Kapanış,
 *  10 Saha işleri, 11 Depo ve sabit giderler, 12 Hastalık/zaman/dosyalar, 13 Banka/KDV/Lohnausweis/müşavir (10-13: ekado-sunum4, açılış kartı 3 sn) */
export const parts: Record<number, Partial<Record<VideoLang, string>>> = {
  1: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792053847/1a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792053878/1t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792077950/1e.mp4",
  },
  2: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792055779/2a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792055857/2t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792077954/2e.mp4",
  },
  /*
   * 3-13: GEÇİCİ olarak yerelde (public/_videolar/, git'e girmez, kapak resmi aynı adla .jpg).
   * Adnan Cloudinary'ye yükleyince buraya Cloudinary linki yazılır; "a" = Almanca, "t" = Türkçe.
   * 10-13 yeni bölümler: VideoEditMaster/projects/ekado-sunum4 (saha işleri, depo ve sabit giderler, hastalık/zaman/dosyalar, banka/KDV/Lohnausweis/müşavir).
   */
  3: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066335/3a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066350/3t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792077958/3e.mp4",
  },
  4: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066354/4a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066358/4t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792077961/4e.mp4",
  },
  5: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066362/5a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066365/5t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792077964/5e.mp4",
  },
  6: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066369/6a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066373/6t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792077967/6e.mp4",
  },
  7: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066377/7a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066380/7t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792079709/7e.mp4",
  },
  8: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066385/8a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066390/8t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792079712/8e.mp4",
  },
  9: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066393/9a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792066397/9t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792079716/9e.mp4",
  },
  10: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070798/10a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070802/10t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792079719/10e.mp4",
  },
  11: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070805/11a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070808/11t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792080492/11e.mp4",
  },
  12: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070812/12a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070816/12t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792080496/12e.mp4",
  },
  13: {
    de: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070818/13a.mp4",
    tr: "https://res.cloudinary.com/ixyonosn/video/upload/v1792070821/13t.mp4",
    en: "https://res.cloudinary.com/ixyonosn/video/upload/v1792080503/13e.mp4",
  },
};

export type Film = {
  /** parts içindeki numara; null = henüz videosu yok */
  part: number | null;
  /** bu videonun cevapladığı sorular (metin dosyasındaki item anahtarları) */
  covers: string[];
  /** sorunun videoda başladığı saniye, dile göre */
  at: Record<string, { de: number; tr: number; en?: number }>;
};

export const moduleFilms: Record<ModuleId, Film[]> = {
  "uebersicht-betrieb": [
    { part: 1, covers: ["uebersicht"], at: {} },
    { part: 3, covers: ["schichtplan"], at: {} },
    { part: 4, covers: ["stempeluhr"], at: {} },
    { part: 6, covers: ["hygiene", "brett"], at: { hygiene: { de: 0, tr: 0, en: 0 }, brett: { de: 103, tr: 98, en: 101 } } },
    { part: 9, covers: ["vitrine", "treuekarte", "webseite", "anpassen"], at: { vitrine: { de: 0, tr: 0, en: 0 }, treuekarte: { de: 17, tr: 16, en: 17 }, webseite: { de: 42, tr: 39, en: 39 }, anpassen: { de: 63, tr: 60, en: 58 } } },
    { part: 10, covers: ["einsaetze"], at: { einsaetze: { de: 3, tr: 3, en: 3 } } },
  ],
  einkauf: [
    {
      part: 7,
      covers: ["lieferanten", "bestellen", "lieferung", "rechnung", "zahlung"],
      at: { lieferanten: { de: 0, tr: 0, en: 0 }, bestellen: { de: 12, tr: 13, en: 12 }, lieferung: { de: 47, tr: 51, en: 46 }, rechnung: { de: 64, tr: 68, en: 62 }, zahlung: { de: 89, tr: 93, en: 85 } },
    },
    { part: 5, covers: ["wunsch"], at: { wunsch: { de: 43, tr: 41, en: 42 } } },
    { part: 11, covers: ["lager", "fixkosten"], at: { lager: { de: 3, tr: 3, en: 3 }, fixkosten: { de: 60, tr: 59, en: 61 } } },
    { part: null, covers: ["preise"], at: {} },
  ],
  personal: [
    {
      part: 2,
      covers: ["neu", "pin", "sicht", "pruefen", "nachforderung"],
      at: { neu: { de: 0, tr: 0, en: 0 }, pin: { de: 9, tr: 8, en: 12 }, sicht: { de: 32, tr: 31, en: 39 }, pruefen: { de: 53, tr: 52, en: 59 }, nachforderung: { de: 80, tr: 79, en: 83 } },
    },
    {
      part: 5,
      covers: ["urlaub", "vorschuss", "vorschlag", "genehmigen"],
      at: { urlaub: { de: 0, tr: 0, en: 0 }, vorschuss: { de: 19, tr: 17, en: 18 }, vorschlag: { de: 31, tr: 29, en: 30 }, genehmigen: { de: 57, tr: 55, en: 56 } },
    },
    { part: 4, covers: ["karte"], at: { karte: { de: 96, tr: 90, en: 95 } } },
    { part: 8, covers: ["lohn", "lohnpdf"], at: { lohn: { de: 57, tr: 53, en: 59 }, lohnpdf: { de: 108, tr: 103, en: 107 } } },
    { part: 12, covers: ["krank", "zeitkonto", "akten"], at: { krank: { de: 3, tr: 3, en: 3 }, zeitkonto: { de: 40, tr: 43, en: 40 }, akten: { de: 60, tr: 62, en: 59 } } },
  ],
  finanzen: [
    {
      part: 8,
      covers: ["kasse", "kassensturz", "finanzuebersicht", "lohnlauf", "belege", "abschluss", "journal"],
      at: {
        kasse: { de: 0, tr: 0, en: 0 },
        kassensturz: { de: 16, tr: 16, en: 18 },
        finanzuebersicht: { de: 42, tr: 40, en: 45 },
        lohnlauf: { de: 57, tr: 53, en: 59 },
        belege: { de: 122, tr: 115, en: 118 },
        abschluss: { de: 136, tr: 128, en: 131 },
        journal: { de: 147, tr: 137, en: 141 },
      },
    },
    { part: 7, covers: ["kreditoren"], at: { kreditoren: { de: 64, tr: 68, en: 62 } } },
    {
      part: 13,
      covers: ["bank", "mwst", "lohnausweis", "treuhand"],
      at: { bank: { de: 3, tr: 3, en: 3 }, mwst: { de: 41, tr: 41, en: 37 }, lohnausweis: { de: 61, tr: 62, en: 56 }, treuhand: { de: 75, tr: 76, en: 70 } },
    },
  ],
};

/** Sitenin diline göre önce hangi video: tr → TR, en → EN, de → DE; yoksa sırayla DE, EN, TR */
export function pickPart(part: number | null, locale: string, prefer?: VideoLang) {
  if (part == null) return null;
  const v = parts[part] ?? {};
  const order: VideoLang[] = [prefer ?? (locale === "tr" ? "tr" : locale === "en" ? "en" : "de"), "de", "en", "tr"];
  const lang = order.find((l) => v[l]);
  return lang ? { url: v[lang]!, lang } : null;
}

/** Bu parçanın hangi dilleri var (oynatıcıdaki dil düğmeleri için) */
export const langsOf = (part: number | null): VideoLang[] => (part == null ? [] : (["tr", "de", "en"] as const).filter((l) => !!parts[part]?.[l]));

/** Cloudinary videosundan kapak resmi: 8. saniyedeki kare, küçültülmüş jpg */
export function posterOf(url: string, second = 8) {
  return url.replace("/video/upload/", `/video/upload/so_${second},w_1280,q_auto/`).replace(/\.mp4$/, ".jpg");
}
