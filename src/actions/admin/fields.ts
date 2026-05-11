"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api/server";
import { ENDPOINTS } from "@/lib/api/endpoint";
import {
  CreateFieldSchema,
  FieldScheduleSchema,
  UpdateFieldSchema,
} from "@/lib/validations/admin.schema";
import type { AdminFieldRow, AdminScheduleRow } from "@/types/admin";
import type {
  CreateFieldInput,
  FieldScheduleInput,
  UpdateFieldInput,
} from "@/lib/validations/admin.schema";

export async function getFields() {
  return api<AdminFieldRow[]>(ENDPOINTS.ADMIN.FIELDS);
}

export async function getFieldDetail(id: string) {
  return api<AdminFieldRow>(ENDPOINTS.ADMIN.FIELD_DETAIL(id));
}

export async function getFieldSchedules(id: string) {
  return api<AdminScheduleRow[]>(ENDPOINTS.ADMIN.FIELD_SCHEDULES(id));
}

export async function createField(payload: CreateFieldInput) {
  const parsed = CreateFieldSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Payload field tidak valid",
      data: undefined,
    };
  }

  const res = await api<AdminFieldRow>(ENDPOINTS.ADMIN.FIELDS, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  if (res.ok) revalidatePath("/fields");
  return res;
}

export async function updateField(payload: UpdateFieldInput) {
  const parsed = UpdateFieldSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Payload field tidak valid",
      data: undefined,
    };
  }

  const { id, ...body } = parsed.data;
  const res = await api(ENDPOINTS.ADMIN.FIELD(id), {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  if (res.ok) {
    revalidatePath("/fields");
    revalidatePath(`/fields/${id}`);
  }

  return res;
}

export async function deleteField(payload: { id: string }) {
  const res = await api(ENDPOINTS.ADMIN.FIELD(payload.id), {
    method: "DELETE",
  });
  if (res.ok) revalidatePath("/fields");
  return res;
}

export async function upsertSchedule(payload: FieldScheduleInput) {
  const parsed = FieldScheduleSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      success: false,
      message: parsed.error.issues[0]?.message ?? "Payload jadwal tidak valid",
      data: undefined,
    };
  }

  const { field_id, ...body } = parsed.data;
  const res = await api(ENDPOINTS.ADMIN.FIELD_SCHEDULES(field_id), {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (res.ok) revalidatePath(`/fields/${field_id}`);
  return res;
}
