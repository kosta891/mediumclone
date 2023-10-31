import { UserProfileInterface } from './user-profile.interface';

export interface UserProfileState {
  data: UserProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}
