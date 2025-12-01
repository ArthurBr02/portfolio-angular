import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TranslationData } from './translation.service';

export interface TranslationResponse {
    lang: string;
    translations: TranslationData;
}

@Injectable({
    providedIn: 'root'
})
export class TranslationAdminService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    /**
     * Get translations for a specific language
     */
    getTranslations(lang: 'en' | 'fr'): Observable<TranslationResponse> {
        return this.http.get<TranslationResponse>(`${this.apiUrl}/translations/${lang}`);
    }

    /**
     * Update translations for a specific language
     */
    updateTranslations(lang: 'en' | 'fr', translations: TranslationData): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/translations/${lang}`, { translations });
    }
}
