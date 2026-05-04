import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelLeavesService } from '../../services/panel-leaves.service';
import { AuthService } from '../../services/auth.service';

interface Leave {
  id?: number;
  employeeEmail?: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

@Component({
  selector: 'app-panel-leaves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-leaves.html',
  styleUrl: './panel-leaves.css',
})
export class PanelLeaves implements OnInit {

  constructor(
    private leaveService: PanelLeavesService,
    private authService: AuthService
  ) {
    this.role = this.authService.getRole()?.replace('ROLE_', '') || 'EMPLOYEE';
  }

  // ================= ROLE =================
  role: string = '';

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  // ================= DATA =================
  leaves: Leave[] = [];

  newLeave: Leave = {
    employeeEmail: '',
    reason: '',
    startDate: '',
    endDate: '',
    status: 'PENDING'
  };

  // ================= STATS =================
  totalRequests = 0;
  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  // ================= FILTER =================
  currentFilter: string = 'all';
  searchQuery: string = '';

  // ================= MODAL =================
  selectedLeave: Leave | null = null;
  showModal: boolean = false;

  // ================= INIT =================
  ngOnInit(): void {
    this.loadLeaves();
  }

  // ================= LOAD =================
 loadLeaves(): void {
  this.leaveService.getAllLeaves().subscribe({
    next: (res: any) => {

      const data = res.data || [];

      this.leaves = data.map((l: any) => ({
        ...l,
        employeeEmail: l.employee?.email || l.employeeEmail || 'N/A'
      }));

      this.calculateStats();
    },
    error: (err) => console.error('Load leaves failed:', err)
  });
}

  // ================= FILTERED LIST =================
  get filteredLeaves(): Leave[] {
    let data = this.leaves || [];

    if (this.currentFilter !== 'all') {
      data = data.filter(l =>
        (l.status || '').toLowerCase() === this.currentFilter.toLowerCase()
      );
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      data = data.filter(l =>
        (l.employeeEmail || '').toLowerCase().includes(q) ||
        (l.reason || '').toLowerCase().includes(q)
      );
    }

    return data;
  }

  // ================= ADD LEAVE =================
  addLeave(): void {

    if (!this.newLeave.employeeEmail || !this.newLeave.startDate || !this.newLeave.endDate) {
      alert('Please fill all required fields');
      return;
    }

    this.leaveService.addLeave(this.newLeave).subscribe({
      next: (res: Leave) => {
        this.leaves = [res, ...this.leaves];
        this.calculateStats();
        this.resetForm();
      },
      error: (err) => console.error('Add Leave failed:', err)
    });
  }

  // ================= APPROVE =================
  approve(id?: number): void {
    if (!id) return;

    this.leaveService.approveLeave(id).subscribe({
      next: () => this.syncAfterUpdate(),
      error: (err) => console.error('Approve failed:', err)
    });
  }

  // ================= REJECT =================
  reject(id?: number): void {
    if (!id) return;

    this.leaveService.rejectLeave(id).subscribe({
      next: () => this.syncAfterUpdate(),
      error: (err) => console.error('Reject failed:', err)
    });
  }

  // ================= SYNC =================
  private syncAfterUpdate(): void {
    this.loadLeaves();
  }

  // ================= VIEW =================
  viewLeave(leave: Leave): void {
    this.selectedLeave = leave;
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedLeave = null;
    this.showModal = false;
  }

  // ================= FILTER =================
  setFilter(status: string): void {
    this.currentFilter = status;
  }

  triggerSearch(): void {
    console.log('Search:', this.searchQuery);
  }

  // ================= RESET =================
  resetForm(): void {
    this.newLeave = {
      employeeEmail: '',
      reason: '',
      startDate: '',
      endDate: '',
      status: 'PENDING'
    };
  }

  // ================= STATS =================
  calculateStats(): void {
    this.totalRequests = this.leaves.length;
    this.pendingCount = this.leaves.filter(l => l.status === 'PENDING').length;
    this.approvedCount = this.leaves.filter(l => l.status === 'APPROVED').length;
    this.rejectedCount = this.leaves.filter(l => l.status === 'REJECTED').length;
  }
}