import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications: any[] = [];

  unreadCount = 0;
  previousCount = 0;

  userEmail: string = '';
  role: string = '';

  leaveCount = 0;
  alertCount = 0;
  systemCount = 0;

  refreshSub?: Subscription;

  constructor(
    private service: NotificationService, // ✅ SAME NAME USE KARNA
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    this.userEmail = user?.email || '';

    const rawRole = this.auth.getRole();
    this.role = rawRole?.replace('ROLE_', '') || 'EMPLOYEE';

    if (!this.userEmail) return;

    this.loadAll();

    this.refreshSub = interval(5000).subscribe(() => {
      this.loadAll();
    });
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  // ================= LOAD =================
  loadAll(): void {
    this.loadNotifications();
    this.loadUnreadCount();
  }

  // ================= GET NOTIFICATIONS =================
  loadNotifications(): void {
    this.service.getNotificationsByEmail(this.userEmail).subscribe({
      next: (res: any) => {

        const list = res?.data || res || [];
        const safeList = Array.isArray(list) ? list : [];

        this.notifications = safeList.map((n: any) => ({
          ...n,
          formattedDate: this.formatDate(n.createdAt)
        })).reverse();

        this.leaveCount = safeList.filter(n =>
          (n.message || '').toLowerCase().includes('leave')
        ).length;

        this.alertCount = safeList.filter(n =>
          (n.message || '').toLowerCase().includes('alert')
        ).length;

        this.systemCount = safeList.filter(n =>
          (n.message || '').toLowerCase().includes('system')
        ).length;
      },
      error: () => {
        this.notifications = [];
      }
    });
  }

  // ================= UNREAD =================
  loadUnreadCount(): void {
    this.service.getUnreadCount(this.userEmail).subscribe({
      next: (res: any) => {

        const newCount = res?.data ?? res ?? 0;

        if (newCount > this.previousCount) {
          this.playSound();
        }

        this.previousCount = newCount;
        this.unreadCount = newCount;
      },
      error: () => this.unreadCount = 0
    });
  }

  // ================= ACTIONS =================

  // ✅ MARK SINGLE
  // ✅ MARK SINGLE
markSingleRead(id: number): void {
  this.service.markSingleRead(id).subscribe({
    next: () => this.loadAll(),
    error: (err: any) => console.error(err) // ✅ FIX
  });
}

// ✅ DELETE
deleteNotification(id: number): void {
  this.service.deleteNotification(id).subscribe({
    next: () => this.loadAll(),
    error: (err: any) => console.error(err) // ✅ FIX
  });
}

// ✅ MARK ALL
markAllRead(): void {
  this.service.markAsRead(this.userEmail).subscribe({
    next: () => this.loadAll(),
    error: (err: any) => console.error(err) // ✅ FIX
  });
}

  // ================= SOUND =================
  playSound(): void {
    const audio = new Audio('assets/notification.mp3');
    audio.play().catch(() => {});
  }

  // ================= DATE =================
  private formatDate(date: string): string {
    if (!date) return '';

    try {
      const clean = date.split('.')[0];
      const d = new Date(clean);

      return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return date;
    }
  }
}