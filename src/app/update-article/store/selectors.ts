import { createSelector } from '@ngrx/store';
import { BackendErrors } from '@shared/types/backendErrors';
import { UpdateArticleState } from '../types/update-article-state';
import { ArticleInterface } from '@shared/types/article';

export const selectFeature = (state: { updateArticle: UpdateArticleState }) =>
  state.updateArticle;

export const selectIsSubmitting = createSelector(
  selectFeature,
  (state: UpdateArticleState): boolean => state.isSubmitting
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: UpdateArticleState): boolean => state.isLoading
);

export const selectValidationErrors = createSelector(
  selectFeature,
  (state: UpdateArticleState): BackendErrors | null => state.validationErrors
);

export const selectArticle = createSelector(
  selectFeature,
  (state: UpdateArticleState): ArticleInterface | undefined | null =>
    state.article
);
