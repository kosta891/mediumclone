import { ArticleInterface } from '@shared/types/article';
import { BackendErrors } from '@shared/types/backendErrors';

export interface UpdateArticleState {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
