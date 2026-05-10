export type BookingStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "cancelled"
  | "completed";

export type PaymentStatus = "pending" | "paid" | "confirmed" | "rejected";

export interface AdminBookingSummary {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_hrs: number;
  booking_status: BookingStatus;
  booked_at: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  field_id: string;
  field_name: string;
  field_type: string;
  payment_id: string;
  amount: number;
  qr_code?: string;
  qr_type: "static" | "dynamic";
  payment_status: PaymentStatus;
  paid_at?: string | null;
  confirmed_at?: string | null;
}

export interface AdminPaymentSummary {
  id: string;
  booking_id: string;
  amount: number;
  qr_code?: string;
  qr_type: "static" | "dynamic";
  payment_status: PaymentStatus;
  paid_at?: string | null;
  confirmed_at?: string | null;
  confirmed_by?: string | null;
  booking_status: BookingStatus;
  date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  customer_email: string;
  field_name: string;
  created_at: string;
  updated_at?: string | null;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  email_verified: boolean;
  last_login_at?: string | null;
  created_at: string;
}

export interface AdminUserDetail extends AdminUserRow {
  firebase_uid: string;
  last_activity_at?: string | null;
  total_bookings: number;
  total_spent: number;
}

export interface AdminFieldRow {
  id: string;
  name: string;
  type: string;
  description: string;
  price_per_hour: number;
  is_available: boolean;
  created_at: string;
}

export interface AdminScheduleRow {
  id: string;
  field_id: string;
  date: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
  created_at: string;
}

export interface AdminNotification {
  id: string;
  user_id: string;
  customer_name: string;
  booking_id?: string | null;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface AdminAccountRow {
  id: string;
  firebase_uid: string;
  username: string;
  email: string;
  role: "admin" | "superadmin";
  last_login_at?: string | null;
  created_at: string;
}
