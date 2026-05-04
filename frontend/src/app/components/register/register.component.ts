import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  contactNumber = '';

  role: 'EMPLOYEE' | 'MANAGER' | 'HR' = 'EMPLOYEE';
  department = '';
  loading = false;
  error = '';
  success = '';

  departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales', 'Operations', 'Design', 'Legal'];

  constructor(private authService: AuthService, private router: Router) { }

  onContactInput(event: any) {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 12);
    this.contactNumber = digitsOnly;
  }

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword || !this.department || !this.contactNumber) {
      this.error = 'Please fill in all fields.';
      return;
    }

    const normalizedContactNumber = this.normalizeIndianContactNumber(this.contactNumber);
    if (!normalizedContactNumber) {
      this.error = 'Enter a valid Indian mobile number.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      contactNumber: normalizedContactNumber,
      role: this.role,
      department: this.department
    }).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.success) {
          this.success = 'Account created successfully! Redirecting to login...';

          // IMPORTANT FIX 👇
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);

        } else {
          this.error = res.message;
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 0) {
          this.error = 'Cannot reach backend. Start the backend and allow localhost frontend access.';
          return;
        }
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  private normalizeIndianContactNumber(value: string): string | null {

    if (!value) return null;

    // remove all non digits
    let digits = value.replace(/\D/g, '');

    // remove country code 91
    if (digits.startsWith('91') && digits.length === 12) {
      digits = digits.substring(2);
    }

    // remove leading 0
    if (digits.startsWith('0') && digits.length === 11) {
      digits = digits.substring(1);
    }

    // final validation
    const isValid = /^[6-9]\d{9}$/.test(digits);

    return isValid ? digits : null;
  }
}
