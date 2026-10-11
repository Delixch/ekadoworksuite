import { a } from "./assets";
import { Heading } from "./ui";
import { SpreadGrid } from "./Scrub";

const items = [
  ["699684-simplification.svg", "Voice Changer", "Modify your voice in real-time or from recordings for fun, anonymity, or creative projects."],
  ["699684-simplification-1-.svg", "Audio Enhancer", "Boost audio quality instantly for clearer, louder, and more professional sound."],
  ["699684-simplification-2-.svg", "Vocal Remover", "Remove vocals from any song to create karaoke tracks or remix-ready instrumentals."],
  ["699684-simplification-3-.svg", "Echo Remover", "Eliminate unwanted echo from recordings for a cleaner, studio-like sound."],
  ["699684-simplification-4-.svg", "Stem Splitter", "Split audio into separate tracks like vocals, drums, and instruments for full control."],
  ["699684-simplification-5-.svg", "Audio Converter", "Convert audio files between formats like MP3, WAV, and FLAC with ease."],
];

export function Services() {
  return (
    <section
      id="Service"
      className="relative bg-era-dark pt-[100px] pb-[82px] tab:py-[50px] mob:py-10 sm2:py-[35px]"
    >
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-20 tab:gap-[60px] mob:gap-[50px] sm2:gap-10">
          <div className="mx-auto flex w-full max-w-[581px] flex-col items-center gap-4 text-center">
            <Heading className="text-era-on-dark">I’m Help to You</Heading>
            <p className="mx-auto w-full max-w-[400px] text-era-on-dark">
              End-to-end Voice AI solutions designed to automate, scale, and optimize conversations.
            </p>
          </div>
          <SpreadGrid className="grid grid-cols-3 gap-6 tab:grid-cols-2 mob:grid-cols-1">
            {items.map(([icon, title, text]) => (
              <div key={title} className="h-full will-change-transform">
                <div className="flex h-full flex-col gap-[63px] rounded-(--r-x) bg-era-chinese p-9 mob:p-6">
                  <div className="h-[60px] w-full max-w-[60px] tab:h-[50px] tab:max-w-[50px] mob:h-10 mob:max-w-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a(icon)} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-(length:--h6) leading-[148%] font-medium text-era-on-dark">{title}</h4>
                    <p className="text-era-silver">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </SpreadGrid>
        </div>
      </div>
    </section>
  );
}
