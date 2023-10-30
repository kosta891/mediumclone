import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article';

export const addToFavoritesActions = createActionGroup({
  source: 'add to favorites',
  events: {
    'Add To Favorites': props<{ isFavorited: boolean; slug: string }>(),
    'Add To Favorites Success': props<{ article: ArticleInterface }>(),
    'Add To Favorites Failure': emptyProps(),
  },
});
