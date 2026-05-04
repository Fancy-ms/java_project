import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-panel-employees',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './panel-employees.html',
  styleUrls: ['./panel-employees.css'], // ✅ fix (styleUrl → styleUrls)
})
export class PanelEmployees implements OnInit {

  // 🔹 Stats
  totalEmployees = 0;
  departmentsCount = 0;
  avgPerformance = 0;
  activeToday = 0;

  // 🔹 Search
  searchQuery: string = '';

  // 🔹 Data
  employees: any[] = [];
  originalEmployees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ✅ LOAD DATA (FIXED)
  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {

        // 🔥 IMPORTANT FIX (handles both cases)
        this.employees = Array.isArray(res) ? res : res?.data ?? [];
        this.originalEmployees = [...this.employees];

        this.calculateStats();
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.employees = [];
      }
    });
  }

  // ✅ CALCULATE STATS
  calculateStats() {
    this.totalEmployees = this.employees.length;

    const departments = new Set(
      this.employees.map(e => e.department)
    );
    this.departmentsCount = departments.size;

    this.avgPerformance = 90; // static (you can replace later)
    this.activeToday = this.employees.length;
  }

  // ✅ SEARCH
  triggerSearch() {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.employees = [...this.originalEmployees];
      return;
    }

    this.employees = this.originalEmployees.filter(emp =>
      emp.name?.toLowerCase().includes(query) ||
      emp.email?.toLowerCase().includes(query) ||
      emp.department?.toLowerCase().includes(query)
    );
  }

  // ✅ DELETE
  deleteEmployee(id: string | number) {
    if (!confirm('Are you sure you want to remove this employee?')) return;

    this.employeeService.deleteEmployee(Number(id)).subscribe({
      next: () => {
        this.loadEmployees(); // refresh list
      },
      error: (err) => console.error('Delete error:', err)
    });
  }

  // ✅ OPTIONAL NAVIGATION
  goToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }

}