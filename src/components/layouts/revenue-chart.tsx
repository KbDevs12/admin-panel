import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getDashboardData } from "@/actions/dashboard/dashboard";
import { RevenueBarChart } from "../ui/revenue-bar-chart";

export async function RevenueChart() {
  const res = await getDashboardData();

  if (!res.ok) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendapatan 7 Hari Terakhir</CardTitle>
      </CardHeader>
      <CardContent>
        <RevenueBarChart data={res.data.revenue_chart} />
      </CardContent>
    </Card>
  );
}
