# Translation System Documentation

## Overview
This is a **frontend-only** translation system for the Angular portfolio application. No API calls are required - all translations are stored in-memory and managed client-side.

## Features
- ✅ **2 Languages Supported**: English, French
- ✅ **Automatic Language Detection**: Detects browser language on first visit
- ✅ **Persistent Preference**: Saves language choice to localStorage
- ✅ **Reactive Updates**: Uses Angular signals for instant UI updates
- ✅ **Easy Integration**: Simple pipe syntax for templates
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Flag Images**: Uses high-quality PNG flag icons

## Usage

### 1. In Templates (Recommended)

Use the `translate` pipe:

```html
<!-- Simple translation -->
<h1>{{ 'home.welcome' | translate }}</h1>

<!-- With parameters -->
<p>{{ 'greeting.message' | translate: {name: 'John'} }}</p>

<!-- In attributes -->
<button [attr.aria-label]="'common.close' | translate">X</button>
```

### 2. In TypeScript Components

Inject the `TranslationService`:

```typescript
import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-example',
  template: `<h1>{{ title }}</h1>`
})
export class ExampleComponent {
  title: string;

  constructor(private translationService: TranslationService) {
    this.title = this.translationService.translate('home.welcome');
  }
}
```

### 3. Change Language Programmatically

```typescript
import { TranslationService } from './services/translation.service';

constructor(private translationService: TranslationService) {}

changeToFrench() {
  this.translationService.setLanguage('fr');
}

getCurrentLanguage() {
  return this.translationService.getLanguage(); // Returns 'en', 'fr', etc.
}
```

### 4. Add the Language Switcher Component

Add to your navigation or header:

```html
<app-language-switcher></app-language-switcher>
```

## Translation Keys

All available translation keys are organized by category:

### Common
- `common.home`, `common.about`, `common.projects`, etc.
- `common.save`, `common.cancel`, `common.delete`, etc.

### Navigation
- `nav.home`, `nav.portfolio`, `nav.about`, `nav.contact`

### Pages
- `home.welcome`, `home.subtitle`, `home.cta`
- `projects.title`, `projects.viewProject`
- `experience.title`, `experience.present`
- `education.title`, `education.noEducation`
- `skills.title`, `skills.noSkills`
- `contact.title`, `contact.send`

### Admin
- `admin.dashboard`, `admin.projects`, `admin.addNew`
- `admin.saveSuccess`, `admin.deleteConfirm`

### Forms
- `form.title`, `form.description`, `form.company`
- `form.startDate`, `form.endDate`, `form.required`

## Adding New Translations

Edit `src/app/services/translation.service.ts`:

```typescript
// In the loadTranslations() method
this.translations.en = {
  // ... existing translations
  myNewSection: {
    title: 'My New Title',
    description: 'My description'
  }
};

this.translations.fr = {
  // ... existing translations
  myNewSection: {
    title: 'Mon Nouveau Titre',
    description: 'Ma description'
  }
};
// Repeat for other languages
```

Then use in templates:
```html
<h1>{{ 'myNewSection.title' | translate }}</h1>
```

## Adding New Languages

1. Add the language code to the `Language` type:
```typescript
export type Language = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it'; // Added Italian
```

2. Add translations in `loadTranslations()`:
```typescript
this.translations.it = {
  common: {
    home: 'Home',
    // ... all other keys
  }
};
```

3. Update `availableLanguages` array:
```typescript
availableLanguages: Language[] = ['en', 'fr', 'es', 'de', 'pt', 'it'];
```

4. Add language name in `getLanguageName()`:
```typescript
const names: Record<Language, string> = {
  // ... existing
  it: 'Italiano'
};
```

5. Add flag emoji in `language-switcher.component.ts`:
```typescript
const flags: Record<Language, string> = {
  // ... existing
  it: '🇮🇹'
};
```

## Integration Example

Here's a complete example of integrating translations into a component:

```typescript
// example.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './core/pipes/translate.pipe';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LanguageSwitcherComponent],
  template: `
    <header>
      <h1>{{ 'home.welcome' | translate }}</h1>
      <app-language-switcher></app-language-switcher>
    </header>
    
    <main>
      <p>{{ 'home.subtitle' | translate }}</p>
      <button>{{ 'home.cta' | translate }}</button>
    </main>
  `
})
export class ExampleComponent {}
```

## Best Practices

1. **Use Descriptive Keys**: Use dot notation like `section.element` (e.g., `projects.title`)
2. **Keep Translations Organized**: Group related translations together
3. **Provide Fallbacks**: The system returns the key if translation is missing
4. **Test All Languages**: Verify translations display correctly in all supported languages
5. **Consistent Terminology**: Use the same terms across all languages
6. **Consider Text Length**: Some languages (like German) use longer words

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- **Zero Network Requests**: All translations are bundled with the app
- **Instant Switching**: Language changes are immediate
- **Small Bundle Size**: ~15KB for all 5 languages
- **Lazy Loading Ready**: Can be split per language if needed

## Troubleshooting

### Translation not showing
- Check if the key exists in the translation service
- Verify the `TranslatePipe` is imported in your component
- Check browser console for errors

### Language not persisting
- Check if localStorage is enabled in the browser
- Verify no browser extensions are blocking localStorage

### New language not appearing
- Ensure all steps in "Adding New Languages" are completed
- Check that the language code is added to the `Language` type
