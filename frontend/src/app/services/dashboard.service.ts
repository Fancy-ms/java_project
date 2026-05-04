import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/admin/dashboard';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  getDashboard(): Observable<any> {

    let headers: any = {};

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('lms_token');

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return this.http.get<any>(this.apiUrl, { headers });
  }

  getCalendarEvents() {
    return this.http.get('http://localhost:8080/api/admin/calendar/events');
  }


  downloadReportPdf() {
    return this.http.get(
      'http://localhost:8080/api/admin/reports/pdf',
      { responseType: 'blob' }
    );
  }

downloadExcelReport() {
  return this.http.get('http://localhost:8080/api/admin/reports/excel', {
    responseType: 'blob'
  });
}
}