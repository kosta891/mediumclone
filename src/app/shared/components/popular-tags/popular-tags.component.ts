import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { RouterLink } from '@angular/router';
import { PopularTagsStateFacade } from './store/facade';

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
  providers: [PopularTagsStateFacade],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.popularTagsStateFacade.popularTags$,
    isLoading: this.popularTagsStateFacade.isLoading$,
    error: this.popularTagsStateFacade.errors$,
  });

  constructor(private popularTagsStateFacade: PopularTagsStateFacade) {}

  ngOnInit(): void {
    this.popularTagsStateFacade.getPopularTags();
  }
}
