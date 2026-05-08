import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieString = await cookies();

  const token = cookieString.get("admin_token")?.value;

  if (!token) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
}
