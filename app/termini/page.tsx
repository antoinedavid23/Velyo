import { LegalLayout } from "@/components/LegalPage";
import { legalIdentity as legal } from "@/lib/legal";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata({ title: "Conditions d’utilisation", description: "Conditions applicables à l’utilisation du site Velyo, aux demandes de contact et au simulateur de revenus locatifs.", path: "/termini" });

export default function Page() {
  return <LegalLayout title="Conditions d’utilisation" intro="Les règles applicables à la consultation du site et aux demandes adressées à Velyo.">
    <h2>1. Objet du site</h2>
    <p>Le site présente l’activité de Velyo Property Manager, ses services de gestion et de conciergerie, des options pouvant être organisées autour d’un séjour et des biens dont la publication a été autorisée. Sa consultation est gratuite, hors coût de connexion facturé par votre opérateur.</p>

    <h2>2. Absence d’offre contractuelle</h2>
    <p>Les pages, exemples, parcours et réponses générales n’emportent ni mandat de gestion, ni réservation, ni engagement ferme de Velyo. Un service ne devient contractuel qu’après échange sur le besoin, vérification de sa faisabilité, communication du prix et acceptation des conditions applicables.</p>
    <p>L’envoi d’un formulaire constitue une demande de contact. Il ne garantit ni l’acceptation d’un bien, ni la disponibilité d’un service ou d’un prestataire.</p>

    <h2>3. Estimations et simulateur</h2>
    <p>Les résultats sont bruts, indicatifs et non contractuels. Ils reposent sur les informations saisies et sur des hypothèses simplifiées. Ils n’intègrent pas nécessairement la commission, le ménage, le linge, les charges, la fiscalité, les travaux, les annulations ou les évolutions réglementaires. Aucun niveau de revenu, de prix moyen ou d’occupation n’est garanti.</p>

    <h2>4. Biens, services et contenus</h2>
    <p>Les descriptions, photographies, disponibilités et tarifs peuvent évoluer. Les caractéristiques déterminantes d’un bien ou d’un service sont confirmées avant tout engagement. Les avis ou exemples identifiés comme démonstrations ne doivent pas être interprétés comme des témoignages vérifiés.</p>

    <h2>5. Utilisation loyale</h2>
    <p>Vous vous engagez à transmettre des informations exactes, à ne pas usurper l’identité d’un tiers et à ne pas tenter de compromettre le site, d’en contourner les protections, d’en extraire massivement les contenus ou d’utiliser ses formulaires à des fins abusives. Velyo peut bloquer une demande manifestement frauduleuse ou automatisée.</p>

    <h2>6. Disponibilité et sécurité</h2>
    <p>Velyo met en œuvre des moyens raisonnables pour assurer la disponibilité et la sécurité du site. Une interruption peut toutefois survenir pour maintenance, incident technique, force majeure ou intervention d’un prestataire. Aucun service en ligne ne pouvant être garanti sans interruption, l’utilisateur est invité à signaler toute anomalie à <a href={`mailto:${legal.email}`}>{legal.email}</a>.</p>

    <h2>7. Propriété intellectuelle et liens</h2>
    <p>Les contenus du site ne peuvent être reproduits ou exploités sans autorisation, hors exceptions légales. Les sites externes accessibles par lien restent sous la responsabilité de leurs éditeurs.</p>

    <h2>8. Droit applicable et litiges</h2>
    <p>Les présentes conditions sont régies par le droit italien. Avant toute action, les parties sont invitées à rechercher une solution amiable en écrivant à <a href={`mailto:${legal.email}`}>{legal.email}</a>. Les règles impératives relatives à la protection du consommateur et à la compétence territoriale demeurent pleinement applicables.</p>
    <p>La plateforme européenne de règlement en ligne des litiges ayant été supprimée le 20 juillet 2025, aucun lien obsolète vers cette plateforme n’est proposé.</p>
  </LegalLayout>;
}
