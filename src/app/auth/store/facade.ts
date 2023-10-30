import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './selectors';
import { AuthState } from '../types/authState';
import { BackendErrors } from 'src/app/shared/types/backendErrors';
import { CurrentUser } from 'src/app/shared/types/current-user';
import { authActions } from './actions';
import { LoginRequest } from '../types/loginRequest';
import { CurrentUserRequest } from 'src/app/shared/types/current-user-request';

@Injectable()
export class AuthStateFacade {
  isSubmitting$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsSubmitting)
  );

  isLoading$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsLoading)
  );

  backendErrors$: Observable<BackendErrors | null> = this.store.pipe(
    select(Selectors.selectValidationErrors)
  );

  currentUser$: Observable<CurrentUser | null | undefined> = this.store.pipe(
    select(Selectors.selectCurrentUser)
  );

  login(request: LoginRequest): void {
    this.store.dispatch(authActions.login({ request }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  updateCurrentUser(currentUserRequest: CurrentUserRequest): void {
    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
  }

  constructor(private store: Store<{ auth: AuthState }>) {}
  // @Inject(CONFIG) private config: Config,
}
