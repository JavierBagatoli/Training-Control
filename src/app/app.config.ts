import { ApplicationConfig, forwardRef, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRedux } from '@reduxjs/angular-redux';
import { store } from './store';
import { provideStore } from '@ngrx/store';
import { exercisesReducer } from './core/redux/reducers/exercises.reducers';
import { ExercesesEffects } from './core/redux/effects/exercises.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideRedux({ store }),
    provideStore({ exercises: exercisesReducer}),
    provideEffects(ExercesesEffects),
]
};
