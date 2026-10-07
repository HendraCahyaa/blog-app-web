import { z } from "zod";
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { error: "Passowrd must be at least 6 character" })
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/^[A-Za-z0-9]/, {
        message: "Must containt at least code one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirm paswword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
