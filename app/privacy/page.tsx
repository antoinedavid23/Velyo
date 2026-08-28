import { LegalIdentityNotice, LegalLayout } from "@/components/LegalPage";
import { legalIdentity as legal } from "@/lib/legal";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata({ title: "Politique de confidentialité", description: "Données collectées, finalités, bases légales, conservation et droits des personnes qui contactent Velyo.", path: "/privacy" });

export default function Page() {
  return <LegalLayout title="Politique de confidentialité" intro="Une information claire sur les données utilisées lorsque vous consultez Velyo ou nous adressez une demande.">
    <h2>1. Responsable du traitement</h2>
    <p>Le responsable du traitement est <strong>{legal.legalName || legal.tradeName}</strong>{legal.registeredOffice ? <>, établi {legal.registeredOffice}</> : null}. Pour toute question ou pour exercer un droit : <a href={`mailto:${legal.email}`}>{legal.email}</a>{legal.pec ? <> ou <a href={`mailto:${legal.pec}`}>{legal.pec}</a></> : null}.</p>
    <LegalIdentityNotice />

    <h2>2. Données concernées</h2>
    <ul>
      <li><strong>Contact :</strong> prénom, nom, e-mail, téléphone et contenu de la demande.</li>
      <li><strong>Projet immobilier :</strong> adresse et ville du bien, type, surface, capacité, équipements, utilisation actuelle, objectifs et services recherchés.</li>
      <li><strong>Administration :</strong> statut de suivi de la demande et échanges nécessaires à son traitement.</li>
      <li><strong>Données techniques minimales :</strong> informations strictement nécessaires à la sécurité, au fonctionnement du site et à la prévention du spam. Après accord, des mesures agrégées de consultation et de performance peuvent également être transmises à Vercel. Aucun profil publicitaire n’est créé.</li>
    </ul>

    <h2>3. Finalités et bases légales</h2>
    <div className="legal-table" role="table" aria-label="Finalités et bases légales">
      <div role="row"><b role="columnheader">Finalité</b><b role="columnheader">Base légale</b><b role="columnheader">Données</b></div>
      <div role="row"><span>Répondre à une demande et préparer une visite, une estimation ou une proposition</span><span>Mesures précontractuelles demandées par la personne — art. 6, §1, b du RGPD</span><span>Coordonnées, bien, besoin et message</span></div>
      <div role="row"><span>Sécuriser le site et filtrer les envois automatisés</span><span>Intérêt légitime à protéger le service — art. 6, §1, f</span><span>Données techniques minimales et champ anti-spam</span></div>
      <div role="row"><span>Mesurer de façon agrégée l’audience et les performances du site</span><span>Votre accord — art. 6, §1, a du RGPD, lorsqu’il est applicable</span><span>Page consultée, provenance, informations techniques générales et Core Web Vitals, sans profil publicitaire</span></div>
      <div role="row"><span>Respecter les obligations comptables, fiscales ou contentieuses</span><span>Obligation légale et défense de droits — art. 6, §1, c et f</span><span>Données strictement nécessaires au dossier concerné</span></div>
    </div>
    <p>Velyo n’utilise pas les demandes pour envoyer de la prospection électronique sans base légale distincte. Aucune décision produisant un effet juridique n’est prise automatiquement et aucun profilage commercial n’est effectué.</p>

    <h2>4. Caractère obligatoire</h2>
    <p>Les champs marqués d’un astérisque sont nécessaires pour traiter la demande. Sans eux, Velyo ne pourra pas répondre correctement. Les autres informations sont facultatives. La case associée au formulaire confirme uniquement que vous avez pris connaissance de cette politique : elle ne transforme pas le traitement nécessaire à votre demande en consentement marketing.</p>

    <h2>5. Destinataires et sous-traitants</h2>
    <p>Les données sont accessibles uniquement aux personnes habilitées chez Velyo et, dans la limite nécessaire à leur mission, aux prestataires techniques suivants :</p>
    <ul>
      <li><strong>Cloudflare</strong> : hébergement du site, de la base de données et protection de l’infrastructure ;</li>
      <li><strong>Vercel</strong> : hébergement de production et, après accord, mesure agrégée de l’audience et des performances ;</li>
      <li><strong>Resend</strong>, lorsqu’il est configuré : transmission sécurisée de la demande vers la boîte de réception de Velyo ;</li>
      <li>conseils professionnels ou autorités, seulement lorsqu’une obligation légale ou la défense d’un droit l’impose.</li>
    </ul>
    <p>Les informations ne sont ni vendues ni louées.</p>

    <h2>6. Transferts hors de l’Espace économique européen</h2>
    <p>Certains prestataires techniques peuvent traiter des données aux États-Unis. Lorsque cela constitue un transfert international, Velyo s’appuie sur une décision d’adéquation applicable ou sur les clauses contractuelles types de la Commission européenne et les mesures complémentaires appropriées. Une copie des garanties pertinentes peut être demandée à l’adresse de contact.</p>

    <h2>7. Durées de conservation</h2>
    <ul>
      <li><strong>Demandes sans suite :</strong> {legal.retentionMonths} mois au maximum à compter de la dernière activité utile, puis suppression dans le cadre de la procédure de purge de la base de réception.</li>
      <li><strong>Relation contractuelle :</strong> pendant la relation puis selon les durées légales de prescription et de conservation comptable applicables.</li>
      <li><strong>Demandes d’exercice de droits :</strong> le temps de traiter la demande et de conserver la preuve de la réponse lorsque cela est nécessaire.</li>
      <li><strong>Envois identifiés comme spam :</strong> non enregistrés dans la base de demandes.</li>
      <li><strong>Mesure d’audience :</strong> Vercel indique que l’identifiant de session haché de Web Analytics est automatiquement supprimé après 24 heures ; les statistiques agrégées suivent ensuite les durées du service Vercel configuré.</li>
    </ul>

    <h2>8. Vos droits</h2>
    <p>Selon les conditions du RGPD, vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement, leur portabilité, ou vous opposer à un traitement fondé sur l’intérêt légitime. Vous pouvez retirer un consentement à tout moment lorsqu’un traitement futur en dépendrait, sans affecter la licéité antérieure.</p>
    <p>Écrivez à <a href={`mailto:${legal.email}`}>{legal.email}</a> en précisant votre demande. Velyo répondra en principe dans un délai d’un mois. Une preuve d’identité pourra être demandée uniquement en cas de doute raisonnable.</p>
    <p>Vous pouvez également introduire une réclamation auprès du <a href="https://www.garanteprivacy.it/i-miei-diritti" rel="noreferrer">Garante per la protezione dei dati personali</a> ou saisir l’autorité judiciaire compétente.</p>

    <h2>9. Mineurs et mises à jour</h2>
    <p>Les services présentés s’adressent à des personnes majeures. Cette politique peut évoluer pour refléter un changement du site, des prestataires ou de la réglementation ; la date affichée en haut de page permet d’identifier la version en vigueur.</p>
  </LegalLayout>;
}
