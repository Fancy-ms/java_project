export interface Notification {
  id?: number;
  userEmail: string;
  message: string;
  type: 'LEAVE' | 'SYSTEM' | 'ALERT';
  read: boolean;
  createdAt?: string;
}