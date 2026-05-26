# Portfolio V2 — Vue 3 + Express.js — Implementation Plan

## Objectif

Repartir de zéro pour construire un portfolio moderne et minimaliste avec :
- **Frontend** : Vue 3 (Options API) + Vite + Tailwind CSS v4 + Pinia
- **Backend** : Express.js restructuré en Clean Architecture + SQLite + Zod
- **Fonctionnalité clé** : Activation/désactivation dynamique des sections du portfolio depuis le backoffice (toggles)

---

## Architecture Monorepo

```
portfolio-3-vue-express/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection, env vars, constants
│   │   ├── middleware/       # auth, validation, error handler, rate-limit
│   │   ├── routes/          # Express route definitions
│   │   ├── controllers/     # Thin HTTP handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # SQLite queries (data access layer)
│   │   ├── migrations/      # SQL migration files
│   │   └── index.ts         # Express app entry
│   ├── uploads/             # Local file storage
│   ├── database.sqlite      # SQLite database
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets, fonts
│   │   ├── components/
│   │   │   ├── ui/          # Reusable UI components (Button, Toggle, Card, Modal...)
│   │   │   ├── sections/    # Portfolio sections (Hero, About, Skills, Projects...)
│   │   │   └── admin/       # Admin-specific components
│   │   ├── composables/     # Shared logic (useApi, useToast, useTheme...)
│   │   ├── layouts/         # PublicLayout, AdminLayout
│   │   ├── router/          # Vue Router config
│   │   ├── stores/          # Pinia stores
│   │   ├── views/           # Page components
│   │   │   ├── public/      # HomeView
│   │   │   └── admin/       # Dashboard, Settings, CRUD views
│   │   ├── lib/             # Utils, API client, types
│   │   ├── i18n/            # i18n setup + static fallback translations
│   │   ├── App.vue
│   │   ├── main.ts
│   │   └── style.css        # Tailwind v4 entry + design tokens
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── start.sh                 # Convenience script to start both
├── ETAT_DES_LIEUX.md
├── IMPLEMENTATION_PLAN.md
└── .gitignore
```

---

## Phase 1 — Backend (Clean Architecture + Settings)

### Initialisation
- **Runtime** : Node.js + TypeScript (via `tsx` pour le dev)
- **Dependencies** : `express`, `better-sqlite3`, `zod`, `jsonwebtoken`, `bcryptjs`, `helmet`, `cors`, `express-rate-limit`, `multer`, `nodemailer`, `dotenv`

### Config
- `src/config/database.ts` — SQLite connection via `better-sqlite3` (synchronous), auto-run migrations on startup
- `src/config/env.ts` — Zod schema to validate env vars at startup (PORT, JWT_SECRET, SMTP config)

### Migration SQL (001_initial.sql)

Tables :
- `users` — id, username, password_hash, created_at
- `profile` — id, name, title, bio, email, phone, location, avatar_url, cv_url, available_for_work
- `projects` — id, title_fr, title_en, description_fr, description_en, image_url, demo_url, repo_url, technologies, category, sort_order, created_at
- `experiences` — id, company, role_fr, role_en, description_fr, description_en, start_date, end_date, current, sort_order
- `education` — id, school, degree_fr, degree_en, description_fr, description_en, start_date, end_date, sort_order
- `skills` — id, name, icon, category_fr, category_en, level, sort_order
- `translations` — id, lang, key, value
- **`settings`** — key (PK), value (TEXT). Key-value store for site configuration :
  - `section_hero_enabled` → `"true"`
  - `section_about_enabled` → `"true"`
  - `section_skills_enabled` → `"true"`
  - `section_projects_enabled` → `"true"`
  - `section_experience_enabled` → `"true"`
  - `section_education_enabled` → `"true"`
  - `section_contact_enabled` → `"true"`
  - `site_title` → `"Mon Portfolio"`
  - `active_theme` → `"sable"` ← **thème actif parmi les presets disponibles**

### Middleware
- `auth.ts` — JWT verification
- `validate.ts` — Generic Zod validation middleware (body, params, query)
- `errorHandler.ts` — Centralized error handling, consistent JSON responses

### API Routes

| Entity | Public Routes | Admin Routes |
|---|---|---|
| **Auth** | — | `POST /api/auth/login` |
| **Profile** | `GET /api/profile` | `PUT /api/admin/profile` |
| **Projects** | `GET /api/projects` | `POST/PUT/DELETE /api/admin/projects` |
| **Experience** | `GET /api/experiences` | `POST/PUT/DELETE /api/admin/experiences` |
| **Education** | `GET /api/education` | `POST/PUT/DELETE /api/admin/education` |
| **Skills** | `GET /api/skills` | `POST/PUT/DELETE /api/admin/skills` |
| **Translations** | `GET /api/translations/:lang` | `POST/PUT/DELETE /api/admin/translations` |
| **Settings** | `GET /api/settings` | `PUT /api/admin/settings` |
| **Contact** | `POST /api/contact` | — |
| **Upload** | — | `POST /api/admin/upload` |

> `GET /api/settings` est public (le frontend a besoin de savoir quelles sections afficher).
> Tous les endpoints `/api/admin/*` sont protégés par JWT.

### Architecture par entité
Chaque entité suit le pattern : **Route → Controller → Service → Model**
- **Route** : Définit les endpoints, applique middleware (auth, validation)
- **Controller** : Parse la requête, appelle le service, retourne la réponse HTTP
- **Service** : Logique métier
- **Model** : Requêtes SQLite (data access layer)

---

## Phase 2 — Frontend Scaffolding

### Initialisation
```bash
npx -y create-vue@latest --ts --router --pinia --eslint --prettier --bare ./frontend
```

### Tailwind CSS v4
```bash
npm install -D tailwindcss @tailwindcss/vite
```
- Plugin Vite dans `vite.config.ts`
- `@import "tailwindcss"` dans `style.css`
- Design tokens via `@theme` directive

### Design System — Multi-thème (style.css)

Le design repose sur des **CSS custom properties** (`--color-*`). Changer de thème = changer un attribut `data-theme` sur `<html>`, ce qui swap toutes les variables d'un coup.

**Thème par défaut : "Sable"** — palette chaude, douce, beige/terracotta.

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
}

/* ═══════════════════════════════════════
   THÈME : Sable (défaut)
   Palette douce beige / terracotta / crème
   ═══════════════════════════════════════ */
:root, [data-theme="sable"] {
  --color-bg-primary:    oklch(0.97 0.01 80);   /* crème très clair        */
  --color-bg-secondary:  oklch(0.93 0.02 75);   /* sable doux              */
  --color-bg-card:       oklch(0.95 0.015 78);  /* carte ivoire            */
  --color-accent:        oklch(0.58 0.12 35);   /* terracotta rosé         */
  --color-accent-hover:  oklch(0.52 0.14 30);   /* terracotta plus profond */
  --color-text-primary:  oklch(0.25 0.02 50);   /* brun foncé chaleureux   */
  --color-text-secondary:oklch(0.50 0.03 60);   /* brun moyen adouci       */
  --color-border:        oklch(0.85 0.025 70);  /* séparateur sable        */
  --color-success:       oklch(0.60 0.15 155);  /* sauge douce             */
  --color-error:         oklch(0.55 0.18 25);   /* rouge argile            */
  --color-bg-nav:        oklch(0.94 0.018 76);  /* fond navbar             */
}

/* ═══════════════════════════════════════
   THÈME : Forêt
   Vert profond / mousse / crème
   ═══════════════════════════════════════ */
[data-theme="foret"] {
  --color-bg-primary:    oklch(0.96 0.015 140);  /* menthe très pâle       */
  --color-bg-secondary:  oklch(0.92 0.025 145);  /* brume verte            */
  --color-bg-card:       oklch(0.94 0.02 142);   /* carte mousse clair     */
  --color-accent:        oklch(0.45 0.12 160);   /* vert forêt profond     */
  --color-accent-hover:  oklch(0.40 0.14 155);   /* vert dense             */
  --color-text-primary:  oklch(0.22 0.03 150);   /* vert nuit              */
  --color-text-secondary:oklch(0.48 0.04 148);   /* mousse texte           */
  --color-border:        oklch(0.84 0.03 143);   /* séparateur feuille     */
  --color-success:       oklch(0.58 0.16 150);   /* émeraude douce         */
  --color-error:         oklch(0.55 0.18 25);    /* argile                 */
  --color-bg-nav:        oklch(0.93 0.022 141);  /* fond navbar            */
}

/* ═══════════════════════════════════════
   THÈME : Crépuscule
   Rose poudré / mauve / gris chaud
   ═══════════════════════════════════════ */
[data-theme="crepuscule"] {
  --color-bg-primary:    oklch(0.96 0.015 340);  /* rose très pâle         */
  --color-bg-secondary:  oklch(0.92 0.025 335);  /* lavande blush          */
  --color-bg-card:       oklch(0.94 0.02 338);   /* carte poudré           */
  --color-accent:        oklch(0.55 0.14 350);   /* mauve rosé profond     */
  --color-accent-hover:  oklch(0.50 0.16 345);   /* prune douce            */
  --color-text-primary:  oklch(0.24 0.02 330);   /* aubergine texte        */
  --color-text-secondary:oklch(0.50 0.03 335);   /* gris mauve             */
  --color-border:        oklch(0.85 0.02 338);   /* séparateur rose        */
  --color-success:       oklch(0.60 0.15 155);   /* sauge                  */
  --color-error:         oklch(0.55 0.20 15);    /* corail                 */
  --color-bg-nav:        oklch(0.93 0.018 337);  /* fond navbar            */
}

/* ═══════════════════════════════════════
   THÈME : Minuit
   Mode sombre élégant, accents cuivrés
   ═══════════════════════════════════════ */
[data-theme="minuit"] {
  --color-bg-primary:    oklch(0.18 0.015 60);   /* noir chaud             */
  --color-bg-secondary:  oklch(0.22 0.018 55);   /* surface élevée         */
  --color-bg-card:       oklch(0.25 0.02 58);    /* carte sombre           */
  --color-accent:        oklch(0.68 0.14 55);    /* or cuivré              */
  --color-accent-hover:  oklch(0.74 0.16 50);    /* or lumineux            */
  --color-text-primary:  oklch(0.92 0.01 70);    /* ivoire clair           */
  --color-text-secondary:oklch(0.65 0.02 65);    /* gris sable             */
  --color-border:        oklch(0.32 0.02 60);    /* séparateur discret     */
  --color-success:       oklch(0.65 0.18 150);   /* émeraude               */
  --color-error:         oklch(0.60 0.22 25);    /* rouge chaud            */
  --color-bg-nav:        oklch(0.16 0.012 58);   /* fond navbar            */
}
```

**Mécanisme** :
- Le frontend lit `active_theme` depuis `GET /api/settings` et applique `document.documentElement.dataset.theme = theme`
- Le store Pinia `settings` expose `currentTheme` et `setTheme()`
- Tous les composants utilisent les variables CSS `var(--color-*)` → le changement est instantané, zéro rechargement

### Stores Pinia
- `auth.ts` — JWT auth state, login/logout, token persistence (localStorage)
- `settings.ts` — Fetch `/api/settings`, expose :
  - `isSectionEnabled(section: string): boolean`
  - `currentTheme: string` (réactif, applique `data-theme` sur `<html>`)
  - `setTheme(theme: string)` → met à jour le store + `PUT /api/admin/settings`

### Router
- `/` → HomeView (public portfolio)
- `/login` → LoginView
- `/admin` → AdminLayout (auth guard)
  - `/admin/dashboard`
  - `/admin/profile`
  - `/admin/projects`
  - `/admin/experience`
  - `/admin/education`
  - `/admin/skills`
  - `/admin/translations`
  - `/admin/settings` ← **Section toggles**

---

## Phase 3 — Public Portfolio (Sections + Animations)

### HomeView
Single-page layout avec rendu conditionnel :
```vue
<HeroSection v-if="settings.isSectionEnabled('hero')" />
<AboutSection v-if="settings.isSectionEnabled('about')" />
<SkillsSection v-if="settings.isSectionEnabled('skills')" />
<ProjectsSection v-if="settings.isSectionEnabled('projects')" />
<ExperienceSection v-if="settings.isSectionEnabled('experience')" />
<EducationSection v-if="settings.isSectionEnabled('education')" />
<ContactSection v-if="settings.isSectionEnabled('contact')" />
```

### Sections

| Component | Design |
|---|---|
| `HeroSection.vue` | Full-viewport, animated text reveal, gradient mesh background, CTA buttons |
| `AboutSection.vue` | Split layout (photo + bio), subtle parallax |
| `SkillsSection.vue` | Category cards with animated skill bars/icons |
| `ProjectsSection.vue` | Grid with hover cards, filter tabs, glassmorphism overlays |
| `ExperienceSection.vue` | Vertical timeline with scroll-reveal entries |
| `EducationSection.vue` | Compact timeline |
| `ContactSection.vue` | Contact form with validation + social links |

### Animations
- **Entry** : `@vueuse/motion` directive (`v-motion`) — fade-up, scale-in on mount
- **Scroll reveals** : CSS `animation-timeline: view()` pour les effets au scroll
- **Transitions de page** : Vue `<Transition>` pour les changements de route
- **Micro-interactions** : CSS `:hover` transitions, card lifts
- **Accessibilité** : `prefers-reduced-motion` respecté

---

## Phase 4 — Système Multilingue (i18n)

- `vue-i18n` avec chargement dynamique des traductions depuis `/api/translations/:lang`
- Fallback vers des traductions statiques bundlées (FR/EN)
- Composant Language Switcher dans la navbar
- Store Pinia pour gérer la locale courante

---

## Phase 5 — Admin Backoffice

### SettingsView (fonctionnalité clé)
```
┌──────────────────────────────────────────────────┐
│  ⚙️  Configuration du Site                       │
├──────────────────────────────────────────────────┤
│                                                  │
│  🎨 Thème du site                                │
│  ────────────────                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  │  ██████  │ │  ██████  │ │  ██████  │ │  ██████  │
│  │  Sable   │ │  Forêt   │ │Crépuscule│ │  Minuit  │
│  │  ✓ actif │ │          │ │          │ │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘
│  Cartes de preview avec couleurs du thème.       │
│  Clic = changement instantané + sauvegarde.      │
│                                                  │
│  📋 Sections Visibles                            │
│  ─────────────────                               │
│  Hero           [████████ ON ]                   │
│  À propos       [████████ ON ]                   │
│  Compétences    [████████ ON ]                   │
│  Projets        [████████ ON ]                   │
│  Expérience     [████████ ON ]                   │
│  Éducation      [        OFF]                   │
│  Contact        [████████ ON ]                   │
│                                                  │
│  🔧 Paramètres généraux                          │
│  ───────────────────                             │
│  Titre du site  [________________]               │
│                                                  │
│         [ 💾 Sauvegarder ]                       │
└──────────────────────────────────────────────────┘
```

### Autres vues admin
Pattern commun pour chaque entité :
- Table de données avec actions edit/delete
- Modal ou formulaire inline pour create/edit
- Validation Zod côté frontend
- Toast notifications pour feedback

### Design Admin
- Sidebar navigation (dark theme, compact)
- Top bar avec info utilisateur + logout
- Style minimaliste et cohérent avec le portfolio public

---

## Design Philosophy

### Palette de couleurs — Douce et Originale
Pas de bleu/violet/noir générique. Chaque thème est **chaud, doux et épuré** :

| Thème | Ambiance | Bg | Accent | Texte |
|---|---|---|---|---|
| **Sable** (défaut) | Crème / Terracotta | Ivoire chaud | Terracotta rosé | Brun doux |
| **Forêt** | Menthe / Mousse | Vert pâle | Vert forêt | Vert nuit |
| **Crépuscule** | Rose / Mauve | Rose poudré | Mauve profond | Aubergine |
| **Minuit** | Sombre / Cuivré | Noir chaud | Or cuivré | Ivoire |

Tous les thèmes utilisent l'espace couleur **oklch** pour des dégradés naturels et harmonieux.

### Système de thème
- 4 presets disponibles, extensibles facilement (ajouter un bloc `[data-theme="..."]` dans le CSS)
- Changement instantané depuis le backoffice via `data-theme` sur `<html>`
- Le thème actif est persisté en base (`settings.active_theme`)
- Possibilité d'ajouter de nouveaux thèmes sans toucher au code des composants

### Typography
- **Google Font** : Inter (variable weight, 400/500/600/700)
- **Headings** : Font-weight 700, letter-spacing -0.02em
- **Body** : Font-weight 400, line-height 1.6

### Key Design Elements
- Cards avec ombres douces et bords arrondis (pas de glassmorphism agressif → effet subtil sur thème Minuit uniquement)
- Hero background avec dégradé mesh dans les tons du thème actif
- Smooth scroll (`scroll-behavior: smooth`)
- Section dividers avec lignes gradient discrètes
- Hover-lift doux sur les cards (`transform: translateY(-4px)`, `box-shadow` teinté accent)

---

## Plan d'Implémentation (Ordre)

1. **Phase 1** : Backend complet + tests API manuels
2. **Phase 2** : Frontend scaffolding + design system
3. **Phase 3** : Sections publiques + animations
4. **Phase 4** : Système multilingue
5. **Phase 5** : Admin backoffice avec toggles
6. **Vérification** : Test end-to-end du flux toggle
