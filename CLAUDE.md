# Directives pour Claude - Maintenance du Projet Portfolio

## 📋 Mise à Jour Automatique de la Documentation

### Fichiers à Maintenir Systématiquement

Lors de **chaque modification** du projet, les fichiers suivants doivent être automatiquement mis à jour :

#### 1. `CODE_ANALYSIS.md`
- **Contenu** : Analyse technique détaillée de la structure du code
- **Mise à jour requise lors de** :
  - Ajout/modification/suppression de composants
  - Changements d'architecture (services, guards, interceptors)
  - Ajout de nouvelles routes ou APIs
  - Modifications de la base de données (migrations, schéma)
  - Changements dans les dépendances majeures
  
- **Sections à maintenir** :
  - Structure des dossiers et fichiers
  - Architecture frontend (Angular)
  - Architecture backend (Express)
  - Flux de données et état
  - Patterns et conventions utilisés
  - Points d'amélioration identifiés

#### 2. `README_COMPLET.md`
- **Contenu** : Documentation complète du projet pour les développeurs
- **Mise à jour requise lors de** :
  - Ajout de nouvelles fonctionnalités
  - Changements dans les scripts de démarrage
  - Modifications des variables d'environnement
  - Ajout/modification des migrations de base de données
  - Changements dans les processus de déploiement
  - Ajout de dépendances importantes

- **Sections à maintenir** :
  - Guide de démarrage rapide
  - Configuration de l'environnement
  - Architecture globale
  - Fonctionnalités disponibles
  - Guide de développement
  - Procédures de déploiement
  - FAQ et résolution de problèmes

### Processus de Mise à Jour

```
1. AVANT toute modification de code :
   - Lire CODE_ANALYSIS.md et README_COMPLET.md
   - Comprendre l'architecture existante

2. PENDANT la modification :
   - Identifier l'impact sur l'architecture
   - Noter les nouveaux patterns introduits

3. APRÈS la modification :
   - Mettre à jour CODE_ANALYSIS.md avec les changements structurels
   - Mettre à jour README_COMPLET.md avec les impacts fonctionnels
   - Vérifier la cohérence entre les deux documents
```

## 🔧 Principes de Développement

### 1. Réutilisation des Composants

**TOUJOURS** vérifier l'existence de composants similaires avant d'en créer de nouveaux :

#### Composants Réutilisables Existants

- **Modals** :
  - `add-translation-modal` : Modal générique avec formulaire
  - `delete-confirmation-modal` : Confirmation de suppression
  - → Examiner et étendre plutôt que dupliquer

- **Composants Admin** :
  - `admin-layout` : Layout standard pour toutes les pages admin
  - `admin-page-header` : En-tête de page avec titre et actions
  - `stat-card` : Carte de statistiques
  - → Utiliser systématiquement pour la cohérence

- **Composants Partagés** (`components/shared/`) :
  - `validation-error` : Affichage des erreurs de validation
  - `language-switcher` : Sélection de langue
  - → Vérifier le dossier shared avant toute création

- **Services** :
  - `toast.service` : Notifications utilisateur
  - `translation.service` : Gestion i18n
  - `auth.service` : Authentification
  - → Ne pas dupliquer la logique métier

#### Processus de Vérification

```
1. Lister les composants dans components/ et pages/
2. Examiner les services existants
3. Identifier les patterns réutilisables
4. Adapter le composant existant si nécessaire
5. Créer un nouveau composant UNIQUEMENT si aucun n'est adaptable
```

### 2. Amélioration Sans Régression

#### Avant toute amélioration :

- ✅ Comprendre le code existant et son contexte
- ✅ Identifier les dépendances et usages
- ✅ Lire les tests existants (si présents)
- ✅ Vérifier les impacts potentiels

#### Pendant l'amélioration :

- ✅ Maintenir la compatibilité avec le code appelant
- ✅ Préserver les interfaces publiques
- ✅ Documenter les changements dans le code
- ✅ Ajouter des commentaires pour les points complexes

#### Après l'amélioration :

- ✅ Tester manuellement les fonctionnalités impactées
- ✅ Vérifier que l'application démarre correctement
- ✅ Valider les flux utilisateur principaux
- ✅ Mettre à jour la documentation

### 3. Code Maintenable

#### Principes SOLID

- **S**ingle Responsibility : Un composant = une responsabilité
- **O**pen/Closed : Ouvert à l'extension, fermé à la modification
- **L**iskov Substitution : Les composants enfants doivent être substituables
- **I**nterface Segregation : Interfaces spécifiques plutôt que génériques
- **D**ependency Inversion : Dépendre d'abstractions, pas d'implémentations

#### Standards du Projet

1. **Structure des Fichiers**
   ```
   component-name/
     component-name.ts      # Logique
     component-name.html    # Template
     component-name.css     # Styles
   ```

2. **Nommage**
   - Composants : PascalCase (ex: `AdminDashboard`)
   - Services : camelCase + .service (ex: `auth.service.ts`)
   - Fichiers : kebab-case (ex: `admin-dashboard.ts`)

3. **Organisation du Code**
   - Imports groupés : Angular → RxJS → Services → Models
   - Propriétés publiques avant privées
   - Lifecycle hooks dans l'ordre Angular
   - Méthodes publiques avant privées

4. **Types et Interfaces**
   - Définir dans `core/models/`
   - Exporter depuis un index.ts
   - Typer toutes les méthodes et propriétés

5. **Gestion d'État**
   - Services avec BehaviorSubject pour l'état partagé
   - Pas de state management complexe sans nécessité
   - Unsubscribe dans ngOnDestroy

6. **Gestion des Erreurs**
   - Utiliser le `toast.service` pour les notifications
   - Logger les erreurs importantes
   - Messages d'erreur traduits via i18n

7. **Internationalisation**
   - Toutes les chaînes visibles via `translation.service`
   - Clés descriptives en anglais (ex: `admin.projects.title`)
   - Ajouter les traductions dans `i18n/en.ts` et `i18n/fr.ts`

## 📝 Checklist de Modification

Avant de marquer une tâche comme terminée, vérifier :

- [ ] Le code fonctionne correctement
- [ ] Aucune régression introduite
- [ ] Les composants existants ont été réutilisés
- [ ] Le code est typé (TypeScript)
- [ ] Les erreurs sont gérées proprement
- [ ] Les textes sont internationalisés
- [ ] `CODE_ANALYSIS.md` est mis à jour
- [ ] `README_COMPLET.md` est mis à jour
- [ ] Le code suit les conventions du projet
- [ ] Les imports inutiles sont supprimés

## 🎯 Objectif Final

Maintenir un projet :
- **Documenté** : Documentation toujours à jour
- **Cohérent** : Architecture uniforme et prévisible
- **Maintenable** : Code facile à comprendre et modifier
- **Évolutif** : Facile d'ajouter de nouvelles fonctionnalités
- **Professionnel** : Qualité production

---

**Note** : Ce fichier guide toutes les interventions sur le projet. Le respecter garantit la qualité et la pérennité du code.
