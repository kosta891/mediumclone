import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequest } from '../types/registerRequest';
import { CurrentUser } from 'src/app/shared/types/current-user';
import { BackendErrors } from 'src/app/shared/types/backendErrors';
import { LoginRequest } from '../types/loginRequest';
import { CurrentUserRequest } from 'src/app/shared/types/current-user-request';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequest }>(),
    'Register Success': props<{ currentUser: CurrentUser }>(),
    'Register Failure': props<{ errors: BackendErrors }>(),

    Login: props<{ request: LoginRequest }>(),
    'Login Success': props<{ currentUser: CurrentUser }>(),
    'Login Failure': props<{ errors: BackendErrors }>(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: CurrentUser }>(),
    'Get Current User Failure': emptyProps(),

    'Update Current User': props<{ currentUserRequest: CurrentUserRequest }>(),
    'Update Current User Success': props<{ currentUser: CurrentUser }>(),
    'Update Current User Failure': props<{ errors: BackendErrors }>(),

    Logout: emptyProps(),
  },
});

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// );

// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{ request: RegisterRequestInterface }>()
// );

// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{ request: RegisterRequestInterface }>()
// );
