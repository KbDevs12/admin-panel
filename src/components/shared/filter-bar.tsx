import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  statusOptions?: { value: string; label: string }[];
  defaultStatus?: string;
  defaultDate?: string;
  defaultQ?: string;
  showSearch?: boolean;
}

export function FilterBar({
  statusOptions = [],
  defaultStatus = "",
  defaultDate = "",
  defaultQ = "",
  showSearch = false,
}: FilterBarProps) {
  return (
    <form className="flex flex-wrap items-end gap-2">
      {showSearch && (
        <label className="grid gap-1 text-xs text-muted-foreground">
          Cari
          <Input
            name="q"
            defaultValue={defaultQ}
            placeholder="Nama, email, lapangan"
          />
        </label>
      )}

      {statusOptions.length > 0 && (
        <label className="grid gap-1 text-xs text-muted-foreground">
          Status
          <select
            name="status"
            defaultValue={defaultStatus}
            className="h-8 rounded-none border border-input bg-background px-2 text-xs"
          >
            <option value="">Semua</option>
            {statusOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="grid gap-1 text-xs text-muted-foreground">
        Tanggal
        <Input name="date" type="date" defaultValue={defaultDate} />
      </label>

      <Button type="submit" variant="outline">
        Filter
      </Button>
    </form>
  );
}
