import type { BetriebKey } from "@/lib/betrieb-videos";
import type { Locale } from "./useLocale";

/**
 * "Genel Bakış ve İşletme" sayfasının metinleri (3 dil).
 * İçerik programın kodundan çıkarıldı (D:\repos\Gastro apps supi: NavList.tsx, modules/*).
 * Sıra programdaki menü sırası; videolar src/lib/betrieb-videos.ts içinde.
 * Bölümler müşteriye göre açılıp kapanır, hiçbiri bir sektöre bağlı yazılmaz.
 */
export type BetriebItem = {
  key: BetriebKey;
  /** programdaki menü adı */
  menu: string;
  title: string;
  lead: string;
  features: string[];
  /** Taslak 2: günün hangi saatinde */
  time: string;
  moment: string;
  /** Taslak 3: işletme sahibinin sorusu ve cevap */
  question: string;
  answer: string;
};

/** Soru-cevap sayfasındaki bir soru (BetriebItem da bu şekle uyar) */
export type QaItem = { key: string; menu: string; question: string; answer: string; features: string[] };

export type BetriebText = {
  title: string;
  eyebrow: string;
  heading: string;
  lead: string;
  /** "gözünüzde resim oluşsun" notu: başlık ve metin */
  pictureTitle: string;
  pictureText: string;
  draftLabel: string;
  draftNote: string;
  variants: { name: string; idea: string }[];
  inProgram: string;
  featuresLabel: string;
  groupBetrieb: string;
  chatOwner: string;
  chatBot: string;
  next: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
  /** Soru-cevap sayfası (/modul/uebersicht-betrieb) */
  qa: {
    eyebrow: string;
    heading: string;
    lead: string;
    film: string;
    films: { title: string; text: string }[];
    topics: string;
    watch: string;
    watchFrom: string;
    more: string;
    soon: string;
    /** Videoda anlatılan ama menüde İşletme altında olmayan adımlar (ör. yeni çalışan) */
    extra: QaItem[];
  };
  items: BetriebItem[];
};

const tr: BetriebText = {
  title: "Genel Bakış ve İşletme",
  eyebrow: "Modül · Genel Bakış ve İşletme",
  heading: "Sabah açılıştan akşam kapanışa, gün tek programda",
  lead: "Programın ilk iki bölümü: Genel Bakış ve İşletme. Vardiya planı, giriş-çıkış, hijyen ve görevler, saha işleri, vitrin, sadakat kartı, web sitesi ve duyurular. Her bölümün kısa videosu ve neler yaptığı aşağıda. Hangi bölümlerin açık olacağı işletmenize göre ayarlanır.",
  pictureTitle: "Burada amaç gözünüzde bir resim oluşması",
  pictureText: "Aşağıda her bölümün ne iş yaptığını görüyorsunuz. Örneğin buzdolabı kontrolü bölümü var; işinize yaramıyorsa kaldırırız. Eksik olanı ekler, fazla olanı çıkarırız: program sizin işletmenize göre kurulur.",
  draftLabel: "Taslak · aynı içerik, 5 farklı tasarım",
  draftNote: "Beğendiğiniz tasarımın numarasını söyleyin; sayfa o tasarımla kalır, diğerleri silinir.",
  variants: [
    { name: "Programın kendisi", idea: "Soldaki menü programdaki menünün aynısı. Bir satıra basınca o bölüm açılır." },
    { name: "Bir iş günü", idea: "Her bölüm, günün kullanıldığı saatinde çıkar. Kaydırdıkça saat döner." },
    { name: "Sorun, gösterelim", idea: "İşletme sahibinin soruları; cevap olarak programdan bir bölüm ve videosu." },
    { name: "Bölüm bölüm", idea: "Dizi izler gibi: büyük oynatıcı ve altta 01/09 bölüm şeridi." },
    { name: "Üst üste kartlar", idea: "Kaydırdıkça her bölüm bir kart olarak gelir ve öncekinin üstüne biner." },
  ],
  inProgram: "Programda",
  featuresLabel: "Neler yapar",
  groupBetrieb: "İşletme",
  chatOwner: "İşletme sahibi",
  chatBot: "Ekado",
  next: "Sonraki bölüm",
  ctaHeading: "Kendi işletmenizde görün",
  ctaText: "Kısa bir görüşmede bu bölümleri sizin işinize göre ayarlayıp gösterelim.",
  ctaButton: "İletişime Geç",
  qa: {
    "eyebrow": "Modül · Genel Bakış ve İşletme",
    "heading": "Sorun, gösterelim",
    "lead": "İşletme sahiplerinin en çok sorduğu sorular ve programdan cevapları. Her cevabın yanında kısa video: sorunun programda nasıl çözüldüğünü kendi gözünüzle görün.",
    "film": "Video",
    "films": [
      {
        "title": "Genel Bakış",
        "text": "Sabah ilk açılan ekran: işletmenin o anki durumu tek sayfada."
      },
      {
        "title": "Yeni bir çalışan",
        "text": "İlk iş gününden önce: kayıt, PIN, belgeler ve şefin onayı. Kâğıtsız, telefonsuz."
      },
      {
        "title": "Vardiya planı",
        "text": "Vardiya eklemek, çakışma ve dinlenme uyarıları, haftayı kopyalamak, yayınlamak ve vardiya takası."
      },
      {
        "title": "İş günü: giriş, mola, çıkış",
        "text": "Tablette PIN ile giriş, telefondan mola, şefin Stempeluhr ekranı ve unutulan damga."
      },
      {
        "title": "Günlük işler",
        "text": "Sıcaklık ölçümü, sapma ve önlem, kontrol listeleri, mal kabulü, temizlik planı ve duyuru panosu."
      },
      {
        "title": "Diğer bölümler",
        "text": "Vitrin sayımı, sadakat kartı ve web sitesi. Sonunda: bölümler işletmenize göre açılıp kapanır."
      },
      {
        "title": "Saha işleri",
        "text": "Müşteride yapılan işlerin planı ve takibi."
      }
    ],
    "topics": "Bu videoda",
    "watch": "Videoda izle",
    "watchFrom": "Videoda izle · {t}",
    "more": "Neler yapar",
    "soon": "Video yakında",
    "extra": [
      {
        "key": "neu",
        "menu": "Personel · Çalışanlar",
        "question": "Yeni bir çalışanı programa nasıl eklerim?",
        "answer": "Personel bölümünde Çalışanlar sayfasını açıp \"Yeni çalışan\"a basarsınız; ad, soyad, görev ve saat ücretini yazarsınız. İşe giriş tarihi sayesinde ilk ayın maaşı gün hesabıyla doğru çıkar. Kaydedince kart hemen listede görünür.",
        "features": [
          "Ad, soyad, görev, saat ücreti",
          "İşe giriş tarihi: ilk ayın maaşı gün hesabıyla",
          "Kaydedince kart hemen listede"
        ]
      },
      {
        "key": "pin",
        "menu": "Personel · Çalışanlar",
        "question": "Giriş kodu ve evrak takibi için ayrıca uğraşmam gerekir mi?",
        "answer": "Hayır. Program tablet kiosku için dört haneli PIN kodunu kendisi üretir. Aynı ekranda iş sözleşmesi, sigorta ve hijyen eğitimi kutularını da hemen işaretlersiniz.",
        "features": [
          "Kiosk için 4 haneli PIN otomatik",
          "Sözleşme, sigorta ve hijyen eğitimi işaretleri"
        ]
      },
      {
        "key": "sicht",
        "menu": "Bilgilerim",
        "question": "Çalışan kendi bilgilerini ve belgelerini kendisi girebilir mi?",
        "answer": "Evet. Şef tek tıkla çalışanın ekranına geçip programı onun gözünden görür: menüsü çok daha sade, sadece kendi işleri. \"Bilgilerim\" sayfasında çalışan kişisel bilgilerini, kimlik ve banka kartı fotoğraflarını kendisi gönderir; sonra şefin incelemesini bekler, başka bir şey yapması gerekmez.",
        "features": [
          "Şef tek tıkla çalışan görünümüne geçer",
          "Çalışanın menüsü sade: sadece kendi işleri",
          "Kişisel bilgiler, kimlik ve banka kartı fotoğrafı",
          "Gönderdikten sonra yapacak başka iş yok"
        ]
      },
      {
        "key": "pruefen",
        "menu": "İşe Alış İncelemesi",
        "question": "Gelen belgeleri nasıl kontrol ederim?",
        "answer": "\"İşe Alış İncelemesi\" sayfasında bekleyen başvurular listelenir. Ayrıntılara girip her belgeyi ayrı ayrı kontrol edersiniz, fotoğrafları büyütüp bakarsınız. Okunaklı olanları \"Kabul edildi\" ile onaylar, okunmayanı \"Okunamıyor\" diye işaretlersiniz.",
        "features": [
          "Bekleyen ve onaylanmış başvurular ayrı",
          "Her belge ayrı ayrı kontrol",
          "Fotoğrafı büyütüp inceleme",
          "Kabul edildi ya da Okunamıyor"
        ]
      },
      {
        "key": "nachforderung",
        "menu": "Bildirimler",
        "question": "Bir belge bulanık ya da eksikse ne olur?",
        "answer": "\"Düzeltme iste\" ile gönderirsiniz, çalışana anında bildirim gider. Kabul edilen belgeler korunur, sadece hatalı olan yeniden istenir. Çalışanın sayfasında hatalı belge kırmızıyla işaretlidir, yenisini yükler. Böylece çalışan ile işveren arasındaki ilk yazışma kâğıt ve telefon olmadan biter.",
        "features": [
          "Düzeltme iste: çalışana anında bildirim",
          "Kabul edilenler korunur, sadece hatalı olan yeniden",
          "Hatalı belge çalışanın sayfasında kırmızı",
          "Zil: şefin her işlemi çalışana bildirilir"
        ]
      }
    ]
  },
  items: [
    {
      key: "uebersicht",
      menu: "Genel Bakış",
      title: "İşletmenin durumu tek bakışta",
      lead: "Açılışta ilk ekran: kim çalışıyor, bugün hangi vardiyalar var, ciro nerede, ne bekliyor. Kartları kendiniz seçer, sürükler ve büyütürsünüz.",
      features: [
        "50'den fazla kart arasından seçim",
        "Ciro: gün, hafta, ay; geçen ay ve geçen yılla karşılaştırma",
        "Haftalık saatler ve canlı personel maliyeti",
        "Şu an kim işte, kim hasta, kim çıkışı unuttu",
        "S, M, L boyut: her boyutta farklı içerik",
        "Hazır şablonlar: İşletme sahibi, Sadece personel, Sadece finans",
        "Para gösteren kartları sadece şef görür",
      ],
      time: "06:30",
      moment: "Kahve soğumadan günün durumu ekranda.",
      question: "Sabah tek bakışta işletmenin durumunu görebilir miyim?",
      answer: "Evet. Genel Bakış'ta size hangi kartlar lazımsa onları seçersiniz: bugünkü vardiyalar, kim işte, ciro, açık faturalar, hijyen kontrolleri. Bir karta basınca ilgili sayfa doğrudan açılır.",
    },
    {
      key: "schichtplan",
      menu: "Vardiya Planı",
      title: "Haftayı dakikalar içinde planlayın",
      lead: "Haftalık ve aylık plan, izin ve hastalık kodlarıyla. Geçen haftayı kopyalayın, düzeltin, yayınlayın. Ekip sadece yayınlanan planı görür, değişiklikte bildirim alır.",
      features: [
        "Hafta ve ay görünümü, kişi başı toplam",
        "Geçen haftayı tek tıkla kopyalama",
        "Taslak, sonra Yayınla; değişiklikte ekibe bildirim",
        "İş kanunu uyarıları: 11 saat dinlenme, haftalık azami süre",
        "Asgari kadro kontrolü ve boştaki kişi önerisi",
        "Vardiya takası: şef onaylar, plan kendini günceller",
        "İsteğe bağlı yapay zekâ kontrolü, isimler gizlenerek",
      ],
      time: "07:00",
      moment: "Öğlen kadro yetiyor mu? Plan söylüyor.",
      question: "Vardiya planını her hafta baştan mı yapacağım?",
      answer: "Hayır. Geçen haftayı kopyalar, sadece değişenleri düzeltirsiniz. Dinlenme süresi ya da haftalık saat gibi kurallara aykırı bir şey varsa program uyarır. Yayınlayınca ekip planı telefonunda görür.",
    },
    {
      key: "stempeluhr",
      menu: "Stempeluhr",
      title: "Giriş-çıkış: hızlı, adil, hileye kapalı",
      lead: "Ekip tabletten PIN ile ya da telefondan giriş yapar. Telefonda konum, her 30 saniyede değişen QR kod ve selfie birlikte çalışır; arkadaşının yerine giriş yapmak işe yaramaz.",
      features: [
        "Tablet kiosk: PIN ve fotoğrafla giriş",
        "Telefonda üç kontrol: konum, değişen QR, selfie",
        "Plan ile gerçek saat yan yana, fark otomatik",
        "Geç kalma, erken çıkma, kısa mola uyarıları",
        "Düzeltme sadece kayıtla, silme yok",
        "Fotoğraflar maaştan 1 ay sonra kendiliğinden silinir",
        "Excel'e aktarma",
      ],
      time: "07:15",
      moment: "Ekip geliyor. Kim kaçta girdi, plan ne diyordu, hepsi yan yana.",
      question: "Biri arkadaşının yerine giriş yapabilir mi?",
      answer: "Yapamaz. Telefondan girişte konum, tabletteki her 30 saniyede değişen QR kod ve selfie birlikte istenir; fotoğrafı çekilip gönderilen kod çoktan geçersizdir. Engellenen denemeler size bildirilir.",
    },
    {
      key: "hygiene",
      menu: "Görevler & Hijyen",
      title: "HACCP kayıtları ve görevler, kâğıtsız",
      lead: "Soğutucu ve dondurucu ölçümleri, günlük kontrol listeleri, mal kabulü ve temizlik planı telefonda. Görev panosunda kimin neyi üstlendiği ve bitirdiği belli.",
      features: [
        "Sabah ve akşam sıcaklık ölçümü, süre dolunca hatırlatma",
        "Sınır aşılınca önlem zorunlu, şefe bildirim",
        "Ad ve saat sunucudan, düzeltme üstü çizili kalır",
        "Mal kabulü siparişle bağlantılı",
        "Aylık protokol, PDF ve Excel dışa aktarma",
        "Görevler: \"Ben yaparım\", fotoğraf şartı, yıldızla değerlendirme",
      ],
      time: "07:30",
      moment: "Sabah ölçümleri yapıldı, dolaplar imzalandı.",
      question: "Denetim gelince hijyen kayıtlarını nasıl gösteririm?",
      answer: "Aylık protokolü ya da istediğiniz dönemi firma başlığıyla PDF veya Excel olarak alırsınız. Kayıtlarda ad ve saati sunucu yazar; sonradan yapılan düzeltme üstü çizili olarak görünür kalır. Kimse kayıtları sonradan güzelleştiremez.",
    },
    {
      key: "einsaetze",
      menu: "Saha işleri",
      title: "Dışarıdaki işler de planın içinde",
      lead: "Müşteride yapılacak işler haftalık planda: kim, ne zaman, hangi adreste. Ekip telefondan yolda, yerinde, bitti diye işaretler; malzeme, fotoğraf ve not işin içinde kalır.",
      features: [
        "Haftalık iş planı, birden fazla gün ve kişi",
        "Müşteri ve adres kayıtları",
        "Durum: Planlandı, Yolda, Yerinde, Bitti",
        "Malzeme ve fiyat, fotoğraf, not",
        "Kişinin vardiyası yoksa ya da izinliyse uyarı",
        "Değiştirilemeyen işlem geçmişi",
      ],
      time: "09:00",
      moment: "Ekip müşteriye çıkıyor, durum telefondan güncelleniyor.",
      question: "Dışarıda çalışan ekibimin nerede ne yaptığını görebilir miyim?",
      answer: "Evet. Her iş için kimin gideceğini ve adresi planlarsınız; ekip telefondan \"yolda\", \"yerinde\", \"bitti\" diye işaretler. Malzeme, fotoğraf ve notlar işe eklenir, her değişiklik geçmişte kalır.",
    },
    {
      key: "vitrine",
      menu: "Vitrin",
      title: "Vitrin sayımı: ne satıldı, ne çöpe gitti",
      lead: "Sabah ve akşam vitrin sayımı: devralınan, üretilen, geri alınan, fire. Satış kendiliğinden hesaplanır, fire oranı ürün ürün görünür.",
      features: [
        "Sabah ve akşam sayım sayfası",
        "Satış otomatik hesaplanır",
        "Önceki vardiyadan devir tek tuşla",
        "Hatalı sayım renkle işaretlenir",
        "Vardiya kapanınca kilitlenir",
        "Ürün başına fire oranı ve CHF olarak fire",
      ],
      time: "11:00",
      moment: "Vitrin sayıldı, fire oranı ürün ürün belli.",
      question: "Hangi ürün çok fazla çöpe gidiyor, bilebilir miyim?",
      answer: "Evet. Sayımdan sonra her ürünün fire oranını ve franka karşılığını görürsünüz; sınırı aşan ürünler sarı ve kırmızı ile işaretlenir. Satılan miktarı program kendisi hesaplar.",
    },
    {
      key: "treuekarte",
      menu: "Sadakat kartı",
      title: "Dijital damga kartı, uygulama gerekmeden",
      lead: "Müşteri kartını telefonunda taşır, kasada taranır. Kart bastırmaya ya da başka bir firmaya gerek yok; kural, ödül ve süreleri siz belirlersiniz.",
      features: [
        "Kamera ya da el tarayıcısıyla okutma",
        "Hedef, ara ödül, hoş geldin hediyesi",
        "Kart: telefona resim, kredi kartı boyutunda PDF ya da link",
        "Müşteri kartını uygulamasız görür",
        "QR afişle müşterinin kendi kaydı",
        "60 gündür gelmeyene hazır WhatsApp mesajı",
      ],
      time: "12:30",
      moment: "Öğle yoğunluğu: kartlar taranıyor, onuncu kahve hediye.",
      question: "Müşterilerimin tekrar gelmesini nasıl sağlarım?",
      answer: "Sadakat kartıyla. Müşteri her alışverişte damga toplar, hedefe ulaşınca ödülünü alır. 60 gündür gelmeyen müşterilere tek tuşla hazır bir WhatsApp mesajı gönderirsiniz.",
    },
    {
      key: "webseite",
      menu: "Web sitesi",
      title: "İşletmenizin web sitesi, programcı olmadan",
      lead: "Başlık resmi, hakkımızda, menü ve fiyatlar, açılış saatleri ve bağlantılar. Bilgisayar ve telefon önizlemesine bakar, hazır olunca yayınlarsınız.",
      features: [
        "Menü: CHF fiyat, alerjenler, rozetler",
        "Vitrindeki ürünleri tek tıkla menüye aktarma",
        "Açılış saatleri, sipariş ve sosyal medya bağlantıları",
        "Bilgisayar ve telefon önizlemesi",
        "Tek dosya olarak dışa aktarma, Google takibi yok",
        "5 dilde etiketler",
      ],
      time: "15:00",
      moment: "Sakin saat: yarının menüsü siteye girildi.",
      question: "Menümü değiştirmek için her seferinde birine mi yazacağım?",
      answer: "Hayır. Menüyü, fiyatları ve açılış saatlerini programdan kendiniz değiştirir, önizlemeye bakıp yayınlarsınız. İsterseniz siteyi tek bir dosya olarak alıp kendi alan adınızda da kullanırsınız.",
    },
    {
      key: "brett",
      menu: "Duyuru Panosu",
      title: "Duyurular gerçekten okunuyor",
      lead: "Önemli bir duyuru, ekip giriş ya da çıkış yaptığında telefonda ve tablette çıkar ve okunduğu onaylanana kadar gelmeye devam eder. Kimin okuyup kimin okumadığını görürsünüz.",
      features: [
        "Önemli, Bilgi, Etkinlik kategorileri",
        "Önemli duyuru onaylanana kadar girişte çıkar",
        "Kişi kişi okundu bilgisi",
        "İçerik değişince herkes yeniden onaylar",
        "Sabitleme ve bitiş tarihi, sonra arşiv",
        "WhatsApp için hazır metin, okumayana hatırlatma",
      ],
      time: "17:30",
      moment: "Akşam vardiyasına not: yeni alerjen listesi. Herkes onayladı.",
      question: "Ekibin duyuruyu okuduğundan nasıl emin olurum?",
      answer: "Önemli duyuru, kişi giriş ya da çıkış yaptığında ekrana gelir ve okuduğunu onaylamasını ister. Panoda kimin okuduğunu kişi kişi görür, okumayanlara tek tuşla hatırlatma gönderirsiniz.",
    },
  ],
};

const de: BetriebText = {
  title: "Übersicht & Betrieb",
  eyebrow: "Modul · Übersicht & Betrieb",
  heading: "Von der Öffnung bis zum Feierabend: der ganze Tag in einem Programm",
  lead: "Die ersten zwei Bereiche im Programm: Übersicht und Betrieb. Schichtplan, Stempeluhr, Aufgaben und Hygiene, Einsätze, Vitrine, Treuekarte, Webseite und Schwarzes Brett. Zu jedem Bereich ein kurzes Video und was er kann. Welche Bereiche aktiv sind, richten wir nach Ihrem Betrieb ein.",
  pictureTitle: "Hier soll ein Bild vor Ihren Augen entstehen",
  pictureText: "Unten sehen Sie, was jeder Bereich tut. Zum Beispiel gibt es die Kühlschrank-Kontrolle; brauchen Sie sie nicht, nehmen wir sie heraus. Was fehlt, kommt dazu, was zu viel ist, fällt weg: das Programm wird auf Ihren Betrieb eingerichtet.",
  draftLabel: "Entwurf · gleicher Inhalt, 5 Gestaltungen",
  draftNote: "Nennen Sie die Nummer der Gestaltung, die Ihnen gefällt; die Seite bleibt so, die anderen werden entfernt.",
  variants: [
    { name: "Das Programm selbst", idea: "Links das Menü wie im Programm. Ein Klick öffnet den Bereich." },
    { name: "Ein Arbeitstag", idea: "Jeder Bereich erscheint zu der Uhrzeit, in der er gebraucht wird. Die Uhr dreht beim Scrollen mit." },
    { name: "Fragen Sie, wir zeigen es", idea: "Fragen von Inhabern, als Antwort ein Bereich aus dem Programm mit Video." },
    { name: "Folge für Folge", idea: "Wie eine Serie: grosser Player und darunter die Folgen 01/09 bis 09/09." },
    { name: "Gestapelte Karten", idea: "Beim Scrollen kommt jeder Bereich als Karte und legt sich auf die vorherige." },
  ],
  inProgram: "Im Programm",
  featuresLabel: "Was es kann",
  groupBetrieb: "Betrieb",
  chatOwner: "Inhaber",
  chatBot: "Ekado",
  next: "Nächste Folge",
  ctaHeading: "Sehen Sie es in Ihrem Betrieb",
  ctaText: "In einem kurzen Gespräch richten wir diese Bereiche nach Ihrem Betrieb ein und zeigen sie Ihnen.",
  ctaButton: "Kontakt aufnehmen",
  qa: {
    "eyebrow": "Modul · Übersicht & Betrieb",
    "heading": "Fragen Sie, wir zeigen es",
    "lead": "Die häufigsten Fragen von Inhabern und die Antwort aus dem Programm. Neben jeder Antwort ein kurzes Video: sehen Sie selbst, wie das Programm die Frage löst.",
    "film": "Video",
    "films": [
      {
        "title": "Übersicht",
        "text": "Der erste Bildschirm am Morgen: der Stand des Betriebs auf einer Seite."
      },
      {
        "title": "Eine neue Mitarbeiterin",
        "text": "Vor dem ersten Arbeitstag: Erfassung, PIN, Dokumente und Freigabe durch den Chef. Ohne Papier, ohne Telefon."
      },
      {
        "title": "Schichtplan",
        "text": "Schichten anlegen, Hinweise zu Konflikten und Ruhezeit, Woche kopieren, veröffentlichen und Schichttausch."
      },
      {
        "title": "Arbeitstag: Stempeln und Pause",
        "text": "Einstempeln mit PIN am Tablet, Pause per Handy, die Stempeluhr der Chefin und vergessene Stempel."
      },
      {
        "title": "Tägliche Arbeit",
        "text": "Temperaturmessung, Abweichung und Massnahme, Checklisten, Wareneingang, Reinigungsplan und Schwarzes Brett."
      },
      {
        "title": "Weitere Bereiche",
        "text": "Vitrine, Treuekarte und Webseite. Zum Schluss: Bereiche werden nach Ihrem Betrieb ein- und ausgeschaltet."
      },
      {
        "title": "Einsätze",
        "text": "Planung und Verfolgung der Arbeit beim Kunden."
      }
    ],
    "topics": "In diesem Video",
    "watch": "Im Video ansehen",
    "watchFrom": "Im Video ansehen · {t}",
    "more": "Was es kann",
    "soon": "Video folgt",
    "extra": [
      {
        "key": "neu",
        "menu": "Personalwesen · Mitarbeiter",
        "question": "Wie erfasse ich eine neue Mitarbeiterin im Programm?",
        "answer": "Im Personalwesen öffnen Sie die Seite Mitarbeiter und klicken auf «Neuen Mitarbeiter erfassen»; Vorname, Nachname, Funktion und Stundenlohn eintragen. Dank Eintrittsdatum wird der Lohn im ersten Monat tagesgenau berechnet. Nach dem Speichern steht die Karte sofort in der Liste.",
        "features": [
          "Vorname, Nachname, Funktion, Stundenlohn",
          "Eintrittsdatum: erster Monatslohn tagesgenau",
          "Nach dem Speichern sofort in der Liste"
        ]
      },
      {
        "key": "pin",
        "menu": "Personalwesen · Mitarbeiter",
        "question": "Muss ich mich um PIN und Unterlagen extra kümmern?",
        "answer": "Nein. Für den Kiosk erzeugt das Programm gleich eine vierstellige PIN. Im selben Fenster haken Sie Arbeitsvertrag, Versicherung und Hygieneschulung ab.",
        "features": [
          "4-stellige Kiosk-PIN automatisch",
          "Arbeitsvertrag, Versicherung, Hygieneschulung abhaken"
        ]
      },
      {
        "key": "sicht",
        "menu": "Meine Daten",
        "question": "Kann die Mitarbeiterin ihre Angaben und Dokumente selbst erfassen?",
        "answer": "Ja. Mit einem Klick wechselt die Chefin in die Ansicht der Mitarbeitenden: das Menü ist viel schlanker, nur die eigene Arbeit. Auf «Meine Daten» trägt die Person ihre Angaben ein und lädt Fotos von Ausweis und Bankkarte hoch; danach wartet sie auf die Prüfung und muss nichts weiter tun.",
        "features": [
          "Chef wechselt mit einem Klick in die Mitarbeiteransicht",
          "Schlankes Menü: nur die eigene Arbeit",
          "Persönliche Angaben, Ausweis- und Bankkartenfoto",
          "Danach nichts weiter zu tun"
        ]
      },
      {
        "key": "pruefen",
        "menu": "Onboarding prüfen",
        "question": "Wie prüfe ich die eingereichten Dokumente?",
        "answer": "Unter Onboarding prüfen warten die Einreichungen. Sie öffnen die Details, prüfen jedes Dokument einzeln und vergrössern die Fotos. Lesbare Dokumente bestätigen Sie mit «Akzeptiert», ein unlesbares markieren Sie als «Unleserlich».",
        "features": [
          "Offene und freigegebene Einreichungen getrennt",
          "Jedes Dokument einzeln prüfen",
          "Fotos vergrössern",
          "Akzeptiert oder Unleserlich"
        ]
      },
      {
        "key": "nachforderung",
        "menu": "Benachrichtigungen",
        "question": "Was passiert, wenn ein Dokument unscharf ist?",
        "answer": "Sie senden eine Nachforderung, die Person bekommt sofort eine Benachrichtigung. Bestätigte Dokumente bleiben erhalten, nur das fehlerhafte wird neu angefordert. Auf «Meine Daten» ist es rot markiert und wird neu hochgeladen. So läuft der erste Austausch zwischen Mitarbeiter und Chef ohne Papier und Telefon.",
        "features": [
          "Nachforderung: sofort benachrichtigt",
          "Bestätigte bleiben, nur das fehlerhafte neu",
          "Fehlerhaftes Dokument rot markiert",
          "Die Glocke meldet jede Aktion der Leitung"
        ]
      }
    ]
  },
  items: [
    {
      key: "uebersicht",
      menu: "Übersicht",
      title: "Der Stand des Betriebs auf einen Blick",
      lead: "Der erste Bildschirm am Morgen: wer arbeitet, welche Schichten heute laufen, wo der Umsatz steht, was ansteht. Die Karten wählen, verschieben und vergrössern Sie selbst.",
      features: [
        "Auswahl aus über 50 Karten",
        "Umsatz: Tag, Woche, Monat; Vergleich mit Vormonat und Vorjahr",
        "Wochenstunden und Personalkosten live",
        "Wer ist gerade da, wer krank, wer hat das Ausstempeln vergessen",
        "Grössen S, M, L: jede Grösse mit eigenem Inhalt",
        "Vorlagen: Inhaber, Nur Personal, Nur Finanzen",
        "Karten mit Geld sieht nur der Chef",
      ],
      time: "06:30",
      moment: "Bevor der Kaffee kalt ist, steht der Tag auf dem Bildschirm.",
      question: "Sehe ich morgens auf einen Blick, wie es im Betrieb steht?",
      answer: "Ja. In der Übersicht wählen Sie die Karten, die Sie brauchen: Schichten heute, wer da ist, Umsatz, offene Rechnungen, Hygienekontrollen. Ein Klick auf eine Karte öffnet direkt die passende Seite.",
    },
    {
      key: "schichtplan",
      menu: "Schichtplan",
      title: "Die Woche in Minuten geplant",
      lead: "Wochen- und Monatsplan mit Codes für Ferien und Krankheit. Vorwoche kopieren, anpassen, veröffentlichen. Das Team sieht nur den freigegebenen Plan und wird bei Änderungen benachrichtigt.",
      features: [
        "Woche und Monat, Summe je Person",
        "Vorwoche mit einem Klick kopieren",
        "Entwurf, dann Veröffentlichen; Meldung bei Änderungen",
        "Hinweise nach Arbeitsgesetz: 11 h Ruhezeit, Wochenhöchststunden",
        "Mindestbesetzung prüfen, freie Personen vorschlagen",
        "Schichttausch: Chef genehmigt, Plan passt sich an",
        "Optional KI-Prüfung, Namen pseudonymisiert",
      ],
      time: "07:00",
      moment: "Reicht die Besetzung am Mittag? Der Plan sagt es.",
      question: "Muss ich den Schichtplan jede Woche neu machen?",
      answer: "Nein. Sie kopieren die Vorwoche und ändern nur, was anders ist. Verstösst etwas gegen Ruhezeit oder Wochenstunden, warnt das Programm. Nach dem Veröffentlichen sieht das Team den Plan auf dem Handy.",
    },
    {
      key: "stempeluhr",
      menu: "Stempeluhr",
      title: "Stempeln: schnell, fair, fälschungssicher",
      lead: "Das Team stempelt am Tablet mit PIN oder am Handy. Am Handy arbeiten Standort, ein QR-Code, der alle 30 Sekunden wechselt, und ein Selfie zusammen; für Kollegen stempeln bringt nichts.",
      features: [
        "Kiosk-Tablet: Stempeln mit PIN und Foto",
        "Am Handy dreifach: Standort, wechselnder QR, Selfie",
        "Plan und Ist nebeneinander, Differenz automatisch",
        "Hinweise: zu spät, früher gegangen, Pause zu kurz",
        "Korrektur nur mit Protokoll, kein Löschen",
        "Fotos werden 1 Monat nach der Lohnzahlung gelöscht",
        "Export nach Excel",
      ],
      time: "07:15",
      moment: "Das Team kommt. Wer wann eingestempelt hat und was geplant war, steht nebeneinander.",
      question: "Kann jemand für einen Kollegen einstempeln?",
      answer: "Nein. Beim Stempeln am Handy braucht es Standort, den alle 30 Sekunden wechselnden QR-Code vom Tablet und ein Selfie; ein abfotografierter Code ist längst abgelaufen. Gesperrte Versuche werden Ihnen gemeldet.",
    },
    {
      key: "hygiene",
      menu: "Aufgaben & Hygiene",
      title: "HACCP und Aufgaben, ohne Papier",
      lead: "Kühl- und Tiefkühlmessungen, tägliche Checklisten, Wareneingang und Reinigungsplan auf dem Handy. Auf dem Aufgabenbrett ist klar, wer was übernommen und erledigt hat.",
      features: [
        "Früh- und Spätmessung, Erinnerung bei Fristablauf",
        "Abweichung: Massnahme Pflicht, Meldung an den Chef",
        "Name und Zeit vom Server, Korrekturen bleiben durchgestrichen",
        "Wareneingang mit der Bestellung verknüpft",
        "Monatsprotokoll, Export als PDF und Excel",
        "Aufgaben: «Ich mache das», Foto-Pflicht, Sterne-Bewertung",
      ],
      time: "07:30",
      moment: "Frühmessung erledigt, Kühlschränke abgezeichnet.",
      question: "Wie zeige ich der Kontrolle meine Hygiene-Aufzeichnungen?",
      answer: "Sie laden das Monatsprotokoll oder einen beliebigen Zeitraum mit Firmenkopf als PDF oder Excel herunter. Name und Zeit setzt der Server, spätere Korrekturen bleiben durchgestrichen sichtbar. Nachträglich schönen kann niemand.",
    },
    {
      key: "einsaetze",
      menu: "Einsätze",
      title: "Auch die Arbeit draussen ist im Plan",
      lead: "Aufträge beim Kunden im Wochenplan: wer, wann, an welcher Adresse. Das Team meldet per Handy unterwegs, vor Ort, erledigt; Material, Fotos und Notizen bleiben beim Einsatz.",
      features: [
        "Wöchentlicher Einsatzplan, mehrere Tage und Personen",
        "Kunden mit Objektadressen",
        "Status: Geplant, Unterwegs, Vor Ort, Erledigt",
        "Material mit Preis, Fotos, Notiz",
        "Warnung, wenn keine Schicht oder abwesend",
        "Unveränderliche Historie",
      ],
      time: "09:00",
      moment: "Das Team fährt zum Kunden, der Status kommt vom Handy.",
      question: "Sehe ich, wo mein Team draussen gerade was macht?",
      answer: "Ja. Für jeden Einsatz planen Sie Person und Adresse; das Team meldet per Handy «unterwegs», «vor Ort», «erledigt». Material, Fotos und Notizen kommen zum Einsatz, jede Änderung bleibt in der Historie.",
    },
    {
      key: "vitrine",
      menu: "Vitrine",
      title: "Vitrine zählen: was verkauft, was weggeworfen",
      lead: "Zählung am Morgen und Abend: Übernahme, Produktion, Rücknahme, Ausschuss. Der Verkauf rechnet sich selbst, die Abfallquote steht je Artikel.",
      features: [
        "Zählblatt für Morgen und Abend",
        "Verkauf wird automatisch berechnet",
        "Übergabe aus der Vorschicht per Knopf",
        "Fehlerhafte Zählung farbig markiert",
        "Nach Schichtabschluss gesperrt",
        "Abfallquote je Artikel und Abfall in CHF",
      ],
      time: "11:00",
      moment: "Vitrine gezählt, Abfallquote je Artikel sichtbar.",
      question: "Weiss ich, welches Produkt zu oft im Abfall landet?",
      answer: "Ja. Nach der Zählung sehen Sie die Abfallquote jedes Artikels und den Betrag in Franken; Artikel über der Grenze sind gelb oder rot markiert. Die verkaufte Menge rechnet das Programm selbst.",
    },
    {
      key: "treuekarte",
      menu: "Treuekarte",
      title: "Digitaler Stempelpass, ohne App",
      lead: "Die Kundschaft trägt die Karte auf dem Handy, an der Kasse wird gescannt. Kein Kartendrucker, kein Fremdanbieter; Regeln, Prämien und Fristen bestimmen Sie.",
      features: [
        "Scannen mit Kamera oder Handscanner",
        "Ziel, Zwischenprämie, Willkommensgeschenk",
        "Karte als Handy-Bild, PDF im Kreditkartenformat oder Link",
        "Kundschaft sieht die Karte ohne App",
        "Selbstanmeldung per QR-Plakat",
        "WhatsApp-Vorlage für Kunden, die 60 Tage nicht kamen",
      ],
      time: "12:30",
      moment: "Mittagsandrang: Karten werden gescannt, der zehnte Kaffee ist gratis.",
      question: "Wie bringe ich meine Gäste dazu, wiederzukommen?",
      answer: "Mit der Treuekarte. Bei jedem Einkauf gibt es einen Stempel, am Ziel die Prämie. Wer 60 Tage nicht da war, bekommt per Knopf eine vorbereitete WhatsApp-Nachricht.",
    },
    {
      key: "webseite",
      menu: "Webseite",
      title: "Die Webseite Ihres Betriebs, ohne Programmierer",
      lead: "Titelbild, Über uns, Speisekarte mit Preisen, Öffnungszeiten und Links. Vorschau für Computer und Handy ansehen, veröffentlichen, wenn es passt.",
      features: [
        "Speisekarte: Preise in CHF, Allergene, Abzeichen",
        "Artikel aus der Vitrine mit einem Klick übernehmen",
        "Öffnungszeiten, Bestell- und Social-Links",
        "Vorschau für Computer und Handy",
        "Export als eine Datei, ohne Google-Tracking",
        "Beschriftungen in 5 Sprachen",
      ],
      time: "15:00",
      moment: "Ruhige Stunde: die Karte für morgen ist online.",
      question: "Muss ich für jede Änderung der Speisekarte jemanden anschreiben?",
      answer: "Nein. Speisekarte, Preise und Öffnungszeiten ändern Sie selbst im Programm, prüfen die Vorschau und veröffentlichen. Auf Wunsch nehmen Sie die Seite als eine Datei mit auf Ihre eigene Domain.",
    },
    {
      key: "brett",
      menu: "Schwarzes Brett",
      title: "Mitteilungen, die wirklich gelesen werden",
      lead: "Eine wichtige Mitteilung erscheint beim Ein- und Ausstempeln auf Handy und Tablet und kommt wieder, bis sie bestätigt ist. Sie sehen, wer gelesen hat und wer nicht.",
      features: [
        "Kategorien Wichtig, Info, Event",
        "«Wichtig» erscheint beim Stempeln bis zur Bestätigung",
        "Lesestatus je Person",
        "Bei geänderter Mitteilung bestätigen alle neu",
        "Anpinnen und Ablaufdatum, danach Archiv",
        "WhatsApp-Text vorbereitet, Erinnerung an alle, die nicht gelesen haben",
      ],
      time: "17:30",
      moment: "Notiz für die Abendschicht: neue Allergenliste. Alle haben bestätigt.",
      question: "Wie weiss ich, dass das Team die Mitteilung gelesen hat?",
      answer: "Eine wichtige Mitteilung erscheint beim Ein- oder Ausstempeln und verlangt eine Bestätigung. Am Brett sehen Sie den Lesestatus je Person und erinnern alle, die noch nicht gelesen haben, mit einem Knopf.",
    },
  ],
};

const en: BetriebText = {
  title: "Overview & Operations",
  eyebrow: "Module · Overview & Operations",
  heading: "From opening to closing: the whole day in one program",
  lead: "The first two areas of the program: Overview and Operations. Shift plan, time clock, tasks and hygiene, field jobs, display case, loyalty card, website and notice board. A short video for each area and what it does. Which areas are switched on is set up for your business.",
  pictureTitle: "The aim here is to give you a picture",
  pictureText: "Below you see what each area does. For example, there is a fridge check; if you do not need it, we take it out. What is missing gets added, what is too much gets removed: the program is set up for your business.",
  draftLabel: "Draft · same content, 5 designs",
  draftNote: "Tell us the number of the design you like; the page keeps it and the others are removed.",
  variants: [
    { name: "The program itself", idea: "The menu on the left is the menu from the program. Click a line to open that area." },
    { name: "A working day", idea: "Each area appears at the hour it is used. The clock turns as you scroll." },
    { name: "Ask, we show you", idea: "Questions from owners, answered with an area of the program and its video." },
    { name: "Episode by episode", idea: "Like a series: a large player and episodes 01/09 to 09/09 below." },
    { name: "Stacked cards", idea: "As you scroll, each area arrives as a card and lands on the one before." },
  ],
  inProgram: "In the program",
  featuresLabel: "What it does",
  groupBetrieb: "Operations",
  chatOwner: "Owner",
  chatBot: "Ekado",
  next: "Next episode",
  ctaHeading: "See it in your business",
  ctaText: "In a short call we set these areas up for your business and show them to you.",
  ctaButton: "Get in touch",
  qa: {
    "eyebrow": "Module · Overview & Operations",
    "heading": "Ask, we show you",
    "lead": "The questions owners ask most, answered from the program. Next to each answer a short video: see for yourself how the program solves it.",
    "film": "Video",
    "films": [
      {
        "title": "Overview",
        "text": "The first screen in the morning: the state of the business on one page."
      },
      {
        "title": "A new employee",
        "text": "Before day one: record, PIN, documents and approval by the boss. No paper, no phone calls."
      },
      {
        "title": "Shift plan",
        "text": "Adding shifts, conflict and rest-time hints, copying the week, publishing and shift swaps."
      },
      {
        "title": "Working day: clock-in and breaks",
        "text": "Clock-in with PIN on the tablet, breaks by phone, the boss's time clock and forgotten clock-ins."
      },
      {
        "title": "Daily work",
        "text": "Temperature readings, deviations and actions, checklists, goods receipt, cleaning plan and notice board."
      },
      {
        "title": "More areas",
        "text": "Display case, loyalty card and website. At the end: areas are switched on and off for your business."
      },
      {
        "title": "Field jobs",
        "text": "Planning and tracking work at the customer's place."
      }
    ],
    "topics": "In this video",
    "watch": "Watch in the video",
    "watchFrom": "Watch in the video · {t}",
    "more": "What it does",
    "soon": "Video coming soon",
    "extra": [
      {
        "key": "neu",
        "menu": "Staff · Employees",
        "question": "How do I add a new employee to the program?",
        "answer": "In Staff you open Employees and click \"New employee\"; enter first name, last name, role and hourly wage. The start date makes the first month's pay exact to the day. Once saved, the card appears in the list right away.",
        "features": [
          "First name, last name, role, hourly wage",
          "Start date: first month's pay exact to the day",
          "Saved card appears in the list right away"
        ]
      },
      {
        "key": "pin",
        "menu": "Staff · Employees",
        "question": "Do I have to deal with the PIN and paperwork separately?",
        "answer": "No. The program creates a four-digit PIN for the kiosk itself. In the same window you tick employment contract, insurance and hygiene training.",
        "features": [
          "4-digit kiosk PIN created automatically",
          "Tick contract, insurance, hygiene training"
        ]
      },
      {
        "key": "sicht",
        "menu": "My data",
        "question": "Can the employee enter their own details and documents?",
        "answer": "Yes. With one click the boss switches to the employee's view: a much leaner menu, only their own work. On \"My data\" the employee enters personal details and uploads photos of ID and bank card, then waits for the review with nothing else to do.",
        "features": [
          "Boss switches to the employee view in one click",
          "Lean menu: only their own work",
          "Personal details, ID and bank card photos",
          "Nothing else to do after sending"
        ]
      },
      {
        "key": "pruefen",
        "menu": "Onboarding review",
        "question": "How do I check the documents that come in?",
        "answer": "Submissions wait under Onboarding review. You open the details, check each document separately and zoom into the photos. Readable ones you mark \"Accepted\", an unreadable one \"Unreadable\".",
        "features": [
          "Open and approved submissions kept apart",
          "Each document checked separately",
          "Zoom into photos",
          "Accepted or Unreadable"
        ]
      },
      {
        "key": "nachforderung",
        "menu": "Notifications",
        "question": "What happens if a document is blurry?",
        "answer": "You send a request for a new one and the employee is notified at once. Accepted documents are kept, only the faulty one is requested again. On \"My data\" it is marked red and uploaded again. The first exchange between employee and employer runs without paper or phone calls.",
        "features": [
          "Request: employee notified at once",
          "Accepted documents kept, only the faulty one again",
          "Faulty document marked red",
          "The bell reports every action of the boss"
        ]
      }
    ]
  },
  items: [
    {
      key: "uebersicht",
      menu: "Overview",
      title: "Your business at a glance",
      lead: "The first screen in the morning: who is working, which shifts run today, where revenue stands, what is waiting. You pick, drag and resize the cards yourself.",
      features: [
        "Choose from more than 50 cards",
        "Revenue: day, week, month; compared with last month and last year",
        "Weekly hours and live staff costs",
        "Who is in, who is sick, who forgot to clock out",
        "Sizes S, M, L: each size shows different content",
        "Templates: Owner, Staff only, Finance only",
        "Cards with money are visible to the boss only",
      ],
      time: "06:30",
      moment: "Before the coffee gets cold, the day is on screen.",
      question: "Can I see how the business stands at a glance in the morning?",
      answer: "Yes. In the Overview you pick the cards you need: today's shifts, who is in, revenue, open invoices, hygiene checks. Click a card and the matching page opens.",
    },
    {
      key: "schichtplan",
      menu: "Shift plan",
      title: "Plan the week in minutes",
      lead: "Weekly and monthly plan with codes for holidays and sickness. Copy last week, adjust, publish. The team only sees the published plan and is notified of changes.",
      features: [
        "Week and month view, total per person",
        "Copy last week in one click",
        "Draft, then Publish; team notified of changes",
        "Labour law hints: 11 h rest, maximum weekly hours",
        "Minimum staffing check, free people suggested",
        "Shift swaps: the boss approves, the plan updates itself",
        "Optional AI check, names pseudonymised",
      ],
      time: "07:00",
      moment: "Enough people for lunch? The plan tells you.",
      question: "Do I have to build the shift plan from scratch every week?",
      answer: "No. You copy last week and only change what is different. If something breaks rest time or weekly hours, the program warns you. Once published, the team sees the plan on their phones.",
    },
    {
      key: "stempeluhr",
      menu: "Time clock",
      title: "Clocking in: fast, fair, tamper-proof",
      lead: "The team clocks in on the tablet with a PIN or on their phone. On the phone, location, a QR code that changes every 30 seconds and a selfie work together; clocking in for a colleague does not work.",
      features: [
        "Kiosk tablet: clock in with PIN and photo",
        "On the phone, three checks: location, changing QR, selfie",
        "Plan and actual side by side, difference automatic",
        "Hints: late, left early, break too short",
        "Corrections only with a log, no deleting",
        "Photos deleted 1 month after payday",
        "Export to Excel",
      ],
      time: "07:15",
      moment: "The team arrives. Who clocked in when, and what was planned, side by side.",
      question: "Can someone clock in for a colleague?",
      answer: "No. Clocking in by phone needs location, the tablet's QR code that changes every 30 seconds, and a selfie; a photographed code has long expired. Blocked attempts are reported to you.",
    },
    {
      key: "hygiene",
      menu: "Tasks & Hygiene",
      title: "HACCP records and tasks, paperless",
      lead: "Fridge and freezer readings, daily checklists, goods receipt and cleaning plan on the phone. The task board shows who took on what and who finished it.",
      features: [
        "Morning and evening readings, reminder when due",
        "Out of range: action required, boss notified",
        "Name and time from the server, corrections stay crossed out",
        "Goods receipt linked to the order",
        "Monthly log, export as PDF and Excel",
        "Tasks: \"I'll do it\", photo required, star rating",
      ],
      time: "07:30",
      moment: "Morning readings done, fridges signed off.",
      question: "How do I show my hygiene records to an inspector?",
      answer: "You download the monthly log, or any period, with your letterhead as PDF or Excel. The server sets name and time, and later corrections stay visible, crossed out. Nobody can polish the records afterwards.",
    },
    {
      key: "einsaetze",
      menu: "Field jobs",
      title: "Work outside is in the plan too",
      lead: "Jobs at the customer's place in the weekly plan: who, when, at which address. The team marks on the way, on site, done by phone; materials, photos and notes stay with the job.",
      features: [
        "Weekly job plan, several days and people",
        "Customers with site addresses",
        "Status: Planned, On the way, On site, Done",
        "Materials with price, photos, notes",
        "Warning if the person has no shift or is absent",
        "History that cannot be changed",
      ],
      time: "09:00",
      moment: "The team heads to the customer, status updates come from the phone.",
      question: "Can I see what my team is doing out on jobs?",
      answer: "Yes. You plan the person and the address for each job; the team marks \"on the way\", \"on site\", \"done\" by phone. Materials, photos and notes are added to the job, and every change stays in the history.",
    },
    {
      key: "vitrine",
      menu: "Display case",
      title: "Display count: what sold, what was thrown away",
      lead: "Count in the morning and evening: carried over, produced, taken back, waste. Sales calculate themselves, and the waste rate shows per product.",
      features: [
        "Count sheet for morning and evening",
        "Sales calculated automatically",
        "Hand-over from the previous shift in one click",
        "Faulty counts marked in colour",
        "Locked once the shift is closed",
        "Waste rate per product and waste in CHF",
      ],
      time: "11:00",
      moment: "Display counted, waste rate visible per product.",
      question: "Can I see which product ends up in the bin too often?",
      answer: "Yes. After the count you see each product's waste rate and its value in francs; products over the limit are marked yellow or red. The program works out the quantity sold itself.",
    },
    {
      key: "treuekarte",
      menu: "Loyalty card",
      title: "A digital stamp card, no app needed",
      lead: "Customers carry the card on their phone and it is scanned at the till. No card printer, no third party; you set the rules, rewards and periods.",
      features: [
        "Scan with the camera or a hand scanner",
        "Goal, interim reward, welcome gift",
        "Card as phone image, credit-card-size PDF or link",
        "Customers see their card without an app",
        "Self sign-up with a QR poster",
        "Ready WhatsApp text for customers away 60 days",
      ],
      time: "12:30",
      moment: "Lunch rush: cards are scanned, the tenth coffee is free.",
      question: "How do I get my customers to come back?",
      answer: "With the loyalty card. Every purchase earns a stamp, the goal earns the reward. Customers who have not been in for 60 days get a prepared WhatsApp message at the press of a button.",
    },
    {
      key: "webseite",
      menu: "Website",
      title: "Your business website, no programmer needed",
      lead: "Header image, about us, menu with prices, opening hours and links. Check the computer and phone preview, publish when it is ready.",
      features: [
        "Menu: prices in CHF, allergens, badges",
        "Take items from the display case in one click",
        "Opening hours, ordering and social links",
        "Preview for computer and phone",
        "Export as a single file, no Google tracking",
        "Labels in 5 languages",
      ],
      time: "15:00",
      moment: "Quiet hour: tomorrow's menu is online.",
      question: "Do I have to email someone every time the menu changes?",
      answer: "No. You change the menu, prices and opening hours yourself in the program, check the preview and publish. If you like, you take the site as a single file to your own domain.",
    },
    {
      key: "brett",
      menu: "Notice board",
      title: "Announcements that actually get read",
      lead: "An important announcement appears on the phone and tablet when the team clocks in or out and keeps coming back until it is confirmed. You see who has read it and who has not.",
      features: [
        "Categories Important, Info, Event",
        "\"Important\" shows at clock-in until confirmed",
        "Read status per person",
        "Changed content: everyone confirms again",
        "Pin and expiry date, then archive",
        "WhatsApp text ready, reminder to those who have not read it",
      ],
      time: "17:30",
      moment: "Note for the evening shift: new allergen list. Everyone confirmed.",
      question: "How do I know the team has read the announcement?",
      answer: "An important announcement appears when someone clocks in or out and asks them to confirm. On the board you see the read status per person and remind everyone who has not read it with one button.",
    },
  ],
};

export const betrieb: Record<Locale, BetriebText> = { tr, en, de };
