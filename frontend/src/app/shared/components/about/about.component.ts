import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-image">
            <img src="assets/images/workspace.jpg" alt="Workspace" />
          </div>
          <div class="about-text">
            <h2 class="section-title">ABOUT ME</h2>
            <h3 class="about-name">Soy Roberto Castillo</h3>
            <p class="about-description">
              Me apasiona transformar ideas en experiencias digitales. Como Ingeniero Civil en Computación, 
              fusiono lógica y diseño para construir interfaces atractivas, funcionales y centradas en el usuario. 
            </p>
            <p class="about-description">
              Disfruto trabajar con tecnologías modernas como Angular, React y TypeScript, y constantemente me desafío 
              para aprender más sobre inteligencia artificial y desarrollo innovador. Cada línea de código es una oportunidad 
              para mejorar el mundo digital.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 5rem 0;
      background: #111;
      color: #fff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-image {
      position: relative;
    }

    .about-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 10px;
    }

    .section-title {
      color: #4f46e5;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 2px;
      margin-bottom: 1rem;
    }

    .about-name {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 2rem;
      color: #fff;
    }

    .about-description {
      color: #ccc;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .about-name {
        font-size: 2rem;
      }
    }
  `]
})
export class AboutComponent {}