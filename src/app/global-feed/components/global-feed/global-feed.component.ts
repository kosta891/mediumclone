import { Component } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
  templateUrl: './global-feed.component.html',
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
}
