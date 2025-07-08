import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="services-section">
      <div class="container">
        <div class="services-header">
          <h2 class="section-title">WHAT I DO</h2>
          <h3 class="section-heading">SPECIALIZING IN</h3>
        </div>
        <div class="services-grid">
          <div class="service-card" *ngFor="let service of services">
            <div class="service-icon">
              <i [class]="service.icon"></i>
            </div>
            <div class="service-content">
              <h4 class="service-title">{{ service.title }}</h4>
              <p class="service-description">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      padding: 5rem 0;
      background: #0a0a0a;
      color: #fff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .services-header {
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

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .service-card {
      background: #1a1a1a;
      padding: 2rem;
      border-radius: 10px;
      display: flex;
      gap: 1.5rem;
      transition: transform 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-5px);
    }

    .service-icon {
      width: 60px;
      height: 60px;
      background: #4f46e5;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .service-icon i {
      font-size: 1.5rem;
      color: #fff;
    }

    .service-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #fff;
    }

    .service-description {
      color: #ccc;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .section-heading {
        font-size: 2rem;
      }
      
      .service-card {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class ServicesComponent {
  services = [
    {
      icon: 'fas fa-code',
      title: 'Front-end Development',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: 'fas fa-palette',
      title: 'UI/UX Designer',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];
}