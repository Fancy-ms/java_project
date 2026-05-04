import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../services/dashboard.service';
import { PanelLeavesService } from '../../services/panel-leaves.service';

@Component({
  selector: 'app-panel-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './panel-dashboard.html',
  styleUrl: './panel-dashboard.css',
})
export class PanelDashboard implements OnInit {

  unreadCount = 0;

  totalEmployees = 0;
  activeStaff = 0;
  onLeaveToday = 0;
  pendingRequests = 0;

  recentLeaves: any[] = [];
  upcomingEvents: any[] = [];

  approvedEmployees: any[] = [];
  showApprovedList: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private leaveService: PanelLeavesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadEvents();
  }

  // ================= DASHBOARD =================
  loadDashboard() {
    this.dashboardService.getDashboard().subscribe({
      next: (res: any) => {
        const data = res.data;

        this.totalEmployees = data?.totalEmployees ?? 0;
        this.activeStaff = data?.activeEmployees ?? 0;
        this.onLeaveToday = data?.onLeaveToday ?? 0;
        this.pendingRequests = data?.pendingRequests ?? 0;

        this.recentLeaves = data?.recentLeaves ?? [];
      },
      error: (err) => console.error('Dashboard error:', err)
    });
  }

  // ================= EVENTS =================
  loadEvents() {
  this.leaveService.getEvents().subscribe({
    next: (res: any) => {

      let events: any[] = [];

      if (res?.data && Array.isArray(res.data)) {
        events = res.data;
      } else if (Array.isArray(res)) {
        events = res;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.upcomingEvents = events
        .map(e => {
          const rawDate = e.meetingDateTime || e.start || e.date;

          if (!rawDate) return null;

          const eventDate = new Date(rawDate);

          if (isNaN(eventDate.getTime())) {
            console.warn("Invalid date:", rawDate);
            return null;
          }

          return {
            ...e,
            parsedDate: eventDate
          };
        })
        .filter(e => e && e.parsedDate >= today)
        .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
        .slice(0, 5);

      console.log("UPCOMING EVENTS:", this.upcomingEvents);
    },

    error: (err) => {
      console.error("Calendar API failed:", err);

      // 🔥 IMPORTANT FIX
      this.upcomingEvents = [];
    }
  });
}

  // ================= ACTIONS =================
  triggerAction(action: string) {
    if (action === 'Generate Report') {
      this.dashboardService.downloadReportPdf().subscribe((res: Blob) => {
        const blob = new Blob([res], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'LMS_Report.pdf';
        a.click();

        window.URL.revokeObjectURL(url);
      });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  goToEmployees() {
    this.router.navigate(['/admin/employees']);
  }

  goToNotifications() {
    this.router.navigate(['/admin/notifications']);
  }

  showApprovedEmployees() {
    if (!this.recentLeaves?.length) {
      this.approvedEmployees = [];
      this.showApprovedList = true;
      return;
    }

    this.approvedEmployees = this.recentLeaves
      .filter(emp => emp.status?.toUpperCase() === 'APPROVED')
      .map(emp => ({
        email: emp.employee?.email || 'N/A',
        status: emp.status
      }));

    this.showApprovedList = true;
  }

  goToApprovedEmployees() {
    this.router.navigate(['/admin/approved-employees']);
  }


  exportExcel() {
  this.dashboardService.downloadExcelReport().subscribe((res: Blob) => {

    const blob = new Blob([res], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'LMS_Report.xlsx';
    a.click();

    window.URL.revokeObjectURL(url);
  });
}

  
}