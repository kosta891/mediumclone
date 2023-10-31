import { Route } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { provideState } from '@ngrx/store';
import { userProfileFeatureKey, userProfileReducer } from './store/reducers';
import { provideEffects } from '@ngrx/effects';
import { UserProfileEffects } from './store/effects';
import { AuthStateFacade } from '../auth/store/facade';

export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(UserProfileEffects),
      AuthStateFacade,
    ],
  },
];
