import { Routes } from '@angular/router';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((c) => c.AppComponent),
  },
];
