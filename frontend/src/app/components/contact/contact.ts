import { Component, inject, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ValidationError } from '../validation-error/validation-error';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, ValidationError],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  encapsulation: ViewEncapsulation.None
})
export class Contact {
  private portfolioService = inject(PortfolioService);
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
      // Handle form submission
      console.log('Form submitted:', this.contactForm.value);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.contactForm.reset();
        alert('Message sent successfully!');
      }, 1000);
    } else {
      // Mark all fields as dirty to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsDirty();
      });
    }
  }
}
