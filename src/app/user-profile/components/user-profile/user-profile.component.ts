import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { userProfileActions } from '../../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../../store/reducers';
import { AuthStateFacade } from 'src/app/auth/store/facade';
import { CurrentUser } from 'src/app/shared/types/current-user';
import { UserProfileInterface } from '../../types/user-profile.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';

@Component({
  selector: 'mc-user-profile',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, RouterLinkActive, FeedComponent],
  templateUrl: './user-profile.component.html',
  providers: [AuthStateFacade],
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
    userProfile: this.store.pipe(
      select(selectUserProfileData),
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
    isLoading: this.store.select(selectIsLoading),
    errors: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  constructor(
    private route: ActivatedRoute,
    private authStateFacade: AuthStateFacade,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile() {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
