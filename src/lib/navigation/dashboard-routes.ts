import { SidebarMenu } from "@/types/sidebar";
import {
  Bell,
  Calendar,
  CreditCard,
  LayoutDashboard,
  MapPin,
  Users,
  UserCog,
  BarChart3,
} from "lucide-react";

export const sidebarMenu: SidebarMenu[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Bookings",
    icon: Calendar,
    subMenu: [
      {
        title: "All Bookings",
        path: "/bookings",
      },
      {
        title: "Create Booking",
        path: "/bookings/create",
      },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    path: "/payments",
  },
  {
    title: "Fields",
    icon: MapPin,
    subMenu: [
      {
        title: "All Fields",
        path: "/fields",
      },
      {
        title: "Create Field",
        path: "/fields/create",
      },
    ],
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
  },
  {
    title: "Admin Accounts",
    icon: UserCog,
    roles: ["superadmin"],
    subMenu: [
      {
        title: "All Admins",
        path: "/admins",
      },
      {
        title: "Create Admin",
        path: "/admins/create",
      },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
];
