import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  action?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actionHref,
  actionLabel,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action ??
        (actionHref && actionLabel && (
          <Button asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ))}
    </div>
  );
}
