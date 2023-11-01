import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../types/register-request';
import { CurrentUser } from 'src/app/shared/types/current-user';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../types/auth-response';
import { environment } from 'src/app/environment/environment';
import { LoginRequest } from '../types/login-request';
import { CurrentUserRequest } from 'src/app/shared/types/current-user-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponse): CurrentUser {
    return response.user;
  }

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = environment.apiUrl + '/users';
    return this.http.post<AuthResponse>(url, data).pipe(map((res) => res.user));
  }

  login(data: LoginRequest): Observable<CurrentUser> {
    const url = environment.apiUrl + '/users/login';
    return this.http.post<AuthResponse>(url, data).pipe(map((res) => res.user));
  }

  getCurrentUser(): Observable<CurrentUser> {
    const url = environment.apiUrl + '/user';
    return this.http.get<AuthResponse>(url).pipe(map((res) => res.user));
  }

  updateCurrentUser(
    curentUserRequest: CurrentUserRequest
  ): Observable<CurrentUser> {
    const url = environment.apiUrl + '/user';
    return this.http
      .put<AuthResponse>(url, curentUserRequest)
      .pipe(map(this.getUser));
  }
}
