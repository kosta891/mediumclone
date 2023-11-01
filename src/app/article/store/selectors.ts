import { createSelector } from '@ngrx/store';
import { ArticleInterface } from '@shared/types/article';
import { ArticleState } from '../types/article-state';

export const selectFeature = (state: { article: ArticleState }) =>
  state.article;

export const selectIsLoading = createSelector(
  selectFeature,
  (state: ArticleState): boolean => state.isLoading
);

export const selectError = createSelector(
  selectFeature,
  (state: ArticleState): string | null => state.error
);

export const selectArticle = createSelector(
  selectFeature,
  (state: ArticleState): ArticleInterface | undefined | null => state.data
);
