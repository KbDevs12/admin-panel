"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import { UpdateUserSchema } from "@/lib/validations/admin.schema";
import type { AdminUserDetail, AdminUserRow } from "@/types/admin";
import type { UpdateUserInput } from "@/lib/validations/admin.schema";

export async function getUsers() {
  return api<AdminUserRow[]>(ENDPOINTS.ADMIN.USERS);
}

export async function getUserDetail(id: string) {
  return api<AdminUserDetail>(ENDPOINTS.ADMIN.USER_DETAIL(id));
}

export async function updateUser(payload: UpdateUserInput) {
  const parsed = UpdateUserSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Payload user tidak valid",
      data: undefined,
    };
  }

  const { id, ...body } = parsed.data;
  const res = await api(ENDPOINTS.ADMIN.USER(id), {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  if (res.ok) {
    revalidatePath("/users");
    revalidatePath(`/users/${id}`);
  }

  return res;
}

export async function deleteUser(payload: { id: string }) {
  const res = await api(ENDPOINTS.ADMIN.USER(payload.id), { method: "DELETE" });
  if (res.ok) revalidatePath("/users");
  return res;
}
