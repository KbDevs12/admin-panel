"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api/server";
import { setSession } from "@/lib/auth/session";
import { ENDPOINTS } from "@/lib/api/endpoint";

import type { LoginPayload, LoginResponse } from "@/types/auth";

export async function loginAdmin(payload: LoginPayload) {
  const res = await api<LoginResponse>(ENDPOINTS.AUTH.LOGIN_ADMIN, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return { ok: false, message: res.message };
  }

  await setSession(
    res.data.access_token,
    {
      id: res.data.user_id,
      email: res.data.email,
      name: res.data.name,
      role: res.data.role,
    },
    res.data.expires_in,
  );

  redirect("/dashboard");
}
