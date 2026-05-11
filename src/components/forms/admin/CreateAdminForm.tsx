"use client";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { createAdmin } from "@/actions/admin/admins";
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
import { CreateAdminSchema } from "@/lib/validations/admin.schema";
import { SelectField, TextField } from "./form-utils";

export function CreateAdminForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "admin" as "admin" | "superadmin",
    },
    validators: {
      onSubmit: CreateAdminSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Membuat admin...", {
        position: "top-right",
      });

      startTransition(async () => {
        try {
          const res = await createAdmin(value);

          if (!res.ok) {
            toast.error("Gagal membuat admin", {
              id: toastId,
              description: res.message,
              position: "top-right",
            });
            return;
          }

          toast.success("Admin berhasil dibuat", {
            id: toastId,
            position: "top-right",
          });
          router.push("/admins");
          router.refresh();
        } catch (error) {
          if (isRedirectError(error)) throw error;
          toast.error("Gagal membuat admin", {
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
        <CardTitle>Admin Baru</CardTitle>
        <CardDescription>
          Backend akan membuat user Firebase Auth lalu menyimpan UID-nya ke
          tabel admins.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="create-admin-form"
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
                  id={field.name}
                  label="Username"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  placeholder="admin_lapangan"
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <TextField
                  id={field.name}
                  label="Email"
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  placeholder="admin@example.com"
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <TextField
                  id={field.name}
                  label="Password"
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  meta={field.state.meta}
                  placeholder="Minimal 6 karakter"
                  disabled={isPending}
                />
              )}
            </form.Field>
            <form.Field name="role">
              {(field) => (
                <SelectField
                  id={field.name}
                  label="Role"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(value: string) =>
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="create-admin-form" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Create Admin"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
