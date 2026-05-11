"use client";

import { useMemo, useState } from "react";
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
import type {
  DashboardRole,
  SidebarMenu as SidebarMenuItemType,
} from "@/types/sidebar";

function canSeeMenu(item: SidebarMenuItemType, role?: DashboardRole) {
  if (!item.roles || item.roles.length === 0) return true;
  return role ? item.roles.includes(role) : false;
}

function filterMenuByRole(items: SidebarMenuItemType[], role?: DashboardRole) {
  return items
    .filter((item) => canSeeMenu(item, role))
    .map((item) => ({
      ...item,
      subMenu: item.subMenu?.filter((subItem) => canSeeMenu(subItem, role)),
    }))
    .filter((item) => item.path || !item.subMenu || item.subMenu.length > 0);
}

export default function DashboardSidebar({
  currentUserRole,
}: {
  currentUserRole?: DashboardRole;
}) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});

  const visibleMenu = useMemo(
    () => filterMenuByRole(sidebarMenu, currentUserRole),
    [currentUserRole],
  );

  const activeOpen = useMemo(() => {
    const initialOpen: Record<string, boolean> = {};

    visibleMenu.forEach((item) => {
      if (!item.subMenu) return;

      const hasActiveChild = item.subMenu.some((sub) =>
        pathname.startsWith(sub.path as string),
      );

      if (hasActiveChild) initialOpen[item.title] = true;
    });

    return initialOpen;
  }, [pathname, visibleMenu]);

  const open = { ...activeOpen, ...manualOpen };

  const toggle = (key: string) => {
    setManualOpen((prev) => ({ ...prev, [key]: !open[key] }));
  };

  const isParentActive = (item: (typeof visibleMenu)[number]) => {
    if (item.subMenu) {
      return item.subMenu.some((sub) =>
        pathname.startsWith(sub.path as string),
      );
    }
    return item.path ? pathname === item.path : false;
  };

  const isSubActive = (path: string) => pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex h-full flex-col items-center">
        {!isCollapsed && (
          <SidebarHeader>
            <h1 className="text-lg font-bold">Cahaya Admin</h1>
          </SidebarHeader>
        )}
        <SidebarSeparator />
        <SidebarMenu className="flex-1">
          {visibleMenu.map((item) => {
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
                        ? "bg-primary/10 font-semibold text-primary hover:bg-primary/15"
                        : ""
                    }`}
                  >
                    {!hasSubmenu && item.path ? (
                      <Link
                        href={item.path as string}
                        className={`flex items-center ${isCollapsed ? "w-full justify-center" : ""}`}
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
                                ? "bg-primary/10 font-semibold text-primary hover:bg-primary/15"
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
                className={`flex w-full flex-row items-center text-red-600 hover:bg-red-50 ${
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
