# Punn Digital sitesi: eksikler ve yapılacaklar

Son güncelleme: 2026-10-12. Bu dosya projede **ne var, ne eksik, kimin neyi bağlayacağı** sorularına tek yerden cevap verir.
Kod: `D:\repos\Zafer` (Next.js 16, Tailwind v4). Çalıştırma: `npm run dev` → http://localhost:3000

---

## 1. Şu an ne var

| Adres | Ne | Durum |
|---|---|---|
| `/` | Ana sayfa: Hero (canlı saatler dahil), Neler yapar, Yolculuk, Çözümlerimiz (4 kart), Akıllı Kapı bölümü (video + galeri), Paketler, SSS, Demo bandı, Footer | Çalışıyor, 3 dil, gece/gündüz |
| `/test-et` | "Otelinizin asistanını hemen deneyin" sayfası (bilgi formu, deneme sohbeti, arama seçenekleri) | Çalışıyor ama **sahte yanıtlarla** |
| `/panel` | Otel paneli: Genel bakış, Konuşmalar, Kurulum (7 adım), Akıllı kilitler | Çalışıyor ama **örnek verilerle**; sitede hiçbir yerden linklenmiyor (gizli) |
| `docs/db/schema.sql` | Veritabanı tabloları (MySQL / phpMyAdmin) | Hazır, henüz çalıştırılmadı |
| `public/videos/` | Akıllı kapı videosu (sessiz, müzik + efekt var) ve TR/EN/DE konuşma ses dosyaları | Hazır |

Genel: 3 dil (TR / EN / DE), gece ve gündüz teması, mobil + tablet + masaüstü. Renkler `src/styles/theme.css`, yazı tipi `src/styles/fonts.ts`.

---

## 2. Veritabanı ve yapay zeka bağlantısı (en önemli eksik)

**Kural:** Ekranlar veriyi sadece iki dosyadan alır. Bağlantıyı yapacak kişi **sadece bu iki dosyadaki fonksiyonların içini** `fetch(...)` çağrısına çevirir; tipler (`src/lib/panel/types.ts`, `src/lib/demo/api.ts` içindeki `DemoInfo`) ve ekranlar değişmez.

### 2.1 Panel: `src/lib/panel/api.ts`

| Fonksiyon | Ne yapar | Tablolar |
|---|---|---|
| `listHotels()` | Kullanıcının oteller listesi | `hotels`, `hotel_users` |
| `getOverview(hotelId, range)` | Genel bakış rakamları, grafikler, oda ve rezervasyon özeti | `daily_stats`, `conversations`, `bookings`, `rooms` |
| `listConversations(hotelId)` | Konuşmalar + mesajlar | `conversations`, `messages`, `guests` |
| `sendStaffMessage(convId, text)` | Personelin yazdığı mesajı kaydeder / konuşmayı devralır | `messages`, `conversations.status` |
| `listRooms(hotelId)` | Odalar + akıllı kilitler | `rooms`, `locks` |
| `listTempCodes(hotelId)` | Aktif geçici şifreler | `temp_codes` |
| `createTempCode(...)` | Yeni geçici şifre üretir ve misafire gönderir (**kilit sağlayıcısı Tuya / TTLock çağrısı sunucuda**) | `temp_codes`, `lock_events` |
| `listBookings(hotelId)` | Rezervasyonlar | `bookings` |
| `getSetup(hotelId)` / `saveSetup(...)` | Kurulum ekranı ayarları (**şu an tarayıcıda `localStorage`**) | `hotel_profiles`, `channels`, `hotel_languages`, `persona`, `room_types`, `faqs`, `policies`, `knowledge_docs`, `handoff_rules`, `integrations` |
| `connectChannel(channel, handle)` | WhatsApp / Instagram / Messenger / web bağlama (OAuth, webhook kurulumu sunucuda) | `channels` |
| `testIntegration(kind, provider)` | PMS / kilit / takvim bağlantı testi | `integrations` |

### 2.2 Test Et sayfası: `src/lib/demo/api.ts`

| Fonksiyon | Ne yapar | Tablolar |
|---|---|---|
| `submitDemoInfo(info)` | Formu kaydeder, yapay zeka demo asistanı hazırlar, `demoId` döner | `demo_sessions` |
| `requestCallback(demoId, phone)` | "Dijital resepsiyonistiniz sizi arasın" isteği | `demo_callbacks` |
| `requestSummary(demoId, whatsapp)` | Görüşme özetini WhatsApp'a gönderme isteği | `demo_sessions` |
| Deneme sohbeti | Şu an `src/lib/demo/answer.ts` içinde **sahte anahtar kelime yanıtı**; gerçek yapay zeka yanıtı bağlanmalı | `demo_messages` |

Sabitler (aynı dosyada): `DEMO_WHATSAPP` (site alt bilgisindeki numara) ve `DEMO_PHONE` (**boş, demo arama hattı numarası bekleniyor**).

### 2.3 Bağlantı için karşı tarafın düşünmesi gerekenler (henüz kararlaştırılmadı)

- **Sunucu tarafı nerede olacak?** Site şu an statik sayfalar. API'yi Next.js içinde (`app/api/...`) mi, ayrı bir servis (PHP / Node) mi yapacaksınız? phpMyAdmin kullanıldığı için MySQL/MariaDB'ye sunucudan bağlanılacak; **site Vercel'deyse veritabanına dışarıdan erişim (uzak MySQL) gerekir.**
- **Giriş (kimlik doğrulama) yok.** `/panel` şu an herkese açık. `users` ve `hotel_users` tabloları var ama giriş ekranı ve oturum yok.
- **Gizli bilgiler:** `channels.credentials`, `integrations.api_key`, `temp_codes.code` sunucuda şifreli tutulmalı; tarayıcıya düz gitmemeli.
- **Gerçek zamanlı:** Konuşmalar ekranı ve canlı akış şu an her birkaç saniyede sahte olay üretiyor. Gerçekte WebSocket / SSE veya kısa aralıklı sorgu gerekir.
- **Kanal webhook'ları:** WhatsApp, Instagram, Messenger (Meta) ve telefon için gelen mesajları yapay zekaya ve `messages` tablosuna yazacak taraf.
- **PMS:** Hangi PMS ile konuşulacağı belirsiz (ekranda seçenekler: Elektra Web, Opera, Protel, özel). Rezervasyon ve müsaitlik buradan gelecek.
- **Dosya yükleme:** Kurulum ekranındaki "belge yükle" şu an sadece görünüm (sahte ilerleme). Gerçek yükleme + yapay zekanın belgeyi işlemesi (`knowledge_docs.indexed_at`).
- **Demo hattı:** Telefonla test için numara ve geri arama servisi.
- **Çok dil:** Panel metinleri 3 dilde hazır; yapay zeka yanıt dili (`messages.lang`) ve çeviri (`body_translated`) karşı tarafta üretilecek.

---

## 3. Menü ağacı: hangi madde ne durumda

Menü: **Çözümlerimiz** (Dijital Resepsiyon, Yapay Zekâ Telefon Asistanı, PMS / Otel Yönetim Sistemi, Akıllı Kapı / Kilit Sistemleri) · Test Et · Teknolojimiz · Müşterilerimiz · Bize Ulaşın · Blog · Demo Talep Et

| Madde | Şu anki durum | Eksik / yapılacak |
|---|---|---|
| Dijital Resepsiyon | Ana sayfada bölüm (`#dijital-resepsiyon`) | İstenirse ayrı sayfa |
| Yapay Zekâ Telefon Asistanı | Çözümler kartı var; "Detaylar" **iletişime** gidiyor | Ayrı sayfa/bölüm içeriği |
| PMS / Otel Yönetim Sistemi | Çözümler kartı var; "Detaylar" **iletişime** gidiyor | Ayrı sayfa/bölüm içeriği, hangi PMS'ler destekleniyor |
| Akıllı Kapı / Kilit Sistemleri | Hazır: video (TR/EN/DE ses), 4 resimlik galeri, özellikler, paket içeriği | Resimlerin üstündeki İngilizce yazılar (aşağıya bak) |
| Test Et | `/test-et` var | Gerçek yapay zeka ve arama hattı (bölüm 2.2) |
| Demo Talep Et | Sayfada demo bandı (`#demo`), form **yok** | Demo talep formu ve kaydı (örn. `demo_requests` tablosu, e-posta bildirimi) |
| **Teknolojimiz** | Menüde var ama bağlantı **hiçbir yere gitmiyor** (`/#teknolojimiz` bölümü yok, akıllı kapı bölümü Çözümlerimiz'e taşındı) | Teknolojimiz sayfasının içeriği belirlenmeli (neleri anlatacak?) |
| **Müşterilerimiz** | `/#musterilerimiz` bölümü **yok** | Gerçek müşteri logoları ve yorumları gerekli (uydurma yazmadık) |
| **Bize Ulaşın** | Footer'a gidiyor (iletişim bilgileri var) | İletişim formu yok |
| **Blog** | `/#blog` bölümü **yok** | Yazılar, blog düzeni, yazı kaynağı (elle mi, veritabanı mı) |

---

## 4. Ana sayfada kapatılan (yorum satırı) Era şablonu bölümleri

`src/app/page.tsx` içinde yorum satırı: **Marquee** ("Trusted By" kayan yazı), **About** (sayaçlar), **Voice** (kod editörü görseli, İngilizce metinler), **Testimonials** (referanslar). Dosyaları duruyor, tek satırla açılır. Açmadan önce Punn içeriğiyle doldurulmalı:
- Marquee: gerçek müşteri/ortak logoları ya da kanal/dil/özellik kelimeleri
- About: gerçek rakamlar (uydurma sayı kullanma)
- Voice: Punn'a özel içerik ya da kalıcı kaldırma
- Testimonials: **gerçek** müşteri yorumu (isim, otel, izin)

`public/sites/era/` altında ~83 Era görseli var, çoğu artık kullanılmıyor; temizlenebilir.

---

## 5. Panel: bilinen eksikler

- Giriş ekranı, roller (sahip / müdür / resepsiyon), yetki kontrolü.
- Konuşmalar: rezervasyon eşleştirmesi şu an misafir adına göre; gerçek veride `conversations.booking_id` kullanılmalı. Çeviri satırı mock'ta Türkçe; personelin diliyle gelmeli. `sendStaffMessage` yanıtı ekrana basılmıyor (yerel kopya gösteriliyor).
- Genel bakış: rakamlar `daily_stats` toplamasından gelmeli; para birimi otelden.
- Kurulum: "Yayına al" şu an sadece `published=true` yazıyor; yayına alınca yapay zeka tarafında ne tetiklenecek tanımlanmalı. Kanal "bağla" butonları sahte (1,4 sn bekleyip yeşil oluyor).
- Akıllı kilitler: "Uzaktan aç" ve "Geçici şifre oluştur" sahte. Gerçekte Tuya / TTLock API ve şifre gizleme mantığı.
- Panel menüsü sitede linklenmiyor; karar verilmeli (ayrı alan adı? giriş butonu?).
- Kurulum ve panel metinlerinde yerelleştirme tamam (TR/EN/DE), yeni alan eklenirse üç dile de eklenmeli.

---

## 6. Video ve ses

- Video sessiz (müzik + efektler içinde). Konuşma ayrı: `public/videos/ses-tr.mp3`, `ses-en.mp3`, `ses-de.mp3`; site dile göre çalar, videoyla eşler.
- **Videodaki yazılar Türkçe** (altyazı, kart başlıkları, telefon mesajı). EN/DE izleyici Türkçe yazı görür; karar: böyle kalsın, ya da 3 sessiz video + 3 ses.
- **Resimlerdeki İngilizce yazılar** ("5-in-1 Access Options", "Fingerprint", "Anti-Peeping Passcode") olduğu gibi duruyor.
- Müzik, konuşma sırasında **Türkçe konuşma aralıklarında** kısılıyor; EN/DE'de tam üst üste gelmeyebilir.
- Sesleri **kulakla dinleyip onaylayan kimse yok**; İngilizce ve Almanca okunuşlar (özellikle "Punn Digital", "TTLock") kontrol edilmeli.
- Üretim: `D:\repos\VideoEditMaster\projects\punn-akilli-kapi\` (`render.bat` videoyu, `work/make_vo_lang.py` ve `work/make_bed.py` sesleri üretir).

---

## 7. Cevap bekleyen sorular

1. Dijital Resepsiyonist, geçici kapı şifresini **gerçekten gönderiyor mu** (entegrasyon), yoksa akıllı kilit ayrı bir ürün mü? Sitede "ödemeli hizmet" mi, "paket" mi diye anlatılacak?
2. Video biçimi: 16:9 mı kalsın, Instagram için dikey/kare sürüm de lazım mı?
3. Videoda ve resimde **QLEUNG, Tuya, TTLock** isim/logolarının gösterilmesine izin var mı? (Şu an Tuya ve TTLock logoları galeri resminde görünüyor.)
4. Hero'daki kanal ikonlarında **Messenger mı, Facebook mu**?
5. PDF'teki iki QR kod (Nani Butik Otel, Hotel Kernhof Zürich): canvaqr.com bağlantıları açılıp demo adreslerine bağlanacak mı?
6. `zafer testler.txt` içindeki `elektraweb.com` ne için (PMS örneği mi)?
7. Gerçek müşteri logoları ve yorumları ne zaman gelecek?
8. Tedarikçi resimlerinin (kilit fotoğrafları) sitede kullanım izni var mı?
9. İlk açılışta tema: şu an cihaz ayarına uyuyor (koyu telefon = koyu site). Hep açık mı başlasın?
10. `/test-et` sayfası: orijinal görseli birebir yaptık, istenmeyebilir; kalsın mı?

---

## 8. Teknik notlar

- Geliştirme sunucusunda yeni CSS bazen eski kalıyor: sunucuyu kapatıp `.next` klasörünü silip `npm run dev` ile yeniden başlat.
- Tarayıcı eklentileri (örn. `bis_skin_checked`) geliştirme modunda "1 Issue" (hydration uyarısı) gösterebilir; site hatası değil.
- Git commit e-postası **adnan.aydin@bluewin.ch** olmalı (xanadu.ch@gmail.com kullanma: Vercel deploy'u bloke olur).
- Push sadece sahibi "push" deyince yapılıyor.
- Panel `.panel-root` içinde `zoom: 0.92` ile %8 küçük çiziliyor (`globals.css`).
- Kaydırma çubuğu, saat, yukarı çık kilidi, favicon: `globals.css`, `Clock.tsx`, `BackToTop.tsx`, `src/app/icon.svg`.
