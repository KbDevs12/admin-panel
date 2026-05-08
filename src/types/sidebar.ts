import { LucideIcon } from "lucide-react";

export interface SidebarMenu {
  title: string;
  icon?: LucideIcon;
  path?: string;
  subMenu?: SidebarMenu[];
}
