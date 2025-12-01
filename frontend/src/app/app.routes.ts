import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './components/login/login';
import { AdminLayout } from './components/admin-layout/admin-layout';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth.guard';
import { AdminProjects } from './pages/admin-projects/admin-projects';
import { AdminExperience } from './pages/admin-experience/admin-experience';
import { AdminEducation } from './pages/admin-education/admin-education';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: AdminDashboard },
            { path: 'projects', component: AdminProjects },
            { path: 'experience', component: AdminExperience },
            { path: 'education', component: AdminEducation },
            { path: 'skills', loadComponent: () => import('./pages/admin-skills/admin-skills').then(m => m.AdminSkills) },
            { path: 'profile', loadComponent: () => import('./pages/admin-profile/admin-profile').then(m => m.AdminProfile) },
            { path: 'translations', loadComponent: () => import('./pages/admin-translations/admin-translations').then(m => m.AdminTranslations) }
        ]
    },
    { path: '**', redirectTo: '' }
];
