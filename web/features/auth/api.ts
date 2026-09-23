"use server";
import type { AuthUser } from "@/features/auth/authslice";
import { cookies } from "next/headers";

const url = process.env.backendurl;
if (!url) throw new Error("Backend URL is not configured");

export default async function login(email: string, password: string) {
  // Implementation for login API call
  const response = await fetch(`${url}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.status.toString().startsWith("2")) {
    throw new Error("Login failed");
  }

  const cookieStore = await cookies();

  const setCookies = response.headers.getSetCookie();

  for (const cookie of setCookies) {
    const [nameValue] = cookie.split(";");
    const [name, ...valueParts] = nameValue.split("=");

    cookieStore.set(name, valueParts.join("="), {
      httpOnly: name === "access" || name === "refresh",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return await response.json();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const access = (await cookies()).get("access")?.value;
  if (!access) return null;

  const response = await fetch(`${url}/users/me/`, {
    headers: { Authorization: `Bearer ${access}` },
    cache: "no-store",
  });

  if (!response.status.toString().startsWith("2")) return null;
  return response.json();
}

export async function logoutApi(refresh: string) {
  const response = await fetch(`${url}/users/logout/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
    cache: "no-store",
  });

  return response;
}

export async function RequestPasswordReset(email: string) {
  console.log("RequestPasswordReset called with email:", email);
  const response = await fetch(`${url}/users/request-password-reset/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  console.log("RequestPasswordReset response:", await response.clone().json()); 

  if (!response.status.toString().startsWith("2")) {
    throw new Error("Request password reset failed");
  }

  return await response.json();
}

export async function verifyResetOtp(email: string, otp: string) {
  const response = await fetch(`${url}/users/verify-reset-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  console.log("verifyResetOtp response:", await response.clone().json());
  if (!response.status.toString().startsWith("2")) {
    throw new Error("Verify reset OTP failed");
  }

  return await response.json();
}



export async function setNewPassword(
  email: string,
  newPassword: string
) {
  const response = await fetch(`${url}/users/set-new-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, new_password: newPassword }),
  });

  if (!response.status.toString().startsWith("2")) {
    throw new Error("Set new password failed");
  }

  return await response.json();
}