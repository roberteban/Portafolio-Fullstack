import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ContactFormComponent
  ],
  template: `
    <app-header></app-header>
    
    <section class="contact-hero">
      <div class="container">
        <h1>Get In Touch</h1>
        <p>Let's discuss your next project</p>
      </div>
    </section>

    <app-contact-form></app-contact-form>
  `,
  styles: [`
    .contact-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 120px 0 80px;
      color: white;
      text-align: center;
    }

    .contact-hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .contact-hero p {
      font-size: 1.2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  `]
})
export class ContactPageComponent {}