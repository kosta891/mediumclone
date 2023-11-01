import { Component, OnInit } from '@angular/core';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValues } from 'src/app/shared/components/article-form/types/article-form-values';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ArticleRequest } from 'src/app/shared/types/article-request';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/shared/types/article';
import { UpdateArticleStateFacade } from '../../store/facade';

@Component({
  selector: 'mc-update-article',
  standalone: true,
  imports: [ArticleFormComponent, NgIf, AsyncPipe, LoadingComponent],
  templateUrl: './update-article.component.html',
})
export class UpdateArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  initialValues$: Observable<ArticleFormValues> =
    this.updateArticleStateFacade.article$.pipe(
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
    isLoading: this.updateArticleStateFacade.isLoading$,
    isSubmitting: this.updateArticleStateFacade.isSubmitting$,
    backendErrors: this.updateArticleStateFacade.backendErrors$,
    initialValues: this.initialValues$,
  });

  constructor(
    private route: ActivatedRoute,
    private updateArticleStateFacade: UpdateArticleStateFacade
  ) {}

  ngOnInit(): void {
    this.updateArticleStateFacade.getArticle(this.slug);
  }

  onSubmit(articleFormValues: ArticleFormValues): void {
    const articleRequest: ArticleRequest = {
      article: articleFormValues,
    };
    this.updateArticleStateFacade.updateArticle(articleRequest, this.slug);
  }
}
