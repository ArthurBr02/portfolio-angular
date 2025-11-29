# Reusable Form Components

This directory contains reusable form input components for the admin panel.

## Components

### 1. FormInput
A versatile input component that supports various input types.

**Usage:**
```html
<app-form-input 
    label="Email" 
    type="email"
    formControlName="email"
    [required]="true"
    placeholder="Enter your email">
</app-form-input>
```

**Props:**
- `label` (string): Label text for the input
- `type` (string): Input type (text, email, url, number, etc.) - default: 'text'
- `placeholder` (string): Placeholder text
- `required` (boolean): Shows required asterisk - default: false
- `disabled` (boolean): Disables the input - default: false

**Integration:**
Works seamlessly with Angular Reactive Forms using `formControlName`.

---

### 2. FormTextarea
A textarea component for multi-line text input.

**Usage:**
```html
<app-form-textarea 
    label="Description" 
    formControlName="description"
    [required]="true"
    [rows]="5"
    placeholder="Enter description">
</app-form-textarea>
```

**Props:**
- `label` (string): Label text for the textarea
- `placeholder` (string): Placeholder text
- `rows` (number): Number of visible text rows - default: 3
- `required` (boolean): Shows required asterisk - default: false
- `disabled` (boolean): Disables the textarea - default: false

**Integration:**
Works seamlessly with Angular Reactive Forms using `formControlName`.

---

### 3. FormFileInput
A styled file input component with file name display.

**Usage:**
```html
<app-form-file-input 
    label="Profile Picture" 
    accept="image/*"
    [required]="true"
    (fileSelected)="onFileSelected($event)">
</app-form-file-input>
```

**Props:**
- `label` (string): Label text for the file input
- `accept` (string): File type filter (e.g., 'image/*', '.pdf', etc.)
- `required` (boolean): Shows required asterisk - default: false
- `disabled` (boolean): Disables the input - default: false

**Events:**
- `fileSelected`: Emitted when a file is selected, passes the change event

**Component Handler:**
```typescript
onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
    }
}
```

---

## Complete Example

```typescript
// Component TypeScript
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormFileInput } from '../../components/shared/form-file-input/form-file-input';

@Component({
    imports: [FormInput, FormTextarea, FormFileInput, ReactiveFormsModule],
    // ...
})
export class MyComponent {
    form = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        email: ['', [Validators.required, Validators.email]]
    });

    selectedFile: File | null = null;

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }
}
```

```html
<!-- Component Template -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <app-form-input 
        label="Title" 
        formControlName="title"
        [required]="true">
    </app-form-input>

    <app-form-textarea 
        label="Description" 
        formControlName="description"
        [rows]="4">
    </app-form-textarea>

    <app-form-input 
        label="Email" 
        type="email"
        formControlName="email"
        [required]="true">
    </app-form-input>

    <app-form-file-input 
        label="Attachment" 
        (fileSelected)="onFileSelected($event)">
    </app-form-file-input>

    <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

## Styling

All components use CSS variables from your global styles:
- `--color-text-primary`
- `--color-text-secondary`
- `--color-primary`
- `--color-error`
- `--radius-md`
- `--transition-base`

The components automatically match your existing admin panel design.
