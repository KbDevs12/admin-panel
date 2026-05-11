import type React from "react";
import Link from "next/link";
import { getBookingDetail } from "@/actions/admin/bookings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge, toneFromStatus } from "@/components/shared/status-badge";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import { bookingStatusLabel, paymentStatusLabel } from "@/lib/utility/status";
import { BookingStatusForm } from "@/components/forms/admin/BookingStatusForm";

export default async function BookingDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const res = await getBookingDetail(id);

  if (!res.ok) return <p className="text-sm text-destructive">{res.message}</p>;
  const b = res.data;

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Detail Booking" description={b.id} />
      {sp.error && <p className="text-sm text-destructive">{sp.error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Booking</CardTitle></CardHeader><CardContent className="space-y-3">
          <Row label="Customer" value={`${b.customer_name} · ${b.customer_email}`} />
          <Row label="Lapangan" value={b.field_name} />
          <Row label="Jadwal" value={`${b.date} · ${b.start_time.slice(0,5)}-${b.end_time.slice(0,5)}`} />
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><StatusBadge tone={toneFromStatus(b.booking_status)}>{bookingStatusLabel(b.booking_status)}</StatusBadge></div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Payment</CardTitle></CardHeader><CardContent className="space-y-3">
          <Row label="Amount" value={FormatRupiah(b.amount)} />
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><StatusBadge tone={toneFromStatus(b.payment_status)}>{paymentStatusLabel(b.payment_status)}</StatusBadge></div>
          <Button asChild variant="outline" size="sm"><Link href={`/payments/${b.id}`}>Buka Payment</Link></Button>
        </CardContent></Card>
      </div>

      <Card><CardHeader><CardTitle>Update Status Booking</CardTitle></CardHeader><CardContent>
        <BookingStatusForm bookingId={b.id} status={b.booking_status} />
      </CardContent></Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-4"><span className="text-muted-foreground">{label}</span><span className="text-right font-medium">{value}</span></div>;
}
