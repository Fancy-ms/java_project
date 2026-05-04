import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private baseUrl = 'hjavaproject-production-25e8.up.railway.app';

  constructor(private http: HttpClient) {}

  // ✅ FIXED: use any OR DTO instead of strict Meeting
  createMeeting(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
