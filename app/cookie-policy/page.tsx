import { LegalLayout } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata({ title: "Politique relative aux cookies", description: "Stockages fonctionnels et mesure d’audience anonyme utilisés par Velyo, leur finalité, leur durée et les réglages disponibles.", path: "/cookie-policy" });

export default function Page() {
  return <LegalLayout title="Politique cookies" intro="Velyo utilise des stockages fonctionnels et, avec votre accord, une mesure agrégée de l’audience et des performances. Aucun suivi publicitaire.">
    <h2>1. Situation actuelle</h2>
    <p>Vercel Web Analytics et Speed Insights sont chargés uniquement après votre accord. Ils servent à mesurer de façon agrégée les pages consultées et les performances techniques, sans cookie publicitaire ni profilage.</p>

    <h2>2. Mesure agrégée et performance</h2>
    <p>Vercel Web Analytics enregistre des points de mesure anonymes. Selon Vercel, ils ne sont associés ni à une personne, ni à un client, ni à une adresse IP ; l’identifiant de session haché est supprimé après 24 heures. Speed Insights recueille des métriques de performance réelles, notamment les Core Web Vitals, afin d’améliorer la rapidité et la stabilité du site.</p>
    <p>Ces outils restent désactivés tant que vous n’avez pas choisi « Accepter la mesure anonyme ». Votre refus ne limite aucune fonctionnalité du site.</p>

    <h2>3. Stockages utilisés</h2>
    <div className="legal-table legal-cookie-table" role="table" aria-label="Liste des stockages utilisés">
      <div role="row"><b role="columnheader">Nom</b><b role="columnheader">Finalité et accès</b><b role="columnheader">Durée</b></div>
      <div role="row"><span><code>velyo-locale</code> · stockage local</span><span>Mémorise la langue choisie. Accessible uniquement au site dans votre navigateur.</span><span>Jusqu’à sa suppression dans le navigateur</span></div>
      <div role="row"><span><code>velyo-cookie-v2</code> · stockage local</span><span>Mémorise la fermeture de l’information relative aux cookies afin de ne pas la réafficher.</span><span>Jusqu’à sa suppression dans le navigateur</span></div>
      <div role="row"><span><code>velyo-analytics-consent</code> · stockage local</span><span>Mémorise votre choix d’activer ou non la mesure anonyme afin de le respecter lors des visites suivantes.</span><span>Jusqu’à sa suppression dans le navigateur</span></div>
      <div role="row"><span><code>velyo_admin</code> · cookie</span><span>Authentification sécurisée de l’espace d’administration. Cookie HttpOnly, Secure et SameSite Strict ; il ne concerne pas la navigation publique.</span><span>10 heures au maximum</span></div>
    </div>

    <h2>4. Base juridique</h2>
    <p>Les stockages fonctionnels sont nécessaires au service demandé ou servent uniquement à conserver un choix d’interface. La mesure d’audience et de performance repose sur votre accord explicite et reste désactivée en cas de refus.</p>

    <h2>5. Infrastructure technique</h2>
    <p>Vercel fournit l’hébergement de production, la mesure d’audience et les métriques de performance. Cloudflare peut également assurer la distribution, la sécurité ou une version de publication du site. Ces prestataires traitent les seules données techniques nécessaires à leurs missions.</p>

    <h2>6. Vos réglages</h2>
    <p>Vous pouvez effacer le stockage local et les cookies depuis les paramètres de votre navigateur. La suppression de <code>velyo-locale</code> rétablit la langue par défaut ; celle de <code>velyo-cookie-v2</code> ou <code>velyo-analytics-consent</code> réaffiche votre choix. Le blocage du stockage fonctionnel peut empêcher la mémorisation de vos préférences.</p>
  </LegalLayout>;
}
