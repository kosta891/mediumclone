import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/effects';
import { FeedEffects } from '@shared/components/feed/store/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authInterceptor } from '@shared/services/auth-interceptor';
import {
  feedFeatureKey,
  feedReducer,
} from '@shared/components/feed/store/reducers';
import { PopularTagsEffects } from '@shared/components/popular-tags/store/effects';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from '@shared/components/popular-tags/store/reducers';
import { AddToFavoritesEffects } from '@shared/components/add-to-favorites/store/effects';
import { provideServiceWorker } from '@angular/service-worker';
// drugi nacin renderovanje ispod
// import * as authEffects from './auth/store/effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStore({
        router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(AuthEffects, FeedEffects, PopularTagsEffects, AddToFavoritesEffects),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
    }),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
};
