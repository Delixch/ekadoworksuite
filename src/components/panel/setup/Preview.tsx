"use client";

import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { useLocale } from "@/i18n/useLocale";
import type { SetupConfig } from "@/lib/panel/types";
import { usePanel } from "../context";
import { fmtMoney } from "../format";
import { Avatar, ChannelIcon, LiveDot } from "../ui";
import { toneTier } from "./shared";

/** Telefon kartı: kişilik adı, karşılama ve üsluba göre değişen örnek yanıt */
export function Preview({ cfg, className = "" }: { cfg: SetupConfig; className?: string }) {
  const t = usePT(setupT).preview;
  const { locale } = useLocale();
  const { hotel } = usePanel();
  const tier = toneTier(cfg.persona.tone);
  const first = cfg.knowledge.rooms[0];
  const price = first ? fmtMoney(first.pricePerNight, hotel.currency, locale) : t.fallbackPrice;
  let reply = t.sample[tier].replace("{price}", price);
  if (cfg.persona.emoji && tier === 2) reply += " 😊";
  const channel = (["whatsapp", "instagram", "messenger", "web", "phone"] as const).find((ch) => cfg.channels[ch].connected) ?? "whatsapp";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase">{t.title}</div>
      <div className="era-float w-full max-w-[290px] rounded-[34px] bg-era-device p-2.5 shadow-[0_24px_50px_var(--c-shadow)]">
        <div className="flex min-h-[430px] flex-col overflow-hidden rounded-[26px] bg-era-white">
          <div className="flex items-center gap-2.5 bg-era-primary px-3.5 py-3 text-era-on-dark">
            <Avatar name={cfg.persona.name || "?"} size={34} className="!bg-era-on-dark/20 !text-era-on-dark" />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[14px] font-bold">{cfg.persona.name || "—"}</div>
              <div className="flex items-center gap-1.5 text-[11px] opacity-85">
                <LiveDot /> {t.online}
              </div>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-era-white">
              <ChannelIcon channel={channel} size={16} />
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 bg-era-secondary p-3 text-[13px] leading-snug">
            <div className="setup-bubble max-w-[85%] self-start rounded-2xl rounded-tl-md bg-era-white px-3 py-2 text-era-black shadow-sm">{cfg.persona.greeting}</div>
            <div className="setup-bubble max-w-[85%] self-end rounded-2xl rounded-tr-md bg-era-primary px-3 py-2 text-era-on-dark [animation-delay:.25s]">{t.guest}</div>
            <div key={tier + String(cfg.persona.emoji)} className="setup-bubble max-w-[88%] self-start rounded-2xl rounded-tl-md bg-era-white px-3 py-2 text-era-black shadow-sm [animation-delay:.5s]">
              {reply}
            </div>
            <div className="setup-typing mt-auto flex gap-1 self-start px-2 text-era-matte" aria-hidden>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
      <p className="max-w-[270px] text-center text-[12px] leading-snug text-era-gray">{t.hint}</p>
    </div>
  );
}
