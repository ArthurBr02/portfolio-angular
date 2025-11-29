import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo, SkillCategory } from '../core/models/portfolio.models';
import { ProjectService } from './project.service';
import { ExperienceService } from './experience.service';
import { EducationService } from './education.service';
import { SkillService } from './skill.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private http = inject(HttpClient);
    private projectService = inject(ProjectService);
    private experienceService = inject(ExperienceService);
    private skillService = inject(SkillService);

    private readonly API_URL = environment.apiUrl;

    // Personal Info Signal
    private readonly personalInfo = signal<PersonalInfo>({
        name: '',
        role: 'Full Stack Developer',
        description: 'Passionate developer with expertise in building scalable web applications and creating intuitive user experiences.',
        email: '',
        socials: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: ''
        },
        stats: {
            yearsExperience: 5,
            projectsCompleted: 10,
            technologiesMastered: 15
        },
        profilePicture: ''
    });

    // Skills Data
    private readonly skillCategories = signal<SkillCategory[]>([]);

    constructor() {
        this.loadUser();
        this.loadSkills();
    }

    private loadUser() {
        this.http.get<any>(`${this.API_URL}/user`).subscribe({
            next: (user) => {
                if (user) {
                    this.personalInfo.update(info => ({
                        ...info,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        socials: {
                            github: user.github,
                            linkedin: user.linkedin,
                            twitter: user.twitter,
                            instagram: user.instagram
                        },
                        profilePicture: user.profilePicture ?
                            (user.profilePicture.startsWith('http') ? user.profilePicture : `${environment.baseUrl}${user.profilePicture}`)
                            : info.profilePicture
                    }));
                }
            },
            error: (err) => console.error('Error loading user data:', err)
        });
    }

    public refreshSkills() {
        this.loadSkills();
    }

    private loadSkills() {
        this.skillService.getSkillCategories().subscribe({
            next: (skills) => {
                this.skillCategories.set(skills);
            },
            error: (err) => console.error('Error loading skills:', err)
        });
    }

    // Expose signals
    readonly getPersonalInfo = this.personalInfo.asReadonly();
    readonly getSkillCategories = this.skillCategories.asReadonly();
}
