"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/useLocale";
import { legal } from "@/i18n/legal";

const KEY = "cookie-notice";

/** Takip çerezi yok; yalnızca dil/tema tercihinin cihazda saklandığını bildiren küçük şerit. Bir kez onaylanınca bir daha çıkmaz. */
export function CookieNotice() {
  const { locale } = useLocale();
  const path = usePathname();
  const [show, setShow] = useState(false);

  // tarayıcıda okunur (sunucuda localStorage yok); kısa gecikme sayfa açılışını rahatsız etmez
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        setShow(localStorage.getItem(KEY) !== "1");
      } catch {
        setShow(true);
      }
    }, 800);
    return () => window.clearTimeout(id);
  }, []);

  if (!show || path.startsWith("/panel")) return null;
  const c = legal[locale].cookie;

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="era-pop-in fixed bottom-4 left-4 z-[90] flex max-w-[420px] flex-col gap-3 rounded-2xl bg-era-white p-4 shadow-[0_18px_44px_var(--c-shadow)] ring-1 ring-era-line mob:right-4 mob:bottom-3 mob:left-4 mob:max-w-none"
    >
      <p className="text-[14px] leading-[1.5] text-era-black">{c.text}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {}
            setShow(false);
          }}
          className="rounded-[8px] bg-era-primary px-5 py-2 text-[14px] font-semibold text-era-on-btn transition hover:brightness-110 active:scale-95"
        >
          {c.ok}
        </button>
        <Link href="/datenschutz" className="text-[14px] font-semibold text-era-primary no-underline hover:underline">
          {c.more}
        </Link>
      </div>
    </div>
  );
}
