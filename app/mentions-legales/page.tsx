import { LegalIdentityNotice, LegalLayout } from "@/components/LegalPage";
import { legalIdentity as legal } from "@/lib/legal";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata({ title: "Mentions légales", description: "Identité de l’éditeur, hébergement, propriété intellectuelle et cadre juridique du site Velyo Property Manager.", path: "/mentions-legales" });

export default function Page() {
  return <LegalLayout title="Mentions légales" intro="L’identité de l’éditeur, l’hébergement et les règles qui encadrent le site Velyo.">
    <h2>1. Éditeur du site</h2>
    <dl className="legal-definition-list">
      <div><dt>Nom commercial</dt><dd>{legal.tradeName}</dd></div>
      {legal.legalName && <div><dt>Dénomination légale</dt><dd>{legal.legalName}</dd></div>}
      {legal.legalForm && <div><dt>Forme juridique</dt><dd>{legal.legalForm}</dd></div>}
      {legal.registeredOffice && <div><dt>Siège social</dt><dd>{legal.registeredOffice}</dd></div>}
      {legal.legalRepresentative && <div><dt>Représentant légal</dt><dd>{legal.legalRepresentative}</dd></div>}
      {legal.registrationNumber && <div><dt>Immatriculation</dt><dd>{legal.businessRegister} · {legal.registrationNumber}</dd></div>}
      {legal.reaNumber && <div><dt>REA</dt><dd>{legal.reaNumber}</dd></div>}
      {legal.vatNumber && <div><dt>Partita IVA</dt><dd>{legal.vatNumber}</dd></div>}
      {legal.taxCode && <div><dt>Codice fiscale</dt><dd>{legal.taxCode}</dd></div>}
      {legal.shareCapital && <div><dt>Capital social</dt><dd>{legal.shareCapital}</dd></div>}
      <div><dt>Contact</dt><dd><a href={`mailto:${legal.email}`}>{legal.email}</a>{legal.phone && <> · <a href={`tel:${legal.phone.replace(/\s/g, "")}`}>{legal.phone}</a></>}</dd></div>
      {legal.pec && <div><dt>PEC</dt><dd><a href={`mailto:${legal.pec}`}>{legal.pec}</a></dd></div>}
    </dl>
    <LegalIdentityNotice />

    <h2>2. Hébergement</h2>
    <p>Le site et sa base de données sont hébergés par <strong>{legal.hostName}</strong>, {legal.hostAddress.replace(", États-Unis", "")}, <span>États-Unis</span>. <span>Site :</span> <a href={legal.hostWebsite} rel="noreferrer">{legal.hostWebsite}</a>.</p>

    <h2>3. Propriété intellectuelle</h2>
    <p>La structure du site, sa charte graphique, ses textes, photographies, illustrations, logos et autres éléments sont protégés par les droits de propriété intellectuelle applicables. Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable de l’éditeur est interdite, sauf exception prévue par la loi.</p>
    <p>Les marques, noms commerciaux et contenus appartenant à des tiers restent la propriété de leurs titulaires respectifs.</p>

    <h2>4. Informations et responsabilité</h2>
    <p>Velyo s’efforce de publier des informations exactes et à jour, sans garantir l’absence permanente d’erreur, d’omission ou d’indisponibilité. Les contenus du site sont généraux et ne remplacent ni une visite du bien, ni une proposition commerciale, ni un contrat.</p>
    <p>Les estimations de revenus, de prix ou d’occupation sont des ordres de grandeur non contractuels. Elles dépendent notamment de l’état et de la localisation du bien, de ses disponibilités, de la saison, des règles locales, des plateformes utilisées, des charges et de la fiscalité du propriétaire.</p>

    <h2>5. Liens externes</h2>
    <p>Les liens vers des sites tiers sont fournis à titre pratique. Velyo ne contrôle pas leurs contenus, leur disponibilité ou leurs pratiques de confidentialité et ne peut en être tenu responsable.</p>

    <h2>6. Droit applicable</h2>
    <p>Le site est exploité depuis l’Italie. Le droit italien s’applique, sous réserve des règles impératives protégeant les consommateurs et des règles de compétence territoriale auxquelles il ne peut être dérogé.</p>
  </LegalLayout>;
}
