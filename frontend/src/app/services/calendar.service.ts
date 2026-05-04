import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseUrl = 'http://localhost:8080/api/admin/calendar';

  constructor(private http: HttpClient) { }

  // ================= GET ALL CALENDAR EVENTS =================
  getCalendarEvents() {
    return this.http.get('http://localhost:8080/api/admin/calendar/events');
  }

  // ================= GET EVENTS BY MONTH =================
  getEventsByMonth(month: number, year: number) {
    return this.http.get<any>(
      `${this.baseUrl}/events?month=${month}&year=${year}`
    );
  }

  // ================= GET EVENTS BY DATE RANGE =================
  getEventsByDateRange(fromDate: string, toDate: string) {
    return this.http.get<any>(
      `${this.baseUrl}/events?fromDate=${fromDate}&toDate=${toDate}`
    );
  }

  


}