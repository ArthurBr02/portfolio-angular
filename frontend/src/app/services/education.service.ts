import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Education } from '../core/models/education.model';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EducationService {
    private http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/education`;

    private readonly education = signal<Education[]>([]);

    constructor() {
        this.loadEducation();
    }

    loadEducation() {
        this.http.get<any[]>(this.API_URL).subscribe({
            next: (data) => {
                const mappedEducation: Education[] = data.map((e: any) => ({
                    id: e.id,
                    institution: e.institution,
                    degree: e.degree,
                    period: `${e.startDate} - ${e.endDate || 'Present'}`,
                    description: e.description
                }));
                this.education.set(mappedEducation);
            },
            error: (err) => console.error('Error loading education:', err)
        });
    }

    createEducation(education: any) {
        return this.http.post(this.API_URL, education).pipe(
            tap(() => this.loadEducation())
        );
    }

    deleteEducation(id: number) {
        return this.http.delete(`${this.API_URL}/${id}`).pipe(
            tap(() => this.loadEducation())
        );
    }

    getEducation = this.education.asReadonly();
}
