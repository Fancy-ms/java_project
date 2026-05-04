import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelLeavesService } from '../../services/panel-leaves.service';

@Component({
  selector: 'app-panel-leaves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-leaves.component.html',
  styleUrls: ['./panel-leaves.component.css']
})
export class PanelLeavesComponent implements OnInit {

  // ================= DATA =================
  leaves: any[] = [];

  // ================= UI STATE =================
  loading = true;
  error = '';

  // ================= SEARCH + FILTER =================
  searchQuery: string = '';
  currentFilter: string = 'all';

  // ================= STATS =================
  totalRequests = 0;
  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  constructor(private leaveService: PanelLeavesService) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  // ================= LOAD LEAVES =================
  loadLeaves(): void {
    this.loading = true;
    this.error = '';

    this.leaveService.getAllLeaves().subscribe({
      next: (res: any) => {
        this.loading = false;

        // 🔥 HANDLE MULTIPLE RESPONSE FORMATS
        if (res?.success) {
          this.leaves = res.data || [];
        } else if (Array.isArray(res)) {
          this.leaves = res;
        } else {
          this.error = res?.message || 'No leaves found';
          this.leaves = [];
        }

        this.calculateStats();
      },

      error: (err: any) => {
        this.loading = false;
        console.error('Load error:', err);

        this.error = 'Failed to load leaves';
        this.leaves = [];
      }
    });
  }

  // ================= FILTERED DATA =================
  get filteredLeaves(): any[] {
    let data = this.leaves ?? [];

    // FILTER
    if (this.currentFilter !== 'all') {
      data = data.filter(l =>
        (l.status ?? '').toLowerCase() === this.currentFilter.toLowerCase()
      );
    }

    // SEARCH
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();

      data = data.filter(l =>
        (l.employeeEmail ?? '').toLowerCase().includes(q) ||
        (l.reason ?? '').toLowerCase().includes(q)
      );
    }

    return data;
  }

  // ================= SET FILTER =================
  setFilter(status: string): void {
    this.currentFilter = status;
  }

  // ================= STATS =================
  calculateStats(): void {
    this.totalRequests = this.leaves.length;

    this.pendingCount = this.leaves.filter(l => l.status === 'PENDING').length;

    this.approvedCount = this.leaves.filter(l => l.status === 'APPROVED').length;

    this.rejectedCount = this.leaves.filter(l => l.status === 'REJECTED').length;
  }

  // ================= APPROVE =================
  approve(id: number): void {
    if (!id) return;

    this.leaveService.approveLeave(id).subscribe({
      next: () => {
        this.loadLeaves(); // 🔥 refresh
      },
      error: (err: any) => {
        console.error('Approve error:', err);
      }
    });
  }

  // ================= REJECT =================
  reject(id: number): void {
    if (!id) return;

    this.leaveService.rejectLeave(id).subscribe({
      next: () => {
        this.loadLeaves(); // 🔥 refresh
      },
      error: (err: any) => {
        console.error('Reject error:', err);
      }
    });
  }

}