import { Component, Input, OnInit } from '@angular/core';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from 'src/app/environment/environment';
import { PaginationComponent } from '../../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
  ],
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  @Input() apiUrl = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
