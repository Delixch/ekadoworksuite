/** Türkçe metinler. Yeni metin eklerken en.ts ve de.ts dosyalarına da aynı anahtarı ekle. */
export const tr = {
  meta: {
    title: "Punn Digital | Dijital Resepsiyon",
    description: "Otelinizin mesaj ve aramalarını 7/24, 30’dan fazla dilde cevaplayan Dijital Resepsiyonist.",
  },
  ui: {
    language: "Dil",
    menu: "Menü",
    toLight: "Gündüz temasına geç",
    toDark: "Gece temasına geç",
    lightTitle: "Gündüz teması",
    darkTitle: "Gece teması",
    homeAria: "Punn Digital ana sayfa",
  },
  nav: {
    solutions: "Çözümlerimiz",
    solutionItems: [
      "Dijital Resepsiyon",
      "Yapay Zekâ Telefon Asistanı",
      "PMS / Otel Yönetim Sistemi",
      "Akıllı Kapı / Kilit Sistemleri",
    ],
    links: ["Test Et", "Teknolojimiz", "Müşterilerimiz", "Bize Ulaşın", "Blog"],
    demo: "Demo Talep Et",
  },
  hero: {
    lines: ["Otelinizin iletişimini", "Dijital Resepsiyonist", "ile yönetin."],
    accent: 1,
    lead: "Misafir mesajlarını ve telefon-whatsapp aramalarını 30’dan fazla dilde, 7/24, insan doğallığında cevaplar.",
    test: "Test Et",
    demo: "Demo Talep Et",
    channelsAria: "Desteklenen kanallar",
    phone: "Telefon",
    webChat: "Web chat",
  },
  mockup: {
    menu: [
      "Genel Bakış",
      "Mesajlar",
      "Aramalar",
      "Misafir Talepleri",
      "Müşteriler",
      "Hatırlatmalar",
      "Kampanyalar",
      "Geliştirme",
      "Ayarlar",
    ],
    admin: "Sistem Yöneticisi",
    overview: "Genel Bakış",
    aiOn: "AI Açık",
    hotel: "Otel",
    hotelNote: "Dijital resepsiyon 7/24 · AI otomatik cevaplama açık",
    greeting: "İyi geceler",
    tabs: ["Bugün", "7 gün", "30 gün", "Özel"],
    autoReply: "AI otomatik cevaplama açık",
    answered: "128 mesaj, 70 arama cevaplandı",
    minShort: "dk",
    statResponse: "Ort. AI yanıt süresi",
    statApproval: "Onay bekleyen",
    statSatisfaction: "Misafir memnuniyeti",
    attention: "Dikkatinizi bekleyenler",
    pending: "Alım talebi bekleyen yer",
    allGood: "Her şey yolunda",
    nothing: "Ekibinizin ilgilenmesi gereken bir şey yok.",
    phoneTitle: "Dijital Resepsiyonist",
    online: "Çevrimiçi",
    guestMsg: "Merhaba, iki kişilik odanız var mı?",
    botMsg:
      "Merhaba! Hangi tarihlerde konaklamayı düşünüyorsunuz? Yetişkin sayısı ve varsa çocuk yaşlarını rica edeceğim.",
    typeMsg: "Mesaj yazın...",
    liveCall: "Canlı arama",
    detected: "Dil algılandı",
    translated: "İki kişilik oda ne kadar?",
    replying: "Yanıtlıyor…",
    bookingTitle: "Yeni rezervasyon",
    bookingNote: "Çift kişilik · 3 gece",
    chatAria: "Çok dilli örnek sohbet",
  },
  features: {
    eyebrow: "Neler yapar?",
    heading: "Resepsiyon yükünü azaltır, satış fırsatlarını artırır.",
    lead: "Tekrar eden sorular asistanda kalır. Ekibiniz misafirle yüz yüze ilgilenmeye vakit bulur, fırsatlar raporlarda görünür.",
    groups: [
      {
        kicker: "Her kanalda, her dilde",
        title: "Misafirle iletişim",
        items: [
          {
            title: "Tüm kanallarda 7/24 yanıt",
            text: "WhatsApp, Instagram, Facebook, web sitesi canlı sohbeti ve telefon aramalarına anında yanıt verir.",
          },
          {
            title: "Telefon asistanı",
            text: "30+ dilde aramaları yanıtlar, oda ve fiyat bilgisi verir, görüşme özetini yetkiliye gönderir.",
          },
          { title: "30+ dilde iletişim", text: "Misafir hangi dilde yazarsa o dilde, doğal bir üslupla cevap verir." },
          {
            title: "Tatil asistanı",
            text: "Misafir otele geldikten sonra da ulaşım, yeme-içme, gezi ve otel içi ihtiyaçlarda yanında olur.",
          },
        ],
      },
      {
        kicker: "Talebi gelire çevirir",
        title: "Satış ve rezervasyon",
        items: [
          {
            title: "Rezervasyona dönüştürme",
            text: "Müsaitlik sunar, yönlendirir ve talebi doğrudan rezervasyona taşır.",
          },
          { title: "Sanal POS ile ödeme", text: "Ödeme linki göndererek ön provizyon veya peşin ödeme alır." },
          {
            title: "PMS bağlantısı",
            text: "Otel programınızdaki oda durumunu görür, bilgi verir ve rezervasyon oluşturur.",
          },
          {
            title: "Google, Booking ve ETS puanlama",
            text: "Konaklama sonrası misafirden değerlendirme ister, puanlama sayfasına yönlendirir.",
          },
        ],
      },
      {
        kicker: "Her şey kontrolünüzde",
        title: "Yönetim",
        items: [
          {
            title: "Raporlama ve analiz",
            text: "Kanal bazlı görüşme, rezervasyon, satış ve performans verilerini görün.",
          },
          {
            title: "CRM yönetimi",
            text: "Potansiyel misafirleri, talepleri ve dönüşüm sürecini tek panelde izleyin.",
          },
          {
            title: "E-posta bildirimleri",
            text: "Önemli gelişmeler ve rezervasyon detayları anında e-postanıza gelir.",
          },
          {
            title: "Kolay eğitim, açma-kapama",
            text: "Asistanı kolayca eğitin, istediğiniz saatlerde açıp kapatın.",
          },
        ],
      },
    ],
    extrasTitle: "Ek avantajlar",
    extras: [
      { title: "Kolay kurulum", text: "Hızlı ve zahmetsiz kurulum süreci." },
      { title: "Doğal iletişim", text: "İnsan gibi sıcak ve profesyonel iletişim." },
      { title: "Güvenli altyapı", text: "Verilerinizi koruyan güvenli sistem yapısı." },
    ],
  },
};

export type Dict = typeof tr;
