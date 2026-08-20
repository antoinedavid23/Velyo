import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceJourney, type ServiceJourneyStep } from "@/components/ServiceJourney";
import { experiences } from "@/data/content";
import { pageMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  return experience ? pageMetadata({ title: experience.title, description: experience.short, path: `/esperienze/${slug}`, image: experience.image }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();
  const travelerDeliverables = [
    ...experience.details,
    "Demande précisée selon le séjour",
    "Prestataire adapté recherché",
    "Disponibilité réellement vérifiée",
    "Prix et conditions présentés avant accord",
    "Réservation confirmée par Velyo",
    "Informations pratiques réunies",
    "Prestataire reconfirmé avant le service",
    "Suivi assuré jusqu’à la réalisation",
    "Alternative recherchée en cas d’imprévu",
  ];
  const steps: ServiceJourneyStep[] = [
    { title: "Comprendre la demande", timing: "01 · Le besoin", text: "Nous précisons le nombre de personnes, le moment souhaité, le lieu, les préférences et les contraintes utiles.", points: ["Besoin reformulé", "Créneau défini", "Budget précisé"] },
    { title: "Chercher le bon prestataire", timing: "02 · La sélection", text: "Velyo recherche une personne adaptée au service demandé et au niveau d’attention attendu.", points: ["Prestataire identifié", "Références cohérentes", "Solution adaptée"] },
    { title: "Vérifier la faisabilité", timing: "03 · La vérification", text: "La disponibilité, le tarif, le lieu d’intervention et les conditions sont confirmés directement.", points: ["Disponibilité réelle", "Prix confirmé", "Conditions vérifiées"] },
    { title: "Présenter une proposition claire", timing: "04 · Votre accord", text: "Le voyageur reçoit une proposition lisible avant toute réservation ou dépense.", points: ["Service détaillé", "Coût annoncé", "Accord explicite"] },
    { title: "Réserver et tout confirmer", timing: "05 · La réservation", text: "Après validation, Velyo réserve le service et réunit les confirmations utiles au même endroit.", points: ["Créneau réservé", "Coordonnées réunies", "Confirmation envoyée"] },
    { title: "Préparer la réalisation", timing: "06 · L’organisation", text: "Nous transmettons les accès, l’adresse, les horaires et les informations dont le prestataire et le voyageur ont besoin.", points: ["Informations transmises", "Accès organisés", "Prestataire reconfirmé"] },
    { title: "Suivre jusqu’au bout", timing: "07 · Le service", text: "Velyo reste le point de contact jusqu’à la réalisation et recherche une alternative si un imprévu survient.", points: ["Suivi assuré", "Imprévu traité", "Alternative recherchée"] },
  ];
  return <>
    <PageHero label={experience.format} title={experience.cardTitle ?? experience.title} text={experience.short} image={experience.image} />
    <section className="detail-page-opening"><div className="container detail-opening-grid"><div className="detail-opening-copy"><p className="eyebrow">{experience.format}</p><h2>Chaque demande reçoit une réponse organisée.</h2><p>{experience.short}</p></div><div className="detail-impact-strip">{experience.details.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>)}</div></div></section>
    <section className="detail-process-section"><div className="container detail-process-heading"><div className="detail-process-title"><p className="eyebrow">Notre méthode</p><h2>De la demande<br/><em>au service réalisé.</em></h2></div><div className="detail-process-intro"><span aria-hidden="true">01—07</span><p>Sept étapes rendent la prestation simple : Velyo précise le besoin, sélectionne, vérifie, fait valider, réserve, organise puis suit sa réalisation.</p></div></div><ServiceJourney steps={steps} label="Étapes de réservation" /></section>
    <section className="detail-scope-section"><div className="container detail-scope-grid"><div><p className="eyebrow">La prise en charge</p><h2>Velyo coordonne chaque détail utile.</h2><p className="detail-section-intro">De la première demande au service terminé, les recherches, confirmations et échanges restent réunis auprès d’un même interlocuteur.</p><div className="detail-scope-list">{travelerDeliverables.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div></div><aside className="detail-value-panel"><p className="eyebrow">Pour le voyageur</p><h3>{experience.moment}</h3><ul><li><Check size={16}/>{experience.format}</li><li><Check size={16}/>Prix confirmé avant réservation</li><li><Check size={16}/>Une seule personne à contacter</li><li><Check size={16}/>Suivi jusqu’à la réalisation</li></ul></aside></div></section>
    <section className="detail-clarity-section"><div className="container detail-clarity-grid"><div><p className="eyebrow">Une option transparente</p><h2>Le voyageur choisit pendant que Velyo coordonne.</h2><p>Le service reste distinct du séjour : son prix, ses conditions et sa disponibilité sont confirmés avant accord.</p></div><div className="detail-rules"><div><span>Avant réservation</span><strong>Prix et disponibilité vérifiés avant la réservation</strong></div><div><span>Paiement</span><strong>Paiement séparé lorsque la prestation est payante</strong></div><div><span>Si indisponible</span><strong>Alternative proposée si le premier choix n’est plus disponible</strong></div><div><span>Pour le bien</span><strong>{experience.ownerValue}</strong></div></div></div></section>
  </>;
}
