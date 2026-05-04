import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.html',
})
export class EmployeeListComponent implements OnInit {

  // 🔹 DATA
  employees: any[] = [];
  originalEmployees: any[] = [];

  // 🔹 SEARCH
  searchQuery: string = '';

  // 🔹 PAGINATION
  currentPage = 1;
  itemsPerPage = 12;

  // 🔹 LOADING STATE
  isLoading = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ================= LOAD =================
  loadEmployees() {
    this.isLoading = true;

    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {

        console.log("API RESPONSE:", res); // 🔥 DEBUG

        // ✅ HANDLE BOTH CASES (IMPORTANT)
        const data = Array.isArray(res) ? res : res?.data;

        if (!Array.isArray(data)) {
          console.error("❌ Employees data is not array:", data);
          this.employees = [];
          this.originalEmployees = [];
          return;
        }

        // ✅ SUCCESS
        this.employees = data;
        this.originalEmployees = data;

        this.isLoading = false;
      },

      error: (err) => {
        console.error("❌ API ERROR:", err);
        this.employees = [];
        this.originalEmployees = [];
        this.isLoading = false;
      }
    });
  }

  // ================= SEARCH =================
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

    this.currentPage = 1;
  }

  // ================= DELETE =================
  deleteEmployee(id: number) {
    if (!confirm('Are you sure you want to delete?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully');
        this.loadEmployees();
      },
      error: (err) => console.error(err)
    });
  }

  // ================= PAGINATION =================
  get paginatedEmployees() {
    if (!Array.isArray(this.employees)) return [];

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil((this.employees?.length || 0) / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  // ================= TRACK =================
  trackById(index: number, item: any) {
    return item?.id || index;
  }

  // ================= NAVIGATION =================
  goToView(id: number) {
    this.router.navigate(['/admin/view-employee', id]);
  }

}