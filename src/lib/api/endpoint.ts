export const API_ENDPOINTS = {
  AUTH: {
    LOGIN_ADMIN: "/api/v1/auth/admin-login",
    REFRESH: "/api/v1/auth/refresh",
  },

  ADMIN: {
    BOOKINGS: "/api/v1/admin/bookings",
    BOOKING_DETAIL: (id: string) => `/api/v1/admin/bookings/${id}`,

    CONFIRM_PAYMENT: (bookingId: string) =>
      `/api/v1/admin/payments/${bookingId}/confirm`,

    REJECT_PAYMENT: (bookingId: string) =>
      `/api/v1/admin/payments/${bookingId}/reject`,

    USERS: "/api/v1/admin/users",

    FIELDS: "/api/v1/admin/fields",

    DAILY_REPORT: "/api/v1/admin/reports/daily",
  },
};
