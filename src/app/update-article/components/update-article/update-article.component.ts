import { Component, OnInit } from '@angular/core';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValues } from 'src/app/shared/components/article-form/types/article-form-values';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import {
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
  selectArticle,
} from '../../store/reducers';
import { ArticleRequest } from 'src/app/shared/types/article-request';
import { updateArticleActions } from '../../store/actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/shared/types/article';

@Component({
  selector: 'mc-update-article',
  standalone: true,
  imports: [ArticleFormComponent, NgIf, AsyncPipe, LoadingComponent],
  templateUrl: './update-article.component.html',
})
export class UpdateArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  initialValues$: Observable<ArticleFormValues> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    initialValues: this.initialValues$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(updateArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormValues: ArticleFormValues): void {
    const articleRequest: ArticleRequest = {
      article: articleFormValues,
    };
    this.store.dispatch(
      updateArticleActions.updateArticle({
        request: articleRequest,
        slug: this.slug,
      })
    );
  }
}
