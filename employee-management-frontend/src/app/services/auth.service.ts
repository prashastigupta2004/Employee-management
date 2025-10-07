import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Login method
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // Register method
  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
