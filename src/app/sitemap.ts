import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages = ["", "/test-et", "/teknolojimiz", "/musterilerimiz", "/blog", "/impressum", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${siteUrl}${p}`, lastModified: new Date(), priority: p === "" ? 1 : 0.6 }));
}
