"use client";

import Image from "next/image";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarMenu } from "@/lib/data/menu";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-0! mx-2"
            >
              <div className="h-full">
                <Image
                  src="/images/logo_color.svg"
                  alt="Bank Syariah Nasional"
                  width={100}
                  height={100}
                  className="w-auto h-13 mr-auto"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenu.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-0!">
        <NavSecondary items={sidebarMenu.navSecondary} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  );
}
