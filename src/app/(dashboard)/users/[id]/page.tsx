import { getUserDetail } from "@/actions/admin/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import { DeleteUserButton, EditUserSheet } from "@/components/forms/admin/UserForms";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getUserDetail(id);

  if (!res.ok) return <p className="text-sm text-destructive">{res.message}</p>;

  const user = res.data;

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Detail User"
        description={user.email}
        action={<EditUserSheet user={user} />}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <div className="text-muted-foreground">Total Booking</div>
            <div className="text-2xl font-semibold">{user.total_bookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-muted-foreground">Total Spent</div>
            <div className="text-2xl font-semibold">
              {FormatRupiah(user.total_spent)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-muted-foreground">Email Status</div>
            <div className="mt-2">
              <StatusBadge tone={user.email_verified ? "success" : "warning"}>
                {user.email_verified ? "Verified" : "Unverified"}
              </StatusBadge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm md:grid-cols-2">
          <div>
            <div className="text-muted-foreground">Nama</div>
            <div className="font-medium">{user.name}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Phone</div>
            <div className="font-medium">{user.phone || "-"}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Firebase UID</div>
            <div className="break-all font-mono text-xs">{user.firebase_uid}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Last Activity</div>
            <div className="font-medium">
              {user.last_activity_at
                ? new Date(user.last_activity_at).toLocaleString("id-ID")
                : "-"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <DeleteUserButton id={user.id} />
          <p className="mt-2 text-xs text-muted-foreground">
            User dengan riwayat booking tidak bisa dihapus oleh backend.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
