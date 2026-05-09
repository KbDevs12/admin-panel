import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";
import DashboardBreadcrumb from "@/components/layouts/dashboard-breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <main className="flex-1 w-full">
          <div className="flex items-center gap-3 p-2 border-b">
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
