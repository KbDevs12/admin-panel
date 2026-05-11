"use server";

import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import type { DailyReport, RangeReport } from "@/types/report";

export async function getDailyReport(date?: string) {
  const suffix = date ? `?date=${encodeURIComponent(date)}` : "";
  return api<DailyReport>(`${ENDPOINTS.ADMIN.DAILY_REPORT}${suffix}`);
}

export async function getRangeReport(params?: { from?: string; to?: string }) {
  const query = new URLSearchParams();
  if (params?.from) query.set("from", params.from);
  if (params?.to) query.set("to", params.to);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return api<RangeReport>(`${ENDPOINTS.ADMIN.RANGE_REPORT}${suffix}`);
}
