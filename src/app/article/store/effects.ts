import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { articleActions } from './actions';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import { ArticleService } from '../services/article.service';
import { ArticleInterface } from 'src/app/shared/types/article';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffects {
  private actions$ = inject(Actions);

  getArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }): Observable<Action> => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map(
            (article: ArticleInterface): Action =>
              articleActions.getArticleSuccess({ article })
          ),
          catchError(() => of(articleActions.getArticleFailure()))
        );
      })
    )
  );

  deleteArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({ slug }): Observable<Action> => {
        return this.articleService.deleteArticle(slug).pipe(
          map((): Action => articleActions.deleteArticleSuccess()),
          catchError(() => of(articleActions.deleteArticleFailure()))
        );
      })
    )
  );

  redirectAfterDelete = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleActions.deleteArticleSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
  constructor(
    private sharedArticleService: SharedArticleService,
    private articleService: ArticleService,
    private router: Router
  ) {}
}
