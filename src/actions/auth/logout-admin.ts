"use server";

import { redirect } from "next/navigation";

import { clearSession } from "@/lib/auth/session";

export async function logoutAdmin() {
  await clearSession();
  redirect("/login");
}
