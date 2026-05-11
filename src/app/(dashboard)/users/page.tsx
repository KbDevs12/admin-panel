import { getUsers } from "@/actions/admin/users";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { UsersTable } from "@/components/table/users-table";

export default async function UsersPage() {
  const res = await getUsers();

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Daftar member terdaftar." />
      {!res.ok ? (
        <p className="text-sm text-destructive">{res.message}</p>
      ) : (
        <Card>
          <CardContent>
            <UsersTable data={res.data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
