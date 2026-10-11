"use client";

import { a } from "./assets";
import { useState } from "react";
import { Heading, Reveal } from "./ui";

const plans = [
  { name: "Starter Plan", price: "$25" },
  { name: "Growth", price: "$59", popular: true },
  { name: "Business Plan", price: "$89" },
];

const features = [
  "Access to 100 million stock images",
  "Upload custom icons and fonts",
  "Unlimited Sharing",
  "Upload graphics & video in up to 4k",
  "Unlimited Projects",
  "Instant Access to our design system",
  "Create teams to collaborate on designs",
];

export function Pricing() {
  const [active, setActive] = useState(1);
  return (
    <section className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-11 sm2:gap-[26px]">
          <div className="mx-auto flex w-full max-w-[581px] flex-col items-center gap-4 text-center">
            <div className="flex flex-col">
              <Heading>Choose the Perfect Plan&nbsp;</Heading>
              <Heading>&nbsp;for Your Needs</Heading>
            </div>
            <Reveal>
              <p className="text-era-gray">
                Flexible pricing options designed for everyone from individual creators to large enterprises. Pay only
                for what you use and scale as you grow.
              </p>
            </Reveal>
          </div>

          <div
            className="flex gap-6 tab:grid tab:grid-cols-2 mob:grid-cols-1"
            onMouseLeave={() => setActive(1)}
          >
            {plans.map((p, i) => {
              const on = active === i;
              return (
                <Reveal key={p.name} variant="fade" delay={i * 150} className="flex-1">
                  <div
                    onMouseEnter={() => setActive(i)}
                    className="flex h-full flex-col gap-[25px] rounded-(--r-x) border border-era-cute transition-all duration-200"
                  >
                    <div className="relative isolate flex flex-col gap-5 rounded-(--r-x) px-9 pt-9 pb-[15px] tab:gap-2.5 tab:px-7 tab:pt-8 sm2:p-3">
                      <div className="flex h-10 items-center justify-between">
                        <div className="text-(length:--t-mx) font-medium">{p.name}</div>
                        {p.popular && (
                          <div className="flex items-center justify-center rounded-(--r-x) bg-white px-3 py-2">
                            <p className="text-era-chinese">Most Popular</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-6 tab:flex-col tab:items-start tab:gap-2.5 mob:flex-row mob:items-center mob:gap-3">
                        <h2 className="text-(length:--h2) leading-[140%] font-semibold">{p.price}</h2>
                        <p className="text-era-gray">Ideal for individuals who who need advanced</p>
                      </div>
                      <a
                        href="#"
                        className={`flex items-center justify-center rounded-(--r-s1) border border-era-gray px-[27px] py-[18px] no-underline transition-colors duration-300 ${
                          on ? "bg-era-black text-white" : "bg-white text-era-black"
                        }`}
                      >
                        <span className="inline-flex items-center gap-4">
                          <span className="text-(length:--t-rx) leading-[124%] font-semibold uppercase">Started</span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={a("6996a3-arrow-1-1-.svg")}
                            alt=""
                            className={`h-[15px] w-[37px] ${on ? "invert" : ""}`}
                          />
                        </span>
                      </a>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a("6996ac-rectangle-36.svg")}
                        alt=""
                        className={`absolute top-0 left-0 -z-[2] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a("6996ae-rectangle-37.svg")}
                        alt=""
                        className={`absolute top-0 right-0 -z-[2] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
                      />
                      <div
                        className={`absolute inset-0 -z-[5] rounded-(--r-x) transition-colors duration-300 ${
                          on ? "bg-era-coolblue" : "bg-era-bright"
                        }`}
                      />
                    </div>
                    <div className="flex flex-col gap-6 px-9 pb-9 tab:px-7 tab:pb-8 sm2:p-3 sm2:pt-0">
                      <div className="text-(length:--t-mxl) leading-[140%]">Features Includes:</div>
                      <div className="flex flex-col gap-4">
                        {features.map((f) => (
                          <div key={f} className="flex items-start gap-[17px] sm2:gap-2.5">
                            <div className="flex h-6 w-full max-w-6 items-center justify-center rounded-full bg-era-secondary p-2 mob:h-5 mob:max-w-5 sm2:h-[18px] sm2:max-w-[18px]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={a("6996a5-icons.svg")} alt="" className="w-[14px] max-w-[14px] object-cover sm2:w-3 sm2:max-w-3" />
                            </div>
                            <p className="text-era-chinese">{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
