import { Component, input, output, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-add-translation-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslatePipe],
    templateUrl: './add-translation-modal.html',
    styleUrl: './add-translation-modal.css',
    encapsulation: ViewEncapsulation.None
})
export class AddTranslationModal {
    isOpen = input.required<boolean>();
    existingKeys = input<string[]>([]);

    confirm = output<{ path: string; enValue: string; frValue: string }>();
    cancel = output<void>();

    translationPath = signal('');
    enValue = signal('');
    frValue = signal('');
    errorMessage = signal('');

    onConfirm() {
        const path = this.translationPath().trim();
        const en = this.enValue().trim();
        const fr = this.frValue().trim();

        // Validation
        if (!path) {
            this.errorMessage.set('Translation path is required');
            return;
        }

        const keys = path.split('.');
        if (keys.length < 2) {
            this.errorMessage.set('Invalid path format. Use: category.key or category.subcategory.key');
            return;
        }

        if (this.existingKeys().includes(path)) {
            this.errorMessage.set('This translation key already exists');
            return;
        }

        if (!en || !fr) {
            this.errorMessage.set('Both English and French translations are required');
            return;
        }

        // Emit the new translation
        this.confirm.emit({ path, enValue: en, frValue: fr });
        this.resetForm();
    }

    onCancel() {
        this.resetForm();
        this.cancel.emit();
    }

    resetForm() {
        this.translationPath.set('');
        this.enValue.set('');
        this.frValue.set('');
        this.errorMessage.set('');
    }
}
