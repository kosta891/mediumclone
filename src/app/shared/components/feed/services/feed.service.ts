import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFeedResponse } from '../types/get-feed-response.interface';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponse> {
    const fullUrl = environment.apiUrl + url;
    return this.http.get<GetFeedResponse>(fullUrl);
  }
}
