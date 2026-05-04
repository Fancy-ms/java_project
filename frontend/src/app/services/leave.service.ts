import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.model';
import { DashboardStats, LeaveApplyRequest, LeaveResponse } from '../models/leave.model';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  private apiUrl = 'http://localhost:8080/api/leaves';

  constructor(private http: HttpClient) {}

  // ================= APPLY LEAVE =================
  applyLeave(request: LeaveApplyRequest): Observable<ApiResponse<LeaveResponse>> {
    return this.http.post<ApiResponse<LeaveResponse>>(
      `${this.apiUrl}/apply`,
      request
    );
  }

  // ================= MY LEAVES =================
  getMyLeaves(): Observable<ApiResponse<LeaveResponse[]>> {
    return this.http.get<ApiResponse<LeaveResponse[]>>(
      `${this.apiUrl}/my`
    );
  }

  // ================= TEAM LEAVES (MANAGER/HR) =================
  getTeamLeaves(): Observable<ApiResponse<LeaveResponse[]>> {
    return this.http.get<ApiResponse<LeaveResponse[]>>(
      `${this.apiUrl}/team`
    );
  }

  // ================= APPROVE LEAVE =================
  approveLeave(id: number): Observable<ApiResponse<LeaveResponse>> {
    return this.http.put<ApiResponse<LeaveResponse>>(
      `${this.apiUrl}/approve/${id}`,
      {}
    );
  }

  // ================= REJECT LEAVE =================
  rejectLeave(id: number, rejectionReason?: string): Observable<ApiResponse<LeaveResponse>> {
    return this.http.put<ApiResponse<LeaveResponse>>(
      `${this.apiUrl}/reject/${id}`,
      { rejectionReason }
    );
  }

  // ================= DASHBOARD =================
  getEmployeeDashboard(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(
      `${this.apiUrl}/dashboard/employee`
    );
  }

  getManagerDashboard(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(
      `${this.apiUrl}/dashboard/manager`
    );
  }

  // ================= LEAVE BALANCE =================
  getLeaveBalance(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(
      `${this.apiUrl}/balance`
    );
  }

}