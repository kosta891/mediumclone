import { BackendErrors } from 'src/app/shared/types/backendErrors';

export interface SettingsState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
