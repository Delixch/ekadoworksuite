"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/useLocale";
import { landing } from "@/i18n/landing";

/** Taslak sayfaların altında ince şerit: hangi taslak, diğerine geçiş. Taslak seçilince silinir. base: "anasayfa" | "preise" */
export function DraftBar({ current, base = "anasayfa" }: { current: "a" | "b"; base?: string }) {
  const { locale } = useLocale();
  const c = landing[locale];
  const other = current === "a" ? "b" : "a";
  return (
    <div className="fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full bg-era-btn px-4 py-2 text-[14px] font-semibold text-era-on-btn shadow-[0_12px_32px_var(--c-shadow)]">
        <span className="opacity-75">
          {c.draft} {current.toUpperCase()}
        </span>
        <Link href={`/taslak/${base}-${other}`} className="rounded-[8px] bg-era-primary px-3 py-1 text-era-on-dark no-underline transition hover:brightness-110">
          {c.draftOther} {other.toUpperCase()} →
        </Link>
      </div>
    </div>
  );
}
