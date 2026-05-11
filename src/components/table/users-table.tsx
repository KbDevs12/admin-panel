"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import type { AdminUserRow } from "@/types/admin";

const col = createColumnHelper<AdminUserRow>();

const columns = [
  col.accessor("name", {
    header: "Nama",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  col.accessor("email", { header: "Email" }),
  col.accessor("phone", {
    header: "Phone",
    cell: (info) => info.getValue() || "-",
  }),
  col.accessor("email_verified", {
    header: "Verified",
    cell: (info) => (
      <StatusBadge tone={info.getValue() ? "success" : "warning"}>
        {info.getValue() ? "Verified" : "Belum"}
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
          <Link href={`/users/${info.row.original.id}`}>
            <Eye className="size-3" /> Detail
          </Link>
        </Button>
      </div>
    ),
  }),
] as ColumnDef<AdminUserRow, unknown>[];

export function UsersTable({ data }: { data: AdminUserRow[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchColumns="name"
      searchPlaceholder="Cari user..."
      paginated
      pageSize={10}
      emptyTitle="Belum ada user"
      emptyDescription="Member yang terdaftar akan tampil di sini."
    />
  );
}
