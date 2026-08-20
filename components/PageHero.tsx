import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHero({ label, title, text, image }: { label: string; title: string; text: string; image?: string }) {
  return (
    <section className={`page-hero velyo-page-hero ${image ? "page-hero-image" : "page-hero-no-image"}`}>
      {image && <Image className={`velyo-page-hero-background${image.includes("genova-blue-hour-premium") ? " velyo-page-hero-background-city" : ""}`} src={image} fill priority sizes="100vw" alt={`${label} — ${title}`} />}
      <div className="velyo-page-hero-overlay" aria-hidden="true" />
      <div className="container velyo-page-hero-layout">
        <div className={`velyo-page-hero-copy${title.trim().startsWith("A") ? " title-starts-a" : ""}`}>
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="site-footer-cta" aria-label="Présenter votre bien à Velyo">
      <div className="container site-footer-cta-inner">
        <div className="site-footer-cta-copy">
          <p>Votre bien à Genova</p>
          <h2>Voyons comment le gérer.</h2>
          <span>Présentez-nous le bien et ce que vous souhaitez déléguer. Nous vous répondons avec une première orientation claire.</span>
        </div>
        <Link className="site-footer-cta-button" href="/valutazione">Parler de mon bien <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
