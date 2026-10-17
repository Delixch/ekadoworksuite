import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages = ["", "/schnell-demo", "/moduler", "/musterilerimiz", "/support", "/modul/uebersicht-betrieb", "/modul/einkauf", "/modul/personal", "/modul/finanzen", "/impressum", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${siteUrl}${p}`, lastModified: new Date(), priority: p === "" ? 1 : 0.6 }));
}
