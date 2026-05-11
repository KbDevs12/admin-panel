import { getRangeReport } from "@/actions/admin/reports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import { RevenueBarChart } from "@/components/ui/revenue-bar-chart";

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ from?: string; to?: string }> }) {
  const params = await searchParams;
  const res = await getRangeReport(params);
  return <div className="space-y-6"><PageHeader title="Reports" description="Ringkasan pendapatan dan booking per range tanggal." /><form className="flex flex-wrap items-end gap-2"><label className="grid gap-1 text-xs text-muted-foreground">From<Input name="from" type="date" defaultValue={params.from} /></label><label className="grid gap-1 text-xs text-muted-foreground">To<Input name="to" type="date" defaultValue={params.to} /></label><Button type="submit" variant="outline">Apply</Button></form>{!res.ok ? <p className="text-sm text-destructive">{res.message}</p> : <><div className="grid gap-4 md:grid-cols-4"><Stat label="Total Booking" value={res.data.total_bookings} /><Stat label="Paid" value={res.data.paid_bookings} /><Stat label="Pending" value={res.data.pending_bookings} /><Stat label="Revenue" value={FormatRupiah(res.data.total_revenue)} /></div><Card><CardHeader><CardTitle>Revenue Chart</CardTitle></CardHeader><CardContent><RevenueBarChart data={res.data.revenue_chart} /></CardContent></Card></>}</div>;
}
function Stat({ label, value }: { label: string; value: string | number }) { return <Card><CardContent><div className="text-muted-foreground">{label}</div><div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div></CardContent></Card>; }
