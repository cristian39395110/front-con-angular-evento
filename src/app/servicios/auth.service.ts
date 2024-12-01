import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      withCredentials: true,
    });
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-session`, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }
  getUserFromSession(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  saveUserToSession(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearSession(): void {
    localStorage.removeItem('user');
  }
}
