"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import type { RevenueChartPoint } from "@/types/report";
import { BarChartIcon } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

import { FormatRupiahV2 } from "@/lib/utility/format-rupiah";

const chartConfig = {
  revenue: {
    label: "Pendapatan",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function RevenueBarChart({ data }: { data: RevenueChartPoint[] }) {
  const formatted = data.map((d) => ({
    ...d,
    label: format(parseISO(d.date), "dd MMM", { locale: id }),
  }));

  if (data.length === 0) {
    return (
      <EmptyState
        icon={BarChartIcon}
        title="Tidak ada data pendapatan"
        description="Data pendapatan 7 hari terakhir akan muncul di sini setelah ada transaksi yang masuk."
      />
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-55 w-full">
      <BarChart accessibilityLayer data={formatted} barSize={32}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={FormatRupiahV2}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(value as number)
              }
            />
          }
        />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
