# Zafer sitesi: yayın (hosting) kurulumu ve güncel durum

Son güncelleme: 2026-10-13. Bu dosya, siteyi FTP ile Güzel Hosting'e yayına alırken yaptıklarımızı, nedenlerini ve şu anki durumu kayıt altına alır. Şifre ve anahtar içermez.

## 1. Özet (tek paragraf)

Zafer sitesi (Next.js 16, `output: "standalone"`) **punndigital.com** alan adında, Güzel Hosting (cPanel + CloudLinux Node.js Selector / Passenger) üzerinde **Node.js uygulaması** olarak çalışıyor. Yayın paketi `D:\repos\Zafer\FTP.ICIN_zafer` klasöründe hazırlanıp FTP ile sunucudaki `/home/punndigi/frontend` klasörüne yüklendi. Site açıldı (2026-10-13).

## 2. Hesap ve sunucu bilgileri

| Ne | Değer |
|---|---|
| Hosting firması | Güzel Hosting (müşteri paneli: guzel.net.tr) |
| Paket | Ekonomi-1, TR Web Hosting |
| Alan adı | punndigital.com |
| cPanel | `mt-lunar.guzelhosting.com:2083`, kullanıcı `punndigi` |
| Sunucu IP | 89.252.180.227 |
| Node.js | 20.20.2 (CloudLinux Node.js Selector) |
| Ana dizin | `/home/punndigi` |

Şifreler bu dosyada YOK. Kullanıcı (Adnan) panele kendisi giriş yapar.

## 3. Sunucudaki klasör düzeni (güncel)

| Klasör | Durum | Açıklama |
|---|---|---|
| `/home/punndigi/frontend` | **CANLI, silme** | Yeni Zafer sitesi burada. Node uygulamasının "Application root"u. |
| `/home/punndigi/frontend_eski` | Yedek | Eski sürüm (aynı proje, sunucuda derlenmişti; kaynak, build logları, `.next-*` yedekleri, `.env.local` gerçek anahtar içerebilir). Birkaç gün sorun çıkmazsa bilgisayara indirilip silinebilir. |
| `/home/punndigi/public_html` | **Silme** | Alan adının belge kökü (cPanel > Alan Adları: punndigital.com = `/public_html`). cPanel'in yazdığı Passenger bloğu `.htaccess` içinde burada. |
| `/home/punndigi/public_html.yeni` | Büyük ihtimalle kullanılmıyor | Silmeden önce içine bak, yedek al. Adnan başta alan adının buradan veri aldığını sanmıştı. |
| `/home/punndigi/nodevenv/frontend` | **Silme** | Node.js sanal ortamı (uygulamanın çalıştırdığı Node burada). |
| `/home/punndigi/app.punndigital.com` | **Silme** | `app.punndigital.com` alt alan adının belge kökü. Bu işle ilgisi yok. |

Yerel bilgisayarda (PC): `D:\repos\Zafer\FTP.ICIN_zafer` = yüklenen paket.

## 4. Neler yaptık ve neden

### 4.1 Yayın paketini hazırladık
- `next.config.ts` zaten `output: "standalone"` idi.
- `npm run build` çalıştırıldı (16 sayfa, `/api/chat` ve `/api/contact` dinamik).
- `.next/standalone` içeriği `FTP.ICIN_zafer` klasörüne kopyalandı, üstüne `.next/static` ve `public` eklendi.
- **Neden:** Standalone çıktı kendi başına çalışan `server.js` üretir, sunucuda tüm kaynak kodu derlemek gerekmez. `.next/static` ve `public` standalone içinde otomatik gelmez, elle eklenir (yoksa CSS ve resimler 404 olur).
- Yerelde `node server.js` ile denendi: `/` ve `/panel` 200 döndü, CSS bağlantısı vardı.
- Klasöre `OKU.txt` (kurulum notu) ve `ENV.ORNEK.txt` (ortam değişkeni adları, değersiz) konuldu. `.gitignore`'a `FTP.ICIN_zafer/` eklendi.
- Kullanıcıya yükleme rehberi için `YAYINA-ALMA-REHBERI.html` yazıldı (paket klasöründe, `public` dışında, internetten açılmaz).

### 4.2 Hosting panelini inceledik (sadece okuduk)
- cPanel'de **Setup Node.js App** var, yani paket Node.js destekliyor (Ekonomi paketinde bu garanti değildi).
- Zaten `punndigital.com/` için bir Node uygulaması kayıtlıydı: root `/home/punndigi/frontend`, Node 20.20.2, production, çalışıyor. İçinde aynı projenin eski, sunucuda derlenmiş sürümü vardı (dağınık, çok yedek).

### 4.3 `.htaccess` ve Passenger olayı
- Adnan merak edip `public_html/index.html` ve `public_html.yeni/index.html` dosyalarına test yazdı. Sonra `public_html/.htaccess` içindeki CloudLinux Passenger bloğunu gördü:
  ```
  PassengerAppRoot "/home/punndigi/frontend"
  PassengerBaseURI "/"
  PassengerNodejs "/home/punndigi/nodevenv/frontend/20/bin/node"
  PassengerAppType node
  PassengerStartupFile server.js
  ```
- **Bu blok, alan adını Node uygulamasına bağlayan şey.** Adnan ilk üç satırı silince bağ koptu ve Apache düz dosyaya (test `index.html`) düştü.
- Sonra blok geri geldi (cPanel Node.js sayfasında Save/Restart ya da yedekten) ve site açıldı.
- **Önemli kural:** Bu bloğu elle düzenleme. Doğru yol: Node.js sayfasından Save ve Restart, cPanel kendisi yazar.

### 4.4 Karar: mevcut uygulama kaydını kullanmak (yol A)
İki seçenek vardı:
- **A (seçildi):** Mevcut `frontend` uygulama kaydı korunur. Eski klasör `frontend_eski` yapılır, yeni boş `frontend` açılıp site oraya yüklenir.
- B: Eski kaydı sil, yeni isimle (ör. `zafer`) uygulama oluştur.
- **Neden A:** Kayıt, Node sürümü ve `.htaccess` bloğu zaten doğruydu. Aynı klasör adı kullanıldığı için hiçbir ayar değişmedi.
- `public_html`'i uygulama kökü yapmayı reddettik: kaynak dosyalar ve `.env` internetten indirilebilir hale gelir.

### 4.5 Yükleme ve kurulum
- Eski `frontend` → `frontend_eski` (FileZilla ile yeniden adlandırma), yeni boş `frontend` açıldı.
- FileZilla'da **gizli dosyalar göster** açıldı. Yüklenenler: `.next`, `public`, `server.js`, `package.json`.
- **`node_modules` yüklenmedi.** CloudLinux uygulama kökünde `node_modules`'ü kendi sanal ortamına bir sembolik bağ olarak yönetir, gerçek klasör çakışır. Onun yerine Node.js sayfasından **Run NPM Install** çalıştırıldı.
- NPM Install'dan kırmızı "Error" kutusu çıktı. İçeriği `npm warn ERESOLVE overriding peer dependency` (@babel peer uyarıları): **sadece uyarı**, cPanel stderr'i hep kırmızı gösteriyor. Kurulumu engellemedi.
- Uygulama ayarları (doğrulandı): Node 20.20.2, Production, root `frontend`, URL `punndigital.com` (yol boş), startup `server.js`.

### 4.6 "Web sitemiz yakında geliyor" sayfası
- Site ilk açıldığında Güzel Hosting'in hazır placeholder sayfası göründü (Passenger satırları eksik / `public_html/index.html` duruyor).
- **Kural:** `public_html` içinde `index.html` ya da `index.php` varsa Apache onu uygulamadan önce sunar. Bu dosyalar silinmeli ya da adı değiştirilmeli (`index.html.eski`).
- Passenger bloğu geri gelince sayfa açıldı (Adnan: "sayfa geldi").

## 4b. ÖNCEKİ (eski, karışık) düzen ve neden böyle yaptık

Biz gelmeden önce sunucuda şu vardı. Bu bölüm "neden uğraştık" sorusunun cevabıdır.

**Eski `/home/punndigi/frontend` (şimdi `frontend_eski`):** Aynı projenin eski sürümünün sunucudaki çalışma klasörü gibi kullanılmıştı (GitHub'daki `punndigital/pun` ile aynı proje). Kaynak kod ve derleme sunucunun üzerinde yapılmış, her denemeden bir yedek bırakılmıştı:
- Derleme yedekleri: `.next`, `.next-ara`, `.next-ara2`, `.next-ara3`, `.next-before-replyto-fix`, `.next-before-smtp`, `.next-onceki-20261010`, `.next-v1-paketli-20261010`, `.next-yedek-20261010`
- Kaynak yedekleri: `src`, `src-v1-paketli-20261010`, `src-yedek-20261010`
- Diğer: `public`, `tmp`, `.env.local` (gerçek anahtarlar olabilir), `node_modules` (CloudLinux sembolik bağı), `ecosystem.config.js` (PM2 artığı, Passenger'da gereksiz), `next.config.ts` ve `.bak`, `package.json`, `package-lock.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`, `server.js`
- Loglar ve artıklar: `build.log`, `build2..7-20261010.log`, `diag.txt`, `stderr.log`, `punn-demo-replyto-fix.tar.gz`
- Yani: derleme sunucuda yapılıyordu, her hatada elle yedek alınıyordu, hangisinin canlı olduğu belli değildi.

**Eski `public_html`:** İçinde hosting firmasının "Web sitemiz yakında geliyor" `index.html`'i, Adnan'ın bilmek için yazdığı test `index.html` dosyası ve `.htaccess`. `.htaccess` içinde CloudLinux Passenger bloğu ile birlikte iki kez tekrarlanmış cPanel php ini bloğu vardı (zararsız, tekrar).

**`public_html.yeni`:** Kimin açtığı belli olmayan, adı "yeni" olan ikinci klasör. Adnan hangisinin alan adını sunduğunu anlamak için ikisine de test `index.html` koydu. cPanel Alan Adları sayfası belge kökünü `/public_html` gösteriyor.

**Neden eski klasörü silmedik, adını değiştirdik:** İçinde eski sürümün tüm geçmişi ve olası gerçek anahtarlar vardı. Silmek geri dönüşsüzdü. Adını `frontend_eski` yapmak aynı işi (yeni sürüm için yer açmak) risksiz yaptı.

**Neden yeni uygulama açmak yerine aynı kaydı kullandık:** Kayıt (alan adı → `frontend` → Node 20 → `server.js`) ve `.htaccess` bloğu zaten doğruydu. Aynı klasör adıyla yeni içerik yüklenince hiçbir ayarı bozmadan sistem çalıştı.

**Neden derlemeyi artık sunucuda yapmıyoruz:** Ekonomi paketinde bellek ve süre sınırı var, sunucuda derlemek riskli ve yavaş. Derleme kendi bilgisayarımızda (ya da GitHub Actions'ta) yapılır, sunucuya sadece hazır çıktı yüklenir.

## 5. Alt alan adları (dokunma)

| Alt alan | Nerede | Not |
|---|---|---|
| `pms.punndigital.com` | **Vercel** | DNS: CNAME `cname.vercel-dns.com`. Bu sunucuda tanımlı DEĞİL. Adnan'ın kesinlikle bozulmasını istemediği alt alan. |
| `app.punndigital.com` | Bu sunucu | Belge kökü `/app.punndigital.com`, ayrı klasör. |

- Yapılan hiçbir işlem (klasör adı değişikliği, Node ayarı, `.htaccess`) `pms`'e dokunmaz.
- **Asla yapma:** cPanel Bölge Editörü'nde (Zone Editor) `pms` satırını silme/değiştirme, nameserver değiştirme.

## 6. Henüz yapılmamış / sıradaki işler

1. **Ortam değişkenleri:** Node.js sayfası > Environment variables bölümü şu an BOŞ. Girilecekler: `NEXT_PUBLIC_SITE_URL`, `CHAT_API_BASE`, `CHAT_API_KEY`, `CHAT_MODEL`, `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. Sonra Restart. (Kural: sohbet robotu anahtarlarını müşteri yazar, biz Vercel/gerçek değer yazmayız. Eski `frontend_eski/.env.local` içinde bu işe yarayabilecek isimler olabilir, sadece isimlere bakılır.) Not: `NEXT_PUBLIC_*` değişkenleri build sırasında koda gömülür; sunucuda sonradan girmek istemci tarafını değiştirmez, gerekirse yerelde `.env.local` ile yeniden build al.
2. **Site testi:** dil değiştirme, iletişim formu (anahtar yoksa e-posta uygulaması açılır), `/panel`, sohbet robotu, telefon görünümü.
3. **Temizlik (birkaç gün sonra):** `frontend_eski` ve `public_html.yeni` önce bilgisayara indirilir, sonra silinir. `public_html` içindeki test/placeholder `index.html` dosyaları kaldırılır.
4. **Her kod değişikliğinde:** yerelde `npm run build`, `FTP.ICIN_zafer` yeniden oluşturulur (standalone + `.next/static` + `public`), FTP ile `frontend`'e yüklenir (`node_modules` HARİÇ), Node.js sayfasından Restart. package.json bağımlılıkları değiştiyse Run NPM Install de çalıştırılır.

## 7. Bilinen tuzaklar (kısa liste)

- Gizli `.next` klasörü yüklenmezse site CSS'siz bozuk açılır.
- `node_modules` yüklenmez, NPM Install ile kurulur.
- Kırmızı NPM kutusu `warn` ise sorun yok, `error` ise ekran görüntüsü al.
- `.htaccess` Passenger bloğunu elle silme/düzenleme. Silindiyse Node.js sayfasında Save + Restart.
- `public_html/index.html` varsa uygulamanın önüne geçer.
- Destroy düğmesi uygulamayı siler, basma.
- DNS kayıtlarına ve nameserver'a dokunma (özellikle `pms`).
- Chrome otomasyonu: Claude yalnızca kendi sekme grubundaki sekmeleri görür. Panel sekmesi, uzantı grubu içinde açılınca görülebiliyor.

## 8. GitHub depoları

- `origin` = github.com/Delixch/zafer (Adnan hesabı)
- `punn` = github.com/punndigital/pun (özel, `main`). Bu depo AYNI Zafer projesinin kendisi; son commit (b01fee1) yerel ile aynı. Müşteri hesabında durduğu için otomatik yayın (GitHub Actions) buraya kurulacak. Yeni depo açmaya gerek yok.
- Orijinal `D:\repos\Zafer` (origin = Delixch/zafer) OLDUĞU GİBİ kalır, ona robot/workflow eklenmez.

### Zafer.yayin (müşteri deposu çalışma klasörü)

- Yer: `D:\repos\Zafer.yayin` = `punndigital/pun` deposunun klonu (git e-postası bluewin).
- **Güncelleme akışı:** Zafer'de değişiklik yap ve commit et → `powershell -File D:\repos\Zafer.yayin\senkronla.ps1` (sadece Git'in takip ettiği dosyaları Zafer'den Zafer.yayin'e kopyalar, silinenleri de siler, `.git` ve `.github`'a dokunmaz) → Zafer.yayin'de commit + `git push` → GitHub robotu siteyi yayınlar.
- `senkronla.ps1` Zafer.yayin'de `.git/info/exclude` ile gizli, müşteri deposuna girmez.
- Robot: `Zafer.yayin\.github\workflows\yayinla.yml`. Adımlar: checkout → Node (`.nvmrc`) → `npm ci` → `npm run build` → standalone paketi hazırla (`.next/standalone` + `.next/static` + `public`) → `tmp/restart.txt` güncelle (Passenger uygulamayı yeniden başlatır) → FTP-Deploy-Action ile `frontend/` klasörüne yükle (`node_modules` hariç).
- Zafer'in `.gitignore`'u `.github/` yok sayıyor; senkron script'i hedefte `!.github/` satırını otomatik ekler.
- **Robotun ihtiyacı (henüz YAPILMADI):** GitHub'da `punndigital/pun` → Settings → Secrets and variables → Actions:
  - Secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (cPanel'de robot için ayrı FTP hesabı, ana dizini `/home/punndigi`).
  - Variables (opsiyonel): `FTP_PROTOCOL` (varsayılan `ftps`, olmazsa `ftp`), `FTP_SERVER_DIR` (varsayılan `frontend/`), `NEXT_PUBLIC_SITE_URL`.
- Robot henüz GitHub'a gönderilmedi, hiç çalışmadı. İlk push'ta Actions sekmesinden izlenecek.
- `YAYIN-DURUMU.md` Zafer'de henüz commit edilmedi; README ona bağlantı veriyor, commit edilince senkronla ile taşınır.

### Yayın kapısı (SADECE Zafer.yayin, orijinal Zafer'de YOK)

- Dosya: `Zafer.yayin\src\components\sites\era\SiteGate.tsx`, `layout.tsx` içinde `<SiteGate />` olarak eklenir.
- Akış: ziyaretçi önce buğulu camı fareyle/parmakla siler (Ekado_V2 `fogglass.js` uyarlaması, Enter/Boşluk ile hızlı silme), ilerleme çubuğu, "Bravo!", sonra şifre kartı. Şifre `zafer2026` (`NEXT_PUBLIC_GATE_PASSWORD` ile değişir). Kartın altında Ekado logosu (ekado.ch bağlantısı). 3 dil: TR/EN/DE. Doğru şifre tarayıcıda hatırlanır (`localStorage zafer.gate`).
- UYARI: şifre tarayıcıda kontrol edilir, güvenlik değil "yakında" perdesidir.
- `senkronla.ps1` bu dosyayı korur ve `layout.tsx`'e `<SiteGate />` satırını her senkronda yeniden ekler.
- Yerelde denendi (2026-10-13): cam siliniyor, yanlış şifre hata veriyor, doğru şifre siteyi açıyor, tsc ve eslint temiz.
- Kapıyı kaldırmak için: `layout.tsx`'ten `<SiteGate />` ve import satırını sil, senkronla.ps1'deki "layout.tsx ... SiteGate" bloğunu çıkar.

### Bekleyen
- `punndigital/pun`'a push, `gh` oturumunun `workflow` izni olmadığı için reddedildi (2026-10-13). Çözüm: `! gh auth refresh -h github.com -s workflow` (tarayıcıda kod onayı). Zafer.yayin'de 2 commit hazır bekliyor (robot + kapı).

### Robot düzeltmeleri ve dersler (2026-10-13)

- **FTP-Deploy-Action bu sunucuda çalışmadı:** yeni açtığı klasöre girerken `550 Can't change directory`. Yerine `lftp` kullanılıyor (düz FTP, `mirror -R --no-perms --no-umask --parallel=3`, `node_modules` hariç, silme yok). FTPS bu sunucuda zorunlu tutulunca reddediliyor, düz `ftp` çalışıyor.
- **`--no-perms` şart:** lftp chmod deneyince sunucu 550 veriyor, yükleme yarıda kesiliyordu.
- **Disk kotası 1 GB:** dolunca `553 Disk quota exceeded`, yükleme yarım kalır, canlı site 500 verir (eski ve yeni dosyalar karışır). Büyük kalemler: `nodevenv` 719 MB, `.npm` önbelleği 160 MB (silindi), `buildtools-20261010` 59 MB, `frontend_eski` 34 MB. Silme sonrası kullanım ~864 MB. Paket büyütülmeli (guzel.net.tr > Paket Değiştir).
- **Hâlâ açık risk:** lftp mirror değişen dosyayı önce siler sonra yazar; yükleme sırasında site kısa süre yarım kalabilir. Çözüm fikri: geçici adla yükle sonra yer değiştir.
- **gh hesapları:** `Delixch` (workflow izni yok) ve `punndigital` (workflow izni var). `punndigital/pun`'a push için: `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin main` (punndigital hesabı aktif olmalı).
- **FTP hesabı:** `3f6fd74d@punndigital.com` ana hesap, kökü `/home/punndigi`. GitHub Secrets'a yazıldı (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD) ve değişken `FTP_PROTOCOL=ftp`. (Şifre bu dosyada yok, sohbette kullanıcı verdi; istenirse değiştirilip Secrets güncellenmeli.)
- **Müşteri README'si ve rehber:** `Zafer.yayin\README.md`, `docs\yayin\YAYIN-REHBERI.html/.pdf`, logolar. `senkronla.ps1` bunları korur.
- **Yayın akışı:** Zafer'de commit, `senkronla.ps1`, Zafer.yayin'de commit + push (`punndigital/pun`), robot 4-6 dk. `Delixch/zafer`'e push siteyi DEĞİŞTİRMEZ.

### Güvenli geçiş (2026-10-13, denendi)

- Robot artık canlıya doğrudan yazmaz. Sıra: (1) `frontend/_eski` ve `_yeni` temizlenir/açılır, (2) yeni sürüm `frontend/_yeni` içine yüklenir (site eski sürümle çalışır), (3) tamamen bitince `.next`, `public`, `server.js`, `package.json` yer değiştirir (yaklaşık 4 saniye), eski sürüm `_eski`'de kalır, `tmp/restart.txt` güncellenir, (4) sağlık kontrolü: `/?saglik=...` ve sayfadaki stil dosyası 200 vermeli (8 deneme, 10 sn arayla). Geçmezse eski sürüm otomatik geri konur ve robot kırmızı biter.
- Test 1 (normal yayın): başarılı, geçiş 4 sn, sağlık kontrolü ilk denemede geçti, yükleme boyunca site 200.
- Test 2 (Actions > Run workflow > `simulate_fail` işaretli): robot bilerek 404 gördü, 8 denemeden sonra eski sürüme döndü, site 200, tüm sayfalar açık. Geri alma çalışıyor.
- Sunucuda kalan test artığı: `frontend/_bad` (hatalı deneme, ~26 MB). Güvenle silinebilir. `_eski` yedek, `_yeni` geçici.
- Kota 3 GB'a çıkarıldı (kullanım ~880 MB).
- `pms.punndigital.com` (Vercel) hiçbir aşamada etkilenmez.
- Robotu elle denemek: Actions > "Siteyi yayınla (FTP)" > Run workflow (normal) ya da `simulate_fail` işaretli (geri alma testi).
