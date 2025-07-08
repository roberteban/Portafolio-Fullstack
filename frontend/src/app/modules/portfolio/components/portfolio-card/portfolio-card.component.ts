import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository } from '../../../../core/models/repository.model';
import { TechFormatPipe } from '../../../../shared/pipes/tech-format.pipe';

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [CommonModule, TechFormatPipe],
  template: `
    <div class="portfolio-card">
      <div class="card-image">
        <img [src]="repository.image || 'assets/images/project-placeholder.jpg'" 
             [alt]="repository.name" />
        <div class="card-overlay">
          <div class="card-actions">
            <a [href]="repository.url" target="_blank" class="btn-view">
              <i class="fab fa-github"></i>
              View Code
            </a>
          </div>
        </div>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ repository.name }}</h3>
        <p class="card-description">{{ repository.description || 'No description available' }}</p>
        <div class="card-meta">
          <div class="card-tech">
            <span class="tech-label">Tech:</span>
            <span class="tech-list">{{ repository.technologies | techFormat }}</span>
          </div>
          <div class="card-stats" *ngIf="repository.stars !== undefined">
            <span class="stat">
              <i class="fas fa-star"></i>
              {{ repository.stars }}
            </span>
            <span class="stat">
              <i class="fas fa-code-branch"></i>
              {{ repository.forks }}
            </span>
          </div>
        </div>
        <div class="card-date">
          Updated: {{ repository.githubUpdatedAt | date:'mediumDate' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .portfolio-card {
      background: #1a1a1a;
      border-radius: 10px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .portfolio-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
    }

    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .portfolio-card:hover .card-image img {
      transform: scale(1.05);
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .portfolio-card:hover .card-overlay {
      opacity: 1;
    }

    .btn-view {
      background: #4f46e5;
      color: #fff;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 500;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-view:hover {
      background: #3730a3;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-title {
      color: #fff;
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
      text-transform: capitalize;
    }

    .card-description {
      color: #ccc;
      line-height: 1.5;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .card-tech {
      flex: 1;
    }

    .tech-label {
      color: #4f46e5;
      font-weight: 500;
      margin-right: 0.5rem;
    }

    .tech-list {
      color: #ccc;
      font-size: 0.9rem;
    }

    .card-stats {
      display: flex;
      gap: 1rem;
    }

    .stat {
      color: #ccc;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .stat i {
      color: #4f46e5;
    }

    .card-date {
      color: #888;
      font-size: 0.8rem;
      border-top: 1px solid #333;
      padding-top: 1rem;
    }

    @media (max-width: 768px) {
      .card-meta {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class PortfolioCardComponent {
  @Input() repository!: Repository;
}