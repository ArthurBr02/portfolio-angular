import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-validation-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './validation-error.html',
    styleUrl: './validation-error.css'
})
export class ValidationError {
    @Input() control: AbstractControl | null = null;
    @Input() fieldName: string = 'This field';

    get errorMessage(): string {
        if (!this.control || !this.control.errors || !this.control.dirty) {
            return '';
        }

        const errors = this.control.errors;

        if (errors['required']) {
            return `${this.fieldName} is required`;
        }
        if (errors['email']) {
            return `Please enter a valid email address`;
        }
        if (errors['minlength']) {
            return `${this.fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
        }
        if (errors['maxlength']) {
            return `${this.fieldName} must not exceed ${errors['maxlength'].requiredLength} characters`;
        }
        if (errors['pattern']) {
            return `${this.fieldName} format is invalid`;
        }
        if (errors['min']) {
            return `${this.fieldName} must be at least ${errors['min'].min}`;
        }
        if (errors['max']) {
            return `${this.fieldName} must not exceed ${errors['max'].max}`;
        }

        return 'Invalid input';
    }

    get showError(): boolean {
        return !!(this.control && this.control.invalid && this.control.dirty);
    }
}
