import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="min-h-screen bg-gradient-to-br from-[#0b0616] via-[#120a22] to-[#0f071a] text-white p-6">

    <!-- HEADER -->
    <div class="mb-10 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold flex items-center gap-2">
          ⚙️ Admin Settings
        </h1>
        <p class="text-gray-400 text-sm">Manage system preferences & account</p>
      </div>

      <span class="px-4 py-1 rounded-full bg-green-600/20 text-green-400 text-xs">
        ● Active
      </span>
    </div>

    <!-- GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- PROFILE -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl">

        <h2 class="text-xl font-semibold mb-5 flex items-center gap-2">
          👤 Profile Information
        </h2>

        <div class="space-y-4">

          <div>
            <label class="text-xs text-gray-400">Full Name</label>
            <input type="text"
              class="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter your name"/>
          </div>

          <div>
            <label class="text-xs text-gray-400">Email</label>
            <input type="email"
              class="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter your email"/>
          </div>

          <button
            class="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:scale-[1.02] transition shadow-lg">
            💾 Save Changes
          </button>

        </div>
      </div>

      <!-- SECURITY -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl">

        <h2 class="text-xl font-semibold mb-5 flex items-center gap-2">
          🔐 Security Settings
        </h2>

        <div class="space-y-4">

          <input type="password"
            placeholder="Current Password"
            class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none"/>

          <input type="password"
            placeholder="New Password"
            class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none"/>

          <input type="password"
            placeholder="Confirm Password"
            class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none"/>

          <button
            class="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 font-semibold hover:scale-[1.02] transition shadow-lg">
            🔄 Update Password
          </button>

        </div>
      </div>

      <!-- NOTIFICATIONS -->
      <div class="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl">

        <h2 class="text-xl font-semibold mb-5 flex items-center gap-2">
          🔔 Notification Preferences
        </h2>

        <div class="grid md:grid-cols-2 gap-4">

          <!-- EMAIL -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p class="font-medium">Email Notifications</p>
              <p class="text-xs text-gray-400">Receive updates via email</p>
            </div>
            <input type="checkbox" class="w-5 h-5 accent-purple-500"/>
          </div>

          <!-- APP -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div>
              <p class="font-medium">App Notifications</p>
              <p class="text-xs text-gray-400">Real-time alerts inside app</p>
            </div>
            <input type="checkbox" class="w-5 h-5 accent-pink-500"/>
          </div>

        </div>

      </div>

      <!-- SYSTEM -->
      <div class="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl">

        <h2 class="text-xl font-semibold mb-5">⚡ System Settings</h2>

        <div class="grid md:grid-cols-3 gap-4">

          <button class="p-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 transition">
            📊 Export Reports
          </button>

          <button class="p-4 rounded-xl bg-green-600/20 hover:bg-green-600/30 transition">
            🧾 Logs
          </button>

          <button class="p-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 transition">
            🧹 Clear Cache
          </button>

        </div>

      </div>

    </div>
  </div>
  `
})
export class AdminSettingsComponent {}