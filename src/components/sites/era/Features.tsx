import type { ReactNode } from "react";
import { a } from "./assets";
import { Heading, Reveal, type Variant } from "./ui";

const card =
  "flex flex-col gap-[30px] rounded-(--r-x) border-4 border-era-secondary bg-era-bright px-8 pt-8 tab:gap-5 tab:p-[26px] mob:gap-10 mob:px-[22px] mob:pt-[22px] mob:pb-0";
const cardBottom =
  "flex flex-col gap-[30px] rounded-(--r-x) border-4 border-era-secondary bg-era-bright p-8 tab:justify-between tab:gap-5 tab:p-[26px] mob:gap-5 mob:p-[22px] sm2:p-2.5";
const shadow = "shadow-[0_4px_22px_var(--c-shadow)]";

const Text = ({ title, sub }: { title: string; sub: string }) => (
  <div className="flex w-full max-w-[391px] flex-col gap-3 tab:max-w-none">
    <div className="text-(length:--t-mx) mob:text-[20px] font-medium">{title}</div>
    <p className="text-era-gray">{sub}</p>
  </div>
);

const Img = ({ src, className = "", wrap = "" }: { src: string; className?: string; wrap?: string }) => (
  <div className={`flex items-start justify-center overflow-hidden ${shadow} ${wrap}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={a(src)} alt="" className={`h-full w-full tab:object-fill mob:relative mob:self-end ${className}`} />
  </div>
);

const duncans = [
  ["699590-ellipse-14-3-.svg", "Duncan"],
  ["699591-ellipse-14-4-.svg", "Aaron"],
  ["69958e-ellipse-14.svg", "Charlton"],
  ["69958e-ellipse-14-1-.svg", "Finlay"],
  ["69958e-ellipse-14-2-.svg", "Skye"],
];

function Voices() {
  return (
    <div className="mx-auto flex flex-col items-start justify-center gap-3 rounded-(--r-x) tab:mx-auto sm2:w-full">
      <div className={`mx-auto flex w-full max-w-[510px] flex-col items-center justify-between gap-3.5 rounded-(--r-x) border border-era-brightgray bg-era-white p-5 tab:max-w-none sm2:p-2.5 ${shadow}`}>
        <div className="flex w-full items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a("69958a-ellipse-13.svg")} alt="" className="h-[49px] w-full max-w-[49px] object-cover" />
          <div className="flex h-[30px] w-[60px] items-center justify-between rounded-[7px] border border-era-silver px-2.5 py-[3px]">
            <div>EN</div>
            <div className="h-[7px] w-[11px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a("69958a-vector-4.svg")} alt="" className="h-full w-full dark:invert" />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="text-(length:--t-mxl) font-medium">Josh Jenkins</div>
            <div className="text-era-matte">Short subtitle will be here</div>
          </div>
          <div className="flex h-[52px] w-full max-w-[52px] items-center justify-center rounded-[26px] border border-era-lightgray pl-1 mob:h-[45px] mob:max-w-[45px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a("69958d-polygon-1.svg")} alt="" className="max-h-[22px] w-5 dark:invert" />
          </div>
        </div>
      </div>
      <div className="mx-auto inline-flex items-start justify-start gap-3 mob:w-full mob:justify-between sm2:hidden">
        {duncans.map(([src, name]) => (
          <div
            key={name}
            className={`flex h-full max-h-[108px] w-full max-w-[102px] flex-col items-center rounded-(--r-s1) border border-era-brightgray bg-era-white px-4 py-3 mob:items-start mob:px-3 mob:py-2 ${shadow}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a(src)} alt="" className="h-10 w-10 object-cover mob:mx-auto" />
            <div className="mob:mx-auto">{name}</div>
            <div className="text-(length:--t-t) mob:text-[7px] text-era-old">Short subtitle</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardRealtime({ cls }: { cls: string }) {
  return (
    <div className={`${cls} justify-between`}>
      <Text title="Real-Time Responses" sub="No delays. No awkward pauses. Just smooth conversations." />
      <div className="flex flex-col gap-2">
        <Img src="699596-group-71-1-.svg" wrap="rounded-2xl" />
        <Img src="699577-0e3f2519b6673935863b5dddb1c003ef-frame-2147239747.svg" wrap="rounded-t-(--r-x)" />
      </div>
    </div>
  );
}

function Card({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}) {
  return (
    <Reveal delay={delay} className={className} variant={variant}>
      {children}
    </Reveal>
  );
}

export function Features() {
  const natural = (cls: string) => (
    <div className={`${cls} justify-between`}>
      <Text title="Natural Voice Conversations" sub="Human-like speech with emotion, clarity, and context awareness." />
      <Img src="699574-731851dbc96c72eb2a690f6c4f15a9ec-frame-2147239745-1-.svg" wrap="rounded-t-(--r-x)" />
    </div>
  );
  const tool = (cls: string) => (
    <div className={cls}>
      <Text title="Tool & CRM Integration" sub="Connect with CRMs, helpdesks, calendars, payment systems, and APIs." />
      <Img src="699577-7e7c16d5203b477a89bef274348f5803-group-74.svg" wrap="rounded-(--r-x)" />
    </div>
  );
  const calls = (cls: string) => (
    <div className={`${cls} justify-between`}>
      <Img src="69957a-71ff9f29d7c4aa675b2e36097d17e65f-group-92.svg" wrap="mx-auto block h-full w-full max-w-[521px] rounded-(--r-x)" />
      <Text title="Natural Voice Conversations" sub="Handle inbound & outbound calls, transfers, and escalations." />
    </div>
  );
  const multi = (cls: string) => (
    <div className={`${cls} justify-between`}>
      <Voices />
      <div className="flex w-full max-w-[583px] flex-col gap-3 tab:max-w-none">
        <div className="text-(length:--t-mx) mob:text-[20px] font-medium">Multilingual Support</div>
        <p className="text-era-gray">
          Track call performance, sentiment, outcomes, and insights.Track call performance, sentiment, outcomes, and
          insights.
        </p>
      </div>
    </div>
  );

  return (
    <section id="Features" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-9 sm2:gap-10">
          <div className="mx-auto flex w-full max-w-[534px] flex-col gap-4 text-center mob:max-w-none">
            <Heading>Powerfull Features</Heading>
            <div className="overflow-hidden">
              <p className="text-era-gray">
                Everything your Voice AI Agent needs to listen, think, and act at scale fast to integrate, real-time
                smart, enterprise-reliable.
              </p>
            </div>
          </div>

          {/* masaüstü */}
          <div className="flex flex-col gap-6 tab:hidden">
            <div className="grid grid-cols-3 gap-6">
              <Card variant="left" className="h-full">{natural(`h-full ${card}`)}</Card>
              <Card delay={100} className="h-full"><CardRealtime cls={`h-full ${card}`} /></Card>
              <Card variant="right" delay={200} className="h-full">{tool(`h-full ${card}`)}</Card>
            </div>
            <div className="grid grid-cols-[.81fr_1fr] gap-6">
              <Card className="h-full">{calls(`h-full ${cardBottom}`)}</Card>
              <Card delay={100} className="h-full">{multi(`h-full ${cardBottom}`)}</Card>
            </div>
          </div>

          {/* tablet / mobil */}
          <div className="hidden tab:block">
            <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
              <Card className="h-full">{natural(`h-full ${card} !pb-0`)}</Card>
              <Card className="h-full"><CardRealtime cls={`h-full ${card} !pb-0`} /></Card>
              <Card className="h-full">{tool(`h-full ${card}`)}</Card>
              <Card className="h-full">{calls(`h-full ${cardBottom}`)}</Card>
              <Card className="col-span-2 h-full mob:col-span-1">{multi(`h-full ${cardBottom}`)}</Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
