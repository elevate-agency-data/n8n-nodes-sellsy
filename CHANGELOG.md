# Changelog

## 0.1.0

Première version.

- Credential `Sellsy OAuth2 API` : accès API **Personnel** Sellsy (OAuth2 client credentials),
  testé sur `GET /scopes`. Les types d'accès "Privé" (authorization code + PKCE) et "Public"
  (partenaires) ne sont pas pris en charge.
- Couverture complète de l'API Sellsy v2 (spec 2.303.0) : **423 opérations** réparties en 54 ressources
  dans un seul nœud **Sellsy** (CRM, documents de vente, catalogue, comptabilité, administration).
- **Sellsy Trigger** : s'abonne aux événements Sellsy (webhook créé à l'activation, liste des
  événements chargée depuis `GET /webhooks/events`).
- Pagination "seek" de Sellsy (l'offset renvoyé désigne la page suivante) gérée par une fonction
  dédiée : Return All conserve les autres paramètres (embed, field, filtres).
- Corps JSON vide envoyé explicitement (`{}`) : n8n supprime un corps vide et Sellsy refuse alors
  la requête ("contenu invalide").
- Envoi de fichiers (multipart) depuis une donnée binaire n8n.
- Le nœud Sellsy est utilisable comme outil d'agent IA (`usableAsTool`).
- Testé sur un compte d'essai Sellsy (Test Book) : 423 lignes sur 424 validées, dont 264 en
  succès réel ; l'activation de la conformité de facturation électronique n'a pas été appelée.
