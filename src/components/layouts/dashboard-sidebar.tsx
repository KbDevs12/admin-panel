"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { sidebarMenu } from "@/lib/navigation/dashboard-routes";
import { logoutAdmin } from "@/actions/auth/logout-admin";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const initialOpen: Record<string, boolean> = {};
    sidebarMenu.forEach((item) => {
      if (item.subMenu) {
        const hasActiveChild = item.subMenu.some((sub) =>
          pathname.startsWith(sub.path as string),
        );
        if (hasActiveChild) initialOpen[item.title] = true;
      }
    });
    setOpen(initialOpen);
  }, [mounted, pathname]);

  const toggle = (key: string) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isParentActive = (item: (typeof sidebarMenu)[number]) => {
    if (item.subMenu) {
      return item.subMenu.some((sub) =>
        pathname.startsWith(sub.path as string),
      );
    }
    return item.path ? pathname === item.path : false;
  };

  const isSubActive = (path: string) => pathname.startsWith(path);

  if (!mounted) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full items-center">
        {!isCollapsed && (
          <SidebarHeader>
            <h1 className="text-lg font-bold">Cahaya Admin</h1>
          </SidebarHeader>
        )}
        <SidebarSeparator />
        <SidebarMenu className="flex-1">
          {sidebarMenu.map((item) => {
            const hasSubmenu = !!item.subMenu;
            const parentActive = isParentActive(item);

            return (
              <div key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => hasSubmenu && toggle(item.title)}
                    asChild={!hasSubmenu && !!item.path}
                    className={`transition-colors ${
                      isCollapsed ? "justify-center" : ""
                    } ${
                      parentActive
                        ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15"
                        : ""
                    }`}
                  >
                    {!hasSubmenu && item.path ? (
                      <Link
                        href={item.path as string}
                        className={`flex items-center ${isCollapsed ? "justify-center w-full" : ""}`}
                      >
                        {item.icon && (
                          <item.icon
                            className={`shrink-0 ${!isCollapsed ? "mr-2" : ""} ${parentActive ? "text-primary" : ""}`}
                          />
                        )}
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    ) : (
                      <>
                        {item.icon && (
                          <item.icon
                            className={`shrink-0 ${!isCollapsed ? "mr-2" : ""} ${parentActive ? "text-primary" : ""}`}
                          />
                        )}
                        {!isCollapsed && (
                          <>
                            <span>{item.title}</span>
                            {hasSubmenu && (
                              <ChevronDown
                                className={`ml-auto transition-transform ${
                                  open[item.title] ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {hasSubmenu && open[item.title] && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subMenu!.map((subItem) => {
                      const subActive = isSubActive(subItem.path as string);
                      return (
                        <SidebarMenuItem key={subItem.path}>
                          <SidebarMenuButton
                            asChild
                            className={`transition-colors ${
                              subActive
                                ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15"
                                : ""
                            }`}
                          >
                            <Link href={subItem.path as string}>
                              <span
                                className={`text-sm ${
                                  subActive
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          <form action={logoutAdmin}>
            <SidebarMenuItem>
              <SidebarMenuButton
                type="submit"
                className={`w-full flex flex-row items-center text-red-600 hover:bg-red-50 ${
                  isCollapsed ? "justify-center gap-0" : "gap-4"
                }`}
              >
                <LogOut className="shrink-0" />
                {!isCollapsed && <span className="text-sm">Logout</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </form>
        </SidebarMenu>
        {!isCollapsed && (
          <SidebarFooter>
            <p className="text-xs text-muted-foreground">
              © 2026 Cahaya Admin. All rights reserved.
            </p>
          </SidebarFooter>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
