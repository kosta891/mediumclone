import { ArticleInterface } from 'src/app/shared/types/article';
import { BackendErrors } from 'src/app/shared/types/backendErrors';

export interface UpdateArticleState {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
