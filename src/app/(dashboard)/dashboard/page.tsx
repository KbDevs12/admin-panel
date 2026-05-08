import { logoutAdmin } from "@/actions/auth/logout-admin";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      <form action={logoutAdmin}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
