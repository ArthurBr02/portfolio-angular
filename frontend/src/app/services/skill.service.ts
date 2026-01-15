import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SkillCategory, SkillItem } from '../core/models/portfolio.models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/skill-categories`;

    getSkillCategories(): Observable<SkillCategory[]> {
        return this.http.get<SkillCategory[]>(this.apiUrl);
    }

    addSkillCategory(categoryData: FormData | SkillCategory): Observable<SkillCategory> {
        return this.http.post<SkillCategory>(this.apiUrl, categoryData);
    }

    deleteSkillCategory(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    updateSkillCategorySkills(
        id: number,
        skills: SkillItem[]
    ): Observable<{ message: string; id: number; skills: SkillItem[] }> {
        return this.http.put<{ message: string; id: number; skills: SkillItem[] }>(`${this.apiUrl}/${id}`, { skills });
    }

    updateSkillCategory(id: number, categoryData: FormData): Observable<SkillCategory> {
        return this.http.put<SkillCategory>(`${this.apiUrl}/${id}/update`, categoryData);
    }
}
