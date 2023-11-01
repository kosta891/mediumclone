import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './actions';
import { switchMap, catchError, of, Observable, map, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from 'src/app/shared/types/current-user';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(
        ({ request }): Observable<Action> =>
          this.authService.register(request).pipe(
            map((currentUser: CurrentUser): Action => {
              this.persistanceService.set('accessToken', currentUser.token);
              return authActions.registerSuccess({ currentUser });
            }),
            catchError(
              (errorResponse: HttpErrorResponse): Observable<Action> =>
                of(
                  authActions.registerFailure({
                    errors: errorResponse.error.errors,
                  })
                )
            )
          )
      )
    )
  );

  redirectAfterRegister$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(
        ({ request }): Observable<Action> =>
          this.authService.login(request).pipe(
            map((currentUser: CurrentUser): Action => {
              this.persistanceService.set('accessToken', currentUser.token);
              return authActions.loginSuccess({ currentUser });
            }),
            catchError(
              (errorResponse: HttpErrorResponse): Observable<Action> =>
                of(
                  authActions.loginFailure({
                    errors: errorResponse.error.errors,
                  })
                )
            )
          )
      )
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap((): Observable<Action> => {
        const token = this.persistanceService.get('accessToken');
        if (!token) {
          return of(authActions.getCurrentUserFailure());
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUser): Action => {
            return authActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => of(authActions.getCurrentUserFailure()))
        );
      })
    )
  );

  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateCurrentUser),
      switchMap(({ currentUserRequest }): Observable<Action> => {
        return this.authService.updateCurrentUser(currentUserRequest).pipe(
          map((currentUser: CurrentUser): Action => {
            return authActions.updateCurrentUserSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.updateCurrentUserFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.persistanceService.set('accessToken', '');
          this.router.navigate(['/']);
        })
      ),
    {
      dispatch: false,
    }
  );
  constructor(
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
