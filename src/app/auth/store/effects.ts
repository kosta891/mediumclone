import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './actions';
import { switchMap, catchError, of, Observable, map } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from 'src/app/shared/types/currentUser';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

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
  constructor(
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}
}

// export const registerEffect = createEffect(
//   (actions$ = inject(Actions), authService = inject(AuthService)) =>
//     actions$.pipe(
//       ofType(authActions.register),
//       switchMap(
//         ({ request }): Observable<Action> =>
//           authService.register(request).pipe(
//             map(
//               (currentUser: CurrentUser): Action =>
//                 authActions.registerSuccess({ currentUser })
//             ),
//             catchError(
//               (error): Observable<Action> => of(authActions.registerFailure())
//             )
//           )
//       )
//     )
// );
