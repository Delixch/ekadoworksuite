"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/useLocale";
import { legal } from "@/i18n/legal";
import { company, type CompanyKey } from "@/lib/company";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/** Impressum ve Datenschutz sayfası. Firma bilgileri src/lib/company.ts içinde; boş alan sarı etiketle görünür. */
export function LegalPage({ kind }: { kind: "imprint" | "privacy" }) {
  const { locale } = useLocale();
  const l = legal[locale];
  const page = kind === "imprint" ? l.imprint : l.privacy;

  const value = (key: CompanyKey, label: string) => {
    const v = company[key].trim();
    if (v === "-") return null;
    if (!v) return <mark className="rounded bg-yellow-200 px-1.5 text-yellow-950">{l.missing(label)}</mark>;
    if (key === "email") return <a href={`mailto:${v}`}>{v}</a>;
    if (key === "website") return <a href={v}>{v}</a>;
    return v;
  };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className="relative bg-[radial-gradient(60%_40%_at_50%_0%,var(--c-sky),transparent)] pt-[130px] pb-20 tab:pt-[110px] mob:pb-14">
        <article className="mx-auto w-full max-w-[860px] px-[15px] text-era-black">
          <Link href="/" className="text-[14px] font-semibold text-era-primary no-underline hover:underline">
            ← {l.back}
          </Link>
          <h1 className="mt-4 text-[44px] leading-[1.1] font-extrabold tracking-tight mob:text-[32px]">{page.title}</h1>
          {kind === "privacy" && <p className="mt-2 text-[14px] text-era-gray">{legal[locale].privacy.updated}</p>}

          {kind === "imprint" && (
            <>
              <p className="mt-6 text-era-gray">{l.imprint.intro}</p>
              <dl className="mt-3 grid grid-cols-[minmax(0,200px)_1fr] gap-x-6 gap-y-2.5 rounded-2xl bg-era-white p-5 ring-1 ring-era-line mob:grid-cols-1 mob:gap-y-1">
                {l.imprint.rows.map((key) => {
                  const label = l.imprint.labels[key];
                  const v = value(key, label);
                  if (v === null) return null;
                  return (
                    <div key={key} className="contents">
                      <dt className="font-semibold text-era-gray mob:mt-2">{label}</dt>
                      <dd className="break-words">{v}</dd>
                    </div>
                  );
                })}
              </dl>
            </>
          )}

          <div className="mt-8 flex flex-col gap-6">
            {page.blocks.map((b) => (
              <section key={b.h}>
                <h2 className="text-[22px] font-bold">{b.h}</h2>
                {b.p.map((t) => (
                  <p key={t} className="mt-2 leading-[1.65] text-era-gray">
                    {t}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {kind === "privacy" && (
            <p className="mt-8 rounded-2xl bg-era-secondary p-4 text-[15px]">
              {l.imprint.labels.privacyEmail}: {value(company.privacyEmail.trim() ? "privacyEmail" : "email", l.imprint.labels.email)}
            </p>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
