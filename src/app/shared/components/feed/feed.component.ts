import { Component, Input, OnInit } from '@angular/core';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
  }
}
