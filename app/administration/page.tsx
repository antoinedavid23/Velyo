import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CircleAlert, CircleCheck, Mail, Scale } from "lucide-react";
import { AdminPropertyManager } from "@/components/AdminPropertyManager";
import { getAdminUser } from "@/lib/admin";
import { leadEmailReady, legalIdentityComplete, missingLeadEmailConfiguration, missingLegalIdentity } from "@/lib/legal";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getAdminUser();
  if (!user) redirect("/connexion");

  return <div className="admin-shell">
    <header className="admin-topbar">
      <Link className="admin-brand" href="/administration" aria-label="Tableau de bord Velyo">
        <Image src="/images/brand/velyo-logo-light.svg" alt="Velyo Property Manager" width={430} height={120} priority />
        <small>Administration</small>
      </Link>
      <div className="admin-topbar-actions">
        <a href="/" target="_blank" rel="noreferrer">Voir le site <ArrowUpRight size={15} /></a>
        <span>Administrateur Velyo</span>
        <form action="/api/admin/logout" method="post"><button type="submit">Se déconnecter</button></form>
      </div>
    </header>

    <section className="admin-welcome">
      <div className="container">
        <p className="eyebrow">Administration Velyo</p>
        <h1>Votre espace de gestion.</h1>
        <p>Retrouvez vos propriétés, complétez les fiches et contrôlez leur publication depuis un seul endroit.</p>
      </div>
    </section>

    <main className="section admin-dashboard">
      <div className="container">
        <section className="admin-readiness" aria-labelledby="readiness-title">
          <div className="admin-section-head">
            <div>
              <p className="eyebrow">Mise en ligne</p>
              <h2 id="readiness-title">Conformité et réception des demandes.</h2>
            </div>
            <p>Le référencement public reste verrouillé tant que ces deux contrôles ne sont pas validés.</p>
          </div>
          <div className="admin-readiness-grid">
            <article className={legalIdentityComplete ? "is-ready" : "needs-setup"}>
              <span className="admin-readiness-icon">{legalIdentityComplete ? <CircleCheck /> : <CircleAlert />}</span>
              <div><small><Scale size={14} /> Identité légale</small><h3>{legalIdentityComplete ? "Données complètes" : `${missingLegalIdentity.length} informations à renseigner`}</h3><p>{legalIdentityComplete ? "Les mentions obligatoires sont prêtes pour la publication." : missingLegalIdentity.map(([label]) => label).join(" · ")}</p></div>
            </article>
            <article className={leadEmailReady ? "is-ready" : "needs-setup"}>
              <span className="admin-readiness-icon">{leadEmailReady ? <CircleCheck /> : <CircleAlert />}</span>
              <div><small><Mail size={14} /> Alertes e-mail</small><h3>{leadEmailReady ? "Livraison configurée" : `${missingLeadEmailConfiguration.length} réglages à terminer`}</h3><p>{leadEmailReady ? "Les nouvelles demandes déclenchent une alerte e-mail." : "Les demandes restent enregistrées dans la base, mais aucun e-mail d’alerte n’est envoyé."}</p></div>
            </article>
          </div>
        </section>
        <section id="biens" className="admin-properties-section">
          <div className="admin-section-head">
            <div>
              <p className="eyebrow">Vos biens</p>
              <h2>Le catalogue Velyo.</h2>
            </div>
            <p>Une vue claire pour créer, retrouver et mettre à jour chaque propriété.</p>
          </div>
          <AdminPropertyManager />
        </section>
      </div>
    </main>
  </div>;
}
