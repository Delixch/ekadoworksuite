import { a } from "./assets";
import { Heading, Line, Reveal } from "./ui";

const steps = [
  {
    n: "01",
    t: "Upload Text",
    p: "One-click online text reader customers and portential customers could realize a not  yield of 5% to 5.3% by investing in US treasury bills alone, based on the fee tier they quality for.",
  },
  {
    n: "02",
    t: "Convert text to voice AI avater",
    p: "Click audio from the left menu and select text to speech. Type or paste your text and click add to project. You wil see an audio file in the timeline.",
  },
  {
    n: "03",
    t: "Export or keep creating",
    p: "Export your video or keep exploring our full range of AI and manual video editing tools to make your looks as engaging as possible.",
  },
];

export function Process() {
  return (
    <section className="relative py-[70px] pb-[140px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-[58px] tab:gap-10">
          <div className="flex flex-col gap-[46px] tab:gap-[30px]">
            <Heading>How It Works</Heading>
            <Line />
          </div>
          <div className="relative flex items-start justify-between gap-2.5 tab:flex-col tab:gap-10 min-[1920px]:gap-0">
            <Reveal className="w-full max-w-[500px] tab:max-w-[400px] mob:max-w-none">
              <div className="relative h-[446px] w-[500px] overflow-hidden rounded-(--r-x) bg-era-cloud tab:h-[346px] tab:w-[400px] mob:h-auto mob:w-auto">
                <div className="absolute inset-0 z-10 h-[446px] w-full max-w-[500px] tab:h-auto mob:static mob:max-w-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a("69959c-rectangle-51.webp")} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a("69959d-5b0bad322c80197084e84608d8f99e88-group-2087329794.svg")}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div className="flex flex-col gap-16 tab:w-full tab:gap-[34px] mob:gap-6 sm2:gap-5">
              {steps.map((s, i) => (
                <div key={s.n} className="flex flex-col gap-16 tab:gap-[34px] mob:gap-6 sm2:gap-5">
                  {i > 0 && <Line />}
                  <div className="flex items-end justify-between gap-[15px] xl2:gap-[70px] min-[1920px]:gap-[89px] mob:flex-col mob:items-start mob:gap-3.5 sm2:gap-3">
                    <div className="flex w-[262px] flex-none flex-col gap-2.5 sm2:gap-2">
                      <div className="text-(length:--t-mx) leading-[140%] font-medium text-era-gray">{s.n}</div>
                      <h4 className="max-w-[262px] text-(length:--h6) leading-[148%] font-medium mob:max-w-none">{s.t}</h4>
                    </div>
                    <div className="w-full max-w-[429px] mob:max-w-none">
                      <p className="text-(length:--t-rx) mob:text-[16px] leading-[148%] text-era-gray">{s.p}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
