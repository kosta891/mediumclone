import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { AuthStateFacade } from 'src/app/auth/store/facade';
import { CurrentUser } from '@shared/types/current-user';
import { UserProfileInterface } from '../../types/user-profile.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { UserProfileStateFacade } from '../../store/facade';

@Component({
  selector: 'mc-user-profile',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, RouterLinkActive, FeedComponent],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  slug: string = '';

  isCurrentUserProfile$ = combineLatest({
    currentUser: this.authStateFacade.currentUser$.pipe(
      filter(
        (currentUser): currentUser is CurrentUser | null =>
          currentUser !== undefined
      )
    ),
    userProfile: this.userProfileStateFacade.userProfile$.pipe(
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({ currentUser, userProfile }) => {
      return currentUser?.username === userProfile.username;
    })
  );

  data$ = combineLatest({
    isLoading: this.userProfileStateFacade.isLoading$,
    errors: this.userProfileStateFacade.errors$,
    userProfile: this.userProfileStateFacade.userProfile$,
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  constructor(
    private route: ActivatedRoute,
    private authStateFacade: AuthStateFacade,
    private userProfileStateFacade: UserProfileStateFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile() {
    this.userProfileStateFacade.getUserProfile(this.slug);
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
