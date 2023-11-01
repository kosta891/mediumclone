import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { combineLatest } from 'rxjs';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from 'src/app/environment/environment';
import { PaginationComponent } from '../../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';
import { AddToFavoritesComponent } from '../add-to-favorites/add-to-favorites.component';
import { FeedStateFacade } from './store/facade';

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
    AddToFavoritesComponent,
  ],
  templateUrl: './feed.component.html',
  providers: [FeedStateFacade],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl = '';

  data$ = combineLatest({
    isLoading: this.feedStateFacade.isLoading$,
    error: this.feedStateFacade.errors$,
    feed: this.feedStateFacade.feed$,
  });

  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage = 0;

  constructor(
    private feedStateFacade: FeedStateFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
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
    this.feedStateFacade.getFeed(apiUrlWithParams);
  }
}
