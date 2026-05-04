import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// 🔹 Helper function to normalize role
function getCleanRole(authService: AuthService): string {
  const role = authService.getRole(); // may be ROLE_ADMIN
  return role ? role.replace('ROLE_', '') : '';
}

// ================= COMMON AUTH CHECK =================
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

// ================= EMPLOYEE GUARD =================
export const employeeGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = getCleanRole(authService);

  if (authService.isLoggedIn() && role === 'EMPLOYEE') {
    return true;
  }

  return router.createUrlTree(['/login']);
};

// ================= MANAGER GUARD =================
export const managerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = getCleanRole(authService);

  if (
    authService.isLoggedIn() &&
    (role === 'MANAGER' || role === 'HR')
  ) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

// ================= ADMIN GUARD =================
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = getCleanRole(authService);

  if (authService.isLoggedIn() && role === 'ADMIN') {
    return true;
  }

  return router.createUrlTree(['/login']);
};