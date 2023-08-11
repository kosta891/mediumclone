import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/authState';
import { authActions } from './actions';

const initialState: AuthState = {
  isSubmitting: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({ ...state, isSubmitting: true }))
  ),
});

export const { name: authFeatureKey, reducer: authReducer } = authFeature;
