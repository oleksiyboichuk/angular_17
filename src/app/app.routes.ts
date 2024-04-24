import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'heroes',
    loadComponent: () => import('./features/hero/heroes.component')
      .then(c => c.HeroesComponent)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(c => c.DashboardComponent)
  },

  {
    path: 'detail/:id',
    loadComponent: () => import('./features/hero/components/hero-detail/hero-detail.component')
      .then(c => c.HeroDetailComponent) },
];
