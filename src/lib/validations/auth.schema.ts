import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .refine(
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      },
      {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      },
    ),
});

export type LoginInput = z.infer<typeof LoginSchema>;
