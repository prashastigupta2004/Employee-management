import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, employee, { headers: this.getHeaders() });
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, employee, { headers: this.getHeaders() });
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
