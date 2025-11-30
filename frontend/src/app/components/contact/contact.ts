import { Component, inject, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';
import { ValidationError } from '../validation-error/validation-error';
import { FormInput } from '../shared/form-input/form-input';
import { FormTextarea } from '../shared/form-textarea/form-textarea';
import { TranslationService } from '../../services/translation.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, ValidationError, FormInput, FormTextarea, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  encapsulation: ViewEncapsulation.None
})
export class Contact {
  private portfolioService = inject(PortfolioService);
  private contactService = inject(ContactService);
  private translationService = inject(TranslationService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  protected readonly personalInfo = this.portfolioService.getPersonalInfo;
  protected readonly isSubmitting = signal(false);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);

      this.contactService.sendContactMessage(this.contactForm.value as any).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.contactForm.reset();

          // Reset form state
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null);
            this.contactForm.get(key)?.markAsPristine();
            this.contactForm.get(key)?.markAsUntouched();
          });

          this.toastService.success(this.translationService.translate('contact.success'));
        },
        error: (error) => {
          this.isSubmitting.set(false);
          console.error('Error sending message:', error);

          const errorMessage = error.error?.error || this.translationService.translate('contact.error');
          this.toastService.error(errorMessage);
        }
      });
    } else {
      // Mark all fields as dirty to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsDirty();
      });
    }
  }
}
