import { Component } from '@angular/core';
import { ArticleFormComponent } from '@shared/components/article-form/article-form.component';
import { ArticleFormValues } from '@shared/components/article-form/types/article-form-values';
import { combineLatest } from 'rxjs';
import { ArticleRequest } from '@shared/types/article-request';
import { AsyncPipe, NgIf } from '@angular/common';
import { CreateArticleStateFacade } from '../../store/facade';

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
    isSubmitting: this.createArticleStateFacade.isSubmitting$,
    backendErrors: this.createArticleStateFacade.validationErrors$,
  });

  constructor(private createArticleStateFacade: CreateArticleStateFacade) {}

  onSubmit(articleFormValues: ArticleFormValues): void {
    const articleRequest: ArticleRequest = {
      article: articleFormValues,
    };

    this.createArticleStateFacade.createArticle(articleRequest);
  }
}
