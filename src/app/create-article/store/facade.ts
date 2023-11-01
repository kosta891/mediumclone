import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './selectors';
import { BackendErrors } from '@shared/types/backendErrors';
import { CreateArticleState } from '../types/create-article-state';
import { createArticleActions } from './actions';
import { ArticleRequest } from '@shared/types/article-request';

@Injectable()
export class CreateArticleStateFacade {
  isSubmitting$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsSubmitting)
  );

  validationErrors$: Observable<BackendErrors | null> = this.store.pipe(
    select(Selectors.selectValidationErrors)
  );

  createArticle(request: ArticleRequest) {
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
  constructor(private store: Store<{ createArticle: CreateArticleState }>) {}
}
