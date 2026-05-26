# Portfolio V2 — Vue 3 + Express.js

Ce projet est la version 2 de mon portfolio personnel. L'objectif est de proposer une interface minimaliste, moderne et épurée, tout en reposant sur une architecture back-end robuste (Clean Architecture).

## 🚀 Fonctionnalités Clés

- **Frontend Moderne** : Vue 3 (Options API) propulsé par Vite. Animations CSS natives fluides, sans l'encombrement de gros frameworks CSS.
- **Backend Clean Architecture** : Express.js, structuré en couches (Routes → Controllers → Services → Models).
- **Validation Forte** : Utilisation de **Zod** pour blinder les entrées utilisateur sur toutes les routes API.
- **Base de données Légère** : **SQLite** avec `better-sqlite3`, incluant un système de migrations custom au démarrage.
- **Multilingue (i18n)** : Traductions stockées statiquement (JSON) et en base de données pour une modification à la volée depuis l'espace d'administration.
- **Configuration Dynamique (Toggles)** : Un système permettant d'activer ou désactiver des sections entières du portfolio (Hero, Expériences, Projets, etc.) en un clic depuis le backoffice.
- **Thèmes Personnalisés** : Changement de l'ambiance globale du site via des thèmes pré-définis (Sable, Forêt, Crépuscule, Minuit).

---

## 📂 Structure du Monorepo

```
portfolio-3-vue-express/
├── backend/                  # API Express.js (Node 20+)
│   ├── src/
│   │   ├── config/           # Base de données, validations d'environnement
│   │   ├── controllers/      # Parsing des requêtes et réponses HTTP
│   │   ├── middleware/       # Auth (JWT), Rate limiting, Gestion d'erreurs
│   │   ├── migrations/       # Fichiers SQL (.sql) appliqués au lancement
│   │   ├── models/           # Requêtes SQL directes via better-sqlite3
│   │   ├── routes/           # Définition des endpoints Express
│   │   ├── services/         # Logique métier pure
│   │   └── index.ts          # Point d'entrée de l'application
│   ├── database.sqlite       # (Créé au démarrage) Base de données locale
│   └── uploads/              # (Créé au démarrage) Fichiers médias statiques
│
├── frontend/                 # Application SPA (Vue 3 + Vite) -- À venir
├── docs/                     # Documentation et instructions IA (agents.md)
├── start.sh                  # Script de développement (lance le front et le back)
├── ETAT_DES_LIEUX.md         # État initial de la migration V1 -> V2
└── IMPLEMENTATION_PLAN.md    # Cahier des charges technique
```

---

## 🛠 Prérequis et Démarrage Local

1. Assurez-vous d'avoir **Node.js (v20+)** installé.
2. Cloner le projet.
3. Le script de démarrage s'occupe de l'installation des dépendances :

```bash
chmod +x start.sh
./start.sh
```

**Note sur le Backend :**
Le fichier `backend/.env` sera créé à partir de `.env.example` s'il n'existe pas. Il contient les accès par défaut de l'administration (`admin` / `changeme123`).
Le backend est configuré pour appliquer automatiquement les migrations SQLite au démarrage.

---

## 🤖 Instructions IA

Ce projet inclut des instructions spécifiques pour faciliter le travail des agents d'intelligence artificielle lors du développement et de la maintenance :
👉 **Voir [AGENTS.md](AGENTS.md)**
