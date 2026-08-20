import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { LocaleController } from "@/components/LocaleController";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "./globals.css";
import "./velyo.css";

import { siteUrl } from "@/lib/site-metadata";
const email = process.env.NEXT_PUBLIC_EMAIL || "contact@velyo.pm";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Velyo Property Manager | Gestion locative à Genova",
    template: "%s | Velyo Property Manager",
  },
  description: "Gestion locative, accueil voyageurs, entretien et suivi propriétaire à Genova.",
  openGraph: {
    url: siteUrl,
    title: "Velyo Property Manager",
    description: "Votre bien, bien géré. Vos voyageurs, bien accueillis.",
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_GB"],
    images: [{
      url: "/og.png",
      width: 1730,
      height: 909,
      alt: "Velyo Property Manager à Genova",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velyo Property Manager",
    description: "Property management local à Genova.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/images/brand/velyo-mark.svg", type: "image/svg+xml" }],
    shortcut: "/images/brand/velyo-mark.svg",
    apple: "/images/brand/velyo-mark.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Velyo Property Manager",
        url: siteUrl,
        logo: `${siteUrl}/images/brand/velyo-logo-dark.svg`,
        email,
        description: "Gestione degli affitti brevi e property management a Genova.",
        areaServed: ["Genova", "Gênes", "Ligurie"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Velyo Property Manager",
        inLanguage: ["it", "en"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="it">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <LocaleController><SiteShell>{children}</SiteShell></LocaleController>
      </body>
    </html>
  );
}
