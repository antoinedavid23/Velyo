import { LegalLayout } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata({ title: "Politique relative aux cookies", description: "Stockages strictement nécessaires utilisés par Velyo, leur finalité, leur durée et les réglages disponibles.", path: "/cookie-policy" });

export default function Page() {
  return <LegalLayout title="Politique cookies" intro="Velyo utilise uniquement les mécanismes nécessaires au fonctionnement et à vos préférences. Aucun suivi publicitaire.">
    <h2>1. Situation actuelle</h2>
    <p>Le site public n’installe aucun cookie publicitaire, aucun traceur de profilage et aucun outil de mesure d’audience. Il ne crée pas de profil de navigation et ne transmet pas votre activité à des plateformes publicitaires.</p>

    <h2>2. Stockages utilisés</h2>
    <div className="legal-table legal-cookie-table" role="table" aria-label="Liste des stockages utilisés">
      <div role="row"><b role="columnheader">Nom</b><b role="columnheader">Finalité et accès</b><b role="columnheader">Durée</b></div>
      <div role="row"><span><code>velyo-locale</code> · stockage local</span><span>Mémorise la langue choisie. Accessible uniquement au site dans votre navigateur.</span><span>Jusqu’à sa suppression dans le navigateur</span></div>
      <div role="row"><span><code>velyo-cookie</code> · stockage local</span><span>Mémorise la fermeture de l’information relative aux cookies afin de ne pas la réafficher.</span><span>Jusqu’à sa suppression dans le navigateur</span></div>
      <div role="row"><span><code>velyo_admin</code> · cookie</span><span>Authentification sécurisée de l’espace d’administration. Cookie HttpOnly, Secure et SameSite Strict ; il ne concerne pas la navigation publique.</span><span>10 heures au maximum</span></div>
    </div>

    <h2>3. Base juridique</h2>
    <p>Ces mécanismes sont strictement nécessaires au service demandé ou servent uniquement à conserver un choix d’interface. Ils ne requièrent donc pas de consentement préalable. Le message affiché lors de la première visite est informatif et sa fermeture n’autorise aucun suivi supplémentaire.</p>

    <h2>4. Infrastructure technique</h2>
    <p>L’hébergeur peut traiter les données réseau strictement nécessaires à la distribution et à la sécurité du site, notamment pour bloquer les abus. Si un nouveau service non essentiel — analyse d’audience, publicité, vidéo tierce ou carte intégrée — était ajouté, cette politique serait mise à jour et le consentement serait recueilli avant son activation lorsqu’il est requis.</p>

    <h2>5. Vos réglages</h2>
    <p>Vous pouvez effacer le stockage local et les cookies depuis les paramètres de votre navigateur. La suppression de <code>velyo-locale</code> rétablit la langue par défaut ; celle de <code>velyo-cookie</code> réaffiche l’information. Le blocage du stockage fonctionnel peut empêcher la mémorisation de vos préférences.</p>
  </LegalLayout>;
}
