import { SidebarMenu } from "@/types/sidebar";
import { LayoutDashboard, Calendar, Users, MapPin } from "lucide-react";

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
];
