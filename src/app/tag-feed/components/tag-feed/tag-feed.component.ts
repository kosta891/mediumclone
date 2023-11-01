import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { FeedTogglerComponent } from '@shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { PopularTagsComponent } from '@shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'mc-tag-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './tag-feed.component.html',
})
export class TagFeedComponent implements OnInit {
  apiUrl = '';
  tagName = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
