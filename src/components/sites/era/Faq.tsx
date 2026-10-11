"use client";

import { a } from "./assets";
import { useState } from "react";
import { Heading, Reveal } from "./ui";

const faqs = [
  ["What is a Voice AI Agent?", "A Voice AI Agent is a smart virtual assistant that listens to your voice, understands what you say, and replies or performs actions automatically."],
  ["Does it sound robotic?", "Older Voice AI sounded robotic, but modern Voice AI sounds much more natural and human-like."],
  ["Can I customize responses?", "Yes, Voice AI responses can be customized based on user needs and business requirements."],
  ["Does it support my language?", "Many Voice AI Agents support multiple languages, but support for your language depends on the specific system. You should check the platform you plan to use to confirm language support."],
  ["How fast is setup?", "Setting up a basic Voice AI Agent can be very quick — often within minutes to a few hours — while more customized systems may take longer."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="Faq" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex items-start justify-between gap-10 tab:flex-col tab:gap-[50px]">
          <div className="flex flex-col items-start justify-start gap-9">
            <div className="flex flex-col gap-4">
              <Heading>Frequently Asked Questions</Heading>
              <Reveal>
                <p className="w-full max-w-[569px] text-era-gray">
                  Got questions? We’ve got answers. Explore common queries about our Voice AI Agent and how it can help
                  you.
                </p>
              </Reveal>
            </div>
            <Reveal variant="scale0" className="sm2:w-full">
              <div className="overflow-hidden rounded-(--r-x) tab:h-[264px] tab:w-[350px] sm2:w-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a("699c26-rectangle-50-1-.webp")} alt="" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>

          <div className="flex w-full max-w-[670px] flex-col gap-4 tab:max-w-none">
            {faqs.map(([q, ans], i) => {
              const isOpen = open === i;
              return (
                <div
                  key={q}
                  className="w-full rounded-(--r-r) border border-era-cute px-6 pb-6 mob:px-4 mob:pb-4 sm2:px-3 sm2:pb-3"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between pt-6 text-left mob:pt-4 sm2:pt-3"
                  >
                    <span className="text-(length:--t-mxl) leading-[140%] sm2:whitespace-pre-wrap">{q}</span>
                    <span className="flex h-2.5 w-[17px] items-center justify-center sm2:w-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a("6996cc-icon.svg")}
                        alt=""
                        className={`h-full w-full transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 text-era-gray sm2:pt-2">{ans}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
