import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfileInterface } from '../types/user-profile.interface';

export const userProfileActions = createActionGroup({
  source: 'user profile',
  events: {
    'Get User Profile': props<{ slug: string }>(),
    'Get User Profile Success': props<{ userProfile: UserProfileInterface }>(),
    'Get User Profile Failure': emptyProps(),
  },
});
