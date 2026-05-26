# Suivi de Progression du Projet (Portfolio V2)

Ce document permet aux agents IA et aux développeurs de suivre l'état global du projet en se basant sur le plan d'implémentation défini dans `IMPLEMENTATION_PLAN.md`.

**Instructions pour les agents :**
À chaque fois que vous terminez une tâche ou une phase, vous **devez** venir mettre à jour ce fichier en cochant la case correspondante `[x]`.

## Phase 1 — Backend (Clean Architecture + Settings + Analytics) 🟢 Terminé
- [x] Initialisation du backend (Node.js, Express, TS)
- [x] Configuration DB (SQLite) et variables d'environnement (Zod)
- [x] Migrations SQL initiales (schéma complet) et seed (admin)
- [x] Middlewares (Auth JWT, Validation Zod, Erreurs, Rate-limiter)
- [x] Modèles (Data Access Layer via better-sqlite3)
- [x] Services (Logique métier, envoi d'emails)
- [x] Contrôleurs et Routes API
- [x] Tests locaux de la configuration (DB auto-migrate, user seed)

## Phase 2 — Frontend Scaffolding 🔴 À faire
- [ ] Initialisation Vue 3 + Vite + TS + Router + Pinia
- [ ] Nettoyage des dépendances et de la structure de base
- [ ] Création du système de design Vanilla CSS (style.css, reset)
- [ ] Définition des variables CSS pour les thèmes (Sable, Forêt, Crépuscule, Minuit)
- [ ] Mise en place du mécanisme de changement de thème
- [ ] Création des Stores Pinia (auth, settings, messages)
- [ ] Configuration du Vue Router (routes publiques et protégées admin)

## Phase 3 — Public Portfolio (Sections + Animations CSS natives) 🔴 À faire
- [ ] Implémentation du Layout Public et de la Navbar dynamique (toggles)
- [ ] Création de la HeroSection
- [ ] Création de la AboutSection
- [ ] Création de la SkillsSection
- [ ] Création de la ProjectsSection et modale de détail
- [ ] Création des sections Experience & Education
- [ ] Création de la ContactSection (Formulaire)
- [ ] Intégration des animations CSS natives (scroll-driven, reveals)
- [ ] Intégration du tracking Analytics (API track)

## Phase 4 — Système Multilingue (i18n) 🔴 À faire
- [ ] Configuration vue-i18n
- [ ] Création des fichiers statiques FR/EN
- [ ] Création du mécanisme de surcharge dynamique depuis l'API
- [ ] Création du composant Language Switcher

## Phase 5 — Admin Backoffice 🔴 À faire
- [ ] Création du Layout Admin (sidebar, topbar, protections de routes)
- [ ] Dashboard (Stats globales + graphique simple)
- [ ] Vues CRUD (Profil, Projets, Expériences, Education, Compétences)
- [ ] Interface de gestion des traductions
- [ ] Gestionnaire de messages de contact
- [ ] **Panneau de Configuration (SettingsView)** : Toggles des sections et sélection du thème

## Phase 6 — Docker & Déploiement 🔴 À faire
- [ ] Création du Dockerfile (Multi-stage build)
- [ ] Configuration de docker-compose.yml
- [ ] Tests de démarrage de conteneurs

## 7. Vérification & Tests finaux 🔴 À faire
- [ ] Test End-to-End du flux complet (toggles, thèmes, forms, analytics)
