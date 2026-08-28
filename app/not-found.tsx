import Link from "next/link";
import { ItalianContent } from "@/components/ItalianContent";

export default function NotFound() {
  return <ItalianContent><section className="hero"><div className="container hero-content"><p className="eyebrow">Erreur 404</p><h1>Cette page n’est pas disponible.</h1><Link className="button" href="/">Retour à l’accueil</Link></div></section></ItalianContent>;
}
