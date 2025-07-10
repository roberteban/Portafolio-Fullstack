import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent
  ],
  template: `
    <div class="app">
      <app-header></app-header>

      <main class="main-content">
        <router-outlet></router-outlet>
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

    .footer-text {
      color: #ccc;
    }

    @media (max-width: 768px) {
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
