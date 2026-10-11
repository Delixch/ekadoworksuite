import { a } from "./assets";
import { SecondaryButton } from "./ui";

const users = [
  "69996f-71c0202340610151dddcbe74e7671e92-ellipse-1.webp",
  "69996f-1242bd65fcec4c5d118525d08c1736bd-ellipse-4.webp",
  "69996f-378df19cc7021a96e381567f7de7b7f2-ellipse-3.avif",
  "69996f-b5c7619b56da90dfb2efcf6d1b3009e5-ellipse-2.avif",
];

const copy =
  "I'm creating intelligent Voice AI Agents that talk naturally, think intelligently, and act instantly so businesses can communicate better at scale.";

const h1 = "relative z-[5] text-(length:--h1) leading-[120%] font-bold uppercase";

export function Hero() {
  return (
    <section className="relative overflow-hidden p-0">
      <div className="relative h-[1110px] bg-era-cloud xl2:h-[1130px] min-[1920px]:h-[1159px] tab:h-[772px] mob:h-[720px] sm2:h-[540px]">
        {/* alt beyaz geçiş */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a("699d73-4e0afdb11fbf25944e7fe5040cbd15bb-group-2087329864.webp")}
            alt=""
            className="pointer-events-none block h-full w-full"
          />
        </div>

        <div className="mx-auto w-full max-w-[1470px] px-[15px]">
          {/* ana görsel */}
          <div className="absolute inset-y-0 right-0 left-[6%] flex flex-col items-center pt-[140px] min-[1280px]:left-[7%] min-[1920px]:left-[3%] tab:right-[6%] tab:pt-[86px] mob:inset-x-0 mob:top-auto mob:bottom-0 mob:pt-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a("699fe9-b1d009b931c9b3054a342529b3a11d13-download-upscayl-8x-upscayl-standard-4x-2.webp")}
              alt="Voice AI agent"
              className="era-in-img pointer-events-none relative z-[1] h-[1037px] w-[767px] max-w-none object-cover min-[1920px]:ml-10 tab:h-[686px] tab:w-[500px] mob:h-[620px] mob:w-[460px] sm2:h-[473px] sm2:w-[350px]"
            />
          </div>

          {/* masaüstü içerik */}
          <div className="grid grid-cols-2 gap-4 pt-[220px] min-[1280px]:pt-[230px] xl2:pt-[240px] min-[1920px]:pt-[256px] tab:hidden">
            <div className="relative flex w-[395px] flex-col gap-[195px] min-[1280px]:gap-[191px] xl2:-top-8 xl2:gap-[127px] min-[1920px]:-top-14 min-[1920px]:gap-[120px]">
              <h1 className={`${h1} era-in-left`}>I’M</h1>
              <div className="relative z-[5] flex flex-col gap-8">
                <p className="max-w-[395px] text-(length:--t-rx) mob:text-[16px] leading-[148%] text-era-gray">{copy}</p>
                <div>
                  <SecondaryButton href="#">Started</SecondaryButton>
                </div>
              </div>
            </div>

            <div className="relative top-[44px] flex flex-col items-end justify-end justify-self-end gap-[205px] min-[1280px]:top-[38px] min-[1280px]:gap-0 xl2:top-[86px] xl2:gap-[200px] min-[1920px]:top-[68px]">
              <div className="era-in-drop relative z-[5]">
                <div className="flex flex-col gap-2 rounded-(--t-r) border-2 border-white bg-white/60 p-4 backdrop-blur-[12px]">
                  <div className="text-(length:--t-mxl) leading-[124%] font-medium">Members Joined</div>
                  <div className="flex items-center gap-2.5">
                    <div className="relative z-[5] inline-flex">
                      {users.map((u, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={u} src={a(u)} alt="" className={`object-cover ${i === 0 ? "" : "-ml-3"}`} />
                      ))}
                    </div>
                    <div className="leading-[124%]">20k+ users</div>
                  </div>
                </div>
              </div>
              <h1 className={`${h1} era-in-right`}>ERA</h1>
            </div>
          </div>

          {/* tablet / mobil içerik */}
          <div className="relative z-50 hidden pt-[360px] tab:block mob:pt-[355px] sm2:pt-[210px]">
            <div className="flex items-end justify-between mob:mx-auto mob:h-[302px] mob:w-[450px] mob:max-w-full mob:flex-col mob:items-center mob:justify-between mob:gap-6 mob:rounded-(--r-r) mob:bg-white/60 mob:p-5 mob:backdrop-blur-[4px] sm2:h-auto sm2:w-auto sm2:items-start">
              <div className="flex flex-col gap-[60px] mob:flex-row mob:gap-5 sm2:gap-2.5">
                <h1 className="era-in-left text-(length:--h1) leading-(--lh-h1) font-bold uppercase">I’M</h1>
                <h1 className="era-in-right text-(length:--h1) leading-(--lh-h1) font-bold uppercase">ERA</h1>
              </div>
              <div className="flex w-[250px] flex-col items-start gap-8 self-end mob:w-auto mob:gap-6 mob:self-center sm2:gap-2.5 sm2:self-start">
                <p className="text-(length:--t-rx) mob:text-[16px] leading-[148%] text-era-black">{copy}</p>
                <div>
                  <SecondaryButton href="#">Started</SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a("69abf8-7ea9ec3205ef05042b13e446f949827e-frame-2147239757.svg")}
            alt=""
            className="pointer-events-none block h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
