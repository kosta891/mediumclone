import { createActionGroup, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article';
import { ArticleRequest } from 'src/app/shared/types/article-request';
import { BackendErrors } from 'src/app/shared/types/backendErrors';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create Article': props<{ request: ArticleRequest }>(),
    'Create Article Success': props<{ article: ArticleInterface }>(),
    'Create Article Failure': props<{ errors: BackendErrors }>(),
  },
});
