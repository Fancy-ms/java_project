import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-panel-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-reports.html',
  styleUrls: ['./panel-reports.css']
})
export class PanelReports implements OnInit, AfterViewInit {

  // ================= CHART REFS =================
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('doughnutChart') doughnutChart!: ElementRef;

  // ================= CHART INSTANCES =================
  barInstance: any;
  doughnutInstance: any;

  // ================= FILTER =================
  fromDate: string = '';
  toDate: string = '';

  // ================= REPORT DATA =================
  reportData: any = {
    totalLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    pendingLeaves: 0,
    avgDuration: 0,
    activeStaff: 0
  };

  constructor(
    private reportService: ReportService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ================= INIT =================
  ngOnInit(): void {
    this.loadReports();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.createCharts(), 300);
    }
  }

  // ================= LOAD REPORTS =================
  loadReports(): void {
    this.reportService.getReports().subscribe({
      next: (res: any) => {

        console.log('REPORT RESPONSE:', res);

        this.reportData = res?.data || res || this.reportData;

        this.refreshCharts();
      },
      error: (err) => {
        console.error('Report API error:', err);
      }
    });
  }

  // ================= APPLY FILTER =================
  applyFilter(): void {

    console.log('Filter:', this.fromDate, this.toDate);

    this.reportService.getReports(this.fromDate, this.toDate).subscribe({
      next: (res: any) => {

        this.reportData = res?.data || res;

        this.refreshCharts();
      },
      error: (err) => {
        console.error('Filter API error:', err);
      }
    });
  }

  // ================= EXPORT REPORT =================
  exportReport(): void {

    this.reportService.exportReport().subscribe((file: Blob) => {

      const blob = new Blob([file], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'report.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }

  // ================= REFRESH CHARTS =================
  refreshCharts(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    if (this.barInstance) this.barInstance.destroy();
    if (this.doughnutInstance) this.doughnutInstance.destroy();

    this.createCharts();
  }

  // ================= CREATE CHARTS =================
  createCharts(): void {

    // BAR CHART
    this.barInstance = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Total', 'Approved', 'Pending', 'Rejected'],
        datasets: [{
          data: [
            this.reportData.totalLeaves,
            this.reportData.approvedLeaves,
            this.reportData.pendingLeaves,
            this.reportData.rejectedLeaves
          ],
          backgroundColor: ['#8b5cf6', '#22c55e', '#facc15', '#ef4444']
        }]
      },
      options: {
        responsive: true
      }
    });

    // DOUGHNUT CHART
    this.doughnutInstance = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [{
          data: [
            this.reportData.approvedLeaves,
            this.reportData.pendingLeaves,
            this.reportData.rejectedLeaves
          ],
          backgroundColor: ['#22c55e', '#facc15', '#ef4444']
        }]
      },
      options: {
        responsive: true
      }
    });
  }


  exportExcel(): void {
  this.reportService.exportReport().subscribe({
    next: (file: Blob) => {

      const blob = new Blob([file], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'LMS_Report.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Excel download failed:', err);
    }
  });
}
}