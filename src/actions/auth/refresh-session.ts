"use server";

import { cookies } from "next/headers";

import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import { refreshResponse } from "@/types/auth";

export async function refreshSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_access_token")?.value;

  if (!token) {
    return null;
  }

  const res = await api<refreshResponse>(ENDPOINTS.AUTH.REFRESH, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    cookieStore.delete("admin_access_token");
    return null;
  }

  const result = await res.data;

  cookieStore.set("admin_access_token", result.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return result;
}
