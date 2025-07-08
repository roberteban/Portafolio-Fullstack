import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../../../core/services/github.service';
import { Repository } from '../../../../core/models/repository.model';
import { PortfolioCardComponent } from '../portfolio-card/portfolio-card.component';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, PortfolioCardComponent],
  template: `
    <section id="portfolio" class="portfolio-section">
      <div class="container">
        <div class="portfolio-header">
          <h2 class="section-title">PORTFOLIO</h2>
          <h3 class="section-heading">LATEST PROJECTS</h3>
          <button class="sync-btn" (click)="syncRepositories()" [disabled]="isLoading">
            <i class="fas fa-sync" [class.fa-spin]="isLoading"></i>
            {{ isLoading ? 'Syncing...' : 'Sync GitHub' }}
          </button>
        </div>
        
        <div class="loading-state" *ngIf="isLoading && repositories.length === 0">
          <div class="spinner"></div>
          <p>Loading projects...</p>
        </div>

        <div class="error-state" *ngIf="error">
          <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>{{ error }}</p>
            <button class="retry-btn" (click)="loadRepositories()">Try Again</button>
          </div>
        </div>

        <div class="empty-state" *ngIf="!isLoading && !error && repositories.length === 0">
          <div class="empty-message">
            <i class="fab fa-github"></i>
            <p>No projects found. Sync with GitHub to load your repositories.</p>
          </div>
        </div>

        <div class="portfolio-grid" *ngIf="repositories.length > 0">
          <app-portfolio-card 
            *ngFor="let repo of repositories; trackBy: trackByFn"
            [repository]="repo">
          </app-portfolio-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio-section {
      padding: 5rem 0;
      background: #111;
      color: #fff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .portfolio-header {
      text-align: center;
      margin-bottom: 4rem;
      position: relative;
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
      margin-bottom: 2rem;
    }

    .sync-btn {
      background: #4f46e5;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 auto;
    }

    .sync-btn:hover:not(:disabled) {
      background: #3730a3;
    }

    .sync-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .loading-state, .error-state, .empty-state {
      text-align: center;
      padding: 4rem 0;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #333;
      border-top: 4px solid #4f46e5;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message, .empty-message {
      color: #ccc;
    }

    .error-message i, .empty-message i {
      font-size: 3rem;
      color: #4f46e5;
      margin-bottom: 1rem;
      display: block;
    }

    .retry-btn {
      background: #4f46e5;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 1rem;
      transition: background 0.3s ease;
    }

    .retry-btn:hover {
      background: #3730a3;
    }

    @media (max-width: 768px) {
      .section-heading {
        font-size: 2rem;
      }
      
      .portfolio-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PortfolioListComponent implements OnInit {
  repositories: Repository[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.loadRepositories();
  }
  
  loadRepositories() {
    this.isLoading = true;
    this.error = null;
    
    this.githubService.getRepositories().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.repositories = response.data.slice(0, 3);
        } else {
          this.repositories = [];
          this.error = 'No repositories found';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading repositories:', error);
        this.error = 'Failed to load projects. Please try again.';
        this.isLoading = false;
      }
    });
  }

  syncRepositories() {
    this.isLoading = true;
    this.error = null;

    this.githubService.syncRepositories().subscribe({
      next: (response) => {
        if (response.success) {
          this.loadRepositories();
        } else {
          this.error = 'Failed to sync repositories';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error syncing repositories:', error);
        this.error = 'Failed to sync with GitHub. Please try again.';
        this.isLoading = false;
      }
    });
  }

  trackByFn(index: number, item: Repository): string {
    return item._id || item.name;
  }
}