import { PageHero } from "@/components/PageHero";
import { RevenueSimulator } from "@/components/RevenueSimulator";

export const metadata = { title: "Estimation des revenus locatifs à Genova", description: "Estimez le revenu brut possible de votre bien selon son prix, sa disponibilité et son niveau d’occupation.", alternates: { canonical: "/simulatore" } };

export default function Page() {
  return <><PageHero label="Votre potentiel locatif" title="Estimation" text="Testez vos chiffres actuels et voyez ce qu’une gestion plus régulière pourrait changer." image="/images/concierge/family-apartment-premium.png" /><section className="section simulator-page"><div className="container simulator-intro"><div className="simulator-editorial-heading"><div className="watermark-heading"><p className="section-watermark">Projection</p><h2>Vos chiffres révèlent<br /><em>le potentiel du bien.</em></h2></div><p>Indiquez votre situation actuelle. Le simulateur estime l’effet d’un calendrier mieux rempli et d’un prix légèrement ajusté.</p></div><RevenueSimulator /></div></section></>;
}
