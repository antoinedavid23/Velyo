# Velyo — registre opérationnel de conformité

Ce document complète les pages publiques. Il doit être suivi par la personne qui exploite Velyo et revu à chaque changement de prestataire ou de formulaire.

## Avant chaque mise en production

- Renseigner dans l’environnement toutes les variables `LEGAL_*` documentées dans `.env.example`, en copiant les données exactes de la visura camerale.
- Ne jamais renseigner un numéro de téléphone, une dénomination ou un numéro d’immatriculation fictif. Laisser la variable vide jusqu’à attribution officielle.
- Vérifier que `NEXT_PUBLIC_EMAIL` est une adresse surveillée et que les demandes de droits peuvent y être reçues.
- Configurer `RESEND_API_KEY`, `CONTACT_RECIPIENT` et un `CONTACT_FROM` vérifié. Sans ces trois valeurs, les demandes restent enregistrées dans l’administration mais aucun e-mail d’alerte n’est envoyé.
- Vérifier les contrats de sous-traitance et DPA de Cloudflare et, si activé, Resend.
- Vérifier que le site public ne charge aucun traceur, pixel, analyse d’audience, vidéo ou carte tiers non documenté.
- Conserver un registre interne des traitements et limiter les accès administrateurs aux seules personnes autorisées.

## Tous les trois mois

- Exporter la liste des demandes et supprimer de la base celles dont la dernière activité utile dépasse `LEAD_RETENTION_MONTHS` (12 mois par défaut), sauf obligation légale ou contentieux identifié.
- Supprimer les copies devenues inutiles dans les boîtes e-mail et exports locaux.
- Contrôler les comptes administrateurs, renouveler les secrets compromis et retirer les anciens accès.
- Noter la date, la personne ayant effectué le contrôle et le nombre d’éléments supprimés dans le registre interne.

## Verrou de publication

En production, Velyo envoie automatiquement une directive `noindex` et bloque l’exploration dans `robots.txt` tant que l’identité légale complète et la livraison e-mail ne sont pas configurées. Ce verrou évite de référencer commercialement une version juridiquement ou opérationnellement incomplète. Il se lève automatiquement lorsque toutes les variables requises sont présentes au moment du build.

## Demande d’exercice de droits

1. Accuser réception rapidement et vérifier l’identité uniquement en cas de doute raisonnable.
2. Identifier les données dans la base de demandes, les e-mails et les éventuels dossiers contractuels.
3. Répondre en principe sous un mois ; documenter toute prolongation permise et son motif.
4. Rectifier, exporter, limiter ou supprimer selon le droit exercé et les exceptions légales applicables.
5. Conserver uniquement la preuve minimale du traitement de la demande.

## Incident de données

Documenter immédiatement la nature de l’incident, les personnes et données concernées, les mesures prises et le risque. En cas de risque pour les droits et libertés, évaluer la notification au Garante dans les 72 heures et l’information des personnes lorsque le risque est élevé.
