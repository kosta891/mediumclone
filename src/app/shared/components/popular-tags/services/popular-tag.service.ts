import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { GetPopularTagsResponse } from '../types/get-popular-tags-response';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<string[]> {
    const url = environment.apiUrl + '/tags';
    return this.http
      .get<GetPopularTagsResponse>(url)
      .pipe(map((response) => response.tags));
  }
}
