import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../services/translation.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './language-switcher.component.html',
    styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
    isOpen = false;

    private translationService: TranslationService = inject(TranslationService);

    currentLanguage = computed(() => this.translationService.currentLanguage());
    availableLanguages = this.translationService.availableLanguages;

    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
    }

    selectLanguage(lang: Language): void {
        this.translationService.setLanguage(lang);
        this.isOpen = false;
    }

    getLanguageName(lang: Language): string {
        return this.translationService.getLanguageName(lang);
    }

    getFlagImage(lang: Language): string {
        const flags: Record<Language, string> = {
            en: 'flags/en.png',
            fr: 'flags/fr.png'
        };
        return flags[lang];
    }
}
