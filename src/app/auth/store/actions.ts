import { createAction, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest';

export const register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequestInterface }>()
);
