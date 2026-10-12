"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Check, ChevronDown, Send, X } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { contact } from "@/i18n/contact";
import { company } from "@/lib/company";

/**
 * "Bize Ulaşın" penceresi: sayfadaki her #bize-ulasin bağlantısı bunu açar.
 * Arka plan buzlu cam. Üstteki rotada kâğıt uçak, zorunlu alanlar doldukça ilerler; Gönder'e basınca kalkıp gider.
 * Gönderim /api/contact ile (Resend). Ayar yoksa kullanıcının e-posta uygulaması hazır mesajla açılır.
 */
type Status = "idle" | "sending" | "sent" | "mailto";
type Values = { name: string; email: string; phone: string; hotel: string; topic: string; message: string; consent: boolean; hp: string };

const EMPTY: Values = { name: "", email: "", phone: "", hotel: "", topic: "", message: "", consent: false, hp: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED = ["name", "email", "topic", "message", "consent"] as const;
type Req = (typeof REQUIRED)[number];

const input =
  "w-full rounded-xl bg-era-white/80 px-3.5 py-2.5 text-[16px] text-era-black ring-1 ring-era-line outline-none transition placeholder:text-era-gray/70 focus:bg-era-white focus:ring-2 focus:ring-era-primary";

function Field({ label, optional, error, delay, className = "", children }: { label: string; optional?: string; error?: string; delay: number; className?: string; children: ReactNode }) {
  return (
    <label className={`era-contact-field flex flex-col gap-1.5 ${className}`} style={{ animationDelay: `${delay}ms` }}>
      <span className="flex items-baseline gap-2 text-[13px] font-semibold text-era-black">
        {label}
        {optional && <span className="text-[12px] font-normal text-era-gray">· {optional}</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="text-[12.5px] font-medium text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}

export function ContactModal() {
  const { locale } = useLocale();
  const c = contact[locale];
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [v, setV] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Req, boolean>>>({});
  const [failed, setFailed] = useState(false);
  const [sendError, setSendError] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLInputElement>(null);

  // sayfadaki "Bize Ulaşın" bağlantıları (menü, alt bilgi, SSS...) pencereyi açar; data-topic varsa konuyu önceden seçer
  const topicsRef = useRef(c.topics);
  useEffect(() => {
    topicsRef.current = c.topics;
  }, [c.topics]);
  useEffect(() => {
    const show = (topicIndex?: number) => {
      const t = topicIndex !== undefined ? topicsRef.current[topicIndex] : undefined;
      if (t) setV((o) => ({ ...o, topic: t }));
      setLeaving(false);
      setOpen(true);
    };
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (a && (a.getAttribute("href") ?? "").endsWith("#bize-ulasin")) {
        e.preventDefault();
        const n = Number((a as HTMLElement).dataset.topic);
        show(Number.isInteger(n) && (a as HTMLElement).dataset.topic !== undefined ? n : undefined);
      }
    };
    // sohbet robotu gibi kodla açanlar için: window.dispatchEvent(new CustomEvent("punn:contact"))
    const onEvent = () => show();
    document.addEventListener("click", onClick, true);
    window.addEventListener("punn:contact", onEvent);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("punn:contact", onEvent);
    };
  }, []);

  const close = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => {
      setOpen(false);
      setLeaving(false);
      // gönderilmiş formu bir sonraki açılışta temiz göster
      setStatus((s) => {
        if (s !== "idle") {
          setV(EMPTY);
          setTouched({});
          setFailed(false);
          setSendError(false);
          return "idle";
        }
        return s;
      });
    }, 260);
  }, []);

  // açıkken: sayfa kaymasın, Esc kapatsın, ilk alana odaklan
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => first.current?.focus(), 350);
    const esc = (e: globalThis.KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", esc);
    };
  }, [open, close]);

  if (!open) return null;

  const valid: Record<Req, boolean> = {
    name: v.name.trim().length >= 2,
    email: EMAIL.test(v.email.trim()),
    topic: v.topic !== "",
    message: v.message.trim().length >= 5,
    consent: v.consent,
  };
  const done = REQUIRED.filter((k) => valid[k]).length;
  const progress = done / REQUIRED.length;
  const err = (k: Req) => {
    if (valid[k] || !(touched[k] || failed)) return undefined;
    if (k === "email" && v.email.trim()) return c.errors.email;
    return k === "consent" ? c.errors.consent : c.errors.required;
  };
  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((o) => ({ ...o, [k]: val }));
  const blur = (k: Req) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (done < REQUIRED.length) {
      setFailed(true);
      return;
    }
    setStatus("sending");
    const started = Date.now();
    let result: Status | "error" = "sent";
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...v, lang: locale }),
      });
      if (r.status === 503) result = "mailto";
      else if (!r.ok) result = "error";
    } catch {
      result = "error";
    }
    // uçak kalkışını tamamlasın
    await new Promise((res) => setTimeout(res, Math.max(0, 1200 - (Date.now() - started))));
    if (result === "error") {
      setStatus("idle");
      setFailed(true);
      setSendError(true);
      return;
    }
    if (result === "mailto") {
      const lines = [`${c.fields.name}: ${v.name}`, `${c.fields.email}: ${v.email}`];
      if (v.phone) lines.push(`${c.fields.phone}: ${v.phone}`);
      if (v.hotel) lines.push(`${c.fields.hotel}: ${v.hotel}`);
      const body = [...lines, "", v.message].join("\n");
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`${v.topic} (${v.name})`)}&body=${encodeURIComponent(body)}`;
    }
    setSendError(false);
    setStatus(result);
  };

  // Tab odak pencerenin içinde kalsın
  const trap = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !card.current) return;
    const els = [...card.current.querySelectorAll<HTMLElement>("input,select,textarea,button,a[href]")].filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null && el.tabIndex !== -1);
    if (!els.length) return;
    const a = els[0];
    const z = els[els.length - 1];
    if (e.shiftKey && document.activeElement === a) {
      e.preventDefault();
      z.focus();
    } else if (!e.shiftKey && document.activeElement === z) {
      e.preventDefault();
      a.focus();
    }
  };

  const sending = status === "sending";
  const finished = status === "sent" || status === "mailto";

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-era-dark/30 p-3 backdrop-blur-xl backdrop-saturate-150 mob:items-end mob:p-0 ${leaving ? "era-contact-bg-out" : "era-contact-bg-in"}`}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={card}
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        onKeyDown={trap}
        className={`relative w-full max-w-[580px] rounded-[28px] bg-era-white/70 p-6 shadow-[0_30px_80px_var(--c-shadow)] ring-1 ring-white/50 backdrop-blur-2xl mob:max-h-[94dvh] mob:max-w-none mob:overflow-y-auto mob:rounded-b-none mob:p-5 ${leaving ? "era-contact-card-out" : "era-contact-card-in"}`}
      >
        <button type="button" onClick={close} aria-label={c.close} className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-era-gray transition hover:bg-era-secondary hover:text-era-black">
          <X size={19} />
        </button>

        <h2 className="pr-10 text-[30px] leading-tight font-extrabold tracking-tight text-era-black mob:text-[26px]">{finished ? (status === "sent" ? c.sent.title : c.mailto.title) : c.title}</h2>
        {!finished && <p className="mt-1 text-[15px] text-era-gray">{c.lead}</p>}

        {/* uçuş rotası: zorunlu alanlar doldukça uçak ilerler, gönderilince kalkıp gider */}
        <div aria-hidden className="relative mt-5 mb-1 h-9">
          <span className="absolute top-1/2 left-3 right-3 border-t-2 border-dashed border-era-cute" />
          <span className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-era-primary" />
          <span className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full ring-2 ring-era-primary" />
          <span className="absolute -bottom-3.5 left-0 text-[11px] font-semibold text-era-gray">{c.route.from}</span>
          <span className="absolute -bottom-3.5 right-0 text-[11px] font-semibold text-era-gray">{c.route.to}</span>
          <span
            className="absolute top-0 h-9 w-9 transition-[left] duration-700 ease-[cubic-bezier(.34,1.3,.64,1)]"
            style={{ left: `calc(${finished ? 1 : progress} * (100% - 36px))` }}
          >
            <Send size={26} strokeWidth={2} className={`absolute top-1 left-1 text-era-primary ${sending ? "era-contact-takeoff" : finished ? "opacity-0" : "era-contact-idle"}`} />
          </span>
        </div>

        {finished ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden>
              <circle cx="26" cy="26" r="24" fill="none" className="era-contact-ring stroke-era-primary" strokeWidth="3" />
              <path d="M15 27 l8 8 l15 -17" fill="none" className="era-contact-tick stroke-era-primary" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="max-w-[380px] text-[16px] leading-[1.55] text-era-gray">{status === "sent" ? c.sent.text : c.mailto.text}</p>
            <button type="button" onClick={close} className="mt-1 flex h-12 items-center rounded-(--r-s1) bg-era-primary px-8 text-[16px] font-medium text-era-on-btn transition hover:-translate-y-0.5 hover:brightness-110">
              {c.sent.again}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className={`mt-5 grid grid-cols-2 gap-x-4 gap-y-4 transition-opacity duration-500 mob:grid-cols-1 ${sending ? "pointer-events-none opacity-40" : ""}`}>
            <Field label={c.fields.name} error={err("name")} delay={60}>
              <input ref={first} className={input} value={v.name} onChange={(e) => set("name", e.target.value)} onBlur={blur("name")} placeholder={c.ph.name} autoComplete="name" maxLength={120} />
            </Field>
            <Field label={c.fields.email} error={err("email")} delay={120}>
              <input className={input} type="email" inputMode="email" value={v.email} onChange={(e) => set("email", e.target.value)} onBlur={blur("email")} placeholder={c.ph.email} autoComplete="email" maxLength={160} />
            </Field>
            <Field label={c.fields.phone} optional={c.optional} delay={180}>
              <input className={input} type="tel" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} placeholder={c.ph.phone} autoComplete="tel" maxLength={60} />
            </Field>
            <Field label={c.fields.hotel} optional={c.optional} delay={240}>
              <input className={input} value={v.hotel} onChange={(e) => set("hotel", e.target.value)} placeholder={c.ph.hotel} autoComplete="organization" maxLength={160} />
            </Field>
            <Field label={c.fields.topic} error={err("topic")} delay={300} className="col-span-2 mob:col-span-1">
              <span className="relative block">
                <select className={`${input} appearance-none pr-10 [&>option]:bg-era-white [&>option]:text-era-black ${v.topic ? "" : "text-era-gray/70"}`} value={v.topic} onChange={(e) => set("topic", e.target.value)} onBlur={blur("topic")}>
                  <option value="">{c.ph.topic}</option>
                  {c.topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-era-gray" />
              </span>
            </Field>
            <Field label={c.fields.message} error={err("message")} delay={360} className="col-span-2 mob:col-span-1">
              <textarea className={`${input} min-h-[110px] resize-y`} value={v.message} onChange={(e) => set("message", e.target.value)} onBlur={blur("message")} placeholder={c.ph.message} maxLength={4000} />
            </Field>

            {/* bal küpü: insanlar görmez, botlar doldurur */}
            <input tabIndex={-1} autoComplete="off" aria-hidden value={v.hp} onChange={(e) => set("hp", e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" />

            <div className="era-contact-field col-span-2 flex flex-col gap-1.5 mob:col-span-1" style={{ animationDelay: "420ms" }}>
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

            <button type="submit" disabled={sending} className="era-contact-field col-span-2 mt-1 flex h-13 items-center justify-center gap-2 rounded-(--r-s1) bg-era-primary text-[17px] font-medium text-era-on-btn transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[.98] disabled:opacity-70 mob:col-span-1" style={{ animationDelay: "480ms" }}>
              {sending ? c.sending : c.send}
              <Send size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
