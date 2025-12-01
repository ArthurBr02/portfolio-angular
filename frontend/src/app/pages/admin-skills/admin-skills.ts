import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../services/skill.service';
import { PortfolioService } from '../../services/portfolio.service';
import { ToastService } from '../../services/toast.service';
import { DeleteConfirmationModal } from '../../components/delete-confirmation-modal/delete-confirmation-modal';
import { AdminPageHeader } from '../../components/admin-page-header/admin-page-header';
import { environment } from '../../../environments/environment';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormFileInput } from '../../components/shared/form-file-input/form-file-input';
import { TranslatePipe } from '../../core/pipes/translate.pipe';


@Component({
    selector: 'app-admin-skills',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DeleteConfirmationModal, AdminPageHeader, FormInput, FormFileInput, TranslatePipe],
    templateUrl: './admin-skills.html',
    styleUrl: './admin-skills.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminSkills {
    private skillService = inject(SkillService);
    private portfolioService = inject(PortfolioService);
    private toastService = inject(ToastService);
    private fb = inject(FormBuilder);

    skillCategories = this.portfolioService.getSkillCategories;
    showForm = signal(false);
    isSubmitting = signal(false);
    selectedIconFile: File | null = null;

    deleteId = signal<number | null>(null);
    showDeleteModal = signal(false);

    skillForm = this.fb.group({
        name: ['', Validators.required],
        skills: ['', Validators.required]
    });

    toggleForm() {
        this.showForm.update(v => !v);
        this.skillForm.reset();
        this.selectedIconFile = null;
    }

    onIconFileSelected(event: any) {
        this.selectedIconFile = event.target.files[0];
        console.log('Icon file selected:', this.selectedIconFile?.name);
    }

    onSubmit() {
        console.log('Form submitted');
        console.log('Form valid:', !this.skillForm.invalid);
        console.log('Form value:', this.skillForm.value);
        console.log('Selected icon file:', this.selectedIconFile?.name);

        if (this.skillForm.invalid) {
            console.log('Form is invalid, not submitting');
            return;
        }

        if (!this.selectedIconFile) {
            this.toastService.warning('Please select an icon image');
            return;
        }

        this.isSubmitting.set(true);

        const formData = new FormData();
        formData.append('name', this.skillForm.get('name')?.value || '');
        formData.append('skills', this.skillForm.get('skills')?.value || '');

        if (this.selectedIconFile) {
            formData.append('iconImage', this.selectedIconFile);
        }

        console.log('Sending category to API with FormData');

        this.skillService.addSkillCategory(formData).subscribe({
            next: (category) => {
                console.log('Category saved successfully:', category);
                this.toastService.success('Category saved successfully');
                this.isSubmitting.set(false);
                this.toggleForm();
                this.portfolioService.refreshSkills();
            },
            error: (err) => {
                console.error('Error creating skill category:', err);
                this.toastService.error('Error saving category: ' + (err.error?.error || err.message));
                this.isSubmitting.set(false);
            }
        });
    }

    deleteCategory(id: number | undefined, event: Event) {
        if (!id) return;
        event.preventDefault();
        event.stopPropagation();
        this.deleteId.set(id);
        this.showDeleteModal.set(true);
    }

    confirmDelete() {
        const id = this.deleteId();
        if (id) {
            this.skillService.deleteSkillCategory(id).subscribe({
                next: () => {
                    console.log('Skill category deleted successfully');
                    this.toastService.success('Skill category deleted successfully');
                    this.closeDeleteModal();
                    this.portfolioService.refreshSkills();
                },
                error: (err) => {
                    console.error('Error deleting skill category:', err);
                    this.toastService.error('Error deleting skill category');
                }
            });
        }
    }

    closeDeleteModal() {
        this.showDeleteModal.set(false);
        this.deleteId.set(null);
    }

    getIconUrl(categoryId: number | undefined): string {
        if (!categoryId) return '';
        return `${environment.apiUrl}/skill-categories/${categoryId}/icon`;
    }
}
