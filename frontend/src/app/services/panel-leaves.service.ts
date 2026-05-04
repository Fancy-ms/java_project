import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Leave {
  id?: number;
  employeeEmail?: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PanelLeavesService {

  // 👉 Admin API base (ONLY admin operations)
  private baseUrl = 'http://localhost:8080/api/admin/leaves';

  constructor(private http: HttpClient) {}

  // ================= GET ALL LEAVES =================
  getAllLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl);
  }

  // ================= APPROVE LEAVE =================
  approveLeave(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}/approve`,
      {}
    );
  }

  // ================= REJECT LEAVE =================
  rejectLeave(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}/reject`,
      {}
    );
  }

  // ================= CALENDAR EVENTS =================
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:8080/api/admin/calendar'
    );
  }

  //  getEvents(): Observable<any[]> {
  //   return this.http.get<any[]>(
  //     'http://localhost:8080/api/admin/calendar/eveent'
  //   );
  // }


  addLeave(data: Leave) {
  return this.http.post(`${this.baseUrl}/apply`, data);
}
}