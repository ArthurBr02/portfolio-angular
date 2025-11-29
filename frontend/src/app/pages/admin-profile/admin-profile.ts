import { Component, inject, signal, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { FormInput } from '../../components/shared/form-input/form-input';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-admin-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormInput, TranslatePipe],
    templateUrl: './admin-profile.html',
    styleUrl: './admin-profile.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminProfile {
    private profileService = inject(ProfileService);
    private fb = inject(FormBuilder);

    profile = this.profileService.getProfile;
    isSubmitting = signal(false);
    selectedFile: File | null = null;
    previewUrl = signal<string | null>(null);

    profileForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: [0, [Validators.required, Validators.min(0)]],
        email: ['', [Validators.required, Validators.email]],
        github: [''],
        linkedin: [''],
        twitter: [''],
        instagram: ['']
    });

    constructor() {
        effect(() => {
            const p = this.profile();
            if (p) {
                this.profileForm.patchValue({
                    firstName: p.firstName,
                    lastName: p.lastName,
                    age: p.age,
                    email: p.email,
                    github: p.github,
                    linkedin: p.linkedin,
                    twitter: p.twitter,
                    instagram: p.instagram
                });
                this.previewUrl.set(p.profilePicture || null);
            }
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    }

    onSubmit() {
        if (this.profileForm.invalid) return;

        this.isSubmitting.set(true);
        const formData = new FormData();

        Object.keys(this.profileForm.value).forEach(key => {
            formData.append(key, this.profileForm.get(key)?.value || '');
        });

        if (this.selectedFile) {
            formData.append('profilePicture', this.selectedFile);
        }

        this.profileService.updateProfile(formData).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                alert('Profile updated successfully!');
            },
            error: (err) => {
                console.error('Error updating profile:', err);
                this.isSubmitting.set(false);
                alert('Error updating profile');
            }
        });
    }
}
