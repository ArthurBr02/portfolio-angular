import { SkillCategory } from './skill.model';
import { Project } from './project.model';
import { Experience } from './experience.model';
import { Education } from './education.model';

export interface PortfolioData {
    name: string;
    yearsOfExperience: number;
    projectsCompleted: number;
    technologiesUsed: number;
    skillCategories: SkillCategory[];
    projects: Project[];
    experiences: Experience[];
    education: Education[];
}
export interface PersonalInfo {
    name: string;
    role: string;
    description: string;
    email: string;
    socials: {
        github: string;
        linkedin: string;
        twitter: string;
        instagram: string;
    };
    stats: {
        yearsExperience: number;
        projectsCompleted: number;
        technologiesMastered: number;
    };
    profilePicture?: string;
}
