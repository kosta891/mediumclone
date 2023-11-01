import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '@environment/environment';
import { ArticleInterface } from '@shared/types/article';
import { ArticleRequest } from '@shared/types/article-request';
import { ArticleResponse } from '@shared/types/article-response';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(articleRequest: ArticleRequest): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';
    return this.http
      .post<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
