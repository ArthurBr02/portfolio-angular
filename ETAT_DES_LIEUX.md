# État des Lieux et Plan de Migration V2

## 1. Objectif de la V2
La volonté est de **repartir de zéro** pour créer une version 2 du portfolio avec les caractéristiques suivantes :
- **Design épuré et moderne** (minimalisme, focus sur le contenu).
- **Expérience utilisateur fluide** grâce à des transitions de page et des micro-animations travaillées.
- **Migration technologique** : Remplacement d'Angular par **Vue.js** côté frontend.
- **Conservation de la logique métier** : Toutes les fonctionnalités actuelles (gestion de contenu, administration, multilingue) doivent être préservées et adaptées à la nouvelle stack.
- **NOUVEAUTÉ V2** : **Gestion dynamique des sections** - Possibilité d'activer ou de désactiver l'affichage de certaines rubriques du site (Ex: cacher la section "Éducation" ou "Projets") directement depuis le panel d'administration.

---

## 2. État Actuel (V1) - Ce qui existe et doit être préservé

### Fonctionnalités Métier
- **Interface Publique** :
  - Sections : Accueil (Hero), À propos, Compétences (par catégories avec icônes), Projets (grille avec filtres), Expérience (chronologie), Éducation, Contact.
  - Système multilingue (FR/EN) dynamique.
- **Interface d'Administration** :
  - Authentification sécurisée (JWT).
  - Tableaux de bord et formulaires de gestion CRUD pour toutes les entités (Projets, Expériences, etc.).
  - Éditeur de traductions en direct.
  - Gestion des informations de profil et statuts (ex: "Available for work").

### Architecture Actuelle
- **Frontend** : Angular 20 (Standalone Components), RxJS, CSS Custom.
- **Backend** : Node.js, Express.js.
- **Base de données** : SQLite (via des requêtes directes et un système de migration custom).
- **Services tiers** : Nodemailer (envoi d'emails via SMTP), Multer (upload de fichiers locaux).

### Faiblesses identifiées dans la V1 à corriger dans la V2
- *Backend* : Manque de validation stricte des données entrantes, requêtes SQL non sécurisées/optimisées, et absence de système de gestion d'erreurs centralisé. Code métier souvent mélangé dans les routes.
- *Frontend* : CSS Custom parfois lourd à maintenir, manque d'un store global solide.

---

## 3. Stratégie et Stack Technique pour la V2

### 🎨 Design & Animations (Le nouveau style "Épuré")
Pour atteindre un style minimaliste avec des animations de haute qualité, nous adopterons une approche hybride :
- **Framework CSS** : **Tailwind CSS** pour une structuration rapide, cohérente et épurée (utilisation massive des espaces blancs, typographie fine).
- **Animations** : Intégration de **Motion for Vue** (équivalent de Framer Motion) ou **GSAP** pour des animations d'entrée de composants et des transitions de pages fluides (View Transitions API).
- **Composants UI** : Utilisation sélective de bibliothèques modernes (ex: Radix Vue ou des composants inspirés de Shadcn/Magic UI) pour des éléments interactifs sans surcharger le design.

### 💻 Frontend : Migration vers Vue.js
- **Framework** : **Vue 3** (Options API).
- **Outil de build** : **Vite** pour des performances de développement optimales.
- **Routage** : Vue Router, avec configuration des transitions de route.
- **Gestion d'état** : **Pinia** (remplace les Signals/Services complexes d'Angular) pour gérer l'état global (authentification, traductions dynamiques, données du portfolio, **et visibilité des sections**).
- **Internationalisation** : Vue I18n ou équivalent, adapté pour conserver le rechargement dynamique des traductions depuis l'API.

### ⚙️ Backend : Express.js "Clean Architecture"
Bien que nous gardions Express et SQLite, le backend V2 sera restructuré et renforcé :
- **Architecture** : Séparation claire en Couches (Routes ➔ Contrôleurs ➔ Services ➔ Modèles/Base de données).
- **Nouvelle Entité "Settings"** : Création d'une table ou extension de la table utilisateur pour stocker la configuration globale du site (ex: `is_education_enabled: boolean`, `is_projects_enabled: boolean`, etc.).
- **Validation** : Intégration de **Zod** pour blinder les entrées utilisateur et les requêtes.
- **Sécurité** : Mise en place de Helmet, rate-limiting, et configuration stricte des CORS.
- **Base de données** : Conservation de SQLite avec ajout d'une nouvelle migration pour la table de configuration des sections.

---

## 4. Plan d'Implémentation Recommandé

1. **Initialisation (Phase 1)**
   - Création de la structure du nouveau monorepo V2 (ou remplacement des dossiers existants).
   - Refactoring du Backend (mise en place de la nouvelle architecture Express, ajout de Zod).
   - **Migration DB** : Ajout de la table de configuration pour l'activation/désactivation des rubriques.
2. **Développement du Socle Vue.js (Phase 2)**
   - Initialisation Vite + Vue 3 + Tailwind CSS.
   - Mise en place du routing, de Pinia et du layout de base.
3. **Reconstruction de l'Interface Publique (Phase 3)**
   - Intégration du design épuré section par section (Hero, Projets, Expériences).
   - Implémentation du rendu conditionnel des sections (`v-if`) basé sur la configuration récupérée via l'API.
   - Implémentation des animations d'entrée et transitions (Motion for Vue/GSAP).
4. **Système Multilingue (Phase 4)**
   - Adaptation du système de traduction dynamique existant vers l'écosystème Vue.js.
5. **Reconstruction de l'Admin (Phase 5)**
   - Formulaires de connexion, protection des routes.
   - Panels CRUD avec une interface claire, minimaliste et animée.
   - **Nouvel onglet "Configuration du site"** : Switchers (toggles) pour activer/désactiver les rubriques du site public en temps réel.
