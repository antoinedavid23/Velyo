import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AdminPropertyManager } from "@/components/AdminPropertyManager";
import { getAdminUser } from "@/lib/admin";

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
        <h1>Gérez vos biens.</h1>
        <p>Créez, complétez et publiez chaque fiche depuis un seul espace.</p>
      </div>
    </section>

    <main className="section admin-dashboard">
      <div className="container">
        <section id="biens" className="admin-properties-section">
          <div className="admin-section-head">
            <div>
              <p className="eyebrow">Vos biens</p>
              <h2>Le catalogue Velyo.</h2>
              <p>Créez une fiche, ajoutez les photos puis publiez-la quand elle est prête.</p>
            </div>
          </div>
          <AdminPropertyManager />
        </section>
      </div>
    </main>
  </div>;
}
