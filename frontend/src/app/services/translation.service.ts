import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';
import { environment } from '../../environments/environment';

export type Language = 'en' | 'fr';

export interface TranslationData {
    [key: string]: string | TranslationData;
}

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private translations: Record<Language, TranslationData> = {
        en: en,
        fr: fr
    };

    // Using Angular signals for reactive language changes
    currentLanguage = signal<Language>('fr');
    availableLanguages: Language[] = ['en', 'fr'];
    private apiUrl = environment.apiUrl;
    // Signal to force refresh of translations
    private translationsVersion = signal(0);

    constructor(private http: HttpClient) {
        // Try to get saved language from localStorage
        const savedLang = this.getSavedLanguage();
        if (savedLang) {
            this.currentLanguage.set(savedLang);
        } else {
            // Detect browser language
            const browserLang = this.detectBrowserLanguage();
            this.currentLanguage.set(browserLang);
        }
        
        // Load translations from API on startup
        this.reloadTranslations().catch(error => {
            console.warn('Failed to load translations from API, using static files:', error);
        });
    }

    /**
     * Get translation for a key
     * @param key - Translation key (e.g., 'common.home' or 'projects.title')
     * @param params - Optional parameters to replace in the translation
     */
    translate(key: string, params?: Record<string, string | number>): string {
        // Access translationsVersion to create dependency for reactivity
        this.translationsVersion();
        
        const keys = key.split('.');
        let value: any = this.translations[this.currentLanguage()];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Return key if translation not found
                return key;
            }
        }

        if (typeof value !== 'string') {
            return key;
        }

        // Replace parameters if provided
        if (params) {
            Object.keys(params).forEach(param => {
                value = value.replace(new RegExp(`{{${param}}}`, 'g'), String(params[param]));
            });
        }

        return value;
    }

    /**
     * Change the current language
     */
    setLanguage(lang: Language): void {
        if (this.availableLanguages.includes(lang)) {
            this.currentLanguage.set(lang);
            this.saveLanguage(lang);
        }
    }

    /**
     * Get the current language
     */
    getLanguage(): Language {
        return this.currentLanguage();
    }

    /**
     * Save language preference to localStorage
     */
    private saveLanguage(lang: Language): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('preferred-language', lang);
        }
    }

    /**
     * Get saved language from localStorage
     */
    private getSavedLanguage(): Language | null {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = localStorage.getItem('preferred-language');
            if (saved && this.availableLanguages.includes(saved as Language)) {
                return saved as Language;
            }
        }
        return null;
    }

    /**
     * Detect browser language
     */
    private detectBrowserLanguage(): Language {
        if (typeof window !== 'undefined' && window.navigator) {
            const browserLang = window.navigator.language.split('-')[0];
            if (this.availableLanguages.includes(browserLang as Language)) {
                return browserLang as Language;
            }
        }
        return 'en'; // Default to English
    }

    /**
     * Get language name in its native form
     */
    getLanguageName(lang: Language): string {
        const names: Record<Language, string> = {
            en: 'English',
            fr: 'Français'
        };
        return names[lang];
    }

    /**
     * Reload translations from the server
     * This is used after updating translations in the admin panel
     */
    async reloadTranslations(): Promise<void> {
        try {
            const [enResponse, frResponse] = await Promise.all([
                firstValueFrom(this.http.get<{ lang: string; translations: TranslationData }>(`${this.apiUrl}/translations/en`)),
                firstValueFrom(this.http.get<{ lang: string; translations: TranslationData }>(`${this.apiUrl}/translations/fr`))
            ]);

            if (enResponse && enResponse.translations) {
                this.translations.en = enResponse.translations;
            }
            if (frResponse && frResponse.translations) {
                this.translations.fr = frResponse.translations;
            }

            // Increment version to trigger reactivity
            this.translationsVersion.update(v => v + 1);

            console.log('Translations reloaded successfully');
        } catch (error) {
            console.error('Error reloading translations:', error);
            throw error;
        }
    }
}
