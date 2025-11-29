import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-page-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-page-header.html',
    styleUrl: './admin-page-header.css'
})
export class AdminPageHeader {
    @Input() title: string = '';
    @Input() buttonText: string = 'Add New';
    @Input() showForm: boolean = false;
    @Output() buttonClick = new EventEmitter<void>();

    onButtonClick() {
        this.buttonClick.emit();
    }
}
