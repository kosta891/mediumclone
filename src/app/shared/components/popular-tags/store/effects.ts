import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { popularTagsActions } from './action';
import { PopularTagService } from '../services/popular-tag.service';

@Injectable()
export class PopularTagsEffects {
  private actions$ = inject(Actions);

  getPopularTags = createEffect(() =>
    this.actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap((): Observable<Action> => {
        return this.popularTagsService.getPopularTags().pipe(
          map(
            (popularTags: string[]): Action =>
              popularTagsActions.getPopularTagsSuccess({ popularTags })
          ),
          catchError(() => of(popularTagsActions.getPopularTagsFailure()))
        );
      })
    )
  );

  constructor(private popularTagsService: PopularTagService) {}
}
