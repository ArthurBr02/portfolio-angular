import { Component, inject, signal, ViewEncapsulation, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../services/skill.service';
import { PortfolioService } from '../../services/portfolio.service';
import { ToastService } from '../../services/toast.service';
import { TranslationService } from '../../services/translation.service';
import { DeleteConfirmationModal } from '../../components/delete-confirmation-modal/delete-confirmation-modal';
import { AdminPageHeader } from '../../components/admin-page-header/admin-page-header';
import { environment } from '../../../environments/environment';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormFileInput } from '../../components/shared/form-file-input/form-file-input';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { SkillItem } from '../../core/models/portfolio.models';


@Component({
    selector: 'app-admin-skills',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, DeleteConfirmationModal, AdminPageHeader, FormInput, FormFileInput, TranslatePipe],
    templateUrl: './admin-skills.html',
    styleUrl: './admin-skills.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminSkills {
    private skillService = inject(SkillService);
    private portfolioService = inject(PortfolioService);
    private toastService = inject(ToastService);
    private translationService = inject(TranslationService);
    private fb = inject(FormBuilder);

    skillCategories = this.portfolioService.getSkillCategories;
    showForm = signal(false);
    isSubmitting = signal(false);
    selectedIconFile: File | null = null;
    editingCategoryId = signal<number | null>(null);
    isEditMode = signal(false);

    private readonly editableSkillsByCategoryId = signal<Record<number, SkillItem[]>>({});
    protected readonly autonomyScale = [1, 2, 3, 4, 5] as const;

    deleteId = signal<number | null>(null);
    showDeleteModal = signal(false);

    skillForm = this.fb.group({
        name: ['', Validators.required],
        skills: ['', Validators.required]
    });

    constructor() {
        effect(() => {
            const categories = this.skillCategories();
            const current = untracked(() => this.editableSkillsByCategoryId());
            const next: Record<number, SkillItem[]> = {};
            const presentIds = new Set<number>();

            for (const category of categories) {
                if (!category.id) continue;
                presentIds.add(category.id);
                // Toujours mettre à jour depuis les catégories pour refléter les changements du backend
                next[category.id] = (category.skills || []).map(s => ({ ...s }));
            }

            this.editableSkillsByCategoryId.set(next);
        });
    }

    toggleForm() {
        this.showForm.update(v => !v);
        this.skillForm.reset();
        this.selectedIconFile = null;
        this.isEditMode.set(false);
        this.editingCategoryId.set(null);
    }

    onIconFileSelected(event: any) {
        this.selectedIconFile = event.target.files[0];
        console.log('Icon file selected:', this.selectedIconFile?.name);
    }

    onSubmit() {
        if (this.isEditMode()) {
            this.submitEdit();
            return;
        }

        console.log('Form submitted');
        console.log('Form valid:', !this.skillForm.invalid);
        console.log('Form value:', this.skillForm.value);
        console.log('Selected icon file:', this.selectedIconFile?.name);

        if (this.skillForm.invalid) {
            console.log('Form is invalid, not submitting');
            return;
        }

        if (!this.selectedIconFile) {
            this.toastService.warning(this.translationService.translate('admin.skillsPage.selectIconWarning'));
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
                this.toastService.success(this.translationService.translate('admin.skillsPage.categorySaved'));
                this.isSubmitting.set(false);
                this.toggleForm();
                this.portfolioService.refreshSkills();
            },
            error: (err) => {
                console.error('Error creating skill category:', err);
                const errorMsg = this.translationService.translate('admin.skillsPage.errorSaving');
                this.toastService.error(errorMsg + ': ' + (err.error?.error || err.message));
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
                    this.toastService.success(this.translationService.translate('admin.skillsPage.categoryDeleted'));
                    this.closeDeleteModal();
                    this.portfolioService.refreshSkills();
                },
                error: (err) => {
                    console.error('Error deleting skill category:', err);
                    this.toastService.error(this.translationService.translate('admin.skillsPage.errorDeleting'));
                }
            });
        }
    }

    closeDeleteModal() {
        this.showDeleteModal.set(false);
        this.deleteId.set(null);
    }

    getEditableSkills(categoryId: number | undefined): SkillItem[] {
        if (!categoryId) return [];
        return this.editableSkillsByCategoryId()[categoryId] || [];
    }

    updateSkillAutonomy(categoryId: number | undefined, skillName: string, autonomyValue: string | number) {
        if (!categoryId) return;
        const autonomyLevel = autonomyValue === '' || autonomyValue === null ? null : parseInt(autonomyValue.toString(), 10);

        const current = this.editableSkillsByCategoryId();
        const skills = (current[categoryId] || []).map(s => ({ ...s }));
        const index = skills.findIndex(s => s.name === skillName);
        if (index === -1) return;

        skills[index].autonomyLevel = Number.isNaN(autonomyLevel as any) ? null : autonomyLevel;
        this.editableSkillsByCategoryId.set({ ...current, [categoryId]: skills });

        // Sauvegarde automatique
        this.skillService.updateSkillCategorySkills(categoryId, skills).subscribe({
            next: () => {
                this.portfolioService.refreshSkills();
            },
            error: (err) => {
                console.error('Error updating skill autonomy:', err);
                this.toastService.error(this.translationService.translate('admin.skillsPage.autonomySaveError'));
            }
        });
    }

    saveAutonomy(categoryId: number | undefined) {
        if (!categoryId) return;
        const skills = this.getEditableSkills(categoryId);
        this.skillService.updateSkillCategorySkills(categoryId, skills).subscribe({
            next: () => {
                this.toastService.success(this.translationService.translate('admin.skillsPage.autonomySaved'));
                this.portfolioService.refreshSkills();
            },
            error: (err) => {
                console.error('Error updating skill autonomy:', err);
                this.toastService.error(this.translationService.translate('admin.skillsPage.autonomySaveError'));
            }
        });
    }

    getIconUrl(categoryId: number | undefined): string {
        if (!categoryId) return '';
        return `${environment.apiUrl}/skill-categories/${categoryId}/icon`;
    }

    editCategory(category: any) {
        if (!category.id) return;
        this.isEditMode.set(true);
        this.editingCategoryId.set(category.id);
        this.showForm.set(true);
        
        const skillsString = (category.skills || []).map((s: any) => s.name).join(', ');
        this.skillForm.patchValue({
            name: category.name,
            skills: skillsString
        });
        this.selectedIconFile = null;
    }

    cancelEdit() {
        this.isEditMode.set(false);
        this.editingCategoryId.set(null);
        this.showForm.set(false);
        this.skillForm.reset();
        this.selectedIconFile = null;
    }

    submitEdit() {
        if (this.skillForm.invalid) return;
        
        const categoryId = this.editingCategoryId();
        if (!categoryId) return;

        this.isSubmitting.set(true);

        const formData = new FormData();
        formData.append('name', this.skillForm.get('name')?.value || '');
        formData.append('skills', this.skillForm.get('skills')?.value || '');

        if (this.selectedIconFile) {
            formData.append('iconImage', this.selectedIconFile);
        }

        this.skillService.updateSkillCategory(categoryId, formData).subscribe({
            next: () => {
                this.toastService.success(this.translationService.translate('admin.skillsPage.categoryUpdated'));
                this.isSubmitting.set(false);
                this.cancelEdit();
                this.portfolioService.refreshSkills();
            },
            error: (err) => {
                console.error('Error updating skill category:', err);
                const errorMsg = this.translationService.translate('admin.skillsPage.errorUpdating');
                this.toastService.error(errorMsg + ': ' + (err.error?.error || err.message));
                this.isSubmitting.set(false);
            }
        });
    }
}
