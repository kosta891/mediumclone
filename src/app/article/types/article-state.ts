import { ArticleInterface } from '@shared/types/article';

export interface ArticleState {
  isLoading: boolean;
  error: string | null;
  data: ArticleInterface | null;
}
