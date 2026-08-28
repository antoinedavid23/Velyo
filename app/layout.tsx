import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { LocaleController } from "@/components/LocaleController";
import { ItalianContent } from "@/components/ItalianContent";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "./globals.css";
import "./velyo.css";
import "./velyo-headings.css";
import "./velyo-mobile.css";

import { siteUrl } from "@/lib/site-metadata";
import { commercialLaunchReady } from "@/lib/legal";
const email = process.env.NEXT_PUBLIC_EMAIL || "contatto@velyo.com";
const allowPublicIndexing = process.env.NODE_ENV !== "production" || commercialLaunchReady;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gestione affitti brevi a Genova | Velyo Property Manager",
    template: "%s | Velyo Property Manager",
  },
  description: "Gestione completa di affitti brevi e case vacanza a Genova: annunci, tariffe, ospiti, pulizie, manutenzione e report proprietario.",
  applicationName: "Velyo Property Manager",
  category: "property management",
  robots: {
    index: allowPublicIndexing,
    follow: allowPublicIndexing,
    googleBot: { index: allowPublicIndexing, follow: allowPublicIndexing, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    url: siteUrl,
    siteName: "Velyo Property Manager",
    title: "Gestione affitti brevi a Genova | Velyo",
    description: "Un unico referente a Genova per gestire il Suo immobile, assistere gli ospiti e proteggere ogni soggiorno.",
    type: "website",
    locale: "it_IT",
    images: [{
      url: "/og.png",
      width: 1730,
      height: 909,
      alt: "Velyo Property Manager a Genova",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velyo Property Manager",
    description: "Gestione locale di affitti brevi e case vacanza a Genova.",
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
        description: "Gestione completa di affitti brevi, case vacanza e proprietà a Genova.",
        areaServed: { "@type": "City", name: "Genova" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email,
          availableLanguage: ["it", "fr", "en"],
        },
        knowsAbout: ["Gestione affitti brevi", "Property management", "Accoglienza ospiti", "Revenue management", "Manutenzione immobiliare"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Velyo Property Manager",
        inLanguage: "it-IT",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="it">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <LocaleController><SiteShell><ItalianContent>{children}</ItalianContent></SiteShell></LocaleController>
      </body>
    </html>
  );
}
