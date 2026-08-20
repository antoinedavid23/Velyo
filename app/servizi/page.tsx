import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/Cards";
import { services } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services de conciergerie à Genova",
  description: "Gestion, accueil, préparation du logement, maintenance et services voyageurs commercialisés avec clarté à Genova.",
  alternates: { canonical: "/servizi" },
};

const offers = [
  {
    number: "01",
    label: "Pour un logement",
    title: "Gestion complète",
    rate: "25 % TTC",
    rateNote: "des revenus locatifs encaissés, hors ménage et dépenses externes",
    promise: "Velyo met le bien en location, suit les réservations et coordonne les séjours de bout en bout.",
    groups: [
      { title: "Lancement inclus", items: ["Audit du bien et de son positionnement", "Création ou optimisation de l’annonce", "Plan tarifaire de lancement", "Conseils de présentation et d’équipement", "Livret d’accueil numérique personnalisé", "Recommandations pour les photos"] },
      { title: "Gestion quotidienne incluse", items: ["Réservations et calendrier suivis", "Communication voyageurs 7j/7", "Tarifs et durée des séjours ajustés", "Arrivées et départs organisés", "Ménage et linge coordonnés", "Incidents suivis jusqu’à leur résolution", "Performances analysées et compte rendu"] },
    ],
    traveler: "Chez Velyo, nous pensons qu’une valeur créée autour de votre bien doit aussi vous revenir. Lorsqu’un voyageur choisit une option que nous avons sélectionnée et coordonnée, 25 % du bénéfice net vous est reversé. Ce fonctionnement nous paraît simplement plus juste : le prix, le coût du prestataire et la répartition restent toujours visibles.",
    separate: "Ménage, linge, consommables et interventions techniques sont facturés au réel, séparément, sans marge Velyo.",
    cta: "Découvrir la gestion complète",
    href: "/valutazione",
  },
  {
    number: "02",
    label: "Pour plusieurs biens ou un besoin particulier",
    title: "Gestion sur mesure",
    rate: "Sur devis",
    rateNote: "un cadre adapté à votre organisation",
    promise: "Une organisation construite bien par bien pour centraliser plusieurs locations ou intégrer des services voyageurs.",
    groups: [
      { title: "Gestion multi-biens", items: ["Tous les services de la gestion complète", "Mise en place adaptée à chaque bien", "Conditions contractuelles multi-biens", "Pilotage centralisé du portefeuille"] },
      { title: "Organisation personnalisée", items: ["Services additionnels intégrés à la réservation", "Expériences voyageurs sélectionnées", "Organisation opérationnelle sur mesure", "Reporting consolidé"] },
    ],
    traveler: "La proposition précise, bien par bien, le niveau de présence, les services inclus, les validations nécessaires et les conditions de rémunération.",
    separate: "Les dépenses opérationnelles et les prestations externes restent détaillées séparément dans la proposition.",
    cta: "Parler de mon projet",
    href: "/valutazione",
  },
];

export default function Page() {
  return <>
    <PageHero label="Ce que Velyo prend en charge" title="Services" text="De la réservation au départ, découvrez précisément ce que nous gérons pour votre bien." image="/images/concierge/home-preparation-premium.png" />

    <section className="section service-catalog-section"><div className="container">
      <div className="catalog-intro catalog-intro-editorial watermark-heading">
        <p className="eyebrow section-watermark">Services</p>
        <div><h2>Huit services.<br /><em>Tout est suivi.</em></h2></div>
        <div className="catalog-intro-note"><span>Un interlocuteur pour tout le bien</span><p>Chaque carte indique l’action menée, ce qu’elle comprend et ce qu’elle évite au propriétaire.</p></div>
      </div>
      <div className="service-catalog-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
    </div></section>

    <section className="section management-offers-section" id="offres"><div className="container">
      <div className="management-offers-heading"><div className="watermark-heading"><p className="eyebrow section-watermark">Offres</p><p className="eyebrow">Nos offres de gestion</p><h2>Deux offres adaptent<br /><em>le même cadre à votre bien.</em></h2></div><p>La gestion complète couvre toute l’exploitation d’un bien. Le sur-mesure adapte la même méthode à plusieurs biens ou à une organisation particulière.</p></div>
      <div className="management-offers">{offers.map((offer) => <article className="management-offer" key={offer.number}>
        <div className="management-offer-top"><span>{offer.number}</span><small>{offer.label}</small></div>
        <h3>{offer.title}</h3>
        <div className="management-offer-rate"><strong>{offer.rate}</strong><small>{offer.rateNote}</small></div>
        <p>{offer.promise}</p>
        <div className="management-offer-groups">{offer.groups.map((group) => <div className="management-offer-group" key={group.title}>
          <h4>{group.title}</h4>
          <ul>{group.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
        </div>)}</div>
        <div className="management-offer-traveler"><span>{offer.number === "01" ? "Une valeur partagée, simplement" : "Cadre personnalisé"}</span><p>{offer.traveler}</p></div>
        <div className="management-offer-separate"><span>Facturation séparée</span><p>{offer.separate}</p></div>
        <div className="management-offer-footer"><Link className="button management-offer-cta" href={offer.href}>{offer.cta} <ArrowRight size={17} /></Link></div>
      </article>)}</div>
    </div></section>

  </>;
}
