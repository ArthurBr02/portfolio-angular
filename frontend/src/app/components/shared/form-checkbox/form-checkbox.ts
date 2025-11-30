import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-checkbox',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-checkbox.html',
    styleUrl: './form-checkbox.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormCheckbox),
            multi: true
        }
    ]
})
export class FormCheckbox implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() helpText?: string;
    @Input() disabled: boolean = false;

    checked: boolean = false;
    onChange: any = () => { };
    onTouched: any = () => { };

    writeValue(value: any): void {
        this.checked = !!value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onCheckboxChange(event: Event): void {
        const checkbox = event.target as HTMLInputElement;
        this.checked = checkbox.checked;
        this.onChange(this.checked);
        this.onTouched();
    }
}
