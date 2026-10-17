"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { contact } from "@/i18n/contact";
import { company } from "@/lib/company";
import { Field, inputClass } from "../ContactModal";

/**
 * Demo erişimi formu (eskiden "Bize Ulaşın" penceresinin demo hâliydi; artık Schnell-Demo sayfasının en altında).
 * Ad, soyad, e-posta (+ isteğe bağlı istek). Gönderim /api/contact; ayar yoksa (503) e-posta uygulaması hazır mesajla açılır.
 */
type Status = "idle" | "sending" | "sent" | "mailto";
type Req = "name" | "last" | "email" | "consent";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED: readonly Req[] = ["name", "last", "email", "consent"];
const EMPTY = { name: "", last: "", email: "", message: "", consent: false, hp: "" };

export function DemoAccessForm() {
  const { locale } = useLocale();
  const c = contact[locale];
  const d = c.demo;
  const [v, setV] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<Req, boolean>>>({});
  const [failed, setFailed] = useState(false);
  const [sendError, setSendError] = useState(false);

  const valid: Record<Req, boolean> = {
    name: v.name.trim().length >= 2,
    last: v.last.trim().length >= 2,
    email: EMAIL.test(v.email.trim()),
    consent: v.consent,
  };
  const done = REQUIRED.filter((k) => valid[k]).length;
  const err = (k: Req) => {
    if (valid[k] || !(touched[k] || failed)) return undefined;
    if (k === "email" && v.email.trim()) return c.errors.email;
    return k === "consent" ? c.errors.consent : c.errors.required;
  };
  const set = <K extends keyof typeof EMPTY>(k: K, val: (typeof EMPTY)[K]) => setV((o) => ({ ...o, [k]: val }));
  const blur = (k: Req) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (done < REQUIRED.length) {
      setFailed(true);
      return;
    }
    setStatus("sending");
    const full = `${v.name.trim()} ${v.last.trim()}`;
    let result: Status | "error" = "sent";
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: full, email: v.email, consent: v.consent, hp: v.hp, topic: d.topic, message: v.message.trim() || d.wishDefault, lang: locale }),
      });
      if (r.status === 503) result = "mailto";
      else if (!r.ok) result = "error";
    } catch {
      result = "error";
    }
    if (result === "error") {
      setStatus("idle");
      setFailed(true);
      setSendError(true);
      return;
    }
    if (result === "mailto") {
      const body = [`${c.fields.name}: ${full}`, `${c.fields.email}: ${v.email}`, "", v.message.trim() || d.wishDefault].join("\n");
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`${d.topic} (${full})`)}&body=${encodeURIComponent(body)}`;
    }
    setSendError(false);
    setStatus(result);
  };

  const sending = status === "sending";

  if (status === "sent" || status === "mailto") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden>
          <circle cx="26" cy="26" r="24" fill="none" className="era-contact-ring stroke-era-primary" strokeWidth="3" />
          <path d="M15 27 l8 8 l15 -17" fill="none" className="era-contact-tick stroke-era-primary" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-[26px] leading-tight font-semibold tracking-tight text-era-black">{status === "sent" ? d.sent.title : c.mailto.title}</h3>
        <p className="max-w-[380px] text-[16px] leading-[1.55] text-era-gray">{status === "sent" ? d.sent.text : c.mailto.text}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`grid grid-cols-2 gap-x-4 gap-y-4 transition-opacity duration-500 mob:grid-cols-1 ${sending ? "pointer-events-none opacity-40" : ""}`}>
      <Field label={d.fields.first} error={err("name")} delay={60}>
        <input className={inputClass} value={v.name} onChange={(e) => set("name", e.target.value)} onBlur={blur("name")} placeholder={d.ph.first} autoComplete="given-name" maxLength={80} />
      </Field>
      <Field label={d.fields.last} error={err("last")} delay={120}>
        <input className={inputClass} value={v.last} onChange={(e) => set("last", e.target.value)} onBlur={blur("last")} placeholder={d.ph.last} autoComplete="family-name" maxLength={80} />
      </Field>
      <Field label={d.fields.email} error={err("email")} delay={180} className="col-span-2 mob:col-span-1">
        <input className={inputClass} type="email" inputMode="email" value={v.email} onChange={(e) => set("email", e.target.value)} onBlur={blur("email")} placeholder={d.ph.email} autoComplete="email" maxLength={160} />
      </Field>
      <Field label={d.fields.wish} optional={c.optional} delay={240} className="col-span-2 mob:col-span-1">
        <textarea className={`${inputClass} min-h-[96px] resize-y`} value={v.message} onChange={(e) => set("message", e.target.value)} placeholder={d.ph.wish} maxLength={1000} />
      </Field>

      {/* bal küpü: insanlar görmez, botlar doldurur */}
      <input tabIndex={-1} autoComplete="off" aria-hidden value={v.hp} onChange={(e) => set("hp", e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" />

      <div className="col-span-2 flex flex-col gap-1.5 mob:col-span-1">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug text-era-black">
          <span className="relative mt-0.5 flex h-5 w-5 flex-none items-center justify-center">
            <input type="checkbox" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} onBlur={blur("consent")} className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md bg-era-white/80 ring-1 ring-era-line transition checked:bg-era-primary checked:ring-era-primary focus-visible:ring-2 focus-visible:ring-era-primary" />
            <Check size={14} strokeWidth={3.5} className="pointer-events-none relative text-era-on-btn opacity-0 transition peer-checked:opacity-100" />
          </span>
          <span>
            {c.consent}{" "}
            <a href="/datenschutz" target="_blank" rel="noopener" className="font-semibold text-era-primary">
              {c.consentLink}
            </a>
          </span>
        </label>
        {err("consent") && (
          <span role="alert" className="text-[12.5px] font-medium text-destructive">
            {err("consent")}
          </span>
        )}
      </div>

      {sendError && (
        <p role="alert" className="col-span-2 text-[13.5px] font-medium text-destructive mob:col-span-1">
          {c.errors.server}
        </p>
      )}

      <button type="submit" disabled={sending} className="col-span-2 mt-1 flex h-13 items-center justify-center gap-2 rounded-(--r-s1) bg-era-primary text-[17px] font-medium text-era-on-btn transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[.98] disabled:opacity-70 mob:col-span-1">
        {sending ? d.sending : d.send}
        <Send size={18} />
      </button>
    </form>
  );
}
