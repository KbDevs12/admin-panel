import { getAdmins } from "@/actions/admin/admins";
import { getSession } from "@/lib/auth/session";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { AdminsTable } from "@/components/table/admin-table";

export default async function AdminsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [session, sp] = await Promise.all([getSession(), searchParams]);

  if (session.user?.role !== "superadmin") {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Admin Accounts"
          description="Hanya superadmin yang bisa mengelola akun admin."
        />
        <Card>
          <CardContent className="text-sm text-muted-foreground">
            Akun lu tidak punya akses ke halaman ini.
          </CardContent>
        </Card>
      </div>
    );
  }

  const res = await getAdmins();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Accounts"
        description="Kelola admin biasa dan superadmin. User Firebase dibuat lewat backend Admin SDK."
        actionHref="/admins/create"
        actionLabel="Create Admin"
      />

      {sp.error && <p className="text-sm text-destructive">{sp.error}</p>}
      {!res.ok ? (
        <p className="text-sm text-destructive">{res.message}</p>
      ) : (
        <Card>
          <CardContent>
            <AdminsTable data={res.data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
