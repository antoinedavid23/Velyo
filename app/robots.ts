import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-metadata";
import { commercialLaunchReady } from "@/lib/legal";

export default function robots(): MetadataRoute.Robots {
  const blockIncompleteProduction = process.env.NODE_ENV === "production" && !commercialLaunchReady;
  return {
    rules: blockIncompleteProduction
      ? { userAgent: "*", disallow: "/" }
      : {
          userAgent: "*",
          allow: "/",
          disallow: ["/administration", "/connexion", "/api/", "/grazie"],
        },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
