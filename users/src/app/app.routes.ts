import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as userEffects from './store/user.effects';
import { usersFeature } from './store/user.feature';
export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home.component').then((c) => c.HomeComponent),
    providers: [provideState(usersFeature), provideEffects(userEffects)],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/user-detail.component').then(
        (c) => c.UserDetailComponent
      ),
  },
];
