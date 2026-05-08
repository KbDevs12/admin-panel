export interface User {
  id: string;
  firebase_uid: string;
  name: string;
  email: string;
  phone?: string | null;
  email_verified: boolean;
  last_login_at?: string | null;
  last_activity_at?: string | null;
  created_at: string;
}
