import { z } from "zod";

export const AdminRoleSchema = z.enum(["admin", "superadmin"]);

export const CreateAdminSchema = z.object({
  username: z.string().trim().min(3, "Username minimal 3 karakter"),
  email: z
    .email("Email tidak valid")
    .transform((value) => value.trim().toLowerCase()),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: AdminRoleSchema,
});

export const UpdateAdminSchema = z.object({
  id: z.string().min(1, "Admin ID tidak valid"),
  username: z.string().trim().min(3, "Username minimal 3 karakter"),
  email: z
    .email("Email tidak valid")
    .transform((value) => value.trim().toLowerCase()),
  password: z.string(),
  role: AdminRoleSchema,
  disabled: z.boolean(),
});

export const DeleteAdminSchema = z.object({
  id: z.string().min(1, "Admin ID tidak valid"),
});

export const CreateBookingSchema = z
  .object({
    user_id: z.string().trim().min(1, "User wajib diisi"),
    field_id: z.string().trim().min(1, "Lapangan wajib diisi"),
    date: z.string().trim().min(1, "Tanggal wajib diisi"),
    start_time: z.string().trim().min(1, "Jam mulai wajib diisi"),
    end_time: z.string().trim().min(1, "Jam selesai wajib diisi"),
    mark_paid: z.boolean(),
  })
  .refine((value) => value.end_time > value.start_time, {
    message: "Jam selesai harus lebih besar dari jam mulai",
    path: ["end_time"],
  });

export const BookingStatusSchema = z.enum([
  "pending_payment",
  "paid",
  "confirmed",
  "cancelled",
  "completed",
]);

export const UpdateBookingStatusSchema = z.object({
  booking_id: z.string().min(1, "Booking ID tidak valid"),
  status: BookingStatusSchema,
});

export const FieldTypeSchema = z.enum(["futsal"]);

export const CreateFieldSchema = z.object({
  name: z.string().trim().min(3, "Nama lapangan minimal 3 karakter"),
  type: FieldTypeSchema,
  price_per_hour: z.number().min(1, "Harga wajib lebih dari 0"),
  description: z.string().trim(),
});

export const UpdateFieldSchema = CreateFieldSchema.extend({
  id: z.string().min(1, "Field ID tidak valid"),
  is_available: z.boolean(),
});

export const FieldScheduleSchema = z
  .object({
    field_id: z.string().min(1, "Field ID tidak valid"),
    date: z.string().trim().min(1, "Tanggal wajib diisi"),
    open_time: z.string().trim().min(1, "Jam buka wajib diisi"),
    close_time: z.string().trim().min(1, "Jam tutup wajib diisi"),
    is_closed: z.boolean(),
  })
  .refine((value) => value.is_closed || value.close_time > value.open_time, {
    message: "Jam tutup harus lebih besar dari jam buka",
    path: ["close_time"],
  });

export const UpdateUserSchema = z.object({
  id: z.string().min(1, "User ID tidak valid"),
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  phone: z.string().trim(),
  email_verified: z.boolean(),
});

export type CreateAdminInput = z.infer<typeof CreateAdminSchema>;
export type UpdateAdminInput = z.infer<typeof UpdateAdminSchema>;
export type DeleteAdminInput = z.infer<typeof DeleteAdminSchema>;
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export type UpdateBookingStatusInput = z.infer<
  typeof UpdateBookingStatusSchema
>;
export type CreateFieldInput = z.infer<typeof CreateFieldSchema>;
export type UpdateFieldInput = z.infer<typeof UpdateFieldSchema>;
export type FieldScheduleInput = z.infer<typeof FieldScheduleSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
