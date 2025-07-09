import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/portfolio/pages/portfolio-page/portfolio-page.component').then(m => m.PortfolioPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./modules/contact/pages/contact-page/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];