import { Navbar } from "@/components/sites/era/Navbar";
import { Hero } from "@/components/sites/era/Hero";
// import { Marquee } from "@/components/sites/era/Marquee"; // Era şablonundan kalan, Punn içeriği yazılana kadar yayında değil
// import { About } from "@/components/sites/era/About"; // Era şablonundan kalan, Punn içeriği yazılana kadar yayında değil
import { Features } from "@/components/sites/era/Features";
import { Journey } from "@/components/sites/era/Journey";
import { Solutions } from "@/components/sites/era/Solutions";
import { Technology } from "@/components/sites/era/Technology";
// import { Voice } from "@/components/sites/era/Voice"; // Era şablonundan kalan, Punn içeriği yazılana kadar yayında değil
import { Pricing } from "@/components/sites/era/Pricing";
// import { Testimonials } from "@/components/sites/era/Testimonials"; // Era şablonundan kalan, Punn içeriği yazılana kadar yayında değil
import { Faq } from "@/components/sites/era/Faq";
import { Cta } from "@/components/sites/era/Cta";
import { Footer } from "@/components/sites/era/Footer";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        {/* <Marquee /> */}
        {/* <About /> */}
        <Features />
        <Journey />
        <Solutions />
        <Technology />
        {/* <Voice /> */}
        <Pricing />
        {/* <Testimonials /> */}
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
