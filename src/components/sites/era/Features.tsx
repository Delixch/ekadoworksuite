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

function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-(--r-s1) bg-era-secondary text-era-primary-ink">
      <Icon size={21} strokeWidth={1.9} />
    </span>
  );
}

export function Features() {
  return (
    <section id="dijital-resepsiyon" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-12 mob:gap-9">
          <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-4 text-center">
            <span className="text-[14px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">Neler yapar?</span>
            <Heading>Resepsiyon yükünü azaltır, satış fırsatlarını artırır.</Heading>
            <Reveal variant="fade">
              <p className="text-era-gray">
                Tekrar eden sorular asistanda kalır. Ekibiniz misafirle yüz yüze ilgilenmeye vakit bulur, fırsatlar
                raporlarda görünür.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto grid w-full grid-cols-3 items-start gap-6 tab:max-w-[680px] tab:grid-cols-1">
            {groups.map((g, gi) => (
              <Reveal key={g.title} variant={g.variant} delay={gi * 120} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-(--r-x) border border-era-line bg-era-white shadow-[0_8px_30px_var(--c-shadow-soft)]">
                  <header className="punn-card-head flex flex-col gap-2 px-7 py-6 text-era-on-dark mob:px-5 mob:py-5">
                    <span className="text-[14px] font-semibold opacity-85">{g.kicker}</span>
                    <h3 className="text-[26px] leading-tight font-bold tracking-[-0.01em] mob:text-[22px]">{g.title}</h3>
                  </header>
                  <ul className="flex flex-col gap-6 px-7 py-7 mob:gap-5 mob:px-5 mob:py-6">
                    {g.items.map((it, i) => (
                      <li key={it.title}>
                        <Reveal variant="fade" delay={200 + i * 130} className="flex gap-4">
                          <IconBox icon={it.icon} />
                          <div className="min-w-0">
                            <h4 className="text-[17px] leading-snug font-semibold text-era-black">{it.title}</h4>
                            <p className="mt-1 text-[15px] leading-[1.55] text-era-gray">{it.text}</p>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up">
            <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-6 rounded-(--r-x) bg-era-secondary p-7 tab:grid-cols-1 tab:gap-5 mob:p-5">
              <div className="col-span-3 -mb-1 text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase tab:col-span-1">
                Ek avantajlar
              </div>
              {extras.map((e) => (
                <div key={e.title} className="flex items-center gap-4">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-white text-era-primary-ink">
                    <e.icon size={22} strokeWidth={1.9} />
                  </span>
                  <div>
                    <div className="text-[17px] font-semibold text-era-black">{e.title}</div>
                    <div className="text-[15px] text-era-gray">{e.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
