import type React from "react";
import { confirmPayment, getPaymentDetail, rejectPayment } from "@/actions/admin/payments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge, toneFromStatus } from "@/components/shared/status-badge";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import { paymentStatusLabel } from "@/lib/utility/status";

export default async function PaymentDetailPage({ params, searchParams }: { params: Promise<{ bookingId: string }>; searchParams: Promise<{ error?: string }> }) {
  const [{ bookingId }, sp] = await Promise.all([params, searchParams]);
  const res = await getPaymentDetail(bookingId);
  if (!res.ok) return <p className="text-sm text-destructive">{res.message}</p>;
  const p = res.data;

  return <div className="space-y-6 max-w-3xl"><PageHeader title="Detail Payment" description={p.booking_id} />{sp.error && <p className="text-sm text-destructive">{sp.error}</p>}
    <Card><CardHeader><CardTitle>Payment</CardTitle></CardHeader><CardContent className="space-y-3">
      <Row label="Customer" value={`${p.customer_name} · ${p.customer_email}`} /><Row label="Lapangan" value={p.field_name} /><Row label="Jadwal" value={`${p.date} · ${p.start_time.slice(0,5)}-${p.end_time.slice(0,5)}`} /><Row label="Amount" value={FormatRupiah(p.amount)} />
      <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><StatusBadge tone={toneFromStatus(p.payment_status)}>{paymentStatusLabel(p.payment_status)}</StatusBadge></div>
      <div className="flex flex-wrap gap-2 pt-2"><form action={confirmPayment}><input type="hidden" name="booking_id" value={p.booking_id} /><Button type="submit">Confirm</Button></form><form action={rejectPayment}><input type="hidden" name="booking_id" value={p.booking_id} /><Button type="submit" variant="destructive">Reject</Button></form></div>
    </CardContent></Card>
  </div>;
}
function Row({ label, value }: { label: string; value: React.ReactNode }) { return <div className="flex items-center justify-between gap-4"><span className="text-muted-foreground">{label}</span><span className="text-right font-medium">{value}</span></div>; }
