"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/useLocale";
import { legal } from "@/i18n/legal";

const KEY = "cookie-notice";

/** Takip çerezi yok; yalnızca dil/tema tercihinin cihazda saklandığını bildiren alt şerit. Bir kez onaylanınca bir daha çıkmaz. */
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

  // İsviçre sitelerindeki gibi: ekranın altında boydan boya sade şerit (telefonda tam genişlik), kalın yazı yok (Adnan 2026-10-15)
  return (
    <div
      role="region"
      aria-label="Cookies"
      className="era-in-up fixed inset-x-0 bottom-0 z-[90] border-t border-era-line bg-era-white/95 shadow-[0_-12px_32px_var(--c-shadow-soft)] backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1300px] items-center gap-6 px-6 py-4 mob:flex-col mob:items-stretch mob:gap-3 mob:px-4 mob:pt-4 mob:pb-[max(16px,env(safe-area-inset-bottom))]">
        <p className="flex-1 text-[14px] leading-[1.55] font-normal text-era-gray">
          {c.text}{" "}
          <Link href="/datenschutz" className="whitespace-nowrap text-era-black underline decoration-era-line underline-offset-4 hover:decoration-era-black">
            {c.more}
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {}
            setShow(false);
          }}
          className="flex-none rounded-[8px] bg-era-btn px-6 py-2.5 text-[14px] font-medium text-era-on-btn transition hover:brightness-110 active:scale-[.98] mob:w-full mob:py-3"
        >
          {c.ok}
        </button>
      </div>
    </div>
  );
}
