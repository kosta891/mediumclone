import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { ArticleInterface } from '@shared/types/article';
import { Router } from '@angular/router';
import { CreateArticleService } from '../services/create-article.service';
import { createArticleActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CreateArticleEffects {
  private actions$ = inject(Actions);

  createArticle = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }): Observable<Action> => {
        return this.createArticleService.createArticle(request).pipe(
          map(
            (article: ArticleInterface): Action =>
              createArticleActions.createArticleSuccess({ article })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createArticleActions.createArticleFailure({
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
        ofType(createArticleActions.createArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );
  constructor(
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
