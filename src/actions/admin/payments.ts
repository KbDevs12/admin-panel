"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import type { AdminPaymentSummary } from "@/types/admin";

export async function getPayments(params?: {
  status?: string;
  date?: string;
  q?: string;
}) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.date) query.set("date", params.date);
  if (params?.q) query.set("q", params.q);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return api<AdminPaymentSummary[]>(`${ENDPOINTS.ADMIN.PAYMENTS}${suffix}`);
}

export async function getPaymentDetail(bookingID: string) {
  return api<AdminPaymentSummary>(ENDPOINTS.ADMIN.PAYMENT_DETAIL(bookingID));
}

export async function confirmPayment(formData: FormData) {
  const bookingID = String(formData.get("booking_id") ?? "");
  const res = await api(ENDPOINTS.ADMIN.CONFIRM_PAYMENT(bookingID), {
    method: "POST",
  });
  revalidatePath("/payments");
  revalidatePath(`/payments/${bookingID}`);
  if (!res.ok)
    redirect(`/payments/${bookingID}?error=${encodeURIComponent(res.message)}`);
  redirect(`/payments/${bookingID}`);
}

export async function rejectPayment(formData: FormData) {
  const bookingID = String(formData.get("booking_id") ?? "");
  const res = await api(ENDPOINTS.ADMIN.REJECT_PAYMENT(bookingID), {
    method: "POST",
  });
  revalidatePath("/payments");
  revalidatePath(`/payments/${bookingID}`);
  if (!res.ok)
    redirect(`/payments/${bookingID}?error=${encodeURIComponent(res.message)}`);
  redirect(`/payments/${bookingID}`);
}
