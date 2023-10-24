import { ArticleInterface } from 'src/app/shared/types/article';

export interface GetFeedResponse {
  articles: ArticleInterface[];
  articlesCount: number;
}
