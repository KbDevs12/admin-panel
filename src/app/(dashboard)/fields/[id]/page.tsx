import { getFieldDetail, getFieldSchedules } from "@/actions/admin/fields";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import {
  DeleteFieldButton,
  EditFieldSheet,
  FieldScheduleForm,
} from "@/components/forms/admin/FieldForms";
import { FieldSchedulesTable } from "@/components/table/field-schedules-table";
import { FormatRupiah } from "@/lib/utility/format-rupiah";
import { StatusBadge } from "@/components/shared/status-badge";

export default async function FieldDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [fieldRes, scheduleRes] = await Promise.all([
    getFieldDetail(id),
    getFieldSchedules(id),
  ]);

  if (!fieldRes.ok)
    return <p className="text-sm text-destructive">{fieldRes.message}</p>;

  const field = fieldRes.data;

  return (
    <div className="max-w-5xl space-y-6">
      <PageHeader
        title="Detail Field"
        description={field.name}
        action={<EditFieldSheet field={field} />}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <div className="text-muted-foreground">Status</div>
            <div className="mt-2">
              <StatusBadge tone={field.is_available ? "success" : "danger"}>
                {field.is_available ? "Available" : "Inactive"}
              </StatusBadge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-muted-foreground">Tipe</div>
            <div className="text-2xl font-semibold capitalize">{field.type}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-muted-foreground">Harga per Jam</div>
            <div className="text-2xl font-semibold">
              {FormatRupiah(field.price_per_hour)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deskripsi</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {field.description || "Belum ada deskripsi."}
        </CardContent>
      </Card>

      <FieldScheduleForm fieldId={field.id} />

      <Card>
        <CardHeader>
          <CardTitle>Jadwal Khusus</CardTitle>
        </CardHeader>
        <CardContent>
          {scheduleRes.ok ? (
            <FieldSchedulesTable data={scheduleRes.data} />
          ) : (
            <p className="text-sm text-destructive">{scheduleRes.message}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <DeleteFieldButton id={field.id} />
        </CardContent>
      </Card>
    </div>
  );
}
