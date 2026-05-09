"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "../ui/breadcrumb";
import { sidebarMenu } from "@/lib/navigation/dashboard-routes";

export default function DashboardBreadcrumb() {
  const pathname = usePathname();

  let parentLabel: string | null = null;
  let currentLabel: string | null = null;

  for (const item of sidebarMenu) {
    if (item.subMenu) {
      const matched = item.subMenu.find((sub) =>
        pathname.startsWith(sub.path as string),
      );

      if (matched) {
        parentLabel = item.title;
        currentLabel = matched.title;
        break;
      }
    } else if (item.path && pathname === item.path) {
      currentLabel = item.title;
      break;
    }
  }

  if (!currentLabel) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {parentLabel && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-muted-foreground">
                {parentLabel}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
