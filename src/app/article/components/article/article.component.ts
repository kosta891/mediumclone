import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleActions } from '../../store/actions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import { CurrentUser } from 'src/app/shared/types/currentUser';
import { AuthStateFacade } from 'src/app/auth/store/facade';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';

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
  providers: [AuthStateFacade],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
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
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  });
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private authStateFacade: AuthStateFacade
  ) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }
}
