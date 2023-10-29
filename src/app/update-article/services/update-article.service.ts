import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { ArticleInterface } from 'src/app/shared/types/article';
import { ArticleRequest } from 'src/app/shared/types/article-request';
import { ArticleResponse } from 'src/app/shared/types/article-response';

@Injectable({
  providedIn: 'root',
})
export class UpdateArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleRequest: ArticleRequest
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .put<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
