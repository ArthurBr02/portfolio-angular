import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SkillCategory } from '../core/models/portfolio.models';
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
}
