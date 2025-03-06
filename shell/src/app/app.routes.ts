import { Routes } from '@angular/router';
import { IframeContainerComponent } from './components/iframe-container/iframe-container.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'recipes',
    component: IframeContainerComponent,
    data: {
      src: 'http://localhost:4202',
    },
  },
  {
    path: 'users',
    component: IframeContainerComponent,
    data: {
      src: 'http://localhost:4201',
    },
  },
  {
    path: 'mismatch',
    component: IframeContainerComponent,
    data: {
      src: 'http://localhost:4204',
    },
  },
];
