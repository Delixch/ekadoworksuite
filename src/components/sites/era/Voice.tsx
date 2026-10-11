import { a } from "./assets";
import { Heading, Reveal, SecondaryButton } from "./ui";

const flag = (src: string) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={a(src)} alt="" className="h-[26px] w-full max-w-[40px] object-cover" />
);
const play = (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={a("69968f-polygon-2.svg")} alt="" className="h-5 w-full max-w-5 mob:h-[18px] mob:max-w-[18px]" />
);

function Lang({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex gap-3 mob:gap-2">
      {flag(src)}
      <div className="text-(length:--t-mxl) leading-[132%] font-medium">{name}</div>
    </div>
  );
}

function Single({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex w-full max-w-[546px] items-center justify-between rounded-(--r-s1) border border-[#f2f2f2] py-[22px] pr-6 pl-3 shadow-[0_2px_15px_#bcbcbc00] tab:max-w-none sm2:py-4">
      <Lang src={src} name={name} />
      {play}
    </div>
  );
}

function Pair({
  l,
  r,
  lg,
  rg,
}: {
  l: [string, string];
  r: [string, string];
  lg: string;
  rg: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-(--r-s1) border border-[#f2f2f2] py-[22px] pr-6 pl-3 shadow-[0_2px_15px_#bcbcbc40] sm2:flex-col sm2:gap-3 sm2:py-4">
      <div className={`flex items-center justify-start ${lg} sm2:w-full sm2:!justify-between`}>
        <Lang src={l[0]} name={l[1]} />
        {play}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a("699697-group-2087329788.svg")} alt="" className="h-[15px] w-full max-w-5 sm2:rotate-90" />
      <div className={`flex items-center justify-start ${rg} sm2:w-full sm2:!justify-between`}>
        <Lang src={r[0]} name={r[1]} />
        {play}
      </div>
    </div>
  );
}

export function Voice() {
  return (
    <>
      <section className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
        <div className="mx-auto w-full max-w-[1470px] px-[15px]">
          <div className="flex flex-col gap-[50px] mob:gap-6">
            <div className="mx-auto flex w-full max-w-[581px] flex-col gap-4 text-center">
              <div className="flex flex-col">
                <Heading>Making Voice AI&nbsp; Simple&nbsp;</Heading>
                <Heading>&nbsp;And Accessible.</Heading>
              </div>
              <p className="mx-auto max-w-[470px] text-era-gray">
                We believe voice AI should be easy to use, intuitive, and available to everyonen not just experts.
              </p>
            </div>
            <Reveal variant="scale">
              <div className="overflow-hidden rounded-(--r-mx)">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a("6996de-div.rounded-3xl.webp")} alt="" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
        <div className="mx-auto w-full max-w-[1470px] px-[15px]">
          <div className="mx-auto flex w-full max-w-[1282px] flex-col gap-[46px] mob:gap-9 sm2:gap-[26px]">
            <div className="flex flex-col items-center gap-4 text-center">
              <Heading>AI Solution For Your Needs</Heading>
              <Reveal>
                <p className="w-full max-w-[522px] text-era-gray">
                  A conversational AI that talks like a human, understands intent, and completes tasks in real time.
                </p>
              </Reveal>
            </div>
            <div className="flex items-center justify-between gap-5 tab:flex-col tab:items-start tab:gap-10">
              <div className="flex flex-col gap-12 tab:w-full tab:gap-[30px]">
                <div className="flex w-full max-w-[553px] flex-col gap-4">
                  <h4 className="text-(length:--h5) leading-[148%] font-medium">Ai Voice Cloning</h4>
                  <p className="text-era-gray">
                    With AI voice cloning you can generate customized voices in seconds, enabling consistant branding
                    and personalized user experiences.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {["Text to Voice", "Text Translation"].map((t) => (
                    <div
                      key={t}
                      className="flex w-full max-w-[588px] flex-col gap-4 rounded-(--r-r) border-[3px] border-era-secondary p-6 tab:max-w-none mob:p-4 sm2:gap-3 sm2:p-2"
                    >
                      <div className="text-(length:--t-mx) leading-[148%] font-medium">{t}</div>
                      <p className="text-era-gray">
                        With AI voice cloning you can generate customized voices in seconds, enabling.
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-6 sm2:flex-col sm2:gap-4">
                  <SecondaryButton>Started</SecondaryButton>
                </div>
              </div>

              <div className="flex w-full max-w-[610px] flex-col gap-4 rounded-(--r-x) border-4 border-era-secondary p-8 tab:max-w-none sm2:p-3">
                <Single src="69968f-flag-pack.svg" name="English" />
                <Pair l={["699698-hindi.svg", "Hindi"]} r={["699698-arabic.svg", "Arabic"]} lg="gap-[88px] mob:gap-11 sm2:gap-0" rg="gap-[68px] mob:gap-[38px] sm2:gap-0" />
                <Pair l={["69969a-flag-pack-1-.svg", "Spanish"]} r={["69969a-flag-pack-2-.svg", "Urdu"]} lg="gap-[65px] mob:gap-6 sm2:gap-0" rg="gap-[82px] mob:gap-[52px] sm2:gap-0" />
                <Single src="69969a-chinese.svg" name="Chinese" />
                <Pair l={["69969a-flag-pack-3-.svg", "English"]} r={["69969a-russian.svg", "Russian"]} lg="gap-[71px] mob:gap-[34px] sm2:gap-0" rg="gap-[58px] mob:gap-5 sm2:gap-0" />
                <Single src="69969a-flag-pack-4-.svg" name="Bengali" />
                <Pair l={["69969a-hindi-1-.svg", "Hindi"]} r={["69969a-flag-pack-5-.svg", "French"]} lg="gap-[88px] mob:gap-11 sm2:gap-0" rg="gap-[62px] mob:gap-[26px] sm2:gap-0" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
