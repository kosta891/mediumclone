import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './actions';

import { switchMap, catchError, of, Observable, map, mergeMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { RegisterRequestInterface } from '../types/registerRequest';
export class AuthEffects {
  private actions$ = inject(Actions);
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(
        ({ request }): Observable<Action> =>
          this.authService
            .register(request)
            .pipe(map((user): Action => authActions.registerSuccess))
      )
    )
  );
  constructor(private authService: AuthService) {}
}
// export const registerEffect = createEffect(()=>{})
