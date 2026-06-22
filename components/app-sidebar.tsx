"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUpIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { href: "/apod", label: "APOD" },
  { href: "/donky", label: "DONKY" },
  { href: "/earth", label: "Earth" },
  { href: "/mars", label: "Mars Rover Photos" },
];

const INERT_ITEMS = ["EONET", "EPIC", "ExoPlanet", "GeneLab", "Insight"];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h1 className="px-2 py-1 text-sm font-semibold tracking-wide text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          NASA DATA
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    render={<Link href={item.href} />}
                  >
                    <TrendingUpIcon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {INERT_ITEMS.map((label) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton disabled>
                    <TrendingUpIcon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
