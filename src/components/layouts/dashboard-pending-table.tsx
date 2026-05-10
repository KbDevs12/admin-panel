import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getDashboardData } from "@/actions/dashboard/dashboard";
import { PendingTable } from "../table/pending-table";

export async function DashboardPendingTable() {
  const res = await getDashboardData();

  if (!res.ok) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Menunggu Konfirmasi</CardTitle>
      </CardHeader>
      <CardContent>
        <PendingTable data={res.data.recent_pending} />
      </CardContent>
    </Card>
  );
}
