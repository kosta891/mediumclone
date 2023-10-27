import { Component } from '@angular/core';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValues } from 'src/app/shared/components/article-form/types/article-form-values';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { ArticleRequest } from 'src/app/shared/types/article-request';
import { createArticleActions } from '../../store/actions';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [ArticleFormComponent, NgIf, AsyncPipe],
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent {
  initialValues: ArticleFormValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValues): void {
    const articleRequest: ArticleRequest = {
      article: articleFormValues,
    };
    this.store.dispatch(
      createArticleActions.createArticle({ request: articleRequest })
    );
  }
}
