export type UserRole =
  | 'EMPLOYEE'
  | 'MANAGER'
  | 'HR'
  | 'ADMIN';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  role: UserRole;
  department: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  role: string; // 👈 keep string (safe for ROLE_EMPLOYEE handling)
  department: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

