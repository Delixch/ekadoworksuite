/**
 * FİRMA BİLGİLERİ: Impressum (Künye) ve Datenschutz (Gizlilik) sayfaları buradan okur.
 * Müşteri yalnızca bu dosyadaki tırnak içlerini doldurur; sayfaları değiştirmesi gerekmez.
 * Boş bırakılan alan sayfada sarı "[… girilmeli]" etiketiyle görünür, yani eksik olduğu fark edilir.
 * Kullanmadığın alanı (örn. ticaret sicili yoksa) silme, boş bırak: etiket yine görünür; satırı kaldırmak için ilgili
 * alanı "-" yapabilirsin, "-" yazılan alan sayfada hiç gösterilmez.
 */
export const company = {
  /** Firma unvanı, örn. "Punn Digital Ltd. Şti." */
  name: "",
  /** Cadde ve numara */
  street: "",
  /** Posta kodu ve şehir, örn. "34000 İstanbul" */
  city: "",
  /** Ülke, örn. "Türkiye" */
  country: "",
  /** Yetkili kişi (müdür / sahibi) */
  representative: "",
  email: "info@punndigital.com",
  phone: "+90 533 401 90 35",
  website: "https://punndigital.com",
  /** Vergi dairesi ve numarası (TR) ya da USt-IdNr. (DE/CH) */
  taxId: "",
  /** Ticaret sicil no ve sicil müdürlüğü / MERSİS no */
  registerNo: "",
  /** Gizlilik taleplerinin gideceği adres (boşsa email kullanılır) */
  privacyEmail: "",
};

export type CompanyKey = keyof typeof company;
