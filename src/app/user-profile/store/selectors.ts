import { createSelector } from '@ngrx/store';
import { UserProfileState } from '../types/user-profile-state';
import { UserProfileInterface } from '../types/user-profile.interface';

export const selectFeature = (state: { userProfile: UserProfileState }) =>
  state.userProfile;

export const selectIsLoading = createSelector(
  selectFeature,
  (state: UserProfileState): boolean => state.isLoading
);

export const selectErrors = createSelector(
  selectFeature,
  (state: UserProfileState): string | null => state.error
);

export const selectUserProfileData = createSelector(
  selectFeature,
  (state: UserProfileState): UserProfileInterface | null => state.data
);
