import { Navbar } from "@/components/sites/era/Navbar";
import { Hero } from "@/components/sites/era/Hero";
import { Marquee } from "@/components/sites/era/Marquee";
import { About } from "@/components/sites/era/About";
import { Features } from "@/components/sites/era/Features";
import { Journey } from "@/components/sites/era/Journey";
import { Solutions } from "@/components/sites/era/Solutions";
import { Technology } from "@/components/sites/era/Technology";
import { Voice } from "@/components/sites/era/Voice";
import { Pricing } from "@/components/sites/era/Pricing";
import { Testimonials } from "@/components/sites/era/Testimonials";
import { Faq } from "@/components/sites/era/Faq";
import { Cta } from "@/components/sites/era/Cta";
import { Footer } from "@/components/sites/era/Footer";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Features />
        <Journey />
        <Solutions />
        <Technology />
        <Voice />
        <Pricing />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
