import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private readonly API_URL = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  // ================= AUTH HEADERS =================
  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : ''
      })
    };
  }

  // ================= GET ALL EMPLOYEES =================
  getEmployees(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/employees`,
      this.getHeaders()
    );
  }

  // ================= GET EMPLOYEE BY ID =================
  getEmployeeById(id: number): Observable<any> {
    return this.http.get(
      `${this.API_URL}/employees/${id}`,
      this.getHeaders()
    );
  }

  // ================= ADD EMPLOYEE =================
  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(
      `${this.API_URL}/employees`,
      employee,
      this.getHeaders()
    );
  }

  // ================= UPDATE EMPLOYEE =================
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(
      `${this.API_URL}/employees/${employee.id}`,
      employee,
      this.getHeaders()
    );
  }

  // ================= DELETE EMPLOYEE =================
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(
      `${this.API_URL}/employees/${id}`,
      this.getHeaders()
    );
  }

  // ================= ACTIVE EMPLOYEES =================
  getActiveEmployees(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/active-employees`,
      this.getHeaders()
    );
  }
}