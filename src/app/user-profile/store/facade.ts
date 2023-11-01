import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfileState } from '../types/user-profile-state';
import * as Selectors from './selectors';
import { UserProfileInterface } from '../types/user-profile.interface';
import { userProfileActions } from './actions';

@Injectable()
export class UserProfileStateFacade {
  userProfile$: Observable<UserProfileInterface | null> = this.store.pipe(
    select(Selectors.selectUserProfileData)
  );

  isLoading$: Observable<boolean> = this.store.pipe(
    select(Selectors.selectIsLoading)
  );

  errors$: Observable<string | null> = this.store.pipe(
    select(Selectors.selectErrors)
  );

  getUserProfile(slug: string): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: slug }));
  }
  constructor(private store: Store<{ userProfile: UserProfileState }>) {}
}
