import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../core/models/project.model';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/projects`;

    private readonly projects = signal<Project[]>([]);

    constructor() {
        this.loadProjects();
    }

    loadProjects() {
        this.http.get<any[]>(this.API_URL).subscribe({
            next: (data) => {
                const mappedProjects: Project[] = data.map(p => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    image: p.imageUrl
                        ? `${environment.apiUrl}/projects/${p.id}/image`
                        : 'https://via.placeholder.com/800x600',
                    technologies: p.technologies ? p.technologies.split(',').map((t: string) => t.trim()) : [],
                    liveUrl: p.link
                }));
                this.projects.set(mappedProjects);
            },
            error: (err) => console.error('Error loading projects:', err)
        });
    }

    createProject(formData: FormData) {
        return this.http.post(this.API_URL, formData).pipe(
            tap(() => this.loadProjects())
        );
    }

    deleteProject(id: number) {
        return this.http.delete(`${this.API_URL}/${id}`).pipe(
            tap(() => this.loadProjects())
        );
    }

    getProjects = this.projects.asReadonly();
}
