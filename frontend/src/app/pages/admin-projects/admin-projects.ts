import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { DeleteConfirmationModal } from '../../components/delete-confirmation-modal/delete-confirmation-modal';
import { AdminPageHeader } from '../../components/admin-page-header/admin-page-header';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormFileInput } from '../../components/shared/form-file-input/form-file-input';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-admin-projects',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DeleteConfirmationModal, AdminPageHeader, FormInput, FormTextarea, FormFileInput, TranslatePipe],
    templateUrl: './admin-projects.html',
    styleUrl: './admin-projects.css',
    encapsulation: ViewEncapsulation.None
})
export class AdminProjects {
    private projectService = inject(ProjectService);
    private fb = inject(FormBuilder);

    projects = this.projectService.getProjects;
    showForm = signal(false);
    isSubmitting = signal(false);
    selectedFile: File | null = null;

    deleteId = signal<number | null>(null);
    showDeleteModal = signal(false);

    projectForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        technologies: ['', Validators.required],
        link: ['']
    });

    toggleForm() {
        this.showForm.update(v => !v);
        this.projectForm.reset();
        this.selectedFile = null;
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        if (this.projectForm.invalid) return;

        this.isSubmitting.set(true);
        const formData = new FormData();

        Object.keys(this.projectForm.value).forEach(key => {
            formData.append(key, this.projectForm.get(key)?.value || '');
        });

        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }

        this.projectService.createProject(formData).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.toggleForm();
            },
            error: (err) => {
                console.error('Error creating project:', err);
                this.isSubmitting.set(false);
            }
        });
    }

    deleteProject(id: number, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.deleteId.set(id);
        this.showDeleteModal.set(true);
    }

    confirmDelete() {
        const id = this.deleteId();
        if (id) {
            this.projectService.deleteProject(id).subscribe({
                next: () => {
                    console.log('Project deleted successfully');
                    this.closeDeleteModal();
                },
                error: (err) => console.error('Error deleting project:', err)
            });
        }
    }

    closeDeleteModal() {
        this.showDeleteModal.set(false);
        this.deleteId.set(null);
    }
}
