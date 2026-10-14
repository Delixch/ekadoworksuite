import { Navbar } from "@/components/sites/era/Navbar";
import { Hero } from "@/components/sites/era/Hero";
import { Marquee } from "@/components/sites/era/Marquee";
// import { About } from "@/components/sites/era/About"; // Era şablonundan kalan, Ekado içeriği yazılana kadar yayında değil
import { Features } from "@/components/sites/era/Features";
import { Journey } from "@/components/sites/era/Journey";
import { Solutions } from "@/components/sites/era/Solutions";
// import { Technology } from "@/components/sites/era/Technology"; // akıllı kapı kilidi (otel ürünü), Ekado WorkSuite için kullanılmıyor
// import { Voice } from "@/components/sites/era/Voice"; // Era şablonundan kalan, Ekado içeriği yazılana kadar yayında değil
// import { Pricing } from "@/components/sites/era/Pricing"; // fiyat/paket belli olunca yeniden yazılacak
// import { Testimonials } from "@/components/sites/era/Testimonials"; // Era şablonundan kalan, Ekado içeriği yazılana kadar yayında değil
import { Faq } from "@/components/sites/era/Faq";
import { Cta } from "@/components/sites/era/Cta";
import { Offices } from "@/components/sites/era/Offices";
import { Footer } from "@/components/sites/era/Footer";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        {/* <About /> */}
        <Features />
        <Journey />
        <Solutions />
        {/* <Voice /> */}
        {/* <Testimonials /> */}
        <Faq />
        <Cta />
        <Offices />
      </main>
      <Footer />
    </div>
  );
}
