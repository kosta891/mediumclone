import { BackendErrors } from 'src/app/shared/types/backendErrors';

export interface CreateArticleState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
