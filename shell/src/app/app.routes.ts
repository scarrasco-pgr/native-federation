import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      loadRemoteModule('recipes', './Routes').then((r) => r.RECIPES_ROUTES),
  },
  {
    path: 'users',
    loadChildren: () =>
      loadRemoteModule('users', './Routes').then((r) => r.USERS_ROUTES),
  },
  {
    path: 'mismatch',
    loadComponent: () =>
      loadRemoteModule('mismatch', './Component').then((c) => c.AppComponent),
  },
];
