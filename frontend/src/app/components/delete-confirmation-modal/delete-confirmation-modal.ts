import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-delete-confirmation-modal',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './delete-confirmation-modal.html',
    styleUrl: './delete-confirmation-modal.css',
    encapsulation: ViewEncapsulation.None
})
export class DeleteConfirmationModal {
    isOpen = input.required<boolean>();
    title = input<string>('Confirm Delete');
    message = input<string>('Are you sure you want to delete this item? This action cannot be undone.');

    confirm = output<void>();
    cancel = output<void>();

    onConfirm() {
        this.confirm.emit();
    }

    onCancel() {
        this.cancel.emit();
    }
}
