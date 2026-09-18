import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("enter a valid email address"),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

export const emailSchema = z.string().email("enter a valid email address");
export const otpSchema = z.string().length(6, "OTP must be 6 digits long");

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
