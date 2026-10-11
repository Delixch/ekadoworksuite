import { Navbar } from "@/components/sites/era/Navbar";
import { Hero } from "@/components/sites/era/Hero";
import { Marquee } from "@/components/sites/era/Marquee";
import { About } from "@/components/sites/era/About";
import { Features } from "@/components/sites/era/Features";
import { Process } from "@/components/sites/era/Process";
import { Services } from "@/components/sites/era/Services";
import { Voice } from "@/components/sites/era/Voice";
import { Pricing } from "@/components/sites/era/Pricing";
import { Testimonials } from "@/components/sites/era/Testimonials";
import { Faq } from "@/components/sites/era/Faq";
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
        <Process />
        <Services />
        <Voice />
        <Pricing />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
