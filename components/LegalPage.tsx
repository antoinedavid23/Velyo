import Link from "next/link";
import { PageHero } from "./PageHero";
import { legalIdentity, missingLegalIdentity } from "@/lib/legal";
import { ItalianContent } from "@/components/ItalianContent";

export function LegalLayout({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <ItalianContent><div className="legal-page">
    <PageHero label="Informations légales" title={title} text={intro} />
    <section className="section ivory">
      <article className="container legal-content">
        <p className="legal-updated">Dernière mise à jour : <time dateTime={legalIdentity.lastUpdatedISO}>{legalIdentity.lastUpdated}</time></p>
        {children}
        <div className="legal-contact">
          <strong>Une question ou une demande concernant vos données ?</strong>
          <a href={`mailto:${legalIdentity.email}`}>{legalIdentity.email}</a>
        </div>
      </article>
    </section>
  </div></ItalianContent>;
}

export function LegalIdentityNotice() {
  if (!missingLegalIdentity.length) return null;
  return <ItalianContent><aside className="legal-note legal-configuration" role="note">
    <strong>Informations d’entreprise à renseigner avant la mise en ligne commerciale</strong>
    <p>Les données suivantes doivent reprendre exactement la visura camerale : {missingLegalIdentity.map(([label]) => label).join(", ")}.</p>
    <small>Configuration attendue : {missingLegalIdentity.map(([, variable]) => variable).join(", ")}.</small>
  </aside></ItalianContent>;
}

export function LegalLinks() {
  return <ItalianContent><p className="legal-inline-links"><Link href="/mentions-legales">Mentions légales</Link><Link href="/privacy">Confidentialité</Link><Link href="/cookie-policy">Cookies</Link><Link href="/termini">Conditions d’utilisation</Link></p></ItalianContent>;
}
