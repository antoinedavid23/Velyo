import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { ValuationForm } from "@/components/ValuationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confier votre bien",
  description: "Présentez votre bien, votre organisation actuelle et ce que vous souhaitez confier à Velyo.",
  alternates: { canonical: "/valutazione" },
};

const points = [
  ["01", "Le bien", "Son adresse, sa capacité, son état et ses contraintes pratiques."],
  ["02", "La location actuelle", "Votre prix, votre disponibilité et la façon dont elle est gérée aujourd’hui."],
  ["03", "Ce que vous voulez déléguer", "Les tâches que Velyo devra reprendre et les décisions que vous souhaitez garder."],
];

const nextSteps = [
  ["01", "Nous étudions le bien", "Une personne vérifie les informations transmises et prépare les premières questions utiles."],
  ["02", "Nous vous appelons", "Nous précisons ce que vous louez, ce que vous gérez encore et ce que vous attendez de Velyo."],
  ["03", "Nous visitons sur place", "La visite permet de confirmer le fonctionnement, les services nécessaires et la proposition de gestion."],
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Votre projet"
        title="Confier mon bien"
        text="Dites-nous ce que vous louez, comment vous le gérez aujourd’hui et ce que vous souhaitez déléguer."
        image="/images/concierge/owner-conversation-premium.png"
      />

      <div className="valuation-page">
        <section className="valuation-opening">
          <div className="container valuation-opening-grid">
            <div>
              <p className="eyebrow">Une première lecture</p>
              <h2>Parlons du bien et du quotidien.</h2>
            </div>
            <p className="valuation-opening-copy">Quelques informations suffisent pour comprendre le bien, votre situation actuelle et le relais dont vous avez besoin.</p>
          </div>
        </section>

        <section className="valuation-workspace">
          <div className="container valuation-experience">
            <aside className="valuation-aside" aria-label="Ce que Velyo cherche à comprendre">
              <div className="valuation-aside-image">
                <Image src="/images/concierge/home-preparation-premium.png" alt="Préparation attentive d’un bien à Genova" fill sizes="(max-width: 960px) 100vw, 38vw" />
                <p>Bien connu.<br /><em>Bien suivi.</em></p>
              </div>
              <div className="valuation-aside-content">
                <p className="eyebrow">Ce que nous regardons</p>
                <ol>{points.map(([number, title, text]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>
                <p className="valuation-reassurance"><span>Réponse personnelle</span><span>Échange confidentiel</span><span>Aucun engagement</span></p>
              </div>
            </aside>

            <div className="valuation-form-shell">
              <ValuationForm />
              <p className="form-privacy">Vos informations restent confidentielles. Consultez notre <Link href="/privacy">politique de confidentialité</Link>.</p>
            </div>
          </div>
        </section>

        <section className="valuation-next">
          <div className="container">
            <div className="valuation-next-heading">
              <p className="eyebrow">Après votre envoi</p>
              <h2>Un premier échange<br /><em>prépare la visite du bien.</em></h2>
              <p>Nous revenons vers vous avec les bonnes questions, puis nous visitons le bien avant toute proposition.</p>
            </div>
            <ol className="valuation-next-steps">{nextSteps.map(([number, title, text]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></li>)}</ol>
          </div>
        </section>
      </div>
    </>
  );
}
