import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Notification {
  id: number;
  userEmail: string;
  message: string;
  read: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8080/api/admin/notifications';

  constructor(private http: HttpClient) { }

  // ✅ GET USER NOTIFICATIONS
  getNotificationsByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${email}`);
  }

  // ✅ UNREAD COUNT
  getUnreadCount(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/unread/${email}`);
  }

  // ✅ MARK SINGLE (🔥 FIXED URL)
  markSingleRead(id: number) {
    return this.http.put(`${this.baseUrl}/read/${id}`, {});
  }

  markAsRead(email: string) {
    return this.http.post(`${this.baseUrl}/mark-read/${email}`, {});
  }

  deleteNotification(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}