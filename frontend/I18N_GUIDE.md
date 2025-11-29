# i18n Implementation Guide

## ✅ What's Been Configured:

1. **ngx-translate installed and configured**
2. **Translation files created:**
   - `/assets/i18n/en.json` - English
   - `/assets/i18n/fr.json` - French
3. **Language switcher component created** - Shows EN/FR toggle
4. **Navbar updated** - Language switcher added, navigation links translated

## 🔧 How to Use Translations:

### In HTML Templates (using the translate pipe):

```html
<!-- Simple translation -->
<h1>{{ 'NAV.HOME' | translate }}</h1>

<!-- With parameters -->
<p>{{ 'WELCOME_MESSAGE' | translate:{name: userName} }}</p>
```

### In TypeScript (using TranslateService):

```typescript
import { TranslateService } from '@ngx-translate/core';

export class MyComponent {
  translate = inject(TranslateService);

  someMethod() {
    this.translate.get('CONTACT.SUCCESS').subscribe((text: string) => {
      console.log(text);
    });
  }
}
```

## 📝 Components That Need Translation Updates:

### 1. Hero Component (`hero.html`):
```html
<!-- Line 6: -->
{{ 'HERO.GREETING' | translate }}

<!-- Line 25: -->
{{ 'HERO.CONTACT_ME' | translate }}

<!-- Line 33: -->
{{ 'HERO.VIEW_WORK' | translate }}
```

### 2. Projects Component:
- Import `TranslateModule` in `projects.ts`
- Update section title: `{{ 'PROJECTS.TITLE' | translate }}`
- Update button text: `{{ 'PROJECTS.VIEW_PROJECT' | translate }}`

### 3. Skills Component:
- Import `TranslateModule` in `skills.ts`
- Update section title: `{{ 'SKILLS.TITLE' | translate }}`

### 4. Experience Component:
- Import `TranslateModule` in `experience.ts`
- Update section title: `{{ 'EXPERIENCE.TITLE' | translate }}`
- Update "Present": `{{ 'EXPERIENCE.PRESENT' | translate }}`

### 5. Education Component:
- Import `TranslateModule` in `education.ts`
- Update section title: `{{ 'EDUCATION.TITLE' | translate }}`

### 6. Contact Component:
- Import `TranslateModule` in `contact.ts`
- Update form labels and buttons with translations

### 7. Admin Components:
- Dashboard: `{{ 'ADMIN.DASHBOARD' | translate }}`
- Buttons: `{{ 'ADMIN.ADD_NEW' | translate }}`, `{{ 'ADMIN.SAVE' | translate }}`

## 🎨 Language Switcher Location:

The language switcher has been added to:
- **Desktop navbar** - Last item in nav-links
- **Mobile menu** - Last item in mobile-nav-links

## 🌍 Adding New Translations:

1. Open `/assets/i18n/en.json` and `/assets/i18n/fr.json`
2. Add your new key-value pairs
3. Use the key in your templates: `{{ 'YOUR.NEW.KEY' | translate }}`

## 🔄 Switching Languages Programmatically:

```typescript
this.translate.use('fr'); // Switch to French
this.translate.use('en'); // Switch to English
```

## 📦 Translation Keys Available:

- `NAV.*` - Navigation items
- `HERO.*` - Hero section
- `ABOUT.*` - About section
- `PROJECTS.*` - Projects section
- `SKILLS.*` - Skills section
- `EXPERIENCE.*` - Experience section
- `EDUCATION.*` - Education section
- `CONTACT.*` - Contact form
- `ADMIN.*` - Admin panel
- `COMMON.*` - Common terms (Loading, Error, Success, etc.)
