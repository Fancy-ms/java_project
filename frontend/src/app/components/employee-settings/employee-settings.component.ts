import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 text-white space-y-6">

      <!-- HEADER -->
      <h1 class="text-3xl font-bold">⚙️ Employee Settings</h1>
      <p class="text-white/60">Manage your profile and account settings</p>

      <!-- SETTINGS CARD -->
      <div class="bg-[#1D546C] p-6 rounded-2xl shadow-lg space-y-4">

        <!-- NAME -->
        <div>
          <label class="text-sm text-white/70">Name</label>
          <input
            [(ngModel)]="name"
            type="text"
            placeholder="Enter name"
            class="w-full p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- EMAIL -->
        <div>
          <label class="text-sm text-white/70">Email</label>
          <input
            [(ngModel)]="email"
            type="email"
            placeholder="Enter email"
            class="w-full p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label class="text-sm text-white/70">Password</label>
          <input
            [(ngModel)]="password"
            type="password"
            placeholder="New password"
            class="w-full p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- SAVE BUTTON -->
        <button
          (click)="save()"
          class="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl transition"
        >
          Save Changes
        </button>

      </div>

    </div>
  `
})
export class EmployeeSettingsComponent {

  name = '';
  email = '';
  password = '';

  constructor() {
    // optional: localStorage preload
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.name = user?.name || '';
    this.email = user?.email || '';
  }

  save() {
    const updatedUser = {
      name: this.name,
      email: this.email
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));

    if (this.password) {
      console.log('Password changed (API call here)');
    }

    alert('Settings updated successfully ✅');
  }
}