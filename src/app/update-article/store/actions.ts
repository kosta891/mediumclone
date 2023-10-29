import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article';
import { ArticleRequest } from 'src/app/shared/types/article-request';
import { BackendErrors } from 'src/app/shared/types/backendErrors';

export const updateArticleActions = createActionGroup({
  source: 'update article',
  events: {
    'Get Article': props<{ slug: string }>(),
    'Get Article Success': props<{ article: ArticleInterface }>(),
    'Get Article Failure': emptyProps(),

    'Update Article': props<{ request: ArticleRequest; slug: string }>(),
    'Update Article Success': props<{ article: ArticleInterface }>(),
    'Update Article Failure': props<{ errors: BackendErrors }>(),
  },
});
