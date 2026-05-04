import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-approved-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approved-employees.component.html',
})
export class ApprovedEmployeesComponent implements OnInit {

  approvedEmployees: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dashboardService.getDashboard().subscribe((res: any) => {

      const data = res.data?.recentLeaves || [];

      this.approvedEmployees = data.filter((emp: any) =>
        emp.status?.toUpperCase() === 'APPROVED'
      );

      console.log("APPROVED PAGE DATA:", this.approvedEmployees);
    });
  }
}