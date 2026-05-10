import { CalendarCheck, CircleDollarSign, Clock, LucideIcon, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { getDashboardData } from "@/actions/dashboard/dashboard";
import { FormatRupiah } from "@/lib/utility/format-rupiah";

interface StatCardProps {
    label: string;
    value: string | number;
    sub: string;
    icon: LucideIcon;
    highlight?: boolean;
}

export default async function DashboardStat() {
    const res = await getDashboardData();

    if (!res.ok) {
        return (
            <p className="text-sm text-destructive">
                Gagal memuat data dashboard. Silakan coba lagi nanti.
            </p>
        )
    }

    const d = res.data;

    const stats: StatCardProps[] = [
        {
            label: "Total Booking Hari Ini",
            value: d.total_bookings,
            sub: `${d.paid_bookings} sudah dibayar`,
            icon: CalendarCheck
        },
        {
            label: "Pendapatan Hari Ini",
            value: FormatRupiah(d.revenue_today),
            sub: "dari booking terkorfirmasi",
            icon: CircleDollarSign
        },
        {
            label: "Menunggu Konfirmasi",
            value: d.pending_payment,
            sub: "booking belum dibayar",
            icon: Clock,
            highlight: d.pending_payment > 0
        },
        {
            label: "Total Member",
            value: d.total_users,
            sub: "semua member terdaftar",
            icon: Users
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <Card key={stat.label}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xs text-muted-foreground font-normal">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className={`size-4 ${stat.highlight ? "text-destructive" : "text-muted-foreground"}`}/>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <p className={`text-2xl font-semibold tabular-nums ${stat.highlight ? "text-destructive" : "text-foreground"}`}>
                            {stat.value}
                        </p>
                        <CardDescription>
                            {stat.sub}
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}