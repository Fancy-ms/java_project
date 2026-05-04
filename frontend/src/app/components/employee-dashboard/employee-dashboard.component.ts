import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LeaveService } from '../../Services/leave.service';
import { AuthService } from '../../Services/auth.service';
import { DashboardStats } from '../../models/leave.model';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-dashboard.component.html'
})
export class EmployeeDashboardComponent implements OnInit {

  stats: DashboardStats | null = null;
  loading = true;
  error = '';
  userName = '';

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // 🔥 SAFE USER FETCH
    const user = this.authService.getUser();
    this.userName = user?.name || 'Employee';

    this.loadDashboard();
  }

  // ================= DASHBOARD =================
  loadDashboard(): void {

    this.loading = true;
    this.error = '';

    this.leaveService.getEmployeeDashboard().subscribe({

      next: (res: any) => {
        this.loading = false;

        // 🔥 HANDLE ApiResponse FORMAT
        if (res?.success && res?.data) {
          this.stats = res.data;
        } else {
          this.error = res?.message || 'No data available';
          this.stats = null;
        }
      },

      error: (err) => {
        this.loading = false;
        console.error('Dashboard Error:', err);

        // 🔥 BETTER ERROR MESSAGE
        if (err.status === 401) {
          this.error = 'Session expired. Please login again.';
        } else {
          this.error = 'Failed to load dashboard data.';
        }
      }
    });
  }

  // ================= CALCULATIONS =================
  getUsagePercent(): number {

    if (!this.stats || this.stats.totalLeaves === 0) {
      return 0;
    }

    return Math.round(
      (this.stats.usedLeaves / this.stats.totalLeaves) * 100
    );
  }
}
