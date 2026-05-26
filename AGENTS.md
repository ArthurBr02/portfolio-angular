# Instructions pour les Agents IA (AI Guidelines)

Bienvenue dans l'espace de documentation pour les assistants d'intelligence artificielle qui interviennent sur ce projet.

Ce projet est développé en pair-programming entre un humain et des IA avancées. Afin de garantir la cohérence du code, le respect des décisions architecturales et l'optimisation des tokens, nous avons défini des fichiers d'instructions spécifiques en fonction du modèle utilisé.

## 🧠 Contexte Global pour tous les Agents

Quel que soit le modèle, voici les règles d'or sur ce projet :

1. **Lisez les plans existants** : Ne prenez pas de décisions architecturales majeures sans avoir consulté `../IMPLEMENTATION_PLAN.md` et `../ETAT_DES_LIEUX.md`.
2. **Restez Minimaliste** : Le portfolio se veut épuré. N'ajoutez pas de bibliothèques tierces non prévues (comme Tailwind, Mongoose, ou Prisma) sans demander la permission explicite.
3. **Vanilla First** : Côté Frontend, nous privilégions le CSS vanilla (Custom Properties) plutôt qu'un framework. Côté Backend, nous utilisons `better-sqlite3` avec du SQL brut plutôt qu'un gros ORM.
4. **Zéro "Magic"** : Le code doit être explicite. Les erreurs sont gérées via un `errorHandler.ts` central et la validation est stricte (`Zod`).
5. **Suivi de Progression OBLIGATOIRE** : À chaque fois que vous complétez une fonctionnalité ou une phase majeure définie dans le projet, vous avez l'obligation absolue de mettre à jour le fichier `../progress.md` en cochant la tâche correspondante `[x]`.
6. Mise à jour du README.md. S'il y a des changements significatifs dans le projet, mettez à jour le README.md pour refléter ces changements.

---

# Instructions Spécifiques : Anthropic Claude

En tant que modèle Claude, votre point fort sur ce projet réside dans **la conception d'interfaces utilisateur, l'architecture Vue.js, et la maîtrise des animations CSS natives**.

## 🎨 Vos responsabilités (Frontend Focus)

Sur ce projet, vous interviendrez majoritairement sur le dossier `frontend/`.

### 1. Vue 3 & Pinia
- Utilisez l'**Options API** pour ce projet (choix technique délibéré pour ce portfolio, sauf consigne contraire).
- Gardez les composants `.vue` propres : un fichier = `<template>` en haut, `<script lang="ts">` au milieu, `<style scoped>` en bas.
- Appuyez-vous sur les stores `Pinia` pour la gestion d'état (ex: l'état des toggles du backoffice, l'authentification).

### 2. Styling (CSS Natif)
- **INTERDIT** : Tailwind CSS, Bootstrap, ou toute librairie UI lourde.
- **RECOMMANDÉ** : Utilisez systématiquement les variables CSS définies dans `:root` (`var(--color-accent)`, `var(--spacing-md)`, etc.).
- Pour les animations, utilisez l'API native `animation-timeline: view()` et `animation-timeline: scroll()` autant que possible au lieu du JavaScript (IntersectionObserver est autorisé en fallback ou pour des logiques d'UI).
- Veillez à la compatibilité de l'attribut `data-theme` qui est la pierre angulaire de notre système de thème dynamique.

### 3. Ton et Communication
- Vos réponses doivent être concises. Allez droit au but dans le code.
- Mettez toujours l'accent sur l'accessibilité (`prefers-reduced-motion`) et le minimalisme.
- S'il vous manque une donnée ou si un endpoint backend semble ne pas exister, consultez le fichier `IMPLEMENTATION_PLAN.md` ou demandez à l'utilisateur de s'en assurer.

---

# Instructions Spécifiques : Google Gemini

En tant que modèle Gemini, vous excellez dans **l'analyse globale du projet, l'orchestration du backend, et la manipulation complexe de la Clean Architecture**.

## ⚙️ Vos responsabilités (Backend & Système)

Sur ce projet, vous intervenez principalement sur l'environnement de développement global, les scripts bash, la base de données et le dossier `backend/`.

### 1. Backend (Express + SQLite)
- Respectez scrupuleusement la **Clean Architecture** :
  1. `Routes` : Seulement la définition des chemins et attachement des middlewares.
  2. `Controllers` : Récupération des données (`req.body`, `req.params`) et renvoi du JSON (`res.json`). Aucune logique métier complexe.
  3. `Services` : Là où réside la logique métier, les vérifications d'état, l'envoi d'e-mails. Lève des erreurs via `createError()`.
  4. `Models` : Unique couche en charge de communiquer avec `better-sqlite3`. Requêtes SQL synchrones (`.all()`, `.get()`, `.run()`).
- Assurez-vous de valider les données en entrée via **Zod** et le middleware `validate.ts`.

### 2. Base de Données (SQLite)
- Pas d'ORM lourd. Le SQL pur est privilégié.
- Pour chaque modification de schéma, veillez à créer un nouveau fichier de migration dans `backend/src/migrations/` en suivant l'ordre logique (ex: `003_add_new_table.sql`).
- La base SQLite s'exécute en mode `WAL` avec les clés étrangères activées (`PRAGMA foreign_keys = ON`).

### 3. Utilisation des Outils
- Avant de modifier un fichier métier profond, n'hésitez pas à faire appel à des commandes de recherche avancées (ex: `grep` sur le dossier `src/`) pour comprendre l'impact sur l'application complète.
- L'utilisateur s'attend à ce que vous soyez autonome pour relancer le serveur, utiliser `npm run dev` en tâche de fond, ou corriger de vous-même des erreurs Typescript.
