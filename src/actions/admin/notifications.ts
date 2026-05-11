"use server";

import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import type { AdminNotification } from "@/types/admin";

export async function getNotifications() {
  return api<AdminNotification[]>(ENDPOINTS.ADMIN.NOTIFICATIONS);
}
