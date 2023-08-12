import { createSelector } from '@ngrx/store';
import { AuthState } from '../types/authState';
import { BackendErrors } from 'src/app/shared/types/backendErrors';
import { CurrentUser } from 'src/app/shared/types/currentUser';

export const selectFeature = (state: { auth: AuthState }) => state.auth;

export const selectIsSubmitting = createSelector(
  selectFeature,
  (state: AuthState): boolean => state.isSubmitting
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: AuthState): boolean => state.isLoading
);

export const selectValidationErrors = createSelector(
  selectFeature,
  (state: AuthState): BackendErrors | null => state.validationErrors
);

export const selectCurrentUser = createSelector(
  selectFeature,
  (state: AuthState): CurrentUser | undefined | null => state.currentUser
);
