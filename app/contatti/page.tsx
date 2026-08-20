import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { ArrowUpRight, Clock3, Mail, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contacter Velyo", description: "Posez une question ou présentez un bien à gérer à Genova.", alternates: { canonical: "/contatti" } };

export default function Page() {
  const email = process.env.NEXT_PUBLIC_EMAIL || "contact@velyo.pm";
  return <><PageHero label="Une question ou un bien à confier" title="Contact" text="Écrivez-nous directement. Une personne vous répond depuis Genova." image="/images/concierge/home-preparation-premium.png" /><section className="section"><div className="container split contact-layout"><div className="contact-intro"><p className="eyebrow">Premier échange</p><h2 className="contact-heading"><span>Expliquez-nous</span><span>votre situation.</span></h2><p>Un bien à gérer, une estimation à comprendre ou une question sur nos services : décrivez simplement votre besoin.</p><div className="contact-panel"><div className="contact-panel-head"><div><small>Contact direct</small><strong>VELYO · Genova</strong></div><ShieldCheck size={22} /></div><div className="contact-details"><a className="contact-primary" href={`mailto:${email}`}><span className="contact-icon"><Mail size={18} /></span><span><small>E-mail</small>{email}</span><ArrowUpRight size={17} /></a><div><span className="contact-icon"><MapPin size={18} /></span><span><small>Zone d’intervention</small>Genova, selon l’adresse et le besoin</span></div><div><span className="contact-icon"><Clock3 size={18} /></span><span><small>Réponse habituelle</small>Sous un jour ouvré</span></div></div><p className="contact-reassurance">Vos informations servent uniquement à répondre à cette demande.</p></div><div className="contact-feature-image" role="img" aria-label="Bien préparé par Velyo à Genova" /></div><div className="form-card"><p className="eyebrow">Écrivez-nous</p><LeadForm /><p className="form-privacy">Consultez notre <Link href="/privacy">politique de confidentialité</Link> pour connaître l’utilisation de vos données et vos droits.</p></div></div></section></>;
}
