import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent {

  // ================= FORM MODEL =================
  meeting = {
    title: '',
    date: '',
    time: '',
    participants: '',
    description: ''
  };

  // ================= UI STATES =================
  participantError = false;
  participantsArray: string[] = [];
  loading = false;

  constructor(private meetingService: MeetingService) {}

  // ================= PARTICIPANTS HANDLER =================
  onParticipantsChange(): void {

    if (!this.meeting.participants) {
      this.participantsArray = [];
      this.participantError = false;
      return;
    }

    const emails = this.meeting.participants
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.participantError = emails.some(e => !emailRegex.test(e));
    this.participantsArray = emails;
  }

  // ================= SAVE MEETING =================
  saveMeeting(): void {

    // ✅ required validation
    if (!this.meeting.title || !this.meeting.date || !this.meeting.time) {
      alert('⚠️ Please fill all required fields');
      return;
    }

    // ✅ email validation
    this.onParticipantsChange();

    if (this.participantError) {
      alert('❌ Invalid email format');
      return;
    }

    const payload = {
      title: this.meeting.title,
      description: this.meeting.description,
      participants: this.participantsArray,
      meetingDateTime: `${this.meeting.date}T${this.meeting.time}:00`
    };

    this.loading = true;

    this.meetingService.createMeeting(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('✅ Meeting Scheduled & Emails Sent!');
        this.resetForm();
      },
      error: (err) => {
        this.loading = false;
        console.error('Meeting Error:', err);
        alert('❌ Failed to schedule meeting');
      }
    });
  }

  // ================= RESET =================
  resetForm(): void {
    this.meeting = {
      title: '',
      date: '',
      time: '',
      participants: '',
      description: ''
    };

    this.participantsArray = [];
    this.participantError = false;
  }
}