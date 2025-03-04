import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { USERS_ROUTES } from './app.routes';
import * as userEffects from './store/user.effects';
import { usersFeature } from './store/user.feature';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(USERS_ROUTES, withComponentInputBinding()),
    provideHttpClient(),
    provideStore(),
    provideState(usersFeature),
    provideEffects(userEffects),
    provideStoreDevtools({
      maxAge: 25,
      trace: true,
    }),
  ],
};
