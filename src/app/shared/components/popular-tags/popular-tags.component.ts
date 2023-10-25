import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/action';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    RouterLink,
  ],
  templateUrl: './popular-tags.component.html',
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
