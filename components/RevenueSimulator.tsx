"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { SimulatorInput } from "@/lib/simulator";

const initial: SimulatorInput = {
  location: "Castelletto",
  type: "Trois-pièces",
  bedrooms: 2,
  guests: 4,
  area: 75,
  finish: "Soigné",
  transit: true,
  elevator: true,
  outdoor: true,
  parking: false,
  days: 260,
};

const euro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function RevenueSimulator() {
  const [i, setI] = useState(initial);
  const [currentOccupancy, setCurrentOccupancy] = useState(60);
  const [currentNightly, setCurrentNightly] = useState(82);
  const projected = useMemo(() => {
    const nightlyNow = clamp(currentNightly || 20, 20, 200);
    const currentBookedNights = Math.round(i.days * (currentOccupancy / 100));
    const currentAnnual = Math.round(nightlyNow * currentBookedNights);
    const occupancyLift = 8 + (i.transit ? 1 : 0) + (i.outdoor ? 1 : 0) + (["Soigné", "Très soigné"].includes(i.finish) ? 1 : 0);
    const occupancy = Math.min(92, currentOccupancy + occupancyLift);
    const bookedNights = Math.round(i.days * (occupancy / 100));
    const priceLiftPercent = 6 + (i.outdoor ? 1 : 0) + (i.finish === "Très soigné" ? 1 : 0);
    const nightly = Math.round(nightlyNow * (1 + priceLiftPercent / 100));
    const annual = Math.round(nightly * bookedNights);
    const additionalNights = Math.max(0, bookedNights - currentBookedNights);
    const occupancyContribution = Math.round(additionalNights * nightlyNow);
    const pricingContribution = Math.round(Math.max(0, nightly - nightlyNow) * bookedNights);
    const gain = Math.max(0, annual - currentAnnual);
    return {
      nightlyNow,
      currentAnnual,
      occupancy,
      nightly,
      bookedNights,
      additionalNights,
      occupancyContribution,
      pricingContribution,
      occupancyLift,
      priceLiftPercent,
      annual,
      low: Math.round(annual * .9 / 100) * 100,
      high: Math.round(annual * 1.1 / 100) * 100,
      gain,
    };
  }, [currentNightly, currentOccupancy, i.days, i.finish, i.outdoor, i.transit]);
  const set = (key: keyof SimulatorInput, value: string | number | boolean) => setI((current) => ({ ...current, [key]: value }));

  return <div className="simulator-layout simulator-classic">
    <form className="form-card simulator-form" onSubmit={(event) => event.preventDefault()}>
      <section className="simulator-form-section simulator-current-section">
        <p className="eyebrow"><span>01</span> Votre situation aujourd’hui</p>
        <div className="field-row">
          <label>Taux moyen de réservation <output>{currentOccupancy}%</output><input className="velyo-range" style={{ background: `linear-gradient(to right, #65A9F8 0%, #65A9F8 ${currentOccupancy}%, rgba(255,255,255,.24) ${currentOccupancy}%, rgba(255,255,255,.24) 100%)` }} type="range" min="25" max="80" value={currentOccupancy} onChange={(event) => setCurrentOccupancy(+event.target.value)} /></label>
          <label>Prix moyen facturé par nuit <span className="simulator-price-field"><input type="number" min="20" max="200" step="1" value={currentNightly} onChange={(event) => setCurrentNightly(+event.target.value)} onBlur={() => setCurrentNightly((value) => clamp(value || 20, 20, 200))} /><small>€ / nuit</small></span></label>
        </div>
        <p className="form-hint">Le scénario part de vos chiffres, ajoute <b>au moins 8 points de réservation</b> et fait légèrement évoluer le prix moyen selon le logement.</p>
      </section>

      <section className="simulator-form-section simulator-property-section">
        <p className="eyebrow simulator-subhead"><span>02</span> Votre bien</p>
        <div className="field-row">
          <label>Quartier<select value={i.location} onChange={(event) => set("location", event.target.value)}>{["Centro storico", "Castelletto", "Albaro", "Foce", "Marassi", "Sampierdarena", "Nervi", "Boccadasse", "Autre quartier de Genova"].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label>Configuration<select value={i.type} onChange={(event) => set("type", event.target.value)}>{["Studio", "Deux-pièces", "Trois-pièces", "Quatre-pièces et plus", "Petit logement indépendant"].map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>
        <div className="field-row simulator-compact-grid">
          <label>Chambres<input type="number" min="0" max="5" value={i.bedrooms} onChange={(event) => set("bedrooms", +event.target.value)} /></label>
          <label>Voyageurs accueillis<input type="number" min="1" max="8" value={i.guests} onChange={(event) => set("guests", +event.target.value)} /></label>
        </div>
        <div className="field-row simulator-compact-grid">
          <label>Surface en m²<input type="number" min="20" max="180" value={i.area} onChange={(event) => set("area", +event.target.value)} /></label>
          <label>Présentation du logement<select value={i.finish} onChange={(event) => set("finish", event.target.value)}>{["À rafraîchir", "Simple et fonctionnel", "Soigné", "Très soigné"].map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>
        <label>Jours disponibles à la location <output>{i.days} jours</output><input className="velyo-range" style={{ background: `linear-gradient(to right, #65A9F8 0%, #65A9F8 ${((i.days - 90) / 275) * 100}%, rgba(255,255,255,.24) ${((i.days - 90) / 275) * 100}%, rgba(255,255,255,.24) 100%)` }} type="range" min="90" max="365" value={i.days} onChange={(event) => set("days", +event.target.value)} /></label>
        <div className="field-row simulator-amenities">{([
          ["transit", "Transports proches"],
          ["elevator", "Ascenseur"],
          ["outdoor", "Balcon ou terrasse"],
          ["parking", "Parking"],
        ] as const).map(([key, label]) => <label key={key}><input type="checkbox" checked={i[key]} onChange={(event) => set(key, event.target.checked)} /><span>{label}</span></label>)}</div>
      </section>
    </form>

    <motion.aside className="result-panel" key={`${projected.annual}-${projected.occupancy}`} initial={{ opacity: .55, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <p className="eyebrow dark">Ordre de grandeur</p>
      <small>Revenu locatif brut projeté</small>
      <strong>≈ {euro(projected.annual)} <i>/ an</i></strong>
      <p className="range">Fourchette prudente&nbsp;: {euro(projected.low)} à {euro(projected.high)}</p>
      <div className="result-grid">
        <div className="result-metric result-metric-current"><small>Situation actuelle</small><span>{euro(projected.currentAnnual)}</span><i>revenu annuel estimé</i></div>
        <div className="result-metric result-metric-projected"><small>Projection centrale</small><span>{euro(projected.annual)}</span><i>revenu annuel indicatif</i></div>
        <div className="result-metric"><small>Prix moyen par nuit</small><span>{euro(projected.nightlyNow)} → {euro(projected.nightly)}</span></div>
        <div className="result-metric"><small>Occupation moyenne</small><span>{currentOccupancy}% → {projected.occupancy}% <em>+{projected.occupancyLift} pts</em></span></div>
        <div className="result-metric"><small>Nuits réservées</small><span>{projected.bookedNights} <i>sur {i.days}</i></span></div>
        <div className="result-metric result-metric-gain"><small>Progression annuelle</small><span>+ {euro(projected.gain)}</span></div>
      </div>
      <div className="result-explanation">
        <p className="eyebrow dark">Comment lire cette estimation&nbsp;?</p>
        <p>Le calcul reste volontairement mesuré. Il combine uniquement deux leviers sur les <b>{i.days} jours</b> où le logement est réellement disponible.</p>
        <div><span><b>01</b><small>Calendrier mieux suivi</small></span><p><b>+ {projected.additionalNights} nuits</b> dans le scénario central, soit environ <b>+ {euro(projected.occupancyContribution)}</b> au prix actuel.</p></div>
        <div><span><b>02</b><small>Prix adapté aux périodes</small></span><p>Un prix moyen passant de <b>{euro(projected.nightlyNow)}</b> à <b>{euro(projected.nightly)}</b>, soit une hausse mesurée de <b>{projected.priceLiftPercent} %</b>.</p></div>
      </div>
      <p className="demo-note">Estimation brute et non contractuelle, avant commission, ménage, charges, fiscalité et éventuels travaux. La saison, le quartier précis et la qualité réelle du logement peuvent modifier le résultat.</p>
      <Link className="button" href="/valutazione">Parler de mon bien</Link>
    </motion.aside>
  </div>;
}
