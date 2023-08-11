import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest';
import { CurrentUser } from 'src/app/shared/types/currentUser';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../types/authResponse';
import { environment } from 'src/app/environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUser> {
    console.log(data);
    const url = environment.apiUrl + '/users';

    return this.http.post<AuthResponse>(url, data).pipe(map((res) => res.user));
  }
}
