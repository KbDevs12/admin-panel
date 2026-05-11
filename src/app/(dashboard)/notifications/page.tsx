import Link from "next/link";
import { getNotifications } from "@/actions/admin/notifications";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";

export default async function NotificationsPage() {
  const res = await getNotifications();
  return <div className="space-y-6"><PageHeader title="Notifications" description="Monitoring notifikasi sistem ke member." />{!res.ok ? <p className="text-sm text-destructive">{res.message}</p> : <Card><CardContent className="divide-y">{res.data.map((n) => <div key={n.id} className="py-3"><div className="flex items-start justify-between gap-4"><div><div className="font-medium">{n.customer_name}</div><p className="text-muted-foreground">{n.message}</p>{n.booking_id && <Link className="text-primary text-xs" href={`/bookings/${n.booking_id}`}>Buka booking</Link>}</div><StatusBadge tone={n.is_read ? "success" : "warning"}>{n.is_read ? "Read" : "Unread"}</StatusBadge></div><div className="mt-1 text-[11px] text-muted-foreground">{n.type} · {new Date(n.created_at).toLocaleString("id-ID")}</div></div>)}{res.data.length === 0 && <div className="py-10 text-center text-muted-foreground">Belum ada notifikasi.</div>}</CardContent></Card>}</div>;
}
