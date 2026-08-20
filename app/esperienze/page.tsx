import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services voyageurs à Genova",
  description: "Transferts, bien-être, guides, courses et réservations organisés pour les voyageurs avant et pendant leur séjour à Genova.",
  alternates: { canonical: "/esperienze" },
};

const experienceFamilies = [
  { number: "01", title: "Arrivées et déplacements", text: "Tout ce qui facilite l’arrivée, le départ et les mouvements pendant le séjour.", image: "/images/concierge/genova-blue-hour-premium.png" },
  { number: "02", title: "Confort du séjour", text: "Des attentions pratiques ou de bien-être, préparées selon les besoins réels des voyageurs.", image: "/images/concierge/home-preparation-premium.png" },
  { number: "03", title: "Moments particuliers", text: "Une préparation personnalisée pour célébrer une occasion ou créer une arrivée différente.", image: "/images/concierge/boccadasse-aperitivo-premium.jpg" },
  { number: "04", title: "Découvrir Genova", text: "Des idées, des visites et des expériences locales adaptées au rythme du séjour.", image: "/images/concierge/rolli-walk-premium.jpg" },
];

export default function Page() {
  return <>
    <PageHero label="À réserver avec Velyo" title="Services voyageurs" text="Transport, bien-être, visites et courses : des services utiles, organisés à la demande." image="/images/concierge/old-town-family-premium.png" />

    <section className="section experience-catalog-section"><div className="container">
      <div className="catalog-intro experience-owner-intro watermark-heading"><p className="eyebrow section-watermark">Expériences</p><div><h2>Une demande.<br/>Une réponse adaptée.</h2></div><p>Velyo organise des services autour du séjour sans enfermer les voyageurs dans un catalogue. Le besoin est précisé, puis une proposition claire est présentée avant toute réservation.</p></div>
      <div className="experience-family-grid">{experienceFamilies.map((family) => <article className="experience-family-card" key={family.number}>
        <div className="experience-family-image"><Image src={family.image} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="experience-family-copy"><span>{family.number}</span><h3>{family.title}</h3><p>{family.text}</p><Link href="/valutazione">Parler d’un besoin <ArrowRight size={16}/></Link></div>
      </article>)}</div>
      <p className="demo-note">Les horaires, prix et disponibilités des partenaires doivent toujours être confirmés avant la réservation.</p>
    </div></section>

  </>;
}
