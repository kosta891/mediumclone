import { BackendErrors } from '@shared/types/backendErrors';

export interface CreateArticleState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
