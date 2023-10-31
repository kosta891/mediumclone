import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userProfileActions } from './actions';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserProfileService } from '../service/user-profile.service';
import { UserProfileInterface } from '../types/user-profile.interface';

@Injectable()
export class UserProfileEffects {
  private actions$ = inject(Actions);

  getUserProfile = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }): Observable<Action> => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map(
            (userProfile: UserProfileInterface): Action =>
              userProfileActions.getUserProfileSuccess({ userProfile })
          ),
          catchError(() => of(userProfileActions.getUserProfileFailure()))
        );
      })
    )
  );

  constructor(private userProfileService: UserProfileService) {}
}
