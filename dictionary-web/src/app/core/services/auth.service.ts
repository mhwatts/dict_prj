import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';  // base auth URL

  constructor(private http: HttpClient) { }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/registration/`, {
      username,
      password1: password,
      password2: password
    });
  }


  login(username: string, password: string) {
    return this.http.post<{ access: string, refresh: string }>(
      'http://127.0.0.1:8000/api/auth/login/',
      { username, password }
    );
  }


  saveTokens(tokens: { access: string, refresh: string }) {
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
  }

  getAccess() {
    return localStorage.getItem('access');
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
