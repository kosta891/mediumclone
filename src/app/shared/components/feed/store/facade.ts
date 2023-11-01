import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './selectors';
import { FeedState } from '../types/feed-state';
import { GetFeedResponse } from '../types/get-feed-response.interface';
import { feedActions } from './actions';

@Injectable()
export class FeedStateFacade {
  feed$: Observable<GetFeedResponse | null> = this.store.pipe(
    select(Selectors.selectFeedData)
  );

  isLoading$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsLoading)
  );

  errors$: Observable<string | null> = this.store.pipe(
    select(Selectors.selectErrors)
  );

  getFeed(url: string): void {
    this.store.dispatch(feedActions.getFeed({ url }));
  }

  constructor(private store: Store<{ feed: FeedState }>) {}
}
