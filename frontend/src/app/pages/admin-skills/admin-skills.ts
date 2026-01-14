import { Component, inject, signal, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    imports: [CommonModule, ReactiveFormsModule, DeleteConfirmationModal, AdminPageHeader, FormInput, FormFileInput, TranslatePipe],
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
            const current = this.editableSkillsByCategoryId();
            const next: Record<number, SkillItem[]> = { ...current };
            const presentIds = new Set<number>();

            for (const category of categories) {
                if (!category.id) continue;
                presentIds.add(category.id);
                if (!next[category.id]) {
                    next[category.id] = (category.skills || []).map(s => ({ ...s }));
                }
            }

            for (const key of Object.keys(next)) {
                const id = parseInt(key, 10);
                if (!presentIds.has(id)) delete next[id];
            }

            this.editableSkillsByCategoryId.set(next);
        });
    }

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

    updateSkillAutonomy(categoryId: number | undefined, skillName: string, autonomyValue: string) {
        if (!categoryId) return;
        const autonomyLevel = autonomyValue === '' ? null : parseInt(autonomyValue, 10);

        const current = this.editableSkillsByCategoryId();
        const skills = (current[categoryId] || []).map(s => ({ ...s }));
        const index = skills.findIndex(s => s.name === skillName);
        if (index === -1) return;

        skills[index].autonomyLevel = Number.isNaN(autonomyLevel as any) ? null : autonomyLevel;
        this.editableSkillsByCategoryId.set({ ...current, [categoryId]: skills });
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
}
