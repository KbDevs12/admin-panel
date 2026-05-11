"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import type { AdminScheduleRow } from "@/types/admin";

const col = createColumnHelper<AdminScheduleRow>();

const columns = [
  col.accessor("date", { header: "Tanggal" }),
  col.accessor("open_time", {
    header: "Jam",
    cell: (info) => {
      const schedule = info.row.original;
      return `${info.getValue().slice(0, 5)}-${schedule.close_time.slice(0, 5)}`;
    },
  }),
  col.accessor("is_closed", {
    header: "Status",
    cell: (info) => (
      <StatusBadge tone={info.getValue() ? "danger" : "success"}>
        {info.getValue() ? "Tutup" : "Buka"}
      </StatusBadge>
    ),
  }),
] as ColumnDef<AdminScheduleRow, unknown>[];

export function FieldSchedulesTable({ data }: { data: AdminScheduleRow[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchColumns="date"
      searchPlaceholder="Cari tanggal..."
      emptyTitle="Belum ada jadwal khusus"
      emptyDescription="Jadwal override yang dibuat admin akan muncul di sini."
    />
  );
}
