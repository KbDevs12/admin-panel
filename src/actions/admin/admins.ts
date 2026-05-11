"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import {
  CreateAdminSchema,
  DeleteAdminSchema,
  UpdateAdminSchema,
} from "@/lib/validations/admin.schema";
import type { AdminAccountRow } from "@/types/admin";
import type {
  CreateAdminInput,
  DeleteAdminInput,
  UpdateAdminInput,
} from "@/lib/validations/admin.schema";

export async function getAdmins() {
  return api<AdminAccountRow[]>(ENDPOINTS.ADMIN.ADMINS);
}

export async function createAdmin(payload: CreateAdminInput) {
  const parsed = CreateAdminSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Payload tidak valid",
      data: undefined,
    };
  }

  const res = await api<AdminAccountRow>(ENDPOINTS.ADMIN.ADMINS, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  if (res.ok) revalidatePath("/admins");
  return res;
}

export async function updateAdmin(payload: UpdateAdminInput) {
  const parsed = UpdateAdminSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Payload tidak valid",
      data: undefined,
    };
  }

  const { id, password, ...rest } = parsed.data;
  const body: Record<string, unknown> = { ...rest };
  if (password?.trim()) body.password = password.trim();

  const res = await api(ENDPOINTS.ADMIN.ADMIN(id), {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  if (res.ok) revalidatePath("/admins");
  return res;
}

export async function deleteAdmin(payload: DeleteAdminInput) {
  const parsed = DeleteAdminSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Admin ID tidak valid",
      data: undefined,
    };
  }

  const res = await api(ENDPOINTS.ADMIN.ADMIN(parsed.data.id), {
    method: "DELETE",
  });
  if (res.ok) revalidatePath("/admins");
  return res;
}
