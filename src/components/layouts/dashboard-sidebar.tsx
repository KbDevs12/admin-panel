"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import { sidebarMenu } from "@/lib/navigation/dashboard-routes";

export default function DashboardSidebar() {
    const [open, setOpen] = useState<Record<string, boolean>>({});

    const toggle = (key: string) => {
        setOpen((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader>
                    <h1 className="text-lg font-bold">Cahaya Admin</h1>
                </SidebarHeader>
                <SidebarMenu>
                    {sidebarMenu.map((item) => {
                        const hasSubmenu = !!item.subMenu

                        return (
                            <div key={item.title}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={() => hasSubmenu && toggle(item.title)}>
                                        {item.icon && <item.icon className="mr-2" />}
                                        <span>{item.title}</span>
                                        {hasSubmenu && <ChevronDown className={`ml-auto transition-transform ${open[item.title] ? "rotate-180" : ""}`} />}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                {hasSubmenu && open[item.title] && (
                                    <div className="ml-6 mt-1 space-y-1">
                                        {item.subMenu!.map((subItem) => (
                                            <SidebarMenuItem key={subItem.path}>
                                                <SidebarMenuButton asChild>
                                                    <Link href={subItem.path as string}>
                                                    <span className="text-sm text-muted-foreground">{subItem.title}</span></Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}