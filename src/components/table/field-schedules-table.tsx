"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { deleteSchedule } from "@/actions/admin/fields";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import type { AdminScheduleRow } from "@/types/admin";

const col = createColumnHelper<AdminScheduleRow>();

function shortTime(value: string) {
  return value.slice(0, 5);
}

function DeleteScheduleButton({ schedule }: { schedule: AdminScheduleRow }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={isPending}
      onClick={() => {
        if (
          !window.confirm(
            `Hapus jadwal khusus tanggal ${schedule.date}? Field akan kembali ke jam default.`,
          )
        ) {
          return;
        }

        const toastId = toast.loading("Menghapus jadwal...", {
          position: "top-right",
        });

        startTransition(async () => {
          const res = await deleteSchedule({
            field_id: schedule.field_id,
            date: schedule.date,
          });

          if (!res.ok) {
            toast.error("Gagal hapus jadwal", {
              id: toastId,
              description: res.message,
              position: "top-right",
            });
            return;
          }

          toast.success("Jadwal berhasil dihapus", {
            id: toastId,
            position: "top-right",
          });
          router.refresh();
        });
      }}
    >
      <Trash2 className="size-3" />
      {isPending ? "Deleting..." : "Hapus"}
    </Button>
  );
}

const columns = [
  col.accessor("date", { header: "Tanggal" }),
  col.accessor("open_time", {
    header: "Jam",
    cell: (info) => {
      const schedule = info.row.original;
      if (schedule.is_closed) return "Full day closed";
      return `${shortTime(info.getValue())}-${shortTime(schedule.close_time)}`;
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
  col.display({
    id: "actions",
    header: "Action",
    enableSorting: false,
    cell: (info) => (
      <div className="text-right">
        <DeleteScheduleButton schedule={info.row.original} />
      </div>
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
      emptyDescription="Jadwal override yang dibuat admin akan muncul di sini. Tanpa override, field memakai default 08:00-23:00."
    />
  );
}
