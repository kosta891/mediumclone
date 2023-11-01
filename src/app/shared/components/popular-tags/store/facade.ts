import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './selectors';
import { popularTagsActions } from './action';
import { PopularTagsState } from '../types/popular-tags-state';

@Injectable()
export class PopularTagsStateFacade {
  popularTags$: Observable<string[] | null> = this.store.pipe(
    select(Selectors.selectPopularTagsData)
  );

  isLoading$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsLoading)
  );

  errors$: Observable<string | null> = this.store.pipe(
    select(Selectors.selectErrors)
  );

  getPopularTags(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
  constructor(private store: Store<{ popularTags: PopularTagsState }>) {}
}
