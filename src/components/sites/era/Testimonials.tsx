"use client";

import { a } from "./assets";
import { useRef, useState } from "react";
import { Heading, Reveal } from "./ui";

type T = { text: string; avatar: string; photo: string; name: string; role: string };

const slides: { left: T; right: T; tab: T }[] = [
  {
    left: {
      text: "“Our support wait time dropped to zero, and customer satisfaction went through the roof.”",
      avatar: "6996b3-8b9e8d7f48873fb10e1ab58d73cfbe14-ellipse-9.svg",
      photo: "6996b4-rectangle-33.webp",
      name: "Billy Kemp",
      role: "Head of Support",
    },
    right: {
      text: "“Using this AI automation template transformed our workflow. It saves time, boosts accuracy”",
      avatar: "6996bf-74a81f0cefb8e36b8aa4d770020ed6a8-ellipse-9-1-.svg",
      photo: "6996bf-rectangle-34.webp",
      name: "Billy Kemp",
      role: "Humen Research",
    },
    tab: {
      text: "“Using this AI automation template transformed our workflow. It saves time, boosts accuracy”",
      avatar: "6996b3-8b9e8d7f48873fb10e1ab58d73cfbe14-ellipse-9.svg",
      photo: "6996bf-rectangle-34.webp",
      name: "Billy Kemp",
      role: "Head of Support",
    },
  },
  {
    left: {
      text: "This AI voice generator completely changed how I create content. The voices sound incredibly natural",
      avatar: "69ae3a-ellipse-9-5-.svg",
      photo: "69ae39-rectangle-34.webp",
      name: "Nathan Brookes",
      role: "Artist",
    },
    right: {
      text: "I was looking for a realistic AI voice for my YouTube videos, and this platform exceeded my expectations.",
      avatar: "69ae39-ellipse-9-4-1-.svg",
      photo: "69ae39-rectangle-34-3-.webp",
      name: "Nicholas Heath",
      role: "Project Manager",
    },
    tab: {
      text: "I was looking for a realistic AI voice for my YouTube videos, and this platform exceeded my expectations.",
      avatar: "69ae39-ellipse-9-4-1-.svg",
      photo: "69ae39-rectangle-34-3-.webp",
      name: "Nicholas Heath",
      role: "Project Manager",
    },
  },
  {
    left: {
      text: "Adding AI voice to our marketing videos boosted our conversions. The platform is simple to use.",
      avatar: "69ae3a-ellipse-9-2-1-.svg",
      photo: "69ae39-rectangle-34-1-.webp",
      name: "Bailey Mellor",
      role: "Media planner",
    },
    right: {
      text: "Integrating AI voice on my website made my content more accessible for visitors who prefer listening instead.",
      avatar: "69ae3a-ellipse-9-3-1-.svg",
      photo: "69ae39-rectangle-34-2-.webp",
      name: "Josh Graham",
      role: "Product Designer",
    },
    tab: {
      text: "“Our support wait time dropped to zero, and customer satisfaction went through the roof.”",
      avatar: "69ae3a-ellipse-9-3-1-.svg",
      photo: "69ae39-rectangle-34-2-.webp",
      name: "Billy Kemp",
      role: "Head of Support",
    },
  },
];

function Details({ t, nameBig }: { t: T; nameBig?: boolean }) {
  return (
    <div className="flex h-full w-full max-w-[418px] flex-col items-stretch justify-between gap-[90px] rounded-(--r-s) border-4 border-era-secondary bg-era-bright p-9 xl2:gap-[90px] mob:h-[204px] mob:gap-[15px] mob:p-4 sm2:h-auto sm2:max-w-none sm2:gap-[50px]">
      <div className="w-full max-w-[346px] text-(length:--t-mxl) leading-[140%] tab:max-w-none">{t.text}</div>
      <div className="flex gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a(t.avatar)} alt="" className="h-12 w-full max-w-12 object-cover" />
        <div className="flex flex-col gap-1.5">
          <div className={nameBig ? "text-(length:--t-mxl) leading-[140%]" : ""}>{t.name}</div>
          <div className="text-(length:--t-tx) leading-[120%] text-era-gray">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function Photo({ t }: { t: T }) {
  return (
    <div className="h-full w-full max-w-[274px] overflow-hidden rounded-(--r-s) mob:h-[204px] mob:max-w-[180px] sm2:h-auto sm2:max-w-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a(t.photo)} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section id="Testimonials" className="relative py-[70px] pb-[130px] tab:py-[50px] tab:pb-[90px] mob:py-10 mob:pb-[90px] sm2:py-[35px] sm2:pb-[70px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-12 sm2:gap-[30px]">
          <div className="mx-auto flex w-full max-w-[554px] flex-col items-center gap-4 text-center">
            <div className="flex flex-col">
              <Heading className="w-full max-w-[368px]">What Our Users&nbsp;</Heading>
              <Heading className="w-full max-w-[368px]">Are Saying</Heading>
            </div>
            <p className="text-era-gray">
              Hear from businesses and creators who have transformed their workflow with our Voice AI Agent. Real
              stories, real results.
            </p>
          </div>

          <Reveal variant="scale0">
            <div
              className="relative"
              onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (startX.current == null) return;
                const dx = e.changedTouches[0].clientX - startX.current;
                if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
                startX.current = null;
              }}
            >
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${i * 100}%)` }}
                >
                  {slides.map((s, n) => (
                    <div key={n} className="w-full flex-none" aria-hidden={n !== i}>
                      <div className="flex gap-6 tab:flex-col">
                        <div className="flex items-start justify-start gap-4 sm2:flex-col">
                          <Details t={s.left} nameBig />
                          <Photo t={s.left} />
                        </div>
                        {/* masaüstü sağ blok */}
                        <div className="flex gap-4 tab:hidden">
                          <Details t={s.right} />
                          <Photo t={s.right} />
                        </div>
                        {/* tablet sağ blok */}
                        <div className="mx-auto hidden gap-4 tab:flex sm2:hidden">
                          <Photo t={s.tab} />
                          <Details t={s.tab} />
                        </div>
                        {/* küçük mobil sağ blok */}
                        <div className="hidden flex-col gap-4 sm2:flex">
                          <Details t={s.right} />
                          <Photo t={s.right} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 flex justify-center sm2:mt-8">
                {slides.map((_, n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Slide ${n + 1}`}
                    onClick={() => go(n)}
                    className={`mx-[3px] h-4 w-4 rounded-full shadow-[0_0_3px_#33333366] transition-colors ${
                      n === i ? "bg-black" : "bg-black/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
