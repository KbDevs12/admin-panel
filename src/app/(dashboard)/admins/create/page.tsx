import { getSession } from "@/lib/auth/session";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { CreateAdminForm } from "@/components/forms/admin/CreateAdminForm";

export default async function CreateAdminPage() {
  const session = await getSession();

  if (session.user?.role !== "superadmin") {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Create Admin"
          description="Hanya superadmin yang bisa membuat admin baru."
        />
        <Card>
          <CardContent className="text-sm text-muted-foreground">
            Akun lu tidak punya akses ke halaman ini.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Admin"
        description="Buat akun Firebase Auth dan row admins dari satu form superadmin."
      />
      <CreateAdminForm />
    </div>
  );
}
