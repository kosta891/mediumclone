import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { ArticleInterface } from '@shared/types/article';
import { Router } from '@angular/router';
import { UpdateArticleService } from '../services/update-article.service';
import { updateArticleActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleService as SharedArticleService } from '@shared/services/article.service';

@Injectable()
export class UpdateArticleEffects {
  private actions$ = inject(Actions);

  getArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleActions.getArticle),
      switchMap(({ slug }): Observable<Action> => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map(
            (article: ArticleInterface): Action =>
              updateArticleActions.getArticleSuccess({ article })
          ),
          catchError(() => of(updateArticleActions.getArticleFailure()))
        );
      })
    )
  );

  updateArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleActions.updateArticle),
      switchMap(({ request, slug }): Observable<Action> => {
        return this.updateArticleService.updateArticle(slug, request).pipe(
          map(
            (article: ArticleInterface): Action =>
              updateArticleActions.updateArticleSuccess({ article })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              updateArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );

  redirectAfterCreate = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleActions.updateArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private updateArticleService: UpdateArticleService,
    private sharedArticleService: SharedArticleService,
    private router: Router
  ) {}
}
