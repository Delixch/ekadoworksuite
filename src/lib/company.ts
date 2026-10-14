/**
 * FİRMA BİLGİLERİ: Impressum (Künye) ve Datenschutz (Gizlilik) sayfaları buradan okur.
 * Müşteri yalnızca bu dosyadaki tırnak içlerini doldurur; sayfaları değiştirmesi gerekmez.
 * Boş bırakılan alan sayfada sarı "[… girilmeli]" etiketiyle görünür, yani eksik olduğu fark edilir.
 * Kullanmadığın alanı (örn. ticaret sicili yoksa) silme, boş bırak: etiket yine görünür; satırı kaldırmak için ilgili
 * alanı "-" yapabilirsin, "-" yazılan alan sayfada hiç gösterilmez.
 */
export const company = {
  /** Firma unvanı */
  name: "EKADO GmbH",
  /** Cadde ve numara */
  street: "Langstrasse 120",
  /** Posta kodu ve şehir, örn. "34000 İstanbul" */
  city: "8055 Zürich",
  /** Ülke, örn. "Türkiye" */
  country: "Schweiz",
  /** Yetkili kişi (müdür / sahibi) */
  representative: "Adnan Aydin",
  email: "info@ekado.ch",
  phone: "",
  website: "https://www.ekado.ch",
  /** Vergi dairesi ve numarası (TR) ya da USt-IdNr. (DE/CH) */
  taxId: "",
  /** Ticaret sicil no ve sicil müdürlüğü / MERSİS no */
  registerNo: "",
  /** Gizlilik taleplerinin gideceği adres (boşsa email kullanılır) */
  privacyEmail: "",
};

export type CompanyKey = keyof typeof company;
