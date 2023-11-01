import { createSelector } from '@ngrx/store';
import { PopularTagsState } from '../types/popular-tags-state';

export const selectFeature = (state: { popularTags: PopularTagsState }) =>
  state.popularTags;

export const selectIsLoading = createSelector(
  selectFeature,
  (state: PopularTagsState): boolean => state.isLoading
);

export const selectErrors = createSelector(
  selectFeature,
  (state: PopularTagsState): string | null => state.error
);

export const selectPopularTagsData = createSelector(
  selectFeature,
  (state: PopularTagsState): string[] | null => state.data
);
