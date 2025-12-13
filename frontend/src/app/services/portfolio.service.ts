import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo, SkillCategory } from '../core/models/portfolio.models';
import { ProjectService } from './project.service';
import { ExperienceService } from './experience.service';
import { EducationService } from './education.service';
import { SkillService } from './skill.service';
import { TranslationService } from './translation.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private http = inject(HttpClient);
    private projectService = inject(ProjectService);
    private experienceService = inject(ExperienceService);
    private skillService = inject(SkillService);
    private translationService = inject(TranslationService);

    private readonly API_URL = environment.apiUrl;

    // Personal Info Signal
    private readonly personalInfoBase = signal<Omit<PersonalInfo, 'stats'>>({
        name: '',
        role: 'Full Stack Developer',
        description: this.translationService.translate('hero.description'),
        email: '',
        socials: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: ''
        },
        profilePicture: '',
        availableForWork: false
    });

    // Skills Data
    private readonly skillCategories = signal<SkillCategory[]>([]);

    // Computed stats based on real data
    private readonly stats = computed(() => {
        const projects = this.projectService.getProjects();
        const experiences = this.experienceService.getExperiences();
        const skills = this.skillCategories();

        // Calculate years of experience from the earliest start date
        let yearsExperience = 0;
        if (experiences.length > 0) {
            const dates = experiences
                .map(exp => {
                    const period = exp.period.split(' - ');
                    return period[0];
                })
                .filter(date => date && date.trim() !== '');

            if (dates.length > 0) {
                const earliestYear = Math.min(...dates.map(date => {
                    const year = parseInt(date);
                    return isNaN(year) ? new Date().getFullYear() : year;
                }));
                yearsExperience = new Date().getFullYear() - earliestYear;
            }
        }

        // Count total projects
        const projectsCompleted = projects.length;

        // Count total unique technologies from skills
        let technologiesMastered = 0;
        skills.forEach(category => {
            if (category.skills && Array.isArray(category.skills)) {
                technologiesMastered += category.skills.length;
            }
        });

        return {
            yearsExperience: yearsExperience || 0,
            projectsCompleted: projectsCompleted || 0,
            technologiesMastered: technologiesMastered || 0
        };
    });

    // Computed personal info with stats
    readonly getPersonalInfo = computed<PersonalInfo>(() => ({
        ...this.personalInfoBase(),
        stats: this.stats()
    }));

    constructor() {
        this.loadUser();
        this.loadSkills();
    }

    private loadUser() {
        this.http.get<any>(`${this.API_URL}/user`).subscribe({
            next: (user) => {
                if (user) {
                    this.personalInfoBase.update(info => ({
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
                            : info.profilePicture,
                        availableForWork: !!user.availableForWork
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

    // Expose skills signal
    readonly getSkillCategories = this.skillCategories.asReadonly();
}
