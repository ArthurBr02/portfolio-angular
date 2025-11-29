import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EducationService } from '../../services/education.service';
import { DeleteConfirmationModal } from '../../components/delete-confirmation-modal/delete-confirmation-modal';
import { AdminPageHeader } from '../../components/admin-page-header/admin-page-header';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';


@Component({
    selector: 'app-admin-education',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DeleteConfirmationModal, AdminPageHeader, FormInput, FormTextarea],
    templateUrl: './admin-education.html',
    styleUrl: './admin-education.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminEducation {
    private educationService = inject(EducationService);
    private fb = inject(FormBuilder);

    education = this.educationService.getEducation;
    showForm = signal(false);
    isSubmitting = signal(false);

    educationForm = this.fb.group({
        institution: ['', Validators.required],
        degree: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
        description: ['', Validators.required]
    });

    toggleForm() {
        this.showForm.update(v => !v);
        this.educationForm.reset();
    }

    onSubmit() {
        if (this.educationForm.invalid) return;

        this.isSubmitting.set(true);
        this.educationService.createEducation(this.educationForm.value).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.toggleForm();
            },
            error: (err) => {
                console.error('Error creating education:', err);
                this.isSubmitting.set(false);
            }
        });
    }

    deleteId = signal<number | null>(null);
    showDeleteModal = signal(false);

    deleteEducation(id: number, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.deleteId.set(id);
        this.showDeleteModal.set(true);
    }

    confirmDelete() {
        const id = this.deleteId();
        if (id) {
            this.educationService.deleteEducation(id).subscribe({
                next: () => {
                    console.log('Education deleted successfully');
                    this.closeDeleteModal();
                },
                error: (err) => console.error('Error deleting education:', err)
            });
        }
    }

    closeDeleteModal() {
        this.showDeleteModal.set(false);
        this.deleteId.set(null);
    }
}
