import { Component } from '@angular/core';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { FeedTogglerComponent } from '@shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { PopularTagsComponent } from '@shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './global-feed.component.html',
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
}
