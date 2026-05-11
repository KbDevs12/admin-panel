import { getFields } from "@/actions/admin/fields";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { FieldsTable } from "@/components/table/fields-table";

export default async function FieldsPage() {
  const res = await getFields();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fields"
        description="Kelola lapangan dan jadwal operasional."
        actionHref="/fields/create"
        actionLabel="Create Field"
      />
      {!res.ok ? (
        <p className="text-sm text-destructive">{res.message}</p>
      ) : (
        <Card>
          <CardContent>
            <FieldsTable data={res.data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
