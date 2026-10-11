"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CalendarDays, DoorOpen, Server } from "lucide-react";
import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { testIntegration } from "@/lib/panel/api";
import { Btn, Chip, Field, Input, Select, Spinner, Toggle } from "../ui";
import { CheckMark, Lead, type StepProps } from "./shared";

type Kind = "pms" | "lock" | "calendar";

function IntegrationCard({
  icon,
  title,
  hint,
  connected,
  children,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  hint: string;
  connected: boolean;
  children: ReactNode;
  delay?: number;
}) {
  const t = usePT(setupT).integrations;
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`setup-step flex flex-col gap-4 rounded-(--r-r) border p-5 transition-colors duration-500 ${
        connected ? "border-era-success bg-[color-mix(in_oklab,var(--c-success)_7%,var(--c-surface))]" : "border-era-lightgray bg-era-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">{icon}</span>
        <div className="min-w-0 flex-1 leading-tight">
          <h4 className="text-[16px] font-bold text-era-black">{title}</h4>
          <p className="mt-1 text-[13px] leading-snug text-era-gray">{hint}</p>
        </div>
        {connected && (
          <Chip tone="success" className="setup-ring-pop">
            <CheckMark size={12} /> {t.connected}
          </Chip>
        )}
      </div>
      {children}
    </div>
  );
}

export function StepIntegrations({ cfg, change }: StepProps) {
  const t = usePT(setupT).integrations;
  const i = cfg.integrations;
  const [busy, setBusy] = useState<Partial<Record<Kind, boolean>>>({});
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const patch = (p: Partial<typeof i>) => change((c) => ({ ...c, integrations: { ...c.integrations, ...p } }));

  const test = async (kind: Kind, provider: string) => {
    setBusy((b) => ({ ...b, [kind]: true }));
    // BAĞLANTI NOKTASI: sağlayıcı kimlik doğrulaması sunucuda yapılır (api.ts > testIntegration)
    const r = await testIntegration(kind, provider);
    if (!alive.current) return;
    setBusy((b) => ({ ...b, [kind]: false }));
    change((c) => ({
      ...c,
      integrations: {
        ...c.integrations,
        [kind]: { ...c.integrations[kind], connected: r.ok },
      },
    }));
  };

  const spin = (label: string, on?: boolean) =>
    on ? (
      <>
        <Spinner size={14} /> {t.testing}
      </>
    ) : (
      label
    );

  return (
    <div>
      <Lead>{t.lead}</Lead>
      <div className="flex flex-col gap-4">
        {/* PMS */}
        <IntegrationCard icon={<Server size={20} />} title={t.pms} hint={t.pmsHint} connected={i.pms.connected}>
          <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
            <Field label={t.provider}>
              <Select
                value={i.pms.provider}
                onChange={(e) => patch({ pms: { ...i.pms, provider: e.target.value as typeof i.pms.provider, connected: false } })}
              >
                {(Object.keys(t.providers) as (keyof typeof t.providers)[]).map((p) => (
                  <option key={p} value={p}>
                    {t.providers[p]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label={t.apiKey} hint={t.apiKeyHint}>
              <Input
                type="password"
                autoComplete="off"
                value={i.pms.apiKey}
                disabled={i.pms.provider === "none"}
                onChange={(e) => patch({ pms: { ...i.pms, apiKey: e.target.value, connected: false } })}
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <Btn size="sm" onClick={() => test("pms", i.pms.provider)} disabled={i.pms.provider === "none" || !i.pms.apiKey.trim() || !!busy.pms}>
              {spin(t.test, busy.pms)}
            </Btn>
            {i.pms.connected && (
              <Btn size="sm" variant="ghost" onClick={() => patch({ pms: { ...i.pms, connected: false } })}>
                {t.disconnect}
              </Btn>
            )}
          </div>
        </IntegrationCard>

        {/* akıllı kilit */}
        <IntegrationCard icon={<DoorOpen size={20} />} title={t.lock} hint={t.lockHint} connected={i.lock.connected} delay={70}>
          <div className="grid grid-cols-2 items-end gap-4 mob:grid-cols-1">
            <Field label={t.provider}>
              <Select
                value={i.lock.provider}
                onChange={(e) => patch({ lock: { ...i.lock, provider: e.target.value as typeof i.lock.provider, connected: false } })}
              >
                {(Object.keys(t.lockProviders) as (keyof typeof t.lockProviders)[]).map((p) => (
                  <option key={p} value={p}>
                    {t.lockProviders[p]}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="flex gap-2">
              <Btn size="sm" onClick={() => test("lock", i.lock.provider)} disabled={i.lock.provider === "none" || !!busy.lock}>
                {spin(t.test, busy.lock)}
              </Btn>
              {i.lock.connected && (
                <Btn size="sm" variant="ghost" onClick={() => patch({ lock: { ...i.lock, connected: false } })}>
                  {t.disconnect}
                </Btn>
              )}
            </div>
          </div>
          <div className={`flex items-start gap-3 rounded-(--r-s1) bg-era-secondary p-3 transition-opacity ${i.lock.provider === "none" ? "opacity-50" : ""}`}>
            <Toggle checked={i.lock.autoSendCode} onChange={(v) => patch({ lock: { ...i.lock, autoSendCode: v } })} label={t.autoSend} />
            <div className="leading-snug">
              <div className="text-[14px] font-semibold text-era-black">{t.autoSend}</div>
              <div className="text-[12px] text-era-gray">{t.autoSendHint}</div>
            </div>
          </div>
        </IntegrationCard>

        {/* takvim */}
        <IntegrationCard icon={<CalendarDays size={20} />} title={t.calendar} hint={t.calendarHint} connected={i.calendar.connected} delay={140}>
          <div className="flex gap-2">
            {i.calendar.connected ? (
              <Btn size="sm" variant="ghost" onClick={() => patch({ calendar: { connected: false } })}>
                {t.disconnect}
              </Btn>
            ) : (
              <Btn size="sm" onClick={() => test("calendar", "google")} disabled={!!busy.calendar}>
                {spin(t.connect, busy.calendar)}
              </Btn>
            )}
          </div>
        </IntegrationCard>
      </div>
    </div>
  );
}
