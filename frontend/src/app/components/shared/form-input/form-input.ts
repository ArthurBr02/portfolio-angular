import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-input.html',
    styleUrl: './form-input.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormInput),
            multi: true
        }
    ]
})
export class FormInput implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
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
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
        this.onTouched();
    }
}
