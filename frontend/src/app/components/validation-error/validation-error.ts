import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-validation-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './validation-error.html',
    styleUrl: './validation-error.css'
})
export class ValidationError {
    private translationService = inject(TranslationService);

    @Input() control: AbstractControl | null = null;
    @Input() fieldName: string = 'This field';

    get errorMessage(): string {
        if (!this.control || !this.control.errors || !this.control.dirty) {
            return '';
        }

        const errors = this.control.errors;

        if (errors['required']) {
            return this.translationService.translate('validation.required', { field: this.fieldName });
        }
        if (errors['email']) {
            return this.translationService.translate('validation.email');
        }
        if (errors['minlength']) {
            return this.translationService.translate('validation.minlength', {
                field: this.fieldName,
                requiredLength: errors['minlength'].requiredLength
            });
        }
        if (errors['maxlength']) {
            return this.translationService.translate('validation.maxlength', {
                field: this.fieldName,
                requiredLength: errors['maxlength'].requiredLength
            });
        }
        if (errors['pattern']) {
            return this.translationService.translate('validation.pattern', { field: this.fieldName });
        }
        if (errors['min']) {
            return this.translationService.translate('validation.min', {
                field: this.fieldName,
                min: errors['min'].min
            });
        }
        if (errors['max']) {
            return this.translationService.translate('validation.max', {
                field: this.fieldName,
                max: errors['max'].max
            });
        }

        return this.translationService.translate('validation.default');
    }

    get showError(): boolean {
        return !!(this.control && this.control.invalid && this.control.dirty);
    }
}
