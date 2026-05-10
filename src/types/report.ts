export interface DailyReport {
  date?: string;
  total_bookings: number;
  total_revenue: number;
  paid_bookings: number;
  pending_bookings?: number;
  cancelled_bookings?: number;
}

export interface RevenueChartPoint {
  date: string;
  revenue: number;
}

export interface RecentPendingBooking {
  booking_id: string;
  date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  field_name: string;
  amount: number;
  booked_at: string;
}

export interface DashboardData {
  today: string;
  total_bookings: number;
  pending_payment: number;
  paid_bookings: number;
  revenue_today: number;
  total_users: number;
  revenue_chart: RevenueChartPoint[];
  recent_pending: RecentPendingBooking[];
}

export interface RangeReport {
  period_start: string;
  period_end: string;
  total_bookings: number;
  pending_bookings: number;
  paid_bookings: number;
  cancelled_bookings: number;
  completed_bookings: number;
  total_revenue: number;
  revenue_chart: RevenueChartPoint[];
}
