import { Suspense } from "react";
import { DashboardStat } from "@/components/layouts/dashboard-stat";
import { RevenueChart } from "@/components/layouts/revenue-chart";
import { DashboardPendingTable } from "@/components/layouts/dashboard-pending-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-6 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            ))}
          </div>
        }
      >
        <DashboardStat />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}>
        <RevenueChart />
      </Suspense>

      <Suspense
        fallback={
          <div className="rounded-xl border p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        }
      >
        <DashboardPendingTable />
      </Suspense>
    </div>
  );
}
