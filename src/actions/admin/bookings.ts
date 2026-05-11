"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import {
  CreateBookingSchema,
  UpdateBookingStatusSchema,
} from "@/lib/validations/admin.schema";
import type { AdminBookingSummary } from "@/types/admin";
import type {
  CreateBookingInput,
  UpdateBookingStatusInput,
} from "@/lib/validations/admin.schema";

export async function getBookings(params?: { status?: string; date?: string }) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.date) query.set("date", params.date);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return api<AdminBookingSummary[]>(`${ENDPOINTS.ADMIN.BOOKINGS}${suffix}`);
}

export async function getBookingDetail(id: string) {
  return api<AdminBookingSummary>(ENDPOINTS.ADMIN.BOOKING_DETAIL(id));
}

export async function createAdminBooking(payload: CreateBookingInput) {
  const parsed = CreateBookingSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Payload booking tidak valid",
      data: undefined,
    };
  }

  const res = await api<{ id: string }>(ENDPOINTS.ADMIN.CREATE_BOOKING, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  if (res.ok) revalidatePath("/bookings");
  return res;
}

export async function updateBookingStatus(payload: UpdateBookingStatusInput) {
  const parsed = UpdateBookingStatusSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Status booking tidak valid",
      data: undefined,
    };
  }

  const res = await api(
    ENDPOINTS.ADMIN.UPDATE_BOOKING_STATUS(parsed.data.booking_id),
    {
      method: "PATCH",
      body: JSON.stringify({ status: parsed.data.status }),
    },
  );

  if (res.ok) {
    revalidatePath("/bookings");
    revalidatePath(`/bookings/${parsed.data.booking_id}`);
  }

  return res;
}
