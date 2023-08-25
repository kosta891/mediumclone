import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../types/registerRequest';
import { CurrentUser } from 'src/app/shared/types/currentUser';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../types/authResponse';
import { environment } from 'src/app/environment/environment';
import { LoginRequest } from '../types/loginRegister';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponse): CurrentUser {
    return response.user;
  }

  register(data: RegisterRequest): Observable<CurrentUser> {
    console.log(data);
    const url = environment.apiUrl + '/users';
    return this.http.post<AuthResponse>(url, data).pipe(map((res) => res.user));
  }

  login(data: LoginRequest): Observable<CurrentUser> {
    const url = environment.apiUrl + '/users/login';
    return this.http.post<AuthResponse>(url, data).pipe(map((res) => res.user));
  }
}
