"use client";

import Link from "next/link";
import { Eye, ImageIcon } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge, toneFromStatus } from "@/components/shared/status-badge";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import { paymentStatusLabel } from "@/lib/utility/status";
import type { AdminPaymentSummary } from "@/types/admin";

const col = createColumnHelper<AdminPaymentSummary>();

const columns = [
  col.accessor("customer_name", {
    header: "Customer",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-xs text-muted-foreground">
          {info.row.original.customer_email}
        </div>
      </div>
    ),
  }),
  col.accessor("field_name", {
    header: "Booking",
    cell: (info) => {
      const payment = info.row.original;
      return (
        <div>
          <div className="font-medium">{info.getValue()}</div>
          <div className="text-xs text-muted-foreground">
            {payment.date} · {payment.start_time.slice(0, 5)}-
            {payment.end_time.slice(0, 5)}
          </div>
        </div>
      );
    },
  }),
  col.accessor("payment_status", {
    header: "Status",
    cell: (info) => (
      <StatusBadge tone={toneFromStatus(info.getValue())}>
        {paymentStatusLabel(info.getValue())}
      </StatusBadge>
    ),
  }),
  col.display({
    id: "proof",
    header: "Bukti",
    enableSorting: false,
    cell: (info) => {
      const proofUrl = info.row.original.proof_image_url;
      if (!proofUrl) {
        return <span className="text-xs text-muted-foreground">Belum ada</span>;
      }
      return (
        <a
          href={proofUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium hover:bg-muted"
        >
          <ImageIcon className="size-3" /> Lihat
        </a>
      );
    },
  }),
  col.accessor("amount", {
    header: "Amount",
    cell: (info) => (
      <div className="text-right tabular-nums">
        {FormatRupiah(info.getValue())}
      </div>
    ),
  }),
  col.display({
    id: "actions",
    header: "Action",
    enableSorting: false,
    cell: (info) => (
      <div className="text-right">
        <Button asChild size="sm" variant="outline">
          <Link href={`/payments/${info.row.original.booking_id}`}>
            <Eye className="size-3" /> Detail
          </Link>
        </Button>
      </div>
    ),
  }),
] as ColumnDef<AdminPaymentSummary, unknown>[];

export function PaymentsTable({ data }: { data: AdminPaymentSummary[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchColumns="customer_name"
      searchPlaceholder="Cari customer..."
      paginated
      pageSize={10}
      emptyTitle="Belum ada pembayaran"
      emptyDescription="Data pembayaran akan muncul setelah booking dibuat."
    />
  );
}
