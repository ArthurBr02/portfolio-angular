import { Component, inject, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ProjectService } from '../../services/project.service';
import { ExperienceService } from '../../services/experience.service';
import { EducationService } from '../../services/education.service';
import { StatCard } from '../../components/stat-card/stat-card';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, StatCard, TranslatePipe],
    templateUrl: './admin-dashboard.html',
    styleUrl: './admin-dashboard.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminDashboard {
    private portfolioService = inject(PortfolioService);
    private projectService = inject(ProjectService);
    private experienceService = inject(ExperienceService);
    private educationService = inject(EducationService);

    projectsCount = computed(() => this.projectService.getProjects().length);
    experienceCount = computed(() => this.experienceService.getExperiences().length);
    educationCount = computed(() => this.educationService.getEducation().length);
    skillsCount = computed(() =>
        this.portfolioService.getSkillCategories().reduce((acc, cat) => acc + cat.skills.length, 0)
    );

    recentProjects = computed(() => this.projectService.getProjects().slice(0, 5));
}
