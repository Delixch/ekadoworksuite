"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Clock, Landmark, ShoppingCart, Thermometer, type LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Spot } from "./Spot";
import { Heading, Reveal } from "./ui";

/** Kart başına bağlantı: menüdeki modül bağlantıları kartlara iner, "Bilgi al" iletişim penceresini konuyla açar */
const ids = ["isletme", "satinalma", "personel", "finans"];
const hrefs = ["#bize-ulasin", "#bize-ulasin", "#bize-ulasin", "#bize-ulasin"];

/* ---- mini canlı görsel: modül ikonu, halka nabız atar ---- */
function IconViz({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center text-era-on-dark" aria-hidden>
      <span className="era-ring absolute inset-0 rounded-full bg-era-primary/40" />
      <Icon size={30} strokeWidth={1.8} className="relative" />
    </div>
  );
}

const visuals: ReactNode[] = [Thermometer, ShoppingCart, Clock, Landmark].map((Icon, i) => <IconViz key={i} icon={Icon} />);

/** Çözümlerimiz (menü ağacındaki 4 çözüm). Bölüm iki temada da koyu kalır. */
export function Solutions() {
  const { t } = useLocale();
  const s = t.solutions;
  // Kartların arkasında gezinen tek ışık katmanı: fare bir karttan ötekine geçince kayarak ona gider.
  const [glow, setGlow] = useState<{ x: number; y: number; w: number; h: number; slide: boolean } | null>(null);
  const wasVisible = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideGlow = () => {
    clearTimeout(timer.current);
    wasVisible.current = false;
    setGlow(null);
  };
  // fare: kartın üstündeyken; dokunma: sadece gerçek dokunuşta (kaydırma sayılmaz), birkaç saniye sonra söner
  const showGlow = (el: HTMLElement, touch: boolean) => {
    clearTimeout(timer.current);
    setGlow({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight, slide: wasVisible.current });
    wasVisible.current = true;
    if (touch) timer.current = setTimeout(hideGlow, 2800);
  };
  // yerleşim değişince (döndürme, yeniden boyutlandırma) ölçü eskir: gizle
  useEffect(() => {
    const onResize = () => {
      clearTimeout(timer.current);
      wasVisible.current = false;
      setGlow(null);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <section id="cozumler" className="relative bg-era-dark py-[100px] text-era-on-dark tab:py-[60px] mob:py-12 sm2:py-10">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-14 mob:gap-10">
          <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-on-dark/12 px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-on-dark uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {s.eyebrow}
            </span>
            <Heading>{s.heading}</Heading>
            <Reveal variant="fade">
              <p className="text-era-silver">{s.lead}</p>
            </Reveal>
          </div>

          <div className="relative grid grid-cols-4 gap-6 tab:grid-cols-2 mob:grid-cols-1" onPointerLeave={(e) => { if (e.pointerType === "mouse") hideGlow(); }}>
            <span
              aria-hidden
              className="pointer-events-none absolute z-0 rounded-[34px] border border-era-on-dark/25 bg-era-on-dark/10"
              style={{
                left: (glow?.x ?? 0) - 12,
                top: (glow?.y ?? 0) - 12,
                width: (glow?.w ?? 0) + 24,
                height: (glow?.h ?? 0) + 24,
                opacity: glow ? 1 : 0,
                transition: glow?.slide
                  ? "left .35s cubic-bezier(.22,1,.36,1), top .35s cubic-bezier(.22,1,.36,1), width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), opacity .2s"
                  : "opacity .2s",
              }}
            />
            {s.cards.map((c, i) => (
              <div
                key={c.title}
                className="relative z-[1] h-full"
                onPointerEnter={(e) => { if (e.pointerType === "mouse") showGlow(e.currentTarget, false); }}
                onPointerUp={(e) => { if (e.pointerType !== "mouse") showGlow(e.currentTarget, true); }}
              >
              <Reveal variant="up" delay={i * 110} className="h-full">
                <Spot className="ekado-dark-card flex h-full scroll-mt-28 flex-col gap-5 rounded-(--r-x) p-6">
                  <span id={ids[i]} className="-mt-24 block h-0 pt-24" aria-hidden />
                  <div className="relative z-[1] flex h-[96px] items-center justify-center overflow-hidden rounded-(--r-s1) bg-era-dark/70 ring-1 ring-era-on-dark/10">
                    {visuals[i]}
                  </div>
                  <div className="relative z-[1] flex flex-1 flex-col gap-2">
                    <h3 className="text-[21px] leading-[1.2] font-bold tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-[15px] leading-[1.55] text-era-silver">{c.text}</p>
                  </div>
                  <a
                    href={hrefs[i]}
                    data-topic={hrefs[i] === "#bize-ulasin" ? i : undefined}
                    className="group/more relative z-[1] mt-1 flex w-fit items-center gap-2 text-[15px] font-semibold text-era-on-dark no-underline"
                  >
                    {s.more}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/more:translate-x-1.5" />
                  </a>
                </Spot>
              </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
