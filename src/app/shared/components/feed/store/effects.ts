import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedService } from '../services/feed.service';
import { feedActions } from './actions';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { GetFeedResponse } from '../types/get-feed-response.interface';

@Injectable()
export class FeedEffects {
  private actions$ = inject(Actions);

  getFeeds = createEffect(() =>
    this.actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }): Observable<Action> => {
        return this.feedService.getFeed(url).pipe(
          map(
            (feed: GetFeedResponse): Action =>
              feedActions.getFeedSuccess({ feed })
          ),
          catchError(() => of(feedActions.getFeedFailure()))
        );
      })
    )
  );

  constructor(private feedService: FeedService) {}
}
