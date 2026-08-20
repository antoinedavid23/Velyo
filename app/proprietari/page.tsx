import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";
import { OwnerClarityJourney, OwnerPromiseJourney } from "@/components/InteractiveSections";
import { ConciergeRhythm } from "@/components/ConciergeRhythm";

export const metadata: Metadata = {
  title: "Gestion locative pour propriétaires à Genova",
  description: "Un interlocuteur local pour gérer les réservations, les voyageurs, les prestataires et le suivi du bien.",
  alternates: { canonical: "/proprietari" },
};

const ownerRelief = [
  "Le quotidien est pris en charge",
  "Chaque intervenant suit le même cadre",
  "Votre accord reste la règle",
];

const tailoredOrganisation = [
  ["01", "Ce que nous gérons", "Réservations, voyageurs, préparation du bien et interventions : le périmètre est posé clairement."],
  ["02", "Ce que vous gardez", "Vos périodes, votre budget et les décisions qui demandent toujours votre accord."],
  ["03", "Comment nous agissons", "Les rôles, les contacts et la marche à suivre sont définis avant le premier séjour."],
  ["04", "Ce que vous recevez", "Des nouvelles au rythme choisi, avec les faits utiles et les décisions à prendre."],
];

export default function Page() {
  return <>
    <PageHero label="Pour les propriétaires" title="Accompagnement" text="Découvrez comment Velyo organise, exploite et suit votre bien au quotidien." image="/images/concierge/owner-conversation-premium.png" />
    <section className="section ivory owner-intro"><div className="container watermark-heading owner-page-watermark"><p className="section-watermark">CONFIANCE</p>
      <div className="owner-intro-editorial"><div><p className="eyebrow dark">La confiance se construit</p><h2><span>Vous voyez comment</span><em>tout est géré.</em></h2></div><div className="owner-intro-statement"><p>De la mise en location au soin du bien, puis au suivi administratif et comptable, chaque étape vous montre ce que Velyo fait et ce que vous recevez.</p><Link className="text-link" href="/valutazione">Parler de mon bien <ArrowRight size={16} /></Link></div></div>
      <OwnerPromiseJourney />
    </div></section>
    <section className="section owner-comparison"><div className="container watermark-heading owner-page-watermark"><p className="section-watermark">CADRE</p>
      <div className="owner-tailored-heading"><div><p className="eyebrow">Votre plan de gestion</p><h2>Vos règles deviennent notre feuille de route.</h2></div><p>Avant le premier séjour, nous décidons ensemble ce que Velyo gère, ce qui demande votre accord et comment vous souhaitez être informé.</p></div>
      <div className="owner-tailored-composition">
        <article className="owner-tailored-plan">
          <div className="owner-tailored-plan-intro">
            <div className="owner-tailored-plan-copy"><h3>Tout le monde sait comment avancer.</h3><p>Le fonctionnement est défini une fois, puis appliqué au quotidien. Velyo peut agir rapidement sans vous demander de reconstruire les règles à chaque situation.</p></div>
          </div>
          <div className="owner-tailored-scope"><div className="owner-tailored-details">{tailoredOrganisation.map(([number, label, text]) => <div key={number}><span>{number}</span><div><strong>{label}</strong><p>{text}</p></div></div>)}</div></div>
        </article>
        <aside className="owner-tailored-relief"><div className="owner-tailored-relief-heading"><h3>Nous gérons.<br/><em>Vous décidez.</em></h3><p>Le cadre posé ensemble permet à Velyo d’agir sans vous solliciter pour chaque détail.</p></div><ol>{ownerRelief.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></aside>
      </div>
    </div></section>
    <section className="section ivory owner-management concierge-offer-section"><div className="container watermark-heading owner-page-watermark"><p className="section-watermark">SÉJOURS</p>
      <div className="owner-management-heading"><p className="eyebrow dark">Le cycle de chaque location</p><h2>Chaque séjour prépare déjà le suivant.</h2><p>Nous préparons le bien, gérons le séjour et le remettons à niveau avant l’arrivée suivante.</p></div>
      <ConciergeRhythm />
    </div></section>
    <section className="owner-transparency"><div className="container"><OwnerClarityJourney /></div></section>
  </>;
}
