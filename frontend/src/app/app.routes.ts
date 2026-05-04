import { Routes } from '@angular/router';
import { authGuard, employeeGuard, managerGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [

  // ================= PUBLIC =================
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component')
        .then(m => m.RegisterComponent)
  },

  // ================= EMPLOYEE =================
  // ================= EMPLOYEE =================
  {
    path: 'employee',
    canActivate: [employeeGuard],
    loadComponent: () =>
      import('./components/sidebar-shell/sidebar-shell.component')
        .then(m => m.SidebarShellComponent),

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/employee-dashboard/employee-dashboard.component')
            .then(m => m.EmployeeDashboardComponent)
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('./components/apply-leave/apply-leave.component')
            .then(m => m.ApplyLeaveComponent)
      },
      {
        path: 'my-leaves',
        loadComponent: () =>
          import('./components/my-leaves/my-leaves.component')
            .then(m => m.MyLeavesComponent)
      },


      {
        path: 'settings',
        loadComponent: () =>
          import('./components/employee-settings/employee-settings.component')
            .then(m => m.EmployeeSettingsComponent)
      },
      {
        path: 'leave-balance',
        loadComponent: () =>
          import('./components/leave-balance/leave-balance.component')
            .then(m => m.LeaveBalanceComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  // ================= MANAGER =================
  {
    path: 'manager',
    canActivate: [managerGuard],
    loadComponent: () =>
      import('./components/sidebar-shell/sidebar-shell.component')
        .then(m => m.SidebarShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/manager-dashboard/manager-dashboard.component')
            .then(m => m.ManagerDashboardComponent)
      },
      {
        path: 'team-leaves',
        loadComponent: () =>
          import('./components/team-leaves/team-leaves.component')
            .then(m => m.TeamLeavesComponent)
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('./components/apply-leave/apply-leave.component')
            .then(m => m.ApplyLeaveComponent)
      },
      {
        path: 'my-leaves',
        loadComponent: () =>
          import('./components/my-leaves/my-leaves.component')
            .then(m => m.MyLeavesComponent)
      },
      {
        path: 'leave-balance',
        loadComponent: () =>
          import('./components/leave-balance/leave-balance.component')
            .then(m => m.LeaveBalanceComponent)
      },


      {
        path: 'settings',
        loadComponent: () =>
          import('./components/manager-settings/manager-settings.component')
            .then(m => m.ManagerSettingsComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // ================= ADMIN =================
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./components/sidebar-shell/sidebar-shell.component')
        .then(m => m.SidebarShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/panel-dashboard/panel-dashboard.component')
            .then(m => m.PanelDashboard)
      },






     {
  path: 'approved-employees',
  loadComponent: () =>
    import('./pages/approved-employees/approved-employees.component')
      .then(m => m.ApprovedEmployeesComponent)
},



      {
        path: 'employees',
        loadComponent: () =>
          import('./components/panel-employees/panel-employees')
            .then(m => m.PanelEmployees)
      },



      {
        path: 'edit-employee/:id',
        loadComponent: () =>
          import('./components/panel-edit-employee/edit-employee')
            .then(m => m.EditEmployee)

      },

      {
        path: 'view-employee/:id',
        loadComponent: () =>
          import('./components/panel-view-employee/view-employee')
            .then(m => m.ViewEmployeeComponent)

      },

      {
        path: 'add-employee',
        loadComponent: () =>
          import('./components/panel-add-employee/panel-add-employee')
            .then(m => m.PanelAddEmployee)
      },

       {
        path: 'active-employees',
        loadComponent: () =>
          import('./components/active-employees/active-employees-component')
            .then(m => m.ActiveEmployeesComponent)
      },


      {
        path: 'reports',
        loadComponent: () =>
          import('./components/panel-reports/panel-reports')
            .then(m => m.PanelReports)
      },

      {
        path: 'calendar',
        loadComponent: () =>
          import('./components/panel-calendar/panel-calendar')
            .then(m => m.PanelCalendar)
      },

      {
        path: 'settings',
        loadComponent: () =>
          import('./components/admin-settings/admin-settings.component')
            .then(m => m.AdminSettingsComponent)
      },

      {
        path: 'schedule-meeting',
        loadComponent: () =>
          import('./schedule-meeting/schedule-meeting.component')
            .then(m => m.ScheduleMeetingComponent)
      },




      {
        path: 'notifications',
        loadComponent: () =>
          import('./components/notifications/notifications.component')
            .then(m => m.NotificationsComponent)
      },


      {
        path: 'leaves',
        loadComponent: () =>
          import('./components/panel-leaves/panel-leaves')
            .then(m => m.PanelLeaves)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '/login' }
];