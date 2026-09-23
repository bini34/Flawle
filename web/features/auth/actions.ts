"use server";
import login, {
  logoutApi,
  RequestPasswordReset,
  setNewPassword,
  verifyResetOtp,
} from "./api";
import { authSchema, emailSchema, newPasswordSchema } from "./schemas";
import { logout, type AuthUser } from "./authslice";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface AuthActionState {
  success: boolean;
  errors: { email?: string[]; password?: string[] };
  user: AuthUser | null;
}

interface RequestPasswordResetState {
  success: boolean;
  errors: { email?: string[] };
}

export async function authenticateAction(
  previousState: unknown,
  formData: FormData
): Promise<AuthActionState> {
  const validation = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      user: null,
    };
  }

  try {
    await login(validation.data.email, validation.data.password);
  } catch {
    return {
      success: false,
      errors: { email: ["Invalid email or password"] },
      user: null,
    };
  }
  return { success: true, errors: {}, user: null };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh")?.value;
  logout();
  if (refresh) {
    const response = await logoutApi(refresh);
    // if (!response.ok && response.status !== 400) {
    //   throw new Error("Could not revoke the refresh token");
    // }
  }

  cookieStore.delete("access");
  cookieStore.delete("refresh");
  cookieStore.delete("csrf");

  redirect("/login");
}

export async function RequestPasswordResetAction(
  previousState: unknown,
  formData: FormData
): Promise<RequestPasswordResetState> {
  const validation = emailSchema.safeParse(formData.get("email"));
  const cookieStore = await cookies();

  if (!validation.success) {
    return {
      success: false,
      errors: { email: validation.error.issues.map((issue) => issue.message) },
    };
  }
  console.log("RequestPasswordResetAction called with email:", validation.data);
  try {
    await RequestPasswordReset(validation.data);
  } catch {
    return {
      success: false,
      errors: { email: ["Failed to send reset email"] },
    };
  }
  cookieStore.set("reset_email", validation.data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  redirect("/forgot-password?step=otp");
}

export async function verifyResetOtpAction(
  previousState: unknown,
  formData: FormData
): Promise<{ success: boolean; errors: { otp?: string[] } }> {
  const otp = Array.from({ length: 6 }, (_, index) =>
    formData.get(`otp${index}`)
  ).join("");
  const cookieStore = await cookies();
  const email = cookieStore.get("reset_email")?.value; // Use the stored email from the previous step

  if (!email) {
    return {
      success: false,
      errors: {
        otp: ["Your reset session has expired. Request a new reset code."],
      },
    };
  }
  if (!/^\d{6}$/.test(otp)) {
    return {
      success: false,
      errors: {
        otp: ["Enter a valid 6-digit verification code."],
      },
    };
  }

  try {
    await verifyResetOtp(email, otp.toString());
  } catch {
    return {
      success: false,
      errors: { otp: ["Invalid verification code"] },
    };
  }

  redirect("/forgot-password?step=password");
}

export async function setNewPasswordAction(
  previousState: unknown,
  formData: FormData
): Promise<{
  success: boolean;
  errors: { newPassword?: string[]; confirmPassword?: string[] };
}> {
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const cookieStore = await cookies();
  const email = cookieStore.get("reset_email")?.value;

  const validation = newPasswordSchema.safeParse({
    newPassword,
    confirmPassword,
  });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }
  if (!email) {
    return {
      success: false,
      errors: {
        newPassword: [
          "Your reset session has expired. Request a new reset code.",
        ],
      },
    };
  }
  try {
    await setNewPassword(email, newPassword);
  } catch {
    return {
      success: false,
      errors: { newPassword: ["Failed to set new password"] },
    };
  }
  cookieStore.delete("reset_email");
  return { success: true, errors: {} };
}
