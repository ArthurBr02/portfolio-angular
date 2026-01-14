export interface SkillCategory {
    id?: number;
    name: string;
    icon: string;
    skills: SkillItem[];
}

export interface SkillItem {
    name: string;
    autonomyLevel: number | null;
}
