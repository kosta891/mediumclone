import { ArticleInterface } from '@shared/types/article';

export interface GetFeedResponse {
  articles: ArticleInterface[];
  articlesCount: number;
}
