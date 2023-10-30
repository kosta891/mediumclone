import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { ArticleInterface } from 'src/app/shared/types/article';
import { ArticleResponse } from 'src/app/shared/types/article-response';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http.post<ArticleResponse>(url, {}).pipe(map(this.getArticle));
  }

  removeToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http.delete<ArticleResponse>(url).pipe(map(this.getArticle));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: ArticleResponse): ArticleInterface {
    return response.article;
  }
}
