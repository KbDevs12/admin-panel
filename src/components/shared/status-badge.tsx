import type React from "react";
import { cn } from "@/lib/utils";

export function StatusBadge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-[11px] font-medium",
        tone === "success" &&
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        tone === "warning" && "border-amber-200 bg-amber-50 text-amber-700",
        tone === "danger" && "border-red-200 bg-red-50 text-red-700",
        tone === "default" && "border-border bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function toneFromStatus(
  status: string,
): "default" | "success" | "warning" | "danger" {
  if (["confirmed", "paid", "completed"].includes(status)) return "success";
  if (["pending", "pending_payment", "awaiting_verification"].includes(status))
    return "warning";
  if (["cancelled", "rejected"].includes(status)) return "danger";
  return "default";
}
