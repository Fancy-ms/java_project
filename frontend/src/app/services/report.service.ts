import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReportService {

  private baseUrl = 'http://localhost:8080/api/admin/reports';

  constructor(private http: HttpClient) {}

  // ================= GET REPORTS =================
  getReports(fromDate?: string, toDate?: string) {
    let url = this.baseUrl;

    if (fromDate && toDate) {
      url += `?fromDate=${fromDate}&toDate=${toDate}`;
    }

    return this.http.get<any>(url);
  }

  // ================= EXPORT REPORT (FIX ADDED) =================
  exportReport() {
    const url = `${this.baseUrl}/export`;

    return this.http.get(url, {
      responseType: 'blob'   // IMPORTANT for file download
    });
  }
}