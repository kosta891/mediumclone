import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/authState';
import { authActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: AuthState = {
  isSubmitting: false,
  currentUser: null,
  isLoading: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    // router cleaning state when changing url location
    on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null }))
  ),
});

export const { name: authFeatureKey, reducer: authReducer } = authFeature;
