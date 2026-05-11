"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { AdminActionsCell } from "@/components/forms/admin/AdminRowActions";
import type { AdminAccountRow } from "@/types/admin";

const col = createColumnHelper<AdminAccountRow>();

const columns = [
  col.accessor("username", {
    header: "Admin",
    cell: (info) => {
      const admin = info.row.original;
      return (
        <div>
          <div className="font-medium">{info.getValue()}</div>
          <div className="mt-1 max-w-55 truncate text-xs text-muted-foreground">
            {admin.firebase_uid}
          </div>
        </div>
      );
    },
  }),
  col.accessor("email", {
    header: "Email",
    cell: (info) => (
      <span className="text-muted-foreground">{info.getValue()}</span>
    ),
  }),
  col.accessor("role", {
    header: "Role",
    cell: (info) => (
      <StatusBadge
        tone={info.getValue() === "superadmin" ? "success" : "default"}
      >
        {info.getValue()}
      </StatusBadge>
    ),
  }),
  col.accessor("last_login_at", {
    header: "Last Login",
    cell: (info) => {
      const value = info.getValue();
      return value ? new Date(value).toLocaleString("id-ID") : "-";
    },
  }),
  col.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    enableSorting: false,
    cell: (info) => <AdminActionsCell admin={info.row.original} />,
  }),
] as ColumnDef<AdminAccountRow, unknown>[];

export function AdminsTable({ data }: { data: AdminAccountRow[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchColumns="username"
      searchPlaceholder="Cari username admin..."
      paginated
      pageSize={10}
      emptyTitle="Belum ada admin"
      emptyDescription="Admin yang dibuat superadmin akan muncul di sini."
    />
  );
}
