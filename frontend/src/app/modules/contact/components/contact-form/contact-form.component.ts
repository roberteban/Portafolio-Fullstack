import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { ContactForm } from '../../../../core/models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="contact-header">
          <h2 class="section-title">CONTACT</h2>
          <h3 class="section-heading">Have any project in mind?</h3>
        </div>

        <div class="contact-content">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
            <div class="form-group">
              <label for="name">Name *</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name"
                [class.error]="isFieldInvalid('name')"
                placeholder="Your full name">
              <div class="error-message" *ngIf="isFieldInvalid('name')">
                Name is required
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                [class.error]="isFieldInvalid('email')"
                placeholder="your.email@example.com">
              <div class="error-message" *ngIf="isFieldInvalid('email')">
                <span *ngIf="contactForm.get('email')?.errors?.['required']">Email is required</span>
                <span *ngIf="contactForm.get('email')?.errors?.['email']">Please enter a valid email</span>
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <input 
                type="text" 
                id="subject" 
                formControlName="subject"
                [class.error]="isFieldInvalid('subject')"
                placeholder="Project inquiry, job opportunity, etc.">
              <div class="error-message" *ngIf="isFieldInvalid('subject')">
                Subject is required
              </div>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea 
                id="message" 
                formControlName="message"
                [class.error]="isFieldInvalid('message')"
                placeholder="Tell me about your project, requirements, timeline, etc."
                rows="6">
              </textarea>
              <div class="error-message" *ngIf="isFieldInvalid('message')">
                Message is required
              </div>
            </div>

            <div class="form-actions">
              <button 
                type="submit" 
                class="submit-btn"
                [disabled]="contactForm.invalid || isSubmitting">
                <i class="fas fa-paper-plane" *ngIf="!isSubmitting"></i>
                <i class="fas fa-spinner fa-spin" *ngIf="isSubmitting"></i>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>

          <div class="success-message" *ngIf="showSuccess">
            <i class="fas fa-check-circle"></i>
            <h4>Message Sent Successfully!</h4>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
          </div>

          <div class="error-alert" *ngIf="submitError">
            <i class="fas fa-exclamation-triangle"></i>
            <p>{{ submitError }}</p>
            <button class="close-btn" (click)="submitError = null">×</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 5rem 0;
      background: #0a0a0a;
      color: #fff;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      color: #4f46e5;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 2px;
      margin-bottom: 1rem;
    }

    .section-heading {
      font-size: 2.5rem;
      font-weight: bold;
      color: #fff;
    }

    .contact-form {
      background: #1a1a1a;
      padding: 3rem;
      border-radius: 10px;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 2rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #fff;
      font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 1rem;
      background: #2a2a2a;
      border: 2px solid #333;
      border-radius: 5px;
      color: #fff;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      resize: vertical;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #4f46e5;
    }

    .form-group input.error,
    .form-group textarea.error {
      border-color: #ef4444;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: #888;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .form-actions {
      text-align: center;
    }

    .submit-btn {
      background: #4f46e5;
      color: #fff;
      border: none;
      padding: 1rem 2rem;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 150px;
      justify-content: center;
    }

    .submit-btn:hover:not(:disabled) {
      background: #3730a3;
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .success-message {
      background: #059669;
      color: #fff;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      animation: slideIn 0.3s ease;
    }

    .success-message i {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }

    .success-message h4 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .error-alert {
      background: #dc2626;
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 5px;
      position: relative;
      display: flex;
      align-items: center;
      gap: 1rem;
      animation: slideIn 0.3s ease;
    }

    .close-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .section-heading {
        font-size: 2rem;
      }
      
      .contact-form {
        padding: 2rem;
      }
    }
  `]
})
export class ContactFormComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;
    this.showSuccess = false;

    const formData: ContactForm = this.contactForm.value;

    this.contactService.sendMessage(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.showSuccess = true;
          this.contactForm.reset();
          setTimeout(() => {
            this.showSuccess = false;
          }, 5000);
        } else {
          this.submitError = response.message || 'Failed to send message';
        }
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.isSubmitting = false;
        this.submitError = 'Failed to send message. Please try again later.';
      }
    });
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }
}