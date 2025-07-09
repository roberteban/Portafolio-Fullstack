import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { AboutComponent } from '../../../../shared/components/about/about.component';
import { ServicesComponent } from '../../../../shared/components/services/services.component';
import { PortfolioListComponent } from '../../components/portfolio-list/portfolio-list.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    PortfolioListComponent
  ],
  template: `
    <app-header></app-header>
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Roberto Castillo</h1>
          <p>Full Stack Developer</p>
          <div class="hero-buttons">
            <a href="#about" class="btn btn-primary">About Me</a>
            <a href="#portfolio" class="btn btn-secondary">View Portfolio</a>
          </div>
        </div>
      </div>
    </section>

    <app-about></app-about>
    <app-services></app-services>
    <app-portfolio-list></app-portfolio-list>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Roberto Castillo. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      color: white;
      text-align: center;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    .hero-content p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 12px 30px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #fff;
      color: #667eea;
    }

    .btn-primary:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: #fff;
      border: 2px solid #fff;
    }

    .btn-secondary:hover {
      background: #fff;
      color: #667eea;
    }

    .footer {
      background: #333;
      color: white;
      padding: 2rem 0;
      text-align: center;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  `]
})
export class PortfolioPageComponent {}