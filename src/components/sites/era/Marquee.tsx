import { a } from "./assets";
import { Heading, Reveal } from "./ui";

const logos = [
  "699542-logo-7-.svg",
  "699542-logo-1-.svg",
  "699542-logo-2-.svg",
  "699542-logo-4-.svg",
  "699542-logo-5-.svg",
  "699542-logo-6-.svg",
];

export function Marquee() {
  return (
    <section className="relative overflow-x-clip pt-[76px] pb-[70px] tab:pb-[50px] mob:pb-10 sm2:pb-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col items-center gap-8 overflow-x-clip">
          <Heading as="h4" className="!text-(length:--t-mx) !leading-[148%]">
            Trusted By WorldWide Company
          </Heading>
          <Reveal className="flex w-full items-center gap-[67px] overflow-hidden mob:gap-10 sm2:gap-[35px]">
            {[0, 1, 2, 3, 4].map((n) => (
              <div
                key={n}
                aria-hidden={n > 0}
                className="era-marquee-list flex flex-none items-start justify-center gap-[67px] mob:gap-10 sm2:gap-[35px]"
              >
                {logos.map((l) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={l} src={a(l)} alt="" className="max-w-none dark:invert sm2:min-w-[100px]" />
                ))}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
