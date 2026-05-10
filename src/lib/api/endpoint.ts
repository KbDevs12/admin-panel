export const ENDPOINTS = {
  AUTH: {
    LOGIN_ADMIN: "/api/v1/auth/admin-login",
    REFRESH: "/api/v1/auth/refresh",
  },

  ADMIN: {
    DASHBOARD: "/api/v1/admin/dashboard",

    ADMINS: "/api/v1/admin/admins",
    ADMIN: (id: string) => `/api/v1/admin/admins/${id}`,

    BOOKINGS: "/api/v1/admin/bookings",
    BOOKING_DETAIL: (id: string) => `/api/v1/admin/bookings/${id}`,
    CREATE_BOOKING: "/api/v1/admin/bookings",
    UPDATE_BOOKING_STATUS: (id: string) =>
      `/api/v1/admin/bookings/${id}/status`,

    PAYMENTS: "/api/v1/admin/payments",
    PAYMENT_DETAIL: (bookingId: string) =>
      `/api/v1/admin/payments/${bookingId}`,
    CONFIRM_PAYMENT: (bookingId: string) =>
      `/api/v1/admin/payments/${bookingId}/confirm`,
    REJECT_PAYMENT: (bookingId: string) =>
      `/api/v1/admin/payments/${bookingId}/reject`,

    USERS: "/api/v1/admin/users",
    USER_DETAIL: (id: string) => `/api/v1/admin/users/${id}`,
    USER: (id: string) => `/api/v1/admin/users/${id}`,

    FIELDS: "/api/v1/admin/fields",
    FIELD: (id: string) => `/api/v1/admin/fields/${id}`,
    FIELD_DETAIL: (id: string) => `/api/v1/admin/fields/${id}`,
    FIELD_SCHEDULES: (id: string) => `/api/v1/admin/fields/${id}/schedules`,
    FIELD_SCHEDULE: (id: string, date: string) =>
      `/api/v1/admin/fields/${id}/schedules/${date}`,

    DAILY_REPORT: "/api/v1/admin/reports/daily",
    RANGE_REPORT: "/api/v1/admin/reports/range",
    NOTIFICATIONS: "/api/v1/admin/notifications",
  },
} as const;
