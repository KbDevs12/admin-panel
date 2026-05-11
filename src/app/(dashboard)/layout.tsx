import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";
import DashboardBreadcrumb from "@/components/layouts/dashboard-breadcrumb";
import { getSession } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar currentUserRole={session.user?.role} />

        <main className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-3 p-2 border-b">
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </div>

          <div className="p-6 w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
