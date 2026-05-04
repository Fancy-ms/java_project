import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  private readonly TOKEN_KEY = 'lms_token';
  private readonly USER_KEY = 'lms_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ================= REGISTER =================
  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, request)
      .pipe(
        tap(res => {
          if (res.success && res.data) {
            this.saveSession(res.data);
          }
        })
      );
  }

  // ================= LOGIN =================
  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(res => {
          if (res.success && res.data) {
            this.saveSession(res.data);
          }
        })
      );
  }

  // ================= SESSION SAVE =================
  private saveSession(data: AuthResponse): void {

    // 🔥 FIX: normalize role (IMPORTANT)
    const role = (data.role || '').replace('ROLE_', '');

    const normalizedData: AuthResponse = {
      ...data,
      role
    };

    localStorage.setItem(this.TOKEN_KEY, data.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(normalizedData));
  }

  // ================= GETTERS =================
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): AuthResponse | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      this.clearSession();
      return null;
    }
  }

  getRole(): string | null {
    return this.getUser()?.role || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  // ================= ROLE CHECK =================
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isManager(): boolean {
    const role = this.getRole();
    return role === 'MANAGER' || role === 'HR';
  }

  isEmployee(): boolean {
    return this.getRole() === 'EMPLOYEE';
  }

  // ================= ROUTING =================
  getDefaultRoute(): string {

    const role = this.getRole();

    switch (role) {
      case 'ADMIN':
        return '/admin/dashboard';

      case 'MANAGER':
      case 'HR':
        return '/manager/dashboard';

      case 'EMPLOYEE':
        return '/employee/dashboard';

      default:
        return '/login';
    }
  }

  getDashboardRoute(): string {
    return this.getDefaultRoute();
  }

  getApplyLeaveRoute(): string {
    const role = this.getRole();

    if (role === 'ADMIN') return '/admin/apply-leave';
    if (role === 'MANAGER' || role === 'HR') return '/manager/apply-leave';
    return '/employee/apply-leave';
  }

  getMyLeavesRoute(): string {
    const role = this.getRole();

    if (role === 'ADMIN') return '/admin/my-leaves';
    if (role === 'MANAGER' || role === 'HR') return '/manager/my-leaves';
    return '/employee/my-leaves';
  }

  getLeaveBalanceRoute(): string {
    const role = this.getRole();

    if (role === 'ADMIN') return '/admin/leave-balance';
    if (role === 'MANAGER' || role === 'HR') return '/manager/leave-balance';
    return '/employee/leave-balance';
  }

  // ================= LOGOUT =================
  logout(): void {
    this.clearSession();
    this.router.navigateByUrl('/login');
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}