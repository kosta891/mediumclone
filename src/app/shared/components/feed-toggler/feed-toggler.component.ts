import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateFacade } from 'src/app/auth/store/facade';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
  providers: [AuthStateFacade],
})
export class FeedTogglerComponent {
  @Input() tagName? = '';

  currentUser$ = this.authStateFacade.currentUser$;
  constructor(private authStateFacade: AuthStateFacade) {}
}
