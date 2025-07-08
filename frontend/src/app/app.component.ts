import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AboutComponent } from './shared/components/about/about.component';
import { ServicesComponent } from './shared/components/services/services.component';
import { PortfolioListComponent } from './modules/portfolio/components/portfolio-list/portfolio-list.component';
import { ContactFormComponent } from './modules/contact/components/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    PortfolioListComponent,
    ContactFormComponent
  ],
  template: `
    <div class="app">
      <app-header></app-header>
      
      <main class="main-content">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-background">
            <div class="code-overlay"></div>
          </div>
          <div class="hero-content">
            <div class="container">
              <div class="hero-text">
                <h1 class="hero-title">Soy Roberto Castillo</h1>
                <p class="hero-subtitle">Front-End Development - UI/UX Designer</p>
                <div class="hero-social">
                  <a href="https://github.com/Roberteban" class="social-link" target="_blank" rel="noopener">
                    <i class="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/roberto-castillo-riquelme/" class="social-link" target="_blank" rel="noopener">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a href="https://twitter.com/recastillor" class="social-link" target="_blank" rel="noopener">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <app-about></app-about>
        <app-services></app-services>
        <app-portfolio-list></app-portfolio-list>
        <app-contact-form></app-contact-form>
      </main>

      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">
              <img src="assets/images/logo.png" alt="Logo de Roberto Castillo" class="logo-img" />
            </div>
            <div class="footer-text">
              <p>&copy; {{ currentYear }} Roberto Castillo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      background: #000;
    }

    .main-content {
      padding-top: 80px;
    }

    .hero-section {
      position: relative;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    }

    .hero-background::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%234f46e5" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
      animation: float 20s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .code-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      /* COMENTADO TEMPORALMENTE - Reemplaza con tu imagen cuando la tengas */
      /* background: url('assets/images/code-bg.jpg') center/cover; */
      
      /* Fondo temporal con patrón de código CSS */
      background: 
        linear-gradient(90deg, transparent 50%, rgba(79, 70, 229, 0.03) 50%),
        linear-gradient(transparent 50%, rgba(79, 70, 229, 0.03) 50%);
      background-size: 20px 20px;
      opacity: 0.3;
      mix-blend-mode: overlay;
      
      /* Alternativa con patrón de puntos */
      background-image: radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.15) 1px, transparent 0);
      background-size: 40px 40px;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: #fff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .hero-title {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #fff 0%, #4f46e5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fadeInUp 1s ease-out;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: #ccc;
      margin-bottom: 2rem;
      animation: fadeInUp 1s ease-out 0.3s both;
    }

    .hero-social {
      display: flex;
      justify-content: center;
      gap: 1rem;
      animation: fadeInUp 1s ease-out 0.6s both;
    }

    .social-link {
      width: 50px;
      height: 50px;
      background: rgba(79, 70, 229, 0.2);
      border: 2px solid #4f46e5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4f46e5;
      font-size: 1.25rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: #4f46e5;
      color: #fff;
      transform: translateY(-3px);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .footer {
      background: #0a0a0a;
      color: #fff;
      padding: 2rem 0;
      border-top: 1px solid #333;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4f46e5;
    }

    .footer-text {
      color: #ccc;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
      }
      
      .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}