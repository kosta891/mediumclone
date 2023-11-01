import { BackendErrors } from '@shared/types/backendErrors';
import { CurrentUser } from '@shared/types/current-user';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: CurrentUser | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrors | null;
}
