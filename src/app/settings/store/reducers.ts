import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingsState } from '../types/settingsState';
import { authActions } from 'src/app/auth/store/actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: SettingsState = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state, action) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      validationErrors: action.errors,
    })),

    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = settingsFeature;
