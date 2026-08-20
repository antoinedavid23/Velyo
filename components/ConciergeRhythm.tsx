import Image from "next/image";
import { Check } from "lucide-react";

const moments = [
  {
    number: "01",
    timing: "Tout est prêt",
    title: "Le bien est prêt à recevoir",
    text: "Avant l’arrivée, nous contrôlons le bien, préparons le linge, vérifions les accès et transmettons toutes les informations utiles.",
    points: ["Ménage contrôlé", "Linge et essentiels en place", "Accès et consignes vérifiés"],
    image: "/images/concierge/home-preparation-premium.png",
    imageAlt: "Préparation attentive du linge dans un bien à Genova",
  },
  {
    number: "02",
    timing: "La location est gérée",
    title: "Nous suivons tout le séjour",
    text: "De l’arrivée au départ, Velyo répond aux voyageurs, coordonne les demandes et fait avancer les éventuels imprévus sur place.",
    points: ["Arrivée accompagnée", "Voyageurs suivis", "Imprévus pris en charge"],
    image: "/images/concierge/welcome-family-premium.png",
    imageAlt: "Accueil de voyageurs dans un bien à Genova",
  },
  {
    number: "03",
    timing: "Le bien repart à zéro",
    title: "Nous préparons le prochain séjour",
    text: "Après le départ, le bien est nettoyé, contrôlé et réapprovisionné. Tout écart est traité avant d’accueillir les voyageurs suivants.",
    points: ["Ménage et linge renouvelés", "État du bien vérifié", "Prochaine arrivée préparée"],
    image: "/images/concierge/housekeeping-premium.png",
    imageAlt: "Contrôle d'une chambre préparée après un séjour",
  },
];

export function ConciergeRhythm() {
  return (
    <div className="concierge-rhythm-static">
      <div className="concierge-rhythm-static-grid">
        {moments.map((moment) => (
          <article className="concierge-rhythm-static-card" key={moment.number}>
            <div className="concierge-rhythm-static-media">
              <Image src={moment.image} alt={moment.imageAlt} fill sizes="(max-width: 760px) 100vw, 33vw" />
              <span>{moment.number}</span>
            </div>
            <div className="concierge-rhythm-static-copy">
              <p>{moment.timing}</p>
              <h3>{moment.title}</h3>
              <span>{moment.text}</span>
              <ul>{moment.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
      <p className="concierge-rhythm-static-note">À chaque réservation, le même cycle recommence : préparer, gérer, contrôler, puis remettre le bien en état pour la suite.</p>
    </div>
  );
}
