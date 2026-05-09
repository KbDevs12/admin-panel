import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border p-12 flex flex-col items-center justify-center text-center gap-3">
      {Icon && <Icon className="text-muted-foreground size-10" />}
      <p className="font-medium">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {action}
    </div>
  );
}
