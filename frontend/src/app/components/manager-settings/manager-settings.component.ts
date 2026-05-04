import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 text-white">

      <!-- HEADER -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold">⚙️ Manager Settings</h1>
        <p class="text-white/60 mt-1">
          Manage your account information and preferences
        </p>
      </div>

      <!-- MAIN CARD -->
      <div class="bg-[#1D546C] rounded-2xl shadow-xl p-6 space-y-6">

        <!-- PROFILE SECTION -->
        <div class="flex items-center justify-between bg-white/5 p-4 rounded-xl">

          <div class="flex items-center gap-4">
            <img
              src="assets/profile.jpg"
              class="w-16 h-16 rounded-2xl border border-white/20 object-cover"
            />

            <div>
              <h2 class="font-semibold text-lg">Profile Photo</h2>
              <p class="text-sm text-white/60">Update your profile image</p>
            </div>
          </div>

          <button class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition">
            Change
          </button>

        </div>

        <!-- FORM GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- NAME -->
          <div>
            <label class="text-sm text-white/70">Full Name</label>
            <input
              type="text"
              placeholder="Enter name"
              class="w-full mt-2 p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <!-- EMAIL -->
          <div>
            <label class="text-sm text-white/70">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              class="w-full mt-2 p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <!-- PASSWORD -->
          <div class="md:col-span-2">
            <label class="text-sm text-white/70">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              class="w-full mt-2 p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>

        <!-- SETTINGS OPTIONS -->
        <div class="bg-white/5 p-4 rounded-xl flex items-center justify-between">

          <div>
            <h3 class="font-semibold">Email Notifications</h3>
            <p class="text-sm text-white/60">Receive updates via email</p>
          </div>

          <input type="checkbox" class="w-5 h-5 accent-blue-500" />

        </div>

        <!-- SAVE BUTTON -->
        <button
          class="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition shadow-md"
        >
          Save Changes
        </button>

      </div>
    </div>
  `
})
export class ManagerSettingsComponent {}