import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { CurrentUser } from '@shared/types/current-user';
import { AuthStateFacade } from 'src/app/auth/store/facade';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { TagListComponent } from '@shared/components/tag-list/tag-list.component';
import { ArticleStateFacade } from '../../store/facade';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  isAuthor$ = combineLatest({
    article: this.articleStateFacade.article$,
    currentUser: this.authStateFacade.currentUser$.pipe(
      filter(
        (currentUser): currentUser is CurrentUser | null =>
          currentUser !== undefined
      )
    ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      }
      return article.author.username === currentUser.username;
    })
  );

  data$ = combineLatest({
    isLoading: this.articleStateFacade.isLoading$,
    error: this.articleStateFacade.error$,
    article: this.articleStateFacade.article$,
    isAuthor: this.isAuthor$,
  });

  constructor(
    private route: ActivatedRoute,
    private authStateFacade: AuthStateFacade,
    private articleStateFacade: ArticleStateFacade
  ) {}

  ngOnInit(): void {
    this.articleStateFacade.getArticle(this.slug);
  }

  deleteArticle(): void {
    this.articleStateFacade.deleteArticle(this.slug);
  }
}
