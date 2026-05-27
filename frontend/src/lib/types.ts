export interface Profile {
  id: number;
  name: string | null;
  title: string | null;
  title_en: string | null;
  bio: string | null;
  bio_en: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  cv_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  available_for_work: number;
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  sort_order: number;
}

export interface Project {
  id: number;
  title_fr: string | null;
  title_en: string | null;
  description_fr: string | null;
  description_en: string | null;
  short_description_fr: string | null;
  short_description_en: string | null;
  image_url: string | null;
  demo_url: string | null;
  repo_url: string | null;
  technologies: string | null;
  category: string | null;
  sort_order: number;
  created_at: string;
  images?: ProjectImage[];
}

export interface Experience {
  id: number;
  company: string | null;
  role_fr: string | null;
  role_en: string | null;
  description_fr: string | null;
  description_en: string | null;
  start_date: string | null;
  end_date: string | null;
  current: number;
  sort_order: number;
}

export interface Education {
  id: number;
  school: string | null;
  degree_fr: string | null;
  degree_en: string | null;
  description_fr: string | null;
  description_en: string | null;
  start_date: string | null;
  end_date: string | null;
  sort_order: number;
  ue: EducationUe[];
}

export interface EducationUe {
  id: number;
  education_id: number;
  semester: string | null;
  code: string | null;
  name: string;
  description: string | null;
  sort_order: number;
}

export interface Skill {
  id: number;
  name: string | null;
  icon: string | null;
  category_fr: string | null;
  category_en: string | null;
  level: 1 | 2 | 3;
  sort_order: number;
}

export interface Message {
  id: number;
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  is_read: number;
  created_at: string;
}

export type Settings = Record<string, string>;

export interface AnalyticsData {
  views: { date: string; count: number }[];
  totalViews: number;
  projectCount: number;
  experienceCount: number;
  unreadMessageCount: number;
  activeSections: number;
  recentMessages: Message[];
}
