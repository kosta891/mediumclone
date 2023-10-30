import { Route } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { provideState } from '@ngrx/store';
import { settingsFeatureKey, settingsReducer } from './store/reducers';
import { AuthStateFacade } from '../auth/store/facade';

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [
      AuthStateFacade,
      provideState(settingsFeatureKey, settingsReducer),
    ],
  },
];
