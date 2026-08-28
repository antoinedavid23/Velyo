import { PageHero } from "@/components/PageHero";
import { faqs } from "@/data/content";
import { ItalianContent } from "@/components/ItalianContent";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata({ title: "FAQ gestione locativa a Genova", description: "Zones couvertes, revenus, ménage, maintenance, utilisation personnelle et démarrage : les réponses avant de confier votre bien à Velyo.", path: "/faq" });

export default function Page() {
  const structuredData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <ItalianContent><><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><PageHero label="Informations pratiques" title="Questions fréquentes" text="Retrouvez les réponses essentielles avant de confier votre bien à Velyo." image="/images/concierge/owner-conversation-premium.webp" /><section className="section ivory"><div className="container faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section></></ItalianContent>;
}
