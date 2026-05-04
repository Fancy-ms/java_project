import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

type NavItem = {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
};

@Component({
  selector: 'app-sidebar-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="min-h-screen flex bg-[#0f071a]">

      <!-- SIDEBAR -->
      <aside
        class="flex h-screen w-72 flex-col p-6 text-white shadow-2xl fixed
        backdrop-blur-xl border-r border-white/10 transition-all duration-300"
        [ngClass]="sidebarClass"
      >

        <!-- HEADER -->
        <header class="mb-10 flex items-center justify-between px-2">

          <div class="flex items-center gap-4">

            <!-- PROFILE -->
            <div class="relative">
              <img
                [src]="profileImage || 'assets/profile.jpg'"
                class="h-12 w-12 rounded-2xl object-cover cursor-pointer border border-white/20"
                (click)="fileInput.click()"
              />
              <input type="file" #fileInput hidden (change)="onImageChange($event)" />
            </div>

            <div>
              <h1 class="text-xl font-bold">{{ user?.name || 'User' }}</h1>
              <p class="text-xs text-white/70">{{ roleTitle }}</p>
            </div>

          </div>

          <div
  *ngIf="isAdmin"
  class="relative cursor-pointer"
  (click)="goToNotifications()"
>
  🔔
  <span class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 rounded-full">
    {{ unreadCount }}
  </span>
</div>

        </header>

        <!-- NAV -->
        <nav class="flex-1 space-y-2">

          <a
            *ngFor="let item of navItems"
            [routerLink]="item.route"
            [routerLinkActive]="activeClass"
            [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
            class="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-200
            hover:bg-white/10 hover:scale-[1.02] transition-all duration-200"
          >
            <span class="text-xl">{{ item.icon }}</span>
            <span class="font-semibold">{{ item.label }}</span>
          </a>

        </nav>

        <!-- FOOTER -->
        <footer class="mt-auto pt-10 space-y-2">
          <hr class="mb-6 border-white/20" />

          <button
            (click)="goToSettings()"
            class="flex w-full items-center gap-4 px-4 py-4 rounded-xl
            hover:bg-white/10 transition"
          >
            ⚙️ Settings
          </button>

          <button
            (click)="logout()"
            class="flex w-full items-center gap-4 px-4 py-4 rounded-xl
            text-red-200 hover:bg-red-900/30 transition"
          >
            ↳ Logout
          </button>

        </footer>

      </aside>

      <!-- CONTENT -->
      <div class="flex-1 ml-72 p-4">
        <router-outlet></router-outlet>
      </div>

    </div>
  `
})
export class SidebarShellComponent {

  role = '';
  user: any;
  unreadCount = 3;
  profileImage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const rawRole = this.authService.getRole();
    this.role = rawRole?.replace('ROLE_', '')?.toUpperCase() || 'EMPLOYEE';
    this.user = this.authService.getUser();

    this.profileImage = localStorage.getItem(this.storageKey);
  }

  get storageKey(): string {
    return `profileImage_${this.role}`;
  }

  // NAVIGATION
  private adminNav: NavItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: '⊞', exact: true },
    { label: 'Employees', route: '/admin/employees', icon: '👥' },
    { label: 'Leaves', route: '/admin/leaves', icon: '📄' },
    { label: 'Reports', route: '/admin/reports', icon: '📊' },
    { label: 'Calendar', route: '/admin/calendar', icon: '📅' }
  ];

  private managerNav: NavItem[] = [
    { label: 'Dashboard', route: '/manager/dashboard', icon: '⊞', exact: true },
    { label: 'Team Leaves', route: '/manager/team-leaves', icon: '📄' },
    { label: 'Apply Leave', route: '/manager/apply-leave', icon: '➕' },
    { label: 'My Leaves', route: '/manager/my-leaves', icon: '📑' }
  ];

  private employeeNav: NavItem[] = [
    { label: 'Dashboard', route: '/employee/dashboard', icon: '⊞', exact: true },
    { label: 'Apply Leave', route: '/employee/apply-leave', icon: '➕' },
    { label: 'My Leaves', route: '/employee/my-leaves', icon: '📄' },
    { label: 'Leave Balance', route: '/employee/leave-balance', icon: '📊' }
  ];

  get navItems(): NavItem[] {
    if (this.role === 'ADMIN') return this.adminNav;
    if (this.role === 'MANAGER' || this.role === 'HR') return this.managerNav;
    return this.employeeNav;
  }

  // 🎨 SIDEBAR THEME CONTROL
  get sidebarClass(): string {
    if (this.role === 'ADMIN') {
      return 'bg-[#1a0b2e] shadow-[0_0_40px_rgba(168,85,247,0.25)]';
    }
    return 'bg-[#1D546C] shadow-[0_0_35px_rgba(29,84,108,0.35)]';
  }

  get activeClass(): string {
    if (this.role === 'ADMIN') {
      return 'bg-purple-500/30 text-white border-l-4 border-purple-400 shadow-md';
    }
    return 'bg-blue-500/20 text-white border-l-4 border-blue-400 shadow-md';
  }

  get roleTitle(): string {
    return this.role + ' Panel';
  }

  onImageChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
        localStorage.setItem(this.storageKey, this.profileImage);
      };
      reader.readAsDataURL(file);
    }
  }

  goToNotifications() {
    this.router.navigate([`/${this.role.toLowerCase()}/notifications`]);
  }

  goToSettings() {
    this.router.navigate([`/${this.role.toLowerCase()}/settings`]);
  }

  get isAdmin(): boolean {
  return this.role === 'ADMIN';
}





  logout() {
    this.authService.logout();
  }
}