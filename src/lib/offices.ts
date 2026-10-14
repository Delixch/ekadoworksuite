/** Ofis ve iletişim bilgileri: ana sayfadaki İletişim bölümü buradan okur. */
export const contactInfo = {
  email: "info@ekado.ch",
  phone: "",
  mobile: "",
};

export const offices = [
  {
    id: "ch",
    address: "Langstrasse 120, 8055 Zürich, Switzerland",
    phone: "",
    mapQuery: "Langstrasse 120, 8055 Zürich, Switzerland",
  },
] as const;

export const mapsUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const telHref = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
