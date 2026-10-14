"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const delay = (s: number) => ({ animationDelay: `${s}s` });

/** Telefonda sırayla yukarı kayan çalışan ekranları (gerçek görüntüler, demo verisiyle) */
const slides = [
  { src: "/sites/ekado/phone-zeiten.jpg", chip: "Stempeluhr", alt: "Ekado WorkSuite auf dem Handy: Mitarbeiter stempelt ein" },
  { src: "/sites/ekado/phone-uebersicht.jpg", chip: "Übersicht", alt: "Ekado WorkSuite auf dem Handy: Übersicht des Mitarbeiters" },
  { src: "/sites/ekado/phone-haccp.jpg", chip: "HACCP", alt: "Ekado WorkSuite auf dem Handy: HACCP Temperaturkontrolle" },
];

/** Laptopta sırayla geçen yönetici paneli ekranları (gerçek görüntüler, demo verisiyle) */
const panels = [
  { src: "/sites/ekado/panel-uebersicht.jpg", alt: "Ekado WorkSuite Übersicht: Mitarbeiter, Umsatz, offene Rechnungen" },
  { src: "/sites/ekado/panel-schichtplan.jpg", alt: "Ekado WorkSuite Schichtplanung mit Wochenansicht" },
  { src: "/sites/ekado/panel-kasse.jpg", alt: "Ekado WorkSuite Kasse: Tagesumsatz nach Zahlungsart" },
  { src: "/sites/ekado/panel-finanzen.jpg", alt: "Ekado WorkSuite Finanzübersicht: Einnahmen, Ausgaben, Erfolgsrechnung" },
  { src: "/sites/ekado/panel-kreditoren.jpg", alt: "Ekado WorkSuite Kreditoren: Eingangsrechnungen und Fälligkeiten" },
  { src: "/sites/ekado/panel-abschluss.jpg", alt: "Ekado WorkSuite Monatsabschluss" },
];
const PANEL_MS = 5200;

const SHOW_MS = 4200;
const RISE_MS = 900;

function PhoneSlides({ onSlide }: { onSlide: (i: number) => void }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((x) => (x + 1) % slides.length), SHOW_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    onSlide(idx);
  }, [idx, onSlide]);

  const n = slides.length;
  return (
    <div className="relative w-full overflow-hidden rounded-[22px] bg-era-white" style={{ aspectRatio: "378 / 843" }}>
      {slides.map((s, i) => {
        const pos = (i - idx + n) % n; // 0: görünen, 1: sıradaki (altta), n-1: az önce çıkan (üstte)
        const y = pos === 0 ? 0 : pos === n - 1 ? -100 : 100;
        return (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={378}
            height={843}
            className="absolute inset-0 block h-full w-full"
            style={{
              transform: `translateY(${y}%)`,
              transition: pos === 0 || pos === n - 1 ? `transform ${RISE_MS}ms cubic-bezier(.45,.05,.55,.95)` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Hero görseli: Ekado WorkSuite'in gerçek ekran görüntüleri (demo verisiyle, api.adodesign.ch).
 * Laptop: Finanzübersicht (Buchhaltung). Yatık telefon: çalışanın ekranları sırayla yukarı kayar.
 */
export function HeroPanel() {
  const [active, setActive] = useState(0);
  const [panel, setPanel] = useState(0);

  useEffect(() => {
    if (panels.length < 2) return;
    const id = setInterval(() => setPanel((x) => (x + 1) % panels.length), PANEL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-[760px] pb-24 sm2:pb-16">
      <div
        className="era-in-pop absolute top-0 left-4 z-[3] flex items-center gap-3 rounded-(--r-s1) border border-era-line bg-era-white px-4 py-2.5 shadow-[0_12px_40px_var(--c-shadow)] sm2:left-2"
        style={delay(0.5)}
      >
        <span className="text-[15px] font-semibold tracking-wide text-era-black">Buchhaltung</span>
      </div>

      <div
        className="era-in-up mt-8 ml-[8%] overflow-hidden rounded-(--r-x) border-[6px] border-era-device bg-era-white shadow-[0_24px_70px_var(--c-shadow)]"
        style={delay(0.35)}
      >
        <div className="relative" style={{ aspectRatio: "1400 / 853" }}>
          {panels.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={1400}
              height={853}
              className="absolute inset-0 block h-full w-full transition-opacity duration-700"
              style={{ opacity: i === panel ? 1 : 0 }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 ml-[8%] flex items-center justify-center gap-2" role="tablist" aria-label="Ekran görüntüleri">
        {panels.map((p, i) => (
          <button
            key={p.src}
            type="button"
            role="tab"
            aria-selected={i === panel}
            aria-label={`${i + 1} / ${panels.length}`}
            onClick={() => setPanel(i)}
            className={`h-2.5 w-2.5 rounded-[3px] border transition-colors duration-300 ${
              i === panel ? "border-era-primary bg-era-primary" : "border-era-cute bg-transparent hover:border-era-primary"
            }`}
          />
        ))}
      </div>

      <div
        className="era-in-up absolute bottom-6 left-0 z-[2] w-[22%] min-[992px]:-translate-x-12 rotate-[8.5deg] overflow-hidden rounded-[30px] border-[7px] border-era-device bg-era-device shadow-[0_30px_60px_-18px_var(--c-shadow)]"
        style={{ ...delay(0.7), transformOrigin: "50% 100%" }}
      >
        <PhoneSlides onSlide={setActive} />
      </div>

      <div
        className="absolute bottom-0 left-0 z-[2] flex w-[22%] min-[992px]:-translate-x-12 rotate-[8.5deg] gap-1"
        style={{ transformOrigin: "50% -14px" }}
      >
        {slides.map((s, i) => (
          <span
            key={s.chip}
            className={`flex-1 rounded-full px-1 py-1 text-center text-[8px] font-semibold whitespace-nowrap transition-colors duration-300 ${
              i === active ? "bg-era-primary text-era-on-dark" : "bg-era-white text-era-gray ring-1 ring-era-line"
            }`}
          >
            {s.chip}
          </span>
        ))}
      </div>
    </div>
  );
}
