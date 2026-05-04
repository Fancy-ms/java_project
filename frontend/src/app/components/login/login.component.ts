import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {

    // Validation
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    })
    .pipe(take(1))
    .subscribe({

      next: (res: any) => {
        this.loading = false;

        if (res?.success && res?.data) {

          const token = res.data.token;

          // normalize role (VERY IMPORTANT FIX)
          const role = (res.data.role || '').toUpperCase();

          // localStorage.setItem('token', token);
          // localStorage.setItem('role', role);

          console.log('LOGIN SUCCESS | ROLE:', role);

          // CENTRALIZED ROUTING MAP (FIXED)
          const roleRoutes: any = {
            'ADMIN': '/admin/dashboard',
            'ROLE_ADMIN': '/admin/dashboard',

            'MANAGER': '/manager/dashboard',
            'ROLE_MANAGER': '/manager/dashboard',

            'EMPLOYEE': '/employee/dashboard',
            'ROLE_EMPLOYEE': '/employee/dashboard'
          };

          const route = roleRoutes[role];

          if (route) {
            this.router.navigate([route]);
          } else {
            console.warn('Unknown role:', role);
            this.router.navigate(['/login']);
          }

        } else {
          this.error = res?.message || 'Login failed';
        }
      },

      error: (err) => {
        this.loading = false;
        console.error('Login Error:', err);

        this.error =
          err?.error?.message ||
          'Invalid email or password';
      }
    });
  }
}