import { z } from "zod";
export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { error: "Passowrd must be at least 6 character" })
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        "Input hanya boleh berisi huruf dan angka tanpa spasi atau simbol",
    }),
});
export type LoginSchema = z.infer<typeof loginSchema>;
