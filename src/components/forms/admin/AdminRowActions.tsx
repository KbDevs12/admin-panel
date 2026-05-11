"use client";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { deleteAdmin, updateAdmin } from "@/actions/admin/admins";
import { Button } from "@/components/ui/button";
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
import { AdminAccountRow } from "@/types/admin";
import { UpdateAdminSchema } from "@/lib/validations/admin.schema";
import { CheckboxField, SelectField, TextField } from "./form-utils";

export function AdminActionsCell({ admin }: { admin: AdminAccountRow }) {
  return (
    <div className="flex justify-end gap-2">
      <EditAdminSheet admin={admin} />
      <DeleteAdminButton id={admin.id} username={admin.username} />
    </div>
  );
}

export function EditAdminSheet({ admin }: { admin: AdminAccountRow }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      password: "",
      role: admin.role,
      disabled: false,
    },
    validators: {
      onSubmit: UpdateAdminSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Menyimpan admin...", {
        position: "top-right",
      });

      startTransition(async () => {
        try {
          const res = await updateAdmin(value);
          if (!res.ok) {
            toast.error("Gagal update admin", {
              id: toastId,
              description: res.message,
              position: "top-right",
            });
            return;
          }

          toast.success("Admin berhasil diupdate", {
            id: toastId,
            position: "top-right",
          });
          setOpen(false);
          router.refresh();
        } catch (error) {
          if (isRedirectError(error)) throw error;
          toast.error("Gagal update admin", {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="size-4" />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Admin</SheetTitle>
          <SheetDescription>
            Ubah akun admin tanpa bikin table terlalu ramai. Perubahan Firebase
            tetap lewat backend.
          </SheetDescription>
        </SheetHeader>

        <form
          id={`edit-admin-${admin.id}`}
          className="grid gap-4 px-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="username">
              {(field) => (
                <TextField
                  id={`${admin.id}-username`}
                  label="Username"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <TextField
                  id={`${admin.id}-email`}
                  label="Email"
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <TextField
                  id={`${admin.id}-password`}
                  label="Password baru"
                  type="password"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  placeholder="Kosongkan kalau tidak diganti"
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="role">
              {(field) => (
                <SelectField
                  id={`${admin.id}-role`}
                  label="Role"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(value) =>
                    field.handleChange(value as "admin" | "superadmin")
                  }
                  meta={field.state.meta}
                  disabled={isPending}
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </SelectField>
              )}
            </form.Field>
            <form.Field name="disabled">
              {(field) => (
                <CheckboxField
                  id={`${admin.id}-disabled`}
                  label="Disable Firebase user"
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
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
              form={`edit-admin-${admin.id}`}
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

export function DeleteAdminButton({
  id,
  username,
}: {
  id: string;
  username?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      size="sm"
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        const confirmed = window.confirm(
          `Hapus admin ${username ?? "ini"}? Aksi ini juga menghapus user Firebase Auth-nya.`,
        );
        if (!confirmed) return;

        const toastId = toast.loading("Menghapus admin...", {
          position: "top-right",
        });
        startTransition(async () => {
          const res = await deleteAdmin({ id });
          if (!res.ok) {
            toast.error("Gagal menghapus admin", {
              id: toastId,
              description: res.message,
              position: "top-right",
            });
            return;
          }
          toast.success("Admin berhasil dihapus", {
            id: toastId,
            position: "top-right",
          });
          router.refresh();
        });
      }}
    >
      {isPending ? (
        "Deleting..."
      ) : (
        <>
          <Trash2 className="size-4" />
          Delete
        </>
      )}
    </Button>
  );
}

export function AdminMoreActionButton() {
  return (
    <Button variant="ghost" size="icon-sm" aria-label="Admin actions">
      <MoreHorizontal className="size-4" />
    </Button>
  );
}
