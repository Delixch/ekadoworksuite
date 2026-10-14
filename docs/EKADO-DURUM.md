# Ekado WorkSuite tanıtım sitesi: ne yapıyoruz, nerede kaldık

Son güncelleme: 2026-10-14. Bu dosya **Ekado WorkSuite** (işletme yazılımı) tanıtım sitesinin güncel durumunu kayıt altına alır. Şifre ve anahtar içermez.

## 0. Adlar (2026-10-14'te değişti)

| Ne | Değer |
|---|---|
| GitHub deposu | `Delixch/ekadoworksuite` (herkese açık) |
| Yerel klasör | `D:epos\ekadoworksuite` |
| `origin` | `https://github.com/Delixch/ekadoworksuite.git` |
| Vercel | `ekadoworksuite` (`prj_mw0ab5hvAMQnHCiKTEe3oC6tFVpk`), canlı: https://ekadoworksuite.vercel.app, GitHub `main`'e bağlı, son deploy 83d30c3 READY |


Klasör adı değişince Claude hafızası yeni klasörde boş başlamasın diye `C:\Users\xdd\.claude\projects\D--repos-ekadoworksuite\memory` altına kopyalandı.

## 1. Özet

Site artık, `D:\repos\Gastro apps supi` içindeki **Ekado WorkSuite** programını (vardiya, bordro, HACCP, sipariş, kasa, muhasebe) tanıtıyor ve satıyor. Program restoran, kafe, fırın ve küçük işletmeler içindir. Canlı demosu `https://api.adodesign.ch` adresinde, PHP + MariaDB, Hostpoint (İsviçre).

Site Next.js 16 ve Tailwind v4 ile yazıldı; içerik, renkler ve logo Ekado'ya göre hazırlandı.

## 2. Kararlar (Adnan'ın istekleri)

| Konu | Karar |
|---|---|
| Marka | Ekado. Logo `D:\repos\Ekado_V2\site\assets\mail-logo.svg` (koyu `#1c2b3a`, mavi `#2b5ab0`). |
| Renk | Krem zemin, logodan gelen lacivert ve mavi. Gündüz ve gece teması. Tüm renkler `src/styles/theme.css` içinde, bileşene renk kodu yazılmaz. |
| Dil | tr, en, de. Program arayüzü Almanca olduğu için ekran görüntüleri Almanca. |
| Fiyat | Bilinmiyor, uydurulmadı. Fiyat bölümü ve chatbot fiyat cevabı fiyat gelince yazılır. |
| Hızlı demo | Canlı demoya doğrudan link yok. Form açılır (ad, soyad, e-posta, "küçük bir göz atmak istediğiniz şey"). Gönder'e basınca "giriş bilgileriniz yolda" yazar. |
| Modüler yapı | "Ne iş yaparsanız yapın, biz uyarız." Çekirdek + branş modülleri. Olmayan modül (Taksi, Dispatch, Sefer kaydı, Saha işi) "Size özel" olarak gösterilir, var gibi sunulmaz. |
| Destek | İlk 3 ay ücretsiz, yerinde (Vor Ort). Yorumlar DEMO metindir. |
| Yazı hizalama | Modüler Yapı ve Destek sayfalarında yazılar sola yaslı (ortalı değil). |
| Tasarım dışına çıkmama | Tema dışı renk yok. Menü rengi opak ve sayfa renginde. |

## 3. Sayfalar

| Adres | Ne | Dosya |
|---|---|---|
| `/` | Ana sayfa: hero (laptop + telefon slaytı), kayan şerit, Neler yapar, Bir işletme günü, Modüller, SSS, CTA, İletişim | `src/app/page.tsx` + `src/components/sites/era/*` |
| `/moduler` | Modüler Yapı: animasyonlu gösteri (çekirdek, branş, modül, ortak amaç) | `ModularPage.tsx`, `src/i18n/modular.ts` |
| `/support` | Destek: 3 aylık halka, yol haritası, yerinde, istek akışı, yorumlar | `SupportPage.tsx`, `src/i18n/support.ts` |
| `/teknolojimiz` | `/moduler`'e yönlenir | `src/app/teknolojimiz/page.tsx` |
| `/blog` | `/support`'a yönlenir | `src/app/blog/page.tsx` |
| `/musterilerimiz` | Hâlâ "yapım aşamasında" | `ConstructionPage.tsx` |
| `/impressum`, `/datenschutz` | Firma verisi `src/lib/company.ts` içinden | `LegalPage.tsx` |
| `/test-et`, `/panel` | Eski otel ürününden kalan sayfalar, menüde yok, sitemap'te `/test-et` yok | `TestPage.tsx`, `PanelApp.tsx` |

Menü: Modüller (4 grup), Hızlı Demo, Modüler Yapı, Müşterilerimiz, Bize Ulaşın, Destek. Bağlantılar `nav-links.ts`, metinler `src/i18n/{tr,en,de}.ts` içinde `nav`.

## 4. Nereyi değiştirirsin

| İstek | Dosya |
|---|---|
| Renk | `src/styles/theme.css` |
| Yazı tipi | `src/styles/fonts.ts` (şu an Manrope) |
| Ana sayfa metinleri | `src/i18n/tr.ts`, `en.ts`, `de.ts` (anahtar ekleyince üçüne de ekle) |
| Hero laptop ekranları | `HeroPanel.tsx` içindeki `panels` listesi, görseller `public/sites/ekado/panel-*.jpg` |
| Hero telefon ekranları | `HeroPanel.tsx` içindeki `slides`, görseller `public/sites/ekado/phone-*.jpg` |
| Kayan şerit (modül adları) | `marquee` anahtarı, 3 dil dosyası |
| Hızlı demo formu metni | `src/i18n/contact.ts` içinde `demo` |
| İletişim / ofis | `src/lib/offices.ts`, `src/i18n/offices.ts`, `src/lib/company.ts` |
| Sohbet robotu bilgisi | `src/lib/chat/knowledge.ts` (sayfa metninden okur) ve `src/app/api/chat/route.ts` (sistem istemi) |
| Favicon | `src/app/icon.svg` (kalın KA) |
| Paylaşım görseli | `src/app/opengraph-image.tsx` |

## 5. Hero ve ekran görüntüleri

Görüntüler canlı demodan (`api.adodesign.ch`) demo hesaplarıyla alındı: yönetici (Geschäftsführer) için 6 ekran, çalışan için telefon boyutunda 3 ekran. Demo verisidir. Kreditoren ekranında gerçek firma adları var (Hiestand, Stadtwerke Winterthur). Demo verisi değilse görüntü çıkarılmalı.

Almadıklarımız: Bank (boş), Lohnläufe (uyarılar dolu), Mitarbeiter (telefon ve e-posta içeriyor), Bestellungen (marka adları).

## 6. Açık işler ve riskler

1. **Müşteri yorumları sahte.** Anna K. ve Marco B. uydurma isimler, yayından önce gerçekleriyle değiştirilecek.
2. **Destek vaatleri onay bekliyor:** 3 ay ücretsiz, yerinde kurulum.
3. **Fiyat yok.** Fiyat gelince bölüm ve chatbot cevabı yazılacak. `Pricing.tsx` ve `Technology.tsx` ana sayfadan çıkarıldı (dosyalar duruyor).
4. **Hızlı demo e-postası:** Form `info@ekado.ch` adresine istek gönderir. Giriş bilgilerini otomatik yollayan bir şey yok. Vercel'de `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` yoksa form ziyaretçinin e-posta uygulamasını açar.
5. **Canlı demonun giriş sayfası** demo şifrelerini herkese gösteriyor (`api.adodesign.ch`). Form bunu kapatmıyor.
6. **Firma bilgisi:** Ekado, Langstrasse 120, 8055 Zürich (`company.json`). Posta kodu kontrol edilmeli (8004/8005 olabilir). Telefon yok, gösterilmiyor. Vergi no ve sicil boş, yasal sayfada sarı etiketle görünür.
7. **Eski otel kalıntıları:** `/test-et`, `/panel`, `HeroMockup.tsx`, `Clock.tsx` içindeki kullanılmayan `Clock` bileşeni, otel metinleri taşıyan `mockup`, `pricing`, `technology` anahtarları (tip uyumu için duruyor).
8. **Müşterilerimiz sayfası** "yapım aşamasında".
9. **`NEXT_PUBLIC_SITE_URL`** yeni alan adına ayarlanmalı, yoksa paylaşım önizlemeleri ve sitemap eski adrese bakar.
10. **Yayın:** Site Vercel'de (https://ekadoworksuite.vercel.app); `main`'e push edilince otomatik yayınlanır.

## 7. Yayın öncesi kontrol listesi

- [ ] `npm run build` (dev sunucusunu önce kapat)
- [ ] `git config user.email` = `adnan.aydin@bluewin.ch`
- [ ] Gündüz ve gece temasında tüm sayfalara bak, telefon genişliğinde de
- [ ] Yorumları değiştir, fiyatı ekle ya da bölümü çıkar
- [ ] Vercel ortam değişkenleri (form için)
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] Kreditoren görüntüsündeki firma adlarını kontrol et

## 8. Çalışma notları

- Tüm değişiklikler henüz **commit edilmedi**.
- Tarayıcı kontrolleri masaüstü genişlikte gündüz temasında yapıldı. Gece ve telefon çoğu yerde ayrıca bakılmadı.
- Geliştirme sunucusu bazen CSS değişikliğini kaçırır. Görüntü eski kalırsa dosyaya dokunun (`touch`) ya da sunucuyu yeniden başlatın.
- Kullanıcı Chrome pencerelerini kapatmayın isteği kalıcı kural (hafıza: `feedback-chrome-penceresi-kapatma`).

## 9. Yeni oturumda nasıl devam edilir

1. Claude'u `D:\repos\ekadoworksuite` klasöründe aç.
2. Önce bu dosyayı oku (`docs/EKADO-DURUM.md`). `docs/EKSIKLER-VE-YAPILACAKLAR.md` eski, otel döneminden kalma, güncel değil.
3. Geliştirme sunucusu: `npm run dev`. Port 3000 doluysa 3001'e geçer.
4. Sıradaki işler (§6 ve §7): yorumlar, fiyat, build, Vercel.
5. Bekleyen küçük iş: `D:\repos\VideoEditMaster\tools\screenrec\` içinde `npm install`.
