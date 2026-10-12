/** Ofis ve iletişim bilgileri: ana sayfadaki İletişim bölümü buradan okur. */
export const contactInfo = {
  email: "info@punndigital.com",
  phone: "+90 232 218 25 59",
  mobile: "+90 533 401 90 35",
};

export const offices = [
  {
    id: "hq",
    address: "Folkart Towers A Kule K:26 D:2601, Bayraklı, İzmir, Türkiye",
    phone: "+90 232 218 25 59",
    mapQuery: "Folkart Towers A Kule Bayraklı İzmir",
  },
  {
    id: "ch",
    address: "Kernstrasse 67, 8004 Zürich, Switzerland",
    phone: "+41 442 911 188",
    mapQuery: "Kernstrasse 67, 8004 Zürich, Switzerland",
  },
] as const;

export const mapsUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const telHref = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
