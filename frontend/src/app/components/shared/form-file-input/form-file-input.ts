import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-form-file-input',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './form-file-input.html',
    styleUrl: './form-file-input.css'
})
export class FormFileInput {
    @Input() label: string = '';
    @Input() accept: string = '';
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Output() fileSelected = new EventEmitter<Event>();

    fileName: string = '';

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.fileName = input.files[0].name;
        } else {
            this.fileName = '';
        }
        this.fileSelected.emit(event);
    }
}
