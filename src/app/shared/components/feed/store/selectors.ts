import { createSelector } from '@ngrx/store';
import { GetFeedResponse } from '../types/get-feed-response.interface';
import { FeedState } from '../types/feed-state';

export const selectFeature = (state: { feed: FeedState }) => state.feed;

export const selectIsLoading = createSelector(
  selectFeature,
  (state: FeedState): boolean => state.isLoading
);

export const selectErrors = createSelector(
  selectFeature,
  (state: FeedState): string | null => state.error
);

export const selectFeedData = createSelector(
  selectFeature,
  (state: FeedState): GetFeedResponse | null => state.data
);
