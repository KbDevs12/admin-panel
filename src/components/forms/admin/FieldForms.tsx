"use client";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  createField,
  deleteField,
  updateField,
  upsertSchedule,
} from "@/actions/admin/fields";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CreateFieldSchema,
  FieldScheduleSchema,
  UpdateFieldSchema,
} from "@/lib/validations/admin.schema";
import type { AdminFieldRow } from "@/types/admin";
import {
  CheckboxField,
  NumberField,
  SelectField,
  TextareaField,
  TextField,
} from "./form-utils";

export function CreateFieldForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      name: "",
      type: "futsal" as const,
      price_per_hour: 0,
      description: "",
    },
    validators: {
      onSubmit: CreateFieldSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Menyimpan field...", {
        position: "top-right",
      });
      startTransition(async () => {
        try {
          const res = await createField(value);
          if (!res.ok) {
            toast.error("Gagal membuat field", {
              id: toastId,
              description: res.message,
              position: "top-right",
            });
            return;
          }
          toast.success("Field berhasil dibuat", {
            id: toastId,
            position: "top-right",
          });
          router.push("/fields");
          router.refresh();
        } catch (error) {
          if (isRedirectError(error)) throw error;
          toast.error("Gagal membuat field", {
            id: toastId,
            description:
              error instanceof Error ? error.message : "Terjadi kesalahan",
            position: "top-right",
          });
        }
      });
    },
  });

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Field Baru</CardTitle>
        <CardDescription>
          Tambah lapangan yang bisa dipesan user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="create-field-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => (
                <TextField
                  id={field.name}
                  label="Nama"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="type">
              {(field) => (
                <SelectField
                  id={field.name}
                  label="Tipe"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(value) => field.handleChange(value as "futsal")}
                  meta={field.state.meta}
                  disabled={isPending}
                >
                  <option value="futsal">Futsal</option>
                </SelectField>
              )}
            </form.Field>
            <form.Field name="price_per_hour">
              {(field) => (
                <NumberField
                  id={field.name}
                  label="Harga per jam"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  min={1}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => (
                <TextareaField
                  id={field.name}
                  label="Deskripsi"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="create-field-form" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan Field"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export function EditFieldForm({ field }: { field: AdminFieldRow }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      id: field.id,
      name: field.name,
      type: "futsal" as const,
      price_per_hour: field.price_per_hour,
      description: field.description ?? "",
      is_available: field.is_available,
    },
    validators: {
      onSubmit: UpdateFieldSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Update field...", {
        position: "top-right",
      });
      startTransition(async () => {
        const res = await updateField(value);
        if (!res.ok) {
          toast.error("Gagal update field", {
            id: toastId,
            description: res.message,
            position: "top-right",
          });
          return;
        }
        toast.success("Field berhasil diupdate", {
          id: toastId,
          position: "top-right",
        });
        router.refresh();
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Field</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(item) => (
                <TextField
                  id="field-name"
                  label="Nama"
                  value={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  meta={item.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="type">
              {(item) => (
                <SelectField
                  id="field-type"
                  label="Tipe"
                  value={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={(value) => item.handleChange(value as "futsal")}
                  meta={item.state.meta}
                  disabled={isPending}
                >
                  <option value="futsal">Futsal</option>
                </SelectField>
              )}
            </form.Field>
            <form.Field name="price_per_hour">
              {(item) => (
                <NumberField
                  id="field-price"
                  label="Harga per jam"
                  value={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  meta={item.state.meta}
                  min={1}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="description">
              {(item) => (
                <TextareaField
                  id="field-description"
                  label="Deskripsi"
                  value={item.state.value ?? ""}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  meta={item.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="is_available">
              {(item) => (
                <CheckboxField
                  id="field-available"
                  label="Available"
                  checked={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  disabled={isPending}
                />
              )}
            </form.Field>
          </FieldGroup>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Update Field"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function FieldScheduleForm({ fieldId }: { fieldId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      field_id: fieldId,
      date: "",
      open_time: "08:00",
      close_time: "23:00",
      is_closed: false,
    },
    validators: {
      onSubmit: FieldScheduleSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Menyimpan jadwal...", {
        position: "top-right",
      });
      startTransition(async () => {
        const res = await upsertSchedule(value);
        if (!res.ok) {
          toast.error("Gagal simpan jadwal", {
            id: toastId,
            description: res.message,
            position: "top-right",
          });
          return;
        }
        toast.success("Jadwal berhasil disimpan", {
          id: toastId,
          position: "top-right",
        });
        form.reset();
        router.refresh();
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah / Update Jadwal Khusus</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="date">
              {(field) => (
                <TextField
                  id="schedule-date"
                  label="Tanggal"
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <div className="grid grid-cols-2 gap-3">
              <form.Field name="open_time">
                {(field) => (
                  <TextField
                    id="open-time"
                    label="Open"
                    type="time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    meta={field.state.meta}
                    disabled={isPending}
                  />
                )}
              </form.Field>
              <form.Field name="close_time">
                {(field) => (
                  <TextField
                    id="close-time"
                    label="Close"
                    type="time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    meta={field.state.meta}
                    disabled={isPending}
                  />
                )}
              </form.Field>
            </div>
            <form.Field name="is_closed">
              {(field) => (
                <CheckboxField
                  id="is-closed"
                  label="Tutup full day"
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  disabled={isPending}
                />
              )}
            </form.Field>
          </FieldGroup>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Simpan Jadwal"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function DeleteFieldButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm("Hapus/disable field ini?")) return;
        const toastId = toast.loading("Menghapus field...", {
          position: "top-right",
        });
        startTransition(async () => {
          const res = await deleteField({ id });
          if (!res.ok) {
            toast.error("Gagal menghapus field", {
              id: toastId,
              description: res.message,
              position: "top-right",
            });
            return;
          }
          toast.success("Field berhasil dihapus", {
            id: toastId,
            position: "top-right",
          });
          router.push("/fields");
          router.refresh();
        });
      }}
    >
      {isPending ? "Deleting..." : "Delete / Disable Field"}
    </Button>
  );
}

export function EditFieldSheet({ field }: { field: AdminFieldRow }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      id: field.id,
      name: field.name,
      type: "futsal" as const,
      price_per_hour: field.price_per_hour,
      description: field.description ?? "",
      is_available: field.is_available,
    },
    validators: {
      onSubmit: UpdateFieldSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Update field...", {
        position: "top-right",
      });
      startTransition(async () => {
        const res = await updateField(value);
        if (!res.ok) {
          toast.error("Gagal update field", {
            id: toastId,
            description: res.message,
            position: "top-right",
          });
          return;
        }
        toast.success("Field berhasil diupdate", {
          id: toastId,
          position: "top-right",
        });
        setOpen(false);
        router.refresh();
      });
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Edit Field</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Field</SheetTitle>
          <SheetDescription>
            Ubah data lapangan di panel samping supaya halaman detail tetap
            clean.
          </SheetDescription>
        </SheetHeader>
        <form
          id={`edit-field-${field.id}`}
          className="grid gap-4 px-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(item) => (
                <TextField
                  id="field-name"
                  label="Nama"
                  value={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  meta={item.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="type">
              {(item) => (
                <SelectField
                  id="field-type"
                  label="Tipe"
                  value={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={(value) => item.handleChange(value as "futsal")}
                  meta={item.state.meta}
                  disabled={isPending}
                >
                  <option value="futsal">Futsal</option>
                </SelectField>
              )}
            </form.Field>
            <form.Field name="price_per_hour">
              {(item) => (
                <NumberField
                  id="field-price"
                  label="Harga per jam"
                  value={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  meta={item.state.meta}
                  min={1}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="description">
              {(item) => (
                <TextareaField
                  id="field-description"
                  label="Deskripsi"
                  value={item.state.value ?? ""}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  meta={item.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="is_available">
              {(item) => (
                <CheckboxField
                  id="field-available"
                  label="Available"
                  checked={item.state.value}
                  onBlur={item.handleBlur}
                  onChange={item.handleChange}
                  disabled={isPending}
                />
              )}
            </form.Field>
          </FieldGroup>
        </form>
        <SheetFooter>
          <Field orientation="horizontal" className="justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={`edit-field-${field.id}`}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </Field>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
