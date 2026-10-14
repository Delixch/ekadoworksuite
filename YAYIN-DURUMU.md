# Ekado WorkSuite sitesi: yayın durumu

Son güncelleme: 2026-10-14.

## Canlı site
- Adres: https://ekadoworksuite.vercel.app
- Vercel projesi: `ekadoworksuite` (hesap: adnanwalk), GitHub `Delixch/ekadoworksuite` deposunun `main` dalına bağlı.
- Yayın akışı: `main`'e commit + `git push` → Vercel otomatik derler ve yayınlar.
- Commit e-postası `adnan.aydin@bluewin.ch` olmalı (başka e-posta Vercel deploy'unu bloke eder).

## Ortam değişkenleri (Vercel → Settings → Environment Variables)
İletişim formu e-postası için: `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. Yoksa form ziyaretçinin e-posta uygulamasını açar. Değerleri müşteri yazar, koda girmez.

## Yerel çalıştırma
`npm install`, `npm run dev` (http://localhost:3000), `npm run check` (lint + typecheck + build).
