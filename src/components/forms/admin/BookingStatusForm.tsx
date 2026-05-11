"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { updateBookingStatus } from "@/actions/admin/bookings";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { BookingStatusSchema, UpdateBookingStatusSchema } from "@/lib/validations/admin.schema";
import type { BookingStatus } from "@/types/admin";
import { SelectField } from "./form-utils";

export function BookingStatusForm({ bookingId, status }: { bookingId: string; status: BookingStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const statuses = BookingStatusSchema.options;

  const form = useForm({
    defaultValues: {
      booking_id: bookingId,
      status,
    },
    validators: {
      onSubmit: UpdateBookingStatusSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Mengubah status booking...", { position: "top-right" });
      startTransition(async () => {
        const res = await updateBookingStatus(value);
        if (!res.ok) {
          toast.error("Gagal mengubah status", { id: toastId, description: res.message, position: "top-right" });
          return;
        }
        toast.success("Status booking berhasil diubah", { id: toastId, position: "top-right" });
        router.refresh();
      });
    },
  });

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-3">
        <form.Field name="status">
          {(field) => (
            <SelectField id="booking-status" label="Status" value={field.state.value} onBlur={field.handleBlur} onChange={(value) => field.handleChange(value as BookingStatus)} meta={field.state.meta} disabled={isPending}>
              {statuses.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </SelectField>
          )}
        </form.Field>
      </FieldGroup>
      <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Update Status"}</Button>
    </form>
  );
}
