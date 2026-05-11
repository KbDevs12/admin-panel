"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { deleteUser, updateUser } from "@/actions/admin/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { UpdateUserSchema } from "@/lib/validations/admin.schema";
import type { AdminUserDetail } from "@/types/admin";
import { CheckboxField, TextField } from "./form-utils";

export function EditUserForm({ user }: { user: AdminUserDetail }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      id: user.id,
      name: user.name,
      phone: user.phone ?? "",
      email_verified: user.email_verified,
    },
    validators: {
      onSubmit: UpdateUserSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Update user...", { position: "top-right" });
      startTransition(async () => {
        const res = await updateUser(value);
        if (!res.ok) {
          toast.error("Gagal update user", { id: toastId, description: res.message, position: "top-right" });
          return;
        }
        toast.success("User berhasil diupdate", { id: toastId, position: "top-right" });
        router.refresh();
      });
    },
  });

  return (
    <Card>
      <CardHeader><CardTitle>Edit User</CardTitle></CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); event.stopPropagation(); form.handleSubmit(); }}>
          <FieldGroup>
            <form.Field name="name">{(field) => <TextField id="user-name" label="Nama" value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending} />}</form.Field>
            <form.Field name="phone">{(field) => <TextField id="user-phone" label="Phone" value={field.state.value ?? ""} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending} />}</form.Field>
            <form.Field name="email_verified">{(field) => <CheckboxField id="email-verified" label="Email verified" checked={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} disabled={isPending} />}</form.Field>
          </FieldGroup>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Update User"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function DeleteUserButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return <Button variant="destructive" type="button" disabled={isPending} onClick={() => {
    if (!window.confirm("Hapus user ini? User dengan riwayat booking akan ditolak backend.")) return;
    const toastId = toast.loading("Menghapus user...", { position: "top-right" });
    startTransition(async () => {
      const res = await deleteUser({ id });
      if (!res.ok) {
        toast.error("Gagal menghapus user", { id: toastId, description: res.message, position: "top-right" });
        return;
      }
      toast.success("User berhasil dihapus", { id: toastId, position: "top-right" });
      router.push("/users");
      router.refresh();
    });
  }}>{isPending ? "Deleting..." : "Delete User"}</Button>;
}

export function EditUserSheet({ user }: { user: AdminUserDetail }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      id: user.id,
      name: user.name,
      phone: user.phone ?? "",
      email_verified: user.email_verified,
    },
    validators: {
      onSubmit: UpdateUserSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Update user...", { position: "top-right" });
      startTransition(async () => {
        const res = await updateUser(value);
        if (!res.ok) {
          toast.error("Gagal update user", { id: toastId, description: res.message, position: "top-right" });
          return;
        }
        toast.success("User berhasil diupdate", { id: toastId, position: "top-right" });
        setOpen(false);
        router.refresh();
      });
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Edit User</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            Update data user dari panel samping supaya halaman detail tetap rapi.
          </SheetDescription>
        </SheetHeader>
        <form
          id={`edit-user-${user.id}`}
          className="grid gap-4 px-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => <TextField id="user-name" label="Nama" value={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending} />}
            </form.Field>
            <form.Field name="phone">
              {(field) => <TextField id="user-phone" label="Phone" value={field.state.value ?? ""} onBlur={field.handleBlur} onChange={field.handleChange} meta={field.state.meta} disabled={isPending} />}
            </form.Field>
            <form.Field name="email_verified">
              {(field) => <CheckboxField id="email-verified" label="Email verified" checked={field.state.value} onBlur={field.handleBlur} onChange={field.handleChange} disabled={isPending} />}
            </form.Field>
          </FieldGroup>
        </form>
        <SheetFooter>
          <Field orientation="horizontal" className="justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>Cancel</Button>
            <Button type="submit" form={`edit-user-${user.id}`} disabled={isPending}>{isPending ? "Saving..." : "Save changes"}</Button>
          </Field>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
