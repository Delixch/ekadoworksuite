/**
 * Sitenin tam adresi (önizleme kartları, sitemap, robots için).
 * Alan adı bağlanınca Vercel'de NEXT_PUBLIC_SITE_URL = https://alanadi.com yazılırsa her yer ona döner.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
