"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const method = [
  {
    title: "Auditer le bien",
    time: "Découverte",
    text: "Nous visitons le bien, relevons ses caractéristiques et comprenons vos contraintes avant de définir le projet locatif.",
    points: ["Visite complète", "Accès et équipements", "État et points d’attention", "Capacité d’accueil", "Périodes propriétaires", "Contraintes identifiées"],
  },
  {
    title: "Définir la stratégie",
    time: "Positionnement",
    text: "Le quartier, la saison, le type de voyageurs et les charges servent à établir un positionnement réaliste et une première projection.",
    points: ["Analyse du quartier", "Clientèle cible", "Tarif moyen envisagé", "Taux d’occupation cible", "Charges estimées", "Objectif de rentabilité"],
  },
  {
    title: "Préparer le bien",
    time: "Mise en place",
    text: "Nous réunissons les éléments nécessaires pour accueillir, vendre et exploiter le bien dans de bonnes conditions dès l’ouverture.",
    points: ["Équipements vérifiés", "Accès et clés organisés", "Ménage initial", "Linge et consommables", "Consignes du bien", "Prestataires référencés"],
  },
  {
    title: "Lancer la location",
    time: "Mise en marché",
    text: "L’annonce, le calendrier et le tarif de départ sont configurés pour obtenir les premières réservations sans dégrader le positionnement du bien.",
    points: ["Annonce structurée", "Photos et informations", "Calendrier ouvert", "Tarif de lancement", "Règles de séjour", "Canaux de réservation"],
  },
  {
    title: "Gérer les séjours",
    time: "Exploitation",
    text: "Chaque réservation suit un processus précis, de la confirmation au départ, avec un interlocuteur local pour les voyageurs.",
    points: ["Réservations suivies", "Messages voyageurs", "Préparation des arrivées", "Assistance sur place", "Ménage et linge", "Contrôle après départ"],
  },
  {
    title: "Lire les résultats",
    time: "Analyse",
    text: "Les données réelles remplacent progressivement les hypothèses afin d’identifier ce qui améliore le revenu, l’occupation et la qualité des séjours.",
    points: ["Taux d’occupation", "Prix moyen par nuit", "Revenu généré", "Coûts d’exploitation", "Avis voyageurs", "Incidents récurrents"],
  },
  {
    title: "Optimiser la gestion",
    time: "Régime stabilisé",
    text: "Tarifs, durées de séjour et tâches récurrentes sont ajustés puis automatisés, tout en conservant un contrôle humain sur le bien.",
    points: ["Tarification ajustée", "Durées optimisées", "Messages automatisés", "Tâches planifiées", "Prestataires coordonnés", "Suivi propriétaire régulier"],
  },
];

export function MethodJourney() {
  const [active, setActive] = useState(0);

  const current = method[active];

  return (
    <div className="method-light-journey">
      <div className="method-light-path method-seven-steps" role="tablist" aria-label="Les étapes de l’accompagnement Velyo">
        <span className="method-light-progress" style={{ width: `${active * (100 / (method.length - 1))}%` }} aria-hidden="true" />
        {method.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`method-tab-${index}`}
            aria-selected={active === index}
            aria-controls="method-active-panel"
            className={`${index === active ? "is-active" : ""} ${index < active ? "is-complete" : ""}`}
            onClick={() => setActive(index)}
          >
            <i aria-hidden="true" />
            <span>0{index + 1}</span>
            <small>{item.time}</small>
          </button>
        ))}
      </div>

      <div className="method-active-panel" id="method-active-panel" role="tabpanel" aria-labelledby={`method-tab-${active}`} key={current.title}>
        <span className="method-active-number">0{active + 1}</span>
        <div className="method-active-copy">
          <p className="eyebrow">{current.time}</p>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>
        <ul>{current.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
      </div>

      <div className="method-light-footer">
        <div className="method-light-controls">
          <button type="button" aria-label="Étape précédente" onClick={() => setActive((active - 1 + method.length) % method.length)}><ArrowLeft size={16} /></button>
          <button type="button" aria-label="Étape suivante" onClick={() => setActive((active + 1) % method.length)}><ArrowRight size={16} /></button>
        </div>
        <Link className="text-link concierge-method-link" href="/valutazione">Présenter mon bien <ArrowRight size={15} /></Link>
      </div>
    </div>
  );
}

const ownerPromiseSteps = [
  { title: "Comprendre votre bien", time: "Diagnostic", text: "Nous visitons le bien, évaluons son potentiel locatif et relevons tout ce qui compte pour l’exploiter sans en perdre le caractère.", points: ["État et équipements vérifiés", "Contraintes du lieu relevées", "Potentiel locatif étudié", "Priorités du propriétaire recueillies"] },
  { title: "Définir notre cadre", time: "Organisation", text: "Nous fixons ensemble ce que Velyo gère, ce que vous souhaitez conserver et les dépenses qui demandent votre validation.", points: ["Services inclus détaillés", "Budget et seuils définis", "Périodes personnelles réservées", "Rythme des échanges choisi"] },
  { title: "Mettre le bien en marché", time: "Commercialisation", text: "L’annonce, les photographies, le calendrier et la stratégie tarifaire sont préparés pour lancer la location sur des bases solides.", points: ["Annonce créée ou optimisée", "Présentation du bien travaillée", "Tarif de lancement défini", "Calendrier configuré"] },
  { title: "Piloter les locations", time: "Exploitation", text: "Nous suivons les réservations, préparons les arrivées et accompagnons les voyageurs du premier message jusqu’au départ.", points: ["Réservations centralisées", "Arrivées coordonnées", "Voyageurs accompagnés", "Départs contrôlés"] },
  { title: "Prendre soin du bien", time: "Entretien", text: "Entre deux séjours, Velyo coordonne le ménage, le linge, les réassorts, les vérifications et les interventions nécessaires.", points: ["Ménage et linge suivis", "Consommables réapprovisionnés", "État du bien contrôlé", "Maintenance coordonnée"] },
  { title: "Suivre les comptes", time: "Administration", text: "Revenus, commissions, dépenses, factures et événements importants sont regroupés dans un suivi propriétaire facile à relire.", points: ["Revenus et occupation reportés", "Dépenses et justificatifs classés", "Écarts documentés", "Compte rendu périodique"] },
  { title: "Optimiser dans la durée", time: "Performance", text: "Nous utilisons les réservations, les retours voyageurs et les coûts réels pour améliorer les tarifs, l’organisation et la rentabilité du bien.", points: ["Tarifs et durées ajustés", "Taux d’occupation suivi", "Coûts d’exploitation observés", "Actions d’amélioration proposées"] },
];

export function OwnerPromiseJourney() {
  const [active, setActive] = useState(0);

  const current = ownerPromiseSteps[active];

  return <div className="method-light-journey owner-promise-journey">
    <div className="method-light-path method-seven-steps" role="tablist" aria-label="Les engagements de l’accompagnement Velyo">
      <span className="method-light-progress" style={{ width: `${active * (100 / (ownerPromiseSteps.length - 1))}%` }} aria-hidden="true" />
      {ownerPromiseSteps.map((item, index) => <button
        key={item.title}
        type="button"
        role="tab"
        id={`owner-promise-tab-${index}`}
        aria-selected={active === index}
        aria-controls="owner-promise-panel"
        className={`${index === active ? "is-active" : ""} ${index < active ? "is-complete" : ""}`}
        onClick={() => setActive(index)}
      ><i aria-hidden="true" /><span>0{index + 1}</span><small>{item.time}</small></button>)}
    </div>

    <div className="method-active-panel" id="owner-promise-panel" role="tabpanel" aria-labelledby={`owner-promise-tab-${active}`} key={current.title}>
      <span className="method-active-number">0{active + 1}</span>
      <div className="method-active-copy"><p className="eyebrow">{current.time}</p><h3>{current.title}</h3><p>{current.text}</p></div>
      <ul>{current.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
    </div>

    <div className="method-light-footer">
      <div className="method-light-controls">
        <button type="button" aria-label="Engagement précédent" onClick={() => setActive((active - 1 + ownerPromiseSteps.length) % ownerPromiseSteps.length)}><ArrowLeft size={16} /></button>
        <button type="button" aria-label="Engagement suivant" onClick={() => setActive((active + 1) % ownerPromiseSteps.length)}><ArrowRight size={16} /></button>
      </div>
      <Link className="text-link" href="/valutazione">Nous présenter le bien <ArrowRight size={15} /></Link>
    </div>
  </div>;
}

const reviews = [
  { initials: "MG", place: "Genova", quote: "Je sais qui suit le bien, ce qui a été fait et quand une décision m’appartient." },
  { initials: "CL", place: "Nervi", quote: "Je ne passe plus d’un prestataire à l’autre : Velyo coordonne et revient vers moi avec une réponse claire." },
  { initials: "AR", place: "Castelletto", quote: "Même à distance, je reçois les informations importantes sans devoir surveiller chaque détail du séjour." },
  { initials: "SB", place: "Albaro", quote: "Les voyageurs ont un contact sur place et je ne suis sollicité que lorsque cela compte vraiment." },
];

export function ReviewCards() {
  const [active, setActive] = useState(0);
  const visible = [reviews[active], reviews[(active + 1) % reviews.length], reviews[(active + 2) % reviews.length]];

  return (
    <div className="review-carousel velyo-review-carousel">
      <button className="review-arrow review-arrow-left" type="button" onClick={() => setActive((active - 1 + reviews.length) % reviews.length)} aria-label="Avis précédents"><ArrowLeft /></button>
      <div className="review-grid" aria-live="polite">
        {visible.map((review, index) => <article className="review-card" key={`${review.initials}-${index}`}>
          <div className="review-head"><div className="review-avatar">{review.initials}</div><div><strong>Retour propriétaire</strong><span>{review.place}</span></div></div>
          <div className="review-stars" aria-label="5 étoiles">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={15} fill="currentColor" aria-hidden="true" />)}</div>
          <blockquote>“{review.quote}”</blockquote>
          <small>Témoignage de démonstration, en attente d’un avis vérifié.</small>
        </article>)}
      </div>
      <button className="review-arrow review-arrow-right" type="button" onClick={() => setActive((active + 1) % reviews.length)} aria-label="Avis suivants"><ArrowRight /></button>
    </div>
  );
}

const clarityMoments = [
  ["Avant de commencer", "Tout est clair.", "Nous décidons ensemble de ce que vous nous confiez, des dépenses séparées et du rythme de nos nouvelles."],
  ["Pendant les séjours", "Nous prenons le relais.", "Nous répondons aux voyageurs, coordonnons les intervenants et vous laissons respirer."],
  ["Quand il faut décider", "Vous gardez le dernier mot.", "Nous vous expliquons la situation et les solutions avant d’engager une dépense."],
  ["Dans la durée", "Vous savez où en est le bien.", "Réservations, interventions et points d’attention restent réunis et faciles à comprendre."],
];

export function OwnerClarityJourney() {
  const [activeMoment, setActiveMoment] = useState(0);
  const scrollRoot = useRef<HTMLDivElement>(null);
  const [kicker, title, text] = clarityMoments[activeMoment];

  useEffect(() => {
    const root = scrollRoot.current;
    if (!root || window.matchMedia("(max-width: 800px)").matches) return;
    const triggers = Array.from(root.querySelectorAll<HTMLElement>("[data-clarity-step]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveMoment(Number((entry.target as HTMLElement).dataset.clarityStep));
      });
    }, { rootMargin: "-44% 0px -44% 0px", threshold: 0 });
    triggers.forEach((trigger) => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  const chooseMoment = (index: number) => {
    setActiveMoment(index);
    const trigger = scrollRoot.current?.querySelector<HTMLElement>(`[data-clarity-step="${index}"]`);
    trigger?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  };

  return <div className="owner-clarity-scroll" ref={scrollRoot}>
    <div className="owner-clarity-editorial" data-step={`0${activeMoment + 1}`}>
      <span className="journey-top-progress" style={{ "--journey-progress": `${(activeMoment + 1) / clarityMoments.length}` } as CSSProperties} aria-hidden="true" />
      <div className="owner-clarity-copy" id="owner-clarity-panel" role="tabpanel" aria-labelledby={`owner-clarity-tab-${activeMoment}`}>
        <p className="owner-clarity-overline">Ce que vous gardez</p>
        <p className="owner-clarity-kicker">{kicker}</p>
        <h2 key={`title-${activeMoment}`}>{title}</h2>
        <p className="owner-clarity-text" key={`text-${activeMoment}`}>{text}</p>
      </div>
      <div className="owner-clarity-nav" role="tablist" aria-label="Les moments de votre accompagnement">
        {clarityMoments.map(([moment, momentTitle], index) => <button
          type="button"
          role="tab"
          id={`owner-clarity-tab-${index}`}
          aria-controls="owner-clarity-panel"
          aria-selected={activeMoment === index}
          tabIndex={activeMoment === index ? 0 : -1}
          className={activeMoment === index ? "is-active" : ""}
          key={momentTitle}
          onClick={() => chooseMoment(index)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            const next = (index + direction + clarityMoments.length) % clarityMoments.length;
            chooseMoment(next);
            document.getElementById(`owner-clarity-tab-${next}`)?.focus({ preventScroll: true });
          }}
        >
          <span className="owner-clarity-number">0{index + 1}</span>
          <span className="owner-clarity-label"><small>{moment}</small>{momentTitle}</span>
          <span className="owner-clarity-mark" aria-hidden="true" />
        </button>)}
      </div>
    </div>
    <div className="owner-clarity-scroll-triggers" aria-hidden="true">
      {clarityMoments.map(([, momentTitle], index) => <span data-clarity-step={index} key={momentTitle} />)}
    </div>
  </div>;
}

const values = [
  ["Clarté", "Tout est clair.", "Vous savez ce qui est pris en charge, ce qui a été fait et quand votre accord est nécessaire."],
  ["Réactivité", "Nous agissons vite.", "L’imprévu est vérifié sur place, confié à la bonne personne puis suivi jusqu’à sa résolution."],
  ["Proximité", "Nous sommes sur place.", "Votre interlocuteur connaît Genova, les accès du bien et les personnes utiles au quotidien."],
  ["Fiabilité", "Chaque action est suivie.", "Une vérification, une intervention ou une nouvelle importante ne reste jamais sans suite."],
  ["Simplicité", "Un seul interlocuteur.", "Voyageurs, entretien et imprévus sont réunis dans une seule relation, sans échanges dispersés."],
];

export function ValuesStory() {
  const [active, setActive] = useState(0);
  const scrollRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollRoot.current;
    if (!root || window.matchMedia("(max-width: 980px)").matches) return;
    const triggers = Array.from(root.querySelectorAll<HTMLElement>("[data-value-step]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.valueStep));
      });
    }, { rootMargin: "-44% 0px -44% 0px", threshold: 0 });
    triggers.forEach((trigger) => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  const chooseValue = (index: number) => {
    setActive(index);
    const trigger = scrollRoot.current?.querySelector<HTMLElement>(`[data-value-step="${index}"]`);
    trigger?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  };

  return <div className="about-values-scroll" ref={scrollRoot}>
    <div className="about-values-editorial" data-step={`0${active + 1}`}>
      <span className="journey-top-progress" style={{ "--journey-progress": `${(active + 1) / values.length}` } as CSSProperties} aria-hidden="true" />
      <div className="about-value-panel" id="value-panel" role="tabpanel" aria-labelledby={`value-tab-${active}`}>
        <span>0{active + 1} — 05</span><p>{values[active][0]}</p><h3 key={`value-${active}`}>{values[active][1]}</h3><div className="about-value-detail" key={`detail-${active}`}>{values[active][2]}</div>
      </div>
      <div className="about-value-nav" role="tablist" aria-label="Les repères Velyo">{values.map(([title, statement], index) => <button
        key={title}
        id={`value-tab-${index}`}
        type="button"
        role="tab"
        aria-selected={active === index}
        aria-controls="value-panel"
        tabIndex={active === index ? 0 : -1}
        className={active === index ? "is-active" : ""}
        onClick={() => chooseValue(index)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          const next = (index + direction + values.length) % values.length;
          chooseValue(next);
          document.getElementById(`value-tab-${next}`)?.focus({ preventScroll: true });
        }}
      ><span>0{index + 1}</span><span><b>{title}</b><small>{statement}</small></span><i aria-hidden="true" /></button>)}</div>
    </div>
    <div className="about-values-scroll-triggers" aria-hidden="true">
      {values.map(([title], index) => <span data-value-step={index} key={title} />)}
    </div>
  </div>;
}

const storyChapters = [
  ["01", "Pourquoi agir", "À distance, tout repose sur vous", "Sans personne sur place, chaque question, chaque prestataire et chaque imprévu finit par interrompre votre journée."],
  ["02", "Pourquoi Velyo", "Un relais évite que tout devienne urgent", "Une même personne connaît le bien, coordonne les intervenants et règle les sujets avant qu’ils ne s’accumulent."],
  ["03", "Pourquoi cela compte", "Vous restez propriétaire, pas gestionnaire", "Vous gardez les choix importants, sans devoir porter les messages, les relances et l’organisation de chaque séjour."],
];

export function AboutStoryJourney() {
  return <div className="about-story-journey">{storyChapters.map(([number, label, title, text]) => <article key={title}><span>{number}</span><div><small>{label}</small><h3>{title}</h3><p>{text}</p></div></article>)}</div>;
}
