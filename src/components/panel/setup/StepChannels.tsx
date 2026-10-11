"use client";

import { useEffect, useRef, useState } from "react";
import { commonT } from "@/i18n/panel/common";
import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { connectChannel } from "@/lib/panel/api";
import { CHANNELS, type Channel } from "@/lib/panel/types";
import { Btn, ChannelIcon, Chip, Input, Spinner } from "../ui";
import { CheckMark, Lead, type StepProps } from "./shared";

export function StepChannels({ cfg, change }: StepProps) {
  const t = usePT(setupT).channels;
  const c = usePT(commonT);
  const [busy, setBusy] = useState<Partial<Record<Channel, boolean>>>({});
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const setHandle = (ch: Channel, handle: string) =>
    change((x) => ({ ...x, channels: { ...x.channels, [ch]: { ...x.channels[ch], handle } } }));

  const connect = async (ch: Channel) => {
    setBusy((b) => ({ ...b, [ch]: true }));
    // BAĞLANTI NOKTASI: gerçek OAuth / webhook kurulumu api.ts > connectChannel içinde yapılır
    const r = await connectChannel(ch, cfg.channels[ch].handle);
    if (!alive.current) return;
    setBusy((b) => ({ ...b, [ch]: false }));
    change((x) => ({ ...x, channels: { ...x.channels, [ch]: { connected: r.ok, handle: r.handle } } }));
  };
  const disconnect = (ch: Channel) =>
    change((x) => ({ ...x, channels: { ...x.channels, [ch]: { ...x.channels[ch], connected: false } } }));

  return (
    <div>
      <Lead>{t.lead}</Lead>
      <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
        {CHANNELS.map((ch, i) => {
          const s = cfg.channels[ch];
          const loading = !!busy[ch];
          return (
            <div
              key={ch}
              style={{ animationDelay: `${i * 60}ms` }}
              className={`setup-step flex flex-col gap-3 rounded-(--r-r) border p-4 transition-colors duration-500 ${
                s.connected ? "border-era-success bg-[color-mix(in_oklab,var(--c-success)_8%,var(--c-surface))]" : "border-era-lightgray bg-era-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-secondary">
                  <ChannelIcon channel={ch} size={22} />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[15px] font-bold text-era-black">{c.channels[ch]}</div>
                  <div className="truncate text-[12px] text-era-gray">{t.desc[ch]}</div>
                </div>
                {s.connected ? (
                  <Chip tone="success" className="setup-ring-pop">
                    <CheckMark size={12} /> {t.connected}
                  </Chip>
                ) : (
                  <Chip>{t.notConnected}</Chip>
                )}
              </div>
              <Input
                value={s.handle}
                onChange={(e) => setHandle(ch, e.target.value)}
                placeholder={t.handle[ch]}
                aria-label={t.handle[ch]}
                disabled={s.connected || loading}
              />
              {s.connected ? (
                <Btn variant="ghost" size="sm" onClick={() => disconnect(ch)}>
                  {t.disconnect}
                </Btn>
              ) : (
                <Btn size="sm" onClick={() => connect(ch)} disabled={loading || !s.handle.trim()}>
                  {loading ? (
                    <>
                      <Spinner size={14} /> {t.connecting}
                    </>
                  ) : (
                    t.connect
                  )}
                </Btn>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
