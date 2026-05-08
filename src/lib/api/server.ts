import { cookies } from "next/headers";

import type { ApiResponse } from "@/types/api";

export async function api<T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_access_token")?.value;

  let response: Response;

  try {
    response = await fetch(`${process.env.API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      status: 0,
      success: false,
      message: "Tidak dapat terhubung ke server",
      data: undefined as T,
    };
  }

  let body: { success?: boolean; message?: string; data?: T } = {};

  try {
    body = await response.json();
  } catch {
    return {
      ok: false,
      status: response.status,
      success: false,
      message: `Server error (${response.status})`,
      data: undefined as T,
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    success: body.success ?? response.ok,
    message: body.message ?? (response.ok ? "OK" : "Terjadi kesalahan"),
    data: body.data as T,
  };
}
