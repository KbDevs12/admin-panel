import type { Field } from "./field";
import type { Payment } from "./payment";
import type { User } from "./user";

export type BookingStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Booking {
  id: string;
  user_id: string;
  field_id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_hrs: number;
  status: BookingStatus;
  created_at: string;
  updated_at?: string | null;

  user?: User;
  field?: Field;
  payment?: Payment;
}
