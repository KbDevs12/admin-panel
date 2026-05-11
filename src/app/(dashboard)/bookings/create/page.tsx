import { getFields } from "@/actions/admin/fields";
import { getUsers } from "@/actions/admin/users";
import { PageHeader } from "@/components/shared/page-header";
import { CreateBookingForm } from "@/components/forms/admin/CreateBookingForm";

export default async function CreateBookingPage() {
  const [usersRes, fieldsRes] = await Promise.all([getUsers(), getFields()]);

  return (
    <div className="space-y-6">
      <PageHeader title="Create Booking" description="Buat booking manual dari admin panel." />
      {!usersRes.ok && <p className="text-sm text-destructive">{usersRes.message}</p>}
      {!fieldsRes.ok && <p className="text-sm text-destructive">{fieldsRes.message}</p>}
      <CreateBookingForm users={usersRes.data ?? []} fields={fieldsRes.data ?? []} />
    </div>
  );
}
