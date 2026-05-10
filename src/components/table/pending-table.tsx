"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

import { DataTable } from "../shared/data-table";
import type { RecentPendingBooking } from "@/types/report";

const col = createColumnHelper<RecentPendingBooking>();

const columns = [
  col.accessor("customer_name", { header: "Customer" }),
  col.accessor("field_name", { header: "Lapangan" }),
  col.accessor("date", {
    header: "Tanggal",
    cell: (info) =>
      format(parseISO(info.getValue()), "dd MMM yyyy", { locale: id }),
  }),
  col.accessor("start_time", {
    header: "Jam",
    enableSorting: false,
    cell: (info) => {
      const { start_time, end_time } = info.row.original;
      return `${start_time.slice(0, 5)} – ${end_time.slice(0, 5)}`;
    },
  }),
  col.accessor("amount", {
    header: "Total",
    cell: (info) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(info.getValue()),
  }),
  col.accessor("booked_at", {
    header: "Dipesan",
    cell: (info) =>
      format(parseISO(info.getValue()), "dd MMM, HH:mm", { locale: id }),
  }),
] as ColumnDef<RecentPendingBooking, unknown>[];

export function PendingTable({ data }: { data: RecentPendingBooking[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchColumns="customer_name"
      searchPlaceholder="Cari nama customer..."
      emptyTitle="Tidak ada booking pending"
      emptyDescription="Semua booking sudah dikonfirmasi atau belum ada yang masuk."
    />
  );
}
