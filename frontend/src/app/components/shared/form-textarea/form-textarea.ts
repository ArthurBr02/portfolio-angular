import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-textarea',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-textarea.html',
    styleUrl: './form-textarea.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormTextarea),
            multi: true
        }
    ]
})
export class FormTextarea implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() rows: number = 3;
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;

    value: string = '';
    onChange: any = () => { };
    onTouched: any = () => { };

    writeValue(value: any): void {
        this.value = value || '';
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

    onInput(event: Event): void {
        const textarea = event.target as HTMLTextAreaElement;
        this.value = textarea.value;
        this.onChange(this.value);
        this.onTouched();
    }
}
