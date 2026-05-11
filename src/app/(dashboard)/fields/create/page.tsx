import { PageHeader } from "@/components/shared/page-header";
import { CreateFieldForm } from "@/components/forms/admin/FieldForms";

export default function CreateFieldPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Create Field" description="Tambah lapangan baru." />
      <CreateFieldForm />
    </div>
  );
}
