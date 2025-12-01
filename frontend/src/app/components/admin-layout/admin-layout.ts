import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslatePipe, LanguageSwitcherComponent],
    templateUrl: './admin-layout.html',
    styleUrl: './admin-layout.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminLayout {
    private authService = inject(AuthService);
    private profileService = inject(ProfileService);

    profile = this.profileService.getProfile;

    logout() {
        this.authService.logout();
    }
}
