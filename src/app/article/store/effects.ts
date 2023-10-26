import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { articleActions } from './actions';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleInterface } from 'src/app/shared/types/article';

@Injectable()
export class ArticleEffects {
  private actions$ = inject(Actions);

  getArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }): Observable<Action> => {
        return this.articleService.getArticle(slug).pipe(
          map(
            (article: ArticleInterface): Action =>
              articleActions.getArticleSuccess({ article })
          ),
          catchError(() => of(articleActions.getArticleFailure()))
        );
      })
    )
  );

  constructor(private articleService: ArticleService) {}
}
