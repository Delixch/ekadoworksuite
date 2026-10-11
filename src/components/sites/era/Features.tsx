import {
  CalendarCheck,
  ChartColumn,
  CreditCard,
  Inbox,
  Languages,
  Link2,
  Mail,
  MessageCircle,
  Phone,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Heading, Reveal, type Variant } from "./ui";
import { Spot } from "./Spot";

type Item = { icon: LucideIcon; title: string; text: string };
type Group = { kicker: string; title: string; variant: Variant; items: Item[] };

/** İçerik: PDF (güncel) + eski site. Metinler kart genişliğine göre kısaltıldı. */
const groups: Group[] = [
  {
    kicker: "Her kanalda, her dilde",
    title: "Misafirle iletişim",
    variant: "left",
    items: [
      {
        icon: Inbox,
        title: "Tüm kanallarda 7/24 yanıt",
        text: "WhatsApp, Instagram, Facebook, web sitesi canlı sohbeti ve telefon aramalarına anında yanıt verir.",
      },
      {
        icon: Phone,
        title: "Telefon asistanı",
        text: "30+ dilde aramaları yanıtlar, oda ve fiyat bilgisi verir, görüşme özetini yetkiliye gönderir.",
      },
      {
        icon: Languages,
        title: "30+ dilde iletişim",
        text: "Misafir hangi dilde yazarsa o dilde, doğal bir üslupla cevap verir.",
      },
      {
        icon: Sun,
        title: "Tatil asistanı",
        text: "Misafir otele geldikten sonra da ulaşım, yeme-içme, gezi ve otel içi ihtiyaçlarda yanında olur.",
      },
    ],
  },
  {
    kicker: "Talebi gelire çevirir",
    title: "Satış ve rezervasyon",
    variant: "up",
    items: [
      {
        icon: CalendarCheck,
        title: "Rezervasyona dönüştürme",
        text: "Müsaitlik sunar, yönlendirir ve talebi doğrudan rezervasyona taşır.",
      },
      {
        icon: CreditCard,
        title: "Sanal POS ile ödeme",
        text: "Ödeme linki göndererek ön provizyon veya peşin ödeme alır.",
      },
      {
        icon: Link2,
        title: "PMS bağlantısı",
        text: "Otel programınızdaki oda durumunu görür, bilgi verir ve rezervasyon oluşturur.",
      },
      {
        icon: Star,
        title: "Google, Booking ve ETS puanlama",
        text: "Konaklama sonrası misafirden değerlendirme ister, puanlama sayfasına yönlendirir.",
      },
    ],
  },
  {
    kicker: "Her şey kontrolünüzde",
    title: "Yönetim",
    variant: "right",
    items: [
      {
        icon: ChartColumn,
        title: "Raporlama ve analiz",
        text: "Kanal bazlı görüşme, rezervasyon, satış ve performans verilerini görün.",
      },
      {
        icon: Users,
        title: "CRM yönetimi",
        text: "Potansiyel misafirleri, talepleri ve dönüşüm sürecini tek panelde izleyin.",
      },
      {
        icon: Mail,
        title: "E-posta bildirimleri",
        text: "Önemli gelişmeler ve rezervasyon detayları anında e-postanıza gelir.",
      },
      {
        icon: SlidersHorizontal,
        title: "Kolay eğitim, açma-kapama",
        text: "Asistanı kolayca eğitin, istediğiniz saatlerde açıp kapatın.",
      },
    ],
  },
];

const extras: Item[] = [
  { icon: Settings, title: "Kolay kurulum", text: "Hızlı ve zahmetsiz kurulum süreci." },
  { icon: MessageCircle, title: "Doğal iletişim", text: "İnsan gibi sıcak ve profesyonel iletişim." },
  { icon: ShieldCheck, title: "Güvenli altyapı", text: "Verilerinizi koruyan güvenli sistem yapısı." },
];

function IconBox({ icon: Icon, featured }: { icon: LucideIcon; featured?: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 flex-none items-center justify-center rounded-full transition-transform duration-500 group-hover/item:scale-110 ${
        featured
          ? "bg-era-on-dark/12 text-era-on-dark ring-1 ring-era-on-dark/25"
          : "bg-era-white text-era-primary-ink ring-1 ring-era-line"
      }`}
    >
      <Icon size={20} strokeWidth={1.8} />
    </span>
  );
}

export function Features() {
  return (
    <section id="dijital-resepsiyon" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-14 mob:gap-9">
          <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> Neler yapar?
            </span>
            <Heading>Resepsiyon yükünü azaltır, satış fırsatlarını artırır.</Heading>
            <Reveal variant="fade">
              <p className="text-era-gray">
                Tekrar eden sorular asistanda kalır. Ekibiniz misafirle yüz yüze ilgilenmeye vakit bulur, fırsatlar
                raporlarda görünür.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto grid w-full grid-cols-3 items-stretch gap-6 tab:max-w-[680px] tab:grid-cols-1">
            {groups.map((g, gi) => {
              const featured = gi === 0;
              return (
                <Reveal key={g.title} variant={g.variant} delay={gi * 120} className="h-full">
                  <Spot
                    className={`flex h-full flex-col rounded-(--r-x) px-8 py-9 mob:px-6 mob:py-7 ${
                      featured ? "punn-feature text-era-on-dark" : "punn-panel"
                    }`}
                  >
                    <div className="relative z-[1] flex flex-col gap-3">
                      <span
                        className={`flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold ${
                          featured ? "bg-era-on-dark/12 text-era-on-dark" : "bg-era-secondary text-era-primary-ink"
                        }`}
                      >
                        <i className={`block h-1.5 w-1.5 rounded-full ${featured ? "bg-era-on-dark" : "bg-era-accent"}`} />
                        {g.kicker}
                      </span>
                      <h3
                        className={`text-[30px] leading-[1.1] font-extrabold tracking-[-0.025em] mob:text-[26px] ${
                          featured ? "" : "text-era-black"
                        }`}
                      >
                        {g.title}
                      </h3>
                    </div>

                    <ul className="relative z-[1] mt-7 flex flex-col">
                      {g.items.map((it, i) => (
                        <li
                          key={it.title}
                          className={`group/item py-5 first:pt-0 last:pb-0 ${
                            i > 0 ? (featured ? "border-t border-era-on-dark/15" : "border-t border-era-line") : ""
                          }`}
                        >
                          <Reveal variant="fade" delay={200 + i * 130} className="flex gap-4">
                            <IconBox icon={it.icon} featured={featured} />
                            <div className="min-w-0">
                              <h4
                                className={`text-[17px] leading-snug font-semibold transition-colors duration-300 ${
                                  featured ? "" : "text-era-black group-hover/item:text-era-primary-ink"
                                }`}
                              >
                                {it.title}
                              </h4>
                              <p
                                className={`mt-1 text-[15px] leading-[1.55] ${
                                  featured ? "text-era-on-dark/75" : "text-era-gray"
                                }`}
                              >
                                {it.text}
                              </p>
                            </div>
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                  </Spot>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="up">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-era-line" />
                <span className="text-[13px] font-semibold tracking-[0.14em] text-era-gray uppercase">Ek avantajlar</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-era-line" />
              </div>
              <div className="grid grid-cols-3 gap-8 tab:grid-cols-1 tab:gap-6">
                {extras.map((e) => (
                  <div key={e.title} className="group/item flex items-center gap-4">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-secondary text-era-primary-ink ring-1 ring-era-line transition-transform duration-500 group-hover/item:scale-110">
                      <e.icon size={21} strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className="text-[17px] font-semibold text-era-black">{e.title}</div>
                      <div className="text-[15px] text-era-gray">{e.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
