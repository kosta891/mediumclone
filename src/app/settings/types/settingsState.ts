import { BackendErrors } from '@shared/types/backendErrors';

export interface SettingsState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
