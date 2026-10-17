import type { Locale } from "./useLocale";

/**
 * Schnell-Demo sayfasının metinleri (3 dil).
 * Alan metinleri Ekado_V2 "Firma" bölümünden (site/i18n/*.json, s.firma.*) birebir alındı; videolar public/videos/demo,
 * arkadan sesler public/sounds/demo/<alan>/<dil>.m4a. DE ve TR ses videodaki konuşmacının kendi sesi: metni değiştirmek sesi değiştirmez.
 */
export type DemoStep = { title: string; text: string; meta?: string };
export type DemoArea = { id: string; name: string; short: string; title: string; text: string; feats: DemoStep[]; flow: DemoStep[] };
export type SchnellDemoText = {
  meta: string;
  eyebrow: string;
  heading: string;
  lead: string;
  introPlay: string;
  introTitle: string;
  toForm: string;
  tabs: [string, string];
  tabsAria: string;
  platform: string;
  platformLead: string;
  pause: string;
  play: string;
  diagramAria: string;
  areasLabel: string;
  flow: string;
  cta: string;
  playVideo: string;
  pauseVideo: string;
  fullscreen: string;
  close: string;
  formEyebrow: string;
  formHeading: string;
  formLead: string;
  formPoints: string[];
  areas: DemoArea[];
};

const tr: SchnellDemoText = {
  "meta": "Hızlı Demo | Ekado WorkSuite",
  "eyebrow": "Hızlı Demo",
  "heading": "Her şey tek yerde. Her şey kontrolde.",
  "lead": "İsviçre’deki küçük ve orta ölçekli işletmeler için işletme yazılımı: siparişler, vardiya planı, muhasebe, resmi bildirimler, web sitesi ve personel tek bir platformda.",
  "introPlay": "Videoyu izle",
  "introTitle": "40 saniyede Ekado WorkSuite",
  "toForm": "Demo erişimi iste",
  "tabs": [
    "Platform",
    "Alanlar & Akış"
  ],
  "tabsAria": "Hızlı Demo bölümleri",
  "platform": "Platform",
  "pause": "Duraklat",
  "play": "Turu sürdür",
  "diagramAria": "Diyagram: ortada Ekado platformu, çevresinde altı alan. Ayrıntı için bir alan seçin.",
  "areasLabel": "Alanlar",
  "flow": "Akış",
  "cta": "Demo erişimi iste",
  "playVideo": "Videoyu oynat",
  "pauseVideo": "Videoyu duraklat",
  "fullscreen": "Tam ekran",
  "close": "Kapat",
  "formEyebrow": "Kendiniz deneyin",
  "formHeading": "Demo erişimi isteyin",
  "formLead": "Adınızı ve e-postanızı bırakın, giriş bilgilerini size gönderelim. Programı hem işletme sahibi hem çalışan gözüyle deneyin.",
  "formPoints": [
    "Giriş bilgileri e-postayla gelir",
    "Örnek verilerle hazır bir işletme",
    "Ücretsiz, bağlayıcı değil"
  ],
  "platformLead": "İşletmenizin tüm dijital süreçlerini tek bir platformda topluyoruz. Siparişler, vardiya planlaması, fazla mesai, personel süreçleri, muhasebe ve resmi bildirimler – hepsi otomatik, düzenli ve hatasız işler.",
  "areas": [
    {
      "id": "bestellungen",
      "name": "Siparişler",
      "short": "Bir kez girin, otomatik olarak doğru tedarikçiye gitsin – telefon ve kâğıt olmadan.",
      "title": "Akıllı Sipariş ve Tedarikçi Yönetimi",
      "text": "Tedarikçilerinize verdiğiniz tüm siparişler tek bir uygulama üzerinden yönetilir. Dijital olarak oluşturulur, düzenlenir ve otomatik olarak e-postayla her tedarikçiye iletilir. İletişim hataları, gecikmeler ve mükerrer siparişler geride kalır.",
      "feats": [
        {
          "title": "Merkezi yönetim",
          "text": "Tüm tedarikçiler ve siparişler tek yerde."
        },
        {
          "title": "Otomatik iletim",
          "text": "Sipariş her tedarikçiye otomatik olarak e-postayla gider."
        },
        {
          "title": "Hatasız süreçler",
          "text": "İletişim hataları, gecikmeler ve çift siparişler ortadan kalkar."
        },
        {
          "title": "Örnek: Yeni sipariş #1042",
          "text": "Üç tedarikçi, üç durum: gönderildi, onaylandı, hazırlanıyor – 09:41’de otomatik e-postayla."
        }
      ],
      "flow": [
        {
          "title": "Siparişi girin",
          "text": "Ekibiniz siparişi uygulamaya bir kez girer: ürün, miktar, tedarikçi.",
          "meta": "Ekip"
        },
        {
          "title": "Otomatik gönderim",
          "text": "Uygulama siparişi e-postayla doğru tedarikçiye gönderir. Tedarikçilerinizin yeni bir şeye ihtiyacı yoktur.",
          "meta": "Uygulama"
        },
        {
          "title": "Onay",
          "text": "Tedarikçi onaylar, durum herkes için görünür. Çift siparişler ortadan kalkar.",
          "meta": "Tedarikçi"
        },
        {
          "title": "Kayıt altında",
          "text": "Her sipariş dijital olarak saklanır ve her an bulunur.",
          "meta": "Uygulama"
        }
      ]
    },
    {
      "id": "einsatzplanung",
      "name": "Vardiya planı",
      "short": "Vardiya, izin, hastalık ve fazla mesai tek yerde – herkes anında görür.",
      "title": "Vardiya Planı & Fazla Mesai",
      "text": "Çalışma saatleri, vardiyalar, izin, hastalık bildirimleri ve fazla mesai tek yerde – herkes için her an net görünür. Altı işlev, tek uygulama.",
      "feats": [
        {
          "title": "Çalışma günleri & saatleri",
          "text": "Çalışanlarınız çalışma günlerini ve vardiya saatlerini doğrudan uygulamada görür – her zaman güncel, yolda bile. Plandaki değişiklikler anında görünür.",
          "meta": "Çalışan uygulaması"
        },
        {
          "title": "Vardiya başına görevler",
          "text": "Her vardiyanın görevleri doğrudan planda yer alır. Kimse bugün ne yapılacağını sormak zorunda kalmaz – devir teslim net.",
          "meta": "Planlama"
        },
        {
          "title": "Yıllık izin",
          "text": "İzin talepleri dijital olarak yapılır ve onaylanır. Kalan izin ve planlanan devamsızlıklar herkes için her an görünür.",
          "meta": "Devamsızlık"
        },
        {
          "title": "Hastalık bildirimleri",
          "text": "Hastalık bildirimleri, devamsızlıklar ve kısa vadeli değişiklikler dijital olarak kaydedilir ve otomatik olarak işletmeye iletilir.",
          "meta": "Devamsızlık"
        },
        {
          "title": "Fazla mesai",
          "text": "Fazla mesailer düzgünce belgelenir ve yönetimin her an erişimindedir – kişi ve ay bazında izlenebilir.",
          "meta": "Çalışma süresi"
        },
        {
          "title": "Vardiya planlaması",
          "text": "Tüm vardiya planlaması düzenli, hatasız ve idari yük olmadan yönetilir – tüm ekip için tek yerde.",
          "meta": "İşletme"
        }
      ],
      "flow": [
        {
          "title": "Planı oluşturun",
          "text": "Vardiyaları tek yerden planlayın, her vardiyaya görevleri ekleyin.",
          "meta": "Yönetim"
        },
        {
          "title": "Herkese iletin",
          "text": "Çalışanlarınız çalışma günlerini ve saatlerini hemen uygulamada görür, yolda da.",
          "meta": "Uygulama"
        },
        {
          "title": "İzin ve hastalık",
          "text": "Talepler ve hastalık bildirimleri uygulamadan gelir. Tek tıkla onay, plan kendini uyarlar.",
          "meta": "Ekip"
        },
        {
          "title": "Fazla mesai",
          "text": "Saatler kişi ve ay bazında eksiksiz kaydedilir – liste tutmadan.",
          "meta": "Uygulama"
        }
      ]
    },
    {
      "id": "buchhaltung",
      "name": "Muhasebe",
      "short": "Faturalar dijital gelir, işlenir ve zamanında ödenir.",
      "title": "Muhasebe & Ödemeler",
      "text": "Aylık giderler, alımlar ve tedarikçi faturaları otomatik kaydedilir, işlenir ve banka üzerinden ödenir. Örnek: Eylül özeti, toplam gider CHF 18'460, 24 fatura ödendi, 0 açık.",
      "feats": [
        {
          "title": "Giderleri kaydetme",
          "text": "Aylık giderler, alımlar ve ek masraflar otomatik olarak kaydedilir – elle yazmadan, fiş yığını olmadan.",
          "meta": "otomatik kayıt"
        },
        {
          "title": "Faturaları alma",
          "text": "Tedarikçiler faturalarını doğrudan muhasebe uygulamasına gönderir. Her fatura anında eşleştirilir ve kolayca bulunur.",
          "meta": "doğrudan uygulamaya"
        },
        {
          "title": "Banka üzerinden ödeme",
          "text": "Uygulama ödemeyi banka üzerinden yapar ve düzenli şekilde belgeler – zamanında ve izlenebilir.",
          "meta": "düzenli belgelenir"
        },
        {
          "title": "Tam genel bakış",
          "text": "Tüm işlemler izlenebilir, düzenli ve her an erişilebilir. İşletmeniz zaman, netlik ve tam finansal genel bakış kazanır.",
          "meta": "her an erişilebilir"
        }
      ],
      "flow": [
        {
          "title": "Fatura gelir",
          "text": "Tedarikçiler faturalarını doğrudan muhasebe uygulamasına gönderir.",
          "meta": "Tedarikçi"
        },
        {
          "title": "Eşleştir ve işle",
          "text": "Her fatura otomatik olarak eşleştirilir ve işlenir – elle giriş yok, belge yığını yok.",
          "meta": "Uygulama"
        },
        {
          "title": "Zamanında ödeme",
          "text": "Uygulama ödemeyi bankanız üzerinden zamanında yapar ve kaydeder.",
          "meta": "Banka"
        },
        {
          "title": "Özet ve KDV",
          "text": "Giderler her an gözünüzün önünde; KDV (MWST) beyannamesi rakamlardan hazırlanır.",
          "meta": "Uygulama"
        }
      ]
    },
    {
      "id": "meldungen",
      "name": "Bildirimler",
      "short": "Zorunlu bildirimler mevcut verilerden hazırlanır ve zamanında iletilir.",
      "title": "Resmi Bildirimler",
      "text": "Resmi bildirimlerin tüm verileri otomatik hazırlanır, raporlar ve belgeler oluşturulur ve güvenle iletilir – doğru, eksiksiz ve zamanında.",
      "feats": [
        {
          "title": "Stopaj vergisi (Quellensteuer)",
          "text": "12× yılda · Kanton vergi dairesi",
          "meta": "otomatik"
        },
        {
          "title": "KDV beyannamesi (MWST)",
          "text": "4× yılda · ESTV",
          "meta": "hazır"
        },
        {
          "title": "AHV maaş bildirimi",
          "text": "1× yılda · Ausgleichskasse",
          "meta": "iletildi"
        },
        {
          "title": "BVG maaş bildirimi",
          "text": "1× yılda · Emeklilik kasası",
          "meta": "iletildi"
        },
        {
          "title": "Kaza sigortası (UVG)",
          "text": "1× yılda · Sigorta şirketi",
          "meta": "hazır"
        },
        {
          "title": "Maaş belgeleri (Lohnausweis)",
          "text": "1× yılda · Çalışanlar & vergi dairesi",
          "meta": "iletildi"
        }
      ],
      "flow": [
        {
          "title": "Veriler hazır",
          "text": "Maaşlar, saatler ve personel bilgileri zaten platformda kayıtlıdır.",
          "meta": "Uygulama"
        },
        {
          "title": "Bildirimi hazırla",
          "text": "Stopaj vergisi, AHV, BVG, UVG ve KDV otomatik olarak hazırlanır.",
          "meta": "Uygulama"
        },
        {
          "title": "Kontrol",
          "text": "Neyin bildirildiğini ve bir sonraki sürenin ne zaman dolduğunu her an görürsünüz.",
          "meta": "Siz"
        },
        {
          "title": "İletim",
          "text": "Bildirim güvenle ve zamanında ilgili kuruma gider; belgesi saklanır.",
          "meta": "Kurum"
        }
      ]
    },
    {
      "id": "homepage",
      "name": "Web sitesi",
      "short": "İşletmenize uyan bir ana sayfa – önce telefon için yapılır.",
      "title": "Özel web sitesi ve dijital varlık",
      "text": "Size özel tasarlanan web siteleri işletmenize çağdaş ve güven veren bir dijital görünüm kazandırır. Müşterileriniz sizi daha kolay bulur, işletmeniz daha modern ve profesyonel görünür.",
      "feats": [
        {
          "title": "Önce mobil",
          "text": "Telefonda, tablette ve masaüstünde kusursuz okunur. Ziyaretlerin çoğu artık telefondan geliyor – tasarıma oradan başlıyoruz."
        },
        {
          "title": "Hizmetler & Ürünler",
          "text": "Sunduklarınız net ve çekici biçimde, düzenli bölümlerle yer alır – müşteriler aradığını hemen bulur."
        },
        {
          "title": "Ekip & Değerler",
          "text": "Ekibiniz, hikâyeniz ve değerleriniz işletmenin arkasında kimin durduğunu gösterir – ilk bakışta güven."
        },
        {
          "title": "İletişim & Konum",
          "text": "Adres, çalışma saatleri ve harita – hemen bulunur, tek dokunuşla arama."
        }
      ],
      "flow": [
        {
          "title": "Görüşme",
          "text": "İşletmenizin ne göstermek istediğini konuşuruz: hizmetler, ürünler, ekip ve iletişim.",
          "meta": "Siz ve biz"
        },
        {
          "title": "Taslak",
          "text": "Sayfayı tarzınıza uygun, önce telefon için tasarlarız.",
          "meta": "Biz"
        },
        {
          "title": "İçerik ve ince ayar",
          "text": "Metinleri ve görselleri yerleştirip birlikte netleştiririz.",
          "meta": "Siz ve biz"
        },
        {
          "title": "Yayında",
          "text": "Sayfa yayına girer. Sonraki değişiklikleri biz yaparız.",
          "meta": "Biz"
        }
      ]
    },
    {
      "id": "personal",
      "name": "Personel",
      "short": "Sözleşmeden işten çıkışa: tüm belgeler dijital ve tek yerde.",
      "title": "Personel & Yönetim",
      "text": "İş sözleşmeleri, sigorta belgeleri, işe giriş ve çıkış bildirimleri ile ilgili tüm belgeler merkezi olarak yönetilir. Kâğıt yığınları yok, kaybolan belgeler yok – profesyonel ve modern bir personel süreci.",
      "feats": [
        {
          "title": "Sözleşmeler",
          "text": "Dijital imzalı iş sözleşmesi, ev ofisi ek anlaşması, herkesin görebildiği çalışma saati yönetmeliği.",
          "meta": "3 belge"
        },
        {
          "title": "Sigortalar",
          "text": "AHV kaydı iletildi, emeklilik kasası (BVG) kaydedildi, kaza ve hastalık günlük tazminatı poliçesiyle saklı.",
          "meta": "3 belge"
        },
        {
          "title": "İşe giriş ve çıkışlar",
          "text": "İşe giriş ve çıkış bildirimleri ile iş belgesi – düzenli ve kâğıtsız.",
          "meta": "3 belge"
        },
        {
          "title": "Yeni çalışanlar – tamamen dijital olarak işe başlar",
          "text": "Sözleşmeyi dijital imzala → Sigortalara kaydet → Uygulamaya erişim → İlk iş günü"
        }
      ],
      "flow": [
        {
          "title": "Sözleşme",
          "text": "İş sözleşmesi dijital olarak hazırlanır ve imzalanır.",
          "meta": "Siz ve çalışan"
        },
        {
          "title": "Kayıt",
          "text": "Sigortalar ve işe giriş bildirimleri yapılır.",
          "meta": "Uygulama"
        },
        {
          "title": "Dosyalama",
          "text": "Tüm belgeler merkezi ve dijital olarak personel dosyasında durur.",
          "meta": "Uygulama"
        },
        {
          "title": "Çıkış",
          "text": "İşten çıkışlar da düzenli ve kâğıtsız yürür.",
          "meta": "Uygulama"
        }
      ]
    }
  ]
};

const en: SchnellDemoText = {
  "meta": "Quick demo | Ekado WorkSuite",
  "eyebrow": "Quick demo",
  "heading": "Everything in one place. Everything under control.",
  "lead": "Business software for small and medium-sized companies in Switzerland: orders, shift planning, accounting, official reports, homepage and personnel in a single platform.",
  "introPlay": "Watch video",
  "introTitle": "Ekado WorkSuite in 40 seconds",
  "toForm": "Request demo access",
  "tabs": [
    "Platform",
    "Areas & process"
  ],
  "tabsAria": "Quick demo sections",
  "platform": "Platform",
  "pause": "Pause",
  "play": "Resume tour",
  "diagramAria": "Diagram: the Ekado platform in the centre, six areas around it. Choose an area for details.",
  "areasLabel": "Areas",
  "flow": "Process",
  "cta": "Request demo access",
  "playVideo": "Play video",
  "pauseVideo": "Pause video",
  "fullscreen": "Fullscreen",
  "close": "Close",
  "formEyebrow": "Try it yourself",
  "formHeading": "Request demo access",
  "formLead": "Leave your name and e-mail and we will send you the login details. Try the app from the owner’s and the employees’ point of view.",
  "formPoints": [
    "Login details by e-mail",
    "A ready business with sample data",
    "Free and non-binding"
  ],
  "platformLead": "We bundle all the digital processes of your business in a single platform. Orders, shift planning, overtime, personnel processes, accounting and official reports – everything runs automatically, structured and error-free.",
  "areas": [
    {
      "id": "bestellungen",
      "name": "Orders",
      "short": "Enter once, sent automatically to the right supplier – no phone calls, no paper slips.",
      "title": "Smart order & supplier management",
      "text": "All orders to your suppliers run through one single application. They are created digitally, managed and sent automatically by e-mail to each supplier. Communication errors, delays and duplicate orders are a thing of the past.",
      "feats": [
        {
          "title": "Central control",
          "text": "All suppliers and orders in one place."
        },
        {
          "title": "Automatic delivery",
          "text": "The order goes to each supplier automatically by e-mail."
        },
        {
          "title": "Error-free processes",
          "text": "Communication errors, delays and duplicate orders disappear."
        },
        {
          "title": "Example: new order #1042",
          "text": "Three suppliers, three states: sent, confirmed, in preparation – automatically by e-mail at 09:41."
        }
      ],
      "flow": [
        {
          "title": "Record the order",
          "text": "Your team enters the order once in the app: item, quantity, supplier.",
          "meta": "Team"
        },
        {
          "title": "Send automatically",
          "text": "The app sends the order by e-mail to the right supplier. Your suppliers need nothing new.",
          "meta": "App"
        },
        {
          "title": "Confirmation",
          "text": "The supplier confirms, the status is visible to everyone. Duplicate orders disappear.",
          "meta": "Supplier"
        },
        {
          "title": "Documented",
          "text": "Every order stays stored digitally and can be found at any time.",
          "meta": "App"
        }
      ]
    },
    {
      "id": "einsatzplanung",
      "name": "Shift planning",
      "short": "Shifts, vacation, sick leave and overtime in one place – instantly visible to everyone.",
      "title": "Shift planning & overtime",
      "text": "Working hours, shifts, vacation, sick notes and overtime in one place – clearly visible to everyone at any time. Six functions, one app.",
      "feats": [
        {
          "title": "Working days & shift times",
          "text": "Your employees see working days and shift times directly in the app – always up to date, even on the go. Changes to the plan appear immediately.",
          "meta": "Employee app"
        },
        {
          "title": "Tasks per shift",
          "text": "The tasks for each shift are right in the plan. Nobody has to ask what is on today – the handover is clearly regulated.",
          "meta": "Planning"
        },
        {
          "title": "Annual vacation",
          "text": "Vacation requests are submitted and approved digitally. Remaining vacation and planned absences are visible to everyone at all times.",
          "meta": "Absences"
        },
        {
          "title": "Sick notes",
          "text": "Sick notes, absences and short-notice changes are recorded digitally and sent to the business automatically.",
          "meta": "Absences"
        },
        {
          "title": "Overtime",
          "text": "Overtime is documented cleanly and always available to management – traceable per person and month.",
          "meta": "Working time"
        },
        {
          "title": "Shift planning",
          "text": "The entire shift planning is controlled clearly, without errors and without administrative effort – for the whole team in one place.",
          "meta": "Operations"
        }
      ],
      "flow": [
        {
          "title": "Create the plan",
          "text": "Plan shifts centrally and attach tasks to each shift.",
          "meta": "Management"
        },
        {
          "title": "Distribute to everyone",
          "text": "Your employees see working days and shift times in the app right away, also on the go.",
          "meta": "App"
        },
        {
          "title": "Vacation & sick leave",
          "text": "Requests and sick notes come in through the app. Approve with one click, the plan adapts.",
          "meta": "Team"
        },
        {
          "title": "Overtime",
          "text": "Hours are recorded without gaps per person and month – no lists.",
          "meta": "App"
        }
      ]
    },
    {
      "id": "buchhaltung",
      "name": "Accounting",
      "short": "Invoices arrive digitally, are booked and paid on time.",
      "title": "Accounting & payments",
      "text": "Monthly costs, purchases and supplier invoices are recorded, booked and paid via the bank automatically. Example: September overview, total expenses CHF 18'460, 24 invoices paid, 0 open.",
      "feats": [
        {
          "title": "Record costs",
          "text": "Monthly costs, purchases and extra expenses are booked automatically – no retyping, no stacks of receipts.",
          "meta": "booked automatically"
        },
        {
          "title": "Receive invoices",
          "text": "Suppliers send their invoices directly to the accounting app. Every invoice is assigned immediately and easy to find.",
          "meta": "straight into the app"
        },
        {
          "title": "Payment via the bank",
          "text": "The app executes the payment through the bank and documents it cleanly – on time and traceable.",
          "meta": "cleanly documented"
        },
        {
          "title": "Full overview",
          "text": "All transactions are traceable, orderly and available at any time. Your business gains time, clarity and a full financial overview.",
          "meta": "available any time"
        }
      ],
      "flow": [
        {
          "title": "Invoice arrives",
          "text": "Suppliers send their invoices directly to the accounting app.",
          "meta": "Supplier"
        },
        {
          "title": "Match & book",
          "text": "Every invoice is matched and booked automatically – no retyping, no stacks of receipts.",
          "meta": "App"
        },
        {
          "title": "Pay on time",
          "text": "The app executes the payment on time through your bank and documents it.",
          "meta": "Bank"
        },
        {
          "title": "Overview & VAT",
          "text": "Costs always in view; the VAT return is prepared from the figures.",
          "meta": "App"
        }
      ]
    },
    {
      "id": "meldungen",
      "name": "Official reports",
      "short": "Mandatory reports are prepared from existing data and submitted on time.",
      "title": "Official reports",
      "text": "All data for official reports is prepared automatically, reports and proofs are created and submitted securely – correct, complete and on time.",
      "feats": [
        {
          "title": "Withholding tax",
          "text": "12× per year · Cantonal tax office",
          "meta": "automatic"
        },
        {
          "title": "VAT return (MWST)",
          "text": "4× per year · Federal Tax Administration (ESTV)",
          "meta": "prepared"
        },
        {
          "title": "AHV wage report",
          "text": "1× per year · Compensation fund",
          "meta": "submitted"
        },
        {
          "title": "BVG wage report",
          "text": "1× per year · Pension fund",
          "meta": "submitted"
        },
        {
          "title": "Accident insurance (UVG)",
          "text": "1× per year · Insurer",
          "meta": "prepared"
        },
        {
          "title": "Wage statements",
          "text": "1× per year · Employees & tax office",
          "meta": "submitted"
        }
      ],
      "flow": [
        {
          "title": "Data is ready",
          "text": "Wages, hours and personnel data are already recorded in the platform.",
          "meta": "App"
        },
        {
          "title": "Prepare the report",
          "text": "Withholding tax, AHV, BVG, UVG and VAT are prepared automatically.",
          "meta": "App"
        },
        {
          "title": "Check",
          "text": "You can see at any time what is being reported and when the next deadline is due.",
          "meta": "You"
        },
        {
          "title": "Submit",
          "text": "The report goes securely and on time to the responsible body; the proof is filed.",
          "meta": "Authority"
        }
      ]
    },
    {
      "id": "homepage",
      "name": "Homepage",
      "short": "A homepage that fits your business – built mobile-first.",
      "title": "Custom homepage & presence",
      "text": "Individually designed homepages give your business a contemporary, trustworthy digital appearance. Your customers find you more easily, and your business looks more modern and professional.",
      "feats": [
        {
          "title": "Mobile first",
          "text": "Perfectly readable on phone, tablet and desktop. Most visits now come from the phone – so that is where we plan first."
        },
        {
          "title": "Services & products",
          "text": "Your offer presented clearly and attractively – well organised so customers find what they are looking for immediately."
        },
        {
          "title": "Team & values",
          "text": "Your team, your story and your values show who is behind the business – trust at first glance."
        },
        {
          "title": "Contact & location",
          "text": "Address, opening hours and map – found instantly, call with one tap."
        }
      ],
      "flow": [
        {
          "title": "Conversation",
          "text": "We clarify what your business wants to show: services, products, team and contact.",
          "meta": "You & us"
        },
        {
          "title": "Draft",
          "text": "We design the site to match your appearance, phone first.",
          "meta": "Us"
        },
        {
          "title": "Content & polish",
          "text": "Texts and images are placed and agreed on together.",
          "meta": "You & us"
        },
        {
          "title": "Live",
          "text": "The site goes online. We take care of later changes.",
          "meta": "Us"
        }
      ]
    },
    {
      "id": "personal",
      "name": "Personnel",
      "short": "From contract to exit: all documents digital in one place.",
      "title": "Personnel & administration",
      "text": "Employment contracts, insurance documents, entry and exit notifications and all relevant documents are managed centrally. No stacks of paper, no lost documents – a professional, modern personnel process.",
      "feats": [
        {
          "title": "Contracts",
          "text": "Digitally signed employment contract, home-office addendum, working-time regulations visible to all.",
          "meta": "3 documents"
        },
        {
          "title": "Insurance",
          "text": "AHV registration submitted, pension fund (BVG) registered, accident & daily sickness benefit with policy on file.",
          "meta": "3 documents"
        },
        {
          "title": "Entries & exits",
          "text": "Entry and exit notifications and employment reference – orderly and paperless.",
          "meta": "3 documents"
        },
        {
          "title": "New employees – fully digitally integrated",
          "text": "Sign contract digitally → Register insurance → App access → First working day"
        }
      ],
      "flow": [
        {
          "title": "Contract",
          "text": "Create and sign the employment contract digitally.",
          "meta": "You & employee"
        },
        {
          "title": "Registration",
          "text": "Insurance and entry notifications are registered.",
          "meta": "App"
        },
        {
          "title": "Filing",
          "text": "All documents are stored centrally and digitally in the personnel file.",
          "meta": "App"
        },
        {
          "title": "Exit",
          "text": "Exits also run in an orderly way and without paper.",
          "meta": "App"
        }
      ]
    }
  ]
};

const de: SchnellDemoText = {
  "meta": "Schnell-Demo | Ekado WorkSuite",
  "eyebrow": "Schnell-Demo",
  "heading": "Alles an einem Ort. Alles unter Kontrolle.",
  "lead": "Betriebssoftware für kleine und mittlere Unternehmen in der Schweiz: Bestellungen, Einsatzplanung, Buchhaltung, staatliche Meldungen, Homepage und Personal in einer einzigen Plattform.",
  "introPlay": "Video ansehen",
  "introTitle": "Ekado WorkSuite in 40 Sekunden",
  "toForm": "Demo-Zugang anfordern",
  "tabs": [
    "Plattform",
    "Bereiche & Ablauf"
  ],
  "tabsAria": "Bereiche der Schnell-Demo",
  "platform": "Plattform",
  "pause": "Pausieren",
  "play": "Rundgang fortsetzen",
  "diagramAria": "Diagramm: die Ekado Plattform in der Mitte, sechs Bereiche ringsum. Wählen Sie einen Bereich für Details.",
  "areasLabel": "Bereiche",
  "flow": "Ablauf",
  "cta": "Demo-Zugang anfordern",
  "playVideo": "Video abspielen",
  "pauseVideo": "Video pausieren",
  "fullscreen": "Vollbild",
  "close": "Schließen",
  "formEyebrow": "Selbst ausprobieren",
  "formHeading": "Demo-Zugang anfordern",
  "formLead": "Hinterlassen Sie Name und E-Mail, wir senden Ihnen die Zugangsdaten. Testen Sie die App aus Sicht des Inhabers und der Mitarbeitenden.",
  "formPoints": [
    "Zugangsdaten per E-Mail",
    "Fertiger Betrieb mit Beispieldaten",
    "Kostenlos und unverbindlich"
  ],
  "platformLead": "Wir bündeln die gesamten digitalen Abläufe Ihres Unternehmens in einer einzigen Plattform. Bestellungen, Einsatzplanung, Überstunden, Personalprozesse, Buchhaltung und staatliche Meldungen – alles läuft automatisiert, strukturiert und fehlerfrei.",
  "areas": [
    {
      "id": "bestellungen",
      "name": "Bestellungen",
      "short": "Einmal erfassen, automatisch an den richtigen Lieferanten – ohne Telefon und Zettel.",
      "title": "Intelligentes Bestell- & Lieferantenmanagement",
      "text": "Alle Bestellungen an Ihre Lieferanten laufen über eine einzige Anwendung. Sie werden digital erstellt, verwaltet und automatisch per E-Mail an jeden Lieferanten übermittelt. Kommunikationsfehler, Verzögerungen und doppelte Bestellungen gehören der Vergangenheit an.",
      "feats": [
        {
          "title": "Zentrale Steuerung",
          "text": "Alle Lieferanten und Bestellungen an einem Ort."
        },
        {
          "title": "Automatische Übermittlung",
          "text": "Die Bestellung geht automatisch per E-Mail an jeden Lieferanten."
        },
        {
          "title": "Fehlerfreie Abläufe",
          "text": "Kommunikationsfehler, Verzögerungen und doppelte Bestellungen fallen weg."
        },
        {
          "title": "Beispiel: Neue Bestellung #1042",
          "text": "Drei Lieferanten, drei Stände: gesendet, bestätigt, in Vorbereitung – automatisch per E-Mail um 09:41."
        }
      ],
      "flow": [
        {
          "title": "Bestellung erfassen",
          "text": "Ihr Team erfasst die Bestellung einmal in der App: Artikel, Menge, Lieferant.",
          "meta": "Team"
        },
        {
          "title": "Automatisch versenden",
          "text": "Die App schickt die Bestellung per E-Mail an den richtigen Lieferanten. Ihre Lieferanten brauchen nichts Neues.",
          "meta": "App"
        },
        {
          "title": "Bestätigung",
          "text": "Der Lieferant bestätigt, der Stand ist für alle sichtbar. Doppelte Bestellungen fallen weg.",
          "meta": "Lieferant"
        },
        {
          "title": "Dokumentiert",
          "text": "Jede Bestellung bleibt digital abgelegt und jederzeit auffindbar.",
          "meta": "App"
        }
      ]
    },
    {
      "id": "einsatzplanung",
      "name": "Einsatzplanung",
      "short": "Schichten, Urlaub, Krankheit und Überstunden an einem Ort – für alle sofort sichtbar.",
      "title": "Einsatzplanung & Überstunden",
      "text": "Arbeitszeiten, Einsätze, Urlaub, Krankmeldungen und Überstunden an einem Ort – für alle jederzeit klar ersichtlich. Sechs Funktionen, eine App.",
      "feats": [
        {
          "title": "Arbeitstage & Einsatzzeiten",
          "text": "Ihre Mitarbeitenden sehen Arbeitstage und Einsatzzeiten direkt in der App – immer aktuell, auch unterwegs. Änderungen im Plan erscheinen sofort.",
          "meta": "Mitarbeiter-App"
        },
        {
          "title": "Aufgaben pro Einsatz",
          "text": "Zu jedem Einsatz stehen die Aufgaben direkt im Plan. Niemand muss nachfragen, was heute ansteht – die Übergabe ist klar geregelt.",
          "meta": "Planung"
        },
        {
          "title": "Jahresurlaub",
          "text": "Urlaubsanträge werden digital gestellt und freigegeben. Resturlaub und geplante Abwesenheiten sind für alle jederzeit sichtbar.",
          "meta": "Abwesenheiten"
        },
        {
          "title": "Krankmeldungen",
          "text": "Krankmeldungen, Abwesenheiten und kurzfristige Änderungen werden digital erfasst und automatisch an den Betrieb übermittelt.",
          "meta": "Abwesenheiten"
        },
        {
          "title": "Überstunden",
          "text": "Überstunden werden sauber dokumentiert und stehen der Geschäftsleitung jederzeit zur Verfügung – nachvollziehbar pro Person und Monat.",
          "meta": "Arbeitszeit"
        },
        {
          "title": "Einsatzplanung",
          "text": "Die gesamte Einsatzplanung wird übersichtlich, fehlerfrei und ohne administrativen Aufwand gesteuert – für das ganze Team an einem Ort.",
          "meta": "Betrieb"
        }
      ],
      "flow": [
        {
          "title": "Plan erstellen",
          "text": "Schichten zentral planen und Aufgaben pro Einsatz hinterlegen.",
          "meta": "Leitung"
        },
        {
          "title": "An alle verteilen",
          "text": "Ihre Mitarbeitenden sehen Arbeitstage und Einsatzzeiten sofort in der App, auch unterwegs.",
          "meta": "App"
        },
        {
          "title": "Urlaub & Krankheit",
          "text": "Anträge und Krankmeldungen kommen über die App. Freigabe mit einem Klick, der Plan passt sich an.",
          "meta": "Team"
        },
        {
          "title": "Überstunden",
          "text": "Stunden werden pro Person und Monat lückenlos festgehalten – ohne Listen.",
          "meta": "App"
        }
      ]
    },
    {
      "id": "buchhaltung",
      "name": "Buchhaltung",
      "short": "Rechnungen kommen digital an, werden verbucht und termingerecht bezahlt.",
      "title": "Buchhaltung & Zahlungen",
      "text": "Monatliche Kosten, Einkäufe und Lieferantenrechnungen werden automatisch erfasst, verbucht und über die Bank bezahlt. Beispiel: Monatsübersicht September, Ausgaben gesamt CHF 18'460, 24 Rechnungen bezahlt, 0 offen.",
      "feats": [
        {
          "title": "Kosten erfassen",
          "text": "Monatliche Kosten, Einkäufe und Zusatzaufwände werden automatisch verbucht – ohne Abtippen, ohne Belegstapel.",
          "meta": "automatisch verbucht"
        },
        {
          "title": "Rechnungen empfangen",
          "text": "Lieferanten senden ihre Rechnungen direkt an die Buchhaltungs-App. Jede Rechnung ist sofort zugeordnet und auffindbar.",
          "meta": "direkt in die App"
        },
        {
          "title": "Zahlung über die Bank",
          "text": "Die App führt die Zahlung über die Bank aus und dokumentiert sie sauber – termingerecht und nachvollziehbar.",
          "meta": "sauber dokumentiert"
        },
        {
          "title": "Volle Übersicht",
          "text": "Alle Transaktionen sind nachvollziehbar, geordnet und jederzeit abrufbar. Ihr Betrieb gewinnt Zeit, Klarheit und volle finanzielle Übersicht.",
          "meta": "jederzeit abrufbar"
        }
      ],
      "flow": [
        {
          "title": "Rechnung kommt an",
          "text": "Lieferanten senden ihre Rechnungen direkt an die Buchhaltungs-App.",
          "meta": "Lieferant"
        },
        {
          "title": "Zuordnen & verbuchen",
          "text": "Jede Rechnung wird automatisch zugeordnet und verbucht – ohne Abtippen, ohne Belegstapel.",
          "meta": "App"
        },
        {
          "title": "Termingerecht zahlen",
          "text": "Die App führt die Zahlung pünktlich über Ihre Bank aus und dokumentiert sie.",
          "meta": "Bank"
        },
        {
          "title": "Übersicht & MWST",
          "text": "Kosten jederzeit im Blick; die MWST-Abrechnung wird aus den Zahlen vorbereitet.",
          "meta": "App"
        }
      ]
    },
    {
      "id": "meldungen",
      "name": "Meldungen",
      "short": "Pflichtmeldungen werden aus vorhandenen Daten vorbereitet und fristgerecht übermittelt.",
      "title": "Staatliche Meldungen",
      "text": "Alle Daten für staatliche Meldungen werden automatisch vorbereitet, Berichte und Nachweise erstellt und sicher übermittelt – korrekt, vollständig und fristgerecht.",
      "feats": [
        {
          "title": "Quellensteuer",
          "text": "12× pro Jahr · Kantonales Steueramt",
          "meta": "automatisch"
        },
        {
          "title": "MWST-Abrechnung",
          "text": "4× pro Jahr · ESTV",
          "meta": "vorbereitet"
        },
        {
          "title": "AHV-Lohnmeldung",
          "text": "1× pro Jahr · Ausgleichskasse",
          "meta": "übermittelt"
        },
        {
          "title": "BVG-Lohnmeldung",
          "text": "1× pro Jahr · Pensionskasse",
          "meta": "übermittelt"
        },
        {
          "title": "Unfallversicherung (UVG)",
          "text": "1× pro Jahr · Versicherer",
          "meta": "vorbereitet"
        },
        {
          "title": "Lohnausweise",
          "text": "1× pro Jahr · Mitarbeitende & Steueramt",
          "meta": "übermittelt"
        }
      ],
      "flow": [
        {
          "title": "Daten liegen bereit",
          "text": "Löhne, Stunden und Personaldaten sind bereits in der Plattform erfasst.",
          "meta": "App"
        },
        {
          "title": "Meldung vorbereiten",
          "text": "Quellensteuer, AHV, BVG, UVG und MWST werden automatisch vorbereitet.",
          "meta": "App"
        },
        {
          "title": "Kontrolle",
          "text": "Sie sehen jederzeit, was gemeldet wird und wann die nächste Frist fällig ist.",
          "meta": "Sie"
        },
        {
          "title": "Übermitteln",
          "text": "Die Meldung geht sicher und fristgerecht an die zuständige Stelle; der Nachweis wird abgelegt.",
          "meta": "Amt"
        }
      ]
    },
    {
      "id": "homepage",
      "name": "Homepage",
      "short": "Eine Homepage, die zu Ihrem Betrieb passt – zuerst fürs Handy gebaut.",
      "title": "Individuelle Homepage & Präsenz",
      "text": "Individuell gestaltete Homepages geben Ihrem Betrieb ein zeitgemässes, vertrauenswürdiges digitales Erscheinungsbild. Ihre Kunden finden Sie leichter, Ihr Unternehmen wirkt moderner und professioneller.",
      "feats": [
        {
          "title": "Mobil zuerst",
          "text": "Perfekt lesbar auf Handy, Tablet und Desktop. Die meisten Besuche kommen heute vom Handy – dort planen wir zuerst."
        },
        {
          "title": "Dienstleistungen & Produkte",
          "text": "Ihr Angebot klar und ansprechend dargestellt – übersichtlich gegliedert, damit Kunden sofort finden, was sie suchen."
        },
        {
          "title": "Team & Werte",
          "text": "Ihr Team, Ihre Geschichte und Ihre Werte zeigen, wer hinter dem Betrieb steht – Vertrauen auf den ersten Blick."
        },
        {
          "title": "Kontakt & Standort",
          "text": "Adresse, Öffnungszeiten und Karte – sofort gefunden, mit einem Tipp anrufen."
        }
      ],
      "flow": [
        {
          "title": "Gespräch",
          "text": "Wir klären, was Ihr Betrieb zeigen will: Dienstleistungen, Produkte, Team und Kontakt.",
          "meta": "Sie & wir"
        },
        {
          "title": "Entwurf",
          "text": "Wir gestalten die Seite passend zu Ihrem Auftritt, zuerst für das Handy.",
          "meta": "Wir"
        },
        {
          "title": "Inhalte & Feinschliff",
          "text": "Texte und Bilder einsetzen und gemeinsam abstimmen.",
          "meta": "Sie & wir"
        },
        {
          "title": "Live",
          "text": "Die Seite geht online. Spätere Änderungen übernehmen wir.",
          "meta": "Wir"
        }
      ]
    },
    {
      "id": "personal",
      "name": "Personal",
      "short": "Vom Vertrag bis zum Austritt: alle Unterlagen digital an einem Ort.",
      "title": "Personal & Verwaltung",
      "text": "Arbeitsverträge, Versicherungsunterlagen, Ein- und Austrittsmeldungen sowie alle relevanten Dokumente werden zentral verwaltet. Keine Papierstapel, keine verlorenen Dokumente – ein professioneller, moderner Personalprozess.",
      "feats": [
        {
          "title": "Verträge",
          "text": "Arbeitsvertrag digital unterschrieben, Zusatzvereinbarung Homeoffice, Arbeitszeitreglement für alle einsehbar.",
          "meta": "3 Dokumente"
        },
        {
          "title": "Versicherungen",
          "text": "AHV-Anmeldung übermittelt, Pensionskasse (BVG) angemeldet, Unfall- & Krankentaggeld mit hinterlegter Police.",
          "meta": "3 Dokumente"
        },
        {
          "title": "Ein- & Austritte",
          "text": "Eintritts- und Austrittsmeldungen sowie Arbeitszeugnis – geordnet und ohne Papier.",
          "meta": "3 Dokumente"
        },
        {
          "title": "Neue Mitarbeitende – vollständig digital integriert",
          "text": "Vertrag digital unterschreiben → Versicherungen anmelden → Zugang zur App → Erster Arbeitstag"
        }
      ],
      "flow": [
        {
          "title": "Vertrag",
          "text": "Arbeitsvertrag digital erstellen und unterschreiben.",
          "meta": "Sie & Mitarbeitende"
        },
        {
          "title": "Anmeldung",
          "text": "Versicherungen und Eintrittsmeldungen werden angemeldet.",
          "meta": "App"
        },
        {
          "title": "Ablage",
          "text": "Alle Unterlagen liegen zentral und digital im Personaldossier.",
          "meta": "App"
        },
        {
          "title": "Austritt",
          "text": "Auch Austritte laufen geordnet und ohne Papier.",
          "meta": "App"
        }
      ]
    }
  ]
};

export const schnellDemo: Record<Locale, SchnellDemoText> = { tr, en, de };
