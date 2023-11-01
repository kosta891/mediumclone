import { createSelector } from '@ngrx/store';
import { BackendErrors } from 'src/app/shared/types/backendErrors';
import { CreateArticleState } from '../types/create-article-state';

export const selectFeature = (state: { createArticle: CreateArticleState }) =>
  state.createArticle;

export const selectIsSubmitting = createSelector(
  selectFeature,
  (state: CreateArticleState): boolean => state.isSubmitting
);

export const selectValidationErrors = createSelector(
  selectFeature,
  (state: CreateArticleState): BackendErrors | null => state.validationErrors
);
