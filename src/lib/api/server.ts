import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { ApiResponse } from "@/types/api";

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_access_token")?.value;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });
}

export async function api<T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  let response: Response;
  try {
    response = await fetchApi<T>(endpoint, options);
  } catch {
    return {
      ok: false,
      status: 0,
      success: false,
      message: "Tidak dapat terhubung ke server",
      data: undefined as T,
    };
  }

  if (response.status === 401) {
    const { refreshSession } = await import("@/actions/auth/refresh-session");
    const refreshed = await refreshSession();

    if (!refreshed) {
      redirect("/login");
    }

    try {
      response = await fetchApi<T>(endpoint, options);
    } catch {
      redirect("/login");
    }
  }

  let body: { success?: boolean; message?: string; data?: T } = {};

  try {
    body = await response.json();
  } catch {
    return {
      ok: false,
      status: response.status,
      success: false,
      message: `Server Error (${response.status})`,
      data: undefined as T,
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    success: body.success ?? response.ok,
    message:
      body.message ??
      (response.ok ? "Request berhasil" : `Request gagal (${response.status})`),
    data: body.data as T,
  };
}
