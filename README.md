# Zafer

Zafer turizm sitesi. Next.js 16 (App Router, React 19, TypeScript), Tailwind CSS v4, shadcn/ui. Diller: Türkçe, İngilizce, Almanca.

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + build
```

Node.js 24 gerekir.

## Ortam değişkenleri

Hiçbiri zorunlu değildir; yoksa ilgili özellik devre dışı kalır, site yine açılır. Değerler repoya yazılmaz, sunucuda ya da `.env.local` içinde tutulur.

| Ad | Ne için |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitenin adresi (sitemap, robots, paylaşım görseli) |
| `CHAT_API_BASE`, `CHAT_API_KEY`, `CHAT_MODEL` | Sohbet robotu |
| `CHAT_SYSTEM_PROMPT`, `CHAT_HOTEL_INFO` | Sohbet robotu talimatı ve otel bilgisi (opsiyonel) |
| `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` | İletişim formu e-postası (yoksa e-posta uygulaması açılır) |

## Yayın

Site `output: "standalone"` olarak derlenir ve Node.js destekli hostinge yüklenir (punndigital.com, Güzel Hosting, cPanel Node.js uygulaması). Kurulum, klasör düzeni ve dikkat edilecekler: [`YAYIN-DURUMU.md`](YAYIN-DURUMU.md).

## Klasörler

```
src/app/          sayfalar ve API (/api/chat, /api/contact)
src/components/   bileşenler
public/           statik dosyalar, görseller, videolar
docs/             araştırma notları
```

## Lisans

MIT (bkz. `LICENSE`).
