import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { LeaveService } from '../../services/leave.service';
import { AuthService } from '../../services/auth.service';
import { DashboardStats } from '../../models/leave.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manager-dashboard.component.html'
})
export class ManagerDashboardComponent implements OnInit {

  // ================= DATA =================
  stats: DashboardStats | null = null;
  pendingLeaves: any[] = [];

  // ================= UI STATE =================
  loading = true;
  error = '';
  userName = '';
  processingId: number | null = null;

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private router: Router
  ) {}

  // ================= INIT =================
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user?.name || 'Manager';

    this.loadPendingLeaves();
  }

  // ================= LOAD LEAVES =================
  loadPendingLeaves(): void {
    this.loading = true;
    this.error = '';

    this.leaveService.getTeamLeaves().subscribe({
      next: (res: any) => {
        this.loading = false;

        // ✅ SAFE RESPONSE HANDLING
        if (res?.success && res?.data) {
          this.pendingLeaves = res.data;
        } else if (Array.isArray(res)) {
          this.pendingLeaves = res;
        } else {
          this.pendingLeaves = [];
        }

        // 🔥 ALWAYS UPDATE STATS FROM LEAVES
        this.calculateStatsFromLeaves();
      },

      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.pendingLeaves = [];
        this.error = 'Failed to load leaves';

        console.error('Pending Leaves Error:', err);
      }
    });
  }

  // ================= CALCULATE STATS =================
  calculateStatsFromLeaves(): void {

    const safeStatus = (status: any) =>
      (status ?? '').toString().trim().toUpperCase();

    this.stats = {
      totalRequests: this.pendingLeaves.length,

      totalPending: this.pendingLeaves.filter(
        l => safeStatus(l.status) === 'PENDING'
      ).length,

      totalApproved: this.pendingLeaves.filter(
        l => safeStatus(l.status) === 'APPROVED'
      ).length,

      totalRejected: this.pendingLeaves.filter(
        l => safeStatus(l.status) === 'REJECTED'
      ).length
    } as DashboardStats;
  }

  // ================= APPROVE =================
  approveLeave(id: number): void {
    if (!id) return;

    this.processingId = id;

    this.leaveService.approveLeave(id).subscribe({
      next: () => {
        this.processingId = null;
        this.loadPendingLeaves(); // refresh
      },
      error: (err: HttpErrorResponse) => {
        this.processingId = null;
        console.error('Approve Error:', err);
      }
    });
  }

  // ================= REJECT =================
  rejectLeave(id: number): void {
    if (!id) return;

    this.processingId = id;

    this.leaveService.rejectLeave(id).subscribe({
      next: () => {
        this.processingId = null;
        this.loadPendingLeaves(); // refresh
      },
      error: (err: HttpErrorResponse) => {
        this.processingId = null;
        console.error('Reject Error:', err);
      }
    });
  }

  // ================= APPROVAL RATE =================
  getApprovalRate(): number {
    if (!this.stats || this.stats.totalRequests === 0) return 0;

    return Math.round(
      (this.stats.totalApproved / this.stats.totalRequests) * 100
    );
  }

  goToNotifications() {
    this.router.navigate(['/admin/notifications']);
  }

  // ================= LOGOUT =================
  logout(): void {
    this.authService.logout();
  }
}