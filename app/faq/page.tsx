import { PageHero } from "@/components/PageHero";
import { faqs } from "@/data/content";

export const metadata = { title: "Questions fréquentes", description: "Les réponses aux questions fréquentes sur la gestion locative Velyo à Genova.", alternates: { canonical: "/faq" } };

export default function Page() {
  return <><PageHero label="Informations pratiques" title="Questions fréquentes" text="Retrouvez les réponses essentielles avant de confier votre bien à Velyo." image="/images/concierge/owner-conversation-premium.png" /><section className="section ivory"><div className="container faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section></>;
}
