import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.css'],
})
export class EditEmployee implements OnInit {

  employee: any = {
    id: 0,
    name: '',
    email: '',
    department: '',
    position: ''
  };

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

    this.loadEmployee(id);
  }

  loadEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data: any) => {
        this.employee = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: () => {
        alert('Employee updated successfully');
        this.router.navigate(['/employees']);
      },
      error: (err: any) => console.error(err),
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}