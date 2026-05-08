import { cookies } from "next/headers";

import type { Session } from "@/types/auth";

const COOKIE_TOKEN = "admin_access_token";
const COOKIE_USER = "admin_user";

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_TOKEN)?.value ?? null;
  const raw = cookieStore.get(COOKIE_USER)?.value;

  let user: Session["user"] = null;
  if (raw) {
    try {
      user = JSON.parse(raw);
    } catch {
      user = null;
    }
  }

  return {
    token,
    isAuthenticated: !!token,
    user,
  };
}

export async function setSession(
  token: string,
  user: NonNullable<Session["user"]>,
  expiresInSeconds: number,
): Promise<void> {
  const cookieStore = await cookies();
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: expiresInSeconds,
    path: "/",
  };

  cookieStore.set(COOKIE_TOKEN, token, opts);
  cookieStore.set(COOKIE_USER, JSON.stringify(user), opts);
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_TOKEN);
  cookieStore.delete(COOKIE_USER);
}
