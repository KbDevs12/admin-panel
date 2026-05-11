"use client";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { createAdminBooking } from "@/actions/admin/bookings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { CreateBookingSchema } from "@/lib/validations/admin.schema";
import { CheckboxField, SelectField, TextField } from "./form-utils";

import type { AdminFieldRow, AdminUserRow } from "@/types/admin";

export function CreateBookingForm({ users, fields }: { users: AdminUserRow[]; fields: AdminFieldRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      user_id: "",
      field_id: "",
      date: "",
      start_time: "",
      end_time: "",
      mark_paid: false,
    },
    validators: {
      onSubmit: CreateBookingSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Membuat booking...", { position: "top-right" });

      startTransition(async () => {
        try {
          const res = await createAdminBooking(value);
          if (!res.ok) {
            toast.error("Gagal membuat booking", { id: toastId, description: res.message, position: "top-right" });
            return;
          }

          toast.success("Booking berhasil dibuat", { id: toastId, position: "top-right" });
          router.push("/bookings");
          router.refresh();
        } catch (error) {
          if (isRedirectError(error)) throw error;
          toast.error("Gagal membuat booking", {
            id: toastId,
            description: error instanceof Error ? error.message : "Terjadi kesalahan",
            position: "top-right",
          });
        }
      });
    },
  });

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Booking Manual</CardTitle>
        <CardDescription>Gunakan UUID user dan field dari tabel admin.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="create-booking-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="user_id">
              {(field) => (
                <SelectField id={field.name} label="User" value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending}>
                  <option value="">Pilih user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name} — {user.email}</option>
                  ))}
                </SelectField>
              )}
            </form.Field>
            <form.Field name="field_id">
              {(field) => (
                <SelectField id={field.name} label="Lapangan" value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending}>
                  <option value="">Pilih lapangan</option>
                  {fields.filter((item) => item.is_available).map((item) => (
                    <option key={item.id} value={item.id}>{item.name} — Rp {item.price_per_hour}/jam</option>
                  ))}
                </SelectField>
              )}
            </form.Field>
            <div className="grid gap-4 md:grid-cols-3">
              <form.Field name="date">
                {(field) => <TextField id={field.name} label="Tanggal" type="date" value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending} />}
              </form.Field>
              <form.Field name="start_time">
                {(field) => <TextField id={field.name} label="Mulai" type="time" value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending} />}
              </form.Field>
              <form.Field name="end_time">
                {(field) => <TextField id={field.name} label="Selesai" type="time" value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending} />}
              </form.Field>
            </div>
            <form.Field name="mark_paid">
              {(field) => <CheckboxField id={field.name} label="Tandai langsung sebagai sudah dibayar" checked={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} disabled={isPending} />}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="create-booking-form" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Create Booking"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
