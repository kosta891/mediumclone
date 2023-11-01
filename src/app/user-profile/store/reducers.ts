import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { UserProfileState } from '../types/user-profile-state';
import { userProfileActions } from './actions';

const initialState: UserProfileState = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const { name: userProfileFeatureKey, reducer: userProfileReducer } =
  userProfileFeature;
