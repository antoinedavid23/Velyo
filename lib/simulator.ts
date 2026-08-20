export type SimulatorInput = {
  location: string;
  type: string;
  bedrooms: number;
  guests: number;
  area: number;
  finish: string;
  transit: boolean;
  elevator: boolean;
  outdoor: boolean;
  parking: boolean;
  days: number;
};

export type RevenueEstimate = {
  annual: number;
  low: number;
  high: number;
  nightly: number;
  occupancy: number;
  bookedNights: number;
  monthlyAverage: number;
  seasonHigh: number;
  seasonLow: number;
};

const baseNightly: Record<string, number> = {
  "Centro storico": 80,
  Castelletto: 84,
  Albaro: 88,
  Foce: 82,
  Marassi: 72,
  Sampierdarena: 70,
  Nervi: 98,
  Boccadasse: 104,
  "Autre quartier de Genova": 76,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function calculateRevenueEstimate(i: SimulatorInput): RevenueEstimate {
  const typeFactor = {
    Studio: .9,
    "Deux-pièces": .96,
    "Trois-pièces": 1.03,
    "Quatre-pièces et plus": 1.09,
    "Petit logement indépendant": 1.12,
  }[i.type] || 1;
  const finishFactor = {
    "À rafraîchir": .9,
    "Simple et fonctionnel": .96,
    Soigné: 1,
    "Très soigné": 1.05,
  }[i.finish] || 1;
  const amenityFactor = 1 + (i.transit ? .025 : 0) + (i.elevator ? .03 : 0) + (i.outdoor ? .05 : 0) + (i.parking ? .035 : 0);
  const sizeFactor = 1 + Math.min(Math.max(i.bedrooms - 1, 0) * .025, .075) + Math.min(Math.max(i.area - 65, 0) / 2000, .045);
  const capacityFactor = 1 + Math.min(Math.max(i.guests - 2, 0) * .008, .04);
  const neighborhoodBonus = ["Nervi", "Boccadasse", "Albaro"].includes(i.location) ? 1 : 0;
  const occupancy = clamp(Math.round(51 + (i.transit ? 3 : 0) + (i.outdoor ? 2 : 0) + (i.elevator ? 1 : 0) + (i.finish === "Très soigné" ? 2 : 0) + neighborhoodBonus), 50, 65);
  const nightly = clamp(Math.round((baseNightly[i.location] || 76) * typeFactor * finishFactor * amenityFactor * sizeFactor * capacityFactor), 70, 110);
  const bookedNights = Math.round(i.days * (occupancy / 100));
  const annual = Math.round(nightly * bookedNights / 100) * 100;

  return {
    annual,
    low: Math.round(annual * .88 / 100) * 100,
    high: Math.round(annual * 1.12 / 100) * 100,
    nightly,
    occupancy,
    bookedNights,
    monthlyAverage: Math.round(annual / 12 / 50) * 50,
    seasonHigh: clamp(Math.round(nightly * 1.12), 70, 110),
    seasonLow: clamp(Math.round(nightly * .88), 70, 110),
  };
}
