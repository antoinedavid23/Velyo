import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { services } from "@/data/content";
import { ServiceCard } from "@/components/Cards";
import { MethodJourney, ReviewCards } from "@/components/InteractiveSections";
import { Reveal } from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conciergerie locale et gestion locative à Genova",
  description: "Velyo prend soin de votre bien, accueille vos voyageurs et coordonne chaque détail à Genova.",
  alternates: { canonical: "/" },
};

const essentialServices = services.filter(({ slug }) =>
  ["gestione-proprieta", "accoglienza-voyageurs", "pulizie-biancheria"].includes(slug),
);

export default function Home() {
  return (
    <>
      <section className="home-velyo-hero hero-velyo">
        <Image className="velyo-hero-image" src="/images/concierge/genova-blue-hour-premium.png" fill priority sizes="100vw" alt="Genova entre façades historiques et mer à l’heure bleue" />
        <div className="velyo-hero-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <Reveal className="velyo-hero-brand" eager>
            <p className="hero-kicker">À Genova, sur place.</p>
            <h1>Votre bien reste<br /><em>bien entouré.</em></h1>
            <p className="hero-slogan">Velyo prépare le bien, gère les voyageurs et remet tout en ordre après chaque séjour.</p>
            <div className="actions">
              <Link className="button" href="/valutazione">Parler de mon bien <ArrowRight size={16} /></Link>
              <Link className="button ghost" href="/proprietari">Comment nous gérons</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="velyo-trust-strip" aria-label="Les engagements Velyo">
        <div className="container trust-cards">
          <article data-index="01"><ShieldCheck /><div><strong>Bien suivi sur place</strong><span>Avant, pendant et après chaque séjour.</span></div></article>
          <article data-index="02"><Clock3 /><div><strong>Imprévus pris en charge</strong><span>La situation avance sans vous laisser relancer.</span></div></article>
          <article data-index="03"><Headphones /><div><strong>Voyageurs accompagnés</strong><span>Ils savent toujours qui contacter sur place.</span></div></article>
          <article data-index="04"><Sparkles /><div><strong>Suivi propriétaire clair</strong><span>Vous recevez les faits utiles et gardez les décisions.</span></div></article>
        </div>
      </section>

      <section className="section ivory owner-welcome">
        <div className="container split">
          <Reveal className="editorial-card velyo-owner-visual">
            <Image src="/images/concierge/owner-conversation-premium.png" fill sizes="(max-width: 800px) 100vw, 44vw" alt="Une propriétaire échange simplement avec son interlocutrice Velyo" />
          </Reveal>
          <Reveal className="prose velyo-owner-copy watermark-heading">
            <p className="eyebrow dark section-watermark">Relais</p>
            <h2>Nous gérons la location<br /><em>pendant que vous gardez les décisions.</em></h2>
            <p>Une même personne connaît le bien, suit les réservations et coordonne chaque séjour. Vous êtes sollicité uniquement lorsqu’une décision vous appartient.</p>
            <div className="owner-attention-grid" aria-label="Ce que Velyo prend en charge">
              <article><span>01</span><strong>Un seul interlocuteur</strong><p>Votre bien est connu et les échanges restent suivis.</p></article>
              <article><span>02</span><strong>Chaque séjour préparé</strong><p>Accès, ménage, linge et informations sont vérifiés.</p></article>
              <article><span>03</span><strong>Les imprévus avancent</strong><p>Le besoin est identifié et la bonne personne est contactée.</p></article>
              <article><span>04</span><strong>Des nouvelles utiles</strong><p>Vous êtes informé au moment où votre avis compte.</p></article>
            </div>
            <Link className="text-link" href="/proprietari">Voir comment nous vous accompagnons <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section home-services">
        <div className="container">
          <Reveal className="watermark-heading"><p className="eyebrow section-watermark">Services</p><h2>Chaque séjour reçoit<br /><em>le même niveau de soin.</em></h2><p className="section-intro">Réservations, arrivées, voyageurs, ménage et imprévus sont suivis par Velyo.</p></Reveal>
          <div className="card-grid three mobile-two-grid">{essentialServices.map((service) => <ServiceCard key={service.slug} service={service} variant="home" />)}</div>
          <Link className="button services-all-button" href="/servizi">Voir tous les services <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="section ivory velyo-simulator-teaser">
        <div className="container simulator-editorial-layout">
          <Reveal className="prose simulator-scan-copy watermark-heading">
            <p className="eyebrow dark section-watermark">Estimation</p>
            <h2 className="simulator-teaser-title"><span>Que peut rapporter</span><span>votre bien&nbsp;?</span></h2>
            <p>Estimez le revenu brut possible à partir de votre prix actuel, de votre disponibilité et du profil du bien.</p>
            <Link className="button simulator-scan-button" href="/simulatore">Estimer mes revenus locatifs <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal className="simulator-editorial-card"><Image src="/images/concierge/family-apartment-premium.png" fill sizes="(max-width: 800px) 100vw, 48vw" alt="Appartement lumineux prêt à recevoir des voyageurs" /><div><span>Une estimation adaptée à votre bien.</span><small>Simple, indicative et sans engagement.</small></div></Reveal>
        </div>
      </section>

      <section className="section home-gallery">
        <div className="container">
          <Reveal className="experience-intro watermark-heading"><p className="eyebrow section-watermark">Séjours</p><h2>Chaque séjour prépare<br /><em>déjà le suivant.</em></h2><p className="experience-intro-note">Le bien est préparé, les voyageurs accompagnés, puis tout est contrôlé et remis en état pour la réservation suivante.</p></Reveal>
          <div className="experience-mosaic velyo-experience-mosaic">
            <div className="visual experience-visual experience-visual-main journey-preparation" style={{ backgroundImage: "linear-gradient(180deg,rgba(13,31,53,.02),rgba(13,31,53,.66)),url(/images/concierge/home-preparation-premium.png)" }}><span><b>01</b><i>Le bien est prêt avant l’arrivée<small>Ménage vérifié, linge installé et essentiels réassortis.</small></i></span></div>
            <Reveal className="experience-text experience-text-light"><p className="eyebrow dark">Votre relais à Genova</p><h3>Une personne connaît le bien.</h3><p>Elle connaît les accès, vos consignes et les habitudes du lieu.</p></Reveal>
            <Reveal className="experience-text experience-text-dark"><p className="eyebrow">Pendant le séjour</p><h3>Les voyageurs savent qui appeler.</h3><p>Pour une question ou un imprévu, ils contactent Velyo directement.</p></Reveal>
            <div className="visual experience-visual journey-maintenance" style={{ backgroundImage: "linear-gradient(180deg,rgba(13,31,53,.02),rgba(13,31,53,.66)),url(/images/concierge/maintenance-premium.png)" }}><span><b>02</b><i>Chaque problème trouve un responsable<small>Besoin identifié, intervenant contacté et réparation suivie.</small></i></span></div>
            <div className="visual experience-visual journey-welcome" style={{ backgroundImage: "linear-gradient(180deg,rgba(13,31,53,.02),rgba(13,31,53,.66)),url(/images/concierge/welcome-family-premium.png)" }}><span><b>03</b><i>Les voyageurs arrivent sans hésiter<small>Accès, clés et fonctionnement expliqués avant leur installation.</small></i></span></div>
            <div className="visual experience-visual journey-owner" style={{ backgroundImage: "linear-gradient(180deg,rgba(13,31,53,.02),rgba(13,31,53,.66)),url(/images/concierge/owner-conversation-premium.png)" }}><span><b>04</b><i>Vous savez ce qui se passe<small>Nous vous informons lorsqu’une décision ou un point important l’exige.</small></i></span></div>
          </div>
        </div>
      </section>

      <section className="section process"><div className="container"><Reveal className="watermark-heading"><p className="eyebrow section-watermark">Méthode</p><h2 className="method-title"><span>La méthode conduit le bien</span><span>jusqu’à sa pleine performance.</span></h2></Reveal><MethodJourney /></div></section>

      <section className="section ivory concierge-voices"><div className="container"><Reveal className="watermark-heading"><p className="eyebrow dark section-watermark">Avis</p><h2>Vous savez toujours qui veille sur le bien.</h2></Reveal><ReviewCards /><p className="demo-note">Avis de démonstration, en attente de témoignages propriétaires vérifiés et autorisés.</p></div></section>

    </>
  );
}
