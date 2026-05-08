export type PaymentStatus = "pending" | "paid" | "confirmed" | "rejected";

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  qr_code?: string | null;
  qr_type: "static" | "dynamic";
  status: PaymentStatus;
  paid_at?: string | null;
  confirmed_by?: string | null;
  confirmed_at?: string | null;
  qr_generated_at?: string | null;
  created_at: string;
  updated_at?: string | null;
}
