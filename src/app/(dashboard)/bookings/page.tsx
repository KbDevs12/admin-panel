import { getBookings } from "@/actions/admin/bookings";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { Card, CardContent } from "@/components/ui/card";
import { BookingsTable } from "@/components/table/bookings-table";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; date?: string }>;
}) {
  const params = await searchParams;
  const res = await getBookings(params);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookings"
        description="Kelola semua pemesanan lapangan."
        actionHref="/bookings/create"
        actionLabel="Create Booking"
      />
      <FilterBar
        defaultStatus={params.status}
        defaultDate={params.date}
        statusOptions={[
          { value: "pending_payment", label: "Menunggu Bayar" },
          { value: "paid", label: "Sudah Dibayar" },
          { value: "confirmed", label: "Terkonfirmasi" },
          { value: "cancelled", label: "Dibatalkan" },
          { value: "completed", label: "Selesai" },
        ]}
      />

      {!res.ok ? (
        <p className="text-sm text-destructive">{res.message}</p>
      ) : (
        <Card>
          <CardContent>
            <BookingsTable data={res.data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
