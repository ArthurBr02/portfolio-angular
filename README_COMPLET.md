# 🎨 Portfolio Full-Stack - Documentation Complète

> **Dernière mise à jour:** 13 décembre 2025  
> **Version:** 2.0  
> **Modifications récentes:** Système d'internationalisation avec rechargement dynamique des traductions

[![Angular](https://img.shields.io/badge/Angular-20.3-DD0031?logo=angular)](https://angular.io/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)](https://www.sqlite.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)

Application portfolio moderne et complète avec interface d'administration, système d'authentification, gestion multilingue et formulaire de contact.

---

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [API Documentation](#-api-documentation)
- [Internationalisation](#-internationalisation)
- [Déploiement](#-déploiement)
- [Développement](#-développement)

---

## 🎯 Vue d'ensemble

Cette application portfolio est conçue pour permettre aux développeurs de présenter leurs compétences, projets et expériences de manière professionnelle. Elle inclut un panneau d'administration complet pour gérer tout le contenu sans toucher au code.

### Technologies utilisées

**Frontend:**
- Angular 20 (Standalone Components)
- TypeScript
- RxJS (Signals & Observables)
- CSS3 avec animations

**Backend:**
- Node.js + Express.js
- SQLite (base de données)
- JWT (authentification)
- Multer (upload de fichiers)
- Nodemailer (envoi d'emails)

---

## ✨ Fonctionnalités

### 🌐 Interface Publique

#### 1. **Page d'accueil (Hero)**
- Section hero avec photo de profil
- Nom, titre et description personnalisables
- Liens vers réseaux sociaux (GitHub, LinkedIn, Twitter, Instagram)
- Badge "Disponible pour travailler" configurable
- Statistiques dynamiques :
  - Années d'expérience (calculées automatiquement)
  - Nombre de projets
  - Nombre de technologies maîtrisées
  - Nombre de clients/entreprises

#### 2. **Section À propos**
- Description détaillée du profil
- Informations personnelles
- Présentation des compétences

#### 3. **Section Projets**
- Affichage en grille responsive des projets
- Chaque projet contient :
  - Image de présentation
  - Titre et description
  - Liste des technologies utilisées
  - Lien vers le projet/démo
- Filtrage par technologie
- Animation au survol

#### 4. **Section Expérience professionnelle**
- Timeline chronologique inversée
- Pour chaque expérience :
  - Poste occupé
  - Entreprise
  - Période (dates de début et fin)
  - Description des responsabilités
- Calcul automatique de la durée

#### 5. **Section Éducation**
- Parcours académique complet
- Pour chaque formation :
  - Institution/École
  - Diplôme obtenu
  - Dates
  - Description

#### 6. **Section Compétences (Skills)**
- Organisation par catégories (Frontend, Backend, DevOps, etc.)
- Icônes personnalisables pour chaque catégorie
- Liste des technologies par catégorie
- Affichage visuel attractif

#### 7. **Formulaire de contact**
- Formulaire avec validation
- Champs : Nom, Email, Message
- Envoi par email via SMTP
- Messages de confirmation/erreur
- Protection contre le spam (validation côté serveur)

#### 8. **Système multilingue**
- Sélecteur de langue (EN/FR)
- Traduction complète de l'interface
- Persistance de la langue sélectionnée
- Facilement extensible à d'autres langues

#### 9. **Design Responsive**
- Adaptation mobile, tablette, desktop
- Menu hamburger sur mobile
- Grilles adaptatives
- Images optimisées

---

### 🔐 Interface d'Administration

Accessible via `/admin` après authentification.

#### 1. **Authentification**
- Page de login (`/login`)
- Système JWT avec tokens
- Session persistante
- Protection des routes admin
- Déconnexion sécurisée

#### 2. **Dashboard Admin**
- Vue d'ensemble des statistiques
- Accès rapide aux différentes sections
- Résumé du contenu

#### 3. **Gestion du Profil**
- Modification des informations personnelles :
  - Prénom, Nom, Âge
  - Email
  - Liens réseaux sociaux
  - Photo de profil (upload)
  - Statut "Disponible pour travailler"
- Aperçu en temps réel
- Sauvegarde avec confirmation

#### 4. **Gestion des Projets**
- Liste complète des projets
- Ajout de nouveau projet :
  - Titre
  - Description
  - Image (upload ou URL)
  - Technologies (tags)
  - Lien vers le projet
- Modification des projets existants
- Suppression avec confirmation
- Prévisualisation

#### 5. **Gestion de l'Expérience**
- CRUD complet pour les expériences professionnelles
- Ajout d'expérience :
  - Entreprise
  - Poste
  - Date de début
  - Date de fin (ou "En cours")
  - Description détaillée
- Modification et suppression

#### 6. **Gestion de l'Éducation**
- CRUD complet pour le parcours académique
- Ajout de formation :
  - Institution
  - Diplôme
  - Dates
  - Description
- Organisation chronologique

#### 7. **Gestion des Compétences**
- Création de catégories de compétences
- Pour chaque catégorie :
  - Nom de la catégorie
  - Icône (upload d'image ou SVG)
  - Liste de compétences
- Modification et suppression de catégories
- Réorganisation

#### 8. **Gestion des Traductions**
- Interface dédiée pour éditer les traductions
- Visualisation côte à côte EN/FR
- **Modification en temps réel sans rafraîchissement**
- Modification des textes :
  - Navigation
  - Sections du site
  - Messages de l'admin
  - Formulaires
  - Messages de succès/erreur
  - Confirmations
- Export/Import des traductions (JSON)
- Ajout de nouvelles clés de traduction
- Navigation par sections
- **Rechargement automatique** après sauvegarde
- Toutes les chaînes visibles sont traduites (aucun texte en dur)

---

### 🗄️ Backend & API

#### 1. **Système de migrations**
- Migrations versionnées pour la base de données
- Scripts de gestion :
  - `npm run db:migrate` - Exécuter les migrations
  - `npm run db:rollback` - Annuler la dernière migration
  - `npm run db:reset` - Réinitialiser la DB
  - `npm run db:status` - État des migrations
  - `npm run db:seed` - Données de démonstration

#### 2. **API RESTful complète**
- Endpoints organisés par ressource
- Authentification JWT pour les routes protégées
- Gestion des erreurs standardisée
- Upload de fichiers avec Multer

#### 3. **Base de données SQLite**
- Légère et portable
- Schéma complet :
  - `users` - Utilisateurs/Admin
  - `projects` - Projets
  - `experience` - Expériences professionnelles
  - `education` - Formations
  - `skill_categories` - Catégories de compétences
  - `migrations` - Historique des migrations

#### 4. **Gestion des fichiers**
- Upload d'images pour :
  - Photo de profil
  - Images de projets
  - Icônes de compétences
- Stockage dans le répertoire `uploads/`
- Accès via route statique `/uploads/*`

#### 5. **Système d'emails**
- Configuration SMTP flexible
- Support de multiples fournisseurs :
  - Gmail
  - Outlook
  - Yahoo
  - Serveurs SMTP personnalisés
- Template HTML professionnel pour les emails
- Gestion des erreurs d'envoi

---

## 🏗️ Architecture

### Structure du projet

```
portfolio-3-vue-express/
│
├── backend/                      # Serveur Express.js
│   ├── db/                       # Module de base de données
│   │   ├── index.js              # Connexion et initialisation
│   │   └── migrator.js           # Système de migrations
│   │
│   ├── middleware/               # Middleware personnalisés
│   │   └── auth.js               # Authentification JWT
│   │
│   ├── migrations/               # Migrations de base de données
│   │   ├── 001_initial_schema.js
│   │   ├── 002_add_available_for_work.js
│   │   └── index.js
│   │
│   ├── routes/                   # Routes API
│   │   ├── api.js                # Routes principales
│   │   └── auth.js               # Routes d'authentification
│   │
│   ├── scripts/                  # Scripts utilitaires
│   │   ├── migrate.js            # CLI de migration
│   │   └── seed.js               # Données de test
│   │
│   ├── uploads/                  # Fichiers uploadés
│   │
│   ├── .env.example              # Variables d'environnement exemple
│   ├── database.js               # (Legacy) Export DB
│   ├── mailer.js                 # Configuration email
│   ├── package.json
│   └── server.js                 # Point d'entrée du serveur
│
├── frontend/                     # Application Angular
│   ├── public/                   # Assets statiques
│   │   └── flags/                # Drapeaux pour sélecteur de langue
│   │
│   ├── scripts/                  # Scripts de build
│   │   └── generate-env.js       # Génération fichiers d'environnement
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/       # Composants réutilisables
│   │   │   │   ├── about/        # Section À propos
│   │   │   │   ├── admin-layout/ # Layout admin
│   │   │   │   ├── admin-page-header/
│   │   │   │   ├── contact/      # Formulaire de contact
│   │   │   │   ├── delete-confirmation-modal/
│   │   │   │   ├── education/    # Section Éducation
│   │   │   │   ├── experience/   # Section Expérience
│   │   │   │   ├── footer/       # Pied de page
│   │   │   │   ├── hero/         # Section hero
│   │   │   │   ├── language-switcher/
│   │   │   │   ├── login/        # Page de login
│   │   │   │   ├── navbar/       # Navigation
│   │   │   │   ├── projects/     # Section Projets
│   │   │   │   ├── shared/       # Composants partagés
│   │   │   │   │   ├── toast-container/
│   │   │   │   │   └── toast/
│   │   │   │   ├── skills/       # Section Compétences
│   │   │   │   ├── stat-card/    # Cartes de statistiques
│   │   │   │   └── validation-error/
│   │   │   │
│   │   │   ├── core/             # Modèles et pipes
│   │   │   │   ├── models/
│   │   │   │   │   ├── education.model.ts
│   │   │   │   │   ├── experience.model.ts
│   │   │   │   │   ├── portfolio.models.ts
│   │   │   │   │   └── project.model.ts
│   │   │   │   └── pipes/
│   │   │   │       └── translate.pipe.ts
│   │   │   │
│   │   │   ├── guards/           # Guards de route
│   │   │   │   └── auth.guard.ts
│   │   │   │
│   │   │   ├── i18n/             # Traductions
│   │   │   │   ├── en.ts         # Anglais
│   │   │   │   └── fr.ts         # Français
│   │   │   │
│   │   │   ├── interceptors/     # Intercepteurs HTTP
│   │   │   │   └── auth.interceptor.ts
│   │   │   │
│   │   │   ├── pages/            # Pages principales
│   │   │   │   ├── admin-dashboard/
│   │   │   │   ├── admin-education/
│   │   │   │   ├── admin-experience/
│   │   │   │   ├── admin-profile/
│   │   │   │   ├── admin-projects/
│   │   │   │   ├── admin-skills/
│   │   │   │   ├── admin-translations/
│   │   │   │   ├── home/         # Page d'accueil publique
│   │   │   │   └── admin-shared.css
│   │   │   │
│   │   │   ├── services/         # Services Angular
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── contact.service.ts
│   │   │   │   ├── education.service.ts
│   │   │   │   ├── experience.service.ts
│   │   │   │   ├── portfolio.service.ts
│   │   │   │   ├── profile.service.ts
│   │   │   │   ├── project.service.ts
│   │   │   │   ├── skill.service.ts
│   │   │   │   ├── toast.service.ts
│   │   │   │   ├── translation-admin.service.ts
│   │   │   │   └── translation.service.ts
│   │   │   │
│   │   │   ├── app.config.ts     # Configuration Angular
│   │   │   ├── app.routes.ts     # Routes
│   │   │   └── app.ts            # Composant racine
│   │   │
│   │   ├── environments/         # Configuration environnement
│   │   │   ├── environment.ts    # Dev
│   │   │   └── environment.prod.ts # Production
│   │   │
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   │
│   ├── .env                      # Variables d'env frontend
│   ├── env.example               # Exemple de configuration
│   ├── angular.json              # Configuration Angular
│   ├── package.json
│   ├── tsconfig.json
│   │
│   └── Documentation/            # Documentation utilisateur
│       ├── PORTFOLIO_CUSTOMIZATION.md
│       ├── QUICK_START.md
│       ├── TRANSLATION_GUIDE.md
│       └── VALIDATION_GUIDE.md
│
├── README.md                     # Documentation principale
└── CODE_ANALYSIS.md              # Analyse du code
```

### Architecture technique

#### Frontend (Angular)

**Pattern: Component-Based Architecture avec Signals**

```
┌─────────────────────────────────────────┐
│           App Component                 │
│         (RouterOutlet)                  │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐      ┌────▼────────┐
│  Home  │      │   Admin     │
│  Page  │      │   Layout    │
└───┬────┘      └────┬────────┘
    │                │
    │    ┌───────────┴───────────┐
    │    │                       │
┌───▼────▼───┐            ┌─────▼──────┐
│ Components │            │ Admin Pages │
│  (Public)  │            │             │
└────────────┘            └─────────────┘
```

**Services et Gestion d'état:**

- **Signals** pour la réactivité locale
- **Services** injectables pour la logique métier
- **HTTP Client** pour les appels API
- **Intercepteurs** pour l'authentification automatique

#### Backend (Express.js)

**Pattern: Layered Architecture**

```
┌─────────────────────────────────────┐
│         Express Server              │
│     (Middleware Pipeline)           │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐      ┌────▼─────┐
│  CORS  │      │   Auth   │
│  JSON  │      │  Verify  │
└───┬────┘      └────┬─────┘
    │                │
    └────────┬───────┘
             │
    ┌────────▼────────┐
    │     Routes      │
    │  /api  /auth    │
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │   Controllers   │
    │  (Route Logic)  │
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │    Database     │
    │    (SQLite)     │
    └─────────────────┘
```

---

## 🚀 Installation

### Prérequis

- **Node.js** version 18 ou supérieure
- **npm** version 8 ou supérieure
- **Git** (pour cloner le projet)

### Étapes d'installation

#### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/portfolio-3-vue-express.git
cd portfolio-3-vue-express
```

#### 2. Installation Backend

```bash
cd backend
npm install
```

#### 3. Installation Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

#### 1. Créer le fichier `.env`

```bash
cd backend
cp .env.example .env
```

#### 2. Éditer les variables d'environnement

```env
# Port du serveur
PORT=3000

# Base de données
DB_PATH=./database.sqlite

# Sécurité JWT
JWT_SECRET=votre-secret-jwt-tres-long-et-securise-changez-moi-en-production

# Répertoire des uploads
UPLOAD_DIR=uploads

# Configuration Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
EMAIL_FROM=votre-email@gmail.com
EMAIL_TO=votre-email@gmail.com
```

#### 3. Configuration Gmail (si utilisé)

Pour utiliser Gmail, vous devez créer un **mot de passe d'application**:

1. Allez dans votre compte Google
2. Sécurité → Validation en 2 étapes (activez-la si nécessaire)
3. Mots de passe des applications
4. Créez un nouveau mot de passe pour "Mail"
5. Copiez le mot de passe généré dans `SMTP_PASS`

📖 **Documentation complète:** [EMAIL_SETUP.md](backend/EMAIL_SETUP.md)

#### 4. Initialiser la base de données

```bash
# Exécuter les migrations
npm run db:migrate

# (Optionnel) Ajouter des données de test
npm run db:seed
```

### Frontend Configuration

#### 1. Créer le fichier `.env`

```bash
cd frontend
cp env.example .env
```

#### 2. Configurer les URLs de l'API

```env
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api
AUTH_URL=http://localhost:3000/auth
```

> **Note:** Le script `generate-env.js` convertit automatiquement ces variables en fichiers TypeScript au démarrage.

---

## 🎮 Utilisation

### Démarrer l'application

#### Mode Développement

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Serveur disponible sur `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Application disponible sur `http://localhost:4200`

#### Accès à l'application

- **Site public:** http://localhost:4200
- **Admin:** http://localhost:4200/admin
- **Login:** http://localhost:4200/login

### Créer le premier utilisateur admin

Après avoir exécuté les migrations et le seed :

**Identifiants par défaut:**
- Username: `admin`
- Password: `admin123`

> ⚠️ **Important:** Changez ce mot de passe immédiatement après la première connexion.

### Personnaliser le portfolio

#### 1. Se connecter à l'admin

Naviguez vers `/login` et connectez-vous avec vos identifiants.

#### 2. Configurer votre profil

- Allez dans **Admin → Profile**
- Remplissez vos informations :
  - Prénom, Nom, Âge
  - Email de contact
  - Liens réseaux sociaux
  - Uploadez votre photo de profil
- Cochez "Disponible pour travailler" si nécessaire
- Cliquez sur **Save Changes**

#### 3. Ajouter vos projets

- Allez dans **Admin → Projects**
- Cliquez sur **Add New Project**
- Remplissez :
  - Titre du projet
  - Description
  - Technologies (séparées par des virgules)
  - URL du projet
  - Image (upload ou URL)
- Enregistrez

#### 4. Ajouter votre expérience

- Allez dans **Admin → Experience**
- Ajoutez vos expériences professionnelles
- Les années d'expérience seront calculées automatiquement

#### 5. Ajouter votre éducation

- Allez dans **Admin → Education**
- Ajoutez vos formations et diplômes

#### 6. Configurer vos compétences

- Allez dans **Admin → Skills**
- Créez des catégories (Frontend, Backend, DevOps, etc.)
- Ajoutez les technologies dans chaque catégorie
- Uploadez des icônes personnalisées

#### 7. Personnaliser les traductions

- Allez dans **Admin → Translations**
- Modifiez les textes en anglais et français
- Sauvegardez pour chaque langue

---

## 📡 API Documentation

### Authentification

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

#### Vérifier le token
```http
GET /auth/verify
Authorization: Bearer {token}

Response:
{
  "valid": true,
  "user": { ... }
}
```

### Endpoints Publics (sans authentification)

#### Récupérer les projets
```http
GET /api/projects

Response:
[
  {
    "id": 1,
    "title": "Mon Projet",
    "description": "Description du projet",
    "imageUrl": "/uploads/1234567890.jpg",
    "link": "https://github.com/...",
    "technologies": "React, Node.js, MongoDB"
  }
]
```

#### Récupérer les expériences
```http
GET /api/experience

Response:
[
  {
    "id": 1,
    "company": "Entreprise XYZ",
    "position": "Développeur Full Stack",
    "startDate": "2020-01",
    "endDate": "2023-06",
    "description": "Description du poste"
  }
]
```

#### Récupérer l'éducation
```http
GET /api/education
```

#### Récupérer le profil public
```http
GET /api/user

Response:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "instagram": "https://instagram.com/johndoe",
  "profilePicture": "/uploads/profile.jpg",
  "availableForWork": true
}
```

#### Récupérer les compétences
```http
GET /api/skill-categories

Response:
[
  {
    "id": 1,
    "name": "Frontend",
    "icon": "/uploads/frontend-icon.png",
    "skills": ["React", "Angular", "Vue.js"]
  }
]
```

#### Envoyer un message de contact
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Votre message ici"
}

Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

### Endpoints Protégés (authentification requise)

#### Créer un projet
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: multipart/form-data

title: Mon nouveau projet
description: Description...
technologies: React, Node.js
link: https://...
image: (fichier)
```

#### Supprimer un projet
```http
DELETE /api/projects/:id
Authorization: Bearer {token}
```

#### Mettre à jour le profil
```http
PUT /api/profile
Authorization: Bearer {token}
Content-Type: multipart/form-data

firstName: John
lastName: Doe
email: john@example.com
github: https://github.com/johndoe
linkedin: https://linkedin.com/in/johndoe
availableForWork: 1
profilePicture: (fichier optionnel)
```

#### Gérer les traductions
```http
GET /api/translations/:lang
Authorization: Bearer {token}

PUT /api/translations/:lang
Authorization: Bearer {token}
Content-Type: application/json

{
  "translations": {
    "common": {
      "home": "Accueil",
      ...
    },
    ...
  }
}
```

---

## 🌍 Internationalisation

### Système de traduction dynamique

L'application dispose d'un système d'internationalisation avancé avec :
- ✅ **Rechargement dynamique** des traductions sans rafraîchissement
- ✅ **Interface d'administration** pour éditer les traductions
- ✅ **Tous les textes sont traduits** (aucun texte en dur)
- ✅ **Support des paramètres** dans les traductions

### Langues disponibles

- 🇬🇧 Anglais (`en`)
- 🇫🇷 Français (`fr`)

### Ajouter une nouvelle langue

#### 1. Créer le fichier de traduction

```typescript
// frontend/src/app/i18n/es.ts
import { TranslationData } from '../services/translation.service';

export const es: TranslationData = {
    common: {
        home: 'Inicio',
        about: 'Acerca de',
        // ...
    },
    // ...
};
```

#### 2. Mettre à jour le service de traduction

```typescript
// frontend/src/app/services/translation.service.ts
export type Language = 'en' | 'fr' | 'es'; // Ajouter 'es'

// Importer la nouvelle traduction
import { es } from '../i18n/es';

const translations: Record<Language, TranslationData> = {
    en,
    fr,
    es // Ajouter ici
};
```

#### 3. Ajouter le drapeau

Ajoutez le fichier `es.svg` dans `frontend/public/flags/`

### Utiliser les traductions dans les composants

```typescript
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    imports: [TranslatePipe],
    template: `
        <h1>{{ 'common.welcome' | translate }}</h1>
        <p>{{ 'about.description' | translate }}</p>
        
        <!-- Avec paramètres -->
        <p>{{ 'validation.required' | translate: {field: 'Email'} }}</p>
    `
})
export class MyComponent {}
```

### Édition des traductions via l'interface admin

1. Connectez-vous au panneau d'administration
2. Accédez à **Translations** dans le menu
3. Recherchez et modifiez les traductions souhaitées
4. Cliquez sur **Save All Changes**
5. Les changements sont **immédiatement appliqués** sans rafraîchissement

### Architecture technique

```typescript
// Flux de rechargement dynamique
TranslationService.reloadTranslations()
  → Appel API GET /api/translations/en et /api/translations/fr
  → Mise à jour des traductions en mémoire
  → Toutes les vues utilisent automatiquement les nouvelles traductions
```

**Avantages:**
- ✅ Pas besoin de rebuild l'application
- ✅ Changements visibles immédiatement
- ✅ Aucune perte de données ou de session
- ✅ Expérience utilisateur fluide

📖 **Guides complets:** 
- [TRANSLATION_GUIDE.md](frontend/TRANSLATION_GUIDE.md)
- [TRANSLATION_README.md](frontend/TRANSLATION_README.md)

---

## 🚢 Déploiement

### Build pour la production

#### Frontend

```bash
cd frontend
npm run build
```

Les fichiers sont générés dans `frontend/dist/portfolio/browser/`

#### Backend

Le backend ne nécessite pas de build spécifique, mais assurez-vous :

1. De configurer correctement le fichier `.env`
2. D'exécuter les migrations : `npm run db:migrate`
3. De démarrer avec : `npm start`

### Déploiement sur serveur

#### Option 1: Serveur VPS (Ubuntu)

**1. Installer Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2. Installer PM2 (Process Manager)**
```bash
sudo npm install -g pm2
```

**3. Cloner et configurer**
```bash
git clone https://github.com/votre-repo/portfolio.git
cd portfolio

# Backend
cd backend
npm install --production
cp .env.example .env
# Éditer .env avec les vraies valeurs
npm run db:migrate

# Démarrer avec PM2
pm2 start server.js --name "portfolio-api"
pm2 save
pm2 startup

# Frontend
cd ../frontend
npm install
npm run build
```

**4. Configurer Nginx**

```nginx
# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name votredomaine.com;

    # Frontend
    location / {
        root /chemin/vers/portfolio/frontend/dist/portfolio/browser;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /auth {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        proxy_pass http://localhost:3000;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**5. Configurer SSL avec Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votredomaine.com
```

#### Option 2: Heroku

**Backend:**
```bash
cd backend
heroku create mon-portfolio-api
heroku addons:create heroku-postgresql:mini
heroku config:set JWT_SECRET="votre-secret"
# ... autres variables
git push heroku main
```

**Frontend:**
Buildez localement et déployez sur un CDN (Vercel, Netlify, etc.)

#### Option 3: Vercel (Frontend) + Heroku (Backend)

**Frontend sur Vercel:**
```bash
cd frontend
vercel
```

**Backend sur Heroku** (voir ci-dessus)

Mettez à jour `frontend/.env` avec l'URL Heroku de votre API.

### Checklist de sécurité avant déploiement

- [ ] Changer le mot de passe admin par défaut
- [ ] Utiliser un JWT_SECRET fort et unique
- [ ] Configurer CORS avec les domaines spécifiques
- [ ] Activer HTTPS
- [ ] Sauvegarder régulièrement la base de données
- [ ] Configurer les logs de production
- [ ] Limiter la taille des uploads
- [ ] Configurer un reverse proxy (Nginx)
- [ ] Activer le rate limiting
- [ ] Vérifier que `.env` n'est pas dans git

---

## 🛠️ Développement

### Scripts disponibles

#### Backend

```bash
npm start          # Démarrer le serveur
npm run dev        # Mode développement avec watch
npm run db:migrate # Exécuter les migrations
npm run db:rollback # Annuler la dernière migration
npm run db:reset   # Réinitialiser la DB
npm run db:status  # Statut des migrations
npm run db:seed    # Données de test
```

#### Frontend

```bash
npm start          # Serveur de développement (port 4200)
npm run build      # Build de production
npm run watch      # Build en mode watch
npm test           # Tests unitaires
```

### Créer une nouvelle migration

```bash
cd backend
# Créer un nouveau fichier dans migrations/
# Exemple: 003_add_new_field.js
```

```javascript
module.exports = {
    name: '003_add_new_field',
    
    up: (db) => {
        return new Promise((resolve, reject) => {
            db.run(`ALTER TABLE users ADD COLUMN phone TEXT`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    down: (db) => {
        return new Promise((resolve, reject) => {
            // SQLite ne supporte pas DROP COLUMN facilement
            // Recréer la table sans la colonne
            resolve();
        });
    }
};
```

Puis exécutez:
```bash
npm run db:migrate
```

### Ajouter un nouveau composant

```bash
cd frontend/src/app/components
mkdir mon-composant
cd mon-composant

# Créer les fichiers
touch mon-composant.ts
touch mon-composant.html
touch mon-composant.css
```

```typescript
// mon-composant.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mon-composant',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mon-composant.html',
    styleUrls: ['./mon-composant.css']
})
export class MonComposant {
    // Votre logique ici
}
```

### Debug

#### Backend

Utilisez les logs console ou ajoutez un debugger:

```javascript
console.log('Debug:', variable);
debugger; // Point d'arrêt
```

Ou lancez avec Node Inspector:
```bash
node --inspect server.js
```

#### Frontend

Dans Chrome DevTools:
- Onglet **Sources** pour les breakpoints
- Onglet **Network** pour les requêtes HTTP
- **Angular DevTools** (extension Chrome)

### Best Practices

1. **Commits Git:**
   - Messages clairs et descriptifs
   - Commits atomiques
   - Utiliser des branches pour les features

2. **Code Style:**
   - Indentation: 4 espaces
   - Noms de variables: camelCase
   - Noms de composants: PascalCase
   - Commentaires pour la logique complexe

3. **Sécurité:**
   - Ne jamais commit le fichier `.env`
   - Valider toutes les entrées utilisateur
   - Utiliser HTTPS en production
   - Hacher les mots de passe (bcrypt)

---

## 📚 Documentation supplémentaire

- [PORTFOLIO_CUSTOMIZATION.md](frontend/PORTFOLIO_CUSTOMIZATION.md) - Guide de personnalisation
- [QUICK_START.md](frontend/QUICK_START.md) - Démarrage rapide
- [TRANSLATION_GUIDE.md](frontend/TRANSLATION_GUIDE.md) - Guide des traductions
- [VALIDATION_GUIDE.md](frontend/VALIDATION_GUIDE.md) - Guide de validation
- [EMAIL_SETUP.md](backend/EMAIL_SETUP.md) - Configuration email
- [MIGRATIONS.md](backend/MIGRATIONS.md) - Documentation migrations
- [CODE_ANALYSIS.md](./CODE_ANALYSIS.md) - Analyse du code

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👤 Contact

**Votre Nom**  
- Email: votre.email@example.com
- GitHub: [@votreusername](https://github.com/votreusername)
- LinkedIn: [Votre Profil](https://linkedin.com/in/votreprofil)

---

## 🙏 Remerciements

- Angular Team pour le framework
- Express.js pour le backend
- Tous les contributeurs open source

---

## 📊 Statistiques du projet

- **Langues:** TypeScript, JavaScript
- **Framework Frontend:** Angular 20
- **Framework Backend:** Express.js 4
- **Base de données:** SQLite 3
- **Lignes de code:** ~15,000+
- **Composants:** 20+
- **Services:** 10+
- **Routes API:** 30+

---

**Fait avec ❤️ et Angular**
