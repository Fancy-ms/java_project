import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-active-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './active-employees.component.html'
})
export class ActiveEmployeesComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  searchQuery: string = '';
  loading: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadActiveEmployees();
  }

  // ================= LOAD ACTIVE EMPLOYEES =================
  loadActiveEmployees(): void {
    this.loading = true;

    this.employeeService.getActiveEmployees().subscribe({
      next: (res: any) => {

        console.log("API RESPONSE:", res);

        // 🔥 FIX: because backend returns { success, message, data }
        const data = res?.data ?? [];

        this.employees = data;
        this.filteredEmployees = data;

        this.loading = false;
      },

      error: (err) => {
        console.error("API ERROR:", err);
        this.loading = false;
      }
    });
  }

  // ================= SEARCH =================
  triggerSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      this.filteredEmployees = this.employees;
      return;
    }

    this.filteredEmployees = this.employees.filter(emp =>
      (emp.name || '').toLowerCase().includes(query) ||
      (emp.email || '').toLowerCase().includes(query) ||
      (emp.department || '').toLowerCase().includes(query) ||
      (emp.position || '').toLowerCase().includes(query)
    );
  }

  // ================= TRACK BY =================
  trackById(index: number, item: Employee): number {
    return item.id;
  }
}