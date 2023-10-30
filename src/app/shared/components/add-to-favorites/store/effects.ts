import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article';
import { AddToFavoritesService } from '../services/add-to-favorites.service';
import { addToFavoritesActions } from './action';

@Injectable()
export class AddToFavoritesEffects {
  private actions$ = inject(Actions);

  addToFavorites = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }): Observable<Action> => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeToFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map(
            (article: ArticleInterface): Action =>
              addToFavoritesActions.addToFavoritesSuccess({ article })
          ),
          catchError(() => of(addToFavoritesActions.addToFavoritesFailure()))
        );
      })
    )
  );

  constructor(private addToFavoritesService: AddToFavoritesService) {}
}
