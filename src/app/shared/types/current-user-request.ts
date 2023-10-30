import { CurrentUser } from './current-user';

export interface CurrentUserRequest {
  user: CurrentUser & { password: string };
}
