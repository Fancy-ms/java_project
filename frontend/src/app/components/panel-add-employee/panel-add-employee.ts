import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-panel-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel-add-employee.html',
  styleUrls: ['./panel-add-employee.css'],
})
export class PanelAddEmployee implements OnInit {

  employeeForm!: FormGroup;
  isLoading = false; // ✅ FIXED (consistent naming)

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      location: new FormControl('', Validators.required),
      joinDate: new FormControl('', Validators.required),
      leaveBalance: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  // ✅ Getter for HTML (f.name, f.email etc.)
  get f() {
    return this.employeeForm.controls;
  }

  onSaveEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched(); // show errors
      return;
    }

    this.isLoading = true;

    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Employee added successfully');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Something went wrong');
      },
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  
}