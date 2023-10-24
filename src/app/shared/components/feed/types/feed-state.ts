import { GetFeedResponse } from './get-feed-response.interface';

export interface FeedState {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponse | null;
}
