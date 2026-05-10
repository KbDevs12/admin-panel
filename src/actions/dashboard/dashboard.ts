import { cache } from "react";
import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import { DashboardData } from "@/types/report";

export const getDashboardData = cache(async () => {
  const response = await api<DashboardData>(ENDPOINTS.ADMIN.DASHBOARD);
  return response;
});
