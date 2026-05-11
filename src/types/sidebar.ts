import { LucideIcon } from "lucide-react";

export type DashboardRole = "admin" | "superadmin";

export interface SidebarMenu {
  title: string;
  icon?: LucideIcon;
  path?: string;
  roles?: DashboardRole[];
  subMenu?: SidebarMenu[];
}
