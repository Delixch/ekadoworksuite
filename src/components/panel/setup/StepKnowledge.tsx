"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { FileText, Plus, Trash2, UploadCloud } from "lucide-react";
import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { Btn, Field, Input, Textarea } from "../ui";
import { Lead, Section, type StepProps } from "./shared";

interface Upload {
  id: string;
  name: string;
  sizeKb: number;
  progress: number;
}

const policyKeys = ["cancellation", "pets", "breakfast", "parking", "wifi"] as const;

export function StepKnowledge({ cfg, change }: StepProps) {
  const t = usePT(setupT).knowledge;
  const k = cfg.knowledge;
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearInterval);
  }, []);

  const patch = (fn: (kn: typeof k) => typeof k) => change((c) => ({ ...c, knowledge: fn(c.knowledge) }));

  /* ---- sahte yükleme: ilerleme çubuğu dolunca belge listeye eklenir ---- */
  const startUpload = useCallback(
    (files: FileList | File[]) => {
      Array.from(files).forEach((f, i) => {
        const id = `u${Date.now()}${i}`;
        const sizeKb = Math.max(1, Math.round(f.size / 1024));
        setUploads((u) => [...u, { id, name: f.name, sizeKb, progress: 0 }]);
        const timer = setInterval(() => {
          setUploads((list) => {
            const cur = list.find((x) => x.id === id);
            if (!cur) return list;
            const next = Math.min(100, cur.progress + 8 + Math.random() * 16);
            if (next >= 100) {
              clearInterval(timer);
              // BAĞLANTI NOKTASI: dosya sunucuya yüklenir, knowledge_docs tablosuna yazılır
              change((c) => ({ ...c, knowledge: { ...c.knowledge, docs: [...c.knowledge.docs, { id, name: cur.name, sizeKb: cur.sizeKb }] } }));
              return list.filter((x) => x.id !== id);
            }
            return list.map((x) => (x.id === id ? { ...x, progress: next } : x));
          });
        }, 140);
        timers.current.push(timer);
      });
    },
    [change]
  );

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    if (e.dataTransfer.files.length) startUpload(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-7">
      <Lead>{t.lead}</Lead>

      {/* oda tipleri */}
      <Section
        title={t.rooms}
        right={
          <Btn
            variant="soft"
            size="sm"
            onClick={() => patch((kn) => ({ ...kn, rooms: [...kn.rooms, { id: `r${Date.now()}`, name: "", capacity: 2, pricePerNight: 100, count: 1 }] }))}
          >
            <Plus size={15} /> {t.addRoom}
          </Btn>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[minmax(0,1fr)_84px_120px_84px_40px] gap-3 px-1 text-[12px] font-semibold text-era-gray mob:hidden">
            <span>{t.roomName}</span>
            <span>{t.capacity}</span>
            <span>{t.price}</span>
            <span>{t.count}</span>
            <span />
          </div>
          {k.rooms.map((r) => (
            <div key={r.id} className="setup-step grid grid-cols-[minmax(0,1fr)_84px_120px_84px_40px] items-center gap-3 mob:grid-cols-2 mob:rounded-(--r-s1) mob:border mob:border-era-lightgray mob:p-3">
              <Input
                aria-label={t.roomName}
                placeholder={t.roomName}
                value={r.name}
                onChange={(e) => patch((kn) => ({ ...kn, rooms: kn.rooms.map((x) => (x.id === r.id ? { ...x, name: e.target.value } : x)) }))}
                className="mob:col-span-2"
              />
              <Input
                aria-label={t.capacity}
                type="number"
                min={1}
                value={r.capacity}
                onChange={(e) => patch((kn) => ({ ...kn, rooms: kn.rooms.map((x) => (x.id === r.id ? { ...x, capacity: Number(e.target.value) } : x)) }))}
              />
              <Input
                aria-label={t.price}
                type="number"
                min={0}
                value={r.pricePerNight}
                onChange={(e) => patch((kn) => ({ ...kn, rooms: kn.rooms.map((x) => (x.id === r.id ? { ...x, pricePerNight: Number(e.target.value) } : x)) }))}
              />
              <Input
                aria-label={t.count}
                type="number"
                min={1}
                value={r.count}
                onChange={(e) => patch((kn) => ({ ...kn, rooms: kn.rooms.map((x) => (x.id === r.id ? { ...x, count: Number(e.target.value) } : x)) }))}
              />
              <button
                type="button"
                aria-label="Sil"
                onClick={() => patch((kn) => ({ ...kn, rooms: kn.rooms.filter((x) => x.id !== r.id) }))}
                className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-era-gray transition-colors hover:bg-era-secondary hover:text-era-danger"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* SSS */}
      <Section
        title={t.faqs}
        right={
          <Btn variant="soft" size="sm" onClick={() => patch((kn) => ({ ...kn, faqs: [...kn.faqs, { id: `f${Date.now()}`, question: "", answer: "" }] }))}>
            <Plus size={15} /> {t.addFaq}
          </Btn>
        }
      >
        <div className="flex flex-col gap-3">
          {k.faqs.map((f) => (
            <div key={f.id} className="setup-step flex flex-col gap-2 rounded-(--r-s1) border border-era-lightgray bg-era-white p-3">
              <div className="flex items-center gap-2">
                <Input
                  aria-label={t.question}
                  placeholder={t.question}
                  value={f.question}
                  onChange={(e) => patch((kn) => ({ ...kn, faqs: kn.faqs.map((x) => (x.id === f.id ? { ...x, question: e.target.value } : x)) }))}
                  className="font-semibold"
                />
                <button
                  type="button"
                  aria-label="Sil"
                  onClick={() => patch((kn) => ({ ...kn, faqs: kn.faqs.filter((x) => x.id !== f.id) }))}
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-era-gray transition-colors hover:bg-era-secondary hover:text-era-danger"
                >
                  <Trash2 size={17} />
                </button>
              </div>
              <Textarea
                aria-label={t.answer}
                placeholder={t.answer}
                rows={2}
                value={f.answer}
                onChange={(e) => patch((kn) => ({ ...kn, faqs: kn.faqs.map((x) => (x.id === f.id ? { ...x, answer: e.target.value } : x)) }))}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* kurallar */}
      <Section title={t.policies}>
        <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
          {policyKeys.map((p) => (
            <Field key={p} label={t.policy[p]} className={p === "cancellation" ? "col-span-2 mob:col-span-1" : ""}>
              <Textarea rows={2} value={k.policies[p]} onChange={(e) => patch((kn) => ({ ...kn, policies: { ...kn.policies, [p]: e.target.value } }))} />
            </Field>
          ))}
        </div>
      </Section>

      {/* belgeler */}
      <Section title={t.docs}>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={onDrop}
          onClick={() => input.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && input.current?.click()}
          className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-(--r-r) border-2 border-dashed px-4 py-8 text-center transition-all duration-300 ${
            over ? "scale-[1.01] border-era-primary bg-era-coolblue" : "border-era-cute bg-era-secondary hover:border-era-primary"
          }`}
        >
          <UploadCloud size={30} className={`text-era-primary-ink transition-transform duration-300 ${over ? "-translate-y-1 scale-110" : ""}`} />
          <div className="text-[15px] font-bold text-era-black">{t.dropHere}</div>
          <div className="text-[13px] text-era-gray">{t.dropHint}</div>
          <div className="text-[13px] font-semibold text-era-primary-ink">{t.browse}</div>
          <input
            ref={input}
            type="file"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files?.length) startUpload(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        <ul className="flex flex-col gap-2">
          {uploads.map((u) => (
            <li key={u.id} className="setup-step flex flex-col gap-1.5 rounded-(--r-s1) border border-era-lightgray bg-era-white px-3 py-2.5">
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <span className="truncate font-semibold text-era-black">{u.name}</span>
                <span className="flex-none text-era-gray">
                  {t.uploading} {Math.round(u.progress)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-era-secondary">
                <div className="h-full rounded-full bg-era-primary transition-[width] duration-150" style={{ width: `${u.progress}%` }} />
              </div>
            </li>
          ))}
          {k.docs.map((d) => (
            <li key={d.id} className="setup-step flex items-center gap-3 rounded-(--r-s1) border border-era-lightgray bg-era-white px-3 py-2.5">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
                <FileText size={17} />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[14px] font-semibold text-era-black">{d.name}</div>
                <div className="text-[12px] text-era-gray">{d.sizeKb} KB</div>
              </div>
              <button
                type="button"
                aria-label="Sil"
                onClick={() => patch((kn) => ({ ...kn, docs: kn.docs.filter((x) => x.id !== d.id) }))}
                className="flex h-9 w-9 items-center justify-center rounded-full text-era-gray transition-colors hover:bg-era-secondary hover:text-era-danger"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
          {k.docs.length === 0 && uploads.length === 0 && <li className="text-[13px] text-era-gray">{t.nothing}</li>}
        </ul>
      </Section>
    </div>
  );
}
