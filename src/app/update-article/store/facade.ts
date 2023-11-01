import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './selectors';
import { BackendErrors } from 'src/app/shared/types/backendErrors';
import { UpdateArticleState } from '../types/update-article-state';
import { ArticleInterface } from 'src/app/shared/types/article';
import { updateArticleActions } from './actions';
import { ArticleRequest } from 'src/app/shared/types/article-request';

@Injectable()
export class UpdateArticleStateFacade {
  isSubmitting$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsSubmitting)
  );

  isLoading$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsLoading)
  );

  backendErrors$: Observable<BackendErrors | null> = this.store.pipe(
    select(Selectors.selectValidationErrors)
  );

  article$: Observable<ArticleInterface | null | undefined> = this.store.pipe(
    select(Selectors.selectArticle)
  );

  getArticle(slug: string): void {
    this.store.dispatch(updateArticleActions.getArticle({ slug }));
  }

  updateArticle(request: ArticleRequest, slug: string) {
    this.store.dispatch(
      updateArticleActions.updateArticle({
        request,
        slug,
      })
    );
  }

  constructor(private store: Store<{ updateArticle: UpdateArticleState }>) {}
}
