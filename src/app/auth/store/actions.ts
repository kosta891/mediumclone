import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequest } from '../types/register-request';
import { CurrentUser } from '@shared/types/current-user';
import { BackendErrors } from '@shared/types/backendErrors';
import { LoginRequest } from '../types/login-request';
import { CurrentUserRequest } from '@shared/types/current-user-request';

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
