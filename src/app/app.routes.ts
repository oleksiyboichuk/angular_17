import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'heroes',
    loadComponent: () => import('./heroes/heroes.component')
      .then(c => c.HeroesComponent)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(c => c.DashboardComponent)
  },

  {
    path: 'detail/:id',
    loadComponent: () => import('./hero-detail/hero-detail.component')
      .then(c => c.HeroDetailComponent) },
];
