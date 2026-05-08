"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

export async function LoginAdmin(payload: LoginPayload) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/admin-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed. Please check your credentials.",
    );
  }

  const token = data?.data?.token;

  if (!token) {
    throw new Error("Token not found");
  }

  const cookieStore = cookies();
  (await cookieStore).set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}
