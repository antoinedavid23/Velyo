# Velyo Property Manager

Site officiel multi-pages de Velyo Property Manager, dédié à la gestion locative courte durée à Genova. Le projet réunit le site public, le simulateur, les formulaires, le catalogue de propriétés de démonstration et l’architecture d’administration.

## Direction Velyo

- sans vidéo dans le hero ;
- paysages liés à Genova ;
- palette de marque accessible : bleu `#1F5FBF`, bleu profond `#123A66`, encre `#172033`, bleu pâle `#EAF2FF`, fond `#F7FAFE` et blanc ;
- architecture claire en grilles de service, cartes lisibles et parcours directs ;
- Montserrat pour les titres et Lato pour les textes ;
- langage plus direct et orienté service ;
- expériences locales liées à Genova ;
- propriétés de démonstration clairement identifiées.

## Démarrage

```bash
npm ci
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Routes principales

- `/`
- `/servizi` et `/servizi/[slug]`
- `/esperienze` et `/esperienze/[slug]`
- `/proprietari`
- `/proprieta` et `/proprieta/[slug]`
- `/simulatore`
- `/chi-siamo`
- `/contatti`
- `/valutazione`
- `/faq`
- `/connexion`
- administration, API et pages légales.
