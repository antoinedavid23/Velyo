import type { MetadataRoute } from "next";
import { services } from "@/data/content";
import { experienceCategories } from "@/data/experience-categories";
import { siteUrl } from "@/lib/site-metadata";
import { getDb } from "@/db";
import { managedProperties } from "@/db/schema";
import { eq } from "drizzle-orm";

const updated = new Date("2026-08-21T00:00:00+02:00");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const core: MetadataRoute.Sitemap = [
    ["/", 1],
    ["/servizi", .95],
    ["/proprietari", .95],
    ["/valutazione", .9],
    ["/simulatore", .85],
    ["/esperienze", .8],
    ["/chi-siamo", .75],
    ["/contatti", .8],
    ["/faq", .7],
  ].map(([path, priority]) => ({
    url: new URL(String(path), siteUrl).toString(),
    lastModified: updated,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: Number(priority),
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: new URL(`/servizi/${service.slug}`, siteUrl).toString(),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: .78,
  }));

  const experienceEntries: MetadataRoute.Sitemap = experienceCategories.map((category) => ({
    url: new URL(`/esperienze/${category.slug}`, siteUrl).toString(),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: .62,
  }));

  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const db = await getDb();
    const published = await db.select({ slug: managedProperties.slug, updatedAt: managedProperties.updatedAt }).from(managedProperties).where(eq(managedProperties.status, "published"));
    if (published.length) {
      propertyEntries = [
        { url: new URL("/proprieta", siteUrl).toString(), lastModified: updated, changeFrequency: "weekly", priority: .72 },
        ...published.map((property) => ({
          url: new URL(`/proprieta/${property.slug}`, siteUrl).toString(),
          lastModified: property.updatedAt || updated,
          changeFrequency: "weekly" as const,
          priority: .68,
        })),
      ];
    }
  } catch {
    propertyEntries = [];
  }

  const legal: MetadataRoute.Sitemap = ["/mentions-legales", "/privacy", "/cookie-policy", "/termini"].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: updated,
    changeFrequency: "yearly",
    priority: .2,
  }));

  return [...core, ...serviceEntries, ...experienceEntries, ...propertyEntries, ...legal];
}
