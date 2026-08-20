import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velyo.pm";

export function pageMetadata({ title, description, path, image = "/og.png" }: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const canonical = new URL(path, siteUrl).toString();
  const socialImage = new URL(image, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: "fr_FR",
      siteName: "Velyo Property Manager",
      images: [{ url: socialImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
