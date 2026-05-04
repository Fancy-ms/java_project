import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-employee.html',
  styleUrls: ['./view-employee.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/employees']);
      return;
    }

    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  deleteEmployee(id: number) {
    if (!confirm('Are you sure?')) return;

    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}