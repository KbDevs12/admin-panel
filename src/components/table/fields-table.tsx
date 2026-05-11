"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import type { AdminFieldRow } from "@/types/admin";

const col = createColumnHelper<AdminFieldRow>();

const columns = [
  col.accessor("name", {
    header: "Nama",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  col.accessor("type", { header: "Tipe" }),
  col.accessor("price_per_hour", {
    header: "Harga/Jam",
    cell: (info) => <div className="text-right tabular-nums">{FormatRupiah(info.getValue())}</div>,
  }),
  col.accessor("is_available", {
    header: "Status",
    cell: (info) => (
      <StatusBadge tone={info.getValue() ? "success" : "danger"}>
        {info.getValue() ? "Available" : "Inactive"}
      </StatusBadge>
    ),
  }),
  col.display({
    id: "actions",
    header: "Action",
    enableSorting: false,
    cell: (info) => (
      <div className="text-right">
        <Button asChild size="sm" variant="outline">
          <Link href={`/fields/${info.row.original.id}`}>
            <Eye className="size-3" /> Detail
          </Link>
        </Button>
      </div>
    ),
  }),
] as ColumnDef<AdminFieldRow, unknown>[];

export function FieldsTable({ data }: { data: AdminFieldRow[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchColumns="name"
      searchPlaceholder="Cari lapangan..."
      paginated
      pageSize={10}
      emptyTitle="Belum ada field"
      emptyDescription="Lapangan yang dibuat admin akan tampil di sini."
    />
  );
}
