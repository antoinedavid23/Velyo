import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";
import { PropertyGrid } from "@/components/PropertyGrid";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { ItalianContent } from "@/components/ItalianContent";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({ title: "Biens gérés par Velyo", description: "Découvrez les biens gérés par Velyo à Genova, publiés uniquement avec l’accord explicite de leurs propriétaires.", path: "/proprieta" });
export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getChatGPTUser();
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  const isAdmin = !!user && allowed.includes(user.email.toLowerCase());
  return <ItalianContent><><PageHero label="Biens confiés à Velyo" title="Nos biens" text="Les biens apparaissent ici seulement après leur mise en gestion et l’accord du propriétaire." image="/images/concierge/family-apartment-premium.webp" /><section className="section ivory properties-empty-section"><div className="container">{isAdmin && <div className="admin-entry"><div><span>Espace privé</span><b>Gérer les biens</b></div><Link className="button" href="/administration">Ouvrir l’administration</Link></div>}<PropertyGrid /></div></section></></ItalianContent>;
}
