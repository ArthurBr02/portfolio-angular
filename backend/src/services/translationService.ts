import * as translationModel from '../models/translationModel';

export function getTranslations(lang: 'fr' | 'en'): Record<string, string> {
  return translationModel.getTranslationsByLang(lang);
}

export function updateTranslations(lang: 'fr' | 'en', translations: Record<string, string>): Record<string, string> {
  for (const [key, value] of Object.entries(translations)) {
    if (value === null || value === undefined || value === '') {
       translationModel.deleteTranslation(lang, key);
    } else {
       translationModel.setTranslation(lang, key, value);
    }
  }
  return getTranslations(lang);
}
