import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selectors from './selectors';
import { ArticleState } from '../types/article-state';
import { ArticleInterface } from 'src/app/shared/types/article';
import { articleActions } from './actions';

@Injectable()
export class ArticleStateFacade {
  isLoading$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsLoading)
  );

  error$: Observable<string | null> = this.store.pipe(
    select(Selectors.selectError)
  );

  article$: Observable<ArticleInterface | null | undefined> = this.store.pipe(
    select(Selectors.selectArticle)
  );

  getArticle(slug: string): void {
    this.store.dispatch(articleActions.getArticle({ slug }));
  }

  deleteArticle(slug: string): void {
    this.store.dispatch(articleActions.deleteArticle({ slug }));
  }

  constructor(private store: Store<{ article: ArticleState }>) {}
}
