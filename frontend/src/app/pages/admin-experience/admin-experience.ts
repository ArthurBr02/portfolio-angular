import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperienceService } from '../../services/experience.service';
import { DeleteConfirmationModal } from '../../components/delete-confirmation-modal/delete-confirmation-modal';
import { AdminPageHeader } from '../../components/admin-page-header/admin-page-header';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { TranslatePipe } from '../../core/pipes/translate.pipe';


@Component({
    selector: 'app-admin-experience',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DeleteConfirmationModal, AdminPageHeader, FormInput, FormTextarea, TranslatePipe],
    templateUrl: './admin-experience.html',
    styleUrl: './admin-experience.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminExperience {
    private experienceService = inject(ExperienceService);
    private fb = inject(FormBuilder);

    experiences = this.experienceService.getExperiences;
    showForm = signal(false);
    isSubmitting = signal(false);

    experienceForm = this.fb.group({
        company: ['', Validators.required],
        position: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
        description: ['', Validators.required]
    });

    toggleForm() {
        this.showForm.update(v => !v);
        this.experienceForm.reset();
    }

    onSubmit() {
        if (this.experienceForm.invalid) return;

        this.isSubmitting.set(true);
        this.experienceService.createExperience(this.experienceForm.value).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.toggleForm();
            },
            error: (err) => {
                console.error('Error creating experience:', err);
                this.isSubmitting.set(false);
            }
        });
    }

    deleteId = signal<number | null>(null);
    showDeleteModal = signal(false);

    deleteExperience(id: number, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.deleteId.set(id);
        this.showDeleteModal.set(true);
    }

    confirmDelete() {
        const id = this.deleteId();
        if (id) {
            this.experienceService.deleteExperience(id).subscribe({
                next: () => {
                    console.log('Experience deleted successfully');
                    this.closeDeleteModal();
                },
                error: (err) => console.error('Error deleting experience:', err)
            });
        }
    }

    closeDeleteModal() {
        this.showDeleteModal.set(false);
        this.deleteId.set(null);
    }
}
