import { Routes } from '@angular/router';

export const routes: Routes = [{
	path: 'heroes',
	loadComponent: () => import('./heroes/heroes.component')
		.then(c => c.HeroesComponent)
}];
