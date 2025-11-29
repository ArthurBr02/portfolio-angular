import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../core/models/experience.model';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    private http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/experience`;

    private readonly experiences = signal<Experience[]>([]);

    constructor() {
        this.loadExperience();
    }

    loadExperience() {
        this.http.get<any[]>(this.API_URL).subscribe({
            next: (data) => {
                const mappedExperience: Experience[] = data.map(e => ({
                    id: e.id,
                    position: e.position,
                    company: e.company,
                    period: `${e.startDate} - ${e.endDate || 'Present'}`,
                    description: e.description,
                    achievements: []
                }));
                this.experiences.set(mappedExperience);
            },
            error: (err) => console.error('Error loading experience:', err)
        });
    }

    createExperience(experience: any) {
        return this.http.post(this.API_URL, experience).pipe(
            tap(() => this.loadExperience())
        );
    }

    deleteExperience(id: number) {
        return this.http.delete(`${this.API_URL}/${id}`).pipe(
            tap(() => this.loadExperience())
        );
    }

    getExperiences = this.experiences.asReadonly();
}
