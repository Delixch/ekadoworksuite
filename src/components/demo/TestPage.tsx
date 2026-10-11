"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BedDouble, Building2, Check, ChevronRight, FileText, Info, MapPin, MessageCircle, Phone, PhoneCall, Utensils, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/sites/era/Navbar";
import { Spot } from "@/components/sites/era/Spot";
import { Heading, Reveal } from "@/components/sites/era/ui";
import { Footer } from "@/components/sites/era/Footer";
import { ChannelIcon, Spinner } from "@/components/panel/ui";
import { demoT } from "@/i18n/demo";
import { usePT } from "@/i18n/panel/use";
import { countRooms } from "@/lib/demo/answer";
import { DEMO_PHONE, requestCallback, requestSummary, submitDemoInfo, type DemoInfo } from "@/lib/demo/api";
import { DemoChat } from "./DemoChat";

type Phase = "form" | "preparing" | "ready";
type Mode = null | "chat" | "call" | "callback";

const empty: DemoInfo = { hotelName: "", rooms: "", food: "", location: "", other: "" };

const fieldCls =
  "w-full rounded-(--r-s1) border bg-era-white px-4 py-3 text-[16px] text-era-black placeholder:text-era-matte outline-none transition focus:border-era-primary focus:ring-4 focus:ring-[color-mix(in_oklab,var(--c-primary)_16%,transparent)]";

/* ------------------------------- Adım çubuğu ------------------------------- */

function Stepper({ step, labels }: { step: 1 | 2 | 3; labels: string[] }) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      {labels.map((l, i) => {
        const n = i + 1;
        const done = n < step;
        const on = n === step;
        return (
          <li key={l} className="flex items-center gap-3">
            <span className="flex items-center gap-2.5">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold transition-all duration-500 ${
                  on ? "scale-110 bg-era-btn text-era-on-btn shadow-[0_8px_20px_var(--c-shadow)]" : done ? "bg-era-primary text-era-on-dark" : "bg-era-coolblue text-era-primary-ink"
                }`}
              >
                {done ? <Check size={17} strokeWidth={3} /> : n}
              </span>
              <span className={`text-[16px] transition-colors duration-500 mob:hidden ${on ? "font-bold text-era-black" : "text-era-gray"}`}>{l}</span>
            </span>
            {n < 3 && (
              <span className="relative h-0.5 w-10 overflow-hidden rounded-full bg-era-lightgray mob:w-6">
                <span className="absolute inset-y-0 left-0 w-full origin-left bg-era-primary transition-transform duration-700" style={{ transform: `scaleX(${done ? 1 : 0})` }} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------- Form ------------------------------- */

function Row({ icon: Icon, label, required, error, children }: { icon: LucideIcon; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-3 mob:grid-cols-[34px_minmax(0,1fr)]">
      <span className="mt-6 flex h-10 w-10 items-center justify-center text-era-primary-ink mob:h-8 mob:w-8">
        <Icon size={26} strokeWidth={1.7} />
      </span>
      <label className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[16px] font-medium text-era-black">
          {label} {required && <b className="text-era-danger">*</b>}
        </span>
        {children}
        {error && <span className="text-[13px] font-medium text-era-danger [animation:era-pop-in_.3s_both]">{error}</span>}
      </label>
    </div>
  );
}

/* ------------------------------- Hazırlanıyor ------------------------------- */

function Preparing({ labels }: { labels: string[] }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const ids = labels.map((_, i) => setTimeout(() => setN(i + 1), 650 * (i + 1)));
    return () => ids.forEach(clearTimeout);
  }, [labels]);
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-7 py-8">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="era-ring absolute inset-0 rounded-full bg-era-primary/30" />
        <span className="era-ring absolute inset-0 rounded-full bg-era-primary/30" style={{ animationDelay: ".6s" }} />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-era-primary text-era-on-dark shadow-[0_14px_36px_var(--c-shadow)]">
          <Building2 size={34} />
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {labels.map((l, i) => (
          <li key={l} className={`flex items-center gap-3 text-[17px] transition-all duration-500 ${i < n ? "font-semibold text-era-black" : i === n ? "text-era-gray" : "text-era-matte opacity-50"}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-full ${i < n ? "bg-era-success text-era-on-dark [animation:era-pop-in_.4s_both]" : "bg-era-secondary"}`}>
              {i < n ? <Check size={15} strokeWidth={3} /> : i === n ? <Spinner size={13} /> : null}
            </span>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------- Sonuç ------------------------------- */

function Result({ info, talk, onEdit }: { info: DemoInfo; talk: number; onEdit: () => void }) {
  const t = usePT(demoT);
  const rooms = countRooms(info.rooms);
  const items: [string, boolean, string][] = [
    [t.result.rooms, rooms > 0, rooms > 0 ? String(rooms) : ""],
    [t.result.food, !!info.food.trim(), ""],
    [t.result.location, !!info.location.trim(), ""],
    [t.result.other, !!info.other.trim(), ""],
  ];
  return (
    <div className="flex flex-col gap-6 [animation:era-pop-in_.5s_both]">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-era-success text-era-on-dark [animation:era-pop-in_.6s_both]">
          <Check size={28} strokeWidth={3} />
        </span>
        <div>
          <h2 className="text-[26px] leading-tight font-extrabold tracking-tight text-era-black mob:text-[22px]">{t.result.title}</h2>
          <p className="text-[15px] text-era-gray">
            {info.hotelName} · {t.result.lead}
          </p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-3 mob:grid-cols-1">
        {items.map(([label, ok, extra], i) => (
          <li key={label} className="flex items-center gap-3 rounded-(--r-r) border border-era-lightgray bg-era-white p-4 [animation:era-pop-in_.5s_both]" style={{ animationDelay: `${i * 90}ms` }}>
            <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${ok ? "bg-[color-mix(in_oklab,var(--c-success)_18%,transparent)] text-era-success" : "bg-era-secondary text-era-matte"}`}>
              <Check size={17} strokeWidth={3} />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[15px] font-semibold text-era-black">
                {extra && <b className="mr-1 text-era-primary-ink">{extra}</b>}
                {label}
              </span>
              <span className="text-[13px] text-era-gray">{ok ? t.result.yes : t.result.no}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[14px] text-era-gray">
        {t.result.talk}: <b className="text-era-black">{talk}</b>
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/#bize-ulasin" className="inline-flex h-12 items-center gap-2 rounded-(--r-s1) bg-era-primary px-6 text-[16px] font-semibold text-era-on-dark no-underline transition hover:brightness-110">
          {t.result.cta} <ArrowRight size={18} />
        </Link>
        <button type="button" onClick={onEdit} className="h-12 rounded-(--r-s1) border border-era-lightgray bg-era-white px-5 text-[15px] font-semibold text-era-black transition hover:bg-era-secondary">
          {t.result.again}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- Sağ kart: test yöntemleri ------------------------------- */

function Option({ icon: Icon, title, onClick, disabled, active, tip, delay }: { icon: LucideIcon; title: string; onClick: () => void; disabled: boolean; active: boolean; tip: string; delay: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? tip : undefined}
      aria-pressed={active}
      className={`group flex w-full items-center gap-4 rounded-(--r-r) border-2 bg-era-white p-4 text-left transition-all duration-300 [animation:era-pop-in_.55s_both] ${
        active ? "border-era-primary shadow-[0_10px_28px_var(--c-shadow-soft)]" : "border-era-lightgray hover:-translate-y-0.5 hover:border-era-primary/60"
      } ${disabled ? "cursor-not-allowed opacity-55 hover:translate-y-0 hover:border-era-lightgray" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink transition-transform duration-500 group-hover:scale-110 group-enabled:group-hover:rotate-[-8deg]">
        <Icon size={26} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1 text-[19px] leading-tight font-bold text-era-black mob:text-[17px]">{title}</span>
      <ChevronRight size={22} className={`flex-none text-era-black transition-transform duration-300 ${active ? "rotate-90" : "group-enabled:group-hover:translate-x-1"}`} />
    </button>
  );
}

/* ------------------------------- Sayfa ------------------------------- */

export function TestPage() {
  const t = usePT(demoT);
  const [info, setInfo] = useState<DemoInfo>(empty);
  const [errors, setErrors] = useState<{ hotelName?: string; rooms?: string }>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [demoId, setDemoId] = useState("");
  const [mode, setMode] = useState<Mode>(null);
  const [talk, setTalk] = useState(0);
  const [phone, setPhone] = useState("");
  const [cb, setCb] = useState<"idle" | "sending" | "waiting">("idle");
  const [wa, setWa] = useState("");
  const [waOn, setWaOn] = useState(false);
  const [waSent, setWaSent] = useState(false);
  const waRef = useRef<HTMLInputElement>(null);

  const ready = phase === "ready";
  const tested = talk > 0 || cb === "waiting";
  const step: 1 | 2 | 3 = !ready ? 1 : tested ? 3 : 2;

  const set = (k: keyof DemoInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInfo((v) => ({ ...v, [k]: e.target.value }));
    if (k === "hotelName" || k === "rooms") setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er = { hotelName: info.hotelName.trim() ? undefined : t.form.required, rooms: info.rooms.trim() ? undefined : t.form.required };
    setErrors(er);
    if (er.hotelName || er.rooms) return;
    setPhase("preparing");
    const r = await submitDemoInfo(info);
    setDemoId(r.demoId);
    setPhase("ready");
  };

  const edit = () => {
    setPhase("form");
    setMode(null);
  };

  const sendCallback = async () => {
    if (phone.replace(/\D/g, "").length < 7) return;
    setCb("sending");
    await requestCallback(demoId, phone);
    setCb("waiting");
  };

  const toggleWa = async (on: boolean) => {
    setWaOn(on);
    if (!on) return setWaSent(false);
    if (wa.replace(/\D/g, "").length < 7) return waRef.current?.focus();
    await requestSummary(demoId, wa);
    setWaSent(true);
  };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className="relative bg-[radial-gradient(60%_40%_at_50%_0%,var(--c-sky),transparent)] pt-[130px] pb-20 tab:pt-[110px] mob:pb-14">
        <div className="mx-auto flex w-full max-w-[1470px] flex-col gap-8 px-[15px]">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 text-center [animation:era-pop-in_.7s_both]">
            <Heading as="h2" wrapClass="text-center" className="!text-[52px] !leading-[1.08] !font-extrabold tracking-tight text-era-black tab:!text-[42px] mob:!text-[32px]">{t.title}</Heading>
            <Reveal variant="up" delay={250}><p className="text-[22px] text-era-primary-ink/80 mob:text-[17px]">{t.lead}</p></Reveal>
          </div>

          <Reveal variant="fade"><Stepper step={step} labels={t.steps} /></Reveal>

          <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-6 tab:grid-cols-1">
            {/* sol: form -> hazırlanıyor -> sohbet / sonuç */}
            <Spot className="punn-panel rounded-(--r-x) p-8 mob:p-5">
              {phase === "form" && (
                <form onSubmit={submit} noValidate className="flex flex-col gap-5 [animation:era-pop-in_.5s_both]">
                  <div>
                    <h2 className="text-[34px] leading-tight font-extrabold tracking-tight text-era-black mob:text-[26px]">{t.form.title}</h2>
                    <p className="mt-1 text-[16px] text-era-black/80">{t.form.lead}</p>
                  </div>
                  <Row icon={Building2} label={t.form.hotel} required error={errors.hotelName}>
                    <input value={info.hotelName} onChange={set("hotelName")} placeholder={t.form.hotelPh} className={`${fieldCls} ${errors.hotelName ? "border-era-danger" : "border-era-lightgray"}`} />
                  </Row>
                  <Row icon={BedDouble} label={t.form.rooms} required error={errors.rooms}>
                    <textarea rows={3} value={info.rooms} onChange={set("rooms")} placeholder={t.form.roomsPh} className={`${fieldCls} resize-y leading-snug ${errors.rooms ? "border-era-danger" : "border-era-lightgray"}`} />
                    <span className="text-[14px] leading-snug text-era-primary-ink/80">{t.form.roomsNote}</span>
                  </Row>
                  <Row icon={Utensils} label={t.form.food}>
                    <textarea rows={2} value={info.food} onChange={set("food")} placeholder={t.form.foodPh} className={`${fieldCls} resize-y border-era-lightgray leading-snug`} />
                  </Row>
                  <Row icon={MapPin} label={t.form.location}>
                    <textarea rows={2} value={info.location} onChange={set("location")} placeholder={t.form.locationPh} className={`${fieldCls} resize-y border-era-lightgray leading-snug`} />
                  </Row>
                  <Row icon={FileText} label={t.form.other}>
                    <input value={info.other} onChange={set("other")} placeholder={t.form.otherPh} className={`${fieldCls} border-era-lightgray`} />
                  </Row>
                  <div className="flex flex-col items-center gap-2">
                    <button type="submit" className="group flex h-14 w-full items-center justify-center gap-3 rounded-(--r-s1) bg-era-btn text-[18px] font-bold text-era-on-btn transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_var(--c-shadow)] active:scale-[.99]">
                      {t.form.submit} <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                    <span className="text-[14px] text-era-primary-ink/80">{t.form.submitNote}</span>
                  </div>
                </form>
              )}
              {phase === "preparing" && <Preparing labels={t.form.preparing} />}
              {ready && mode === "chat" && <DemoChat info={info} onTalk={setTalk} onEdit={edit} onDone={() => setMode(null)} />}
              {ready && mode !== "chat" && <Result info={info} talk={talk} onEdit={edit} />}
            </Spot>

            {/* sağ: nasıl test etmek istersiniz + bilgi kartı */}
            <div className="flex flex-col gap-5">
              <Spot className="punn-panel flex flex-col gap-4 rounded-(--r-x) p-7 mob:p-5">
                <h2 className="text-[26px] leading-tight font-extrabold tracking-tight text-era-black">{t.how.title}</h2>
                <Option icon={MessageCircle} title={t.how.chat} onClick={() => setMode(mode === "chat" ? null : "chat")} disabled={!ready} active={mode === "chat"} tip={t.how.locked} delay={0} />
                <Option icon={Phone} title={t.how.call} onClick={() => setMode(mode === "call" ? null : "call")} disabled={!ready} active={mode === "call"} tip={t.how.locked} delay={90} />
                {mode === "call" && (
                  <div className="rounded-(--r-r) bg-era-secondary p-4 [animation:era-pop-in_.4s_both]">
                    <div className="mb-1 text-[15px] font-bold text-era-black">{t.how.callTitle}</div>
                    {DEMO_PHONE ? (
                      <a href={`tel:${DEMO_PHONE.replace(/\s/g, "")}`} className="text-[24px] font-extrabold text-era-primary-ink no-underline">
                        {DEMO_PHONE}
                      </a>
                    ) : (
                      <p className="text-[15px] text-era-gray">{t.how.callSoon}</p>
                    )}
                    <p className="mt-1 text-[13px] text-era-gray">{t.how.callNote}</p>
                  </div>
                )}
                <Option icon={PhoneCall} title={t.how.callback} onClick={() => setMode(mode === "callback" ? null : "callback")} disabled={!ready} active={mode === "callback"} tip={t.how.locked} delay={180} />
                {mode === "callback" && (
                  <div className="flex flex-col gap-3 rounded-(--r-r) bg-era-secondary p-4 [animation:era-pop-in_.4s_both]">
                    {cb === "waiting" ? (
                      <div className="flex items-center gap-4">
                        <span className="relative flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-primary text-era-on-dark">
                          <span className="era-ring absolute inset-0 rounded-full bg-era-primary/40" />
                          <PhoneCall size={22} className="relative [animation:era-wiggle_1.6s_infinite]" />
                        </span>
                        <p className="text-[15px] font-semibold text-era-black">{t.how.callbackWait}</p>
                      </div>
                    ) : (
                      <>
                        <label className="flex flex-col gap-1.5">
                          <span className="text-[14px] font-semibold text-era-black">{t.how.phoneLabel}</span>
                          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder={t.how.phonePh} className={`${fieldCls} border-era-lightgray`} />
                        </label>
                        <button type="button" onClick={sendCallback} disabled={cb === "sending" || phone.replace(/\D/g, "").length < 7} className="flex h-12 items-center justify-center gap-2 rounded-(--r-s1) bg-era-primary text-[16px] font-semibold text-era-on-dark transition hover:brightness-110 disabled:opacity-50">
                          {cb === "sending" ? <Spinner /> : <PhoneCall size={18} />} {t.how.callbackBtn}
                        </button>
                      </>
                    )}
                  </div>
                )}

                <div className="mt-1 border-t border-era-lightgray pt-5">
                  <p className="mb-3 text-[17px] font-medium text-era-black">{t.how.summaryQ}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-coolblue">
                      <ChannelIcon channel="whatsapp" size={26} />
                    </span>
                    <input ref={waRef} value={wa} onChange={(e) => setWa(e.target.value)} inputMode="tel" placeholder={t.how.summaryPh} className={`${fieldCls} min-w-0 border-era-lightgray`} />
                  </div>
                  <label className="mt-3 flex cursor-pointer items-center gap-3 text-[15px] text-era-black">
                    <input type="checkbox" checked={waOn} onChange={(e) => toggleWa(e.target.checked)} className="h-5 w-5 accent-[var(--c-primary)]" />
                    {t.how.summaryCheck}
                  </label>
                  {waSent && <p className="mt-2 flex items-center gap-1.5 text-[14px] font-semibold text-era-success [animation:era-pop-in_.4s_both]"><Check size={16} strokeWidth={3} /> {t.how.summarySent}</p>}
                </div>
              </Spot>

              <Spot className="punn-feature punn-spot relative overflow-hidden rounded-(--r-x) p-7 text-era-on-dark mob:p-5">
                <span aria-hidden className="era-aurora pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-era-on-dark/20 blur-[60px]" />
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-on-dark text-era-primary-ink">
                    <Info size={22} strokeWidth={2.4} />
                  </span>
                  <h3 className="text-[26px] leading-tight font-extrabold tracking-tight">{t.info.title}</h3>
                </div>
                <p className="text-[16px] leading-[1.5] text-era-on-dark/90">{t.info.text}</p>
                <div className="my-4 h-px w-full bg-era-on-dark/30" />
                <p className="text-[15px] leading-snug font-bold text-era-on-dark">{t.info.note}</p>
              </Spot>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
