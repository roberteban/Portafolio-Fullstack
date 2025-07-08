import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">
          <img src="assets/images/logo.png" alt="Logo de Roberto Castillo" class="logo-img" />
        </div>
        <ul class="nav-menu" [class.active]="isMenuOpen">
          <li><a href="#about" (click)="closeMenu()">ABOUT</a></li>
          <li><a href="#services" (click)="closeMenu()">WHAT I DO</a></li>
          <li><a href="#portfolio" (click)="closeMenu()">WORK</a></li>
          <li><a href="#contact" (click)="closeMenu()">CONTACT</a></li>
        </ul>
        <div class="hamburger" (click)="toggleMenu()" [class.active]="isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      z-index: 1000;
      padding: 1rem 0;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
    }

    .nav-menu {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .nav-menu a {
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-menu a:hover {
      color: #4f46e5;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
    }

    .hamburger span {
      width: 25px;
      height: 3px;
      background: #fff;
      margin: 3px 0;
      transition: 0.3s;
    }

    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }

      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.95);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        padding: 2rem 0;
      }

      .nav-menu.active {
        left: 0;
      }

      .hamburger.active span:nth-child(2) {
        opacity: 0;
      }

      .hamburger.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      .hamburger.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}