"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Building2,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  Globe,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { siWhatsapp } from "simple-icons";

/** Tasarım boyutu (px). Gerçek genişliğe göre ölçeklenir. */
const W = 780;
const H = 520;

function useScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

const menu = [
  [LayoutGrid, "Genel Bakış", true],
  [MessageSquare, "Mesajlar"],
  [Phone, "Aramalar"],
  [ClipboardList, "Misafir Talepleri"],
  [Users, "Müşteriler"],
  [Bell, "Hatırlatmalar"],
  [Megaphone, "Kampanyalar"],
  [Sparkles, "Geliştirme"],
  [Settings, "Ayarlar"],
] as const;

const tabs = ["Bugün", "7 gün", "30 gün", "Özel"];

function Laptop() {
  return (
    <div className="absolute top-0 right-0" style={{ width: 640, height: 470 }}>
      {/* ekran çerçevesi */}
      <div
        className="absolute inset-x-0 top-0 overflow-hidden rounded-[18px] border-[7px] border-era-device bg-era-device shadow-[0_30px_60px_-20px_var(--c-shadow)]"
        style={{ height: 410 }}
      >
        <div className="flex h-full overflow-hidden rounded-[10px] bg-era-white text-era-black">
          {/* kenar çubuğu */}
          <aside className="flex w-[118px] flex-none flex-col gap-1.5 bg-era-dark px-2.5 py-3 text-era-on-dark">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-era-primary text-[11px] font-bold">p</span>
              <span className="text-[11px] font-semibold tracking-wide">unn</span>
            </div>
            {menu.map(([Icon, label, active]) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-[5px] text-[8.5px] ${
                  active ? "bg-era-on-dark/15 font-semibold" : "text-era-on-dark/75"
                }`}
              >
                <Icon size={10} />
                {label}
              </div>
            ))}
            <div className="mt-auto flex items-center gap-1.5 text-[8px] text-era-on-dark/80">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-era-on-dark/20 text-[7px] font-bold">SY</span>
              Sistem Yöneticisi
              <ChevronDown size={8} />
            </div>
          </aside>

          {/* ana alan */}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 bg-era-secondary p-3">
            <div className="flex items-center justify-between text-[9px]">
              <span className="flex items-center gap-1 font-semibold">
                <LayoutGrid size={10} /> Genel Bakış
              </span>
              <span className="flex items-center gap-2 text-[8px]">
                <span className="flex items-center gap-1">
                  <i className="block h-1.5 w-1.5 rounded-full bg-era-success" /> AI Açık
                </span>
                <span className="flex h-3.5 w-7 items-center justify-end rounded-full bg-era-success px-0.5">
                  <i className="block h-2.5 w-2.5 rounded-full bg-era-on-dark" />
                </span>
                <span className="flex items-center gap-1 rounded-md bg-era-white px-1.5 py-0.5">
                  <Globe size={8} /> Türkçe
                </span>
              </span>
            </div>

            {/* otel kartı */}
            <div className="overflow-hidden rounded-xl bg-era-white shadow-[0_2px_10px_var(--c-shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sites/punn/hotel-lobby.jpg" alt="" className="h-[92px] w-full object-cover" />
              <div className="flex items-center gap-2 px-2.5 py-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-era-secondary text-era-primary-ink">
                  <Building2 size={13} />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold">Otel</div>
                  <div className="text-[7.5px] text-era-gray">Dijital resepsiyon 7/24 · AI otomatik cevaplama açık</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold tracking-tight">İyi geceler</span>
              <span className="flex items-center gap-1 text-[8px]">
                {tabs.map((t, i) => (
                  <span
                    key={t}
                    className={`rounded-md px-1.5 py-[3px] ${i === 0 ? "bg-era-btn font-semibold text-era-on-btn" : "text-era-gray"}`}
                  >
                    {t}
                  </span>
                ))}
              </span>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] gap-2">
              <div className="flex flex-col justify-between rounded-xl bg-era-primary p-2.5 text-era-on-dark">
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[7.5px] opacity-90">
                    <i className="block h-1.5 w-1.5 rounded-full bg-era-success" /> AI otomatik cevaplama açık
                  </div>
                  <div className="text-[12.5px] leading-tight font-bold">128 mesaj, 70 arama cevaplandı</div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[7px] opacity-90">
                  <span>Ort. AI yanıt süresi<b className="block text-[9px]">—</b></span>
                  <span>Onay bekleyen<b className="block text-[9px]">8 dk</b></span>
                  <span>Misafir memnuniyeti<b className="block text-[9px]">0 dk</b></span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 rounded-xl bg-era-white p-2.5">
                <div className="text-[8.5px] font-semibold">Dikkatinizi bekleyenler</div>
                <div className="text-[7px] text-era-gray">Alım talebi bekleyen yer</div>
                <div className="mt-auto flex flex-col items-center gap-0.5 rounded-lg bg-era-secondary py-2 text-center">
                  <Sparkles size={11} className="text-era-primary-ink" />
                  <span className="text-[8px] font-semibold">Her şey yolunda</span>
                  <span className="px-1 text-[6.5px] text-era-gray">Ekibinizin ilgilenmesi gereken bir şey yok.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* taban */}
      <div className="absolute right-[-18px] left-[-18px] bg-era-device" style={{ top: 410, height: 12, borderRadius: "0 0 18px 18px" }} />
      <div className="absolute left-1/2 -translate-x-1/2 bg-era-device/70" style={{ top: 422, width: 160, height: 5, borderRadius: "0 0 8px 8px" }} />
    </div>
  );
}

function Phone3() {
  return (
    <div
      className="absolute bottom-0 left-0 overflow-hidden rounded-[30px] border-[7px] border-era-device bg-era-device shadow-[0_30px_60px_-18px_var(--c-shadow)]"
      style={{ width: 200, height: 410 }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[22px] bg-era-secondary text-era-black">
        <div className="mx-auto mt-1 h-3 w-14 rounded-full bg-era-device" />
        <div className="flex items-center gap-1.5 bg-era-white px-2 py-1.5">
          <ChevronLeft size={11} />
          <div className="leading-tight">
            <div className="text-[8.5px] font-semibold">Dijital Resepsiyonist</div>
            <div className="text-[6.5px] text-era-success">● Çevrimiçi</div>
          </div>
          <svg viewBox="0 0 24 24" className="ml-auto h-5 w-5 rounded-full bg-era-whatsapp p-[3px]" aria-hidden>
            <path d={siWhatsapp.path} fill="var(--c-on-dark)" />
          </svg>
        </div>
        <div className="flex flex-1 flex-col gap-2 px-2 py-2.5">
          <div className="max-w-[85%] self-start rounded-xl rounded-tl-sm bg-era-white px-2 py-1.5 text-[8px] leading-snug shadow-[0_1px_4px_var(--c-shadow-soft)]">
            Merhaba, iki kişilik odanız var mı?
            <div className="mt-0.5 text-right text-[6px] text-era-gray">10:24</div>
          </div>
          <div className="max-w-[92%] self-end rounded-xl rounded-tr-sm bg-era-primary px-2 py-1.5 text-[8px] leading-snug text-era-on-dark">
            Merhaba! Hangi tarihlerde konaklamayı düşünüyorsunuz? Yetişkin sayısı ve varsa çocuk yaşlarını rica edeceğim.
            <div className="mt-0.5 flex items-center justify-end gap-0.5 text-[6px] opacity-80">
              10:24 <CheckCheck size={8} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-era-white px-2 py-1.5">
          <Plus size={11} className="text-era-primary-ink" />
          <span className="flex-1 rounded-full bg-era-secondary px-2 py-1 text-[7px] text-era-gray">Mesaj yazın...</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-era-primary text-era-on-dark">
            <Send size={8} />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Hero sağ taraf: laptop paneli ve telefon sohbeti (kodla çizilmiş, iki temada da çalışır) */
export function HeroMockup() {
  const { ref, scale } = useScale();
  return (
    <div ref={ref} className="era-in-rise relative w-full min-w-0 overflow-hidden" style={{ height: H * scale }} aria-hidden>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }} className="absolute top-0 left-0">
        <Laptop />
        <Phone3 />
      </div>
    </div>
  );
}
