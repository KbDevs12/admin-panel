export const ENDPOINTS = {
  AUTH: {
    LOGIN_ADMIN: "/api/v1/auth/admin-login",
    REFRESH: "/api/v1/auth/refresh",
  },

  ADMIN: {
    DASHBOARD: "/api/v1/admin/dashboard",
    BOOKINGS: "/api/v1/admin/bookings",
    BOOKING_DETAIL: (id: string) => `/api/v1/admin/bookings/${id}`,

    CONFIRM_PAYMENT: (bookingId: string) =>
      `/api/v1/admin/payments/${bookingId}/confirm`,
    REJECT_PAYMENT: (bookingId: string) =>
      `/api/v1/admin/payments/${bookingId}/reject`,

    USERS: "/api/v1/admin/users",

    FIELDS: "/api/v1/admin/fields",
    FIELD: (id: string) => `/api/v1/admin/fields/${id}`,
    FIELD_SCHEDULES: (id: string) => `/api/v1/admin/fields/${id}/schedules`,
    FIELD_SCHEDULE: (id: string, date: string) =>
      `/api/v1/admin/fields/${id}/schedules/${date}`,

    DAILY_REPORT: "/api/v1/admin/reports/daily",
  },
} as const;
