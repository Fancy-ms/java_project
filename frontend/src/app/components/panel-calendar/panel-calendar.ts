import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  color: 'green' | 'orange' | 'red';
}

@Component({
  selector: 'app-panel-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-calendar.html',
  styleUrls: ['./panel-calendar.css']
})
export class PanelCalendar implements OnInit {

  // ================= DATE =================
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();

  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  daysInMonth: number[] = [];
  startOffset: number[] = [];

  selectedDay: number | null = null;

  // ================= POPUP =================
  showPopup = false;
  selectedDateLeaves: CalendarEvent[] = [];

  // ================= STATS =================
  monthlyLeaves = 0;
  approvedLeaves = 0;
  pendingLeaves = 0;
  rejectedLeaves = 0;

  // ================= EVENTS =================
  events: CalendarEvent[] = [];
  upcoming: CalendarEvent[] = [];

  constructor(private calendarService: CalendarService) {}

  // ================= INIT =================
  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
  }

  // ================= CALENDAR =================
  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    this.startOffset = Array(firstDay).fill(0);
  }

  // ================= LOAD EVENTS =================
  loadEvents(): void {
    this.calendarService.getCalendarEvents().subscribe({
      next: (res: any) => {
        this.events = res?.data ?? [];

        this.calculateStats();
        this.getUpcomingEvents();
      },
      error: (err) => console.error('Calendar API Error:', err)
    });
  }

  // ================= NAVIGATION =================
  nextMonth(): void {
    this.currentMonth++;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    this.generateCalendar();
  }

  prevMonth(): void {
    this.currentMonth--;

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }

    this.generateCalendar();
  }

  // ================= DAY CLICK =================
  selectDay(day: number): void {
    this.selectedDay = day;

    const selectedDate = new Date(this.currentYear, this.currentMonth, day);

    this.selectedDateLeaves = this.events.filter(e => {
      const start = this.parseDate(e.start);
      const end = this.parseDate(e.end);

      return start && end && selectedDate >= start && selectedDate <= end;
    });

    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  // ================= HELPERS =================
  parseDate(date: string): Date | null {
    if (!date) return null;

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    return isNaN(d.getTime()) ? null : d;
  }

  // ================= CHECK LEAVE =================
  isLeaveDay(day: number): boolean {
    const currentDate = new Date(this.currentYear, this.currentMonth, day);

    return this.events.some(e => {
      const start = this.parseDate(e.start);
      const end = this.parseDate(e.end);

      return start && end && currentDate >= start && currentDate <= end;
    });
  }

  // ================= UPCOMING =================
  getUpcomingEvents(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.upcoming = this.events
      .filter(e => {
        const start = this.parseDate(e.start);
        return start && start >= today;
      })
      .sort((a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
      )
      .slice(0, 5);
  }

  // ================= STATS =================
  calculateStats(): void {
    this.monthlyLeaves = this.events.length;

    this.approvedLeaves = this.events.filter(e => e.color === 'green').length;
    this.pendingLeaves = this.events.filter(e => e.color === 'orange').length;
    this.rejectedLeaves = this.events.filter(e => e.color === 'red').length;
  }

  // ================= MONTH NAME =================
  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth)
      .toLocaleString('default', { month: 'long' });
  }
}