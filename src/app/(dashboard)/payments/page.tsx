import { getPayments } from "@/actions/admin/payments";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentsTable } from "@/components/table/payments-table";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; date?: string; q?: string }>;
}) {
  const params = await searchParams;
  const res = await getPayments(params);

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Monitoring dan konfirmasi pembayaran." />
      <FilterBar
        showSearch
        defaultQ={params.q}
        defaultStatus={params.status}
        defaultDate={params.date}
        statusOptions={[
          { value: "pending", label: "Pending" },
          { value: "paid", label: "Paid" },
          { value: "confirmed", label: "Confirmed" },
          { value: "rejected", label: "Rejected" },
        ]}
      />

      {!res.ok ? (
        <p className="text-sm text-destructive">{res.message}</p>
      ) : (
        <Card>
          <CardContent>
            <PaymentsTable data={res.data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
