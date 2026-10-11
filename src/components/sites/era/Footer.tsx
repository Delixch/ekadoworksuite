"use client";

import { a } from "./assets";
import { useState } from "react";
import { Line, Reveal, RollLink } from "./ui";

const quick = [
  ["Home", "#"],
  ["About", "#About"],
  ["Testimonials", "#Testimonials"],
  ["FAQ", "#Faq"],
];
const other = ["Style Guide", "License", "Changelog", "404"];
const socials = [
  ["Facebook", "699531-frame-2147239570-3-.svg", "https://facebook.com"],
  ["Instagram", "699531-frame-2147239564.svg", "https://www.instagram.com/"],
  ["LinkedIn", "699531-frame-12-.svg", "https://www.linkedin.com/"],
  ["X", "699531-frame-13-.svg", "https://x.com/"],
];

export function Footer() {
  const [sent, setSent] = useState(false);
  const linkText = "text-white";
  return (
    <footer className="bg-era-black pt-[100px] pb-8 tab:pt-[60px] mob:overflow-hidden mob:pt-10">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="mb-[50px] flex items-start justify-between tab:mb-8 tab:flex-col tab:gap-[50px] sm2:mb-5">
          <div className="flex flex-col gap-[46px] tab:gap-5">
            <Reveal className="flex flex-col gap-[15px] tab:gap-2.5" delay={0}>
              <a href="#" className="block h-[31px] w-full max-w-[153px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a("699451-frame-5-1-.svg")} alt="I’m Era" className="h-full w-full object-cover" />
              </a>
              <div className="text-white">Transform AI to fit your vision</div>
            </Reveal>
            <Reveal className="h-[50px]" delay={150}>
              {sent ? (
                <div className="text-white">Thank you! Your submission has been received!</div>
              ) : (
                <form
                  className="relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    maxLength={256}
                    placeholder="Email address"
                    className="h-[50px] w-[305px] rounded-(--r-s1) border border-white bg-transparent p-4 text-(length:--t-r) leading-[120%] text-white placeholder:text-white/70 focus:outline-none sm2:w-[250px]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute top-[13%] right-[2%] flex h-9 w-9 items-center justify-center rounded-lg bg-era-primary"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a("699454-arrow-4.svg")} alt="" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>

          <div className="grid w-full max-w-[715px] grid-cols-3 items-start justify-between tab:max-w-none sm2:grid-cols-[.35fr_.25fr] sm2:gap-x-4 sm2:gap-y-[50px]">
            <Reveal className="flex w-[111px] flex-col gap-[30px] tab:w-auto sm2:gap-5" delay={150}>
              <div className="text-(length:--t-mxl) leading-[120%] font-medium whitespace-nowrap text-white">Quick Links</div>
              {quick.map(([l, h]) => (
                <RollLink key={l} href={h} textClass={`${linkText} whitespace-nowrap`}>{l}</RollLink>
              ))}
            </Reveal>
            <Reveal className="flex w-[112px] flex-col gap-[30px] tab:w-auto sm2:gap-5" delay={300}>
              <div className="text-(length:--t-mxl) leading-[120%] font-medium whitespace-nowrap text-white">Other Pages</div>
              {other.map((l) => (
                <RollLink key={l} href="#" textClass={`${linkText} whitespace-nowrap`}>{l}</RollLink>
              ))}
            </Reveal>
            <Reveal className="flex w-[229px] flex-col gap-[30px] tab:w-auto sm2:gap-5" delay={450}>
              <div className="text-(length:--t-mxl) leading-[120%] font-medium text-white">Contact</div>
              {[
                ["69945b-frame-2147239570.svg", "+1 (234) 567-890", "tel:+1234567890"],
                ["69945c-frame-2147239570-2-.svg", "hello@i’mera.com", "mailto:hello@imera.com"],
                ["69945c-frame-2147239570-1-.svg", "123 Creative Street, Innovation City, NY 10001", "#"],
              ].map(([icon, text, href]) => (
                <a key={text} href={href} className="flex items-center gap-3 no-underline">
                  <span className="block h-7 w-full max-w-7 flex-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a(icon)} alt="" className="h-full w-full object-cover" />
                  </span>
                  <span className={`text-white ${text.startsWith("123") ? "w-full max-w-[187px] tab:w-auto tab:max-w-none sm2:w-[150px]" : "whitespace-nowrap"}`}>{text}</span>
                </a>
              ))}
            </Reveal>
          </div>
        </div>

        <Line />
        <Reveal className="mt-8 flex items-start justify-between tab:flex-col tab:gap-5 sm2:mt-5 sm2:gap-2.5" delay={200}>
          <div className="flex gap-4 sm2:flex-col sm2:gap-2.5">
            <div className="whitespace-nowrap text-white">© 2026 All rights reserved.</div>
            <div className="whitespace-nowrap text-white">
              Design by{" "}
              <a href="https://webflow.com/templates/designers/flowoly" target="_blank" rel="noreferrer" className="text-white no-underline transition-colors hover:text-era-primary">
                Flowoly
              </a>{" "}
              Prowered by{" "}
              <a href="https://webflow.com" target="_blank" rel="noreferrer" className="text-white no-underline transition-colors hover:text-era-primary">
                Webflow
              </a>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="text-white">Social Media</div>
            <div className="flex items-start gap-4">
              {socials.map(([name, icon, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className="block h-5 w-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a(icon)} alt="" className="h-full w-full" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
