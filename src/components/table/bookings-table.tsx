"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge, toneFromStatus } from "@/components/shared/status-badge";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import { bookingStatusLabel, paymentStatusLabel } from "@/lib/utility/status";
import type { AdminBookingSummary } from "@/types/admin";

const col = createColumnHelper<AdminBookingSummary>();

const columns = [
  col.accessor("customer_name", {
    header: "Customer",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-xs text-muted-foreground">{info.row.original.customer_email}</div>
      </div>
    ),
  }),
  col.accessor("field_name", { header: "Lapangan" }),
  col.accessor("date", {
    header: "Jadwal",
    cell: (info) => {
      const booking = info.row.original;
      return `${info.getValue()} · ${booking.start_time.slice(0, 5)}-${booking.end_time.slice(0, 5)}`;
    },
  }),
  col.accessor("booking_status", {
    header: "Booking",
    cell: (info) => (
      <StatusBadge tone={toneFromStatus(info.getValue())}>
        {bookingStatusLabel(info.getValue())}
      </StatusBadge>
    ),
  }),
  col.accessor("payment_status", {
    header: "Payment",
    cell: (info) => (
      <StatusBadge tone={toneFromStatus(info.getValue())}>
        {paymentStatusLabel(info.getValue())}
      </StatusBadge>
    ),
  }),
  col.accessor("amount", {
    header: "Amount",
    cell: (info) => <div className="text-right tabular-nums">{FormatRupiah(info.getValue())}</div>,
  }),
  col.display({
    id: "actions",
    header: "Action",
    enableSorting: false,
    cell: (info) => (
      <div className="text-right">
        <Button asChild size="sm" variant="outline">
          <Link href={`/bookings/${info.row.original.id}`}>
            <Eye className="size-3" /> Detail
          </Link>
        </Button>
      </div>
    ),
  }),
] as ColumnDef<AdminBookingSummary, unknown>[];

export function BookingsTable({ data }: { data: AdminBookingSummary[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchColumns="customer_name"
      searchPlaceholder="Cari customer..."
      paginated
      pageSize={10}
      emptyTitle="Belum ada booking"
      emptyDescription="Booking yang masuk dari member atau dibuat admin akan tampil di sini."
    />
  );
}
