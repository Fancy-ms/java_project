import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="min-h-screen flex bg-[#0f071a]">

      <!-- SIDEBAR -->
      <aside class="w-72 h-screen fixed bg-[#1a0b2e] text-white p-6 flex flex-col shadow-2xl">

        <!-- PROFILE -->
        <div class="flex items-center gap-4 mb-10">
          <img
            [src]="profileImage || 'assets/profile.jpg'"
            class="h-12 w-12 rounded-2xl object-cover cursor-pointer border border-white/20"
            (click)="fileInput.click()"
          />

          <input type="file" #fileInput hidden (change)="onImageChange($event)" />

          <div>
            <h2 class="font-bold text-lg">{{ user?.name || 'Employee' }}</h2>
            <p class="text-xs text-slate-400">Employee Panel</p>
          </div>
        </div>

        <!-- NAV -->
        <nav class="flex-1 space-y-2">

          <a routerLink="/employee/dashboard" routerLinkActive="bg-purple-600"
             class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
            <span>🏠</span> Dashboard
          </a>

          <a routerLink="/employee/apply-leave" routerLinkActive="bg-purple-600"
             class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
            <span>➕</span> Apply Leave
          </a>

          <a routerLink="/employee/my-leaves" routerLinkActive="bg-purple-600"
             class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
            <span>📄</span> My Leaves
          </a>

          <a routerLink="/employee/leave-balance" routerLinkActive="bg-purple-600"
             class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
            <span>📊</span> Leave Balance
          </a>

        </nav>

        <!-- FOOTER -->
        <div class="mt-auto space-y-2">

          <button
            (click)="goToSettings()"
            class="flex w-full items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10">
            ⚙️ Settings
          </button>

          <button
            (click)="logout()"
            class="flex w-full items-center gap-4 px-4 py-3 rounded-xl bg-red-900/20 text-red-400 hover:bg-red-900/40">
            ↳ Logout
          </button>

        </div>

      </aside>

      <!-- CONTENT -->
      <div class="flex-1 ml-72 p-4">
        <router-outlet></router-outlet>
      </div>

    </div>
  `
})
export class EmployeeSidebarComponent {

  user: any;
  profileImage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getUser();
    this.profileImage = localStorage.getItem('profileImage');
  }

  // IMAGE UPLOAD
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
        localStorage.setItem('profileImage', this.profileImage);
      };
      reader.readAsDataURL(file);
    }
  }

  goToSettings() {
    this.router.navigate(['/employee/settings']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}