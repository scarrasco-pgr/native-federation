import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NOTES_ROUTES } from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(NOTES_ROUTES),
    provideAnimations(),
    provideHttpClient(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      trace: true,
    }),
  ],
};
