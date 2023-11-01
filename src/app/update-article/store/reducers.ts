import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { UpdateArticleState } from '../types/update-article-state';
import { updateArticleActions } from './actions';

const initialState: UpdateArticleState = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const updateArticleFeature = createFeature({
  name: 'updateArticle',
  reducer: createReducer(
    initialState,
    on(updateArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(updateArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(updateArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(updateArticleActions.updateArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(updateArticleActions.updateArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(updateArticleActions.updateArticleFailure, (state, action) => ({
      ...state,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const { name: updateArticleFeatureKey, reducer: updateArticleReducer } =
  updateArticleFeature;
